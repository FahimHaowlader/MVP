import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTH = 'October 2024';
const TODAY = 10;

// Grid starts on Tuesday (index 2)
const OFFSET = 2;
const TOTAL_DAYS = 31;

const events = {
    7: [{ label: 'Holiday: Columbus Day', color: 'bg-rose-100 text-rose-700' }],
    9: [{ label: 'Parent-Teacher Conf.', time: '9:00 AM', color: 'bg-blue-100 text-blue-700' }],
    16: [{ label: 'Soccer Match vs North', time: '4:00 PM', color: 'bg-emerald-100 text-emerald-700' }],
    31: [{ label: 'Halloween Parade', time: '2:00 PM', color: 'bg-amber-100 text-amber-700' }],
};

const SchoolCalendar = () => {
    const [view, setView] = useState('Month');
    const [showModal, setShowModal] = useState(false);

    // Build calendar cells
    const cells = [];
    // Leading empty
    for (let i = 0; i < OFFSET; i++) cells.push({ day: null, prev: true, num: 29 + i });
    for (let d = 1; d <= TOTAL_DAYS; d++) cells.push({ day: d });
    // Trailing
    const trailing = (7 - (cells.length % 7)) % 7;
    for (let i = 1; i <= trailing; i++) cells.push({ day: null, next: true, num: i });

    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

    return (
        <div className="max-w-[1400px] mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-6 bg-white px-10 py-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 font-black hover:bg-slate-100 transition-all">‹</button>
                        <button className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 font-black hover:bg-slate-100 transition-all">›</button>
                    </div>
                    <button className="px-6 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-all">Today</button>
                </div>

                <h1 className="text-2xl font-black text-slate-900 tracking-tight">{MONTH}</h1>

                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                        <input placeholder="Search events..." className="pl-12 pr-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-slate-100 transition-all font-medium text-slate-600 text-sm w-52" />
                    </div>
                    {/* View toggle */}
                    <div className="flex bg-slate-50 border border-slate-100 rounded-2xl p-1">
                        {['Month', 'Week', 'Day'].map(v => (
                            <button
                                key={v}
                                onClick={() => setView(v)}
                                className={`px-5 py-2 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${view === v ? 'bg-white shadow text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {v}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all"
                    >
                        + Create Event
                    </button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                {/* Day Headers */}
                <div className="grid grid-cols-7 border-b border-slate-100">
                    {DAYS.map(d => (
                        <div key={d} className="py-5 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-50 last:border-0">{d}</div>
                    ))}
                </div>

                {/* Weeks */}
                {weeks.map((week, wi) => (
                    <div key={wi} className="grid grid-cols-7 border-b border-slate-50 last:border-0">
                        {week.map((cell, ci) => (
                            <div
                                key={ci}
                                className={`min-h-[108px] p-3 border-r border-slate-50 last:border-0 ${cell.day === TODAY ? 'bg-blue-50/30' : ''}`}
                            >
                                <div className="flex justify-end mb-1">
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${cell.day === TODAY ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : cell.day ? 'text-slate-700 hover:bg-slate-50' : 'text-slate-300'}`}>
                                        {cell.day || cell.num}
                                    </span>
                                </div>
                                <div className="space-y-1.5">
                                    {(events[cell.day] || []).map((ev, ei) => (
                                        <motion.div
                                            key={ei}
                                            whileHover={{ scale: 1.02 }}
                                            className={`px-3 py-1.5 rounded-xl text-[10px] font-black cursor-pointer ${ev.color}`}
                                        >
                                            <p className="truncate">{ev.label}</p>
                                            {ev.time && <p className="opacity-70">{ev.time}</p>}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Create Event Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-[3rem] p-12 max-w-2xl w-full shadow-2xl space-y-8"
                        >
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Create New Event</h2>
                            <div className="space-y-6">
                                {[['Event Title', 'text'], ['Date', 'date'], ['Time', 'time']].map(([label, type]) => (
                                    <div key={label} className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
                                        <input type={type} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-slate-100 font-bold text-slate-800" />
                                    </div>
                                ))}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Event Type</label>
                                    <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-800 appearance-none">
                                        <option>Holiday</option>
                                        <option>Academic</option>
                                        <option>Sports</option>
                                        <option>Cultural</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <button onClick={() => setShowModal(false)} className="px-8 py-4 rounded-2xl font-black text-sm text-slate-400 hover:bg-slate-50 transition-all">Cancel</button>
                                <button onClick={() => setShowModal(false)} className="px-8 py-4 rounded-2xl font-black text-sm bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">Create Event</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SchoolCalendar;
