import { z } from 'zod/v4';

export const ThreadMessage = z.object({
  content: z.string(),
  createdAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable(),
  id: z.number(),
  threadId: z.number(),
  updatedAt: z.iso.datetime(),
  userId: z.number(),
});

export interface ThreadMessage extends z.infer<typeof ThreadMessage> {}

export const Thread = z.object({
  createdAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable(),
  id: z.number(),
  updatedAt: z.iso.datetime(),
});

export const ThreadUser = z.object({
  createdAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable(),
  id: z.number(),
  threadId: z.number(),
  updatedAt: z.iso.datetime(),
  userId: z.number(),
  viewedThreadLastAt: z.iso.datetime(),
});
