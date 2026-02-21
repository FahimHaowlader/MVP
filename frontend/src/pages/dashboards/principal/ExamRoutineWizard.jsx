import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = ['Routine Details', 'Add Exams', 'Review & Publish'];

const ExamRoutineWizard = () => {
    const [step, setStep] = useState(1);
    const [examType, setExamType] = useState('');
    const [period, setPeriod] = useState('');
    const [grade, setGrade] = useState('');
    const [section, setSection] = useState('');
    const [desc, setDesc] = useState('');
    const [published, setPublished] = useState(false);

    const progress = ((step - 1) / (STEPS.length - 1)) * 100;

    if (published) return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[700px] mx-auto text-center space-y-8 pt-24">
            <span className="text-6xl">🎓</span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Exam Routine Published!</h2>
            <p className="text-slate-400 font-bold">The routine is now visible to all teachers and students.</p>
            <button onClick={() => { setPublished(false); setStep(1); }} className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">← Create Another</button>
        </motion.div>
    );

    return (
        <div className="max-w-[900px] mx-auto space-y-10 animate-in fade-in duration-700">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Create New Exam Routine</h1>

            {/* Progress */}
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-black text-slate-700">Step {step} of {STEPS.length}: {STEPS[step - 1]}</p>
                    {step < STEPS.length && <p className="text-[11px] font-bold text-slate-400">Next: {STEPS[step]}</p>}
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: 'easeOut' }} className="h-full bg-blue-600 rounded-full" />
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                        <div>
                            <h2 className="text-xl font-black text-slate-800">Step 1: Routine Details</h2>
                            <p className="text-slate-400 font-medium text-sm mt-1">Fill in the basic details for the exam routine.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700">Exam Type</label>
                                <select value={examType} onChange={e => setExamType(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 font-bold text-slate-700 appearance-none">
                                    <option value="">Select exam type</option>
                                    {['Mid-Term', 'Final', 'Unit Test', 'Mock Exam'].map(t => <option key={t}>{t}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700">Academic Year/Term</label>
                                <select value={period} onChange={e => setPeriod(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 font-bold text-slate-700 appearance-none">
                                    <option value="">Select academic period</option>
                                    {['2024-2025 Term 1', '2024-2025 Term 2', '2023-2024'].map(p => <option key={p}>{p}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700">Select Class/Grade</label>
                                <select value={grade} onChange={e => setGrade(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 font-bold text-slate-700 appearance-none">
                                    <option value="">Select a class</option>
                                    {['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(g => <option key={g}>{g}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700">Select Section</label>
                                <select value={section} onChange={e => setSection(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 font-bold text-slate-700 appearance-none">
                                    <option value="">Select a section</option>
                                    {['Section A', 'Section B', 'Section C'].map(s => <option key={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700">Routine Description <span className="text-slate-400 font-medium">(Optional)</span></label>
                            <textarea rows={4} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Enter any specific notes or instructions..." className="w-full px-5 py-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-blue-50 font-medium text-slate-700 resize-none" />
                        </div>
                    </motion.div>
                )}
                {step === 2 && (
                    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="bg-white p-20 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col items-center gap-6 text-center">
                        <span className="text-5xl">📋</span>
                        <h3 className="text-2xl font-black text-slate-800">Add Exams</h3>
                        <p className="text-slate-400 font-medium">Add individual exam entries for this routine (subjects, dates, rooms, invigilators).</p>
                    </motion.div>
                )}
                {step === 3 && (
                    <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="bg-white p-20 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col items-center gap-6 text-center">
                        <span className="text-5xl">👁</span>
                        <h3 className="text-2xl font-black text-slate-800">Review & Publish</h3>
                        <p className="text-slate-400 font-medium">Review all details before publishing the exam routine.</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex justify-between items-center pt-4">
                <button onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1} className="px-10 py-5 rounded-2xl font-black text-sm border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all">Cancel</button>
                {step < STEPS.length ? (
                    <button onClick={() => setStep(step + 1)} className="px-10 py-5 rounded-2xl font-black text-sm bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                        Next: {STEPS[step]} →
                    </button>
                ) : (
                    <button onClick={() => setPublished(true)} className="px-10 py-5 rounded-2xl font-black text-sm bg-emerald-600 text-white shadow-xl shadow-emerald-100 hover:bg-emerald-700 active:scale-95 transition-all">🚀 Publish Routine</button>
                )}
            </div>
        </div>
    );
};

export default ExamRoutineWizard;
