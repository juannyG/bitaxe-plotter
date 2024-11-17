package stores

import (
	"miner-stats/collector/metrics"
	"miner-stats/collector/miners"
)

const (
	// Store type constants
	INFLUXDB2_TYPE string = "influxdb2"
)

type Store interface {
	Init() error
	SendCGMinerMetrics(miner *miners.Miner, metrics *metrics.CGMinerMetrics) error
	SendAxeOSMetrics(miner *miners.Miner, metrics *metrics.AxeOSSystemInfo) error
}
