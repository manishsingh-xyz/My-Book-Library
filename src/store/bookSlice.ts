import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Book } from '../types/Book';

interface BookState {
  books: Book[];
  editingBook: Book | null;
}


// Inside initialState:
// Add this line



const initialState: BookState = {
  books: JSON.parse(localStorage.getItem('books') || '[]'),
  editingBook: null,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Omit<Book, 'id'>>) => {
      state.books.push({
        ...action.payload,
        id: crypto.randomUUID(),
      });
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
    editBook: (
      state,
      action: PayloadAction<{ id: string; title: string; author: string }>
    ) => {
      const book = state.books.find((b) => b.id === action.payload.id);
      if (book) {
        book.title = action.payload.title;
        book.author = action.payload.author;
      }
    },
    toggleStatus: (state, action: PayloadAction<string>) => {
      const book = state.books.find((b) => b.id === action.payload);
      if (book) {
        book.status = book.status === 'read' ? 'unread' : 'read';
      }
    },
    setEditingBook: (state, action: PayloadAction<Book | null>) => {
      state.editingBook = action.payload;
    },
  },
});

export const { addBook, deleteBook, editBook, toggleStatus, setEditingBook } = bookSlice.actions;
export default bookSlice.reducer;
