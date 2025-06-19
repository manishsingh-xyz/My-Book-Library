import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, editBook, setEditingBook } from '../../store/bookSlice';
import type { RootState } from '../../store/store';

export default function AddBookForm() {
  const dispatch = useDispatch();
  const editingBook = useSelector((state: RootState) => state.books.editingBook);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
    }
  }, [editingBook]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !author.trim()) return;

    if (editingBook) {
      dispatch(editBook({ id: editingBook.id, title, author }));
      dispatch(setEditingBook(null)); // clear edit mode
    } else {
      dispatch(addBook({ title, author, status: 'unread' }));
    }

    setTitle('');
    setAuthor('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center"
    >
      <input
        className="p-2 border rounded-md bg-white text-black placeholder-gray-500
          dark:bg-gray-800 dark:text-white dark:placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Book title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="p-2 border rounded-md bg-white text-black placeholder-gray-500
          dark:bg-gray-800 dark:text-white dark:placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Author name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition shadow-sm"
      >
        {editingBook ? 'Update Book' : 'Add Book'}
      </button>
    </form>
  );
}
