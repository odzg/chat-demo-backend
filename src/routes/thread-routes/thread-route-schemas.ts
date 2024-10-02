import { z } from 'zod';

import { Thread, ThreadMessage, ThreadUser } from '@/schemas/thread-schemas.js';
import { User } from '@/schemas/user-schemas.js';

export const GetThreadsResponse = z.array(
  Thread.and(
    z.object({
      threadUsers: z.array(
        ThreadUser.and(
          z.object({
            user: User,
          }),
        ),
      ),
    }),
  ),
);
export const GetThreadsErrorResponse = z.object({
  error: z.string(),
});

export const GetThreadRequestParams = z.object({
  threadId: z.string(),
});
export const GetThreadResponse = Thread;
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
export const GetThreadMessageResponse = ThreadMessage;
export const GetThreadMessageErrorResponse = z.object({
  error: z.string(),
});

export const CreateThreadMessageRequestParams = z.object({
  messageId: z.string(),
  threadId: z.string(),
});
export const CreateThreadMessageRequestBody = ThreadMessage.pick({
  content: true,
  userId: true,
});
export const CreateThreadMessageResponse = ThreadMessage;

export const GetThreadUsersRequestParams = z.object({
  threadId: z.string(),
});
export const GetThreadUsersResponse = z.array(
  ThreadUser.and(
    z.object({
      user: User,
    }),
  ),
);
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
