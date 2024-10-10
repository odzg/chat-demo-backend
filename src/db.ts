import { UTCDateMini } from '@date-fns/utc';
import { z } from 'zod';

import { Thread, ThreadMessage, ThreadUser } from './schemas/thread-schemas.js';
import { User } from './schemas/user-schemas.js';

const DbSchema = z.object({
  threadMessages: ThreadMessage.array(),
  threads: Thread.array(),
  threadUsers: ThreadUser.array(),
  users: User.array(),
});
type DbSchema = z.infer<typeof DbSchema>;

const currentDate = new UTCDateMini();

const dbInitialData: DbSchema = {
  threadMessages: [
    {
      content: 'Hello, world!',
      createdAt: currentDate,
      deletedAt: null,
      id: 1,
      threadId: 1,
      updatedAt: currentDate,
      userId: 1,
    },
    {
      content: "How's it going?",
      createdAt: currentDate,
      deletedAt: null,
      id: 2,
      threadId: 1,
      updatedAt: currentDate,
      userId: 2,
    },
    {
      content: 'This is an interesting thread.',
      createdAt: currentDate,
      deletedAt: null,
      id: 3,
      threadId: 2,
      updatedAt: currentDate,
      userId: 3,
    },
    {
      content: "Let's discuss further.",
      createdAt: currentDate,
      deletedAt: null,
      id: 4,
      threadId: 2,
      updatedAt: currentDate,
      userId: 2,
    },
    {
      content: "I'll create a new thread for this topic.",
      createdAt: currentDate,
      deletedAt: null,
      id: 5,
      threadId: 3,
      updatedAt: currentDate,
      userId: 4,
    },
    {
      content: 'Good idea!',
      createdAt: currentDate,
      deletedAt: null,
      id: 6,
      threadId: 3,
      updatedAt: currentDate,
      userId: 5,
    },
    {
      content: 'John, can you check this out?',
      createdAt: currentDate,
      deletedAt: null,
      id: 7,
      threadId: 4,
      updatedAt: currentDate,
      userId: 2,
    },
    {
      content: 'Sure, Jane. I’ll review it now.',
      createdAt: currentDate,
      deletedAt: null,
      id: 8,
      threadId: 4,
      updatedAt: currentDate,
      userId: 1,
    },
    {
      content: 'This new feature looks promising.',
      createdAt: currentDate,
      deletedAt: null,
      id: 9,
      threadId: 5,
      updatedAt: currentDate,
      userId: 1,
    },
    {
      content: 'Agreed. Let’s proceed with it.',
      createdAt: currentDate,
      deletedAt: null,
      id: 10,
      threadId: 5,
      updatedAt: currentDate,
      userId: 2,
    },
  ],
  threads: [
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 1,
      updatedAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 2,
      updatedAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 3,
      updatedAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 4,
      updatedAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 5,
      updatedAt: currentDate,
    },
  ],
  threadUsers: [
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 1,
      threadId: 1,
      updatedAt: currentDate,
      userId: 1,
      viewedThreadLastAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 2,
      threadId: 1,
      updatedAt: currentDate,
      userId: 2,
      viewedThreadLastAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 3,
      threadId: 2,
      updatedAt: currentDate,
      userId: 3,
      viewedThreadLastAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 4,
      threadId: 2,
      updatedAt: currentDate,
      userId: 2,
      viewedThreadLastAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 5,
      threadId: 3,
      updatedAt: currentDate,
      userId: 4,
      viewedThreadLastAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 6,
      threadId: 3,
      updatedAt: currentDate,
      userId: 5,
      viewedThreadLastAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 7,
      threadId: 4,
      updatedAt: currentDate,
      userId: 1,
      viewedThreadLastAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 8,
      threadId: 4,
      updatedAt: currentDate,
      userId: 2,
      viewedThreadLastAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 9,
      threadId: 5,
      updatedAt: currentDate,
      userId: 1,
      viewedThreadLastAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 10,
      threadId: 5,
      updatedAt: currentDate,
      userId: 2,
      viewedThreadLastAt: currentDate,
    },
  ],
  users: [
    {
      createdAt: currentDate,
      deletedAt: null,
      email: 'user1@example.com',
      firstName: 'John',
      id: 1,
      lastName: 'Doe',
      password: 'password123',
      profilePictureUrl: 'https://example.com/images/user1.jpg',
      updatedAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      email: 'user2@example.com',
      firstName: 'Jane',
      id: 2,
      lastName: 'Smith',
      password: 'password456',
      profilePictureUrl: 'https://example.com/images/user2.jpg',
      updatedAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      email: 'user3@example.com',
      firstName: 'Alice',
      id: 3,
      lastName: 'Johnson',
      password: 'password789',
      profilePictureUrl: 'https://example.com/images/user3.jpg',
      updatedAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      email: 'user4@example.com',
      firstName: 'Bob',
      id: 4,
      lastName: 'Lee',
      password: 'password101112',
      profilePictureUrl: 'https://example.com/images/user4.jpg',
      updatedAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      email: 'user5@example.com',
      firstName: 'Charlie',
      id: 5,
      lastName: 'Brown',
      password: 'password131415',
      profilePictureUrl: 'https://example.com/images/user5.jpg',
      updatedAt: currentDate,
    },
  ],
};

export const db = DbSchema.parse(dbInitialData);
