package conf

import (
	"encoding/json"
	"miner-stats/collector/miners"
	"miner-stats/collector/stores"
	"os"

	"go.uber.org/zap"
)

type Config struct {
	Miners []miners.Miner `json:"miners"`

	/**
	     Marshal the StoreConfs to structs manually based on "type" field

		 storeLabel: { ..., type: "storeType" }
	*/
	StoreConfs map[string]interface{} `json:"stores"`
}

func LoadMiners(confFilePath string, logger *zap.Logger) *Config {
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

	return &config
}

func LoadStore(storeKey string, storeConfs map[string]interface{}, logger *zap.Logger) stores.Store {
	storeConf, ok := storeConfs[storeKey]
	if !ok {
		logger.Fatal("miner store does not match any store label", zap.String("store", storeKey))
	}

	// All store configurations must have a "type" field defined
	storeType, ok := storeConf.(map[string]interface{})["type"]
	if !ok {
		logger.Fatal("could not load store configuration", zap.String("store", storeKey))
	}

	switch storeType {
	case stores.INFLUXDB2_TYPE:
		s := stores.InfluxDB2Store{Logger: logger}
		j, _ := json.Marshal(storeConf)
		_ = json.Unmarshal(j, &s)
		if len(s.Host) == 0 {
			logger.Fatal("influxdb2 host missing", zap.String("store", storeKey))
		}
		if len(s.Token) == 0 {
			logger.Fatal("influxdb2 token missing", zap.String("store", storeKey))
		}
		if len(s.Org) == 0 {
			logger.Fatal("influxdb2 org missing", zap.String("store", storeKey))
		}

		if len(s.Bucket) == 0 {
			logger.Fatal("influxdb2 bucket missing", zap.String("store", storeKey))
		}

		err := s.Init()
		if err != nil {
			logger.Fatal("influxdb2 client failed to initialize", zap.String("err", err.Error()))
		}
		return &s
	default:
		logger.Fatal("unsupported store", zap.String("store", storeKey))
	}

	// We should never get here...
	logger.Fatal("xxxxxx")
	return nil
}
