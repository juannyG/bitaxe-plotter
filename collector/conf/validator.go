package conf

import (
	"errors"
	"fmt"
	"miner-stats/collector/miners"
	"strings"
)

func validateMiner(m *miners.Miner) error {
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
	case miners.AXEOS_TYPE:
	case miners.CGMINER_TYPE:
	default:
		errMsg := fmt.Sprintf("invalid type: %s", m.Type)
		return errors.New(errMsg)
	}
	return nil
}

func validateStore() error {
	return nil
}
