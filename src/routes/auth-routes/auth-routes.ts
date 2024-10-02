import type { FastifyPluginCallback } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { db } from '@/db.js';

import {
  SignInErrorResponse,
  SignInRequestBody,
  SignInResponse,
} from './auth-route-schemas.js';

const SIGN_IN_ROUTE = '/sign-in';

export const authRoutes: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    SIGN_IN_ROUTE,
    {
      schema: {
        body: SignInRequestBody,
        response: {
          200: SignInResponse,
          401: SignInErrorResponse,
          404: SignInErrorResponse,
        },
      },
    },
    async ({ body }, reply) => {
      const user = db.users.find(
        ({ deletedAt, email }) => !deletedAt && email === body.email,
      );

      if (!user) {
        return reply.code(404).send({
          error: 'User not found',
        });
      }

      if (user.password !== body.password) {
        return reply.code(401).send({
          error: 'Incorrect password',
        });
      }

      const token = fastify.jwt.sign({
        id: user.id,
      });

      return reply.send({
        token,
        user,
      });
    },
  );

  done();
};
