import React from 'react';
import { motion } from 'framer-motion';

const ManageBooks = () => {
    const stats = [
        { label: 'Total Books', value: '15,289', color: 'blue', icon: '📚' },
        { label: 'Books Available', value: '12,150', color: 'emerald', icon: '✅' },
        { label: 'Books Borrowed', value: '3,012', color: 'indigo', icon: '🔄' },
        { label: 'Needs Attention', value: '127', color: 'rose', icon: '⚠️' },
    ];

    const books = [
        { title: 'The Midnight Library', author: 'Matt Haig', isbn: '978-0-525-55947-4', location: 'Fiction A-1', status: 'Available' },
        { title: 'Project Hail Mary', author: 'Andy Weir', isbn: '978-0-593-13520-4', location: 'Sci-Fi C-2', status: 'Borrowed' },
        { title: 'Klara and the Sun', author: 'Kazuo Ishiguro', isbn: '978-0-593-31817-1', location: 'Fiction A-1', status: 'Available' },
        { title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', isbn: '978-0-06-231609-7', location: 'Non-Fiction B-3', status: 'Under Repair' },
        { title: 'The Vanishing Half', author: 'Brit Bennett', isbn: '978-0-525-54210-0', location: 'Fiction D-5', status: 'Lost' },
    ];

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Available': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Borrowed': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'Under Repair': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'Lost': return 'bg-rose-50 text-rose-500 border-rose-100';
            default: return 'bg-slate-50 text-slate-400 border-slate-100';
        }
    };

    return (
        <div className="max-w-[1400px] mx-auto space-y-12 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Book Stack Overview</h1>
                    <p className="text-lg font-medium text-slate-400 mt-2">Manage and track the library's complete book inventory.</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-8 py-4 bg-white border border-slate-100 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-600 shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-all">
                        📤 Export to CSV
                    </button>
                    <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-100 flex items-center gap-2 hover:bg-blue-700 transition-all active:scale-95">
                        ➕ Add New Book
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4 group hover:shadow-xl transition-all translate-y-0 hover:-translate-y-2">
                        <div className="flex justify-between items-start">
                            <span className="text-3xl">{stat.icon}</span>
                            <span className={`w-8 h-8 rounded-full bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600 text-[10px] font-black`}>→</span>
                        </div>
                        <div>
                            <p className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative group">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                        <input
                            type="text"
                            placeholder="Search by Title, Author, or ISBN..."
                            className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                        />
                    </div>
                    <div className="flex gap-4">
                        <select className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-600 outline-none appearance-none cursor-pointer">
                            <option>Filter by Status</option>
                        </select>
                        <select className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-600 outline-none appearance-none cursor-pointer">
                            <option>Filter by Location</option>
                        </select>
                        <button className="px-8 py-4 bg-slate-200 text-slate-600 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-300 transition-all">Apply Filters</button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Book Title</th>
                                <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Author</th>
                                <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">ISBN</th>
                                <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Location</th>
                                <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {books.map((book, i) => (
                                <tr key={i} className="group hover:bg-slate-50/30 transition-all">
                                    <td className="px-10 py-6">
                                        <p className="font-black text-slate-800 tracking-tight">{book.title}</p>
                                    </td>
                                    <td className="px-10 py-6 font-bold text-slate-500">{book.author}</td>
                                    <td className="px-10 py-6 font-medium text-slate-400 text-xs">{book.isbn}</td>
                                    <td className="px-10 py-6 font-black text-slate-800 text-xs tracking-widest">{book.location}</td>
                                    <td className="px-10 py-6">
                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(book.status)}`}>
                                            {book.status}
                                        </span>
                                    </td>
                                    <td className="px-10 py-6 text-right">
                                        <button className="text-blue-600 font-black text-[11px] uppercase tracking-widest hover:underline">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 border-t border-slate-50 flex justify-between items-center bg-slate-50/20">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing <span className="text-slate-900">1-5</span> of 1000</p>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 disabled:opacity-50">‹</button>
                        <button className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-xs shadow-lg shadow-blue-100">1</button>
                        <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-600 font-black text-xs">2</button>
                        <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400">···</button>
                        <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-600 font-black text-xs">100</button>
                        <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400">›</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageBooks;
