# Go Backend Makefile

.PHONY: help build run dev test clean docker-build docker-run

# Variables
BINARY_NAME=adminfe-backend
GO=go
DOCKER=docker
PORT=8080

help: ## Display this help screen
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: ## Build the Go binary
	@echo "Building..."
	$(GO) build -o $(BINARY_NAME) .
	@echo "Build complete: $(BINARY_NAME)"

run: ## Run the application
	@echo "Running $(BINARY_NAME)..."
	$(GO) run main.go

dev: ## Run in development mode with hot reload (requires Air)
	@echo "Starting development server..."
	@if command -v air > /dev/null; then \
		air; \
	else \
		echo "Air not found. Install with: go install github.com/cosmtrek/air@latest"; \
		$(GO) run main.go; \
	fi

test: ## Run tests
	@echo "Running tests..."
	$(GO) test -v ./...

clean: ## Remove build artifacts
	@echo "Cleaning..."
	@rm -f $(BINARY_NAME)
	@rm -f $(BINARY_NAME).exe
	@echo "Clean complete"

deps: ## Download dependencies
	@echo "Downloading dependencies..."
	$(GO) mod download
	@echo "Dependencies downloaded"

tidy: ## Tidy dependencies
	@echo "Tidying dependencies..."
	$(GO) mod tidy
	@echo "Dependencies tidied"

docker-build: ## Build Docker image
	@echo "Building Docker image..."
	$(DOCKER) build -t $(BINARY_NAME):latest .
	@echo "Docker image built: $(BINARY_NAME):latest"

docker-run: ## Run Docker container
	@echo "Running Docker container..."
	$(DOCKER) run -p $(PORT):$(PORT) --env-file .env $(BINARY_NAME):latest

docker-compose-up: ## Start with docker-compose
	@echo "Starting services with docker-compose..."
	cd .. && docker-compose -f docker-compose.dev.yaml up backend

docker-compose-down: ## Stop docker-compose services
	@echo "Stopping services..."
	cd .. && docker-compose -f docker-compose.dev.yaml down

install-tools: ## Install development tools
	@echo "Installing development tools..."
	$(GO) install github.com/cosmtrek/air@latest
	@echo "Tools installed"
