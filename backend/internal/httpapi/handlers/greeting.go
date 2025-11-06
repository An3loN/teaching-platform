package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GreetingHandler(c *gin.Context) {
	c.JSON(http.StatusOK, map[string]any{
		"message": "SOSAL GUBAMI",
	})
}