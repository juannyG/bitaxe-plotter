package metrics

/** Response from /api/system/info - https://github.com/skot/ESP-Miner/blob/2046719d2c523886ad814c54031604b19bbd6dad/main/http_server/http_server.c#L371

  Ignored fields:
  - "ASICModel"
  - "stratumURL"
  - "stratumPort"
  - "stratumUser"
  - "version"
  - "boardVersion"
  - "runningPartition"
  - "flipscreen"
  - "overheat_mode"
  - "invertscreen"
  - "invertfanpolarity"
  - "autofanspeed"
  - "fanspeed"
  - "ssid"
  - "hostname"
  - "asicCount"
  - "wifiStatus"
  - "smallCoreCount"
*/

type SystemInfo struct {
	Power             float64 `json:"power"`             // "power":	18.60382080078125,
	Voltage           float64 `json:"voltage"`           // "voltage":	5101.5625,
	Current           float64 `json:"current"`           // "current":	11906.25, - TODO: What is this?
	Temp              float64 `json:"temp"`              // "temp":	40.375,
	VRTemp            int64   `json:"vrTemp"`            // "vrTemp":	48, - TODO: What is this?
	HashRate          float64 `json:"hashRate"`          // "hashRate":	1332.6501927705508,
	BestDiff          string  `json:"bestDiff"`          // "bestDiff":	"540M",
	BestSessionDiff   string  `json:"bestSessionDiff"`   // "bestSessionDiff":	"67.3M",
	FreeHeap          int64   `json:"freeHeap"`          // "freeHeap":	162100, - TODO: What is this?
	CoreVoltage       int64   `json:"coreVoltage"`       // "coreVoltage":	1150,
	CoreVoltageActual int64   `json:"coreVoltageActual"` // "coreVoltageActual":	1111, - TODO: What's the difference between the two core voltage metrics?
	Frequency         int64   `json:"frequency"`         // "frequency":	596,
	SharesAccepted    int64   `json:"sharesAccepted"`    // "sharesAccepted":	151177,
	SharesRejected    int64   `json:"sharesRejected"`    // "sharesRejected":	131,
	UptimeSeconds     int64   `json:"uptimeSeconds"`     // "uptimeSeconds":	415219,
	FanRPM            int64   `json:"fanrpm"`            // "fanrpm":	8095
}
