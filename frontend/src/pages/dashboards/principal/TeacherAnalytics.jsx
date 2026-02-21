import React, { useState } from 'react';
import { motion } from 'framer-motion';

const tabs = ['Student Outcomes', 'Professionalism & Engagement', 'Feedback & Evaluations'];
const classes = ['Physics 101', 'AP Physics', 'Physics 102', 'Adv. Mechanics'];
const scores = [78, 70, 92, 65];

const TeacherAnalytics = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [activeBar, setActiveBar] = useState(2);

    return (
        <div className="max-w-[1200px] mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Breadcrumb */}
            <p className="text-xs font-bold text-slate-400">Home / <span className="text-slate-500">All Teachers</span> / <span className="text-slate-900">Dr. Evelyn Reed</span></p>

            {/* Teacher Card */}
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex items-center gap-8">
                <img src="https://i.pravatar.cc/150?u=evelyn.reed" alt="Dr. Evelyn Reed" className="w-24 h-24 rounded-3xl object-cover flex-shrink-0" />
                <div className="flex-1 space-y-2">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dr. Evelyn Reed</h1>
                    <p className="text-slate-500 font-bold text-sm">Primary Subject: Physics&nbsp;&nbsp;|&nbsp;&nbsp;Years of Experience: 12</p>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-600">Overall Performance:</span>
                        <span className="px-4 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl font-black text-xs">Excellent</span>
                    </div>
                </div>
                <div className="flex gap-4 flex-shrink-0">
                    <button className="px-7 py-4 bg-white border border-slate-200 rounded-2xl font-black text-sm text-slate-700 hover:bg-slate-50 shadow-sm transition-all">Download Full Report</button>
                    <button className="px-7 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">Schedule Evaluation</button>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-3 gap-6">
                {[
                    { label: 'Avg. Student Pass Rate', val: '92%', delta: '↗+2.5% vs. last term', deltaColor: 'text-emerald-600' },
                    { label: 'Personal Attendance', val: '98%', delta: '↘-0.5% vs. last term', deltaColor: 'text-rose-500' },
                    { label: 'Student Feedback Score', val: '4.3 / 5', delta: '↗+0.2 vs. last term', deltaColor: 'text-emerald-600' },
                ].map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-3">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                        <p className="text-4xl font-black text-slate-900 tracking-tight">{s.val}</p>
                        <p className={`text-xs font-black ${s.deltaColor}`}>{s.delta}</p>
                    </motion.div>
                ))}
            </div>

            {/* Tabs + Content */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                {/* Tab Bar */}
                <div className="flex border-b border-slate-50 px-8">
                    {tabs.map((t, i) => (
                        <button key={i} onClick={() => setActiveTab(i)}
                            className={`px-8 py-5 font-black text-sm border-b-2 transition-all ${activeTab === i ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>
                            {t}
                        </button>
                    ))}
                </div>

                <div className="p-10 grid grid-cols-2 gap-10">
                    {/* Bar Chart */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">Class Performance</h3>
                            <p className="text-slate-400 font-medium text-sm mt-1">Average student scores for each class.</p>
                        </div>
                        <div className="flex items-end gap-4 h-48">
                            {classes.map((c, i) => (
                                <div key={c} className="flex-1 flex flex-col items-center gap-3 cursor-pointer" onClick={() => setActiveBar(i)}>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(scores[i] / 100) * 160}px` }}
                                        transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
                                        className={`w-full rounded-t-2xl transition-colors ${activeBar === i ? 'bg-blue-600' : 'bg-blue-100 hover:bg-blue-200'}`}
                                    />
                                    <p className={`text-[10px] font-black text-center ${activeBar === i ? 'text-blue-600' : 'text-slate-400'}`}>{c}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Performance Trend */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">Performance Trend</h3>
                            <p className="text-slate-400 font-medium text-sm mt-1">Average student pass rate over the last 4 years.</p>
                        </div>
                        <div className="w-full h-48 bg-gradient-to-br from-teal-500 to-blue-600 rounded-3xl flex items-end justify-center gap-3 p-6 overflow-hidden relative">
                            {/* Decorative bars + line */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120" preserveAspectRatio="none">
                                <polyline points="20,90 60,70 100,50 140,30 180,15" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                                <polygon points="20,90 60,70 100,50 140,30 180,15 180,110 20,110" fill="rgba(255,255,255,0.08)" />
                            </svg>
                            {[40, 55, 70, 85, 95].map((h, i) => (
                                <motion.div key={i}
                                    initial={{ height: 0 }} animate={{ height: `${h}%` }}
                                    transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
                                    className="flex-1 bg-white/20 rounded-t-xl backdrop-blur-sm" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherAnalytics;
