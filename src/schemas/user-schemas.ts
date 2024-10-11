import { z } from 'zod';

export const User = z.object({
  createdAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
  email: z.string(),
  firstName: z.string(),
  id: z.number(),
  lastName: z.string(),
  password: z.string().min(8),
  profilePictureUrl: z.string(),
  updatedAt: z.string().datetime(),
});
export type User = z.infer<typeof User>;
