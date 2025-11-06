package config

import (
	"encoding/json"
	"os"
)

type Config struct {
	BootCfgPath string `json:"boot_cfg_path"`
}

func Load(path string) (*Config, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var cfg Config
	if err := json.Unmarshal(data, &cfg); err != nil {
		return nil, err
	}

	return &cfg, nil
}