import fastifyJwt from '@fastify/jwt';

export function registerJwt(fastify) {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'supersecretkey',
    sign: { expiresIn: '1h' }
  });
}

export function authenticate(request, reply, done) {
  try {
    request.jwtVerify();
    done();
  } catch (err) {
    reply.code(401).send({ error: 'Unauthorized' });
  }
}
