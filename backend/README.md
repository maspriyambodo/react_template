# Admin FE Backend - Go with Gin Framework

A RESTful API backend built with Go and the Gin framework.

## Prerequisites

- Go 1.21 or higher
- Git

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
go mod download
```

3. Create a `.env` file from the example:
```bash
copy .env.example .env
```

4. Configure your environment variables in `.env` as needed.

## Running the Application

### Using Make (Recommended)
```bash
# View all available commands
make help

# Run in development mode
make run

# Build the binary
make build

# Run with hot reload (requires Air)
make dev

# Install development tools
make install-tools
```

### Development Mode
```bash
go run main.go
```

### Build and Run
```bash
# Build the binary
go build -o server.exe main.go

# Run the binary
./server.exe
```

### With Docker
```bash
# Build Docker image
make docker-build

# Run with Docker
make docker-run

# Or using docker-compose from project root
cd ..
docker-compose -f docker-compose.dev.yaml up backend
```

### With Environment Variables
```bash
# Windows
set PORT=8080 && set GIN_MODE=debug && go run main.go

# Linux/Mac
PORT=8080 GIN_MODE=debug go run main.go
```

## API Endpoints

### Health Check
- **GET** `/api/v1/health` - Check if the server is running

### Users (Example Endpoints)
- **GET** `/api/v1/users` - Get all users
- **GET** `/api/v1/users/:id` - Get user by ID
- **POST** `/api/v1/users` - Create a new user
- **PUT** `/api/v1/users/:id` - Update user
- **DELETE** `/api/v1/users/:id` - Delete user

## Project Structure

```
backend/
├── main.go           # Main application entry point
├── go.mod            # Go module definition
├── go.sum            # Go module checksums
├── Dockerfile        # Docker image definition
├── Makefile          # Build automation
├── .env.example      # Environment variables example
├── .env              # Environment variables (git-ignored)
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## Testing the API

Using curl:
```bash
# Health check
curl http://localhost:8080/api/v1/health

# Get all users
curl http://localhost:8080/api/v1/users

# Get user by ID
curl http://localhost:8080/api/v1/users/1

# Create a new user
curl -X POST http://localhost:8080/api/v1/users \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\"}"
```

## Configuration

The application can be configured using environment variables:

- `PORT` - Server port (default: 8080)
- `GIN_MODE` - Gin mode: `debug` or `release` (default: debug)

## Features

- ✅ RESTful API structure
- ✅ CORS enabled for frontend integration
- ✅ Environment-based configuration
- ✅ Health check endpoint
- ✅ Example CRUD operations
- ✅ JSON request/response handling
- ✅ Structured error handling

## Future Enhancements

- [ ] Database integration (PostgreSQL/MySQL)
- [ ] JWT authentication
- [ ] Request validation
- [ ] Logging middleware
- [ ] Rate limiting
- [ ] API documentation (Swagger)
- [ ] Unit tests
- [ ] Docker support

## Development

### Adding New Routes

1. Create handler functions in `main.go` or separate handler files
2. Register routes in the API group
3. Test using curl or Postman

### Hot Reload (Optional)

Install Air for hot reload during development:
```bash
go install github.com/cosmtrek/air@latest
air
```

## License
