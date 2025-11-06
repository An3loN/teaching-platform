package httpapi

import (
	"backend/internal/httpapi/handlers"

	rkgin "github.com/rookie-ninja/rk-gin/v2/boot"
)

func RegisterRoutes(ginEntry *rkgin.GinEntry) {
	router := ginEntry.Router

	v1 := router.Group("/v1")
	{
		v1.GET("/greeting", handlers.GreetingHandler)
	}
}
