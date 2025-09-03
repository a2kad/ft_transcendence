import Fastify from 'fastify';
import userRoutes from './routes/users.js';

const fastify = Fastify({ logger: true });

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
