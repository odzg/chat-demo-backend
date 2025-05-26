import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

const WEBSOCKET_PATH = '/websocket';

export const websocketRoutes: FastifyPluginAsyncZod = (fastify) => {
  fastify.get(WEBSOCKET_PATH, { websocket: true }, () => null);

  return Promise.resolve();
};
