import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AVAILABLE_TEACHERS = [
    { name: 'Ms. Eleanor Vance', subjects: 'Mathematics, Physics', avatar: 'eleanor.vance' },
    { name: 'Mr. Samuel Chen', subjects: 'History', avatar: 'samuel.chen' },
    { name: 'Dr. Isabella Rossi', subjects: 'Biology, Chemistry', avatar: 'isabella.rossi' },
];

const FindFreeTeacher = () => {
    const [date, setDate] = useState('2024-10-26');
    const [start, setStart] = useState('09:00');
    const [end, setEnd] = useState('10:00');
    const [searched, setSearched] = useState(true);
    const [searching, setSearching] = useState(false);

    const handleSearch = () => {
        setSearching(true);
        setTimeout(() => { setSearching(false); setSearched(true); }, 600);
    };

    return (
        <div className="max-w-[1000px] mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Breadcrumb */}
            <p className="text-xs font-bold text-slate-400">Dashboard / <span className="text-slate-900">Find a Teacher</span></p>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Find a Free Teacher</h1>

            {/* Search Panel */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-2 col-span-1">
                        <label className="text-sm font-black text-slate-700">Date</label>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 font-bold text-slate-800" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">Start Time</label>
                        <input type="time" value={start} onChange={e => setStart(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 font-bold text-slate-800" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">End Time</label>
                        <input type="time" value={end} onChange={e => setEnd(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 font-bold text-slate-800" />
                    </div>
                </div>
                <button onClick={handleSearch} disabled={searching}
                    className="flex items-center gap-2 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 disabled:opacity-60 transition-all">
                    🔍 {searching ? 'Searching...' : 'Search'}
                </button>
            </div>

            {/* Results */}
            <AnimatePresence>
                {searched && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                        <p className="text-sm font-black text-slate-500 uppercase tracking-widest px-2">{AVAILABLE_TEACHERS.length} Teachers Available</p>
                        {AVAILABLE_TEACHERS.map((t, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                                className="bg-white px-10 py-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6 hover:shadow-md transition-all">
                                <img src={`https://i.pravatar.cc/150?u=${t.avatar}`} alt={t.name} className="w-14 h-14 rounded-2xl object-cover flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="font-black text-slate-900 text-lg">{t.name}</p>
                                    <p className="text-sm font-bold text-slate-400 mt-0.5">{t.subjects}</p>
                                </div>
                                <span className="flex items-center gap-2 px-5 py-2.5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl font-black text-xs">
                                    ✅ Available
                                </span>
                                <button className="px-7 py-3 bg-white border border-slate-200 rounded-2xl font-black text-xs text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
                                    View Full Schedule
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FindFreeTeacher;
