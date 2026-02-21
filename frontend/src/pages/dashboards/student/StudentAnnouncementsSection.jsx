import React, { useState } from 'react';
import { motion } from 'framer-motion';

const StudentAnnouncementsSection = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const announcements = [
        {
            category: 'Academic',
            categoryColor: 'bg-emerald-100 text-emerald-600',
            title: 'Final Exam Schedule for Fall Semester Released',
            snippet: 'The official final exam schedule is now available. Please review the dates and times for your courses to prepare accordingly.',
            date: 'Published on Oct 26, 2023',
            image: 'https://images.unsplash.com/photo-1541339907198-e08759df9a73?q=80&w=2070&auto=format&fit=crop'
        },
        {
            category: 'General',
            categoryColor: 'bg-amber-100 text-amber-600',
            title: 'Campus Library Holiday Hours',
            snippet: 'Please be advised of the updated operating hours for the main library during the upcoming winter break. Plan your visits accordingly.',
            date: 'Published on Oct 25, 2023',
            image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop'
        },
        {
            category: 'Events',
            categoryColor: 'bg-blue-100 text-blue-600',
            title: 'Annual Tech Symposium - Call for Papers',
            snippet: 'The annual tech symposium is approaching! We invite all students to submit papers for presentation. The deadline for submission is November 15th.',
            date: 'Published on Oct 24, 2023',
            image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2070&auto=format&fit=crop'
        }
    ];

    const filters = ['All', 'General', 'Academic', 'Administrative', 'Events'];

    return (
        <div className="max-w-[1200px] mx-auto space-y-12 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center gap-8">
                <h1 className="text-5xl font-black text-slate-800 tracking-tight">Announcements</h1>
                <div className="relative group w-[400px]">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300">🔍</span>
                    <input
                        type="text"
                        placeholder="Search announcements..."
                        className="w-full pl-16 pr-8 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold shadow-sm focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    />
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-4">
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`px-8 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${activeFilter === f ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'bg-white text-slate-400 hover:text-slate-600 border border-slate-100 shadow-sm'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Announcement List */}
            <div className="space-y-8">
                {announcements.map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -4, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                        className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row gap-10 p-10 group transition-all"
                    >
                        <div className="w-full md:w-[320px] h-[220px] rounded-[1.5rem] overflow-hidden shrink-0 shadow-lg border border-slate-50">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-2 space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] ${item.categoryColor}`}>
                                        {item.category}
                                    </span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-400 font-medium leading-relaxed line-clamp-2">
                                    {item.snippet}
                                </p>
                            </div>

                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    {item.date}
                                </p>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-8 rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-95 uppercase tracking-widest text-[10px]">
                                    Read More
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 pt-4">
                <button className="px-6 py-3 rounded-xl border border-slate-100 font-bold text-xs text-slate-400 hover:text-slate-800 flex items-center gap-2 transition-all">
                    ❮ Previous
                </button>
                <div className="flex gap-2">
                    {[1, 2, 3].map(p => (
                        <button key={p} className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${p === 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-400 hover:bg-slate-50'
                            }`}>
                            {p}
                        </button>
                    ))}
                </div>
                <button className="px-6 py-3 rounded-xl border border-slate-100 font-bold text-xs text-slate-400 hover:text-slate-800 flex items-center gap-2 transition-all">
                    Next ❯
                </button>
            </div>
        </div>
    );
};

export default StudentAnnouncementsSection;
