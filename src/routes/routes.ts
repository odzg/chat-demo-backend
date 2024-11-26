import type { FastifyPluginAsync } from 'fastify';

import { authRoutes } from './auth-routes/index.ts';
import { threadRoutes } from './thread-routes/index.ts';
import { userRoutes } from './user-routes/index.ts';
import { websocketRoutes } from './websocket-routes/index.ts';

export const routes: FastifyPluginAsync = async (fastify) => {
  await fastify.register(authRoutes);
  await fastify.register(threadRoutes);
  await fastify.register(userRoutes);
  await fastify.register(websocketRoutes);
};
