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
	// TODO: Count number of errors - after threshold met, shut the worker down
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
			metrics, err := cgConn.getMetrics()
			if err != nil {
				logger.Error("failed to get cgminer metrics",
					zap.String("miner", miner.Name),
					zap.String("error", err.Error()),
				)
			}
			if test {
				running = false
			} else {
				err = miner.Store.SendCGMinerMetrics(miner, metrics)
				if err != nil {
					logger.Error("unable to send cgminer metrics",
						zap.String("miner", miner.Name),
						zap.String("error", err.Error()),
					)
				}
			}
		}
	}

	fmt.Printf("Terminating collection worker for %v\n", miner)
	logger.Debug("Closing connection to miner",
		zap.String("miner.name", miner.Name),
		zap.String("miner.host", miner.Host),
	)
}
