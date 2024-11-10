package cgminer

import (
	"context"
	"fmt"
	"miner-stats/collector/conf"
	"time"

	"go.uber.org/zap"
)

func CGMinerWorker(ctx context.Context, miner *conf.MinerConfig, test bool, logger *zap.Logger) {
	// TODO: Make sure the statSource == cgminer
	fmt.Printf("Initializing collection worker for %v\n", miner)
	cgConn := CGConnector{miner, logger}

	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()

	running := true
	for running {
		select {
		case <-ctx.Done():
			err := ctx.Err()
			fmt.Println("Halting...")
			fmt.Println(err.Error())
			running = false
			break
		case <-ticker.C:
			summary := cgConn.getSummary()
			logger.Debug("summaryRes", zap.Any("summary", summary))
		}
	}

	fmt.Printf("Terminating collection worker for %v\n", miner)
	logger.Debug("Closing connection to miner",
		zap.String("miner.name", miner.Name),
		zap.String("miner.address", miner.Address),
	)
}
