import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentAssignmentsSection = () => {
    const [activeTab, setActiveTab] = useState('Current');
    const [searchTerm, setSearchTerm] = useState('');

    const assignments = [
        {
            title: 'History Essay: The Roman Empire',
            subject: 'History 101',
            due: 'Due: Oct 15, 2023, 11:59 PM',
            status: 'Overdue',
            statusColor: 'bg-rose-50 text-rose-500',
            action: 'Submit Late',
            actionColor: 'bg-blue-600 hover:bg-blue-700 text-white'
        },
        {
            title: 'Problem Set 5',
            subject: 'Calculus III',
            due: 'Due: Oct 26, 2023, 11:59 PM',
            status: 'Pending',
            statusColor: 'bg-amber-50 text-amber-500',
            action: 'Submit Now',
            actionColor: 'bg-blue-600 hover:bg-blue-700 text-white'
        },
        {
            title: 'Lab Report: Projectile Motion',
            subject: 'Physics 201',
            due: 'Due: Nov 02, 2023, 11:59 PM',
            status: 'Submitted',
            statusColor: 'bg-blue-50 text-blue-500',
            action: 'View Submission',
            actionColor: 'bg-slate-100 hover:bg-slate-200 text-slate-600'
        },
        {
            title: 'Poetry Analysis: "The Waste Land"',
            subject: 'English Literature',
            due: 'Due: Nov 08, 2023, 11:59 PM',
            status: 'Graded',
            statusColor: 'bg-emerald-50 text-emerald-500',
            action: 'View Feedback',
            actionColor: 'bg-slate-100 hover:bg-slate-200 text-slate-600'
        },
    ];

    return (
        <div className="max-w-[1400px] mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Header */}
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">My Assignments</h1>

            {/* Tabs & Navigation */}
            <div className="flex border-b border-slate-100 gap-12">
                {['Current Assignments', 'Past Assignments'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab.split(' ')[0])}
                        className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === tab.split(' ')[0] ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        {tab}
                        {activeTab === tab.split(' ')[0] && (
                            <motion.div layoutId="assignActiveTab" className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full" />
                        )}
                    </button>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-6 items-center">
                <div className="flex-1 min-w-[300px] relative group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300">🔍</span>
                    <input
                        type="text"
                        placeholder="Search by assignment title..."
                        className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-16 pr-6 font-bold text-slate-700 shadow-sm focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    />
                </div>

                <div className="flex gap-4">
                    <FilterDropdown label="All Courses" />
                    <FilterDropdown label="All Statuses" />
                </div>
            </div>

            {/* Assignment List */}
            <div className="space-y-4">
                {assignments.map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -4, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                        className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group transition-all"
                    >
                        <div className="flex-1 flex gap-12">
                            <div className="space-y-1 min-w-[300px]">
                                <h3 className="text-xl font-black text-slate-800 tracking-tight leading-snug">{item.title}</h3>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{item.subject}</p>
                            </div>

                            <div className="flex items-center gap-12">
                                <div className="flex items-center gap-3">
                                    <span className="text-rose-400">📅</span>
                                    <span className={`text-[11px] font-black uppercase tracking-widest ${item.status === 'Overdue' ? 'text-rose-500' : 'text-slate-400'}`}>
                                        {item.due}
                                    </span>
                                </div>
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${item.statusColor}`}>
                                    {item.status}
                                </span>
                            </div>
                        </div>

                        <button className={`px-8 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-transparent hover:shadow-blue-100/50 min-w-[160px] ${item.actionColor}`}>
                            {item.action}
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const FilterDropdown = ({ label }) => (
    <div className="relative group">
        <button className="bg-white border border-slate-100 px-8 py-4 rounded-2xl flex items-center gap-6 font-black text-xs text-slate-700 shadow-sm hover:bg-slate-50 transition-all outline-none uppercase tracking-widest min-w-[180px] justify-between">
            {label} <span className="text-[10px] text-slate-400">▼</span>
        </button>
    </div>
);

export default StudentAssignmentsSection;
