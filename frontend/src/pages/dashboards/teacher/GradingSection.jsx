import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const GradingSection = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('10-A');
    const [selectedSection, setSelectedSection] = useState('Section A');
    const [selectedExamType, setSelectedExamType] = useState('Midterm');
    const [selectedSubject, setSelectedSubject] = useState('Mathematics');
    const [selectedStatus, setSelectedStatus] = useState('All');

    const [unsavedChanges, setUnsavedChanges] = useState(0);

    // Initial Fetch
    useEffect(() => {
        fetchStudents();
    }, [selectedClass, selectedSection]);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`https://mvp-gilt-iota.vercel.app/api/users/students?className=${selectedClass}&section=${selectedSection}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Map students to grading format
            const mappedStudents = res.data.map((student, index) => ({
                id: student._id,
                rollNo: (1001 + index).toString(), // Mock roll no for now
                name: student.name,
                marks: 0,
                status: 'Pending',
                grade: '-',
                average: 0
            }));
            setStudents(mappedStudents);
            setUnsavedChanges(0);
        } catch (error) {
            console.error('Error fetching students:', error);
            setStatus('Error fetching students');
        } finally {
            setLoading(false);
        }
    };

    // Calculate Grade based on marks
    const calculateGrade = (marks) => {
        if (!marks && marks !== 0) return '-';
        if (marks >= 90) return 'A+';
        if (marks >= 80) return 'A';
        if (marks >= 70) return 'B';
        if (marks >= 60) return 'C';
        if (marks >= 50) return 'D';
        return 'F';
    };

    const handleMarksChange = (id, newMarks) => {
        setStudents(prev => prev.map(s => {
            if (s.id === id) {
                const marks = parseInt(newMarks) || 0;
                return {
                    ...s,
                    marks,
                    grade: calculateGrade(marks),
                    status: 'Unsaved'
                };
            }
            return s;
        }));
        setUnsavedChanges(prev => prev + 1);
    };

    const handleSave = async (isDraft = true) => {
        try {
            const token = localStorage.getItem('token');
            const resultsData = students.filter(s => s.status === 'Unsaved').map(s => ({
                student: s.id,
                examType: selectedExamType,
                className: selectedClass,
                subjects: [{
                    subject: selectedSubject,
                    marks: s.marks,
                    totalMarks: 100
                }]
            }));

            if (resultsData.length === 0) {
                setStatus('No changes to save');
                return;
            }

            await axios.post('https://mvp-gilt-iota.vercel.app/api/results/bulk',
                { results: resultsData },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Update status to Graded
            setStudents(prev => prev.map(s => s.status === 'Unsaved' ? { ...s, status: 'Graded' } : s));
            setUnsavedChanges(0);
            setStatus(isDraft ? 'Draft saved successfully' : 'Grades submitted successfully');
        } catch (error) {
            console.error('Error saving grades:', error);
            setStatus('Error saving grades');
        }
    };

    const filteredStudents = useMemo(() => {
        return students.filter(s =>
            (s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.rollNo.includes(searchTerm)) &&
            (selectedStatus === 'All' || s.status === selectedStatus)
        );
    }, [students, searchTerm, selectedStatus]);

    const stats = useMemo(() => {
        const graded = students.filter(s => s.status !== 'Pending');
        if (graded.length === 0) return { avg: '0.0', highest: 0 };
        const avg = graded.reduce((acc, curr) => acc + curr.marks, 0) / graded.length;
        const highest = Math.max(...students.map(s => s.marks));
        return { avg: avg.toFixed(1), highest: highest === -Infinity ? 0 : highest };
    }, [students]);

    return (
        <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Header Area */}
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Grades Management</h1>
                    <p className="text-slate-500 font-medium tracking-wide">
                        Class: <span className="text-slate-700 select-none font-bold uppercase">{selectedClass}</span> |
                        Subject: <span className="text-slate-700 select-none font-bold uppercase">{selectedSubject}</span> |
                        Term: <span className="text-slate-700 select-none font-bold uppercase">{selectedExamType} 2024</span>
                    </p>
                </div>
                {status && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`px-6 py-3 rounded-2xl font-bold border transition-all ${status.includes('Error') ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}
                    >
                        {status}
                    </motion.div>
                )}
            </div>

            {/* Filters Card */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100/80 flex flex-wrap items-end gap-6">
                <div className="flex-1 min-w-[140px] space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Class</label>
                    <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 font-black text-slate-700 focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer appearance-none shadow-inner"
                    >
                        <option>10-A</option>
                        <option>10-B</option>
                        <option>11-A</option>
                    </select>
                </div>

                <div className="flex-1 min-w-[140px] space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Section</label>
                    <select
                        value={selectedSection}
                        onChange={(e) => setSelectedSection(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 font-black text-slate-700 focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer appearance-none shadow-inner"
                    >
                        <option>Section A</option>
                        <option>Section B</option>
                    </select>
                </div>

                <div className="flex-1 min-w-[140px] space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Subject</label>
                    <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 font-black text-slate-700 focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer appearance-none shadow-inner"
                    >
                        <option>Mathematics</option>
                        <option>Physics</option>
                        <option>Biology</option>
                        <option>English</option>
                    </select>
                </div>

                <div className="flex-1 min-w-[140px] space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Exam Type</label>
                    <select
                        value={selectedExamType}
                        onChange={(e) => setSelectedExamType(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 font-black text-slate-700 focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer appearance-none shadow-inner"
                    >
                        <option value="Midterm">Mid-Term</option>
                        <option value="Final">Final Exam</option>
                        <option value="Test">Class Test</option>
                    </select>
                </div>

                <div className="flex-[2] min-w-[280px] relative group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors text-xl">🔍</span>
                    <input
                        type="text"
                        placeholder="Search Student..."
                        className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-14 pr-8 font-black text-slate-700 focus:ring-4 focus:ring-blue-100 transition-all shadow-inner placeholder:text-slate-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Students Table Card */}
            <div className="bg-white rounded-[2.5rem] shadow-premium border border-slate-100 overflow-hidden relative min-h-[400px]">
                {loading && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
                    </div>
                )}
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-50 bg-slate-50/40">
                            <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">Roll No.</th>
                            <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">Student Name</th>
                            <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">Marks (100)</th>
                            <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] text-center">Status</th>
                            <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] text-center">Grade</th>
                            <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] text-right">Progress</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-blue-50/30 transition-all group cursor-pointer border-l-[6px] border-l-transparent hover:border-l-blue-500">
                                    <td className="px-10 py-8 font-black text-slate-800 tracking-tight">{student.rollNo}</td>
                                    <td className="px-10 py-8 font-black text-slate-700 group-hover:text-blue-600 transition-colors uppercase text-sm">{student.name}</td>
                                    <td className="px-10 py-8">
                                        <div className="relative w-fit">
                                            <input
                                                type="number"
                                                value={student.marks}
                                                onChange={(e) => handleMarksChange(student.id, e.target.value)}
                                                className="w-24 bg-slate-100/50 border-none rounded-2xl py-3 px-4 font-black text-slate-700 focus:ring-4 focus:ring-blue-100 transition-all text-center group-hover:bg-white group-hover:shadow-md group-hover:scale-110 active:scale-100"
                                                max="100"
                                                min="0"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-center uppercase tracking-widest text-[10px]">
                                        <span className={`inline-flex items-center gap-2.5 px-5 py-2 rounded-xl font-black border tracking-[0.1em] shadow-sm ${student.status === 'Graded'
                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                            : student.status === 'Unsaved'
                                                ? 'bg-orange-50 text-orange-600 border-orange-100 animate-pulse'
                                                : 'bg-slate-50 text-slate-400 border-slate-100'
                                            }`}>
                                            <div className={`w-2 h-2 rounded-full ${student.status === 'Graded' ? 'bg-emerald-500' : student.status === 'Unsaved' ? 'bg-orange-500' : 'bg-slate-300'}`}></div>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8 text-center">
                                        <span className={`text-2xl font-black ${student.grade === '-' ? 'text-slate-200' : student.grade === 'F' ? 'text-rose-500' : 'text-slate-800'}`}>{student.grade}</span>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="font-black text-slate-900">{student.marks}%</span>
                                            <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-1000 rounded-full ${student.marks >= 80 ? 'bg-emerald-500' : student.marks >= 60 ? 'bg-blue-500' : 'bg-rose-500'}`}
                                                    style={{ width: `${student.marks}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-20 text-center font-bold text-slate-300 italic text-lg tracking-widest">No students found for this selection</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-12 bg-slate-900 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group/footer">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none group-hover/footer:bg-blue-600/20 transition-all duration-700"></div>
                <div className="flex items-center gap-16 relative z-10">
                    <div className="space-y-1 transform transition-transform hover:scale-105 active:scale-95 duration-300">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Class Average</p>
                        <p className="text-5xl font-black text-blue-400 drop-shadow-[0_0_20px_rgba(96,165,250,0.3)]">{stats.avg}<span className="text-xl text-slate-500 ml-1">%</span></p>
                    </div>
                    <div className="w-px h-16 bg-white/5 opacity-50"></div>
                    <div className="space-y-1 transform transition-transform hover:scale-105 active:scale-95 duration-300">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Highest Score</p>
                        <p className="text-5xl font-black text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]">{stats.highest}</p>
                    </div>
                    <div className="w-px h-16 bg-white/5 opacity-50"></div>
                    <div className="space-y-1 transform transition-transform hover:scale-105 active:scale-95 duration-300">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Unsaved Changes</p>
                        <p className="text-5xl font-black text-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">{unsavedChanges}</p>
                    </div>
                </div>

                <div className="flex items-center gap-6 relative z-10">
                    <button
                        onClick={() => handleSave(true)}
                        className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-black rounded-[1.5rem] transition-all active:scale-90 border border-white/10 hover:border-white/20 backdrop-blur-md uppercase tracking-widest text-xs"
                    >
                        Save as Draft
                    </button>
                    <button
                        onClick={() => handleSave(false)}
                        className="px-14 py-6 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-[1.5rem] shadow-[0_20px_50px_rgba(37,99,235,0.4)] transition-all active:scale-95 hover:-translate-y-1 uppercase tracking-widest text-sm"
                    >
                        Submit Final Grades
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GradingSection;


