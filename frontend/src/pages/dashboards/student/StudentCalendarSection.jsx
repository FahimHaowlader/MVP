import React, { useState } from 'react';
import { motion } from 'framer-motion';

const StudentCalendarSection = () => {
    const [view, setView] = useState('Month');

    const calendarGrid = Array.from({ length: 35 }, (_, i) => i - 1).map(day => {
        if (day < 1) return { day: 31 + day, isCurrentMonth: false };
        if (day > 31) return { day: day - 31, isCurrentMonth: false };
        return { day, isCurrentMonth: true };
    });

    const events = [
        { day: 13, title: 'Parent-Teacher Meeting', color: 'bg-blue-600', textColor: 'text-white' },
        { day: 15, title: 'Physics Project Due', color: 'bg-amber-400', textColor: 'text-white' },
        { day: 25, title: 'Mid-term Exams', color: 'bg-rose-500', textColor: 'text-white' },
        { day: 30, title: 'Fall Break', color: 'bg-emerald-500', textColor: 'text-white' },
    ];

    return (
        <div className="max-w-[1400px] mx-auto space-y-10 animate-in fade-in duration-700">
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">Academic Calendar</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Calendar Area */}
                <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-100 shadow-premium overflow-hidden flex flex-col">
                    {/* Calendar Header */}
                    <div className="p-10 border-b border-slate-50 flex flex-wrap justify-between items-center gap-6">
                        <div className="flex items-center gap-6">
                            <button className="text-slate-400 hover:text-slate-800 font-bold transition-colors">❮</button>
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-none uppercase">October 2024</h2>
                            <button className="text-slate-400 hover:text-slate-800 font-bold transition-colors">❯</button>
                            <button className="bg-slate-50 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-all border border-slate-100 ml-4">Today</button>
                        </div>

                        <div className="bg-slate-50 p-1 rounded-2xl border border-slate-100 flex shadow-inner">
                            {['Month', 'Week', 'List'].map(v => (
                                <button
                                    key={v}
                                    onClick={() => setView(v)}
                                    className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === v ? 'bg-white text-slate-800 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                >
                                    {v}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="flex-1 grid grid-cols-7 border-collapse">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="py-6 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                                {day}
                            </div>
                        ))}
                        {calendarGrid.map((date, i) => {
                            const dayEvents = events.filter(e => e.day === date.day && date.isCurrentMonth);
                            return (
                                <div key={i} className={`min-h-[160px] p-4 border-b border-r border-slate-50 hover:bg-slate-50/30 transition-colors last:border-r-0 ${!date.isCurrentMonth ? 'bg-slate-50/20' : ''}`}>
                                    <p className={`text-sm font-black ${date.isCurrentMonth ? 'text-slate-800' : 'text-slate-200'}`}>{date.day}</p>
                                    <div className="mt-4 space-y-2">
                                        {dayEvents.map((e, idx) => (
                                            <div key={idx} className={`${e.color} ${e.textColor} text-[10px] font-black px-3 py-1.5 rounded-lg truncate shadow-sm uppercase tracking-tighter`}>
                                                {e.title}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Sidebar (Mini Calendar & Filters) */}
                <div className="w-full lg:w-[400px] space-y-8">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 px-8 rounded-2xl shadow-xl shadow-blue-100 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                        <span className="text-xl">+</span> Add Event
                    </button>

                    <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm space-y-8">
                        {/* Mini Calendar Header */}
                        <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest tracking-tighter">
                            <button className="text-slate-300">❮</button>
                            <span className="text-slate-800 font-black">October 2024</span>
                            <button className="text-slate-300">❯</button>
                        </div>

                        {/* Mini Grid */}
                        <div className="grid grid-cols-7 gap-x-2 gap-y-4 text-center">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                                <span key={d} className="text-[10px] font-black text-slate-400 tracking-tighter">{d}</span>
                            ))}
                            {calendarGrid.map((d, i) => (
                                <div key={i} className={`text-[11px] font-black py-2 rounded-full cursor-pointer transition-all ${d.day === 13 && d.isCurrentMonth ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 scale-110' :
                                        d.isCurrentMonth ? 'text-slate-700 hover:bg-slate-50' : 'text-slate-200'
                                    }`}>
                                    {d.day}
                                </div>
                            ))}
                        </div>

                        {/* Search events */}
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">🔍</span>
                            <input
                                type="text"
                                placeholder="Search for events..."
                                className="w-full bg-slate-50/50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 text-xs font-bold focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                            />
                        </div>

                        {/* Filters */}
                        <div className="space-y-6 pt-6 border-t border-slate-50">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Event Filters</h5>
                            <div className="space-y-4">
                                <Checkbox label="Exams & Assessments" color="bg-rose-500" checked />
                                <Checkbox label="Assignment Deadlines" color="bg-amber-400" checked />
                                <Checkbox label="School Holidays" color="bg-emerald-500" checked />
                                <Checkbox label="Campus Events" color="bg-purple-600" checked />
                                <Checkbox label="Personal" color="bg-slate-200" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Checkbox = ({ label, color, checked = false }) => (
    <label className="flex items-center justify-between cursor-pointer group">
        <span className="text-xs font-black text-slate-700 tracking-tight">{label}</span>
        <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${checked ? color : 'border-2 border-slate-100 bg-white'
            }`}>
            {checked && <span className="text-white text-[10px]">✓</span>}
        </div>
    </label>
);

export default StudentCalendarSection;
