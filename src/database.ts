import { UTCDateMini } from '@date-fns/utc';
import { z } from 'zod/v4';

import { Thread, ThreadMessage, ThreadUser } from './schemas/thread-schemas.ts';
import { User } from './schemas/user-schemas.ts';

const DatabaseSchema = z.object({
  threadMessages: ThreadMessage.array(),
  threads: Thread.array(),
  threadUsers: ThreadUser.array(),
  users: User.array(),
});

interface DatabaseSchema extends z.infer<typeof DatabaseSchema> {}

const currentDate = new UTCDateMini().toISOString();

const databaseInitialData: DatabaseSchema = {
  threadMessages: [
    {
      content: 'Hello, world!',
      createdAt: currentDate,
      deletedAt: null,
      id: 1,
      threadId: 1,
      updatedAt: currentDate,
      userId: 1, // John Doe
    },
    {
      content: "How's it going?",
      createdAt: currentDate,
      deletedAt: null,
      id: 2,
      threadId: 1,
      updatedAt: currentDate,
      userId: 2, // Jane Smith
    },
    {
      content: "I'm doing well, thanks for asking!",
      createdAt: currentDate,
      deletedAt: null,
      id: 3,
      threadId: 1,
      updatedAt: currentDate,
      userId: 1, // John Doe
    },
    {
      content: 'This is an interesting thread.',
      createdAt: currentDate,
      deletedAt: null,
      id: 4,
      threadId: 2,
      updatedAt: currentDate,
      userId: 3, // Alice Johnson
    },
    {
      content: "Let's discuss further.",
      createdAt: currentDate,
      deletedAt: null,
      id: 5,
      threadId: 2,
      updatedAt: currentDate,
      userId: 2, // Jane Smith
    },
    {
      content: 'I think we should add more examples to clarify.',
      createdAt: currentDate,
      deletedAt: null,
      id: 6,
      threadId: 2,
      updatedAt: currentDate,
      userId: 3, // Alice Johnson
    },
    {
      content: "I'll create a new thread for this topic.",
      createdAt: currentDate,
      deletedAt: null,
      id: 7,
      threadId: 3,
      updatedAt: currentDate,
      userId: 4, // Bob Lee
    },
    {
      content: 'Good idea!',
      createdAt: currentDate,
      deletedAt: null,
      id: 8,
      threadId: 3,
      updatedAt: currentDate,
      userId: 1, // John Doe
    },
    {
      content: 'John, can you check this out?',
      createdAt: currentDate,
      deletedAt: null,
      id: 9,
      threadId: 4,
      updatedAt: currentDate,
      userId: 2, // Jane Smith
    },
    {
      content: 'Sure, Jane. I’ll review it now.',
      createdAt: currentDate,
      deletedAt: null,
      id: 10,
      threadId: 4,
      updatedAt: currentDate,
      userId: 5, // Charlie Brown
    },
    {
      content: 'This new feature looks promising.',
      createdAt: currentDate,
      deletedAt: null,
      id: 11,
      threadId: 5,
      updatedAt: currentDate,
      userId: 1, // John Doe
    },
    {
      content: 'Agreed. Let’s proceed with it.',
      createdAt: currentDate,
      deletedAt: null,
      id: 12,
      threadId: 5,
      updatedAt: currentDate,
      userId: 3, // Alice Johnson
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
      userId: 1, // John Doe
      viewedThreadLastAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 2,
      threadId: 1,
      updatedAt: currentDate,
      userId: 2, // Jane Smith
      viewedThreadLastAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 3,
      threadId: 2,
      updatedAt: currentDate,
      userId: 3, // Alice Johnson
      viewedThreadLastAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 4,
      threadId: 2,
      updatedAt: currentDate,
      userId: 2, // Jane Smith
      viewedThreadLastAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 5,
      threadId: 3,
      updatedAt: currentDate,
      userId: 4, // Bob Lee
      viewedThreadLastAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 6,
      threadId: 3,
      updatedAt: currentDate,
      userId: 1, // John Doe
      viewedThreadLastAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 7,
      threadId: 4,
      updatedAt: currentDate,
      userId: 2, // Jane Smith
      viewedThreadLastAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 8,
      threadId: 4,
      updatedAt: currentDate,
      userId: 5, // Charlie Brown
      viewedThreadLastAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 9,
      threadId: 5,
      updatedAt: currentDate,
      userId: 1, // John Doe
      viewedThreadLastAt: currentDate,
    },
    {
      createdAt: currentDate,
      deletedAt: null,
      id: 10,
      threadId: 5,
      updatedAt: currentDate,
      userId: 3, // Alice Johnson
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
      // eslint-disable-next-line sonarjs/no-hardcoded-passwords -- Is hardcoded for demo purposes
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
      // eslint-disable-next-line sonarjs/no-hardcoded-passwords -- Is hardcoded for demo purposes
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
      // eslint-disable-next-line sonarjs/no-hardcoded-passwords -- Is hardcoded for demo purposes
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
      // eslint-disable-next-line sonarjs/no-hardcoded-passwords -- Is hardcoded for demo purposes
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
      // eslint-disable-next-line sonarjs/no-hardcoded-passwords -- Is hardcoded for demo purposes
      password: 'password131415',
      profilePictureUrl: 'https://example.com/images/user5.jpg',
      updatedAt: currentDate,
    },
  ],
};

export const database = DatabaseSchema.parse(databaseInitialData);
