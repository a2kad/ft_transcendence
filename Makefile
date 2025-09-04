default: up

up:
	certs
	docker compose up

certs:
	./backend/generate-certs.sh

down:
	docker compose down

restart: down up

logs:
	docker compose logs -f

build:
	docker compose build

clean:
	docker compose down --volumes --remove-orphans

ps:
	docker compose ps