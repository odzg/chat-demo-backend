import { z } from 'zod';

export const User = z.object({
  createdAt: z.date(),
  deletedAt: z.date().nullable(),
  email: z.string(),
  firstName: z.string(),
  id: z.number(),
  lastName: z.string(),
  password: z.string().min(8),
  profilePictureUrl: z.string(),
  updatedAt: z.date(),
});
export type User = z.infer<typeof User>;
