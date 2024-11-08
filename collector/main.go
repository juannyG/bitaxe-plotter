package main

import (
	"flag"
	"fmt"
	"miner-stats/collector/conf"
	"os"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var confFilePath string
var debug bool

func main() {
	flag.StringVar(&confFilePath, "conf", "", "Path to collector configuration")
	flag.BoolVar(&debug, "debug", false, "Enable debug level logging")
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
	fmt.Println("Configuration loader...starting collection")
	for i := 0; i < len(config.Miners); i++ {
		fmt.Printf("Miner %d: %v\n", i, config.Miners[i])
	}
}
