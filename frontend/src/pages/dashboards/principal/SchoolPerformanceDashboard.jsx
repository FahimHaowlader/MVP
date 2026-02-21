import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const grades = ['G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12'];
const gradeScores = [72, 68, 75, 80, 83, 92, 78];
const subjects = ['Math', 'Physics', 'English', 'History', 'Biology', 'Chemistry'];
const subjectScores = [85, 78, 91, 70, 83, 77];
const gradeSubjectScores = {
    G10: [88, 82, 90, 74, 85, 80],
    G11: [92, 88, 94, 80, 90, 87],
};
const gradeClassData = {
    G10: ['10-A', '10-B', '10-C', '10-D', '10-E'],
    G11: ['11-A', '11-B', '11-C', '11-D'],
};
const gradeClassScores = {
    G10: [88, 82, 91, 78, 85],
    G11: [94, 89, 92, 87],
};

const SchoolPerformanceDashboard = () => {
    const [academicYear, setAcademicYear] = useState('2023-2024');
    const [examType, setExamType] = useState('All');
    const [drillGrade, setDrillGrade] = useState(null);
    const maxGrade = Math.max(...gradeScores);

    return (
        <div className="max-w-[1300px] mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex justify-between items-start">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">School-Wide Performance Dashboard</h1>
                <div className="flex gap-4">
                    <select value={academicYear} onChange={e => setAcademicYear(e.target.value)} className="px-6 py-3.5 bg-white border border-slate-100 rounded-2xl shadow-sm outline-none font-bold text-slate-700 appearance-none">
                        {['2023-2024', '2022-2023', '2021-2022'].map(y => <option key={y}>Academic Year: {y}</option>)}
                    </select>
                    <select value={examType} onChange={e => setExamType(e.target.value)} className="px-6 py-3.5 bg-white border border-slate-100 rounded-2xl shadow-sm outline-none font-bold text-slate-700 appearance-none">
                        {['All', 'Mid-Term', 'Final', 'Unit Tests'].map(t => <option key={t}>Exam Type: {t}</option>)}
                    </select>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
                <button className="flex items-center gap-2 px-7 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm font-black text-[11px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
                    🖨 Print Dashboard
                </button>
                <button className="flex items-center gap-2 px-7 py-4 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-100 font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 active:scale-95 transition-all">
                    ⬇ Download Full Report
                </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-4 gap-6">
                {[
                    { label: 'Overall School Average', val: '82.5%', color: 'text-slate-900', border: '' },
                    { label: 'Overall Pass Percentage', val: '91%', color: 'text-slate-900', border: '' },
                    { label: 'Top Performing Grade', val: 'Grade 11', color: 'text-emerald-600', border: 'border-emerald-100' },
                    { label: 'Grade Needing Attention', val: 'Grade 7', color: 'text-amber-500', border: 'border-amber-100' },
                ].map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                        className={`bg-white p-8 rounded-[2.5rem] border shadow-sm space-y-3 ${s.border || 'border-slate-100'}`}>
                        <p className={`text-[10px] font-black uppercase tracking-widest ${s.color !== 'text-slate-900' ? s.color : 'text-slate-500'}`}>{s.label}</p>
                        <p className={`text-3xl font-black tracking-tight ${s.color}`}>{s.val}</p>
                    </motion.div>
                ))}
            </div>

            {/* Performance Trend SVG line chart */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                <h3 className="text-lg font-black text-slate-800 tracking-tight">Performance Trends Over Time</h3>
                <div className="w-full overflow-hidden rounded-2xl">
                    <svg viewBox="0 0 900 220" className="w-full" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <polygon points="0,180 80,140 160,100 240,160 320,130 400,180 480,60 560,100 640,50 720,150 800,120 900,80 900,220 0,220" fill="url(#areaGrad)" />
                        <polyline points="0,180 80,140 160,100 240,160 320,130 400,180 480,60 560,100 640,50 720,150 800,120 900,80" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        {['2019', '2020', '2021', '2022', '2023'].map((yr, i) => (
                            <text key={yr} x={180 * i + 10} y="215" fontSize="12" fill="#94a3b8" fontWeight="bold">{yr}</text>
                        ))}
                    </svg>
                </div>
            </div>

            {/* Breadcrumb for drill-down */}
            <AnimatePresence>
                {drillGrade && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-sm font-bold">
                        <button onClick={() => setDrillGrade(null)} className="text-slate-500 hover:text-blue-600 transition-all">School-Wide</button>
                        <span className="text-slate-300">›</span>
                        <span className="text-blue-600 font-black">Grade {drillGrade.replace('G', '')}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom Charts */}
            <div className="grid grid-cols-2 gap-8">
                {/* Performance by Grade — clickable */}
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                    <h3 className="text-lg font-black text-slate-800 tracking-tight">
                        Performance by Grade {!drillGrade && <span className="text-[11px] font-bold text-slate-400">(Click a bar to drill down)</span>}
                    </h3>
                    <div className="flex items-end gap-3 h-44">
                        {grades.map((g, i) => {
                            const h = (gradeScores[i] / maxGrade) * 140;
                            const isSelected = drillGrade === g;
                            return (
                                <div key={g} className="flex-1 flex flex-col items-center gap-2 cursor-pointer" onClick={() => setDrillGrade(isSelected ? null : g)}>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}px` }}
                                        transition={{ delay: i * 0.07, duration: 0.5, ease: 'easeOut' }}
                                        className={`w-full rounded-t-2xl transition-all duration-200 ${isSelected ? 'bg-blue-600 ring-4 ring-blue-300' : 'bg-blue-100 hover:bg-blue-300'}`}
                                    />
                                    <p className={`text-[10px] font-black ${isSelected ? 'text-blue-600' : 'text-slate-400'}`}>{g}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right chart — changes based on drill-down */}
                <AnimatePresence mode="wait">
                    {!drillGrade ? (
                        <motion.div key="subject" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                            <h3 className="text-lg font-black text-slate-800 tracking-tight">Performance by Subject</h3>
                            <div className="flex items-end gap-3 h-44">
                                {subjects.map((s, i) => (
                                    <div key={s} className="flex-1 flex flex-col items-center gap-2">
                                        <motion.div initial={{ height: 0 }} animate={{ height: `${(subjectScores[i] / 100) * 140}px` }} transition={{ delay: i * 0.08, duration: 0.5 }}
                                            className="w-full rounded-t-2xl bg-blue-100 hover:bg-blue-300 transition-colors cursor-pointer" />
                                        <p className="text-[10px] font-black text-slate-400">{s}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="class" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                            <h3 className="text-lg font-black text-slate-800 tracking-tight">Class Performance (Grade {drillGrade.replace('G', '')})</h3>
                            <div className="flex items-end gap-3 h-44">
                                {(gradeClassData[drillGrade] || ['A', 'B', 'C']).map((cls, i) => (
                                    <div key={cls} className="flex-1 flex flex-col items-center gap-2">
                                        <motion.div initial={{ height: 0 }} animate={{ height: `${((gradeClassScores[drillGrade]?.[i] || 80) / 100) * 140}px` }} transition={{ delay: i * 0.08, duration: 0.5 }}
                                            className="w-full rounded-t-2xl bg-blue-100 hover:bg-blue-300 transition-colors cursor-pointer" />
                                        <p className="text-[10px] font-black text-slate-400">{cls}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Drill-down subject chart */}
            <AnimatePresence>
                {drillGrade && (
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                        <h3 className="text-lg font-black text-slate-800 tracking-tight">Performance by Subject (Grade {drillGrade.replace('G', '')})</h3>
                        <div className="flex items-end gap-5 h-40">
                            {subjects.map((s, i) => (
                                <div key={s} className="flex-1 flex flex-col items-center gap-2">
                                    <motion.div initial={{ height: 0 }} animate={{ height: `${((gradeSubjectScores[drillGrade]?.[i] || subjectScores[i]) / 100) * 130}px` }} transition={{ delay: i * 0.08, duration: 0.5 }}
                                        className="w-full rounded-t-2xl bg-blue-100 hover:bg-blue-300 transition-colors cursor-pointer" />
                                    <p className="text-[10px] font-black text-slate-400">{s}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SchoolPerformanceDashboard;
