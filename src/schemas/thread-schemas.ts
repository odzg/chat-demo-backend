import { z } from 'zod';

export const ThreadMessage = z.object({
  content: z.string(),
  createdAt: z.date(),
  deletedAt: z.date().nullable(),
  id: z.number(),
  threadId: z.number(),
  updatedAt: z.date(),
  userId: z.number(),
});
export type ThreadMessage = z.infer<typeof ThreadMessage>;

export const Thread = z.object({
  createdAt: z.date(),
  deletedAt: z.date().nullable(),
  id: z.number(),
  updatedAt: z.date(),
});

export const ThreadUser = z.object({
  createdAt: z.date(),
  deletedAt: z.date().nullable(),
  id: z.number(),
  threadId: z.number(),
  updatedAt: z.date(),
  userId: z.number(),
  viewedThreadLastAt: z.date(),
});
