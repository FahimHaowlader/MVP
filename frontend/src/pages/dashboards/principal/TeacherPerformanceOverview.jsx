import React, { useState } from 'react';
import { motion } from 'framer-motion';

const allTeachers = [
    { name: 'Eleanor Vance', subject: 'Physics', dept: 'Science', perf: 98, feedback: 4.9, attendance: 99, exp: '8 years', status: 'Excellent', avatar: 'eleanor.vance2' },
    { name: 'Marcus Holloway', subject: 'Calculus', dept: 'Mathematics', perf: 95, feedback: 4.8, attendance: 97, exp: '5 years', status: 'Excellent', avatar: 'marcus' },
    { name: 'Clara Oswald', subject: 'History', dept: 'Arts & Humanities', perf: 91, feedback: 4.6, attendance: 98, exp: '3 years', status: 'Good', avatar: 'clara' },
    { name: 'Leo Fitz', subject: 'Biology', dept: 'Science', perf: 82, feedback: 3.9, attendance: 95, exp: '2 years', status: 'Needs Attention', avatar: 'leo' },
];

const top5 = [
    { name: 'Eleanor Vance', subject: 'Science', rating: 4.9 },
    { name: 'Marcus Holloway', subject: 'Mathematics', rating: 4.8 },
    { name: 'Clara Oswald', subject: 'Arts', rating: 4.6 },
    { name: 'Sarah Jane', subject: 'English', rating: 4.6 },
    { name: 'Peter Capaldi', subject: 'Music', rating: 4.5 },
];

const depts = ['Science', 'Math', 'Arts', 'English', 'History'];
const deptScores = [95, 88, 82, 79, 76];

const statusStyle = {
    Excellent: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    Good: 'bg-blue-50 text-blue-600 border-blue-100',
    'Needs Attention': 'bg-amber-50 text-amber-600 border-amber-100',
};

const TeacherPerformanceOverview = () => {
    const [tab, setTab] = useState(0);

    return (
        <div className="max-w-[1300px] mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Teacher Performance Overview</h1>
                    <p className="text-slate-400 font-medium mt-2">Analyze teacher performance, student outcomes, and contribution to school growth.</p>
                </div>
                <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                    Export Report
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-5 gap-5">
                {[
                    { label: 'Total Teachers', val: '82', delta: '+2 this month', color: 'text-emerald-600' },
                    { label: 'Avg. Teacher Rating', val: '4.7/5', delta: '+0.1 vs last term', color: 'text-emerald-600' },
                    { label: 'Student Pass Rate', val: '92%', delta: '-1.2% vs last year', color: 'text-rose-500' },
                    { label: 'Attendance', val: '98%', delta: '+0.5% vs last term', color: 'text-emerald-600' },
                    { label: 'Top Department', val: 'Science', delta: 'Consistent', color: 'text-slate-500' },
                ].map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                        className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-3">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                        <p className="text-3xl font-black text-slate-900 tracking-tight">{s.val}</p>
                        <p className={`text-[11px] font-black ${s.color}`}>{s.delta}</p>
                    </motion.div>
                ))}
            </div>

            {/* Tab bar */}
            <div className="flex border-b border-slate-100">
                {['All Teachers', 'Teacher Analytics'].map((t, i) => (
                    <button key={i} onClick={() => setTab(i)}
                        className={`px-8 py-5 font-black text-sm border-b-2 transition-all ${tab === i ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>
                        {t}
                    </button>
                ))}
            </div>

            {/* Filters */}
            <div className="flex justify-between items-center">
                <div className="flex gap-4">
                    {[['All Departments', ['All Departments', 'Science', 'Mathematics', 'Arts & Humanities']],
                    ['All Subjects', ['All Subjects', 'Physics', 'Calculus', 'History', 'Biology']],
                    ['All Experience Levels', ['All Experience Levels', '1-3 years', '3-5 years', '5+ years']]
                    ].map(([ph, opts], i) => (
                        <select key={i} className="px-5 py-3.5 bg-white border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 text-sm appearance-none shadow-sm">
                            {opts.map(o => <option key={o}>{o}</option>)}
                        </select>
                    ))}
                </div>
                <div className="flex gap-2">
                    {['⚙', '↕', '⊞'].map(icon => (
                        <button key={icon} className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-slate-600 transition-all shadow-sm">{icon}</button>
                    ))}
                </div>
            </div>

            {/* Main Table */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-50 bg-slate-50/50">
                            {['Teacher', 'Department', 'Student Perf.', 'Feedback Rating', 'Attendance', 'Experience', 'Status'].map(h => (
                                <th key={h} className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {allTeachers.map((t, i) => (
                            <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                                className="hover:bg-slate-50/30 transition-all">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <img src={`https://i.pravatar.cc/150?u=${t.avatar}`} alt="" className="w-11 h-11 rounded-2xl object-cover" />
                                        <div>
                                            <p className="font-black text-slate-900">{t.name}</p>
                                            <p className="text-[11px] font-bold text-slate-400">{t.subject}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5 font-bold text-slate-500 text-sm">{t.dept}</td>
                                <td className={`px-8 py-5 font-black ${t.perf >= 90 ? 'text-slate-700' : 'text-slate-700'}`}>{t.perf}%</td>
                                <td className="px-8 py-5 font-black text-amber-500">{t.feedback} ⭐</td>
                                <td className="px-8 py-5 font-black text-slate-700">{t.attendance}%</td>
                                <td className="px-8 py-5 font-bold text-slate-500">{t.exp}</td>
                                <td className="px-8 py-5">
                                    <span className={`px-4 py-1.5 rounded-xl border font-black text-[10px] uppercase tracking-widest ${statusStyle[t.status]}`}>{t.status}</span>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-5 gap-8">
                {/* Top 5 */}
                <div className="col-span-2 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                    <h3 className="text-lg font-black text-slate-800 tracking-tight">Top 5 Performing Teachers</h3>
                    <div className="space-y-5">
                        {top5.map((t, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <img src={`https://i.pravatar.cc/150?u=top${i}`} alt="" className="w-10 h-10 rounded-2xl object-cover" />
                                <div className="flex-1">
                                    <p className="font-black text-slate-900 text-sm">{t.name}</p>
                                    <p className="text-[11px] font-bold text-slate-400">{t.subject}</p>
                                </div>
                                <span className="font-black text-amber-500 text-sm">{t.rating} ⭐</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bar chart */}
                <div className="col-span-3 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                    <h3 className="text-lg font-black text-slate-800 tracking-tight">Department Comparison (Avg. Pass Rate)</h3>
                    <div className="flex items-end gap-6 h-44">
                        {depts.map((d, i) => (
                            <div key={d} className="flex-1 flex flex-col items-center gap-3">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(deptScores[i] / 100) * 160}px` }}
                                    transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
                                    className="w-full rounded-t-2xl bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
                                />
                                <p className="text-[10px] font-bold text-slate-400">{d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherPerformanceOverview;
