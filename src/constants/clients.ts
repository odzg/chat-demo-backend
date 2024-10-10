import type WebSocket from 'ws';

export const clients = new Set<WebSocket.WebSocket>();
