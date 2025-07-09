import { z } from 'zod';

export const User = z.object({
  createdAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable(),
  email: z.string(),
  firstName: z.string(),
  id: z.number(),
  lastName: z.string(),
  password: z.string().min(8),
  profilePictureUrl: z.string(),
  updatedAt: z.iso.datetime(),
});

export interface User extends z.infer<typeof User> {}
