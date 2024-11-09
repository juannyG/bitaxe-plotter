package collectors

import (
	"context"
	"fmt"
	"io"
	"miner-stats/collector/conf"
	"net"
	"time"

	"go.uber.org/zap"
)

func CGMinerWorker(ctx context.Context, miner *conf.MinerConfig, test bool, logger *zap.Logger) {
	// TODO: Make sure the statSource == cgminer
	fmt.Printf("Initializing collection worker for %v\n", miner)

	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()

	running := true
	for running {
		fmt.Println("RUNNING....")
		select {
		case <-ctx.Done():
			err := ctx.Err()
			fmt.Println("Halting...")
			fmt.Println(err.Error())
			running = false
			break
		case <-ticker.C:
			/*
			 * The cgminer API is powered by a low level socket which requires
			 * us to open and close the socket for every requests. Hence, no
			 * defer conn.Close()
			 */
			conn, err := net.Dial("tcp", miner.Address)
			if err != nil {
				logger.Fatal("Failed to connect to miner", zap.String("miner.Address", miner.Address))
			}

			// Alternate command for chip/work stats: `{"command": "stats"}`
			cmd := `{"command": "summary"}`
			conn.Write([]byte(cmd))

			length := 0
			buf := make([]byte, 256)
			data := make([]byte, 0)
			for {
				n, err := conn.Read(buf)
				if err != nil {
					if err != io.EOF {
						logger.Error("Connection read error", zap.String("error", err.Error()))
					}
					break
				}
				data = append(data, buf[:n]...)
				length += n
			}
			if length > 0 {
				fmt.Printf("Result: %s\n", string(data))
			}
			conn.Close()
		}
	}

	fmt.Printf("Terminating collection worker for %v\n", miner)
	logger.Debug("Closing connection to miner",
		zap.String("miner.name", miner.Name),
		zap.String("miner.address", miner.Address),
	)
}
