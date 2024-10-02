import { z } from 'zod';

import { User } from '@/schemas/user-schemas.js';

export const SignInRequestBody = User.pick({
  email: true,
  password: true,
});
export const SignInResponse = z.object({
  token: z.string(),
  user: User,
});
export const SignInErrorResponse = z.object({
  error: z.string(),
});
