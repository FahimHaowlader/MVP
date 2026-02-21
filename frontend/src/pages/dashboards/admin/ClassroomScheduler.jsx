import React, { useState } from 'react';
import { motion } from 'framer-motion';

const rooms = ['Science Lab A', 'Room 101', 'Room 205', 'Library Hall', 'Computer Lab B', 'Auditorium'];
const teachers = ['Dr. Evelyn Reed', 'Mr. Robert Downing', 'Ms. Amelia Earhart', 'Dr. Marie Curie', 'Mr. William Shakespeare'];
const classes = ['Grade 10 - Biology', 'Grade 11 - Physics', 'Grade 9 - Mathematics', 'Grade 12 - Literature', 'Grade 10 - Chemistry'];

const ClassroomScheduler = () => {
    const [selectedClass, setSelectedClass] = useState(classes[0]);
    const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
    const [selectedDate, setSelectedDate] = useState('2024-10-26');
    const [selectedTeacher, setSelectedTeacher] = useState(teachers[0]);
    const [saved, setSaved] = useState(false);

    // Simulate availability
    const roomAvailable = selectedRoom !== 'Computer Lab B';
    const teacherAvailable = selectedTeacher !== 'Dr. Marie Curie';

    return (
        <div className="max-w-[1100px] mx-auto space-y-10 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Schedule Management</p>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Classroom & Teacher Scheduler</h1>
                    <p className="text-slate-400 font-medium mt-2">Create a new schedule entry by filling out the form below.</p>
                </div>
                <button className="px-8 py-4 bg-blue-50 text-blue-600 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-100 transition-all border border-blue-100">
                    📥 Import Schedule
                </button>
            </div>

            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-10">
                {/* Row 1 */}
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-sm font-black text-slate-700">Class Selection</label>
                        <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800 appearance-none">
                            {classes.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="space-y-3">
                        <label className="text-sm font-black text-slate-700">Room Selection</label>
                        <select value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800 appearance-none">
                            {rooms.map(r => <option key={r}>{r}</option>)}
                        </select>
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-sm font-black text-slate-700">Date</label>
                        <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-sm font-black text-slate-700">Teacher Assignment</label>
                        <select value={selectedTeacher} onChange={e => setSelectedTeacher(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800 appearance-none">
                            {teachers.map(t => <option key={t}>{t}</option>)}
                        </select>
                    </div>
                </div>

                {/* Row 3 */}
                <div className="space-y-3">
                    <label className="text-sm font-black text-slate-700">Teacher in Room (if different)</label>
                    <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-500 appearance-none">
                        <option value="">Select a teacher if different</option>
                        {teachers.map(t => <option key={t}>{t}</option>)}
                    </select>
                </div>

                {/* Availability */}
                <div>
                    <h3 className="text-lg font-black text-slate-800 tracking-tight mb-5">
                        Availability for {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                        <motion.div
                            key={selectedRoom + roomAvailable}
                            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                            className={`p-6 rounded-2xl border flex items-start gap-4 ${roomAvailable ? 'bg-emerald-50/50 border-emerald-100' : 'bg-rose-50/50 border-rose-100'}`}
                        >
                            <span className="text-2xl mt-0.5">{roomAvailable ? '✅' : '⚠️'}</span>
                            <div>
                                <p className={`font-black text-sm tracking-tight ${roomAvailable ? 'text-emerald-700' : 'text-rose-700'}`}>
                                    {selectedRoom} is {roomAvailable ? 'available' : 'unavailable'}
                                </p>
                                <p className={`text-xs font-bold mt-1 ${roomAvailable ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {roomAvailable ? 'No bookings found for the selected date.' : 'Booked for another class (10:00 - 11:00 AM).'}
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            key={selectedTeacher + teacherAvailable}
                            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                            className={`p-6 rounded-2xl border flex items-start gap-4 ${teacherAvailable ? 'bg-emerald-50/50 border-emerald-100' : 'bg-rose-50/50 border-rose-100'}`}
                        >
                            <span className="text-2xl mt-0.5">{teacherAvailable ? '✅' : '⚠️'}</span>
                            <div>
                                <p className={`font-black text-sm tracking-tight ${teacherAvailable ? 'text-emerald-700' : 'text-rose-700'}`}>
                                    {selectedTeacher} is {teacherAvailable ? 'available' : 'unavailable'}
                                </p>
                                <p className={`text-xs font-bold mt-1 ${teacherAvailable ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {teacherAvailable ? 'No schedule conflicts found.' : 'Booked for Grade 12 Physics (9:00 AM - 10:30 AM).'}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-slate-50">
                    <button className="px-10 py-5 rounded-2xl font-black text-sm border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 transition-all">Cancel</button>
                    <button onClick={() => setSaved(true)} className="px-10 py-5 rounded-2xl font-black text-sm bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                        {saved ? '✅ Entry Created!' : 'Create Schedule Entry'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClassroomScheduler;
