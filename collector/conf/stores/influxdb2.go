package stores

import (
	"context"
	"errors"
	"time"

	influxdb2 "github.com/influxdata/influxdb-client-go/v2"
	"github.com/influxdata/influxdb-client-go/v2/api/write"
)

const (
	INFLUXDB2_TYPE string = "influxdb2"
)

// Implements Store interface
type influxDB2Store struct {
	// TODO: Verify if this is reused or created per miner config instance
	// TODO: Determine concurrency safety...
	client influxdb2.Client
}

func (s influxDB2Store) SendUptime(uptime int64) error {
	// TODO: Should org & bucket be configurable?
	org := "test_org"
	bucket := "test_bucket"
	writeAPI := s.client.WriteAPIBlocking(org, bucket)

	tags := map[string]string{
		"tagname1": "tagvalue1",
	}
	fields := map[string]interface{}{
		"uptime": uptime,
	}
	point := write.NewPoint("measurement1", tags, fields, time.Now())

	if err := writeAPI.WritePoint(context.Background(), point); err != nil {
		return err
	}
	return nil
}

func initInfluxDB2Store(conf map[string]interface{}) (Store, error) {
	host, ok := conf["host"].(string)
	if !ok {
		return nil, errors.New("influxdb2 host misconfigured")
	}
	token, ok := conf["token"].(string)
	if !ok {
		return nil, errors.New("influxdb2 token misconfigured")
	}

	s := influxDB2Store{}
	s.client = influxdb2.NewClient(host, token)
	return s, nil
}
