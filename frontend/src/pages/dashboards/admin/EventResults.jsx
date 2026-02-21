import React, { useState } from 'react';
import { motion } from 'framer-motion';

const events = [
    {
        id: 1,
        category: 'Sports',
        categoryColor: 'text-blue-600 bg-blue-50',
        title: 'Annual Sports Day 2023',
        date: 'December 15, 2023',
        status: 'Results Available',
        statusColor: 'text-emerald-600 bg-emerald-50',
        image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=80',
    },
    {
        id: 2,
        category: 'Academic',
        categoryColor: 'text-indigo-600 bg-indigo-50',
        title: 'Science Fair 2023',
        date: 'November 22, 2023',
        status: 'Results Available',
        statusColor: 'text-emerald-600 bg-emerald-50',
        image: 'https://images.unsplash.com/photo-1532094349884-543559163946?w=600&q=80',
    },
    {
        id: 3,
        category: 'Arts',
        categoryColor: 'text-rose-600 bg-rose-50',
        title: 'Annual Art Exhibition',
        date: 'October 18, 2023',
        status: 'Pending',
        statusColor: 'text-amber-600 bg-amber-50',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
    },
    {
        id: 4,
        category: 'Music',
        categoryColor: 'text-purple-600 bg-purple-50',
        title: 'Inter-House Music Fest',
        date: 'September 5, 2023',
        status: 'Results Available',
        statusColor: 'text-emerald-600 bg-emerald-50',
        image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80',
    },
];

const EventResults = () => {
    const [search, setSearch] = useState('');

    const filtered = events.filter(e =>
        e.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-[1400px] mx-auto space-y-12 animate-in fade-in duration-700">
            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Event Results</h1>
                <p className="text-lg font-medium text-slate-400 mt-2">Browse past school events and view their results.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
                <div className="relative flex-1 min-w-[220px]">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
                    <input
                        type="text"
                        placeholder="Search by event name..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-slate-100 transition-all font-medium text-slate-600"
                    />
                </div>
                {['Date Range ▾', 'Event Type ▾', 'Results Status ▾'].map(f => (
                    <select key={f} className="px-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm font-bold text-slate-600 outline-none appearance-none cursor-pointer">
                        <option>{f}</option>
                    </select>
                ))}
            </div>

            {/* Event Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {filtered.map((ev, i) => (
                    <motion.div
                        key={ev.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1"
                    >
                        <div className="p-8 flex justify-between items-start">
                            <div>
                                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${ev.categoryColor}`}>{ev.category}</span>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-3">{ev.title}</h2>
                                <p className="text-sm font-bold text-slate-400 mt-1">{ev.date}</p>
                            </div>
                            <span className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${ev.statusColor} flex-shrink-0`}>
                                {ev.status === 'Results Available' ? '✅' : '⏳'} {ev.status}
                            </span>
                        </div>
                        <div className="h-56 overflow-hidden">
                            <img src={ev.image} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-4">
                            <button className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${ev.status === 'Results Available' ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-95' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                                View Results
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 pt-4">
                <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-400">‹</button>
                {[1, 2, 3, '...', 10].map((p, i) => (
                    <button key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all ${p === 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white border border-slate-100 shadow-sm text-slate-500 hover:bg-slate-50'}`}>
                        {p}
                    </button>
                ))}
                <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-400">›</button>
            </div>
        </div>
    );
};

export default EventResults;
