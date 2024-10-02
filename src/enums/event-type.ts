import { z } from 'zod';

export const EventType = z.enum([
  'update_thread_user',
  'create_thread_message',
]);
export type EventType = z.infer<typeof EventType>;
