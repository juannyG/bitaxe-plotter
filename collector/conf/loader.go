package conf

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"strings"

	"go.uber.org/zap"
)

const (
	AxeOS   string = "axeos"
	CGMiner string = "cgminer"
)

type MinerConfig struct {
	Name       string `json:"name"`
	StatSource string `json:"statSource"`
	Address    string `json:"address"`
}

type Config struct {
	Miners []MinerConfig `json:"miners"`
}

func (c *Config) validate() error {
	for i := 0; i < len(c.Miners); i++ {
		// Normalize and overwrite before checking
		statSource := strings.ToLower(c.Miners[i].StatSource)
		c.Miners[i].StatSource = statSource

		switch statSource {
		case AxeOS:
			continue
		case CGMiner:
			continue
		default:
			errMsg := fmt.Sprintf("Invalid statSource in configuration: %s", statSource)
			return errors.New(errMsg)
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

	err = config.validate()
	if err != nil {
		logger.Fatal("Configuration error",
			zap.String("error", err.Error()),
		)
	}
	return &config
}
