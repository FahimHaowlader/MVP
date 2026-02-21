import React, { useState } from 'react';
import { motion } from 'framer-motion';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const dayDates = [21, 22, 23, 24, 25];
const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM'];

const classes = [
    { day: 0, time: 0, subject: 'Biology', teacher: 'Mr. Darwin', room: 'Room 301', color: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
    { day: 2, time: 0, subject: 'Biology', teacher: 'Mr. Darwin', room: 'Room 301', color: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
    { day: 1, time: 1, subject: 'History', teacher: 'Ms. Curie', room: 'Room 102', color: 'bg-blue-50 border-blue-200 text-blue-800' },
    { day: 3, time: 1, subject: 'History', teacher: 'Ms. Curie', room: 'Room 102', color: 'bg-blue-50 border-blue-200 text-blue-800' },
    { day: 0, time: 2, subject: 'Mathematics', teacher: 'Mr. Newton', room: 'Room 205', color: 'bg-purple-50 border-purple-200 text-purple-800' },
    { day: 2, time: 2, subject: 'Mathematics', teacher: 'Mr. Newton', room: 'Room 205', color: 'bg-purple-50 border-purple-200 text-purple-800' },
    { day: 4, time: 2, subject: 'Mathematics', teacher: 'Mr. Newton', room: 'Room 205', color: 'bg-purple-50 border-purple-200 text-purple-800' },
    { day: 1, time: 3, subject: 'Literature', teacher: 'Ms. Austen', room: 'Room 101', color: 'bg-orange-50 border-orange-200 text-orange-800' },
    { day: 3, time: 3, subject: 'Literature', teacher: 'Ms. Austen', room: 'Room 101', color: 'bg-orange-50 border-orange-200 text-orange-800' },
];

const getClass = (dayIdx, timeIdx) =>
    classes.find(c => c.day === dayIdx && c.time === timeIdx);

const RoutineOverview = () => {
    const [weekLabel] = useState('October 21 – 25, 2024');

    return (
        <div className="max-w-[1400px] mx-auto space-y-10 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Academic Calendar</p>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Routine Overview</h1>
                    <p className="text-lg font-medium text-slate-400 mt-2">View and preview weekly school schedules for classes, teachers, and rooms.</p>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                    <button className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 font-black hover:bg-slate-100 transition-all">‹</button>
                    <button className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 font-black hover:bg-slate-100 transition-all">›</button>
                    <button className="px-6 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-600 flex items-center gap-2 hover:bg-slate-100 transition-all">
                        📅 Today
                    </button>
                </div>
                <span className="text-xl font-black text-slate-900 tracking-tight">{weekLabel}</span>
                <div className="ml-auto flex gap-4">
                    {['Filter by Class ▾', 'Filter by Teacher ▾', 'Filter by Room ▾'].map(label => (
                        <select key={label} className="px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-600 outline-none text-sm">
                            <option>{label}</option>
                        </select>
                    ))}
                    <button className="text-blue-600 font-black text-[11px] uppercase tracking-widest hover:underline">Clear Filters</button>
                </div>
            </div>

            {/* Weekly Grid */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                {/* Day Headers */}
                <div className="grid grid-cols-6 border-b border-slate-100">
                    <div className="p-6 border-r border-slate-50" />
                    {days.map((day, i) => (
                        <div key={i} className={`p-6 text-center border-r border-slate-50 last:border-0 ${i === 1 ? 'bg-blue-50/30' : ''}`}>
                            <p className={`text-[11px] font-black uppercase tracking-widest ${i === 1 ? 'text-blue-600' : 'text-slate-400'}`}>{day}</p>
                            <p className={`text-3xl font-black tracking-tighter mt-1 ${i === 1 ? 'text-blue-600' : 'text-slate-800'}`}>{dayDates[i]}</p>
                        </div>
                    ))}
                </div>

                {/* Time rows */}
                {timeSlots.map((time, tIdx) => (
                    <div key={tIdx} className="grid grid-cols-6 border-b border-slate-50 last:border-0">
                        <div className="p-6 border-r border-slate-50 flex items-start pt-6">
                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{time}</span>
                        </div>
                        {days.map((_, dIdx) => {
                            const cls = getClass(dIdx, tIdx);
                            return (
                                <div key={dIdx} className={`p-3 border-r border-slate-50 last:border-0 min-h-[96px] ${dIdx === 1 ? 'bg-blue-50/10' : ''}`}>
                                    {cls && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className={`h-full p-4 rounded-2xl border ${cls.color} cursor-pointer hover:shadow-md transition-all`}
                                        >
                                            <p className="font-black text-sm tracking-tight">{cls.subject}</p>
                                            <p className="text-[10px] font-bold mt-1">{cls.teacher}</p>
                                            <p className="text-[10px] font-bold">{cls.room}</p>
                                            <p className="text-[9px] font-black uppercase tracking-widest mt-2 opacity-70">{time} – {timeSlots[tIdx + 1] || '8:50 AM'}</p>
                                        </motion.div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoutineOverview;
