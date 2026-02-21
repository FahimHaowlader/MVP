import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const ClassManagementSection = () => {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('attendance');
    const [status, setStatus] = useState('');

    // Mock Subjects Data
    const subjects = [
        { id: 1, name: 'Advanced Algebra', code: 'MTH302', grade: 'Grade 11 - Section A', students: 30, icon: '🧮', color: 'bg-blue-50', iconColor: 'text-blue-600' },
        { id: 2, name: 'Chemistry', code: 'CHM201', grade: 'Grade 11 - Section A', students: 32, icon: '⚗️', color: 'bg-emerald-50', iconColor: 'text-emerald-600' },
        { id: 3, name: 'World History', code: 'HIS102', grade: 'Grade 10 - Section A', students: 35, icon: '🌍', color: 'bg-rose-50', iconColor: 'text-rose-600' },
        { id: 4, name: 'Physics', code: 'PHY301', grade: 'Grade 12 - Section B', students: 28, icon: '⚛️', color: 'bg-indigo-50', iconColor: 'text-indigo-600' },
        { id: 5, name: 'English Literature', code: 'ENG210', grade: 'Grade 10 - Section B', students: 33, icon: '📖', color: 'bg-amber-50', iconColor: 'text-amber-600' },
        { id: 6, name: 'Computer Science', code: 'CS101', grade: 'Grade 9 - Section C', students: 29, icon: '💻', color: 'bg-cyan-50', iconColor: 'text-cyan-600' },
    ];

    const filteredSubjects = useMemo(() => {
        return subjects.filter(sub =>
            sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sub.code.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    // State for Attendance
    const [studentId, setStudentId] = useState('');
    const [attendanceStatus, setAttendanceStatus] = useState('Present');

    // State for Syllabus/Assignment
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [type, setType] = useState('Syllabus');
    const [dueDate, setDueDate] = useState('');

    const handleAttendanceSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5001/api/attendance',
                { studentId, status: attendanceStatus, subject: selectedSubject.name, className: selectedSubject.grade },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setStatus('Attendance marked successfully');
            setTimeout(() => setStatus(''), 3000);
        } catch (err) {
            setStatus('Error marking attendance');
            console.error(err);
        }
    };

    const handleMaterialSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const endpoint = type === 'Assignment' ? 'assignments' : 'syllabus';
            const payload = {
                title,
                description,
                className: selectedSubject.grade,
                subject: selectedSubject.name,
                fileUrl,
                ...(type === 'Assignment' ? { dueDate } : { type })
            };

            await axios.post(`http://localhost:5001/api/` + endpoint, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setStatus(`${type} uploaded successfully`);
            setTimeout(() => setStatus(''), 3000);
        } catch (err) {
            setStatus(`Error uploading ${type}`);
            console.error(err);
        }
    };

    if (selectedSubject) {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <button
                    onClick={() => setSelectedSubject(null)}
                    className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold transition-all group"
                >
                    <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
                    <span>Back to Subjects</span>
                </button>

                <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 ${selectedSubject.color} rounded-2xl flex items-center justify-center text-2xl shadow-sm`}>
                                {selectedSubject.icon}
                            </div>
                            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">{selectedSubject.name}</h1>
                        </div>
                        <p className="text-slate-500 font-medium ml-15">{selectedSubject.grade} | {selectedSubject.code}</p>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50">
                        <button
                            onClick={() => setActiveTab('attendance')}
                            className={`px-6 py-2.5 rounded-xl font-black transition-all text-xs uppercase tracking-widest ${activeTab === 'attendance' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Attendance
                        </button>
                        <button
                            onClick={() => setActiveTab('materials')}
                            className={`px-6 py-2.5 rounded-xl font-black transition-all text-xs uppercase tracking-widest ${activeTab === 'materials' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Materials
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {status && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-emerald-50 text-emerald-600 py-4 px-8 rounded-2xl border border-emerald-100 font-black flex items-center gap-3"
                        >
                            <span>✅</span> {status}
                        </motion.div>
                    )}
                </AnimatePresence>

                {activeTab === 'attendance' ? (
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-premium border border-slate-100 max-w-2xl">
                        <h3 className="text-2xl font-black text-slate-800 mb-8">Mark Daily Attendance</h3>
                        <form onSubmit={handleAttendanceSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Student ID</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 font-bold text-slate-700 focus:ring-4 focus:ring-blue-100 transition-all shadow-inner"
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                    placeholder="Enter student ID..."
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Status</label>
                                <select
                                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 font-bold text-slate-700 focus:ring-4 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
                                    value={attendanceStatus}
                                    onChange={(e) => setAttendanceStatus(e.target.value)}
                                >
                                    <option value="Present">Present</option>
                                    <option value="Absent">Absent</option>
                                    <option value="Late">Late</option>
                                </select>
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-lg shadow-blue-100 transition-all active:scale-[0.98]">
                                Submit Attendance
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-premium border border-slate-100 max-w-4xl">
                        <h3 className="text-2xl font-black text-slate-800 mb-8">Upload Class Materials</h3>
                        <form onSubmit={handleMaterialSubmit} className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Type</label>
                                <select
                                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 font-bold text-slate-700 focus:ring-4 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="Syllabus">Syllabus</option>
                                    <option value="Assignment">Assignment</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Title</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 font-bold text-slate-700 focus:ring-4 focus:ring-blue-100 transition-all shadow-inner"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Resource title..."
                                    required
                                />
                            </div>
                            <div className="col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">File URL</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 font-bold text-slate-700 focus:ring-4 focus:ring-blue-100 transition-all shadow-inner"
                                    value={fileUrl}
                                    onChange={(e) => setFileUrl(e.target.value)}
                                    placeholder="Paste resource link here..."
                                />
                            </div>
                            {type === 'Assignment' && (
                                <div className="col-span-2 space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Due Date</label>
                                    <input
                                        type="date"
                                        className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 font-bold text-slate-700 focus:ring-4 focus:ring-blue-100 transition-all shadow-inner"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                        required
                                    />
                                </div>
                            )}
                            <button className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-lg shadow-blue-100 transition-all active:scale-[0.98] mt-4">
                                Publish Material
                            </button>
                        </form>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <h1 className="text-5xl font-extrabold text-slate-800 tracking-tight">My Subjects</h1>
                    <p className="text-slate-500 font-medium">Welcome back, Dr. Vance! Here are your assigned subjects for the semester.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">🔍</span>
                        <input
                            type="text"
                            placeholder="Search subjects..."
                            className="bg-white border-none rounded-2xl py-4 pl-12 pr-6 w-72 shadow-sm focus:ring-4 focus:ring-blue-100 transition-all font-bold text-slate-700"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow relative">
                        <span className="text-xl text-slate-500">🔔</span>
                        <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
                    </button>
                </div>
            </div>

            {/* Subjects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSubjects.map((sub) => (
                    <motion.div
                        key={sub.id}
                        whileHover={{ y: -8 }}
                        className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col gap-6 group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 ${sub.color} rounded-2xl flex items-center justify-center text-3xl shadow-sm transition-transform group-hover:scale-110 duration-500 font-bold`}>
                                {sub.icon}
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors">{sub.name}</h3>
                                <span className="text-slate-400 font-black text-xs tracking-widest">{sub.code}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-500">
                                <span className="text-lg bg-slate-50 p-2 rounded-xl">🎓</span>
                                <span className="font-bold text-sm tracking-tight">{sub.grade}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-500">
                                <span className="text-lg bg-slate-50 p-2 rounded-xl">👥</span>
                                <span className="font-bold text-sm tracking-tight">{sub.students} Students</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setSelectedSubject(sub)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-50 transition-all active:scale-[0.98] mt-2 group-hover:shadow-blue-200"
                        >
                            Manage Class
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ClassManagementSection;

