import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const pending = [
    { id: 1, title: 'Inter-School Soccer Match', organizer: 'Sports Dept.', date: 'Nov 05, 2024', border: 'border-emerald-200' },
    { id: 2, title: 'Drama Club Annual Play', organizer: 'Arts & Culture Club', date: 'Nov 12, 2024', border: 'border-yellow-200' },
    { id: 3, title: 'Field Trip to Museum', organizer: 'History Dept.', date: 'Nov 20, 2024', border: 'border-yellow-200' },
];

const upcomingEvents = [
    { title: 'Annual Science Fair', organizer: 'Science Dept.', datetime: 'Oct 25, 2024 - 9:00 AM', status: 'Approved', color: 'emerald' },
    { title: 'Charity Bake Sale', organizer: 'Student Council', datetime: 'Oct 28, 2024 - 12:00 PM', status: 'Approved', color: 'emerald' },
    { title: 'Parent-Teacher Conference', organizer: 'Administration', datetime: 'Oct 15, 2024 - 4:00 PM', status: 'Completed', color: 'slate' },
    { title: 'Annual Sports Day', organizer: 'Sports Dept.', datetime: 'Dec 1, 2024 - 8:00 AM', status: 'Pending', color: 'amber' },
];

const statusStyle = {
    Approved: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    Completed: 'bg-slate-100 text-slate-500 border-slate-200',
    Pending: 'bg-amber-50 text-amber-600 border-amber-100',
};

const EventsDashboard = () => {
    const [requests, setRequests] = useState(pending);
    const [category, setCategory] = useState('All Categories');
    const [department, setDepartment] = useState('All Departments');

    const approve = (id) => setRequests(requests.filter(r => r.id !== id));
    const reject = (id) => setRequests(requests.filter(r => r.id !== id));

    return (
        <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700">
            <div className="grid grid-cols-5 gap-10 min-h-[calc(100vh-6rem)]">
                {/* Left — Pending Approval */}
                <div className="col-span-2 space-y-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Events Awaiting Your Permission</h2>
                        <span className="w-6 h-6 rounded-full bg-amber-400 text-white text-[10px] font-black flex items-center justify-center">{requests.length}</span>
                    </div>

                    <AnimatePresence>
                        {requests.length === 0 ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm text-center space-y-4">
                                <span className="text-4xl">✅</span>
                                <p className="font-black text-slate-800">All caught up!</p>
                                <p className="text-slate-400 font-medium text-sm">No pending events.</p>
                            </motion.div>
                        ) : requests.map((r, i) => (
                            <motion.div key={r.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }} transition={{ delay: i * 0.05 }}
                                className={`bg-white p-7 rounded-[2.5rem] border-2 ${r.border} shadow-sm space-y-4`}>
                                <div>
                                    <p className="font-black text-blue-600 text-lg leading-tight">{r.title}</p>
                                    <p className="text-[11px] font-bold text-slate-400 mt-1">Organizer: {r.organizer}</p>
                                    <p className="text-[11px] font-bold text-slate-400">Date: {r.date}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => approve(r.id)} className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl font-black text-xs hover:bg-emerald-100 transition-all">
                                        ✅ Approve
                                    </button>
                                    <button onClick={() => reject(r.id)} className="flex items-center gap-1.5 px-5 py-2.5 bg-rose-50 border border-rose-200 text-rose-500 rounded-xl font-black text-xs hover:bg-rose-100 transition-all">
                                        ❌ Reject
                                    </button>
                                    <button className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 font-black hover:bg-slate-200 transition-all flex items-center justify-center text-sm">👁</button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Right — Upcoming Events */}
                <div className="col-span-3 space-y-6">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Upcoming & Ongoing Events</h2>

                    {/* Filters */}
                    <div className="flex gap-4">
                        <input type="date" className="px-5 py-4 bg-white border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 shadow-sm" />
                        <select value={category} onChange={e => setCategory(e.target.value)} className="px-6 py-4 bg-white border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 shadow-sm appearance-none">
                            {['All Categories', 'Sports', 'Academic', 'Arts', 'Community'].map(c => <option key={c}>{c}</option>)}
                        </select>
                        <select value={department} onChange={e => setDepartment(e.target.value)} className="px-6 py-4 bg-white border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 shadow-sm appearance-none">
                            {['All Departments', 'Sports Dept.', 'Science Dept.', 'Arts & Culture Club', 'Administration'].map(d => <option key={d}>{d}</option>)}
                        </select>
                    </div>

                    {/* Event Cards Grid */}
                    <div className="grid grid-cols-2 gap-6">
                        {upcomingEvents.map((e, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-5 hover:shadow-md transition-all">
                                <div className="flex items-start justify-between gap-3">
                                    <h3 className="text-lg font-black text-blue-600 leading-tight">{e.title}</h3>
                                    <span className={`flex-shrink-0 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest ${statusStyle[e.status]}`}>{e.status}</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[11px] font-bold text-slate-400">Organized by: {e.organizer}</p>
                                    <p className="text-[11px] font-bold text-slate-400 flex items-center gap-2">📅 {e.datetime}</p>
                                </div>
                                <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-black text-xs text-slate-600 hover:bg-slate-100 transition-all">
                                    👁 View Details
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventsDashboard;
