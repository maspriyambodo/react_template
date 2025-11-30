# Backend Build Guide

This document explains how to build and deploy the Go backend API.

## Quick Start

```bash
# Navigate to backend directory
cd backend

# Install dependencies
go mod download

# Run in development
make run

# Build binary
make build

# Run tests
make test
```

## Build Options

### 1. Direct Go Build

```bash
# Build for current platform
go build -o adminfe-backend main.go

# Run the binary
./adminfe-backend

# Build for Windows
GOOS=windows GOARCH=amd64 go build -o adminfe-backend.exe main.go

# Build for Linux
GOOS=linux GOARCH=amd64 go build -o adminfe-backend main.go

# Build for macOS
GOOS=darwin GOARCH=amd64 go build -o adminfe-backend main.go
```

### 2. Using Makefile

The Makefile provides convenient commands:

```bash
# View all commands
make help

# Build the binary
make build

# Run the application
make run

# Run with hot reload (requires Air)
make dev

# Run tests
make test

# Clean build artifacts
make clean

# Download dependencies
make deps

# Tidy dependencies
make tidy
```

### 3. Docker Build

#### Single Container Build

```bash
# Build Docker image
cd backend
docker build -t adminfe-backend:latest .

# Run Docker container
docker run -p 8080:8080 --env-file .env adminfe-backend:latest

# Or using Make
make docker-build
make docker-run
```

#### Docker Compose Build

```bash
# From project root - Development
docker-compose -f docker-compose.dev.yaml build backend
docker-compose -f docker-compose.dev.yaml up backend

# From project root - Production
docker-compose -f docker-compose.prod.yaml build backend
docker-compose -f docker-compose.prod.yaml up -d backend

# From backend directory
make docker-compose-up
```

## Build Optimization

### Production Build Flags

```bash
# Optimized production build
go build -ldflags="-s -w" -o adminfe-backend main.go

# Even smaller with UPX (if installed)
go build -ldflags="-s -w" -o adminfe-backend main.go
upx --best --lzma adminfe-backend
```

**Build flags explained:**
- `-ldflags="-s -w"`: Strip debugging information
- `-s`: Omit symbol table
- `-w`: Omit DWARF symbol table

### Multi-platform Build

```bash
# Build for all major platforms
GOOS=linux GOARCH=amd64 go build -o build/adminfe-backend-linux-amd64 main.go
GOOS=windows GOARCH=amd64 go build -o build/adminfe-backend-windows-amd64.exe main.go
GOOS=darwin GOARCH=amd64 go build -o build/adminfe-backend-darwin-amd64 main.go
GOOS=darwin GOARCH=arm64 go build -o build/adminfe-backend-darwin-arm64 main.go
```

## Docker Multi-stage Build

The Dockerfile uses a two-stage build process:

### Stage 1: Builder
- Uses `golang:1.21-alpine` base image
- Installs git for dependencies
- Downloads Go dependencies
- Compiles the application

### Stage 2: Runtime
- Uses minimal `alpine:latest` base image
- Copies only the compiled binary
- Installs ca-certificates for HTTPS
- Results in a much smaller image (~15MB vs ~300MB+)

### Benefits
- ✅ Smaller image size
- ✅ Faster deployment
- ✅ Better security (fewer attack vectors)
- ✅ Optimized for production

## Environment Configuration

### Development

Create `.env` file:
```env
PORT=8080
GIN_MODE=debug
```

### Production

```env
PORT=8080
GIN_MODE=release
```

### Docker Environment

Environment variables can be passed via:

1. **docker-compose.yaml**
```yaml
environment:
  - PORT=8080
  - GIN_MODE=release
```

2. **--env-file flag**
```bash
docker run -p 8080:8080 --env-file .env adminfe-backend:latest
```

3. **Individual -e flags**
```bash
docker run -p 8080:8080 -e PORT=8080 -e GIN_MODE=release adminfe-backend:latest
```

## Testing the Build

### Local Binary Test

