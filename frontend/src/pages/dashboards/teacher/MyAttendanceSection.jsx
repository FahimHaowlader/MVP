import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MyAttendanceSection = () => {
    const stats = [
        { label: 'Total Working Days', value: '185', color: 'text-slate-800' },
        { label: 'Days Present', value: '174', color: 'text-emerald-600' },
        { label: 'Days Absent', value: '11', color: 'text-rose-600' },
        { label: 'Attendance', value: '94.1%', color: 'text-blue-600' },
    ];

    const recentAttendance = [
        { date: 'Oct 27, 2023', status: 'Absent', time: '-', statusColor: 'bg-rose-50 text-rose-600 border-rose-100' },
        { date: 'Oct 26, 2023', status: 'Present', time: '08:55 - 17:03', statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
        { date: 'Oct 25, 2023', status: 'Present', time: '09:01 - 17:00', statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
        { date: 'Oct 24, 2023', status: 'Leave', time: '-', statusColor: 'bg-amber-50 text-amber-600 border-amber-100' },
        { date: 'Oct 23, 2023', status: 'Present', time: '08:58 - 17:05', statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
        { date: 'Oct 20, 2023', status: 'Present', time: '09:02 - 16:55', statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
        { date: 'Oct 19, 2023', status: 'Present', time: '08:59 - 17:01', statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    ];

    const calendarDays = [
        { day: 24, type: 'prev' }, { day: 25, type: 'prev' }, { day: 26, type: 'prev' }, { day: 27, type: 'prev' }, { day: 28, type: 'prev' }, { day: 29, type: 'prev' }, { day: 30, type: 'prev' },
        { day: 1, type: 'current' }, { day: 2, type: 'present' }, { day: 3, type: 'present' }, { day: 4, type: 'present' }, { day: 5, type: 'selected' }, { day: 6, type: 'present' }, { day: 7, type: 'current' },
        { day: 8, type: 'current' }, { day: 9, type: 'present' }, { day: 10, type: 'absent' }, { day: 11, type: 'present' }, { day: 12, type: 'present' }, { day: 13, type: 'present' }, { day: 14, type: 'current' },
        { day: 15, type: 'current' }, { day: 16, type: 'present' }, { day: 17, type: 'present' }, { day: 18, type: 'present' }, { day: 19, type: 'present' }, { day: 20, type: 'present' }, { day: 21, type: 'current' },
        { day: 22, type: 'current' }, { day: 23, type: 'present' }, { day: 24, type: 'leave' }, { day: 25, type: 'present' }, { day: 26, type: 'present' }, { day: 27, type: 'absent' }, { day: 28, type: 'current' },
        { day: 29, type: 'current' }, { day: 30, type: 'present' }, { day: 31, type: 'present' },
    ];

    return (
        <div className="max-w-[1400px] mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <h1 className="text-5xl font-extrabold text-slate-800 tracking-tight">My Attendance</h1>
                    <p className="text-slate-500 font-medium tracking-wide">
                        Currently viewing: <span className="text-blue-600 font-bold">Overall This Year</span>
                    </p>
                </div>
                <button className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-blue-100 transition-all active:scale-95">
                    <span className="text-xl">📅</span>
                    <span>Overall This Year</span>
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col gap-2 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                    >
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">{stat.label}</p>
                        <p className={`text-5xl font-black ${stat.color} tracking-tighter`}>{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Monthly Overview - Calendar */}
                <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-10 px-4">
                        <h3 className="text-3xl font-black text-slate-800 tracking-tight">Monthly Overview</h3>
                        <div className="flex items-center gap-8">
                            <button className="text-2xl text-slate-400 hover:text-slate-600 transition-colors">‹</button>
                            <h4 className="text-xl font-black text-slate-800 tracking-tight min-w-[160px] text-center">October 2023</h4>
                            <button className="text-2xl text-slate-400 hover:text-slate-600 transition-colors">›</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-4 text-center">
                        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                            <div key={day} className="text-[11px] font-black text-slate-400 tracking-widest pb-6">{day}</div>
                        ))}
                        {calendarDays.map((d, i) => (
                            <div
                                key={i}
                                className={`h-16 flex items-center justify-center rounded-2xl font-black text-lg transition-all
                                    ${d.type === 'prev' ? 'text-slate-200' : ''}
                                    ${d.type === 'current' ? 'text-slate-400' : ''}
                                    ${d.type === 'present' ? 'bg-emerald-50 text-emerald-600' : ''}
                                    ${d.type === 'absent' ? 'bg-rose-50 text-rose-600' : ''}
                                    ${d.type === 'leave' ? 'bg-amber-50 text-amber-600' : ''}
                                    ${d.type === 'selected' ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 scale-110' : ''}
                                `}
                            >
                                {d.day}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Attendance */}
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-8">Recent Attendance</h3>
                    <div className="space-y-6">
                        <div className="grid grid-cols-3 text-[10px] font-black text-slate-300 uppercase tracking-widest px-2">
                            <span>Date</span>
                            <span className="text-center">Status</span>
                            <span className="text-right">Time</span>
                        </div>
                        {recentAttendance.map((row, i) => (
                            <div key={i} className="grid grid-cols-3 items-center py-4 border-b border-slate-50 last:border-none group">
                                <span className="text-sm font-black text-slate-800 group-hover:text-blue-600 transition-colors">{row.date}</span>
                                <div className="flex justify-center">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border ${row.statusColor}`}>
                                        {row.status}
                                    </span>
                                </div>
                                <span className="text-xs font-bold text-slate-400 text-right">{row.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAttendanceSection;
