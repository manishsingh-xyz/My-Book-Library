import type { Book } from '../../types/Book';

export const initialBooks: Book[] = [
  {
    id: '1',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt & David Thomas',
    status: 'read',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    status: 'unread',
    createdAt: new Date().toISOString(),
  },
];
