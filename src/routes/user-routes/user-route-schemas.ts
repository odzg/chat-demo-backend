import { z } from 'zod';

import { User } from '@/schemas/user-schemas.js';

export const GetUserRequestParams = z.object({
  userId: z.string(),
});
export const GetUserResponse = User;
export const GetUserErrorResponse = z.object({
  error: z.string(),
});

export const GetMyUserResponse = User;
export const GetMyUserErrorResponse = z.object({
  error: z.string(),
});

export const CreateUserRequestBody = User.omit({
  createdAt: true,
  deletedAt: true,
  id: true,
  updatedAt: true,
});
export const CreateUserResponse = User;
export const CreateUserErrorResponse = z.object({
  error: z.string(),
});

export const UpdateUserRequestParams = z.object({
  userId: z.string(),
});
export const UpdateUserRequestBody = User.pick({
  email: true,
  firstName: true,
  lastName: true,
  password: true,
  profilePictureUrl: true,
}).partial();
export const UpdateUserResponse = User;
export const UpdateUserErrorResponse = z.object({
  error: z.string(),
});

export const DeleteUserRequestParams = z.object({
  userId: z.string(),
});
export const DeleteUserResponse = User;
export const DeleteUserErrorResponse = z.object({
  error: z.string(),
});
