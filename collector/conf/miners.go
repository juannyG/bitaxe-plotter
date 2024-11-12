package conf

import (
	"errors"
	"fmt"
	"miner-stats/collector/conf/stores"
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
	Store stores.Store
}

func validateMiner(m *MinerConfig, c *Config) error {
	if len(m.Name) == 0 {
		return errors.New("miner name cannot be empty")
	}
	if len(m.Host) == 0 {
		return errors.New("miner host cannot be empty")
	}
	if len(m.Type) == 0 {
		return errors.New("miner type cannot be empty")
	}
	if len(m.StoreKey) == 0 {
		return errors.New("miner store cannot be empty")
	}

	// Normalize and overwrite miner type before checking
	m.Type = strings.ToLower(m.Type)
	switch m.Type {
	case AxeOS:
	case CGMiner:
	default:
		errMsg := fmt.Sprintf("invalid type: %s", m.Type)
		return errors.New(errMsg)
	}

	storeConf, ok := c.StoreConfs[m.StoreKey]
	if !ok {
		errMsg := fmt.Sprintf("no configuration found for given store: %s", m.StoreKey)
		return errors.New(errMsg)
	}

	// If we already initialized the store, re-use it
	if _, ok = c.stores[m.StoreKey]; ok {
		m.Store = c.stores[m.StoreKey]
		return nil
	}

	// If we haven't initialized the store, try to do so
	fmt.Printf("storeConf: %v", storeConf)
	store, err := stores.InitStore(storeConf)
	if err != nil {
		return err
	}
	m.Store = store

	// TODO: Verify m.Store is reference and not a copy for every miner
	// Keep a reference to the initialized store for future reference
	c.stores[m.StoreKey] = m.Store

	return nil
}
