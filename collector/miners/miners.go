package miners

const (
	// Miner type constants
	AXEOS_TYPE   string = "axeos"
	CGMINER_TYPE string = "cgminer"
)

type Miner struct {
	Name     string `json:"name"`
	Type     string `json:"type"`
	Host     string `json:"host"`
	StoreKey string `json:"store"`
}
