import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialRoutine = [
    { date: 'Aug 12, 2024', time: '09:00 - 12:00', subject: 'Mathematics', cls: '10 - A', room: '101', invigilator: 'Mr. John Carter' },
    { date: 'Aug 12, 2024', time: '09:00 - 12:00', subject: 'Science', cls: '9 - B', room: '102', invigilator: 'Ms. Alice Williams' },
    { date: 'Aug 13, 2024', time: '09:00 - 11:00', subject: 'English', cls: '10 - A', room: '101', invigilator: 'Mrs. Emily Davis' },
    { date: 'Aug 14, 2024', time: '13:00 - 15:00', subject: 'History', cls: '9 - C', room: '205', invigilator: 'Mr. John Carter' },
];

const CreateExamRoutine = () => {
    const [routine, setRoutine] = useState(initialRoutine);
    const [view, setView] = useState('table');
    const [form, setForm] = useState({ examType: '', cls: '', section: '', subject: '', date: '2024-08-12', room: '', start: '09:00', end: '12:00', invigilator: '' });
    const [saved, setSaved] = useState(false);

    const addEntry = () => {
        if (!form.subject) return;
        setRoutine([...routine, {
            date: new Date(form.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            time: `${form.start} - ${form.end}`,
            subject: form.subject || 'New Subject',
            cls: `${form.cls} - ${form.section}`.trim() || '–',
            room: form.room || '–',
            invigilator: form.invigilator || '–',
        }]);
    };

    return (
        <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Create Exam Routine</h1>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-7 py-4 bg-blue-50 text-blue-600 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-100 transition-all border border-blue-100">✦ Auto-Generate</button>
                    <button onClick={() => setSaved(true)} className="flex items-center gap-2 px-7 py-4 bg-white border border-slate-200 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
                        {saved ? '✅ Saved!' : '💾 Save as Draft'}
                    </button>
                    <button className="flex items-center gap-2 px-7 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-emerald-100 hover:bg-emerald-700 active:scale-95 transition-all">↑ Publish Routine</button>
                </div>
            </div>

            <div className="grid grid-cols-5 gap-8">
                {/* Left — Form */}
                <div className="col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6 h-fit">
                    <h2 className="text-lg font-black text-slate-800 tracking-tight">Add New Exam Schedule</h2>

                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Exam Name/Type</label>
                        <select value={form.examType} onChange={e => setForm({ ...form, examType: e.target.value })} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 appearance-none">
                            <option value="">Select Exam Type (e.g., Mid-Term)</option>
                            {['Mid-Term', 'Final', 'Unit Test', 'Mock Exam'].map(t => <option key={t}>{t}</option>)}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Class</label>
                            <select value={form.cls} onChange={e => setForm({ ...form, cls: e.target.value })} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 appearance-none">
                                <option value="">Select Class</option>
                                {['9', '10', '11', '12'].map(g => <option key={g}>Grade {g}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Section</label>
                            <select value={form.section} onChange={e => setForm({ ...form, section: e.target.value })} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 appearance-none">
                                <option value="">Select Section</option>
                                {['A', 'B', 'C'].map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Subject</label>
                        <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 appearance-none">
                            <option value="">Select Subject</option>
                            {['Mathematics', 'Science', 'English', 'History', 'Physics', 'Chemistry'].map(s => <option key={s}>{s}</option>)}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Exam Date</label>
                            <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-800" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Room Number</label>
                            <input placeholder="e.g., Room 101" value={form.room} onChange={e => setForm({ ...form, room: e.target.value })} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-800 placeholder:text-slate-300 placeholder:font-medium" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Start Time</label>
                            <input type="time" value={form.start} onChange={e => setForm({ ...form, start: e.target.value })} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-800" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">End Time</label>
                            <input type="time" value={form.end} onChange={e => setForm({ ...form, end: e.target.value })} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-800" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Invigilator</label>
                        <select value={form.invigilator} onChange={e => setForm({ ...form, invigilator: e.target.value })} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 appearance-none">
                            <option value="">Assign an Invigilator</option>
                            {['Mr. John Carter', 'Ms. Alice Williams', 'Mrs. Emily Davis', 'Dr. Marcus Brown'].map(t => <option key={t}>{t}</option>)}
                        </select>
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button onClick={addEntry} className="flex-1 flex items-center justify-center gap-2 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">⊕ Add to Routine</button>
                        <button onClick={() => setForm({ examType: '', cls: '', section: '', subject: '', date: '2024-08-12', room: '', start: '09:00', end: '12:00', invigilator: '' })}
                            className="flex-1 flex items-center justify-center gap-2 py-5 bg-slate-100 text-slate-700 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all">🗑 Clear Form</button>
                    </div>
                </div>

                {/* Right — Preview */}
                <div className="col-span-3 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="flex justify-between items-center p-10 pb-6">
                        <h2 className="text-lg font-black text-slate-800 tracking-tight">Exam Routine Preview</h2>
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            {['Table View', 'Calendar View'].map(v => (
                                <button key={v} onClick={() => setView(v === 'Table View' ? 'table' : 'calendar')}
                                    className={`px-5 py-2 rounded-lg font-black text-[11px] transition-all ${(view === 'table' && v === 'Table View') || (view === 'calendar' && v === 'Calendar View') ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-600'}`}>
                                    {v}
                                </button>
                            ))}
                        </div>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-y border-slate-50 bg-slate-50/50">
                                {['Date', 'Time', 'Subject', 'Class', 'Room', 'Invigilator', 'Actions'].map(h => (
                                    <th key={h} className={`px-6 py-5 text-[10px] font-black uppercase tracking-widest text-blue-500`}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            <AnimatePresence>
                                {routine.map((r, i) => (
                                    <motion.tr key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}
                                        className="hover:bg-slate-50/30 transition-all">
                                        <td className="px-6 py-5 text-sm font-bold text-slate-600">{r.date}</td>
                                        <td className="px-6 py-5 text-sm font-bold text-slate-600">{r.time}</td>
                                        <td className="px-6 py-5 text-sm font-black text-slate-900">{r.subject}</td>
                                        <td className="px-6 py-5 text-sm font-bold text-slate-600">{r.cls}</td>
                                        <td className="px-6 py-5 text-sm font-bold text-slate-600">{r.room}</td>
                                        <td className="px-6 py-5 text-sm font-bold text-slate-600">{r.invigilator}</td>
                                        <td className="px-6 py-5">
                                            <button onClick={() => setRoutine(routine.filter((_, idx) => idx !== i))} className="text-blue-400 hover:text-blue-600 text-lg transition-all">✏</button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CreateExamRoutine;
