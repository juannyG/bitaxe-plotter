package conf

import (
	"errors"
	"fmt"
	"strings"
)

const (
	AxeOS   string = "axeos"
	CGMiner string = "cgminer"
)

type MinerConfig struct {
	Name     string `json:"name"`
	Type     string `json:"type"`
	Host     string `json:"host"`
	StoreKey string `json:"store"`

	// The Store will be assigned when the StoreKey is validated against a config
	Store *Store
}

func validateMiner(m *MinerConfig, c *Config) error {
	if len(m.Name) == 0 {
		return errors.New("Miner name cannot be empty")
	}
	if len(m.Host) == 0 {
		return errors.New("Miner host cannot be empty")
	}
	if len(m.Type) == 0 {
		return errors.New("Miner type cannot be empty")
	}
	if len(m.StoreKey) == 0 {
		return errors.New("Miner store cannot be empty")
	}

	// Normalize and overwrite miner type before checking
	m.Type = strings.ToLower(m.Type)
	switch m.Type {
	case AxeOS:
	case CGMiner:
	default:
		errMsg := fmt.Sprintf("Invalid type: %s", m.Type)
		return errors.New(errMsg)
	}

	storeConf, ok := c.StoreConfs[m.StoreKey]
	if !ok {
		errMsg := fmt.Sprintf("No configuration found for given store: %s", m.StoreKey)
		return errors.New(errMsg)
	}

	fmt.Printf("storeConf: %v", storeConf)
	err := initStore(m.Store, storeConf)
	if err != nil {
		return err
	}

	return nil
}
