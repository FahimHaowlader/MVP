import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const RoutineSection = () => {
    const { user } = useAuth();
    const [routines, setRoutines] = useState([]);
    const [viewMode, setViewMode] = useState("daily"); // "daily" or "weekly"
    const [selectedDay, setSelectedDay] = useState("Monday");
    const [loading, setLoading] = useState(true);

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const timeSlots = [
        "09:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM",
        "11:00 AM - 12:00 PM",
        "12:00 PM - 01:00 PM",
        "01:00 PM - 02:00 PM",
        "02:00 PM - 03:00 PM",
        "03:00 PM - 04:00 PM"
    ];

    useEffect(() => {
        const fetchRoutine = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`https://mvp-gilt-iota.vercel.app/api/routines/teacher/${user._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRoutines(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching routine:", error);
                setLoading(false);
            }
        };

        if (user?._id) {
            fetchRoutine();
        }
    }, [user?._id]);

    const filteredRoutines = routines.filter(r => r.day === selectedDay);

    const getTimeStatus = (timeSlot) => {
        const now = new Date();
        const hour = now.getHours();
        const slotHour = parseInt(timeSlot.split(":")[0]);
        const isPM = timeSlot.includes("PM") && slotHour !== 12;
        const normalizedSlotHour = isPM ? slotHour + 12 : (slotHour === 12 && timeSlot.includes("AM") ? 0 : slotHour);

        if (normalizedSlotHour === hour) return "ONGOING";
        if (normalizedSlotHour > hour) return "UPCOMING";
        return "COMPLETED";
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const WeeklyView = () => (
        <div className="overflow-x-auto bg-white rounded-3xl border border-slate-100 shadow-sm">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="p-6 text-left text-xs font-black text-slate-400 uppercase tracking-widest border-r border-slate-100 w-40">Time</th>
                        {days.map(day => (
                            <th key={day} className="p-6 text-center text-sm font-black text-slate-700 border-r border-slate-100 last:border-r-0">
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map((slot, idx) => (
                        <tr key={idx} className="border-b border-slate-50 last:border-b-0 group hover:bg-slate-50/50 transition-colors">
                            <td className="p-6 border-r border-slate-100 bg-slate-50/30">
                                <span className="text-xs font-bold text-slate-500">{slot.split(" - ")[0]}</span>
                                <span className="block text-[10px] text-slate-400 font-medium">to {slot.split(" - ")[1]}</span>
                            </td>
                            {days.map(day => {
                                const routine = routines.find(r => r.day === day && r.timeSlot.includes(slot.split(" - ")[0]));
                                return (
                                    <td key={day} className="p-4 border-r border-slate-100 last:border-r-0 h-32 align-top">
                                        {routine ? (
                                            <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl h-full flex flex-col justify-between group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-700 transition-all duration-300">
                                                <div>
                                                    <h4 className="font-bold text-sm leading-tight mb-1">{routine.subject}</h4>
                                                    <p className="text-[10px] font-bold opacity-70">Grade {routine.className} - {routine.section}</p>
                                                </div>
                                                <div className="flex items-center gap-1.5 mt-2 opacity-60 group-hover:opacity-100">
                                                    <span className="text-xs">📍</span>
                                                    <span className="text-[10px] font-bold">Room 302</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="h-full w-full border border-dashed border-slate-100 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
                                                    <span className="text-xl">+</span>
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const DailyView = () => (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-6">
                <div className="flex flex-wrap gap-3">
                    {days.map((day) => (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`px-8 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${selectedDay === day
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105"
                                : "bg-white text-slate-500 hover:bg-blue-50 border border-slate-100"
                                }`}
                        >
                            {day}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    {filteredRoutines.length > 0 ? (
                        filteredRoutines.map((item, index) => (
                            <div
                                key={index}
                                className="group bg-white p-6 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500"
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 text-center">
                                            <span className="block text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Time</span>
                                            <span className="text-slate-700 font-bold bg-slate-50 px-3 py-1 rounded-lg truncate whitespace-nowrap">
                                                {item.timeSlot.split(" - ")[0]}
                                            </span>
                                        </div>
                                        <div className="h-12 w-px bg-slate-100 hidden md:block"></div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.subject}</h3>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-sm font-semibold text-slate-500 flex items-center gap-1.5">
                                                    <span className="text-blue-500">🏫</span> {item.className} - {item.section}
                                                </span>
                                                <span className="text-slate-300">•</span>
                                                <span className="text-sm font-semibold text-slate-500 flex items-center gap-1.5">
                                                    <span className="text-blue-500">📍</span> Room 302
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 self-end md:self-center">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wider ${getTimeStatus(item.timeSlot) === "ONGOING"
                                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100 animate-pulse"
                                            : getTimeStatus(item.timeSlot) === "UPCOMING"
                                                ? "bg-blue-50 text-blue-600 border border-blue-100"
                                                : "bg-slate-50 text-slate-400 border border-slate-100"
                                            }`}>
                                            {getTimeStatus(item.timeSlot)}
                                        </span>
                                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                                            <span className="text-xl">⋯</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white p-20 rounded-3xl border border-dashed border-slate-200 text-center space-y-4">
                            <div className="text-5xl text-slate-200">📅</div>
                            <h3 className="text-xl font-bold text-slate-400">No classes scheduled for {selectedDay}</h3>
                            <p className="text-slate-400">Take a break or plan for the next session!</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-800">Upcoming Today</h3>
                        <button className="text-blue-600 text-xs font-bold hover:underline">View All</button>
                    </div>
                    <div className="space-y-6">
                        {routines.filter(r => r.day === new Date().toLocaleDateString('en-US', { weekday: 'Long' })).slice(0, 2).map((r, i) => (
                            <div key={i} className="flex gap-4 relative">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 border-2 border-white shadow-sm flex items-center justify-center z-10">
                                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                    </div>
                                </div>
                                <div className="flex-1 pb-4">
                                    <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{r.timeSlot.split(" - ")[0]}</span>
                                    <h4 className="font-bold text-slate-700">{r.subject}</h4>
                                    <p className="text-xs text-slate-400">Grade {r.className} - {r.section}</p>
                                </div>
                            </div>
                        ))}
                        {routines.filter(r => r.day === new Date().toLocaleDateString('en-US', { weekday: 'Long' })).length === 0 && (
                            <p className="text-sm text-slate-400 font-medium">No classes for today</p>
                        )}
                    </div>
                </div>

                <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="text-xl">📢</span>
                        <h3 className="text-lg font-bold text-amber-900">Alerts</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-white/50 p-4 rounded-2xl border border-amber-200/50 hover:bg-white transition-all">
                            <span className="text-xs font-black text-amber-700 uppercase tracking-widest block mb-1">Substitution Alert</span>
                            <p className="text-sm text-amber-800 font-medium">Mr. Smith will cover Grade 9 English at 2:00 PM today in Room 105.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-3xl shadow-xl space-y-4 relative overflow-hidden">
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl"></div>
                    <h3 className="text-lg font-bold text-white relative z-10">Personal Notes</h3>
                    <p className="text-slate-300 text-sm leading-relaxed relative z-10">
                        Parent-teacher meetings are scheduled for next Friday. Please finalize your reports by Wednesday.
                    </p>
                    <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all relative z-10">
                        Add New Note
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-5xl font-black text-slate-800 tracking-tight mb-2">Weekly <span className="text-blue-600">Timetable</span></h1>
                    <p className="text-slate-500 font-medium text-lg">Manage your teaching schedule and sessions across the week</p>
                </div>
                <div className="flex p-1.5 bg-slate-100 rounded-[1.25rem] self-stretch md:self-auto">
                    <button
                        onClick={() => setViewMode("daily")}
                        className={`flex-1 md:flex-initial px-8 py-3 rounded-[1rem] font-bold text-sm transition-all duration-300 ${viewMode === "daily" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        Daily View
                    </button>
                    <button
                        onClick={() => setViewMode("weekly")}
                        className={`flex-1 md:flex-initial px-8 py-3 rounded-[1rem] font-bold text-sm transition-all duration-300 ${viewMode === "weekly" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        Weekly View
                    </button>
                </div>
            </div>

            {viewMode === "daily" ? <DailyView /> : <WeeklyView />}
        </div>
    );
};

export default RoutineSection;

