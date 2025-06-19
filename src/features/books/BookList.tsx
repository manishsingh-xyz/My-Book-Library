import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import {
    deleteBook,
    editBook,
    toggleStatus,
    setEditingBook,
} from '../../store/bookSlice';
import type { Book } from '../../types/Book';
import AddBookForm from './AddBookForm';

export default function BookList() {
    const dispatch = useDispatch();
    const books = useSelector((state: RootState) => state.books.books);

    const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');
    const [editingBookId, setEditingBookId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editAuthor, setEditAuthor] = useState('');

    const filteredBooks =
        filter === 'all' ? books : books.filter((book) => book.status === filter);

    const startEdit = (book: Book) => {
        setEditingBookId(book.id);
        setEditTitle(book.title);
        setEditAuthor(book.author);
    };

    const saveEdit = () => {
        if (editingBookId) {
            dispatch(editBook({ id: editingBookId, title: editTitle, author: editAuthor }));
            setEditingBookId(null);
            setEditTitle('');
            setEditAuthor('');
        }
    };

    const cancelEdit = () => {
        setEditingBookId(null);
        setEditTitle('');
        setEditAuthor('');
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white p-4">
            <h1 className="text-3xl font-bold mb-6">📚 My Book Library</h1>

            <AddBookForm />

            {/* Filter */}
            <div className="mb-4 flex gap-2">
                {(['all', 'read', 'unread'] as const).map((type) => (
                    <button
                        key={type}
                        className={`px-3 py-1 rounded ${filter === type
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800'
                            }`}
                        onClick={() => setFilter(type)}
                    >
                        {type.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Book List */}
            <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-2">
                {filteredBooks.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500 italic">
                        No books to show.
                    </p>
                ) : (
                    filteredBooks.map((book) => (
                        <li
                            key={book.id}
                            className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between transition hover:shadow-lg"
                        >
                            <Link to={`/books/${book.id}`} className="hover:underline">
                                <h2 className="font-semibold text-lg">{book.title}</h2>
                            </Link>
                            <p className="text-sm text-gray-600 mb-2">By {book.author}</p>
                            <span
                                className={`self-start px-2 py-1 text-xs rounded-full ${book.status === 'read'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-800'
                                    }`}
                            >
                                {book.status.toUpperCase()}
                            </span>

                            <div className="mt-3 flex flex-wrap gap-2">
                                <button
                                    onClick={() => dispatch(toggleStatus(book.id))}
                                    className="text-xs bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                                >
                                    Mark {book.status === 'read' ? 'Unread' : 'Read'}
                                </button>
                                <button
                                    onClick={() => dispatch(setEditingBook(book))}
                                    className="text-xs bg-yellow-200 px-3 py-1 rounded hover:bg-yellow-300"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => dispatch(deleteBook(book.id))}
                                    className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>

        </div>
    );
}
