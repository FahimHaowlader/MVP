import React, { useState } from 'react';
import { motion } from 'framer-motion';

const teachers = [
    { name: 'James Sullivan', subject: 'Physics', pass: 95, feedback: 4.8, classes: 4, avatar: 'james.sullivan' },
    { name: 'Maria Garcia', subject: 'History', pass: 92, feedback: 4.9, classes: 5, avatar: 'maria.garcia' },
    { name: 'Robert Chen', subject: 'Calculus', pass: 78, feedback: 4.1, classes: 3, avatar: 'robert.chen' },
    { name: 'Anna Freud', subject: 'Literature', pass: 91, feedback: 4.6, classes: 4, avatar: 'anna.freud' },
];

const stats = [
    { label: 'Total Teachers', val: '74', delta: '+2 this month', deltaColor: 'text-emerald-600' },
    { label: 'Avg. Teacher Rating', val: '4.7/5.0', delta: '+0.1 vs last term', deltaColor: 'text-emerald-600' },
    { label: 'Most Improved', val: 'Anna ...', delta: '+12% in score', deltaColor: 'text-emerald-600' },
    { label: 'Pending Evaluations', val: '3', delta: 'Due this week', deltaColor: 'text-amber-500' },
    { label: 'Avg. Pass Rate', val: '89%', delta: '-1.5% vs last term', deltaColor: 'text-rose-500' },
];

const passColor = v => v >= 90 ? 'text-emerald-600' : v >= 80 ? 'text-amber-500' : 'text-rose-500';

const TeacherPerformanceDashboard = () => {
    const [tab, setTab] = useState(0);
    const [dept, setDept] = useState('All Departments');
    const [subj, setSubj] = useState('All Subjects');
    const [cls, setCls] = useState('All Classes');

    const filtered = teachers.filter(t =>
        (subj === 'All Subjects' || t.subject === subj)
    );

    return (
        <div className="max-w-[1300px] mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Teacher Performance Dashboard</h1>
                    <p className="text-slate-400 font-medium mt-2">Monitor teacher effectiveness and classroom impact.</p>
                </div>
                <button className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                    ↑ Export Report
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-5 gap-5">
                {stats.map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                        className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-3">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">{s.label}</p>
                        <p className="text-3xl font-black text-slate-900 tracking-tight leading-none">{s.val}</p>
                        <p className={`text-[11px] font-black ${s.deltaColor}`}>{s.delta}</p>
                    </motion.div>
                ))}
            </div>

            {/* Tabs + Table */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex border-b border-slate-50 px-8">
                    {['Performance Overview', 'Detailed Analytics'].map((t, i) => (
                        <button key={i} onClick={() => setTab(i)}
                            className={`px-8 py-5 font-black text-sm border-b-2 transition-all ${tab === i ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>
                            {t}
                        </button>
                    ))}
                </div>

                {/* Filters */}
                <div className="px-8 py-6 flex gap-4">
                    {[['All Departments', setDept, ['All Departments', 'Science', 'Mathematics', 'Humanities']],
                    ['All Subjects', setSubj, ['All Subjects', 'Physics', 'History', 'Calculus', 'Literature']],
                    ['All Classes', setCls, ['All Classes', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']]
                    ].map(([placeholder, setter, opts], i) => (
                        <select key={i} onChange={e => setter(e.target.value)}
                            className="px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 text-sm appearance-none">
                            {opts.map(o => <option key={o}>{o}</option>)}
                        </select>
                    ))}
                </div>

                {/* Table */}
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-y border-slate-50 bg-slate-50/50">
                            {['Teacher', 'Subject', 'Pass Rate', 'Feedback', 'Classes', ''].map(h => (
                                <th key={h} className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filtered.map((t, i) => (
                            <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                                className="hover:bg-slate-50/30 transition-all">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <img src={`https://i.pravatar.cc/150?u=${t.avatar}`} alt="" className="w-10 h-10 rounded-2xl object-cover" />
                                        <span className="font-black text-slate-900">{t.name}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 font-bold text-slate-500">{t.subject}</td>
                                <td className={`px-8 py-5 font-black ${passColor(t.pass)}`}>{t.pass}%</td>
                                <td className={`px-8 py-5 font-black ${t.feedback >= 4.5 ? 'text-emerald-600' : 'text-amber-500'}`}>{t.feedback}/5</td>
                                <td className="px-8 py-5 font-bold text-slate-600">{t.classes}</td>
                                <td className="px-8 py-5">
                                    <div className="flex gap-3">
                                        <button className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-black text-xs hover:bg-slate-200 transition-all">Compare</button>
                                        <button className="px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-black text-xs hover:bg-blue-100 transition-all border border-blue-100">View Details</button>
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

export default TeacherPerformanceDashboard;
