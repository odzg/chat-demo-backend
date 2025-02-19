import type { Simplify } from 'type-fest';

import type { User } from '#schemas/user-schemas.ts';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: Simplify<Pick<User, 'id'>>;
    user: Simplify<Pick<User, 'id'>>;
  }
}
