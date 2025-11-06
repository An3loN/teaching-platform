package main

import (
	"backend/internal/app"
	"backend/internal/config"
	"context"
	"log"
)

func main() {
	cfg, err := config.Load("./config/config.json")
	if err != nil {
		log.Fatalf("Failed to read config: %v", err)
	}

	app.Run(context.TODO(), cfg)
}
