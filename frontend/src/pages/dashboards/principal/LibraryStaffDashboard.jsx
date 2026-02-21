import React, { useState } from 'react';
import { motion } from 'framer-motion';

const staffList = [
    { name: 'Jane Cooper', role: 'Head Librarian', status: 'Active', email: 'jane.cooper@example.com', avatar: 'jane.cooper' },
    { name: 'Cody Fisher', role: 'Assistant', status: 'Active', email: 'cody.fisher@example.com', avatar: 'cody.fisher' },
    { name: 'Esther Howard', role: 'Intern', status: 'On Leave', email: 'esther.howard@example.com', avatar: 'esther.howard' },
    { name: 'Jenny Wilson', role: 'Assistant', status: 'Active', email: 'jenny.wilson@example.com', avatar: 'jenny.wilson' },
];

const roleData = [
    { label: 'Head Librarian', pct: 60, color: '#3b82f6' },
    { label: 'Assistant', pct: 30, color: '#22c55e' },
    { label: 'Intern', pct: 10, color: '#f59e0b' },
];
const DonutStaff = () => {
    const r = 64, cx = 80, cy = 80, sw = 26;
    const circ = 2 * Math.PI * r;
    let off = 0;
    return (
        <div className="relative w-40 h-40 flex-shrink-0">
            <svg width={160} height={160}>
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={sw} />
                {roleData.map((d, i) => {
                    const dash = (d.pct / 100) * circ;
                    const seg = <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={d.color} strokeWidth={sw}
                        strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={-off}
                        transform={`rotate(-90 ${cx} ${cy})`} />;
                    off += dash; return seg;
                })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl font-black text-slate-900">48</p>
                <p className="text-[10px] font-bold text-slate-400">Total Staff</p>
            </div>
        </div>
    );
};

const statusStyle = { Active: 'bg-emerald-50 text-emerald-600 border-emerald-100', 'On Leave': 'bg-amber-50 text-amber-600 border-amber-100' };

const LibraryStaffDashboard = () => {
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('All Roles');
    const [statusFilter, setStatusFilter] = useState('All Statuses');

    const filtered = staffList.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) &&
        (roleFilter === 'All Roles' || s.role === roleFilter) &&
        (statusFilter === 'All Statuses' || s.status === statusFilter)
    );

    return (
        <div className="max-w-[1200px] mx-auto space-y-10 animate-in fade-in duration-700">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Library Staff Dashboard</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-6">
                {[
                    { label: 'Total Staff', val: '48', icon: '👥' },
                    { label: 'Active Staff', val: '42', icon: '✅' },
                    { label: 'Staff on Leave', val: '4', icon: '🗑' },
                    { label: 'New Staff (30 Days)', val: '2', icon: '➕' },
                ].map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                        <div className="flex justify-between items-start">
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                            <span className="text-xl text-slate-300">{s.icon}</span>
                        </div>
                        <p className="text-4xl font-black text-slate-900 tracking-tight">{s.val}</p>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions + Donut */}
            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                    <h3 className="text-lg font-black text-slate-800 tracking-tight">Quick Actions</h3>
                    <div className="flex flex-wrap gap-4">
                        <button className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">+ Add New Staff Member</button>
                        <button className="flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 shadow-sm transition-all">📊 Generate Staff Report</button>
                        <button className="flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 shadow-sm transition-all">🔐 Manage Roles & Permissions</button>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                    <h3 className="text-lg font-black text-slate-800 tracking-tight">Staff by Role</h3>
                    <div className="flex items-center gap-6">
                        <DonutStaff />
                        <div className="space-y-3">
                            {roleData.map(d => (
                                <div key={d.label} className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: d.color }} />
                                    <div>
                                        <p className="text-[11px] font-black text-slate-700">{d.label}</p>
                                        <p className="text-[10px] font-bold text-slate-400">{d.pct}%</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Staff Table */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-10 pb-6 space-y-4">
                    <h3 className="text-lg font-black text-slate-800 tracking-tight">All Staff Members</h3>
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name..."
                                className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-medium text-slate-700" />
                        </div>
                        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 appearance-none">
                            {['All Roles', 'Head Librarian', 'Assistant', 'Intern'].map(r => <option key={r}>{r}</option>)}
                        </select>
                        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 appearance-none">
                            {['All Statuses', 'Active', 'On Leave'].map(s => <option key={s}>{s}</option>)}
                        </select>
                    </div>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-y border-slate-50 bg-slate-50/50">
                            {['Staff Name', 'Role', 'Status', 'Contact Email', 'Actions'].map(h => (
                                <th key={h} className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filtered.map((s, i) => (
                            <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                                className="hover:bg-slate-50/30 transition-all">
                                <td className="px-10 py-5">
                                    <div className="flex items-center gap-4">
                                        <img src={`https://i.pravatar.cc/150?u=${s.avatar}`} alt="" className="w-11 h-11 rounded-2xl object-cover" />
                                        <span className="font-black text-slate-900">{s.name}</span>
                                    </div>
                                </td>
                                <td className="px-10 py-5 font-bold text-slate-500">{s.role}</td>
                                <td className="px-10 py-5">
                                    <span className={`px-4 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest ${statusStyle[s.status]}`}>{s.status}</span>
                                </td>
                                <td className="px-10 py-5 font-bold text-slate-500">{s.email}</td>
                                <td className="px-10 py-5">
                                    <div className="flex gap-3">
                                        <button className="font-black text-blue-600 text-sm hover:underline">Edit</button>
                                        <button className="font-black text-slate-400 text-sm hover:text-slate-700 transition-all">View</button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LibraryStaffDashboard;
