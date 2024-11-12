package miners

import (
	"miner-stats/collector/metrics"
)

const (
	// Miner type constants
	AXEOS_TYPE   string = "axeos"
	CGMINER_TYPE string = "cgminer"

	// Store type constants
	INFLUXDB2_TYPE string = "influxdb2"
)

type Store interface {
	SendCGMinerMetrics(miner *Miner, metrics *metrics.CGMinerMetrics) error
	/** TODO:
	SendBitaxeMetrics(...)
	*/
}

type Miner struct {
	Name     string `json:"name"`
	Type     string `json:"type"`
	Host     string `json:"host"`
	StoreKey string `json:"store"`
	Store    Store
}
