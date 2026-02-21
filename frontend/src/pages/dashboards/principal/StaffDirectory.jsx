import React, { useState } from 'react';
import { motion } from 'framer-motion';

const staff = [
    { name: 'Dr. Eleanor Vance', role: 'Head Librarian', dept: 'Library', email: 'e.vance@school.edu', ext: 'x1234', avatar: 'eleanor.d' },
    { name: 'Mr. Jonathan Sims', role: 'Archivist', dept: 'Library', email: 'j.sims@school.edu', ext: 'x1235', avatar: 'jonathan.s' },
    { name: 'Ms. Priya Singh', role: 'History Teacher', dept: 'History Department', email: 'p.singh@school.edu', ext: 'x2567', avatar: 'priya.s' },
    { name: 'Mr. David Chen', role: 'Science Teacher', dept: 'Science Department', email: 'd.chen@school.edu', ext: 'x3451', avatar: 'david.c' },
    { name: 'Mrs. Olivia Martinez', role: 'IT Support', dept: 'Administration', email: 'o.martinez@school.edu', ext: 'x4890', avatar: 'olivia.m' },
];

const StaffDirectory = () => {
    const [search, setSearch] = useState('');
    const [deptFilter, setDeptFilter] = useState('Filter by Department');
    const [sortBy, setSortBy] = useState('Name A-Z');

    const filtered = staff
        .filter(s => (s.name + s.role + s.email).toLowerCase().includes(search.toLowerCase()) &&
            (deptFilter === 'Filter by Department' || s.dept === deptFilter))
        .sort((a, b) => sortBy === 'Name A-Z' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));

    return (
        <div className="max-w-[1200px] mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Staff Directory</h1>
                    <p className="text-slate-400 font-medium mt-2">Manage and view all staff members across the institution.</p>
                </div>
                <button className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                    + Add New Staff
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, role, email..."
                        className="w-full pl-12 pr-5 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700" />
                </div>
                <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="px-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm outline-none font-bold text-slate-700 appearance-none">
                    {['Filter by Department', 'Library', 'History Department', 'Science Department', 'Administration'].map(d => <option key={d}>{d}</option>)}
                </select>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm outline-none font-bold text-slate-700 appearance-none">
                    {['Sort by: Name A-Z', 'Sort by: Name Z-A'].map(s => <option key={s}>{s}</option>)}
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-50 bg-slate-50/50">
                            {['Name', 'Department', 'Email', 'Extension', 'Actions'].map(h => (
                                <th key={h} className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filtered.map((s, i) => (
                            <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                                className="hover:bg-slate-50/30 transition-all group">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <img src={`https://i.pravatar.cc/150?u=${s.avatar}`} alt="" className="w-12 h-12 rounded-2xl object-cover border-2 border-slate-100" />
                                        <div>
                                            <p className="font-black text-slate-900">{s.name}</p>
                                            <p className="text-[11px] font-bold text-slate-400">{s.role}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5 font-bold text-slate-500 text-sm">{s.dept}</td>
                                <td className="px-8 py-5 font-bold text-slate-500 text-sm">{s.email}</td>
                                <td className="px-8 py-5 font-bold text-slate-500 text-sm">{s.ext}</td>
                                <td className="px-8 py-5">
                                    <button className="text-slate-300 hover:text-slate-600 transition-all text-xl font-black">⋯</button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="px-8 py-5 flex justify-between items-center border-t border-slate-50">
                    <p className="text-[11px] font-bold text-slate-400">Showing <span className="text-blue-600 font-black">1</span> to <span className="font-black text-slate-700">{filtered.length}</span> of <span className="font-black text-slate-700">23</span> results</p>
                    <div className="flex gap-2">
                        <button className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 font-black text-sm hover:bg-slate-200 transition-all">‹</button>
                        <button className="w-9 h-9 rounded-xl bg-slate-900 text-white font-black text-sm shadow">›</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffDirectory;
