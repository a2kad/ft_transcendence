Place your SSL certificate files here:
- server.key (private key)
- server.cert (certificate)
For development, you can generate self-signed certificates using OpenSSL:
openssl req -x509 -newkey rsa:4096 -keyout server.key -out server.cert -days 365 -nodes -subj "/CN=localhost"
