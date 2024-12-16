import type { ValueOf } from 'type-fest';

export const EventType = {
  CREATE_THREAD_MESSAGE: 'create_thread_message',
  UPDATE_THREAD_USER: 'update_thread_user',
} as const satisfies Record<string, string>;

export type EventType = ValueOf<typeof EventType>;
