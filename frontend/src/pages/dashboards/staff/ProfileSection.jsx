import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import useAuth from '../../../hooks/useAuth';

const StatCard = ({ label, value, icon, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className={`relative overflow-hidden bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group`}
    >
        <div className={`absolute -right-6 -top-6 w-24 h-24 bg-${color}-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
        <div className="flex justify-between items-start relative z-10">
            <div>
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</h4>
                <p className="text-3xl font-black text-slate-800 tracking-tighter">{value}</p>
            </div>
            <div className={`w-12 h-12 bg-${color}-50 text-${color}-600 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-${color}-500 group-hover:text-white transition-all shadow-sm`}>
                {icon}
            </div>
        </div>
    </motion.div>
);

const ProfileSection = () => {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');

                // Fetch Events
                const eventsRes = await axios.get('https://mvp-gilt-iota.vercel.app/api/events', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEvents(eventsRes.data);

                // Fetch Notices
                const noticesRes = await axios.get('https://mvp-gilt-iota.vercel.app/api/notices', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setNotices(noticesRes.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    const mockStats = [
        { label: "Attendance This Month", value: "98%", icon: "📅", color: "emerald" },
        { label: "Remaining Leaves", value: "12 Days", icon: "🌴", color: "blue" },
        { label: "Pending Tasks", value: "4", icon: "📋", color: "amber" },
        { label: "Next Payday", value: "28th", icon: "💰", color: "indigo" },
    ];

    return (
        <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Header / Profile Hero */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-gradient-to-r from-emerald-600 to-teal-800 rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-xl shadow-emerald-900/10"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="relative group cursor-pointer">
                        <div className="w-28 h-28 md:w-32 md:h-32 bg-white/20 p-1.5 rounded-full overflow-hidden backdrop-blur-sm border-2 border-white/30">
                            <img
                                src={`https://i.pravatar.cc/150?u=${user?.email || 'staff'}`}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-400 border-2 border-emerald-800 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-[10px]">✨</span>
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left text-white mt-2">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 mb-3"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="text-xs font-bold tracking-widest uppercase">Support Staff</span>
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">Welcome back, {user?.name || "Colleague"}!</h1>
                        <p className="text-emerald-100 font-medium text-lg max-w-2xl">
                            {user?.email} | ID: {user?._id?.slice(-6).toUpperCase() || "STF-9021"}
                        </p>
                    </div>

                    <div className="flex flex-row md:flex-col gap-3">
                        <button className="px-6 py-3 bg-white text-emerald-800 rounded-2xl font-black text-sm hover:bg-emerald-50 hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2">
                            <span>📝</span> Request Leave
                        </button>
                        <button className="px-6 py-3 bg-black/20 text-white rounded-2xl font-black text-sm hover:bg-black/30 backdrop-blur-md border border-white/10 hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2">
                            <span>⚙️</span> Edit Profile
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockStats.map((stat, idx) => (
                    <StatCard key={idx} {...stat} delay={0.1 * idx} />
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Active Notices & Internal Announcements */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-2 space-y-6"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                            <span>📢</span> Internal Noticeboard
                        </h2>
                        <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700">View All →</button>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-full -z-10"></div>

                        {loading ? (
                            <div className="animate-pulse space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-24 bg-slate-100 rounded-2xl"></div>
                                ))}
                            </div>
                        ) : notices.length === 0 ? (
                            <div className="text-center py-10">
                                <span className="text-5xl mb-4 block">📭</span>
                                <h3 className="text-lg font-black text-slate-700">All Caught Up!</h3>
                                <p className="text-slate-500 font-medium">No new internal announcements.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {notices.slice(0, 4).map((notice, idx) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * idx }}
                                        key={notice._id || idx}
                                        className="group relative p-6 bg-amber-50/50 hover:bg-amber-50 rounded-3xl border border-amber-100/50 transition-all cursor-pointer"
                                    >
                                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-400 rounded-l-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="flex justify-between items-start gap-4">
                                            <p className="text-slate-800 font-medium leading-relaxed">{notice.message}</p>
                                            <span className="text-[10px] font-black px-3 py-1 bg-amber-100 text-amber-700 rounded-xl whitespace-nowrap">
                                                {new Date(notice.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Upcoming Events / Schedule */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-6"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                            <span>📅</span> Upcoming Events
                        </h2>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                        {loading ? (
                            <div className="animate-pulse space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-16 bg-slate-100 rounded-2xl"></div>
                                ))}
                            </div>
                        ) : events.length === 0 ? (
                            <div className="text-center py-8">
                                <span className="text-4xl mb-3 block">🗓️</span>
                                <p className="text-slate-500 font-medium text-sm">No scheduled school events.</p>
                            </div>
                        ) : (
                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                                {events.slice(0, 5).map((event, idx) => (
                                    <div key={event._id || idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-100 group-hover:bg-emerald-500 group-hover:text-white transition-colors text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 text-xs font-black">
                                            {new Date(event.date).getDate()}
                                        </div>
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm group-hover:border-emerald-200 transition-colors">
                                            <div className="flex items-center justify-between space-x-2 mb-1">
                                                <div className="font-bold text-slate-800 text-sm line-clamp-1">{event.title}</div>
                                            </div>
                                            <div className="text-xs text-emerald-600 font-bold uppercase tracking-wider">{event.type}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <button className="w-full mt-6 py-3 bg-slate-50 text-slate-600 font-bold text-sm border border-slate-200 rounded-2xl hover:bg-slate-100 hover:text-slate-800 transition-all">
                            Open Full Calendar
                        </button>
                    </div>

                    {/* Quick Info Box */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-8 text-white relative overflow-hidden mt-6">
                        <div className="absolute -right-6 -top-6 text-6xl opacity-10">💬</div>
                        <h3 className="text-lg font-black tracking-tight mb-2">Need Help?</h3>
                        <p className="text-slate-300 text-sm font-medium mb-4 leading-relaxed">Contact HR or the IT department for any support requests.</p>
                        <button className="w-full py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl font-bold text-sm text-white backdrop-blur-sm border border-white/20">
                            Create Ticket
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProfileSection;
