import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../../../hooks/useAuth';

/* ── tiny sparkline ── */
const Sparkline = ({ data, color = '#3b82f6' }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const pts = data.map((v, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 40 - ((v - min) / (max - min + 1)) * 36;
        return `${x},${y}`;
    }).join(' ');
    return (
        <svg viewBox="0 0 100 42" className="w-24 h-10 flex-shrink-0" preserveAspectRatio="none">
            <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

const kpis = [
    { label: 'Total Students', val: '1,248', delta: '+24 this month', deltaUp: true, icon: '👨‍🎓', color: 'from-blue-500 to-blue-600', spark: [60, 75, 70, 88, 82, 95, 90, 105, 98, 112] },
    { label: 'Total Teachers', val: '87', delta: '+2 this term', deltaUp: true, icon: '👩‍🏫', color: 'from-violet-500 to-violet-600', spark: [70, 72, 71, 74, 73, 75, 78, 79, 82, 87] },
    { label: 'Avg. Pass Rate', val: '91.4%', delta: '+1.2% vs last term', deltaUp: true, icon: '📈', color: 'from-emerald-500 to-emerald-600', spark: [80, 83, 79, 85, 88, 84, 90, 89, 91, 93] },
    { label: 'Attendance Today', val: '94.7%', delta: '-0.3% yesterday', deltaUp: false, icon: '✅', color: 'from-amber-500 to-amber-600', spark: [92, 95, 91, 94, 96, 93, 95, 97, 94, 95] },
    { label: 'Pending Requests', val: '7', delta: '3 urgent', deltaUp: false, icon: '📋', color: 'from-rose-500 to-rose-600', spark: [3, 5, 4, 6, 8, 6, 9, 7, 8, 7] },
];

const pendingRequests = [
    { name: 'Ms. Eleanor Vance', type: 'Leave Request', time: '2h ago', urgency: 'high', avatar: 'eleanor.vance' },
    { name: 'Mr. David Chen', type: 'Resource Request', time: '4h ago', urgency: 'medium', avatar: 'david.chen' },
    { name: 'Ms. Priya Singh', type: 'Schedule Change', time: '6h ago', urgency: 'low', avatar: 'priya.singh' },
];

const upcomingEvents = [
    { title: 'Annual Science Fair', date: 'Feb 25', time: '9:00 AM', type: 'Academic', color: 'bg-blue-100 text-blue-700' },
    { title: 'Parent-Teacher Meeting', date: 'Feb 28', time: '2:00 PM', type: 'Meeting', color: 'bg-violet-100 text-violet-700' },
    { title: 'Inter-School Sports', date: 'Mar 3', time: '8:00 AM', type: 'Sports', color: 'bg-emerald-100 text-emerald-700' },
];

const quickActions = [
    { label: 'Post Announcement', icon: '📢', to: '/principal/announcements/create', color: 'from-blue-500 to-blue-600' },
    { label: 'Create Event', icon: '📅', to: '/principal/events/new', color: 'from-violet-500 to-violet-600' },
    { label: 'Staff Attendance', icon: '✅', to: '/principal/staff-attendance', color: 'from-emerald-500 to-emerald-600' },
    { label: 'Add Staff Member', icon: '👤', to: '/principal/staff/add', color: 'from-amber-500 to-amber-600' },
    { label: 'Exam Routine', icon: '📝', to: '/principal/exam-routine', color: 'from-rose-500 to-rose-600' },
    { label: 'School Performance', icon: '📊', to: '/principal/school-performance', color: 'from-cyan-500 to-cyan-600' },
];

const recentActivity = [
    { icon: '✅', text: 'Science Fair approved by Admin', time: '10 min ago', color: 'text-emerald-600 bg-emerald-50' },
    { icon: '📋', text: 'Leave request submitted by Ms. Vance', time: '2 hr ago', color: 'text-blue-600 bg-blue-50' },
    { icon: '📢', text: 'New announcement published', time: '4 hr ago', color: 'text-violet-600 bg-violet-50' },
    { icon: '👤', text: 'New staff member added: Mr. James Lee', time: 'Yesterday', color: 'text-amber-600 bg-amber-50' },
    { icon: '📊', text: 'Mid-term results uploaded', time: 'Yesterday', color: 'text-cyan-600 bg-cyan-50' },
];

/* small SVG bar chart widget */
const MiniBar = ({ data, color = '#3b82f6' }) => {
    const max = Math.max(...data);
    return (
        <div className="flex items-end gap-1.5 h-16">
            {data.map((v, i) => (
                <motion.div key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${(v / max) * 64}px` }}
                    transition={{ delay: i * 0.06, duration: 0.5, ease: 'easeOut' }}
                    className="flex-1 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                    style={{ background: color }} />
            ))}
        </div>
    );
};

const urgencyColor = { high: 'bg-rose-100 text-rose-600 border-rose-200', medium: 'bg-amber-100 text-amber-600 border-amber-200', low: 'bg-slate-100 text-slate-500 border-slate-200' };

const PrincipalHome = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
    const firstName = (user?.name || 'Principal').split(' ')[0];

    return (
        <div className="space-y-10 max-w-[1500px] mx-auto animate-in fade-in duration-700">

            {/* ── Hero Banner ── */}
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 rounded-[3rem] p-12 text-white shadow-2xl shadow-slate-200">
                {/* decorative circles */}
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl" />
                <div className="absolute top-8 right-40 w-3 h-3 bg-white/30 rounded-full" />
                <div className="absolute top-16 right-60 w-2 h-2 bg-blue-400/50 rounded-full" />

                <div className="relative flex justify-between items-center">
                    <div className="space-y-3">
                        <p className="text-blue-300 font-black text-sm uppercase tracking-[0.3em]">{greeting}, {firstName} 👋</p>
                        <h1 className="text-5xl font-black tracking-tight leading-tight">
                            Welcome back to<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-violet-300">SchoolSys Principal</span>
                        </h1>
                        <p className="text-slate-400 font-medium max-w-lg leading-relaxed">
                            Everything is running smoothly. You have <strong className="text-white">7 pending requests</strong> and <strong className="text-white">3 upcoming events</strong> this week.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <button onClick={() => navigate('/principal/requests')}
                                className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-sm hover:bg-blue-50 active:scale-95 transition-all shadow-lg">
                                View Requests →
                            </button>
                            <button onClick={() => navigate('/principal/school-performance')}
                                className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-sm hover:bg-white/20 active:scale-95 transition-all backdrop-blur-sm">
                                📊 School Analytics
                            </button>
                        </div>
                    </div>
                    <div className="hidden xl:flex flex-col items-end gap-5">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl px-8 py-5 space-y-1">
                            <p className="text-[11px] font-black text-blue-300 uppercase tracking-widest">Today</p>
                            <p className="text-3xl font-black text-white">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</p>
                            <p className="text-xs font-bold text-slate-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric' })}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl px-8 py-5 space-y-1">
                            <p className="text-[11px] font-black text-violet-300 uppercase tracking-widest">Term</p>
                            <p className="text-xl font-black text-white">Spring 2024–25</p>
                            <p className="text-xs font-bold text-slate-400">Week 14 of 18</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ── KPI Cards ── */}
            <div className="grid grid-cols-5 gap-5">
                {kpis.map((k, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer space-y-4 group">
                        <div className="flex justify-between items-start">
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${k.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                {k.icon}
                            </div>
                            <Sparkline data={k.spark} color={k.deltaUp ? '#22c55e' : '#f59e0b'} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{k.label}</p>
                            <p className="text-3xl font-black text-slate-900 tracking-tight mt-1">{k.val}</p>
                        </div>
                        <p className={`text-[11px] font-black flex items-center gap-1 ${k.deltaUp ? 'text-emerald-600' : 'text-rose-500'}`}>
                            {k.deltaUp ? '↑' : '↓'} {k.delta}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* ── Quick Actions ── */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-1">Quick Actions</p>
                <div className="grid grid-cols-6 gap-4">
                    {quickActions.map((a, i) => (
                        <Link key={i} to={a.to}>
                            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                                className={`bg-gradient-to-br ${a.color} p-6 rounded-[2rem] shadow-lg flex flex-col items-center gap-3 text-center cursor-pointer`}>
                                <span className="text-3xl drop-shadow">{a.icon}</span>
                                <span className="text-[11px] font-black text-white uppercase tracking-wide leading-tight">{a.label}</span>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </motion.div>

            {/* ── Main Grid ── */}
            <div className="grid grid-cols-3 gap-8">

                {/* Pending Requests */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                    className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="flex justify-between items-center p-8 pb-4">
                        <h3 className="text-lg font-black text-slate-800 tracking-tight">Pending Requests</h3>
                        <Link to="/principal/requests" className="text-[11px] font-black text-blue-600 hover:underline">View all →</Link>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {pendingRequests.map((r, i) => (
                            <Link key={i} to="/principal/request-detail" className="flex items-center gap-4 px-8 py-5 hover:bg-slate-50/50 transition-all">
                                <img src={`https://i.pravatar.cc/150?u=${r.avatar}`} alt="" className="w-11 h-11 rounded-2xl object-cover flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-black text-slate-900 truncate text-sm">{r.name}</p>
                                    <p className="text-[11px] font-bold text-slate-400">{r.type} · {r.time}</p>
                                </div>
                                <span className={`flex-shrink-0 px-3 py-1 rounded-xl border text-[9px] font-black uppercase tracking-widest ${urgencyColor[r.urgency]}`}>{r.urgency}</span>
                            </Link>
                        ))}
                    </div>
                    <div className="p-6">
                        <Link to="/principal/requests" className="block w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[11px] font-black uppercase tracking-widest text-center rounded-2xl transition-all">
                            See All 7 Requests
                        </Link>
                    </div>
                </motion.div>

                {/* Upcoming Events */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="flex justify-between items-center p-8 pb-4">
                        <h3 className="text-lg font-black text-slate-800 tracking-tight">Upcoming Events</h3>
                        <Link to="/principal/events" className="text-[11px] font-black text-blue-600 hover:underline">View all →</Link>
                    </div>
                    <div className="px-8 space-y-4 pb-6">
                        {upcomingEvents.map((e, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + i * 0.06 }}
                                className="flex items-center gap-5 p-5 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer border border-slate-50 hover:border-slate-100">
                                <div className="w-14 h-14 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center flex-shrink-0">
                                    <p className="text-[10px] font-black text-slate-400 uppercase">{e.date.split(' ')[0]}</p>
                                    <p className="text-xl font-black text-slate-900 leading-none">{e.date.split(' ')[1]}</p>
                                </div>
                                <div className="flex-1">
                                    <p className="font-black text-slate-900 text-sm">{e.title}</p>
                                    <p className="text-[11px] font-bold text-slate-400 mt-0.5">🕐 {e.time}</p>
                                </div>
                                <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${e.color}`}>{e.type}</span>
                            </motion.div>
                        ))}
                        <Link to="/principal/events/new"
                            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-blue-300 hover:text-blue-500 font-black text-[11px] uppercase tracking-widest transition-all">
                            + Create New Event
                        </Link>
                    </div>
                </motion.div>

                {/* Performance Mini-Chart */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                    className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden space-y-6 p-8">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-black text-slate-800 tracking-tight">Grade Performance</h3>
                        <Link to="/principal/school-performance" className="text-[11px] font-black text-blue-600 hover:underline">Full Report →</Link>
                    </div>
                    <div className="space-y-5">
                        {[
                            { grade: 'Grade 11', score: 92, color: 'bg-blue-600' },
                            { grade: 'Grade 10', score: 86, color: 'bg-violet-500' },
                            { grade: 'Grade 9', score: 79, color: 'bg-amber-500' },
                            { grade: 'Grade 8', score: 74, color: 'bg-emerald-500' },
                        ].map((g, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] font-black text-slate-700">{g.grade}</span>
                                    <span className="text-[11px] font-black text-slate-500">{g.score}%</span>
                                </div>
                                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${g.score}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.7, ease: 'easeOut' }}
                                        className={`h-full ${g.color} rounded-full`} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="bg-emerald-50 rounded-2xl p-5 space-y-1">
                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Top Grade</p>
                            <p className="text-xl font-black text-emerald-700">Grade 11</p>
                        </div>
                        <div className="bg-amber-50 rounded-2xl p-5 space-y-1">
                            <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Needs Attn.</p>
                            <p className="text-xl font-black text-amber-700">Grade 7</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ── Bottom Row ── */}
            <div className="grid grid-cols-5 gap-8 pb-8">
                {/* Activity Feed */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="col-span-3 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="flex justify-between items-center p-8 pb-4">
                        <h3 className="text-lg font-black text-slate-800 tracking-tight">Recent Activity</h3>
                        <span className="text-[11px] font-black text-slate-400">Today</span>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {recentActivity.map((a, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 + i * 0.07 }}
                                className="flex items-center gap-5 px-8 py-5 hover:bg-slate-50/50 transition-all cursor-pointer">
                                <div className={`w-10 h-10 rounded-2xl ${a.color} flex items-center justify-center text-lg flex-shrink-0`}>{a.icon}</div>
                                <p className="flex-1 font-bold text-slate-700 text-sm leading-snug">{a.text}</p>
                                <span className="text-[10px] font-black text-slate-400 flex-shrink-0">{a.time}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Weekly Stats */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
                    className="col-span-2 bg-gradient-to-br from-slate-900 to-blue-900 rounded-[3rem] shadow-xl shadow-slate-200 overflow-hidden text-white p-8 space-y-6">
                    <h3 className="text-lg font-black tracking-tight">Weekly Attendance</h3>
                    <MiniBar data={[88, 92, 94, 91, 95, 90]} color="#60a5fa" />
                    <div className="flex justify-between text-[10px] font-bold text-blue-300">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <span key={d}>{d}</span>)}
                    </div>
                    <div className="space-y-4 pt-2 border-t border-white/10">
                        {[
                            { label: 'Present Today', val: '1,182', icon: '✅' },
                            { label: 'Absent Today', val: '66', icon: '❌' },
                            { label: 'On Leave', val: '12', icon: '🏖' },
                        ].map((s, i) => (
                            <div key={i} className="flex justify-between items-center">
                                <span className="text-sm font-bold text-blue-200 flex items-center gap-2">{s.icon} {s.label}</span>
                                <span className="font-black text-white">{s.val}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrincipalHome;
