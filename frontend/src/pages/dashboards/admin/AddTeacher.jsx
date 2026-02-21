import React, { useState } from 'react';
import { motion } from 'framer-motion';

const grades = ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

const AddTeacher = () => {
    const [selectedGrades, setSelectedGrades] = useState([]);
    const [saved, setSaved] = useState(false);

    const toggleGrade = (g) => setSelectedGrades(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);

    return (
        <div className="max-w-[900px] mx-auto space-y-10 animate-in fade-in duration-700">
            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Add New Teacher</h1>
            </div>

            {/* Personal Information */}
            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                <h2 className="text-xl font-black text-slate-800 tracking-tight border-b border-slate-50 pb-6">Personal Information</h2>
                <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700">Full Name</label>
                    <input placeholder="Enter teacher's full name" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all font-medium text-slate-700" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">Email Address</label>
                        <input type="email" placeholder="e.g., teacher@school.edu" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">Phone Number</label>
                        <input type="tel" placeholder="e.g., 555-123-4567" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700" />
                    </div>
                </div>
            </div>

            {/* Role & Responsibilities */}
            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                <h2 className="text-xl font-black text-slate-800 tracking-tight border-b border-slate-50 pb-6">Role & Responsibilities</h2>

                <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700">Subject(s) Taught</label>
                    <select multiple className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800 h-28">
                        {['Mathematics', 'Science', 'English', 'History', 'Literature', 'Physics', 'Chemistry', 'Biology', 'Arts', 'Music'].map(s => <option key={s}>{s}</option>)}
                    </select>
                    <p className="text-[10px] font-bold text-slate-400 mt-1">Hold Ctrl/Cmd to select multiple subjects.</p>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-black text-slate-700">Grade Levels Taught</label>
                    <div className="flex flex-wrap gap-4">
                        {grades.map(g => (
                            <motion.button
                                key={g}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => toggleGrade(g)}
                                className={`flex items-center gap-3 px-6 py-3 rounded-2xl border-2 font-black text-sm transition-all ${selectedGrades.includes(g) ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'}`}
                            >
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selectedGrades.includes(g) ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                                    {selectedGrades.includes(g) && <span className="text-white text-[10px] font-black">✓</span>}
                                </div>
                                {g}
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2 max-w-xs">
                    <label className="text-sm font-black text-slate-700">Employment Start Date</label>
                    <input type="date" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800" />
                </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                <h2 className="text-xl font-black text-slate-800 tracking-tight border-b border-slate-50 pb-6">Additional Information</h2>
                <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700">Initial Qualifications or Notes</label>
                    <textarea rows={5} placeholder="Add any relevant qualifications, certifications, or initial notes..." className="w-full px-5 py-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700 resize-none" />
                </div>
            </div>

            <div className="border-t border-slate-100 pt-8 flex justify-end gap-4">
                <button className="px-10 py-5 rounded-2xl font-black text-sm border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 transition-all">Cancel</button>
                <button onClick={() => setSaved(true)} className="px-10 py-5 rounded-2xl font-black text-sm bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                    {saved ? '✅ Teacher Added!' : 'Add Teacher'}
                </button>
            </div>
        </div>
    );
};

export default AddTeacher;
