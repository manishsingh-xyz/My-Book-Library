import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

export default function BookDetail() {
    const { id } = useParams<{ id: string }>();
    const book = useSelector((state: RootState) =>
        state.books.books.find((b) => b.id === id)
    );

    if (!book) {
        return (
            <div className="p-4 text-center text-red-600">
                <p>Book not found.</p>
                <Link to="/" className="text-blue-500 underline">Go back to library</Link>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-xl">
            <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
            <p className="text-gray-700 mb-1">
                By <span className="font-medium">{book.author}</span>
            </p>
            <p className="text-sm mb-4">
                Status:{' '}
                <span
                    className={`px-2 py-1 rounded text-xs ${book.status === 'read'
                            ? 'bg-green-200 text-green-800'
                            : 'bg-yellow-200 text-yellow-800'
                        }`}
                >
                    {book.status.toUpperCase()}
                </span>
            </p>
            <Link
                to="/"
                className="text-blue-500 hover:text-blue-700 underline text-sm"
            >
                ← Back to Library
            </Link>
        </div>
    );

}
