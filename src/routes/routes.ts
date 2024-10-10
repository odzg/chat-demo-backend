import type { FastifyPluginAsync } from 'fastify';

import { clients } from '@/constants/clients.js';

import { authRoutes } from './auth-routes/index.js';
import { threadRoutes } from './thread-routes/index.js';
import { userRoutes } from './user-routes/index.js';

export const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', { websocket: true }, (connection) => {
    // Add the new client to the set
    clients.add(connection);

    // Handle incoming messages
    connection.on('message', (message) => {
      // Broadcast the message to all connected clients
      for (const client of clients) {
        if (client !== connection) {
          client.send(message);
        }
      }
    });

    // Handle client disconnection
    connection.on('close', () => {
      clients.delete(connection);
    });
  });

  await fastify.register(authRoutes);
  await fastify.register(threadRoutes);
  await fastify.register(userRoutes);
};
