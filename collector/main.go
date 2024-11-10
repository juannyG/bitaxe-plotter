package main

import (
	"context"
	"flag"
	"fmt"
	"miner-stats/collector/conf"
	"miner-stats/collector/statTypes/cgminer"
	"os"
	"os/signal"
	"sync"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func main() {
	var confFilePath string
	var debug bool
	var test bool
	var minerIdx int

	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, os.Kill)
	defer func() {
		signal.Stop(c)
		cancel()
	}()

	go func() {
		select {
		case <-c:
			cancel()
		case <-ctx.Done():
		}
	}()

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

	var wg sync.WaitGroup
	fmt.Println("Configuration successfully loaded. Initializing collectors...")
	for i := 0; i < len(config.Miners); i++ {
		switch config.Miners[i].StatSource {
		case conf.AxeOS:
			logger.Debug("TODO: Implement AxeOS collection worker")
		case conf.CGMiner:
			wg.Add(1)
			go func(c *conf.MinerConfig) {
				defer wg.Done()
				cgminer.CGMinerWorker(ctx, c, test, logger)
			}(&config.Miners[i])
		default:
			logger.Fatal("Unsupported stat source detected", zap.String("statSource", config.Miners[i].StatSource))
		}
	}
	wg.Wait()

	fmt.Println("All collectors have terminated. Exiting...")
}
