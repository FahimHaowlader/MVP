import React from 'react';
import { motion } from 'framer-motion';

const StudentSyllabusSection = () => {
    const courses = [
        { code: 'CHEM-101', title: 'Introduction to Chemistry', teacher: 'Prof. Evelyn Reed', semester: 'Fall 2024' },
        { code: 'HIST-240', title: 'Modern World History', teacher: 'Dr. Samuel Carter', semester: 'Fall 2024' },
        { code: 'MATH-150', title: 'Calculus I', teacher: 'Prof. Maria Gonzalez', semester: 'Fall 2024' },
        { code: 'ENGL-101', title: 'Composition and Rhetoric', teacher: 'Dr. Ben Williams', semester: 'Fall 2024' },
    ];

    return (
        <div className="max-w-[1200px] mx-auto animate-in fade-in duration-700 p-10 space-y-12">
            <h1 className="text-6xl font-black text-slate-900 tracking-tight leading-tight">Course Syllabi</h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-6 items-center">
                <div className="flex-1 min-w-[300px] relative group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300">🔍</span>
                    <input
                        type="text"
                        placeholder="Search by course or instructor..."
                        className="w-full bg-white border border-slate-100 rounded-2xl py-5 pl-16 pr-8 font-bold text-slate-700 shadow-sm focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    />
                </div>

                <div className="flex gap-4">
                    <div className="relative group">
                        <select className="appearance-none bg-white border border-slate-100 px-8 py-5 rounded-2xl font-black text-xs text-slate-700 shadow-sm hover:bg-slate-50 transition-all outline-none uppercase tracking-widest min-w-[220px] pr-12">
                            <option>Semester: Fall 2024</option>
                            <option>Semester: Spring 2024</option>
                        </select>
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[10px]">▼</span>
                    </div>

                    <div className="relative group">
                        <select className="appearance-none bg-white border border-slate-100 px-8 py-5 rounded-2xl font-black text-xs text-slate-700 shadow-sm hover:bg-slate-50 transition-all outline-none uppercase tracking-widest min-w-[220px] pr-12">
                            <option>Sort by: Course Name</option>
                            <option>Sort by: Code</option>
                        </select>
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[10px]">⇅</span>
                    </div>
                </div>
            </div>

            {/* Course List */}
            <div className="space-y-6">
                {courses.map((course, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -4, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                        className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group transition-all"
                    >
                        <div className="space-y-3">
                            <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{course.code}</span>
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-snug">{course.title}</h3>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{course.teacher} • {course.semester}</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="px-8 py-4 bg-blue-50 text-blue-600 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm flex items-center gap-3">
                                👁️ View Syllabus
                            </button>
                            <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-3">
                                📥 Download (PDF)
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="pt-10 text-center">
                <p className="text-xs font-bold text-slate-400 tracking-wide uppercase">
                    Missing a syllabus? Please contact your instructor or the academic department. <span className="text-blue-600 hover:underline cursor-pointer">Get Help</span>
                </p>
            </div>
        </div>
    );
};

export default StudentSyllabusSection;
