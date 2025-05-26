import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

import { UTCDateMini } from '@date-fns/utc';

import type { User } from '#schemas/user-schemas.ts';

import { database } from '#database.ts';

import {
  CreateUserErrorResponse,
  CreateUserRequestBody,
  CreateUserResponse,
  DeleteUserErrorResponse,
  DeleteUserRequestParams,
  DeleteUserResponse,
  GetMyUserErrorResponse,
  GetMyUserResponse,
  GetUserErrorResponse,
  GetUserRequestParams,
  GetUserResponse,
  UpdateUserErrorResponse,
  UpdateUserRequestBody,
  UpdateUserRequestParams,
  UpdateUserResponse,
} from './user-route-schemas.ts';

const USERS_ROUTE = '/users';
const USER_ROUTE = `${USERS_ROUTE}/:userId`;
const MY_USER_ROUTE = `${USERS_ROUTE}/me`;

export const userRoutes: FastifyPluginAsyncZod = (fastify) => {
  fastify.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify();

      const doesAuthenticatedUserExist = database.users.some(
        ({ deletedAt, id }) => !deletedAt && id === Number(request.user.id),
      );

      if (!doesAuthenticatedUserExist) {
        reply.code(401).send({
          error: 'Invalid authentication details. Please sign-in again.',
        });
      }
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.get(
    USER_ROUTE,
    {
      schema: {
        params: GetUserRequestParams,
        response: {
          200: GetUserResponse,
          404: GetUserErrorResponse,
        },
      },
    },
    async ({ params }, reply) => {
      const user = database.users.find(
        ({ deletedAt, id }) => !deletedAt && id === Number(params.userId),
      );

      if (!user) {
        return reply.code(404).send({
          error: 'User not found',
        });
      }

      return user;
    },
  );

  fastify.get(
    MY_USER_ROUTE,
    {
      schema: {
        response: {
          200: GetMyUserResponse,
          404: GetMyUserErrorResponse,
        },
      },
    },
    async (request, reply) => {
      const user = database.users.find(
        ({ deletedAt, id }) => !deletedAt && id === request.user.id,
      );

      if (!user) {
        return reply.code(404).send({
          error: 'User not found',
        });
      }

      return user;
    },
  );

  fastify.post(
    USERS_ROUTE,
    {
      schema: {
        body: CreateUserRequestBody,
        response: {
          200: CreateUserResponse,
          409: CreateUserErrorResponse,
        },
      },
    },
    async ({ body }, reply) => {
      const doesUserAlreadyExist = database.users.some(
        ({ deletedAt, email }) => email === body.email && !deletedAt,
      );

      if (doesUserAlreadyExist) {
        return reply.code(409).send({
          error: 'User already exists',
        });
      }

      const latestUser = database.users.at(-1);

      const newDate = new UTCDateMini().toISOString();

      const newUser: User = {
        ...body,
        createdAt: newDate,
        deletedAt: null,
        id: (latestUser?.id ?? 0) + 1,
        updatedAt: newDate,
      };

      database.users.push(newUser);

      return newUser;
    },
  );

  fastify.put(
    USER_ROUTE,
    {
      schema: {
        body: UpdateUserRequestBody,
        params: UpdateUserRequestParams,
        response: {
          200: UpdateUserResponse,
          404: UpdateUserErrorResponse,
        },
      },
    },
    async ({ body, params }, reply) => {
      const user = database.users.find(
        ({ deletedAt, id }) => !deletedAt && id === Number(params.userId),
      );

      if (!user) {
        return reply.code(404).send({
          error: 'User not found',
        });
      }

      Object.assign(user, body);

      user.updatedAt = new UTCDateMini().toISOString();

      return user;
    },
  );

  fastify.delete(
    USER_ROUTE,
    {
      schema: {
        params: DeleteUserRequestParams,
        response: {
          200: DeleteUserResponse,
          404: DeleteUserErrorResponse,
        },
      },
    },
    async ({ params }, reply) => {
      const user = database.users.find(
        ({ deletedAt, id }) => !deletedAt && id === Number(params.userId),
      );

      if (!user) {
        return reply.code(404).send({
          error: 'User not found',
        });
      }

      const newDate = new UTCDateMini();

      user.deletedAt = newDate.toISOString();
      user.updatedAt = newDate.toISOString();

      return user;
    },
  );

  return Promise.resolve();
};
