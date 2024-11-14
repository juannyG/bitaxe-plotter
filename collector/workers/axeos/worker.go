package axeos

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"miner-stats/collector/metrics"
	"miner-stats/collector/miners"
	"miner-stats/collector/stores"
	"net/http"
	"time"

	"go.uber.org/zap"
)

func AxeOSWorker(ctx context.Context, miner *miners.Miner, store stores.Store, test bool, logger *zap.Logger) {

	url := fmt.Sprintf("http://%s/api/system/info", miner.Host)
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
			resp, err := http.Get(url)
			if err != nil {
				logger.Error("failed to get axeos metrics",
					zap.String("miner", miner.Name),
					zap.String("error", err.Error()),
				)
				continue
			}

			body, err := io.ReadAll(resp.Body)
			if err != nil {
				logger.Error("failed to read axeos metrics",
					zap.String("miner", miner.Name),
					zap.String("error", err.Error()),
				)
				continue
			}
			logger.Debug("raw response", zap.String("respBody", string(body)))

			metrics := metrics.SystemInfo{}
			err = json.Unmarshal(body, &metrics)
			if err != nil {
				logger.Error("failed to unmarshal axeos metrics response",
					zap.String("miner", miner.Name),
					zap.String("error", err.Error()),
				)
				continue
			}
			if test {
				logger.Debug("axeos metrics", zap.String("miner", miner.Name), zap.Any("metrics", metrics))
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
