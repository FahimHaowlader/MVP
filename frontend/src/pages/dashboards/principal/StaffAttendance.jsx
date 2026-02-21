import React, { useState } from 'react';
import { motion } from 'framer-motion';

const staffData = [
    { id: 1, name: 'Olivia Martin', code: 'LIB-001', dept: 'Librarian', status: 'Present', avatar: 'olivia.martin' },
    { id: 2, name: 'Liam Johnson', code: 'ITS-003', dept: 'IT Support', status: 'Absent', avatar: 'liam.johnson' },
    { id: 3, name: 'Emma Garcia', code: 'LIB-002', dept: 'Librarian', status: 'On Leave', avatar: 'emma.garcia' },
    { id: 4, name: 'Noah Smith', code: 'ADM-001', dept: 'Administration', status: 'Present', avatar: 'noah.smith' },
    { id: 5, name: 'Sophia Brown', code: 'LIB-003', dept: 'Librarian', status: 'Present', avatar: 'sophia.brown' },
];

const STATUS_OPTIONS = ['Present', 'Absent', 'On Leave'];
const statusStyle = {
    Present: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Absent: 'bg-rose-50 text-rose-600 border-rose-200',
    'On Leave': 'bg-amber-50 text-amber-600 border-amber-200',
};

const StaffAttendance = () => {
    const [attendance, setAttendance] = useState(Object.fromEntries(staffData.map(s => [s.id, s.status])));
    const [saved, setSaved] = useState(false);

    const setStatus = (id, status) => { setAttendance(a => ({ ...a, [id]: status })); setSaved(false); };
    const counts = { Present: 0, Absent: 0, 'On Leave': 0 };
    Object.values(attendance).forEach(s => counts[s]++);

    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return (
        <div className="max-w-[1200px] mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Staff Attendance</h1>
                    <p className="text-slate-400 font-medium mt-2">Mark attendance for <strong className="text-slate-700">{today}</strong></p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-7 py-4 bg-white border border-slate-200 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
                        📅 View History
                    </button>
                    <button onClick={() => setSaved(true)} className="flex items-center gap-2 px-7 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                        {saved ? '✅ Saved!' : '💾 Save Changes'}
                    </button>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-4 gap-6">
                {[
                    { label: 'Total Staff', val: staffData.length, color: 'text-slate-900' },
                    { label: 'Present', val: counts.Present, color: 'text-emerald-600' },
                    { label: 'Absent', val: counts.Absent, color: 'text-rose-500' },
                    { label: 'On Leave', val: counts['On Leave'], color: 'text-amber-500' },
                ].map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-3">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                        <p className={`text-4xl font-black tracking-tight ${s.color}`}>{s.val}</p>
                    </motion.div>
                ))}
            </div>

            {/* Attendance Table */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-50 bg-slate-50/50">
                            <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Staff Member</th>
                            <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</th>
                            <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Attendance Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {staffData.map((s, i) => (
                            <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                                className="hover:bg-slate-50/30 transition-all">
                                <td className="px-10 py-5">
                                    <div className="flex items-center gap-4">
                                        <img src={`https://i.pravatar.cc/150?u=${s.avatar}`} alt="" className="w-12 h-12 rounded-2xl object-cover" />
                                        <div>
                                            <p className="font-black text-slate-900">{s.name}</p>
                                            <p className="text-[11px] font-bold text-slate-400">{s.code}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-10 py-5 font-bold text-slate-500">{s.dept}</td>
                                <td className="px-10 py-5">
                                    <div className="flex gap-3">
                                        {STATUS_OPTIONS.map(opt => (
                                            <button key={opt} onClick={() => setStatus(s.id, opt)}
                                                className={`px-5 py-2 rounded-xl font-black text-xs transition-all border ${attendance[s.id] === opt ? statusStyle[opt] + ' shadow-sm' : 'text-slate-400 border-transparent hover:text-slate-600'}`}>
                                                {opt}
                                            </button>
                                        ))}
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

export default StaffAttendance;
