import type { Simplify } from 'type-fest';

import {
  fastifyJwt as baseFastifyJwt,
  type FastifyJWTOptions as BaseFastifyJWTOptions,
} from '@fastify/jwt';
import { fastifyPlugin } from 'fastify-plugin';

import type { User } from '#schemas/user-schemas.ts';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: Simplify<Pick<User, 'id'>>;
    user: Simplify<Pick<User, 'id'>>;
  }
}

interface FastifyJWTOptions extends BaseFastifyJWTOptions {}

export const fastifyJwt = fastifyPlugin<FastifyJWTOptions>(
  async (fastify, options) => {
    await fastify.register(baseFastifyJwt, options);
  },
);
