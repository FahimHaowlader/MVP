import React, { useState } from 'react';
import { motion } from 'framer-motion';

const subjects = ['Math', 'Science', 'English', 'History', 'Art', 'Music'];
const subjectScores = [85, 78, 92, 65, 88, 74];

const topStudents = [
    { rank: 1, name: 'Olivia Chen', grade: '98%', color: 'text-emerald-600' },
    { rank: 2, name: 'Benjamin Carter', grade: '96%', color: 'text-emerald-600' },
    { rank: 3, name: 'Sophia Rodriguez', grade: '95%', color: 'text-emerald-600' },
    { rank: 4, name: 'Liam Goldberg', grade: '93%', color: 'text-slate-700' },
    { rank: 5, name: 'Ava Nguyen', grade: '92%', color: 'text-slate-700' },
];

const subjectPerf = [
    { name: 'Mathematics', avg: '85%', high: '98%' },
    { name: 'Science', avg: '78%', high: '95%' },
    { name: 'English', avg: '92%', high: '100%' },
    { name: 'History', avg: '65%', high: '89%' },
];

const StudentPerformance = () => {
    const [grade, setGrade] = useState('Grade 10');
    const [section, setSection] = useState('Section A');

    const maxScore = Math.max(...subjectScores);

    return (
        <div className="max-w-[1400px] mx-auto space-y-10 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Performance Overview for {grade} – {section}</h1>
                    <p className="text-slate-400 font-medium mt-2">Select class and section to view performance details.</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-7 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm font-black text-[11px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
                        🔀 Compare Classes
                    </button>
                    <button className="flex items-center gap-2 px-7 py-4 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-100 font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 active:scale-95 transition-all">
                        ⬇ Download Full Report
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Class</label>
                    <select value={grade} onChange={e => setGrade(e.target.value)} className="px-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm outline-none font-bold text-slate-800 appearance-none">
                        {['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(g => <option key={g}>{g}</option>)}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Section</label>
                    <select value={section} onChange={e => setSection(e.target.value)} className="px-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm outline-none font-bold text-slate-800 appearance-none">
                        {['Section A', 'Section B', 'Section C'].map(s => <option key={s}>{s}</option>)}
                    </select>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-4 gap-6">
                {[
                    { label: 'Class Average', val: '85%', color: 'text-slate-900' },
                    { label: 'Pass Percentage', val: '92%', color: 'text-emerald-600' },
                    { label: 'Top Performing Subject', val: 'Mathematics', color: 'text-slate-900' },
                    { label: 'Subject Needing Attention', val: 'History', color: 'text-amber-500' },
                ].map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-3">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                        <p className={`text-3xl font-black tracking-tight ${s.color}`}>{s.val}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Bar Chart */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-black text-slate-800 tracking-tight">Average Score by Subject</h3>
                            <span className="text-[11px] font-black text-emerald-600">This Semester ↗ +2.5%</span>
                        </div>
                        {/* Bar Chart */}
                        <div className="flex items-end gap-5 h-44 px-4">
                            {subjects.map((subj, i) => (
                                <div key={subj} className="flex-1 flex flex-col items-center gap-3">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(subjectScores[i] / maxScore) * 140}px` }}
                                        transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
                                        className="w-full rounded-t-2xl bg-blue-100 hover:bg-blue-300 transition-colors cursor-pointer min-w-[32px]"
                                    />
                                    <p className="text-[10px] font-bold text-slate-400">{subj}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Subject Performance Table */}
                    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-10 pb-6">
                            <h3 className="text-lg font-black text-slate-800 tracking-tight">Subject Performance</h3>
                        </div>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 border-y border-slate-50">
                                    {['Subject Name', 'Average Score', 'Highest Score'].map(h => (
                                        <th key={h} className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {subjectPerf.map((s, i) => (
                                    <tr key={i} className="hover:bg-slate-50/30 transition-all">
                                        <td className="px-10 py-5 font-black text-slate-800">{s.name}</td>
                                        <td className="px-10 py-5 font-bold text-slate-600">{s.avg}</td>
                                        <td className="px-10 py-5 font-black text-blue-600">{s.high}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {/* Top Students */}
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                        <h3 className="text-lg font-black text-slate-800 tracking-tight">Top Performing Students</h3>
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    {['Rank', 'Name', 'Overall Grade'].map(h => (
                                        <th key={h} className="pb-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {topStudents.map((s, i) => (
                                    <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }} className="hover:bg-slate-50/30 transition-all">
                                        <td className="py-4 font-black text-slate-400 text-sm">{s.rank}</td>
                                        <td className="py-4 font-black text-slate-800 text-sm">{s.name}</td>
                                        <td className={`py-4 font-black text-sm ${s.color}`}>{s.grade}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Attendance Donut */}
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                        <h3 className="text-lg font-black text-slate-800 tracking-tight">Attendance Overview</h3>
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative w-36 h-36">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                                    <circle cx="60" cy="60" r="50" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                                    <motion.circle
                                        cx="60" cy="60" r="50" fill="none"
                                        stroke="#3b82f6" strokeWidth="12"
                                        strokeLinecap="round"
                                        strokeDasharray={`${2 * Math.PI * 50}`}
                                        initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                                        animate={{ strokeDashoffset: 2 * Math.PI * 50 * 0.05 }}
                                        transition={{ duration: 1.2, ease: 'easeOut' }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <p className="text-2xl font-black text-slate-900">95%</p>
                                    <p className="text-[10px] font-bold text-slate-400">Present</p>
                                </div>
                            </div>
                            <p className="text-xs font-black text-rose-500">This Month ↘ -1.2%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentPerformance;