```bash
# Build
make build

# Run
./adminfe-backend

# Test endpoint
curl http://localhost:8080/api/v1/health
```

### Docker Test

```bash
# Build
docker build -t adminfe-backend:test .

# Run
docker run -p 8080:8080 adminfe-backend:test

# Test
curl http://localhost:8080/api/v1/health
```

### Integration Test

```bash
# Start full stack with docker-compose
docker-compose -f docker-compose.dev.yaml up

# Test backend directly
curl http://localhost:8080/api/v1/health

# Test via nginx proxy
curl http://localhost/api/v1/health
```

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Build Backend

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Go
      uses: actions/setup-go@v4
      with:
        go-version: '1.21'
    
    - name: Install dependencies
      working-directory: ./backend
      run: go mod download
    
    - name: Run tests
      working-directory: ./backend
      run: go test -v ./...
    
    - name: Build
      working-directory: ./backend
      run: go build -v -o adminfe-backend main.go
    
    - name: Build Docker image
      working-directory: ./backend
      run: docker build -t adminfe-backend:${{ github.sha }} .
```

### GitLab CI Example

```yaml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  image: golang:1.21
  script:
    - cd backend
    - go mod download
    - go test -v ./...

build:
  stage: build
  image: golang:1.21
  script:
    - cd backend
    - go build -o adminfe-backend main.go
  artifacts:
    paths:
      - backend/adminfe-backend

docker-build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  script:
    - cd backend
    - docker build -t adminfe-backend:$CI_COMMIT_SHA .
```

## Deployment

### Direct Binary Deployment

```bash
# 1. Build on your machine
make build

# 2. Copy to server
scp adminfe-backend user@server:/opt/adminfe/

# 3. SSH to server and run
ssh user@server
cd /opt/adminfe
./adminfe-backend
```

### Docker Deployment

```bash
# 1. Build image
docker build -t registry.example.com/adminfe-backend:latest .

# 2. Push to registry
docker push registry.example.com/adminfe-backend:latest

# 3. Pull and run on server
docker pull registry.example.com/adminfe-backend:latest
docker run -d -p 8080:8080 registry.example.com/adminfe-backend:latest
```

### Docker Compose Deployment

```bash
# On server
git clone <repository>
cd project
docker-compose -f docker-compose.prod.yaml up -d
```

## Monitoring Build Size

```bash
# Check binary size
ls -lh adminfe-backend

# Check Docker image size
docker images adminfe-backend

# Analyze image layers
docker history adminfe-backend:latest
```

## Troubleshooting

### Build Fails

```bash
# Clean and retry
make clean
go clean -cache
go mod tidy
make build
```

### Docker Build Fails

```bash
# Clear Docker cache
docker builder prune -a

# Build without cache
docker build --no-cache -t adminfe-backend:latest .
```

### Module Issues

```bash
# Update dependencies
go get -u ./...
go mod tidy

# Verify modules
go mod verify
```

## Best Practices

1. **Always test builds locally before CI/CD**
2. **Use semantic versioning for Docker tags**
3. **Keep Dockerfile optimized with multi-stage builds**
4. **Use .dockerignore to exclude unnecessary files**
5. **Pin Go version in Dockerfile for consistency**
6. **Run security scans on built images**
7. **Keep dependencies up to date**
8. **Use health checks in production**

## Performance Benchmarks

Typical build times and sizes:

- **Go Binary**: ~5-10 seconds, ~10-15MB
- **Docker Image**: ~30-60 seconds, ~15-20MB
- **With Dependencies**: Binary size may vary based on imported packages

## Security Considerations

1. **Scan dependencies**: `go list -m all | nancy sleuth`
2. **Scan Docker images**: `docker scan adminfe-backend:latest`
3. **Use minimal base images**: Alpine instead of full OS
4. **Don't include .env in images**: Use secrets management
5. **Run as non-root user in production**

## Resources

- [Go Build Documentation](https://golang.org/cmd/go/#hdr-Compile_packages_and_dependencies)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Gin Framework Docs](https://gin-gonic.com/docs/)
