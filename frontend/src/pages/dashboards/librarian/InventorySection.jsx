import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventorySection = () => {
    const [books, setBooks] = useState([]);
    const [status, setStatus] = useState('');

    // Add Book State
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [copies, setCopies] = useState(1);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('https://mvp-gilt-iota.vercel.app/api/admin/library', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBooks(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('https://mvp-gilt-iota.vercel.app/api/admin/library',
                { title, author, isbn, totalCopies: copies },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setStatus('Book added successfully');
            fetchBooks();
            setTitle(''); setAuthor(''); setIsbn(''); setCopies(1);
        } catch (err) {
            setStatus('Error adding book');
            console.error(err);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Inventory Management</h2>

            {status && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{status}</div>}

            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">Add New Book</h3>
                <form onSubmit={handleAddBook} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Title" className="border p-2 rounded" value={title} onChange={e => setTitle(e.target.value)} required />
                    <input type="text" placeholder="Author" className="border p-2 rounded" value={author} onChange={e => setAuthor(e.target.value)} required />
                    <input type="text" placeholder="ISBN" className="border p-2 rounded" value={isbn} onChange={e => setIsbn(e.target.value)} required />
                    <input type="number" placeholder="Total Copies" className="border p-2 rounded" value={copies} onChange={e => setCopies(e.target.value)} required />
                    <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded md:col-span-2">Add to Inventory</button>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">Book List</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Title</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Author</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ISBN</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Available / Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book => (
                                <tr key={book._id} className="border-b">
                                    <td className="px-5 py-3 text-sm">{book.title}</td>
                                    <td className="px-5 py-3 text-sm">{book.author}</td>
                                    <td className="px-5 py-3 text-sm">{book.isbn}</td>
                                    <td className="px-5 py-3 text-sm font-bold">
                                        <span className={book.availableCopies > 0 ? 'text-green-600' : 'text-red-600'}>
                                            {book.availableCopies}
                                        </span> / {book.totalCopies}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InventorySection;
