import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import BookList from './features/books/BookList';
import BookDetail from './features/books/BookDetail';
import type { Book } from './types/Book';

const STORAGE_KEY = 'my-books';

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    try {
      const parsed = stored ? JSON.parse(stored) : [];
      if (Array.isArray(parsed)) {
        setBooks(parsed);
      }
    } catch (err) {
      console.error('Failed to parse books from localStorage:', err);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<BookList books={books} setBooks={setBooks} />} />
        <Route path="/books/:id" element={<BookDetail books={books} />} />
      </Routes>
    </div>
  );
}

export default App;
