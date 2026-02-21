import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TOTAL_STEPS = 4;

const CreateNewEvent = () => {
    const [step, setStep] = useState(3);
    const [speakers, setSpeakers] = useState([{ name: '', role: '' }]);
    const [description, setDescription] = useState('');
    const [published, setPublished] = useState(false);

    const addSpeaker = () => setSpeakers([...speakers, { name: '', role: '' }]);
    const removeSpeaker = (i) => setSpeakers(speakers.filter((_, idx) => idx !== i));
    const updateSpeaker = (i, field, val) => setSpeakers(speakers.map((s, idx) => idx === i ? { ...s, [field]: val } : s));

    const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

    const stepLabels = ['Basic Info', 'Schedule & Location', 'Content & Media', 'Review & Publish'];

    if (published) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[700px] mx-auto text-center space-y-8 pt-20">
                <span className="text-6xl">🎉</span>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Event Published!</h2>
                <p className="text-slate-400 font-bold">Your new event is now live for the school community.</p>
                <button onClick={() => { setPublished(false); setStep(3); }} className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">
                    ← Create Another Event
                </button>
            </motion.div>
        );
    }

    return (
        <div className="max-w-[860px] mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Progress */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-black text-slate-500 uppercase tracking-widest">Step {step} of {TOTAL_STEPS}</p>
                    <div className="flex gap-3">
                        {stepLabels.map((l, i) => (
                            <button key={i} onClick={() => setStep(i + 1)}
                                className={`text-[10px] font-black px-4 py-2 rounded-xl transition-all ${step === i + 1 ? 'bg-blue-600 text-white' : step > i + 1 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                {step > i + 1 ? '✓' : l}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="h-full bg-blue-600 rounded-full"
                    />
                </div>
            </div>

            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Create New Event</h1>
                <p className="text-slate-400 font-bold mt-2">Step {step}: {stepLabels[step - 1]}</p>
            </div>

            <AnimatePresence mode="wait">
                {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-10">

                        {/* Event Description */}
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-xl font-black text-slate-800 tracking-tight">Event Description</h2>
                                <p className="text-slate-400 font-medium text-sm mt-1">Provide a detailed description of the event. Use the tools to format text, add lists, and include links.</p>
                            </div>
                            <div className="border border-slate-100 rounded-3xl overflow-hidden focus-within:ring-4 focus-within:ring-blue-50 transition-all">
                                <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100 bg-slate-50">
                                    {['B', 'I', '≡', '⋮', '🔗'].map((icon, i) => (
                                        <button key={i} className={`w-9 h-9 rounded-lg hover:bg-white font-black text-slate-600 text-sm transition-all ${i === 0 ? 'font-black' : i === 1 ? 'italic' : ''}`}>{icon}</button>
                                    ))}
                                </div>
                                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={7}
                                    placeholder="Enter event details here..."
                                    className="w-full px-6 py-5 bg-white outline-none font-medium text-slate-700 resize-y text-sm" />
                            </div>
                        </div>

                        {/* Speakers */}
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-xl font-black text-slate-800 tracking-tight">Speakers / Performers <span className="text-slate-400 font-bold text-base">(Optional)</span></h2>
                                <p className="text-slate-400 font-medium text-sm mt-1">Add the names and roles of any key participants.</p>
                            </div>
                            <div className="space-y-4">
                                {speakers.map((s, i) => (
                                    <div key={i} className="flex gap-4">
                                        <input value={s.name} onChange={e => updateSpeaker(i, 'name', e.target.value)}
                                            placeholder="Speaker/Performer Name"
                                            className="flex-1 px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700" />
                                        <input value={s.role} onChange={e => updateSpeaker(i, 'role', e.target.value)}
                                            placeholder="Role (e.g., Keynote Speaker)"
                                            className="flex-1 px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700" />
                                        <button onClick={() => removeSpeaker(i)}
                                            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all text-xl">
                                            🗑
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button onClick={addSpeaker}
                                className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-2xl font-black text-sm hover:bg-blue-100 transition-all border border-blue-100">
                                ⊕ Add Speaker
                            </button>
                        </div>

                        {/* Banner Image */}
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-xl font-black text-slate-800 tracking-tight">Event Banner Image</h2>
                                <p className="text-slate-400 font-medium text-sm mt-1">Drag and drop an image or click to upload. Recommended dimensions: 1200x600px. Max file size: 5MB.</p>
                            </div>
                            <div className="border-2 border-dashed border-slate-200 rounded-3xl p-16 flex flex-col items-center gap-4 hover:border-blue-300 hover:bg-blue-50/10 transition-all cursor-pointer">
                                <span className="text-5xl text-slate-300">📁</span>
                                <p className="font-black text-slate-600">Drag & drop your file here</p>
                                <p className="text-slate-400 font-medium text-sm">or</p>
                                <button className="px-8 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-sm hover:bg-slate-200 transition-all">Browse Files</button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step !== 3 && (
                    <motion.div key={`step-${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="bg-white p-20 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col items-center gap-6 text-center">
                        <span className="text-5xl">{['📝', '📍', '🏷', '👁'][step - 1]}</span>
                        <h3 className="text-2xl font-black text-slate-800">{stepLabels[step - 1]}</h3>
                        <p className="text-slate-400 font-medium">This step would contain fields for {stepLabels[step - 1].toLowerCase()}.</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
                <button onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}
                    className="px-10 py-5 rounded-2xl font-black text-sm border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all">
                    ← Previous: {stepLabels[step - 2] || ''}
                </button>
                {step < TOTAL_STEPS ? (
                    <button onClick={() => setStep(step + 1)}
                        className="px-10 py-5 rounded-2xl font-black text-sm bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                        Next: {stepLabels[step]} →
                    </button>
                ) : (
                    <button onClick={() => setPublished(true)}
                        className="px-10 py-5 rounded-2xl font-black text-sm bg-emerald-600 text-white shadow-xl shadow-emerald-100 hover:bg-emerald-700 active:scale-95 transition-all">
                        🚀 Review & Publish
                    </button>
                )}
            </div>
        </div>
    );
};

export default CreateNewEvent;
