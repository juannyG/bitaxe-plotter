package cgminer

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"miner-stats/collector/metrics"
	"miner-stats/collector/miners"
	"net"

	"go.uber.org/zap"
)

type CGConnector struct {
	miner  *miners.Miner
	logger *zap.Logger
}

func (cg *CGConnector) executeCmd(cmd string) (data []byte, err error) {
	conn, err := net.Dial("tcp", cg.miner.Host)
	if err != nil {
		cg.logger.Fatal("Failed to connect to miner", zap.String("miner.Address", cg.miner.Host))
	}
	defer conn.Close()

	connCmd := fmt.Sprintf(`{"command": "%s"}`, cmd)
	cg.logger.Debug("command prepared", zap.String("connCmd", connCmd))
	conn.Write([]byte(connCmd))

	length := 0
	buf := make([]byte, 256)
	for {
		n, err := conn.Read(buf)
		if err != nil {
			if err != io.EOF {
				cg.logger.Debug("Connection read error",
					zap.String("error", err.Error()),
					zap.String("cmd", cmd),
				)
				return nil, err
			}

			break
		}
		data = append(data, buf[:n]...)
		length += n
	}
	return bytes.Trim(data, "\x00"), nil
}

func (cg *CGConnector) getMetrics() (*metrics.CGMinerMetrics, error) {
	summaryRaw, err := cg.executeCmd("summary")
	if err != nil {
		cg.logger.Error("could not execute command",
			zap.String("command", "summary"),
			zap.String("error", err.Error()),
		)
		return nil, err
	}

	statsRaw, err := cg.executeCmd("stats")
	if err != nil {
		cg.logger.Error("could not execute command",
			zap.String("command", "stats"),
			zap.String("error", err.Error()),
		)
		return nil, err
	}

	metrics := metrics.CGMinerMetrics{}
	err = json.Unmarshal(summaryRaw, &metrics)
	if err != nil {
		cg.logger.Error("could not unmarshal summary response", zap.String("summaryRaw", string(summaryRaw)))
		return nil, err
	}
	err = json.Unmarshal(statsRaw, &metrics)
	if err != nil {
		cg.logger.Error("could not unmarshal stats response", zap.String("statsRaw", string(statsRaw)))
		return nil, err
	}
	cg.logger.Debug("metrics", zap.Any("metrics", metrics))
	return &metrics, nil
}
