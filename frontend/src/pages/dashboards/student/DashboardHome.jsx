import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';

const StudentDashboardHome = () => {
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [attendancePercent, setAttendancePercent] = useState(0);
    const [routine, setRoutine] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };

                const [dashRes, attRes, routineRes] = await Promise.all([
                    axios.get('https://mvp-gilt-iota.vercel.app/api/student/dashboard', config),
                    axios.get(`https://mvp-gilt-iota.vercel.app/api/attendance/${user._id}`, config),
                    axios.get('https://mvp-gilt-iota.vercel.app/api/routines', config)
                ]);

                setDashboardData(dashRes.data);

                // Calculate attendance %
                if (attRes.data.length > 0) {
                    const present = attRes.data.filter(a => a.status === 'Present').length;
                    setAttendancePercent(Math.round((present / attRes.data.length) * 100));
                }

                // Filter routine for today and My class
                const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const todayName = dayNames[new Date().getDay()];
                const myRoutine = routineRes.data.filter(r =>
                    r.className === user.className &&
                    r.section === user.section &&
                    r.day === todayName
                );
                setRoutine(myRoutine);

            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };
        if (user?._id) fetchDashboardData();
    }, [user]);

    const calculateGPA = () => {
        if (!dashboardData?.recentResults || dashboardData.recentResults.length === 0) return "0.0";
        const sum = dashboardData.recentResults.reduce((acc, curr) => acc + curr.average, 0);
        return (sum / dashboardData.recentResults.length / 25).toFixed(1); // Mock conversion to 4.0 scale
    };

    const gpa = calculateGPA();

    const stats = [
        { label: 'Academic GPA', value: gpa, icon: '📈', color: 'blue', trend: '+0.1' },
        { label: 'Attendance', value: `${attendancePercent}%`, icon: '📅', color: 'emerald', trend: attendancePercent > 90 ? 'Ideal' : 'Fair' },
        { label: 'Pending Fees', value: dashboardData?.pendingFees?.length || '0', icon: '💰', color: 'amber', trend: 'Invoices' },
        { label: 'Events', value: dashboardData?.upcomingEvents?.length || '0', icon: '🎁', color: 'indigo', trend: 'Upcoming' },
    ];

    if (loading) return <div className="p-10 text-center font-black text-slate-400 tracking-widest uppercase animate-pulse">Initializing Dashboard...</div>;

    return (
        <div className="max-w-[1400px] mx-auto space-y-12 animate-in fade-in duration-1000 p-4 lg:p-10">
            {/* Hero Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                        Student Portal • {new Date().getFullYear()} Session
                    </motion.div>
                    <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none">
                        Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{user?.name?.split(' ')[0] || "Student"}!</span> 👋
                    </h1>
                    <p className="text-lg font-medium text-slate-400 max-w-xl">
                        You have <span className="text-slate-900 font-bold">{routine.length} classes</span> scheduled for today.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-premium flex items-center gap-6">
                    <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-3xl">🌤️</div>
                    <div>
                        <p className="font-black text-slate-800 text-lg tracking-tight">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Campus • Live System</p>
                    </div>
                </div>
            </div>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group cursor-default"
                    >
                        <div className="flex justify-between items-start mb-10">
                            <div className={`w-16 h-16 rounded-[1.5rem] bg-blue-50 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                                {stat.icon}
                            </div>
                            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg uppercase tracking-widest">{stat.trend}</span>
                        </div>
                        <p className="text-5xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-3 opacity-70">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                {/* Today's Schedule */}
                <div className="xl:col-span-2 space-y-8">
                    <div className="flex justify-between items-center px-2">
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight">Today's Schedule</h3>
                        <button className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em] hover:opacity-70 transition-opacity underline decoration-2 underline-offset-8">Full Routine</button>
                    </div>

                    <div className="relative space-y-4">
                        {routine.length > 0 ? routine.map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ x: 10 }}
                                className={`bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-6 group transition-all`}
                            >
                                <div className="flex items-center gap-10">
                                    <div className="space-y-1 w-24">
                                        <p className="text-xl font-black text-slate-900 tracking-tight">{item.startTime}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.endTime}</p>
                                    </div>
                                    <div className="w-px h-12 bg-slate-100 hidden md:block" />
                                    <div className="space-y-1">
                                        <h4 className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">{item.subject}</h4>
                                        <div className="flex items-center gap-4">
                                            <p className="text-sm font-bold text-slate-400 capitalize">{item.teacherName || 'Faculty'}</p>
                                            <span className="w-1 h-1 rounded-full bg-slate-200" />
                                            <p className="text-sm font-black text-slate-500 uppercase tracking-widest text-[10px]">Room {item.roomNumber || 'TBA'}</p>
                                        </div>
                                    </div>
                                </div>
                                <button className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest bg-slate-50 text-slate-400 hover:bg-slate-100 transition-all`}>
                                    Details
                                </button>
                            </motion.div>
                        )) : (
                            <div className="bg-white p-20 rounded-[2.5rem] border border-slate-50 text-center">
                                <p className="font-black text-slate-300 uppercase tracking-widest">No classes scheduled for today.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className="space-y-8">
                    <div className="flex justify-between items-center px-2">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Notices & Events</h3>
                    </div>
                    <div className="space-y-4">
                        {dashboardData?.upcomingEvents?.length > 0 ? dashboardData.upcomingEvents.map((event, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-50 shadow-sm group hover:bg-slate-900 transition-all duration-500">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 group-hover:bg-blue-900`}>
                                            Upcoming
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            {new Date(event.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-black text-slate-800 tracking-tight group-hover:text-white transition-colors">{event.title}</h4>
                                    <p className="text-xs text-slate-400 group-hover:text-slate-500 line-clamp-2">{event.description}</p>
                                </div>
                            </div>
                        )) : (
                            <p className="text-center font-bold text-slate-300 uppercase tracking-widest py-10">No upcoming events</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboardHome;

