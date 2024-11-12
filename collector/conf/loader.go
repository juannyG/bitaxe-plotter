package conf

import (
	"encoding/json"
	"errors"
	"miner-stats/collector/conf/stores"
	"os"

	"go.uber.org/zap"
)

type Config struct {
	Miners []MinerConfig `json:"miners"`

	/**
	     Marshal the StoreConfs to structs manually based on "type" field
	     and assign the appropriate instance to MinerConfig[x].Store

		 storeLabel: { ..., type: "storeType" }
	*/
	StoreConfs map[string]interface{} `json:"stores"`

	// We load StoreConfs into a map of stores for easy retrieval when repeated
	stores map[string]stores.Store
}

func (c *Config) validate() error {
	if len(c.Miners) == 0 {
		return errors.New("no miner configurations found")
	}

	for i := 0; i < len(c.Miners); i++ {
		err := validateMiner(&c.Miners[i], c)
		if err != nil {
			return err
		}
	}
	return nil
}

func Load(confFilePath string, logger *zap.Logger) *Config {
	data, err := os.ReadFile(confFilePath)
	if err != nil {
		logger.Fatal("An error occured while trying to read the file",
			zap.String("conf", confFilePath),
		)
	}
	logger.Debug("Successfully read configuration", zap.String("conf", confFilePath))

	var config Config
	err = json.Unmarshal(data, &config)
	if err != nil {
		logger.Fatal("An error occured loading the config file",
			zap.String("conf", confFilePath),
			zap.String("error", err.Error()),
		)
	}
	logger.Debug("Configuration loaded", zap.Any("config", config))

	config.stores = make(map[string]stores.Store)
	err = config.validate()
	if err != nil {
		logger.Fatal("Configuration error",
			zap.String("error", err.Error()),
		)
	}
	return &config
}
