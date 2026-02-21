import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentRoutineSection = () => {
    const [selectedDay, setSelectedDay] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long' }));

    const timetable = [
        {
            time: "09:00 - 10:30",
            days: {
                Monday: { subject: "History 101", room: "Room 303", color: "blue", teacher: "Prof. Robinson" },
                Tuesday: { subject: "Algebra II", room: "Room 305", color: "rose", teacher: "Dr. Ariscar" },
                Wednesday: { subject: "History 101", room: "Room 303", color: "blue", teacher: "Prof. Robinson" },
                Thursday: { subject: "Algebra II", room: "Room 305", color: "rose", teacher: "Dr. Ariscar" },
                Friday: { subject: "Biology", room: "Lab 4", color: "emerald", teacher: "Ms. Mendeleev" }
            }
        },
        {
            time: "10:30 - 12:00",
            days: {
                Monday: { subject: "English Lit", room: "Room 201", color: "amber", teacher: "Ms. Austen" },
                Wednesday: { subject: "English Lit", room: "Room 201", color: "amber", teacher: "Ms. Austen" }
            }
        },
        {
            time: "12:00 - 01:00",
            isBreak: true,
            label: "Lunch Break",
            icon: "🍱"
        },
        {
            time: "01:00 - 02:30",
            days: {
                Monday: { subject: "Biology", room: "Lab 4", color: "emerald", teacher: "Ms. Mendeleev" },
                Wednesday: { subject: "Art", room: "Art Room", color: "purple", teacher: "Mr. Picasso" },
                Friday: { subject: "Algebra II", room: "Room 305", color: "rose", teacher: "Dr. Ariscar" }
            }
        }
    ];

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const getColorClasses = (color) => {
        switch (color) {
            case 'blue': return 'bg-blue-50 text-blue-700 border-blue-100 group-hover:bg-blue-600 group-hover:text-white';
            case 'rose': return 'bg-rose-50 text-rose-700 border-rose-100 group-hover:bg-rose-600 group-hover:text-white';
            case 'emerald': return 'bg-emerald-50 text-emerald-700 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white';
            case 'amber': return 'bg-amber-50 text-amber-900 border-amber-100 group-hover:bg-amber-600 group-hover:text-white';
            case 'purple': return 'bg-purple-50 text-purple-700 border-purple-100 group-hover:bg-purple-600 group-hover:text-white';
            default: return 'bg-slate-50 text-slate-700 border-slate-100 group-hover:bg-blue-600 group-hover:text-white';
        }
    };

    return (
        <div className="max-w-[1440px] mx-auto space-y-12 animate-in fade-in duration-1000 p-4 lg:p-10">
            {/* Cinematic Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        Current Week • Sem 1
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none">
                        Class <span className="text-blue-600">Timeline.</span>
                    </h1>
                    <p className="text-lg font-medium text-slate-400 max-w-xl">
                        Your personalized academic roadmap. View, manage, and plan your daily learning sessions.
                    </p>
                </div>
                <div className="flex items-center gap-4 bg-white p-3 rounded-[2rem] border border-slate-100 shadow-sm">
                    {days.map(day => (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedDay === day ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-400 hover:bg-slate-50'}`}
                        >
                            {day.slice(0, 3)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Timetable Experience */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
                {/* Left Sidebar - Next Up */}
                <div className="space-y-8">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight px-2">Next Up</h3>
                    <div className="bg-slate-900 rounded-[3rem] p-10 space-y-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                        <div className="space-y-2 relative z-10">
                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Starting in 15m</p>
                            <h4 className="text-3xl font-black text-white tracking-tighter">Algebra II</h4>
                        </div>
                        <div className="space-y-4 relative z-10">
                            <div className="flex items-center gap-4 text-white/60">
                                <span className="text-xl">📍</span>
                                <p className="text-xs font-bold font-mono tracking-widest uppercase text-white/80">Room 305</p>
                            </div>
                            <div className="flex items-center gap-4 text-white/60">
                                <span className="text-xl">👤</span>
                                <p className="text-xs font-bold text-white/80">Dr. Ariscar</p>
                            </div>
                        </div>
                        <button className="w-full py-5 rounded-[1.5rem] bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-900/40 transition-all active:scale-95 relative z-10">
                            Pre-join Session
                        </button>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 space-y-6">
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-50 pb-4">Resources</h4>
                        <div className="space-y-4">
                            {['Reading Material', 'Digital Textbook', 'Reference Links'].map((item, i) => (
                                <button key={i} className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                                    <span className="text-xs font-bold text-slate-500 group-hover:text-blue-600 transition-colors">{item}</span>
                                    <span className="text-slate-300">➜</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Timetable Content */}
                <div className="xl:col-span-3 space-y-10">
                    <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-premium overflow-hidden">
                        <div className="overflow-x-auto no-scrollbar">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-10 py-8 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest w-40">Timeline</th>
                                        <th className="px-10 py-8 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Session Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {timetable.map((slot, idx) => (
                                        <tr key={idx} className="group border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-all">
                                            <td className="px-10 py-12 align-top">
                                                <div className="space-y-1">
                                                    <p className="text-xl font-black text-slate-900 tracking-tighter whitespace-nowrap">{slot.time.split(' - ')[0]}</p>
                                                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">End: {slot.time.split(' - ')[1]}</p>
                                                </div>
                                            </td>
                                            <td className="px-10 py-12">
                                                {slot.isBreak ? (
                                                    <div className="flex items-center gap-6 py-4">
                                                        <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-3xl">{slot.icon}</div>
                                                        <div className="space-y-1">
                                                            <p className="text-2xl font-black text-slate-800 tracking-tight">{slot.label}</p>
                                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Social & Recharge Time</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <AnimatePresence mode="wait">
                                                            {slot.days[selectedDay] ? (
                                                                <motion.div
                                                                    key={selectedDay}
                                                                    initial={{ opacity: 0, x: 20 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    exit={{ opacity: 0, x: -20 }}
                                                                    className={`p-10 rounded-[2.5rem] border group cursor-default transition-all duration-500 ${getColorClasses(slot.days[selectedDay].color)} shadow-sm hover:shadow-xl hover:-translate-y-2`}
                                                                >
                                                                    <div className="flex justify-between items-start mb-6">
                                                                        <div className="space-y-1">
                                                                            <h4 className="text-3xl font-black tracking-tighter group-hover:text-white transition-colors">{slot.days[selectedDay].subject}</h4>
                                                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 group-hover:text-white/80">{slot.days[selectedDay].teacher}</p>
                                                                        </div>
                                                                        <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-4 py-1.5 rounded-full group-hover:bg-white group-hover:text-blue-600 transition-all">
                                                                            {slot.days[selectedDay].room}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <div className="w-2 h-2 rounded-full bg-current opacity-20" />
                                                                        <div className="w-2 h-2 rounded-full bg-current opacity-20" />
                                                                        <div className="w-2 h-2 rounded-full bg-current opacity-20" />
                                                                    </div>
                                                                </motion.div>
                                                            ) : (
                                                                <div className="p-10 rounded-[2.5rem] border border-dashed border-slate-200 flex items-center justify-center">
                                                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">No Session Scheduled</p>
                                                                </div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Bottom Utility */}
                    <div className="flex justify-center">
                        <button className="px-10 py-5 rounded-2xl bg-white border border-slate-100 text-[11px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm active:scale-95">
                            📄 Sync to Device Calendar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentRoutineSection;

