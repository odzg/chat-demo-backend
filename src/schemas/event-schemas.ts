import { z, type ZodType } from 'zod';

import { EventType } from '@/enums/event-type.js';

import { ThreadMessage, ThreadUser } from './thread-schemas.js';

const BaseEventSchema = z.object({
  data: z.unknown(),
  type: EventType,
});
type BaseEventSchema = z.infer<typeof BaseEventSchema>;

export const UpdateThreadUserEventSchema = z.object({
  data: ThreadUser,
  type: z.literal(EventType.enum.update_thread_user),
}) satisfies ZodType<BaseEventSchema>;
export type UpdateThreadUserEventSchema = z.infer<
  typeof UpdateThreadUserEventSchema
>;

export const CreateThreadMessageSchema = z.object({
  data: ThreadMessage,
  type: z.literal(EventType.enum.create_thread_message),
}) satisfies ZodType<BaseEventSchema>;
export type CreateThreadMessageSchema = z.infer<
  typeof CreateThreadMessageSchema
>;
