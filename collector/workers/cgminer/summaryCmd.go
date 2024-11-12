package cgminer

import (
	"encoding/json"

	"go.uber.org/zap"
)

func (cg *CGConnector) getMetrics() (*Metrics, error) {
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

	metrics := Metrics{}
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
	return &metrics, nil
}
