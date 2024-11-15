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
	Org    string `json:"org"`
	Bucket string `json:"bucket"`
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
	writeAPI := s.client.WriteAPIBlocking(s.Org, s.Bucket)

	tags := map[string]string{
		"miner": miner.Name,
		"type":  miner.Type,
	}
	fields := map[string]interface{}{
		"accepted":              metrics.Summary[0].Accepted,
		"bestShare":             metrics.Summary[0].BestShare,
		"deviceRejectedPercent": metrics.Summary[0].DeviceRejectedPerecent,
		"difficultyAccepted":    metrics.Summary[0].DifficultyAccepted,
		"uptime":                metrics.Summary[0].Elapsed,
		"mhs5s":                 metrics.Summary[0].Mhs5s,
		"poolRejectedPercent":   metrics.Summary[0].PoolRejectedPercent,
		"nonces":                metrics.Stats[0].Nonces,
		"tasksPerSec":           metrics.Stats[0].TasksPerSec,
		"workGenAvg":            metrics.Stats[0].WorkGenAvg,
	}
	s.Logger.Debug("fields", zap.Any("fields", fields))
	point := write.NewPoint("cgminer", tags, fields, time.Now())

	if err := writeAPI.WritePoint(context.Background(), point); err != nil {
		return err
	}
	return nil
}

func (s *InfluxDB2Store) SendAxeOSMetrics(miner *miners.Miner, metrics *metrics.AxeOSSystemInfo) error {
	writeAPI := s.client.WriteAPIBlocking(s.Org, s.Bucket)

	tags := map[string]string{
		"miner": miner.Name,
		"type":  miner.Type,
	}

	rejectedPercent := (float64(metrics.SharesRejected) / float64(metrics.SharesAccepted+metrics.SharesRejected)) * 100
	fields := map[string]interface{}{
		"power":             metrics.Power,
		"voltage":           metrics.Voltage,
		"current":           metrics.Current,
		"temp":              metrics.Temp,
		"vRTemp":            metrics.VRTemp,
		"hashRate":          metrics.HashRate,
		"bestDiff":          metrics.BestDiff,
		"bestSessionDiff":   metrics.BestSessionDiff,
		"freeHeap":          metrics.FreeHeap,
		"coreVoltage":       metrics.CoreVoltage,
		"coreVoltageActual": metrics.CoreVoltageActual,
		"frequency":         metrics.Frequency,
		"sharesAccepted":    metrics.SharesAccepted,
		"sharesRejected":    metrics.SharesRejected,
		"rejectionPercent":  rejectedPercent,
		"uptimeSeconds":     metrics.UptimeSeconds,
		"fanRPM":            metrics.FanRPM,
	}
	s.Logger.Debug("fields", zap.Any("fields", fields))
	point := write.NewPoint("axeos", tags, fields, time.Now())

	if err := writeAPI.WritePoint(context.Background(), point); err != nil {
		return err
	}
	return nil
}
