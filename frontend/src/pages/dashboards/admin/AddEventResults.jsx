import React, { useState } from 'react';
import { motion } from 'framer-motion';

const initialParticipants = [
    { name: 'Olivia Martin', id: 'STU-1023', score: '', status: 'Pass' },
    { name: 'Liam Harris', id: 'STU-1024', score: '', status: 'Pass' },
    { name: 'Sophia Chen', id: 'STU-1025', score: '', status: 'Pass' },
];

const AddEventResults = () => {
    const [tab, setTab] = useState('manual');
    const [rows, setRows] = useState(initialParticipants);
    const [remarks, setRemarks] = useState('');
    const [saved, setSaved] = useState(false);

    const updateRow = (i, field, value) => {
        setRows(rows.map((r, ri) => ri === i ? { ...r, [field]: value } : r));
    };

    return (
        <div className="max-w-[1100px] mx-auto space-y-12 animate-in fade-in duration-700">
            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Add Event Results</h1>
                <p className="text-lg font-medium text-slate-400 mt-2">First, select the event you want to add results for.</p>
            </div>

            {/* Event Search */}
            <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-xl">🔍</span>
                <input
                    placeholder="Search for an event by name or date..."
                    className="w-full pl-16 pr-8 py-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all font-medium text-slate-600 text-lg"
                />
            </div>

            {/* Selected Event */}
            <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Selected Event: Annual Sports Day - 2024</h2>

                {/* Tabs */}
                <div className="flex gap-0 border-b border-slate-100 mb-8">
                    {['manual', 'upload'].map(t => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`px-8 py-4 font-black text-sm border-b-2 transition-all ${tab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                        >
                            {t === 'manual' ? 'Manual Entry' : 'Upload File'}
                        </button>
                    ))}
                </div>

                {tab === 'manual' ? (
                    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        {['Participant Name', 'Student ID', 'Score / Rank', 'Status'].map(h => (
                                            <th key={h} className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {rows.map((p, i) => (
                                        <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }} className="hover:bg-slate-50/30 transition-all">
                                            <td className="px-8 py-5 font-black text-slate-800">{p.name}</td>
                                            <td className="px-8 py-5 font-medium text-slate-500 text-sm">{p.id}</td>
                                            <td className="px-8 py-5">
                                                <input
                                                    value={p.score}
                                                    onChange={e => updateRow(i, 'score', e.target.value)}
                                                    placeholder={`e.g. ${i + 1}st or ${92 - i * 7}`}
                                                    className="w-36 px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800"
                                                />
                                            </td>
                                            <td className="px-8 py-5">
                                                <select
                                                    value={p.status}
                                                    onChange={e => updateRow(i, 'status', e.target.value)}
                                                    className={`px-5 py-3 rounded-xl font-black text-sm outline-none border appearance-none cursor-pointer transition-all ${p.status === 'Pass' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}
                                                >
                                                    <option>Pass</option>
                                                    <option>Fail</option>
                                                </select>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-8 border-t border-slate-50">
                            <button onClick={() => setRows([...rows, { name: 'New Participant', id: `STU-${1025 + rows.length}`, score: '', status: 'Pass' }])} className="text-blue-600 font-black text-[11px] uppercase tracking-widest hover:underline">+ Add Participant</button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm p-16 flex flex-col items-center gap-5">
                        <span className="text-5xl">📤</span>
                        <p className="text-lg font-black text-slate-800">Upload Results File</p>
                        <p className="text-slate-400 font-medium">Accepted formats: CSV, XLSX</p>
                        <button className="px-10 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-black text-sm text-slate-600 hover:bg-slate-100 transition-all">Browse File</button>
                    </div>
                )}

                {/* Remarks */}
                <div className="mt-10 space-y-4">
                    <label className="text-lg font-black text-slate-800 tracking-tight">Overall Event Remarks</label>
                    <textarea
                        value={remarks}
                        onChange={e => setRemarks(e.target.value)}
                        rows={4}
                        placeholder="Add any summary, notes, or overall outcome of the event..."
                        className="w-full px-6 py-5 bg-white border border-slate-100 rounded-3xl shadow-sm outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700 resize-none"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 py-6">
                <button className="px-10 py-5 rounded-2xl font-black text-sm border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 transition-all">Cancel</button>
                <button onClick={() => setSaved(true)} className="px-10 py-5 rounded-2xl font-black text-sm bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                    {saved ? '✅ Results Saved!' : 'Save Results'}
                </button>
            </div>
        </div>
    );
};

export default AddEventResults;
