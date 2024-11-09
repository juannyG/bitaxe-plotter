package collectors

import (
	"context"
	"fmt"
	"miner-stats/collector/conf"

	"go.uber.org/zap"
)

func CGMinerWorker(context context.Context, miner *conf.MinerConfig, test bool, logger *zap.Logger) {
	// TODO: Make sure the statSource == cgminer
	// TODO: WaitGroup
	fmt.Printf("Initializing collection worker for %v\n", miner)
}
