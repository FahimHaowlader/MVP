import React, { useState } from 'react';
import { motion } from 'framer-motion';

const schedule = [
    { subject: 'Mathematics', date: '2024-10-21', start: '09:00 AM', end: '12:00 PM', room: '101', invigilator: 'Mr. Alan Turing' },
    { subject: 'Physics', date: '2024-10-22', start: '09:00 AM', end: '12:00 PM', room: '102', invigilator: 'Ms. Marie Curie' },
    { subject: 'Chemistry', date: '2024-10-23', start: '09:00 AM', end: '12:00 PM', room: '101', invigilator: 'Mr. John Dalton' },
    { subject: 'Biology', date: '2024-10-24', start: '09:00 AM', end: '12:00 PM', room: '102', invigilator: 'Mr. Charles Darwin' },
    { subject: 'History', date: '2024-10-25', start: '09:00 AM', end: '11:00 AM', room: '205', invigilator: 'Ms. Ada Lovelace' },
];

const ReviewExamRoutine = () => {
    const [published, setPublished] = useState(false);

    if (published) return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[700px] mx-auto text-center space-y-8 pt-24">
            <span className="text-6xl">🎉</span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Routine Published!</h2>
            <p className="text-slate-400 font-bold max-w-md mx-auto">The Mid-Term Examination routine for Grade 10 - Section A is now live and visible to all teachers and students.</p>
            <div className="flex justify-center gap-4">
                <button onClick={() => setPublished(false)} className="px-10 py-5 bg-white border border-slate-200 rounded-2xl font-black text-sm text-slate-600 hover:bg-slate-50 shadow-sm transition-all">← Edit Routine</button>
                <button className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">Go to Dashboard</button>
            </div>
        </motion.div>
    );

    return (
        <div className="max-w-[900px] mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Progress */}
            <div className="space-y-2">
                <p className="text-sm font-black text-slate-700">Step 3 of 3</p>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: '66%' }} animate={{ width: '100%' }} transition={{ duration: 0.6, ease: 'easeOut' }} className="h-full bg-blue-600 rounded-full" />
                </div>
            </div>

            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Review Your Exam Routine</h1>
                <p className="text-slate-400 font-medium mt-2">Please verify all details below before publishing the schedule.</p>
            </div>

            {/* Routine Summary */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                <h2 className="text-xl font-black text-slate-800 tracking-tight">Routine Summary</h2>
                <div className="grid grid-cols-4 gap-6 pt-2 border-t border-slate-50">
                    {[
                        ['Exam Name', 'Mid-Term Examination'],
                        ['Class', '10'],
                        ['Section', 'A'],
                        ['Academic Year', '2024-2025'],
                    ].map(([label, val]) => (
                        <div key={label}>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
                            <p className="font-black text-slate-900 text-lg mt-2">{val}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Full Schedule */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-10 pb-6">
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">Full Exam Schedule</h2>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-y border-slate-50 bg-slate-50/50">
                            {['Subject', 'Date', 'Start Time', 'End Time', 'Room No.', 'Invigilator'].map(h => (
                                <th key={h} className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {schedule.map((s, i) => (
                            <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                                className="hover:bg-slate-50/30 transition-all">
                                <td className="px-8 py-5 font-black text-slate-900">{s.subject}</td>
                                <td className="px-8 py-5 font-bold text-slate-500">{s.date}</td>
                                <td className="px-8 py-5 font-bold text-slate-500">{s.start}</td>
                                <td className="px-8 py-5 font-bold text-slate-500">{s.end}</td>
                                <td className="px-8 py-5 font-bold text-slate-500">{s.room}</td>
                                <td className="px-8 py-5 font-bold text-slate-500">{s.invigilator}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4">
                <button className="flex items-center gap-2 px-10 py-5 rounded-2xl font-black text-sm border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all">
                    ← Previous
                </button>
                <div className="flex gap-4">
                    <button className="px-10 py-5 rounded-2xl font-black text-sm text-slate-500 hover:text-slate-700 transition-all">Save as Draft</button>
                    <button onClick={() => setPublished(true)} className="px-10 py-5 rounded-2xl font-black text-sm bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                        Save & Publish Routine
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewExamRoutine;
