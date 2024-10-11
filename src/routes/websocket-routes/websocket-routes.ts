import type { FastifyPluginCallback } from 'fastify';

const WEBSOCKET_PATH = '/websocket';

export const websocketRoutes: FastifyPluginCallback = (
  fastify,
  _opts,
  done,
) => {
  fastify.get(WEBSOCKET_PATH, { websocket: true }, () => undefined);

  done();
};
