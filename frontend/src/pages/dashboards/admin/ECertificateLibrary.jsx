import React, { useState } from 'react';
import { motion } from 'framer-motion';

const certs = [
    { name: 'James Clear', id: '1245', type: 'Certificate of Achievement', date: 'June 15, 2024', issuedBy: 'Sarah Connor', status: 'Active' },
    { name: 'Emily Blunt', id: '3456', type: 'Perfect Attendance', date: 'May 30, 2024', issuedBy: 'John Krasinski', status: 'Active' },
    { name: 'Michael Scott', id: '7890', type: 'Leadership Award', date: 'April 1, 2023', issuedBy: 'David Wallace', status: 'Archived' },
    { name: 'Jessica Day', id: '1122', type: 'Science Fair Winner', date: 'March 22, 2024', issuedBy: 'Sarah Connor', status: 'Active' },
];

const ECertificateLibrary = () => {
    const [search, setSearch] = useState('');
    const filtered = certs.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.type.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-[1200px] mx-auto space-y-12 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">E-Certificate Library</h1>
                    <p className="text-blue-600 font-bold mt-2">Manage all issued digital certificates for historical reference.</p>
                </div>
                <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                    + Create Certificate
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[['Total Certificates Issued', '1,482', '+5.2% vs. last year'], ['Issued This Academic Year', '125', '+11.0% vs. last month']].map(([label, val, sub]) => (
                    <div key={label} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-4">
                        <p className="text-sm font-bold text-slate-500">{label}</p>
                        <p className="text-5xl font-black text-slate-900 tracking-tighter">{val}</p>
                        <p className="text-sm font-bold text-emerald-600">{sub}</p>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-wrap gap-4 items-center">
                    <div className="relative flex-1 min-w-[200px]">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search by recipient, ID..."
                            className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-slate-100 font-medium text-slate-600"
                        />
                    </div>
                    <select className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-600 outline-none appearance-none">
                        <option>Filter by Type</option>
                    </select>
                    <input type="date" className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-600 outline-none" />
                    <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-blue-100">Apply</button>
                    <button className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-200 transition-all">Reset</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 w-8"><input type="checkbox" className="rounded" /></th>
                                {['Recipient Name', 'Certificate Type', 'Issue Date', 'Issued By', 'Status', 'Actions'].map(h => (
                                    <th key={h} className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.map((c, i) => (
                                <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="hover:bg-slate-50/30 transition-all">
                                    <td className="px-8 py-5"><input type="checkbox" className="rounded" /></td>
                                    <td className="px-6 py-5">
                                        <p className="font-black text-slate-800">{c.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400">(ID: {c.id})</p>
                                    </td>
                                    <td className="px-6 py-5 font-bold text-slate-600 text-sm">{c.type}</td>
                                    <td className="px-6 py-5 font-bold text-slate-600 text-sm">{c.date}</td>
                                    <td className="px-6 py-5 font-bold text-slate-600 text-sm">{c.issuedBy}</td>
                                    <td className="px-6 py-5">
                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${c.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                            {c.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <button className="text-slate-400 hover:text-blue-600 transition-colors text-xl" title="View">👁</button>
                                            <button className="text-slate-400 hover:text-blue-600 transition-colors text-xl" title="Send">📧</button>
                                            <button className="text-slate-400 hover:text-rose-500 transition-colors text-xl" title="Archive">🗂</button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 border-t border-slate-50 flex justify-between items-center bg-slate-50/20">
                    <p className="text-xs font-bold text-slate-400">Showing <span className="text-slate-900">1-10</span> of 100</p>
                    <div className="flex gap-2">
                        <button className="px-6 py-3 bg-white border border-slate-100 rounded-xl font-black text-xs text-slate-400">Previous</button>
                        {[1, 2, 3].map(p => (
                            <button key={p} className={`w-10 h-10 rounded-xl font-black text-sm ${p === 2 ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white border border-slate-100 text-slate-500'}`}>{p}</button>
                        ))}
                        <button className="px-6 py-3 bg-white border border-slate-100 rounded-xl font-black text-xs text-slate-600">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ECertificateLibrary;
