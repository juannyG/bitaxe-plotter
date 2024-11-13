package metrics

/** Response from /api/system/info

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
*/

type SystemInfo struct {
	// "power":	18.60382080078125,
	// "voltage":	5101.5625,
	// "current":	11906.25,
	// "temp":	40.375,
	// "vrTemp":	48,
	// "hashRate":	1332.6501927705508,
	// "bestDiff":	"540M",
	// "bestSessionDiff":	"67.3M",
	// "freeHeap":	162100,
	// "coreVoltage":	1150,
	// "coreVoltageActual":	1111,
	// "frequency":	596,
	// "ssid":	"xfn24",
	// "hostname":	"bitaxe",
	// "wifiStatus":	"Connected!",
	// "sharesAccepted":	151177,
	// "sharesRejected":	131,
	// "uptimeSeconds":	415219,
	// "asicCount":	1,
	// "smallCoreCount":	2040,
	// "fanrpm":	8095
}
