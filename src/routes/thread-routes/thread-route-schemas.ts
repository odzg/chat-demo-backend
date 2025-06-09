import { z } from 'zod/v4';

import { Thread, ThreadMessage, ThreadUser } from '#schemas/thread-schemas.ts';
import { User } from '#schemas/user-schemas.ts';

export const GetThreadsResponse = Thread.and(
  z.object({
    lastMessage: ThreadMessage.nullable(),
    threadUsers: ThreadUser.and(
      z.object({
        user: User,
      }),
    ).array(),
  }),
).array();
export const GetThreadsErrorResponse = z.object({
  error: z.string(),
});

export const GetThreadRequestParams = z.object({
  threadId: z.string(),
});
export const GetThreadErrorResponse = z.object({
  error: z.string(),
});

export const GetThreadMessagesRequestParams = z.object({
  threadId: z.string(),
});
export const GetThreadMessagesResponse = ThreadMessage.array();
export const GetThreadMessagesErrorResponse = z.object({
  error: z.string(),
});

export const GetThreadMessageRequestParams = z.object({
  messageId: z.string(),
  threadId: z.string(),
});
export const GetThreadMessageErrorResponse = z.object({
  error: z.string(),
});

export const CreateThreadMessageRequestParams = z.object({
  threadId: z.string(),
});
export const CreateThreadMessageRequestBody = ThreadMessage.pick({
  content: true,
  userId: true,
});

export const GetThreadUsersRequestParams = z.object({
  threadId: z.string(),
});
export const GetThreadUsersResponse = ThreadUser.and(
  z.object({
    user: User,
  }),
).array();
export const GetThreadUsersErrorResponse = z.object({
  error: z.string(),
});

export const GetThreadUserRequestParams = z.object({
  threadId: z.string(),
  threadUserId: z.string(),
});
export const GetThreadUserResponse = ThreadUser.and(
  z.object({
    user: User,
  }),
);
export const GetThreadUserErrorResponse = z.object({
  error: z.string(),
});

export const UpdateThreadUserRequestParams = z.object({
  threadId: z.string(),
  threadUserId: z.string(),
});
export const UpdateThreadUserRequestBody = ThreadUser.pick({
  viewedThreadLastAt: true,
}).partial();
export const UpdateThreadUserResponse = ThreadUser.and(
  z.object({
    user: User,
  }),
);
export const UpdateThreadUserErrorResponse = z.object({
  error: z.string(),
});

export {
  ThreadMessage as CreateThreadMessageResponse,
  ThreadMessage as GetThreadMessageResponse,
  Thread as GetThreadResponse,
} from '#schemas/thread-schemas.ts';
