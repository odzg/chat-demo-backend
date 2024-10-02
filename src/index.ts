import { fastifyCors } from '@fastify/cors';
import { fastifyJwt } from '@fastify/jwt';
import { fastifyWebsocket } from '@fastify/websocket';
import Fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

import { env } from './constants/env.js';
import { routes } from './routes/index.js';

const fastify = Fastify({ logger: true });

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

await fastify.register(fastifyCors);
await fastify.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});
await fastify.register(fastifyWebsocket);
await fastify.register(routes);

try {
  await fastify.listen({
    host: env.HOST,
    port: Number(env.PORT),
  });
} catch (error) {
  fastify.log.error(error);
  throw new Error('Error while starting server', {
    cause: error,
  });
}
