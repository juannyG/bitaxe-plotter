package miners

const (
	// Store type constants
	INFLUXDB2_TYPE string = "influxdb2"
)

type Store interface {
	// SendCGMinerMetrics(miner *Miner, metrics *metrics.CGMinerMetrics) error
	/** TODO:
	SendBitaxeMetrics(...)
	*/
}
