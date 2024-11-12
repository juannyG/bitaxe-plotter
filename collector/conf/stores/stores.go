package stores

import (
	"errors"
	"fmt"
	"miner-stats/collector/workers/cgminer"
)

type Store interface {
	SendCGMinerMetrics(metrics cgminer.Metrics) error
	/** TODO:
	SendBitaxeMetrics(...)
	*/
}

func InitStore(storeConf interface{}) (Store, error) {
	conf, ok := storeConf.(map[string]interface{})
	if !ok {
		return nil, errors.New("store conf not a map")
	}
	switch conf["type"] {
	case INFLUXDB2_TYPE:
		store, err := initInfluxDB2Store(conf)
		if err != nil {
			return nil, err
		}
		return store, nil
	default:
		errMsg := fmt.Sprintf("store type not supported: %s", conf["type"])
		return nil, errors.New(errMsg)
	}
}
