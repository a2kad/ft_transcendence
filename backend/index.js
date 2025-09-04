import Fastify from 'fastify';
import userRoutes from './routes/users.js';
import { registerJwt } from './auth/jwt.js';
import fs from 'fs';
import https from 'https'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keyPath = path.join(__dirname, 'certs', 'server.key');
const certPath = path.join(__dirname, 'certs', 'server.cert');

const fastify = Fastify({
  logger: true,
  https: {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
  }
});

registerJwt(fastify);

fastify.register(userRoutes);

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

fastify.listen({ port: 3001, host: '0.0.0.0' }, err => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
