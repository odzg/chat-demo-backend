import type { FastifyPluginAsync } from 'fastify';

import { authRoutes } from './auth-routes/index.js';
import { threadRoutes } from './thread-routes/index.js';
import { userRoutes } from './user-routes/index.js';
import { websocketRoutes } from './websocket-routes/index.js';

export const routes: FastifyPluginAsync = async (fastify) => {
  await fastify.register(authRoutes);
  await fastify.register(threadRoutes);
  await fastify.register(userRoutes);
  await fastify.register(websocketRoutes);
};
