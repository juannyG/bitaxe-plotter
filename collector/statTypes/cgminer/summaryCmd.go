package cgminer

import (
	"encoding/json"

	"go.uber.org/zap"
)

type Summary struct {
	Elapsed   int64   `json:"Elapsed"`
	Mhs5s     float64 `json:"MHS 5s"`
	BestShare int64   `json:"Best Share"`
}

type SummaryRes struct {
	Summary []Summary `json:"SUMMARY"`
}

func (cg *CGConnector) getSummary() *Summary {
	var summaryRes SummaryRes
	res := cg.executeCmd("summary")
	err := json.Unmarshal(res, &summaryRes)
	if err != nil {
		cg.logger.Fatal("Could not unmarshal JSON response",
			zap.String("response", string(res)),
			zap.String("error", err.Error()),
		)
	}
	return &summaryRes.Summary[0]
}
