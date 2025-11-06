package app

import (
	"backend/internal/config"
	"backend/internal/httpapi"
	"context"
	"log"
	"os"

	rkboot "github.com/rookie-ninja/rk-boot/v2"
	rkgin "github.com/rookie-ninja/rk-gin/v2/boot"
)

func Run(ctx context.Context, cfg *config.Config) {
	bootCfg, err := os.ReadFile(cfg.BootCfgPath)
	if err != nil {
		log.Fatalf("Failed to read config. Error: %v, path: %v", err, cfg.BootCfgPath)
	}

	boot := rkboot.NewBoot(
		rkboot.WithBootConfigRaw(bootCfg),
	)

	entry := rkgin.GetGinEntry("app")

	httpapi.RegisterRoutes(entry)

	boot.Bootstrap(ctx)
	boot.WaitForShutdownSig(ctx)
}
