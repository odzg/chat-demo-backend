import { fastifyCors } from '@fastify/cors';
import { fastifyWebsocket } from '@fastify/websocket';
import Fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

import { env } from './constants/env.ts';
import { fastifyJwt } from './plugins/jwt.ts';
import { routes } from './routes/index.ts';

const fastify = Fastify({ logger: true });

fastify.setValidatorCompiler(validatorCompiler);
/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument --
Currently awaiting the following PR to be merged: https://github.com/turkerdev/fastify-type-provider-zod/pull/172,
in order to resolve the related reported issue: https://github.com/turkerdev/fastify-type-provider-zod/issues/171. */
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
