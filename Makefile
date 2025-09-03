# Makefile for Docker Compose

# Variables
default: up

# Start the application
up:
	docker compose up

# Stop the application
down:
	docker compose down

# Restart the application
restart: down up

# View logs
logs:
	docker compose logs -f

# Build the application
build:
	docker compose build

# Remove all containers, networks, and volumes created by Docker Compose
clean:
	docker compose down --volumes --remove-orphans

# List running containers
ps:
	docker compose ps