import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const ParentAttendanceSection = () => {
    const { selectedChild } = useOutletContext();
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAttendance = async () => {
            if (!selectedChild) return;
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`https://mvp-gilt-iota.vercel.app/api/attendance/${selectedChild._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAttendanceData(res.data);
            } catch (err) {
                console.error("Error fetching attendance:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAttendance();
    }, [selectedChild]);

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

    if (!selectedChild) return <div className="p-10 text-center font-bold text-slate-400 uppercase tracking-widest">Please select a student first</div>;
    if (loading) return <div className="p-10 text-center font-black text-slate-400 tracking-widest uppercase animate-pulse">Fetching Attendance Records...</div>;

    return (
        <div className="max-w-[1200px] mx-auto space-y-12 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-4">
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none">
                        Student <span className="text-blue-600">Attendance.</span>
                    </h1>
                    <p className="text-lg font-medium text-slate-400">Monitoring attendance for <span className="text-slate-900 font-bold">{selectedChild.name}</span></p>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl">📅</div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Last Updated</p>
                        <p className="text-sm font-black text-slate-800 tracking-tight">Just Now</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight leading-none">Overall Rate</h3>
                    <div className="relative w-full aspect-square flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#F1F5F9" strokeWidth="8" />
                            <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#2563EB" strokeWidth="8" strokeDasharray={`${Math.PI * 90}`} strokeDashoffset={`${Math.PI * 90 * (1 - stats.overall / 100)}`} strokeLinecap="round" className="transition-all duration-1000" />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-4xl font-black text-slate-900 tracking-tighter">{stats.overall}%</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center px-2">
                        <div className="text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Present</p>
                            <p className="text-lg font-black text-emerald-500 tracking-tight">{stats.present}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Absent</p>
                            <p className="text-lg font-black text-rose-500 tracking-tight">{stats.absent}</p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                                <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {attendanceData.length > 0 ? attendanceData.map((record, i) => (
                                <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="px-10 py-6 font-black text-slate-700 tracking-tight">
                                        {new Date(record.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </td>
                                    <td className="px-10 py-6 text-center">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${record.status === 'Present' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                record.status === 'Absent' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                            }`}>
                                            {record.status}
                                        </span>
                                    </td>
                                    <td className="px-10 py-6 text-right text-xs font-bold text-slate-400 italic">
                                        Verified by School System
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="3" className="p-20 text-center font-bold text-slate-300 uppercase tracking-widest">No attendance records found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ParentAttendanceSection;
