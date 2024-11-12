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
		case <-ticker.C:
			summary := cgConn.getSummary()
			logger.Debug("summaryRes", zap.Any("summary", summary))
			err := miner.Store.SendUptime(summary.Elapsed)
			if err != nil {
				// TODO: Clean this up a bit - need to be able to return an error out of the worker
				fmt.Println(err.Error())
				running = false
			}
		}
	}

	fmt.Printf("Terminating collection worker for %v\n", miner)
	logger.Debug("Closing connection to miner",
		zap.String("miner.name", miner.Name),
		zap.String("miner.host", miner.Host),
	)
}
