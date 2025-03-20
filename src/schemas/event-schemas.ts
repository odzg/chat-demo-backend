import { z, type ZodType } from 'zod';

import { EventType } from '#enums/event-type.ts';

import { ThreadMessage, ThreadUser } from './thread-schemas.ts';

const BaseEventSchema = z.object({
  payload: z.unknown(),
  type: z.nativeEnum(EventType),
});

interface BaseEventSchema extends z.infer<typeof BaseEventSchema> {}

export const UpdateThreadUserEventSchema = z.object({
  payload: ThreadUser,
  type: z.literal(EventType.UPDATE_THREAD_USER),
}) satisfies ZodType<BaseEventSchema>;

export interface UpdateThreadUserEventSchema
  extends z.infer<typeof UpdateThreadUserEventSchema> {}

export const CreateThreadMessageSchema = z.object({
  payload: ThreadMessage,
  type: z.literal(EventType.CREATE_THREAD_MESSAGE),
}) satisfies ZodType<BaseEventSchema>;

export interface CreateThreadMessageSchema
  extends z.infer<typeof CreateThreadMessageSchema> {}
