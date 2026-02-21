import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const stats = [
    { label: 'Total Classes', value: 45 },
    { label: 'Assigned Teachers', value: 12 },
    { label: 'Rooms Utilized', value: 8 },
];

const ConfirmRoutineModal = ({ onClose, onConfirm }) => (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-6">
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white rounded-[3rem] shadow-2xl w-full max-w-xl overflow-hidden"
        >
            {/* Header */}
            <div className="p-12 pb-8 flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">▶</span>
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Confirm Routine Submission</h2>
                    <p className="text-slate-500 font-medium mt-2 leading-relaxed">Are you sure you want to send this routine to the Principal for approval? This action cannot be undone.</p>
                </div>
            </div>

            {/* Summary Card */}
            <div className="mx-12 mb-10">
                <div className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100">
                    <div className="px-8 py-5 border-b border-slate-100">
                        <p className="font-black text-slate-800 tracking-tight">Routine Summary: Week of Oct 28 – Nov 1</p>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {stats.map((s, i) => (
                            <div key={i} className="flex justify-between items-center px-8 py-5">
                                <p className="font-medium text-slate-600">{s.label}</p>
                                <p className="font-black text-slate-900 text-lg">{s.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50/50 border-t border-slate-100 px-12 py-6 flex justify-end gap-4">
                <button onClick={onClose} className="px-8 py-4 rounded-2xl font-black text-sm text-slate-500 hover:text-slate-700 transition-all">Cancel</button>
                <button onClick={onClose} className="px-8 py-4 rounded-2xl font-black text-sm border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 transition-all">Review Routine</button>
                <button onClick={onConfirm} className="px-10 py-4 rounded-2xl font-black text-sm bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">Send to Principal</button>
            </div>
        </motion.div>
    </div>
);

const ConfirmRoutineSubmission = () => {
    const [showModal, setShowModal] = useState(true);
    const [sent, setSent] = useState(false);

    const handleConfirm = () => {
        setShowModal(false);
        setSent(true);
    };

    return (
        <div className="max-w-[1200px] mx-auto animate-in fade-in duration-700">
            {/* Background content — routine overview */}
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Routine Overview</h1>
                    <p className="text-slate-400 font-medium mt-2">Week of Oct 28 – Nov 1, 2024</p>
                </div>
                <button onClick={() => setShowModal(true)} className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                    ▶ Submit to Principal
                </button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-8 mb-10">
                {stats.map((s, i) => (
                    <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                        <p className="text-sm font-bold text-slate-400">{s.label}</p>
                        <p className="text-5xl font-black text-slate-900 tracking-tighter mt-3">{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Timetable placeholder */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50">
                    <p className="font-black text-slate-800">Weekly Timetable Grid</p>
                </div>
                <div className="grid grid-cols-5 divide-x divide-slate-50">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, di) => (
                        <div key={day} className="p-6 space-y-3">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{day}</p>
                            {[['8:00', 'Mathematics', 'blue'], ['10:00', 'Science', 'emerald'], ['14:00', 'English', 'violet']].slice(0, 3 - (di % 2)).map(([time, subj, color]) => (
                                <div key={time} className={`p-4 rounded-2xl bg-${color}-50 border border-${color}-100`}>
                                    <p className="text-[10px] font-black text-slate-400">{time}</p>
                                    <p className={`text-xs font-black text-${color}-700 mt-1`}>{subj}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Success Banner */}
            <AnimatePresence>
                {sent && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-sm flex items-center gap-3 shadow-2xl shadow-emerald-100 z-50">
                        ✅ Routine sent to Principal for approval!
                        <button onClick={() => setSent(false)} className="ml-4 text-emerald-200 hover:text-white font-black">✕</button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal */}
            <AnimatePresence>
                {showModal && <ConfirmRoutineModal onClose={() => setShowModal(false)} onConfirm={handleConfirm} />}
            </AnimatePresence>
        </div>
    );
};

export default ConfirmRoutineSubmission;
