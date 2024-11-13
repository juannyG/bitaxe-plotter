package cgminer

import (
	"bytes"
	"fmt"
	"io"
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
