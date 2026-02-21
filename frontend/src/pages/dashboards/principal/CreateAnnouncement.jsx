import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CreateAnnouncement = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [publishMode, setPublishMode] = useState('now');
    const [published, setPublished] = useState(false);
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);

    return (
        <div className="max-w-[860px] mx-auto space-y-10 animate-in fade-in duration-700">
            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Create New Announcement</h1>
                <p className="text-slate-400 font-medium mt-2">Compose and publish a new announcement for the school community.</p>
            </div>

            {published ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-50 border border-emerald-100 rounded-[3rem] p-20 flex flex-col items-center gap-6 text-center">
                    <span className="text-6xl">📢</span>
                    <h2 className="text-3xl font-black text-emerald-700">Announcement Published!</h2>
                    <p className="text-emerald-600 font-bold max-w-md">Your announcement <strong>"{title || 'Untitled'}"</strong> has been sent to the selected audience.</p>
                    <button onClick={() => { setPublished(false); setTitle(''); setBody(''); }} className="px-10 py-4 bg-white border border-emerald-200 rounded-2xl font-black text-sm text-emerald-700 hover:bg-emerald-50 transition-all shadow-sm">← Create Another</button>
                </motion.div>
            ) : (
                <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">Announcement Title</label>
                        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Annual Sports Day Schedule" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all font-medium text-slate-700" />
                    </div>

                    {/* Body with mini toolbar */}
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">Announcement Body</label>
                        <div className="border border-slate-100 rounded-3xl overflow-hidden focus-within:ring-4 focus-within:ring-blue-50 focus-within:border-blue-200 transition-all bg-slate-50">
                            {/* Toolbar */}
                            <div className="flex items-center gap-1 px-4 py-3 border-b border-slate-100 bg-white">
                                {[['B', 'font-black'], ['I', 'italic'], ['U', 'underline']].map(([label, cls]) => (
                                    <button key={label} className={`w-9 h-9 rounded-xl hover:bg-slate-50 font-black text-slate-600 text-sm transition-all ${cls}`}>{label}</button>
                                ))}
                                <div className="w-px h-6 bg-slate-100 mx-2" />
                                {['≡', '⋮', '🔗', '🖼'].map(icon => (
                                    <button key={icon} className="w-9 h-9 rounded-xl hover:bg-slate-50 text-slate-600 text-sm transition-all">{icon}</button>
                                ))}
                            </div>
                            <textarea
                                value={body}
                                onChange={e => setBody(e.target.value)}
                                rows={7}
                                placeholder="Write the announcement details here..."
                                className="w-full px-6 py-5 bg-transparent outline-none font-medium text-slate-700 resize-none"
                            />
                        </div>
                    </div>

                    {/* Target Audience & Category */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700">Target Audience</label>
                            <select multiple className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800 h-36">
                                {['All Students', 'All Parents', 'All Staff', 'Grade 10', 'Grade 11', 'Grade 12', 'Teachers Only'].map(a => <option key={a}>{a}</option>)}
                            </select>
                            <p className="text-[10px] font-bold text-slate-400">Hold Ctrl/Cmd to select multiple options.</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700">Category</label>
                            <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800 appearance-none">
                                <option>General</option><option>Academic</option><option>Sports</option><option>Holiday</option><option>Emergency</option>
                            </select>
                        </div>
                    </div>

                    {/* Attach Files */}
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">Attach Files (Optional)</label>
                        <div className="border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center gap-3 hover:border-blue-300 hover:bg-blue-50/10 transition-all cursor-pointer">
                            <span className="text-3xl">📁</span>
                            <p className="text-sm font-bold"><span className="text-blue-600">Click to upload</span> or drag and drop</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PDF, DOCX, PNG, JPG (MAX. 5MB)</p>
                        </div>
                    </div>

                    {/* Publishing Options */}
                    <div className="space-y-5">
                        <label className="text-sm font-black text-slate-700 block">Publishing Options</label>
                        <div className="grid grid-cols-3 gap-4">
                            {[['now', 'Publish Now'], ['schedule', 'Schedule for Later'], ['draft', 'Save as Draft']].map(([val, label]) => (
                                <button key={val} onClick={() => setPublishMode(val)} className={`flex items-center gap-3 p-5 rounded-2xl border-2 text-left transition-all text-sm font-black ${publishMode === val ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'}`}>
                                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${publishMode === val ? 'border-blue-600' : 'border-slate-300'}`}>
                                        {publishMode === val && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                                    </div>
                                    {label}
                                </button>
                            ))}
                        </div>
                        {publishMode === 'schedule' && (
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-600">Schedule Date</label>
                                    <input type="date" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-600">Schedule Time</label>
                                    <input type="time" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-4 pt-4 border-t border-slate-50">
                        <button className="px-10 py-5 rounded-2xl font-black text-sm text-slate-400 hover:text-slate-600 transition-all">Cancel</button>
                        <button onClick={() => setPublished(true)} className="px-10 py-5 rounded-2xl font-black text-sm bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                            {publishMode === 'draft' ? '💾 Save as Draft' : publishMode === 'schedule' ? '⏱ Schedule Announcement' : '📢 Publish Announcement'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateAnnouncement;
