import React, { useState } from 'react';
import { motion } from 'framer-motion';

const subjects = ['English', 'Maths', 'Science', 'History', 'Art', 'Music'];
const subScores = [85, 91, 78, 82, 88, 72];

const students = [
    { roll: '01', name: 'Anika Sharma', grade: 'A+', attendance: '99%' },
    { roll: '02', name: 'Rohan Patel', grade: 'A', attendance: '97%' },
    { roll: '03', name: 'Priya Singh', grade: 'B+', attendance: '95%' },
    { roll: '04', name: 'Arjun Mehta', grade: 'B', attendance: '93%' },
    { roll: '05', name: 'Saanvi Gupta', grade: 'C+', attendance: '91%' },
    { roll: '06', name: 'Kabir Desai', grade: 'F', attendance: '72%' },
    { roll: '07', name: 'Isha Reddy', grade: 'B', attendance: '94%' },
    { roll: '08', name: 'Vivaan Kumar', grade: 'A', attendance: '98%' },
    { roll: '09', name: 'Aarohi Joshi', grade: 'C', attendance: '88%' },
];

const gradeColor = { 'A+': 'bg-emerald-500 text-white', A: 'bg-emerald-400 text-white', 'B+': 'bg-blue-400 text-white', B: 'bg-blue-300 text-white', 'C+': 'bg-amber-400 text-white', C: 'bg-amber-300 text-white', F: 'bg-rose-500 text-white' };

// Simple SVG donut
const DONUT = [
    { label: 'A Grade', pct: 25, color: '#3b82f6' },
    { label: 'B Grade', pct: 40, color: '#93c5fd' },
    { label: 'C Grade', pct: 20, color: '#bfdbfe' },
    { label: 'D Grade', pct: 10, color: '#dbeafe' },
    { label: 'F Grade', pct: 5, color: '#fca5a5' },
];

const DonutChart = () => {
    const r = 60, cx = 80, cy = 80, stroke = 28;
    const circ = 2 * Math.PI * r;
    let offset = 0;
    return (
        <svg width={160} height={160}>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={stroke} />
            {DONUT.map((s, i) => {
                const dash = (s.pct / 100) * circ;
                const gap = circ - dash;
                const seg = (
                    <circle key={i} cx={cx} cy={cy} r={r} fill="none"
                        stroke={s.color} strokeWidth={stroke}
                        strokeDasharray={`${dash} ${gap}`}
                        strokeDashoffset={-offset}
                        transform={`rotate(-90 ${cx} ${cy})`}
                        style={{ transition: 'stroke-dasharray 0.6s ease' }} />
                );
                offset += dash;
                return seg;
            })}
        </svg>
    );
};

const ClassPerformanceDetail = () => (
    <div className="max-w-[1300px] mx-auto space-y-10 animate-in fade-in duration-700">
        {/* Breadcrumb */}
        <p className="text-xs font-bold text-slate-400">
            <span className="hover:text-blue-600 cursor-pointer transition-all">School-Wide</span>
            <span className="mx-2 text-slate-300">/</span>
            <span className="hover:text-blue-600 cursor-pointer transition-all">Grade 10</span>
            <span className="mx-2 text-slate-300">/</span>
            <span className="text-slate-900 font-black">Class 10A</span>
        </p>

        {/* Title + Actions */}
        <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Performance for Grade 10 – Section A</h1>
            <p className="text-slate-400 font-medium">Class Teacher: <span className="font-bold text-slate-700">Ms. Eleanor Vance</span></p>
        </div>
        <div className="flex gap-4">
            <button className="flex items-center gap-2 px-7 py-4 bg-white border border-slate-200 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 shadow-sm transition-all">⬇ Download Class Report</button>
            <button className="flex items-center gap-2 px-7 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">✉ Contact Class Teacher</button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6">
            {[
                { label: 'Class Average', val: '82.5%', color: 'text-slate-900' },
                { label: 'Pass Percentage', val: '95%', color: 'text-slate-900' },
                { label: 'Top Student', val: 'Anika Sh...', color: 'text-emerald-600' },
                { label: 'Attendance Rate', val: '98%', color: 'text-green-600' },
            ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                    className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                    <p className={`text-3xl font-black tracking-tight ${s.color}`}>{s.val}</p>
                </motion.div>
            ))}
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-5 gap-8">
            {/* Left column: bar chart + donut */}
            <div className="col-span-3 space-y-8">
                {/* Subject-wise bar */}
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                    <h3 className="text-lg font-black text-slate-800 tracking-tight">Subject-wise Performance</h3>
                    <div className="flex items-end gap-6 h-44">
                        {subjects.map((s, i) => (
                            <div key={s} className="flex-1 flex flex-col items-center gap-3">
                                <motion.div initial={{ height: 0 }} animate={{ height: `${(subScores[i] / 100) * 150}px` }} transition={{ delay: i * 0.09, duration: 0.5, ease: 'easeOut' }}
                                    className="w-full rounded-t-2xl bg-blue-200 hover:bg-blue-400 transition-colors cursor-pointer" />
                                <p className="text-[10px] font-black text-slate-400">{s}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Performance Distribution donut */}
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                    <h3 className="text-lg font-black text-slate-800 tracking-tight">Performance Distribution</h3>
                    <div className="flex items-center gap-10">
                        <DonutChart />
                        <div className="space-y-3">
                            {DONUT.map(d => (
                                <div key={d.label} className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: d.color }} />
                                    <span className="text-sm font-bold text-slate-600">{d.label} ({d.pct}%)</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right column: student list */}
            <div className="col-span-2 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 pb-4">
                    <h3 className="text-lg font-black text-slate-800 tracking-tight">Student List</h3>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-y border-slate-50 bg-slate-50/50">
                            {['Roll No.', 'Student Name', 'Grade', 'At.'].map(h => (
                                <th key={h} className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {students.map((s, i) => (
                            <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                                className="hover:bg-slate-50/30 transition-all">
                                <td className="px-5 py-4 font-bold text-slate-400 text-sm">{s.roll}</td>
                                <td className="px-5 py-4 font-black text-blue-600 text-sm">{s.name}</td>
                                <td className="px-5 py-4">
                                    <span className={`w-9 h-9 rounded-full text-[11px] font-black flex items-center justify-center ${gradeColor[s.grade] || 'bg-slate-100 text-slate-500'}`}>{s.grade}</span>
                                </td>
                                <td className="px-5 py-4 font-bold text-slate-400 text-sm">{s.attendance}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

export default ClassPerformanceDetail;
