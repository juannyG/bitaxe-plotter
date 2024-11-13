package conf

import (
	"encoding/json"
	"miner-stats/collector/miners"
	"os"

	"go.uber.org/zap"
)

type Config struct {
	Miners []miners.Miner `json:"miners"`

	/**
	     Marshal the StoreConfs to structs manually based on "type" field
	     and assign the appropriate instance to MinerConfig[x].Store

		 storeLabel: { ..., type: "storeType" }
	*/
	StoreConfs map[string]interface{} `json:"stores"`
}

func Load(confFilePath string, logger *zap.Logger) []miners.Miner {
	data, err := os.ReadFile(confFilePath)
	if err != nil {
		logger.Fatal("An error occured while trying to read the file",
			zap.String("conf", confFilePath),
		)
	}
	logger.Debug("Successfully read configuration", zap.String("conf", confFilePath))

	var config Config
	config.StoreConfs = make(map[string]interface{})
	err = json.Unmarshal(data, &config)
	if err != nil {
		logger.Fatal("An error occured loading the config file",
			zap.String("conf", confFilePath),
			zap.String("error", err.Error()),
		)
	}
	logger.Debug("Configuration loaded", zap.Any("config", config))

	if len(config.Miners) == 0 {
		logger.Fatal("no miner configurations found")
	}

	for i := 0; i < len(config.Miners); i++ {
		err := validateMiner(&config.Miners[i])
		if err != nil {
			logger.Fatal("miner validation failed", zap.String("err", err.Error()))
		}
	}

	return config.Miners
}
