import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';

const StudentAttendanceSection = () => {
    const { user } = useAuth();
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`https://mvp-gilt-iota.vercel.app/api/attendance/${user._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAttendanceData(res.data);
            } catch (err) {
                console.error("Error fetching attendance:", err);
            } finally {
                setLoading(false);
            }
        };
        if (user?._id) fetchAttendance();
    }, [user?._id]);

    const calculateStats = () => {
        const total = attendanceData.length;
        if (total === 0) return { overall: 0, total: 0, present: 0, absent: 0, tardy: 0 };
        const present = attendanceData.filter(a => a.status === 'Present').length;
        const absent = attendanceData.filter(a => a.status === 'Absent').length;
        const tardy = attendanceData.filter(a => a.status === 'Tardy').length;
        const overall = Math.round((present / total) * 100);
        return { overall, total, present, absent, tardy };
    };

    const stats = calculateStats();

    const legend = [
        { label: 'Present', color: 'bg-[#4ADE80]', dot: 'bg-[#4ADE80]' },
        { label: 'Absent', color: 'bg-[#F43F5E]', dot: 'bg-[#F43F5E]' },
        { label: 'Tardy', color: 'bg-[#FB923C]', dot: 'bg-[#FB923C]' },
        { label: 'No Class/Empty', color: 'bg-[#E2E8F0]', dot: 'bg-[#CBD5E1]' },
    ];

    // Simple calendar logic for current month
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push({ day: '', status: 'empty' });
    }
    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = new Date(year, month, d).toDateString();
        const record = attendanceData.find(a => new Date(a.date).toDateString() === dateStr);
        calendarDays.push({
            day: d,
            status: record ? record.status.toLowerCase() : 'no-class'
        });
    }

    const getStatusStyle = (status) => {
        switch (status) {
            case 'present': return 'border-emerald-400 bg-emerald-50/30 text-slate-800';
            case 'absent': return 'border-rose-400 bg-rose-50/50 text-rose-600';
            case 'tardy': return 'border-amber-400 bg-amber-50/30 text-amber-600';
            case 'no-class': return 'bg-slate-50 text-slate-300 border-transparent';
            case 'empty': return 'text-slate-200 border-transparent bg-transparent';
            default: return 'text-slate-800 border-slate-100';
        }
    };

    if (loading) return <div className="p-10 text-center font-black text-slate-400 tracking-widest uppercase animate-pulse">Loading Attendance...</div>;

    return (
        <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-none">My <span className="text-blue-600">Attendance.</span></h1>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Student ID</p>
                        <p className="text-sm font-black text-slate-800 tracking-tight">{user?._id?.slice(-8).toUpperCase()}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl shadow-inner uppercase font-black text-blue-600">{user?.name?.charAt(0)}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left: Summary Component */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-10 h-full">
                        <div className="space-y-6">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">Summary</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Attendance Rate</p>
                                    <p className="text-sm font-black text-blue-600">{stats.overall}%</p>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${stats.overall}%` }}
                                        transition={{ duration: 1, ease: 'easeOut' }}
                                        className="h-full bg-blue-600 rounded-full"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <StatBox label="Total" value={stats.total} />
                            <StatBox label="Present" value={stats.present} color="text-emerald-500" />
                            <StatBox label="Absent" value={stats.absent} color="text-rose-500" />
                            <StatBox label="Tardy" value={stats.tardy} color="text-amber-500" />
                        </div>

                        <div className="space-y-5 pt-6 border-t border-slate-50">
                            <h5 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em]">Legend</h5>
                            <div className="space-y-3">
                                {legend.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${item.dot}`} />
                                        <span className="text-xs font-bold text-slate-500">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Calendar Component */}
                <div className="lg:col-span-3">
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                        {/* Toolbar */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex gap-4">
                                <h2 className="text-xl font-black text-slate-800 tracking-tight leading-none uppercase">
                                    {today.toLocaleString('default', { month: 'long' })} {year}
                                </h2>
                            </div>
                            <button className="bg-slate-50 hover:bg-slate-100 px-6 py-2.5 rounded-xl text-xs font-black text-slate-800 border border-slate-100 transition-all flex items-center gap-2 uppercase tracking-widest">
                                📥 Download History
                            </button>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-4">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">{day}</div>
                            ))}
                            {calendarDays.map((date, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={date.status !== 'empty' && date.status !== 'no-class' ? { scale: 1.05, y: -2 } : {}}
                                    className={`relative aspect-square rounded-2xl border flex flex-col items-center justify-center transition-all ${getStatusStyle(date.status)}`}
                                >
                                    <span className="text-base font-black tracking-tight">{date.day}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatBox = ({ label, value, color = "text-slate-800" }) => (
    <div className={`p-6 rounded-3xl border border-slate-50 bg-slate-50/30 space-y-2 group hover:shadow-md transition-all`}>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        <p className={`text-3xl font-black ${color} tracking-tight`}>{value}</p>
    </div>
);

export default StudentAttendanceSection;
