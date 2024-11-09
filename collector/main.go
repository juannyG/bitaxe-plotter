package main

import (
	"context"
	"flag"
	"fmt"
	"miner-stats/collector/collectors"
	"miner-stats/collector/conf"
	"os"
	"time"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func main() {
	var confFilePath string
	var debug bool
	var test bool
	var minerIdx int
	ctx := context.Background()

	flag.StringVar(&confFilePath, "conf", "", "Path to collector configuration")
	flag.BoolVar(&debug, "debug", false, "Enable debug level logging")
	flag.IntVar(&minerIdx, "miner", -1, "Index of miner in configuration to run in isolation.")
	flag.BoolVar(&test, "test", false, "Run collector in test mode - only one iteration of collection will occur")
	flag.Parse()

	cfg := zap.NewProductionConfig()
	if debug == true {
		cfg.Level = zap.NewAtomicLevelAt(zapcore.DebugLevel)
	}
	logger, err := cfg.Build()
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}
	defer logger.Sync()

	if confFilePath == "" {
		logger.Fatal("No collector configuration file provided.")
	}

	config := conf.Load(confFilePath, logger)
	if minerIdx >= 0 && minerIdx >= len(config.Miners) {
		logger.Fatal("Given miner index to test is out of bounds", zap.Int("test", minerIdx))
	} else if minerIdx < 0 {
		logger.Debug("Miner argument less than 0. Ignoring...")
	}

	fmt.Println("Configuration successfully loaded. Initializing collectors...")
	// TODO: WaitGroup
	for i := 0; i < len(config.Miners); i++ {
		switch config.Miners[i].StatSource {
		case conf.AxeOS:
			logger.Debug("TODO: Implement AxeOS collection worker")
		case conf.CGMiner:
			go collectors.CGMinerWorker(ctx, &config.Miners[i], test, logger)
		default:
			logger.Fatal("Unsupported stat source detected", zap.String("statSource", config.Miners[i].StatSource))
		}
	}

	// TODO: Trap SIGTERM/SIGINT for clean shutdown through context
	time.Sleep(1 * time.Millisecond)
}
