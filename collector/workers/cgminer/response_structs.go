package cgminer

// Real talk - this response is huge - just keeping things that may be of interest for now...
type Stats struct {
	Nonces       int64   `json:"Nonces"`       // 'Nonces': 1440616,
	Accepted     int64   `json:"Accepted"`     // 'Accepted': 1440605,
	TasksPerSec  float64 `json:"TasksPerSec"`  // 'TasksPerSec': 216.158171,
	Tasks        int64   `json:"Tasks"`        // 'Tasks': 52065041,
	BusyWork     int64   `json:"BusyWorK"`     // 'BusyWork': 0, -TODO: What is this?
	MaxTaskWait  int64   `json:"MaxTaskWait"`  // 'MaxTaskWait': 4734, - unit: microseconds - https://github.com/kanoi/cgminer/blob/master/driver-gekko.h#L435
	GHLast       int64   `json:"GHLast"`       // 'GHLast': 299, - TODO: What is this?
	GHNonces     int64   `json:"GHNonces"`     // 'GHNonces': 1811, - TODO: What is this?
	GHDiff       int64   `json:"GHDiff"`       // 'GHDiff': 115904, - TODO: What is this?
	GHGHs        float64 `json:"GHGHs"`        // 'GHGHs': 1667.56084, - TODO: What is this?
	Require      float64 `json:"Require"`      // 'Require': 0.65, - https://kano.is/gekko.php#perf
	RequireGH    float64 `json:"RequireGH"`    // 'RequireGH': 1179.359957, - https://kano.is/gekko.php#perf
	WorkerGenNum int64   `json:"WorkerGenNum"` // 'WorkGenNum': 52065041,
	WorkerGenAvg float64 `json:"WorkerGenAvg"` // 'WorkGenAvg': 12.353016, - unit: microseconds - https://github.com/kanoi/cgminer/blob/a681b3d28b01f6106ef663f6f8cdf0191937cffe/driver-gekko.c#L6639C51-L6639C64
}

type Summary struct {
	Elapsed                int64   `json:"Elapsed"`             // 'Elapsed': 240867,
	MhsAvg                 float64 `json:"MHS av"`              // 'MHS av': 1644016.64,
	Mhs5s                  float64 `json:"MHS 5s"`              // 'MHS 5s': 1407475.03,
	Mhs1m                  float64 `json:"MHS 1m"`              // 'MHS 1m': 1646345.53,
	Mhs5m                  float64 `json:"MHS 5m"`              // 'MHS 5m': 1645120.02,
	Mhs15m                 float64 `json:"MHS 15m"`             // 'MHS 15m': 1640104.94,
	FoundBlocks            int64   `json:"Found Blocks"`        // 'Found Blocks': 0,
	Getworks               int64   `json:"Getworks"`            // 'Getworks': 8068, - TODO: What is this? The amount of requests made to the pool to get work?
	Accepted               int64   `json:"Accepted"`            // 'Accepted': 85690,
	Rejected               int64   `json:"Rejected"`            // 'Rejected': 69,
	HardwareErrors         int     `json:"Hardware Errors"`     // 'Hardware Errors': 0,
	Utility                float64 `json:"Utility"`             // 'Utility': 21.35, - TODO: What is this?
	Discarded              int64   `json:"Discarded"`           // 'Discarded': 50992857, - TODO
	Stale                  int64   `json:"Stale"`               // 'Stale': 0,
	GetFailures            int64   `json:"Get Failures"`        // 'Get Failures': 0,
	LocalWork              int64   `json:"Local Work"`          // 'Local Work': 103065447, - TODO
	RemoteFailures         int64   `json:"Remote Failures"`     // 'Remote Failures': 0,
	NetworkBlocks          int64   `json:"Network Blocks"`      // 'Network Blocks': 396, - TODO
	TotalMH                float64 `json:"Total MH"`            // 'Total MH': 395989672326.0, - TODO
	WorkUtility            float64 `json:"Work Utility"`        // 'Work Utility': 22966.69, - https://github.com/kanoi/cgminer/blob/a681b3d28b01f6106ef663f6f8cdf0191937cffe/README#L874
	DifficultyAccepted     float64 `json:"Difficulty Accepted"` // 'Difficulty Accepted': 92873802.0,
	DifficultyRejected     float64 `json:"Difficulty Rejected"` // 'Difficulty Rejected': 73496.0,
	DifficultyStale        float64 `json:"Difficulty Stale"`    // 'Difficulty Stale': 0.0,
	BestShare              int64   `json:"Best Share"`          // 'Best Share': 390455180,
	DeviceHardwarePercent  float64 `json:"Device Hardware%"`    // 'Device Hardware%': 0.0,
	DeviceRejectedPerecent float64 `json:"Device Rejected%"`    // 'Device Rejected%': 0.0797,
	PoolRejectedPercent    float64 `json:"Pool Rejected %"`     // 'Pool Rejected%': 0.0791,
	PoolStalePerecent      float64 `json:"Pool Stale%"`         // 'Pool Stale%': 0.0,
	LastGetwork            int64   `json:"Last getwork"`        // 'Last getwork': 1731415677
}

type Metrics struct {
	Summary []Summary `json:"SUMMARY"`
	Stats   []Stats   `json:"STATS"`
}
