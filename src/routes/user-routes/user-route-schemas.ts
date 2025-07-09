import { z } from 'zod';

import { User } from '#schemas/user-schemas.ts';

export const GetUserRequestParams = z.object({
  userId: z.string(),
});

export const GetUserErrorResponse = z.object({
  error: z.string(),
});
export const GetMyUserErrorResponse = z.object({
  error: z.string(),
});

export const CreateUserRequestBody = User.omit({
  createdAt: true,
  deletedAt: true,
  id: true,
  updatedAt: true,
});
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

export const UpdateUserErrorResponse = z.object({
  error: z.string(),
});

export const DeleteUserRequestParams = z.object({
  userId: z.string(),
});
export const DeleteUserErrorResponse = z.object({
  error: z.string(),
});

export {
  User as CreateUserResponse,
  User as DeleteUserResponse,
  User as GetMyUserResponse,
  User as GetUserResponse,
  User as UpdateUserResponse,
} from '#schemas/user-schemas.ts';
