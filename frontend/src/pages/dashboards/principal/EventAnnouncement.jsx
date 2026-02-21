import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AUDIENCE_OPTIONS = ['All Students', 'All Parents', 'All Staff', 'Grade 10', 'Grade 11', 'Grade 12', 'Teachers'];

const EventAnnouncement = () => {
    const [tags, setTags] = useState(['All Students', 'All Parents', 'Grade 12']);
    const [showDropdown, setShowDropdown] = useState(false);
    const [body, setBody] = useState(`Dear School Community,\nWe are excited to announce our Annual Sports Day!\n\nDate: October 26, 2024\nTime: 9:00 AM - 3:00 PM\nLocation: School Athletic Grounds`);
    const [title, setTitle] = useState('Annual Sports Day 2024');
    const [includeLink, setIncludeLink] = useState(true);
    const [delivery, setDelivery] = useState('now');
    const [sent, setSent] = useState(false);

    const addTag = (t) => { if (!tags.includes(t)) setTags([...tags, t]); setShowDropdown(false); };
    const removeTag = (t) => setTags(tags.filter(x => x !== t));

    return (
        <div className="max-w-[900px] mx-auto space-y-10 animate-in fade-in duration-700">
            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Create Announcement for 'Annual Sports Day'</h1>
                <p className="text-slate-400 font-medium mt-2">Compose and schedule communications for the school community.</p>
            </div>

            {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-50 border border-emerald-100 rounded-[3rem] p-20 flex flex-col items-center gap-6 text-center">
                    <span className="text-6xl">📣</span>
                    <h2 className="text-3xl font-black text-emerald-700">Announcement Sent!</h2>
                    <p className="text-emerald-600 font-bold max-w-md">Your announcement has been dispatched to all selected recipients.</p>
                    <button onClick={() => setSent(false)} className="px-10 py-4 bg-white border border-emerald-200 rounded-2xl font-black text-sm text-emerald-700 hover:bg-emerald-50 transition-all shadow-sm">← Create Another</button>
                </motion.div>
            ) : (
                <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-10">
                    {/* Compose Message */}
                    <div className="space-y-8">
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">Compose Message</h2>

                        {/* Title */}
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700">Announcement Title</label>
                            <input value={title} onChange={e => setTitle(e.target.value)}
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800" />
                        </div>

                        {/* Audience Tags */}
                        <div className="space-y-3">
                            <label className="text-sm font-black text-slate-700">Audience / Recipients</label>
                            <div className="flex flex-wrap gap-3 items-center">
                                <AnimatePresence>
                                    {tags.map(t => (
                                        <motion.span key={t} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 border border-blue-100 text-blue-700 rounded-xl font-black text-sm">
                                            {t}
                                            <button onClick={() => removeTag(t)} className="text-blue-400 hover:text-blue-700 font-black">×</button>
                                        </motion.span>
                                    ))}
                                </AnimatePresence>
                                <div className="relative">
                                    <button onClick={() => setShowDropdown(!showDropdown)}
                                        className="flex items-center gap-1 px-5 py-2.5 border-2 border-dashed border-slate-200 rounded-xl font-black text-sm text-slate-400 hover:border-blue-300 hover:text-blue-500 transition-all">
                                        + Add Audience
                                    </button>
                                    <AnimatePresence>
                                        {showDropdown && (
                                            <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                className="absolute top-full mt-2 left-0 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 overflow-hidden min-w-[180px]">
                                                {AUDIENCE_OPTIONS.filter(a => !tags.includes(a)).map(a => (
                                                    <button key={a} onClick={() => addTag(a)}
                                                        className="block w-full text-left px-5 py-3 font-bold text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all">
                                                        {a}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700">Announcement Body</label>
                            <div className="border border-slate-100 rounded-3xl overflow-hidden focus-within:ring-4 focus-within:ring-blue-50 transition-all">
                                <div className="flex items-center gap-1 px-5 py-3 border-b border-slate-100 bg-slate-50">
                                    {['B', 'I', '≡', '⋮', '🔗'].map((icon, i) => (
                                        <button key={i} className={`w-9 h-9 rounded-lg hover:bg-white font-black text-slate-600 text-sm transition-all ${i === 0 ? 'font-black' : i === 1 ? 'italic' : ''}`}>{icon}</button>
                                    ))}
                                </div>
                                <textarea value={body} onChange={e => setBody(e.target.value)} rows={7}
                                    className="w-full px-6 py-5 bg-white outline-none font-medium text-slate-700 resize-none text-sm" />
                            </div>
                        </div>

                        {/* Include Event Link */}
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={includeLink} onChange={e => setIncludeLink(e.target.checked)}
                                className="w-5 h-5 rounded accent-blue-600" />
                            <span className="font-bold text-slate-700 text-sm">Include Event Link</span>
                        </label>
                    </div>

                    <div className="h-px bg-slate-50" />

                    {/* Delivery Options */}
                    <div className="space-y-5">
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">Delivery Options</h2>
                        <div className="grid grid-cols-2 gap-5">
                            {[['now', 'Send Now', 'Dispatch the announcement immediately.'], ['schedule', 'Schedule for Later', 'Choose a specific date and time to send.']].map(([val, label, desc]) => (
                                <button key={val} onClick={() => setDelivery(val)}
                                    className={`flex items-start gap-4 p-6 rounded-2xl border-2 text-left transition-all ${delivery === val ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}>
                                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 ${delivery === val ? 'border-blue-600' : 'border-slate-300'}`}>
                                        {delivery === val && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-800">{label}</p>
                                        <p className="text-[11px] font-medium text-slate-400 mt-1">{desc}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                        {delivery === 'schedule' && (
                            <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-600">Date</label>
                                    <input type="date" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-600">Time</label>
                                    <input type="time" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800" />
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-4 pt-4 border-t border-slate-50">
                        <button className="px-10 py-5 rounded-2xl font-black text-sm text-slate-400 hover:text-slate-600 transition-all">Cancel</button>
                        <button onClick={() => setSent(true)}
                            className="flex items-center gap-2 px-10 py-5 rounded-2xl font-black text-sm bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                            ▶ {delivery === 'schedule' ? 'Schedule Announcement' : 'Send Announcement'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventAnnouncement;
