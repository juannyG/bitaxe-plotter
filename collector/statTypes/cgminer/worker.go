package cgminer

import (
	"context"
	"fmt"
	"miner-stats/collector/conf"
	"time"

	influxdb2 "github.com/influxdata/influxdb-client-go/v2"
	"github.com/influxdata/influxdb-client-go/v2/api/write"
	"go.uber.org/zap"
)

func CGMinerWorker(ctx context.Context, miner *conf.MinerConfig, test bool, logger *zap.Logger) {
	// TODO: Make sure the statSource == cgminer
	fmt.Printf("Initializing collection worker for %v\n", miner)
	cgConn := CGConnector{miner, logger}

	client := influxdb2.NewClient(
		"http://localhost:8086",
		"SHOULD-BE-AN-ENV-VAR",
	)
	org := "test_org"
	bucket := "test_bucket"
	writeAPI := client.WriteAPIBlocking(org, bucket)

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

			// TODO: Why are we always recreating tags?
			tags := map[string]string{
				"tagname1": "tagvalue1",
			}
			fields := map[string]interface{}{
				"uptime": summary.Elapsed,
			}
			point := write.NewPoint("measurement1", tags, fields, time.Now())

			if err := writeAPI.WritePoint(context.Background(), point); err != nil {
				logger.Fatal("Error while writing to influxdb2", zap.String("error", err.Error()))
			}
		}
	}

	fmt.Printf("Terminating collection worker for %v\n", miner)
	logger.Debug("Closing connection to miner",
		zap.String("miner.name", miner.Name),
		zap.String("miner.address", miner.Address),
	)
}
