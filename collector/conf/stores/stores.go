package stores

import (
	"errors"
	"fmt"
)

type Store interface {
	/**
	Does the Store interface ACTUALLY need to implement methods like...
	SendCGMinerMetrics(...)
	SendBitaxeMetrics(...)

	effectively normalizing WHAT needs to be sent and separating HOW it is sent...
	*/
	// InitClient()
	SendUptime(uptime int64) error
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
