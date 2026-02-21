import React, { useState } from 'react';
import { motion } from 'framer-motion';

const templates = [
    { name: 'Achievement', desc: 'Official recognition', color: 'from-amber-50 to-orange-50', border: 'border-amber-200' },
    { name: 'Participation', desc: 'For event completion', color: 'from-stone-50 to-neutral-100', border: 'border-stone-200' },
    { name: 'Excellence', desc: 'Subject-specific award', color: 'from-slate-50 to-blue-50', border: 'border-slate-200' },
];

const ECertificateCreator = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(0);
    const [name, setName] = useState('');
    const [award, setAward] = useState('');
    const [reason, setReason] = useState('');
    const [date, setDate] = useState('');
    const [preview, setPreview] = useState(false);

    return (
        <div className="max-w-[900px] mx-auto space-y-10 animate-in fade-in duration-700">
            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">E-Certificate Creator</h1>
                <p className="text-lg font-medium text-slate-400 mt-2">Follow the steps below to create a new certificate.</p>
            </div>

            {/* Step 1 — Template */}
            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black shadow-lg shadow-blue-100">1</div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Select a Template</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {templates.map((t, i) => (
                        <motion.button
                            key={i}
                            whileHover={{ y: -4 }}
                            onClick={() => setSelectedTemplate(i)}
                            className={`rounded-3xl border-2 overflow-hidden transition-all ${selectedTemplate === i ? 'border-blue-600 ring-4 ring-blue-100' : `${t.border} hover:border-slate-300`}`}
                        >
                            <div className={`h-44 bg-gradient-to-br ${t.color} flex flex-col items-center justify-center gap-2 p-4`}>
                                <div className="text-center space-y-1 opacity-60 pointer-events-none select-none">
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">CERTIFICATE OF</p>
                                    <p className="text-lg font-black text-slate-700">{t.name.toUpperCase()}</p>
                                    <div className="w-16 h-px bg-slate-400/30 mx-auto" />
                                    <p className="text-[8px] text-slate-400">________________</p>
                                    <div className="w-8 h-8 rounded-full bg-amber-400/40 flex items-center justify-center text-lg mx-auto mt-2">🏅</div>
                                </div>
                            </div>
                            <div className="p-4 text-left border-t border-slate-100 bg-white">
                                <p className="font-black text-slate-800 tracking-tight">{t.name}</p>
                                <p className="text-[10px] text-blue-600 font-bold mt-1">{t.desc}</p>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Step 2 — Customize */}
            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black shadow-lg shadow-blue-100">2</div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Customize Text Fields</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-sm font-black text-slate-700">Student Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Jane Doe" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-sm font-black text-slate-700">Achievement / Award</label>
                        <input value={award} onChange={e => setAward(e.target.value)} placeholder="e.g., First Place in Science Fair" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700" />
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-sm font-black text-slate-700">Reason (optional)</label>
                    <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3} placeholder="For outstanding contribution and innovative research..." className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700 resize-none" />
                </div>
                <div className="space-y-3 max-w-xs">
                    <label className="text-sm font-black text-slate-700">Date of Issue</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-black text-slate-700" />
                </div>
            </div>

            {/* Step 3 — Assets */}
            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black shadow-lg shadow-blue-100">3</div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Upload or Select Assets</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[['School Logo', 'PNG, JPG, or SVG (MAX. 2MB)'], ['Digital Signature', 'PNG with transparent background']].map(([label, hint]) => (
                        <div key={label} className="space-y-3">
                            <label className="text-sm font-black text-slate-700">{label}</label>
                            <div className="border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center gap-3 hover:border-blue-300 hover:bg-blue-50/20 transition-all cursor-pointer group">
                                <span className="text-3xl group-hover:scale-110 transition-transform">☁️</span>
                                <p className="text-sm font-bold text-center"><span className="text-blue-600">Click to upload</span> or drag and drop</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{hint}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 py-6">
                <button onClick={() => setPreview(true)} className="px-10 py-5 rounded-2xl font-black text-sm border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all shadow-sm">Generate Preview</button>
                <button className="px-10 py-5 rounded-2xl font-black text-sm text-slate-400 hover:text-slate-600 transition-all">Cancel</button>
                <button className="px-10 py-5 rounded-2xl font-black text-sm bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">Create Certificate</button>
            </div>

            {/* Preview Modal */}
            {preview && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-8">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-[3rem] p-16 max-w-2xl w-full shadow-2xl text-center space-y-6 border border-amber-200">
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">CERTIFICATE OF {templates[selectedTemplate].name.toUpperCase()}</p>
                        <div className="w-16 h-px bg-slate-300 mx-auto" />
                        <p className="text-sm font-bold text-slate-500">This is to certify that</p>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">{name || 'Student Name'}</h2>
                        <div className="w-32 h-px bg-slate-300 mx-auto" />
                        <p className="text-slate-600 font-medium max-w-sm mx-auto">{reason || 'has demonstrated outstanding achievement and excellence.'}</p>
                        <p className="text-xl font-black text-slate-800">{award || 'Award Title'}</p>
                        <p className="text-sm font-bold text-slate-400">{date || 'Date of Issue'}</p>
                        <button onClick={() => setPreview(false)} className="mt-4 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all">Close Preview</button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ECertificateCreator;
