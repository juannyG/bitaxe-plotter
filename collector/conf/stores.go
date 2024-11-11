package conf

const (
	InfluxDB2 string = "influxdb2"
)

type Store interface {
	InitClient()
	SendMetric()
}

type InfluxDB2Conf struct {
	Host  string `json:"host"`
	Token string `json:"token"`
}

type storeConfs struct {
	InfluxDB2 InfluxDB2Conf `json:"influxdb2"`
}

func initStore(store *Store, storeConf interface{}) error {
	return nil
}
