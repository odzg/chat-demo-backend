import type { Simplify } from 'type-fest';

import type { User } from '@/schemas/user-schemas.ts';

export type {} from '@fastify/jwt';

declare module '@fastify/jwt' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface FastifyJWT {
    payload: Simplify<Pick<User, 'id'>>;
    user: Simplify<Pick<User, 'id'>>;
  }
}
