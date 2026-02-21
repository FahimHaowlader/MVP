import React, { useState } from 'react';
import { motion } from 'framer-motion';

const books = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', status: 'Available' },
    { title: '1984', author: 'George Orwell', category: 'Dystopian', status: 'Checked Out' },
    { title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', status: 'Available' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', status: 'Lost' },
    { title: 'The Alchemist', author: 'Paulo Coelho', category: 'Fiction', status: 'Available' },
    { title: 'Sapiens', author: 'Yuval Noah Harari', category: 'History', status: 'Checked Out' },
];

const statusStyle = { Available: 'bg-emerald-50 text-emerald-600 border-emerald-100', 'Checked Out': 'bg-amber-50 text-amber-600 border-amber-100', Lost: 'bg-rose-50 text-rose-500 border-rose-100' };

const LibraryDashboard = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All Categories');
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [page, setPage] = useState(1);

    const filtered = books.filter(b =>
        (b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase())) &&
        (category === 'All Categories' || b.category === category) &&
        (statusFilter === 'All Statuses' || b.status === statusFilter)
    );

    return (
        <div className="max-w-[1200px] mx-auto space-y-10 animate-in fade-in duration-700">
            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Welcome back, Principal!</h1>
                <p className="text-slate-400 font-medium mt-2">Here's a quick overview of your library's activity and resources.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-6">
                {[
                    { label: 'Total Books', val: '12,480', color: 'text-slate-900' },
                    { label: 'Items Checked Out', val: '312', color: 'text-slate-900' },
                    { label: 'Overdue Items', val: '15', color: 'text-rose-500' },
                    { label: 'Digital Resources', val: '850', color: 'text-slate-900' },
                ].map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-3">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                        <p className={`text-4xl font-black tracking-tight ${s.color}`}>{s.val}</p>
                    </motion.div>
                ))}
            </div>

            {/* Books Overview */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-10 pb-6 flex justify-between items-center gap-6">
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">Books Overview</h2>
                    <button className="flex items-center gap-2 px-7 py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-800 active:scale-95 transition-all shadow-lg">
                        + Add New Book
                    </button>
                </div>

                {/* Filters */}
                <div className="px-10 pb-6 flex gap-4">
                    <div className="relative flex-1">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by title, author..." className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 font-medium text-slate-700" />
                    </div>
                    <select value={category} onChange={e => setCategory(e.target.value)} className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 appearance-none">
                        {['All Categories', 'Fiction', 'Science', 'History', 'Dystopian'].map(c => <option key={c}>{c}</option>)}
                    </select>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 appearance-none">
                        {['All Statuses', 'Available', 'Checked Out', 'Lost'].map(s => <option key={s}>{s}</option>)}
                    </select>
                </div>

                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/50 border-y border-slate-50">
                            {['Title', 'Author', 'Category', 'Status', 'Actions'].map(h => (
                                <th key={h} className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filtered.map((b, i) => (
                            <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                                className="hover:bg-slate-50/30 transition-all">
                                <td className="px-10 py-5 font-black text-slate-900">{b.title}</td>
                                <td className="px-10 py-5 font-bold text-slate-500">{b.author}</td>
                                <td className="px-10 py-5 font-bold text-slate-500">{b.category}</td>
                                <td className="px-10 py-5">
                                    <span className={`px-4 py-1.5 rounded-xl border font-black text-[10px] uppercase tracking-widest ${statusStyle[b.status]}`}>{b.status}</span>
                                </td>
                                <td className="px-10 py-5">
                                    <button className="text-slate-400 hover:text-slate-600 transition-all text-xl">⋯</button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="px-10 py-6 flex justify-between items-center border-t border-slate-50">
                    <p className="text-[11px] font-bold text-slate-400">Showing 1 to {filtered.length} of 12,480 results</p>
                    <div className="flex gap-3">
                        <button className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 font-black hover:bg-slate-200 transition-all">‹</button>
                        <button className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black shadow">›</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LibraryDashboard;
