package main

import (
	"context"
	"flag"
	"fmt"
	"miner-stats/collector/conf"
	"miner-stats/collector/miners"
	"miner-stats/collector/stores"
	"miner-stats/collector/workers/cgminer"
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
	flag.BoolVar(&test, "test", false, "Run collector in test mode - only one iteration of collection will occur and no stats will be sent to the target store")
	flag.Parse()

	cfg := zap.NewProductionConfig()
	if debug {
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

	config := conf.LoadMiners(confFilePath, logger)
	logger.Debug("configuration loaded", zap.Any("config", config))
	if minerIdx >= 0 && minerIdx >= len(config.Miners) {
		logger.Fatal("Given miner index to test is out of bounds", zap.Int("test", minerIdx))
	} else if minerIdx < 0 {
		logger.Debug("Miner argument less than 0. Ignoring...")
	}

	var wg sync.WaitGroup
	fmt.Println("Configuration successfully loaded. Initializing collectors...")
	for i := 0; i < len(config.Miners); i++ {
		m := config.Miners[i]
		if minerIdx >= 0 && minerIdx != i {
			continue
		}

		// TODO: If safe for concurrent use, reuse the store...
		store := conf.LoadStore(m.StoreKey, config.StoreConfs, logger)

		switch m.Type {
		case miners.AXEOS_TYPE:
			wg.Add(1)
			logger.Debug("TODO: Implement AxeOS collection worker")
			wg.Done()
		case miners.CGMINER_TYPE:
			wg.Add(1)
			go func(m *miners.Miner, s stores.Store) {
				defer wg.Done()
				cgminer.CGMinerWorker(ctx, m, s, test, logger)
			}(&m, store)
		default:
			logger.Fatal("Unsupported stat source detected", zap.String("statSource", config.Miners[i].Type))
		}
	}
	wg.Wait()

	fmt.Println("All collectors have terminated. Exiting...")
}
