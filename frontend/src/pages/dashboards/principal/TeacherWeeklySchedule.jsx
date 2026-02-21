import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TIMES = ['09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '13:00 - 14:00', '14:00 - 15:00'];

// null = empty/free
const schedule = [
    // 09:00-10:00
    [
        { type: 'class', cls: 'Class 10-A', sub: 'Mathematics', room: 'Room 201' },
        { type: 'class', cls: 'Class 11-B', sub: 'Physics', room: 'Room 305' },
        { type: 'free' },
        { type: 'class', cls: 'Class 10-A', sub: 'Mathematics', room: 'Room 201' },
        { type: 'admin', cls: 'Admin Duty', sub: 'Exam Invigilation', room: 'Hall B' },
        null,
    ],
    // 10:00-11:00
    [
        { type: 'free' },
        { type: 'class', cls: 'Class 12-A', sub: 'Physics', room: 'Lab 02' },
        { type: 'class', cls: 'Class 10-B', sub: 'Mathematics', room: 'Room 202' },
        { type: 'class', cls: 'Class 11-B', sub: 'Physics', room: 'Room 305' },
        { type: 'class', cls: 'Class 10-A', sub: 'Mathematics', room: 'Room 201' },
        null,
    ],
    // 11:00-12:00
    [
        { type: 'class', cls: 'Class 9-C', sub: 'Mathematics', room: 'Room 103' },
        { type: 'class', cls: 'Class 10-A', sub: 'Mathematics', room: 'Room 201' },
        { type: 'class', cls: 'Class 12-A', sub: 'Physics', room: 'Lab 02' },
        { type: 'free' },
        { type: 'class', cls: 'Class 11-B', sub: 'Physics', room: 'Room 305' },
        { type: 'extra', cls: 'Extra Class', sub: 'Physics Club', room: 'Lab 01' },
    ],
    // 13:00-14:00
    [
        { type: 'class', cls: 'Class 11-B', sub: 'Physics', room: 'Room 305' },
        { type: 'free' },
        { type: 'class', cls: 'Class 9-C', sub: 'Mathematics', room: 'Room 103' },
        { type: 'admin', cls: 'Admin Duty', sub: 'Staff Meeting', room: 'Conf. Hall' },
        { type: 'free' },
        null,
    ],
    // 14:00-15:00
    [
        { type: 'class', cls: 'Class 12-A', sub: 'Physics', room: 'Lab 02' },
        { type: 'class', cls: 'Class 9-C', sub: 'Mathematics', room: 'Room 103' },
        { type: 'class', cls: 'Class 10-B', sub: 'Physics', room: 'Room 202' },
        { type: 'class', cls: 'Class 10-A', sub: 'Physics', room: 'Room 201' },
        { type: 'class', cls: 'Class 10-A', sub: 'Mathematics', room: 'Room 201' },
        null,
    ],
];

const cellStyle = {
    class: 'bg-blue-50 border border-blue-100 text-blue-800',
    free: 'bg-slate-50 border border-slate-100 text-slate-400',
    admin: 'bg-emerald-50 border border-emerald-100 text-emerald-800',
    extra: 'bg-purple-50 border border-purple-100 text-purple-800',
};

const TeacherWeeklySchedule = () => {
    const [weekOffset, setWeekOffset] = useState(0);
    const baseDate = new Date('2024-10-21');
    baseDate.setDate(baseDate.getDate() + weekOffset * 7);
    const endDate = new Date(baseDate);
    endDate.setDate(endDate.getDate() + 5);
    const fmt = d => d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return (
        <div className="max-w-[1400px] mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Breadcrumb */}
            <p className="text-xs font-bold text-slate-400">
                Dashboard <span className="mx-1 text-slate-300">/</span>
                <span className="hover:text-blue-600 cursor-pointer transition-all">Teachers</span>
                <span className="mx-1 text-slate-300">/</span>
                <span className="text-slate-900 font-black">Mr. Alan Grant</span>
            </p>

            {/* Teacher Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                    <img src="https://i.pravatar.cc/150?u=alan.grant.teacher" alt="" className="w-20 h-20 rounded-3xl object-cover border-4 border-white shadow-lg" />
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Mr. Alan Grant's Weekly Schedule</h1>
                        <p className="text-slate-400 font-bold mt-1">Mathematics &amp; Physics Teacher</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-7 py-4 bg-white border border-slate-200 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 shadow-sm transition-all">⬇ Export as PDF</button>
                    <button className="flex items-center gap-2 px-7 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">🖨 Print Schedule</button>
                </div>
            </div>

            {/* Week Navigator + Legend */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button onClick={() => setWeekOffset(w => w - 1)} className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-500 font-black hover:bg-slate-50 shadow-sm transition-all">‹</button>
                    <span className="font-black text-slate-800">{fmt(baseDate)} – {fmt(endDate)}</span>
                    <button onClick={() => setWeekOffset(w => w + 1)} className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-500 font-black hover:bg-slate-50 shadow-sm transition-all">›</button>
                </div>
                <div className="flex gap-6 text-[11px] font-bold text-slate-500">
                    <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-md bg-blue-200 inline-block" /> Class</span>
                    <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-md bg-slate-200 inline-block" /> Free Period</span>
                    <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-md bg-emerald-200 inline-block" /> Admin Duty</span>
                </div>
            </div>

            {/* Timetable */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left table-fixed">
                    <thead>
                        <tr className="border-b border-slate-50 bg-slate-50/50">
                            <th className="px-6 py-5 w-28 text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</th>
                            {DAYS.map(d => <th key={d} className="px-3 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{d}</th>)}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {TIMES.map((time, ti) => (
                            <React.Fragment key={ti}>
                                {ti === 3 && (
                                    <tr className="bg-slate-50">
                                        <td colSpan={7} className="text-center py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">LUNCH</td>
                                    </tr>
                                )}
                                <tr className="hover:bg-slate-50/20 transition-all">
                                    <td className="px-6 py-3 text-xs font-black text-slate-400 whitespace-nowrap">{time}</td>
                                    {schedule[ti].map((cell, di) => (
                                        <td key={di} className="px-2 py-3">
                                            {cell ? (
                                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: di * 0.04 }}
                                                    className={`p-3 rounded-2xl ${cellStyle[cell.type]} space-y-0.5 cursor-pointer hover:opacity-80 transition-all`}>
                                                    <p className="font-black text-[11px] leading-tight">{cell.cls}</p>
                                                    <p className="font-bold text-[10px] opacity-70">{cell.sub}</p>
                                                    <p className="font-bold text-[10px] opacity-60">{cell.room}</p>
                                                </motion.div>
                                            ) : <div className="h-16" />}
                                        </td>
                                    ))}
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherWeeklySchedule;
