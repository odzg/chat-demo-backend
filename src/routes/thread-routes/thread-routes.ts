import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

import { UTCDateMini } from '@date-fns/utc';

import type {
  CreateThreadMessageSchema,
  UpdateThreadUserEventSchema,
} from '#schemas/event-schemas.ts';
import type { ThreadMessage } from '#schemas/thread-schemas.ts';

import { database } from '#database.ts';
import { EventType } from '#enums/event-type.ts';
import { User } from '#schemas/user-schemas.ts';

import {
  CreateThreadMessageRequestBody,
  CreateThreadMessageRequestParams,
  CreateThreadMessageResponse,
  GetThreadErrorResponse,
  GetThreadMessageErrorResponse,
  GetThreadMessageRequestParams,
  GetThreadMessageResponse,
  GetThreadMessagesErrorResponse,
  GetThreadMessagesRequestParams,
  GetThreadMessagesResponse,
  GetThreadRequestParams,
  GetThreadResponse,
  GetThreadsErrorResponse,
  GetThreadsResponse,
  GetThreadUserErrorResponse,
  GetThreadUserRequestParams,
  GetThreadUserResponse,
  GetThreadUsersErrorResponse,
  GetThreadUsersRequestParams,
  GetThreadUsersResponse,
  UpdateThreadUserErrorResponse,
  UpdateThreadUserRequestBody,
  UpdateThreadUserRequestParams,
  UpdateThreadUserResponse,
} from './thread-route-schemas.ts';

const THREADS_ROUTE = '/threads';
const THREAD_ROUTE = `${THREADS_ROUTE}/:threadId`;
const THREAD_MESSAGES_ROUTE = `${THREAD_ROUTE}/messages`;
const THREAD_MESSAGE_ROUTE = `${THREAD_MESSAGES_ROUTE}/:messageId`;
const THREAD_USERS_ROUTE = `${THREAD_ROUTE}/users`;
const THREAD_USER_ROUTE = `${THREAD_USERS_ROUTE}/:threadUserId`;

