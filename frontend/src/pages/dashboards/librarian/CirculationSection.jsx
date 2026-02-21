import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CirculationSection = () => {
    const [transactions, setTransactions] = useState([]);
    const [status, setStatus] = useState('');
    const [activeTab, setActiveTab] = useState('issue');

    // Issue State
    const [bookId, setBookId] = useState('');
    const [userId, setUserId] = useState('');
    const [dueDate, setDueDate] = useState('');

    // Return State
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5001/api/admin/library/transactions', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTransactions(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleIssue = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5001/api/admin/library/issue',
                { bookId, userId, dueDate },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setStatus('Book issued successfully');
            fetchTransactions();
            setBookId(''); setUserId(''); // Reset
        } catch (err) {
            setStatus(err.response?.data?.message || 'Error issuing book');
        }
    };

    const handleReturn = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5001/api/admin/library/return',
                { transactionId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setStatus('Book returned successfully');
            fetchTransactions();
            setTransactionId('');
        } catch (err) {
            setStatus(err.response?.data?.message || 'Error returning book');
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Circulation Desk</h2>

            <div className="flex space-x-4 mb-4">
                <button onClick={() => setActiveTab('issue')} className={`px-4 py-2 rounded ${activeTab === 'issue' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Issue Book</button>
                <button onClick={() => setActiveTab('return')} className={`px-4 py-2 rounded ${activeTab === 'return' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Return Book</button>
            </div>

            {status && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{status}</div>}

            {activeTab === 'issue' && (
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">Issue Book</h3>
                    <form onSubmit={handleIssue} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Book ID</label>
                            <input type="text" className="w-full border p-2 rounded" value={bookId} onChange={e => setBookId(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">User ID (Student/Teacher)</label>
                            <input type="text" className="w-full border p-2 rounded" value={userId} onChange={e => setUserId(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Due Date</label>
                            <input type="date" className="w-full border p-2 rounded" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
                        </div>
                        <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded">Issue</button>
                    </form>
                </div>
            )}

            {activeTab === 'return' && (
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">Return Book</h3>
                    <form onSubmit={handleReturn} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Transaction ID</label>
                            <input type="text" className="w-full border p-2 rounded" value={transactionId} onChange={e => setTransactionId(e.target.value)} required />
                        </div>
                        <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded">Return</button>
                    </form>
                </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow mt-6">
                <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Book</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Issue Date</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Due Date</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(t => (
                                <tr key={t._id} className="border-b">
                                    <td className="px-5 py-3 text-sm">{t.book?.title}</td>
                                    <td className="px-5 py-3 text-sm">{t.user?.name}</td>
                                    <td className="px-5 py-3 text-sm">{new Date(t.issueDate).toLocaleDateString()}</td>
                                    <td className="px-5 py-3 text-sm">{new Date(t.dueDate).toLocaleDateString()}</td>
                                    <td className="px-5 py-3 text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${t.status === 'Returned' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {t.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-xs text-gray-500">{t._id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CirculationSection;
