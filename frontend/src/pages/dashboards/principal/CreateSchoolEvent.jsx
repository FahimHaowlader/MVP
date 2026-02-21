import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CreateSchoolEvent = () => {
    const [form, setForm] = useState({
        title: '', desc: '', start: '', end: '', location: '', meetingLink: '',
        speakers: '', category: 'Academic', audience: [], attendance: 'Mandatory', banner: null,
    });
    const [published, setPublished] = useState(false);

    const toggleAudience = (a) => setForm(f => ({
        ...f,
        audience: f.audience.includes(a) ? f.audience.filter(x => x !== a) : [...f.audience, a],
    }));

    if (published) return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[700px] mx-auto text-center space-y-8 pt-24">
            <span className="text-6xl">🎉</span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Event Published!</h2>
            <p className="text-slate-400 font-bold">Your event is now live and visible to the school community.</p>
            <button onClick={() => setPublished(false)} className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">← Create Another Event</button>
        </motion.div>
    );

    return (
        <div className="max-w-[900px] mx-auto space-y-10 animate-in fade-in duration-700 pb-16">
            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Create New School Event</h1>
                <p className="text-slate-400 font-medium mt-2">Fill in the details below to schedule a new event for the school community.</p>
            </div>

            <div className="space-y-8">
                {/* Event Title */}
                <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700">Event Title</label>
                    <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                        placeholder="e.g., Annual Science Fair"
                        className="w-full px-6 py-5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 font-medium text-slate-700 shadow-sm transition-all" />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700">Event Description</label>
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                        <div className="flex gap-4 px-5 py-3 border-b border-slate-100">
                            {['B', 'I', '≡', '≡≡', '🔗'].map(t => (
                                <button key={t} className="font-black text-slate-400 hover:text-blue-600 transition-all text-sm px-2 py-1 rounded-lg hover:bg-blue-50">{t}</button>
                            ))}
                        </div>
                        <textarea rows={5} value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })}
                            placeholder="Provide a full description of the event, including activities, goals, etc."
                            className="w-full px-6 py-5 outline-none font-medium text-slate-700 resize-none" />
                    </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">Start Date &amp; Time</label>
                        <input type="datetime-local" value={form.start} onChange={e => setForm({ ...form, start: e.target.value })}
                            className="w-full px-6 py-5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 font-medium text-slate-700 shadow-sm" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">End Date &amp; Time</label>
                        <input type="datetime-local" value={form.end} onChange={e => setForm({ ...form, end: e.target.value })}
                            className="w-full px-6 py-5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 font-medium text-slate-700 shadow-sm" />
                    </div>
                </div>

                {/* Location */}
                <div className="space-y-3">
                    <label className="text-sm font-black text-slate-700">Location / Venue</label>
                    <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                        placeholder="e.g., School Auditorium"
                        className="w-full px-6 py-5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 font-medium text-slate-700 shadow-sm" />
                    <input value={form.meetingLink} onChange={e => setForm({ ...form, meetingLink: e.target.value })}
                        placeholder="🔗 Add online meeting link (optional)"
                        className="w-full px-6 py-5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 font-medium text-slate-500 shadow-sm" />
                </div>

                {/* Speakers + Category */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">Speakers / Performers <span className="text-slate-400 font-medium">(Optional)</span></label>
                        <input value={form.speakers} onChange={e => setForm({ ...form, speakers: e.target.value })}
                            placeholder="e.g., Jane Doe, John Smith"
                            className="w-full px-6 py-5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 font-medium text-slate-700 shadow-sm" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">Event Category</label>
                        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                            className="w-full px-6 py-5 bg-white border border-slate-200 rounded-2xl outline-none font-bold text-slate-700 shadow-sm appearance-none">
                            {['Academic', 'Sports', 'Arts & Culture', 'Community', 'Staff'].map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                {/* Audience + Attendance */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <label className="text-sm font-black text-slate-700">Target Audience</label>
                        <div className="grid grid-cols-2 gap-3">
                            {['Students', 'Teachers', 'Parents', 'Staff'].map(a => (
                                <label key={a} className="flex items-center gap-3 cursor-pointer group">
                                    <div onClick={() => toggleAudience(a)}
                                        className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${form.audience.includes(a) ? 'bg-blue-600 border-blue-600' : 'border-slate-300 group-hover:border-blue-400'}`}>
                                        {form.audience.includes(a) && <span className="text-white text-[10px] font-black">✓</span>}
                                    </div>
                                    <span className="font-bold text-slate-700 text-sm">{a}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="text-sm font-black text-slate-700">Attendance</label>
                        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit">
                            {['Mandatory', 'Optional'].map(opt => (
                                <button key={opt} onClick={() => setForm({ ...form, attendance: opt })}
                                    className={`px-8 py-3 rounded-xl font-black text-sm transition-all ${form.attendance === opt ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Banner Upload */}
                <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700">Upload Image / Banner</label>
                    <div className="w-full border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center gap-4 bg-white hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer">
                        <span className="text-4xl">☁️</span>
                        <p className="font-bold text-blue-600 text-sm"><span className="underline">Click to upload</span> <span className="text-slate-400">or drag and drop</span></p>
                        <p className="text-[11px] font-bold text-slate-400">PNG, JPG or GIF (MAX. 800×400px)</p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
                <button className="px-10 py-5 font-black text-sm text-slate-500 hover:text-slate-700 transition-all">Cancel</button>
                <button className="px-10 py-5 bg-white border border-slate-200 rounded-2xl font-black text-sm text-slate-600 hover:bg-slate-50 shadow-sm transition-all">Save as Draft</button>
                <button onClick={() => setPublished(true)}
                    className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                    Publish Event
                </button>
            </div>
        </div>
    );
};

export default CreateSchoolEvent;
