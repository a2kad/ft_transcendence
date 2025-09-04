#!/bin/sh

CERT_DIR="./backend/certs"
KEY_FILE="$CERT_DIR/server.key"
CERT_FILE="$CERT_DIR/server.cert"

# Создаём папку, если её нет
mkdir -p $CERT_DIR

# Генерируем сертификат, если ещё нет
if [ ! -f "$KEY_FILE" ] || [ ! -f "$CERT_FILE" ]; then
  openssl req -x509 -newkey rsa:4096 \
    -keyout "$KEY_FILE" \
    -out "$CERT_FILE" \
    -days 365 -nodes \
    -subj "/CN=localhost"
  echo "SSL certificate generated in $CERT_DIR"
else
  echo "SSL certificate already exists"
fi
