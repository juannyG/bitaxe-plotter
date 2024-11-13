package stores

import (
	"context"
	"miner-stats/collector/metrics"
	"miner-stats/collector/miners"
	"time"

	influxdb2 "github.com/influxdata/influxdb-client-go/v2"
	"github.com/influxdata/influxdb-client-go/v2/api/write"
	"go.uber.org/zap"
)

// Implements Store interface
type InfluxDB2Store struct {
	Host   string `json:"host"`
	Token  string `json:"token"`
	Type   string `json:"type"`
	Logger *zap.Logger

	// TODO: Make sure we reuse clients and don't create one per miner config
	// Client is safe for concurrent use: https://pkg.go.dev/github.com/influxdata/influxdb-client-go/v2@v2.14.0#readme-concurrency
	client influxdb2.Client
}

func (s *InfluxDB2Store) Init() error {
	s.client = influxdb2.NewClient(s.Host, s.Token)
	s.Logger.Debug("influxdb2 client initialized", zap.Any("influxdb2Store", s))
	return nil
}

func (s *InfluxDB2Store) SendCGMinerMetrics(miner *miners.Miner, metrics *metrics.CGMinerMetrics) error {
	// TODO: Should org & bucket be configurable?
	org := "test_org"
	bucket := "test_bucket"
	writeAPI := s.client.WriteAPIBlocking(org, bucket)

	tags := map[string]string{
		"tagname1": "tagvalue1",
	}
	fields := map[string]interface{}{
		"uptime": metrics.Summary[0].Elapsed,
	}
	point := write.NewPoint("measurement1", tags, fields, time.Now())

	if err := writeAPI.WritePoint(context.Background(), point); err != nil {
		return err
	}
	return nil
}
