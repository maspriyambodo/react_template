package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	// Set Gin mode based on environment
	mode := os.Getenv("GIN_MODE")
	if mode == "release" {
		gin.SetMode(gin.ReleaseMode)
	} else {
		gin.SetMode(gin.DebugMode)
	}

	// Create a new Gin router
	router := gin.Default()

	// CORS middleware
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// API routes group
	api := router.Group("/api/v1")
	{
		// Health check endpoint
		api.GET("/health", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"status":  "ok",
				"message": "Server is running",
			})
		})

		// Example endpoints
		api.GET("/users", getUsers)
		api.GET("/users/:id", getUserByID)
		api.POST("/users", createUser)
		api.PUT("/users/:id", updateUser)
		api.DELETE("/users/:id", deleteUser)
	}

	// Get port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Starting server on port %s...", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}

// Example handlers
func getUsers(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"data": []map[string]interface{}{
			{"id": 1, "name": "John Doe", "email": "john@example.com"},
			{"id": 2, "name": "Jane Smith", "email": "jane@example.com"},
		},
		"message": "Users retrieved successfully",
	})
}

func getUserByID(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{
		"data":    map[string]interface{}{"id": id, "name": "John Doe", "email": "john@example.com"},
		"message": "User retrieved successfully",
	})
}

func createUser(c *gin.Context) {
	var user map[string]interface{}
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"data":    user,
		"message": "User created successfully",
	})
}

func updateUser(c *gin.Context) {
	id := c.Param("id")
	var user map[string]interface{}
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	user["id"] = id
	c.JSON(http.StatusOK, gin.H{
		"data":    user,
		"message": "User updated successfully",
	})
}

func deleteUser(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{
		"message": "User deleted successfully",
		"id":      id,
	})
}
