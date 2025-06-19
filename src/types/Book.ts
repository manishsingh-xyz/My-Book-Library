export type BookStatus = 'read' | 'unread';

export interface Book {
  id: string;              // Unique identifier (UUID)
  title: string;
  author: string;
  description?: string;
  status: BookStatus;
  createdAt?: string;       // ISO timestamp
}