export const threadRoutes: FastifyPluginAsyncZod = (fastify) => {
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
    THREADS_ROUTE,
    {
      schema: {
        response: {
          200: GetThreadsResponse,
          401: GetThreadsErrorResponse,
        },
      },
    },
    async (request, reply) => {
      const user = database.users.find(
        ({ deletedAt, id }) => !deletedAt && id === Number(request.user.id),
      );

      if (!user) {
        return reply.code(401).send({
          error: 'Invalid authentication details. Please sign-in again.',
        });
      }

      const threads = database.threads.filter((thread) => {
        const isThreadAssociatedWithUser = database.threadUsers.some(
          (threadUser) =>
            threadUser.threadId === thread.id &&
            threadUser.userId === request.user.id,
        );

        return isThreadAssociatedWithUser;
      });

      function getUserByThreadUser(threadUser: { userId: number }) {
        const user = database.users.find(({ id }) => id === threadUser.userId);
        return User.parse(user);
      }

      return threads.map((thread) => ({
        ...thread,
        lastMessage:
          database.threadMessages.findLast(
            ({ threadId }) => threadId === thread.id,
          ) ?? null,
        threadUsers: database.threadUsers
          .filter(({ threadId }) => threadId === thread.id)
          .map((threadUser) => ({
            ...threadUser,
            user: getUserByThreadUser(threadUser),
          })),
      }));
    },
  );

  fastify.get(
    THREAD_ROUTE,
    {
      schema: {
        params: GetThreadRequestParams,
        response: {
          200: GetThreadResponse,
          404: GetThreadErrorResponse,
        },
      },
    },
    async ({ params }, reply) => {
      const thread = database.threads.find(
        ({ deletedAt, id }) => !deletedAt && id === Number(params.threadId),
      );

      if (!thread) {
        return reply.code(404).send({
          error: 'Thread not found',
        });
      }

      return thread;
    },
  );

  fastify.get(
    THREAD_MESSAGES_ROUTE,
    {
      schema: {
        params: GetThreadMessagesRequestParams,
        response: {
          200: GetThreadMessagesResponse,
          404: GetThreadMessagesErrorResponse,
        },
      },
    },
    async ({ params }, reply) => {
      const thread = database.threads.find(
        ({ deletedAt, id }) => !deletedAt && id === Number(params.threadId),
      );

      if (!thread) {
        return reply.code(404).send({
          error: 'Thread not found',
        });
      }

      const threadMessages = database.threadMessages.filter(
        ({ deletedAt, threadId }) => !deletedAt && threadId === thread.id,
      );

      return threadMessages;
    },
  );

  fastify.get(
    THREAD_MESSAGE_ROUTE,
    {
      schema: {
        params: GetThreadMessageRequestParams,
        response: {
          200: GetThreadMessageResponse,
          404: GetThreadMessageErrorResponse,
        },
      },
    },
    async ({ params }, reply) => {
      const thread = database.threads.find(
        ({ deletedAt, id }) => !deletedAt && id === Number(params.threadId),
      );

      if (!thread) {
        return reply.code(404).send({
          error: 'Thread not found',
        });
      }

      const threadMessage = database.threadMessages.find(
        ({ deletedAt, id, threadId }) =>
          !deletedAt &&
          threadId === thread.id &&
          id === Number(params.messageId),
      );

      if (!threadMessage) {
        return reply.code(404).send({
          error: 'Thread exists, but specified message could not be found',
        });
      }

      return threadMessage;
    },
  );

  fastify.post(
    THREAD_MESSAGES_ROUTE,
    {
      schema: {
        body: CreateThreadMessageRequestBody,
        params: CreateThreadMessageRequestParams,
        response: {
          200: CreateThreadMessageResponse,
        },
      },
    },
    ({ body, params }) => {
      const latestThreadMessage = database.threadMessages.at(-1);

      const newDate = new UTCDateMini().toISOString();

      const newThreadMessage: ThreadMessage = {
        ...body,
        createdAt: newDate,
        deletedAt: null,
        id: (latestThreadMessage?.id ?? 0) + 1,
        threadId: Number(params.threadId),
        updatedAt: newDate,
      };

      database.threadMessages.push(newThreadMessage);

      for (const client of fastify.websocketServer.clients) {
        if (client.readyState === client.OPEN) {
          client.send(
            JSON.stringify({
              payload: newThreadMessage,
              type: EventType.CREATE_THREAD_MESSAGE,
            } satisfies CreateThreadMessageSchema),
          );
        }
      }

      return newThreadMessage;
    },
  );

  fastify.get(
    THREAD_USERS_ROUTE,
    {
      schema: {
        params: GetThreadUsersRequestParams,
        response: {
          200: GetThreadUsersResponse,
          404: GetThreadUsersErrorResponse,
        },
      },
    },
    async ({ params }, reply) => {
      const thread = database.threads.find(
        ({ deletedAt, id }) => !deletedAt && id === Number(params.threadId),
      );

      if (!thread) {
        return reply.code(404).send({
          error: 'Thread not found',
        });
      }

      const threadUsers = database.threadUsers.filter(
        ({ deletedAt, threadId }) => !deletedAt && threadId === thread.id,
      );

      return threadUsers.map((threadUser) => ({
        ...threadUser,
        user: User.parse(
          database.users.find(({ id }) => id === threadUser.userId),
        ),
      }));
    },
  );

  fastify.get(
    THREAD_USER_ROUTE,
    {
      schema: {
        params: GetThreadUserRequestParams,
        response: {
          200: GetThreadUserResponse,
          404: GetThreadUserErrorResponse,
        },
      },
    },
    async ({ params }, reply) => {
      const thread = database.threads.find(
        ({ deletedAt, id }) => !deletedAt && id === Number(params.threadId),
      );

      if (!thread) {
        return reply.code(404).send({
          error: 'Thread not found',
        });
      }

      const threadUser = database.threadUsers.find(
        ({ deletedAt, id, threadId }) =>
          !deletedAt &&
          threadId === thread.id &&
          id === Number(params.threadUserId),
      );

      if (!threadUser) {
        return reply.code(404).send({
          error:
            'Thread exists, but specified associated user could not be found',
        });
      }

      return {
        ...threadUser,
        user: User.parse(
          database.users.find(({ id }) => id === threadUser.userId),
        ),
      };
    },
  );

  fastify.put(
    THREAD_USER_ROUTE,
    {
      schema: {
        body: UpdateThreadUserRequestBody,
        params: UpdateThreadUserRequestParams,
        response: {
          200: UpdateThreadUserResponse,
          404: UpdateThreadUserErrorResponse,
        },
      },
    },
    async ({ body, params }, reply) => {
      const thread = database.threads.find(
        ({ deletedAt, id }) => !deletedAt && id === Number(params.threadId),
      );

      if (!thread) {
        return reply.code(404).send({
          error: 'Thread not found',
        });
      }

      const threadUser = database.threadUsers.find(
        ({ deletedAt, id, threadId }) =>
          !deletedAt &&
          threadId === thread.id &&
          id === Number(params.threadUserId),
      );

      if (!threadUser) {
        return reply.code(404).send({
          error:
            'Thread exists, but specified associated user could not be found',
        });
      }

      Object.assign(threadUser, body);

      threadUser.updatedAt = new UTCDateMini().toISOString();

      for (const client of fastify.websocketServer.clients) {
        if (client.readyState === client.OPEN) {
          client.send(
            JSON.stringify({
              payload: threadUser,
              type: EventType.UPDATE_THREAD_USER,
            } satisfies UpdateThreadUserEventSchema),
          );
        }
      }

      return {
        ...threadUser,
        user: User.parse(
          database.users.find(({ id }) => id === threadUser.userId),
        ),
      };
    },
  );

  return Promise.resolve();
};
