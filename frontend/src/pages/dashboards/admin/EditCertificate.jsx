import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EditCertificate = () => {
    const [type, setType] = useState('Individual');
    const [name, setName] = useState('Jane Doe');
    const [date, setDate] = useState('2024-05-28');
    const [title, setTitle] = useState('Diploma of Graduation');
    const [reason, setReason] = useState('For successfully completing the full academic curriculum and demonstrating outstanding performance in the field of Computer Science.');
    const [saved, setSaved] = useState(false);

    return (
        <div className="max-w-[1200px] mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Breadcrumb */}
            <p className="text-xs font-bold text-slate-400">
                Dashboard / <span className="text-blue-600">E-Certificates</span> / <span className="text-slate-900">Edit Certificate</span>
            </p>

            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Edit Certificate: Graduation Diploma 2024</h1>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                {/* Form */}
                <div className="lg:col-span-3 bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                    <h2 className="text-xl font-black text-slate-800 tracking-tight border-b border-slate-50 pb-6">Certificate Details</h2>

                    {/* Type Toggle */}
                    <div className="space-y-3">
                        <label className="text-[11px] font-black text-blue-600 uppercase tracking-widest">Certificate Type</label>
                        <div className="flex bg-slate-100 p-1 rounded-2xl">
                            {['Individual', 'Event'].map(t => (
                                <button key={t} onClick={() => setType(t)} className={`flex-1 py-3 rounded-xl font-black text-sm transition-all ${type === t ? 'bg-white text-slate-900 shadow' : 'text-slate-400 hover:text-slate-600'}`}>{t}</button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <label className="text-[11px] font-black text-blue-600 uppercase tracking-widest">Recipient Name</label>
                            <input value={name} onChange={e => setName(e.target.value)} className="w-full px-5 py-4 bg-amber-50/30 border border-amber-100 rounded-2xl outline-none focus:ring-4 focus:ring-amber-50 font-bold text-slate-800 transition-all" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[11px] font-black text-blue-600 uppercase tracking-widest">Date of Issue</label>
                            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-5 py-4 bg-amber-50/30 border border-amber-100 rounded-2xl outline-none focus:ring-4 focus:ring-amber-50 font-bold text-slate-800 transition-all" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[11px] font-black text-blue-600 uppercase tracking-widest">Achievement Title</label>
                        <input value={title} onChange={e => setTitle(e.target.value)} className="w-full px-5 py-4 bg-amber-50/30 border border-amber-100 rounded-2xl outline-none focus:ring-4 focus:ring-amber-50 font-bold text-slate-800 transition-all" />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[11px] font-black text-blue-600 uppercase tracking-widest">Reason for Award</label>
                        <textarea value={reason} onChange={e => setReason(e.target.value)} rows={4} className="w-full px-5 py-4 bg-amber-50/30 border border-amber-100 rounded-2xl outline-none focus:ring-4 focus:ring-amber-50 font-medium text-slate-700 resize-none transition-all" />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[11px] font-black text-blue-600 uppercase tracking-widest">Update Background Asset (Optional)</label>
                        <div className="border-2 border-dashed border-amber-200 rounded-3xl p-10 flex flex-col items-center gap-3 hover:bg-amber-50/30 transition-all cursor-pointer">
                            <span className="text-3xl">☁️</span>
                            <p className="text-sm font-bold"><span className="text-blue-600">Click to upload</span> or drag and drop</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SVG, PNG, JPG (MAX. 800x400px)</p>
                        </div>
                    </div>
                </div>

                {/* Live Preview */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6 sticky top-8">
                        <h3 className="font-black text-slate-800 tracking-tight">Live Preview</h3>
                        <motion.div
                            layout
                            className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-10 text-center space-y-4 border border-amber-100"
                        >
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">CERTIFICATE OF GRADUATION</p>
                            <div className="w-12 h-px bg-blue-200 mx-auto" />
                            <p className="text-xs font-bold text-slate-500">This is to certify that</p>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{name || 'Recipient Name'}</h2>
                            <div className="w-20 h-px bg-slate-300 mx-auto" />
                            <p className="text-xs text-slate-500 font-medium leading-relaxed px-4">{reason.slice(0, 100)}{reason.length > 100 ? '...' : ''}</p>
                            <p className="font-black text-slate-800">{title || 'Award Title'}</p>
                        </motion.div>
                        <button className="w-full py-4 rounded-2xl border-2 border-slate-100 text-sm font-black text-slate-500 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                            🔗 Preview in New Tab
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-end gap-4 py-6">
                <button className="px-10 py-5 rounded-2xl font-black text-sm text-slate-400 hover:text-slate-600 transition-all">Cancel</button>
                <button onClick={() => setSaved(true)} className="px-10 py-5 rounded-2xl font-black text-sm bg-slate-700 text-white shadow-xl hover:bg-slate-800 active:scale-95 transition-all">
                    {saved ? '✅ Saved!' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default EditCertificate;
