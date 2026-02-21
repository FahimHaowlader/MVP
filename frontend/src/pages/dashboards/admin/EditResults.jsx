import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const participants = [
    { name: 'John Smith', id: 'S12345', score: 88, rank: 1, status: 'Pass' },
    { name: 'Jane Doe', id: 'S12346', score: 85, rank: 2, status: 'Pass' },
    { name: 'Peter Jones', id: 'S12347', score: 72, rank: 3, status: 'Pass' },
    { name: 'Mary Williams', id: 'S12348', score: 45, rank: 4, status: 'Fail' },
];

const history = [
    {
        change: 'Change by Robert Brown',
        time: '2024-05-20, 10:15 AM',
        detail: <>For participant <strong>Peter Jones (S12347)</strong>, the Score was changed from <span className="bg-rose-100 text-rose-600 px-2 py-0.5 rounded font-black text-[11px]">72</span> to <span className="bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded font-black text-[11px]">75</span>.</>,
    },
    {
        change: 'Change by Robert Brown',
        time: '2024-05-19, 02:30 PM',
        detail: <>For participant <strong>Mary Williams (S12348)</strong>, the Status was changed from <span className="bg-rose-100 text-rose-600 px-2 py-0.5 rounded font-black text-[11px]">Fail</span> to <span className="bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded font-black text-[11px]">Pass</span>.</>,
    },
    { change: 'Initial Results Uploaded by Susan Davis', time: '2024-05-18, 09:00 AM', detail: null },
];

const EditResults = () => {
    const [rows, setRows] = useState(participants);
    const [showHistory, setShowHistory] = useState(true);
    const [search, setSearch] = useState('');
    const [saved, setSaved] = useState(false);

    const updateRow = (i, field, value) => {
        setRows(rows.map((r, ri) => ri === i ? { ...r, [field]: value } : r));
    };

    const filtered = rows.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-[1200px] mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Breadcrumb */}
            <p className="text-xs font-bold text-slate-400">
                Events / <span className="text-blue-600">Annual Sports Day</span> / <span className="text-slate-900">Edit Results</span>
            </p>

            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Edit Results: Annual Sports Day</h1>
                <button onClick={() => setShowHistory(!showHistory)} className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm font-black text-[11px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
                    🕐 Version History
                </button>
            </div>

            {/* Version History Panel */}
            <AnimatePresence>
                {showHistory && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden"
                    >
                        <div className="p-10 space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-black text-slate-800">Version History</h3>
                                <button onClick={() => setShowHistory(false)} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all font-bold">✕</button>
                            </div>
                            <div className="space-y-5">
                                {history.map((h, i) => (
                                    <div key={i} className="flex gap-5">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 mt-1">🔄</div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-2">
                                                <p className="font-black text-slate-800 text-sm">{h.change}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h.time}</p>
                                            </div>
                                            {h.detail && (
                                                <div className="bg-slate-50 rounded-2xl px-6 py-4 text-sm font-medium text-slate-600">
                                                    {h.detail}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Participant Table */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50">
                    <div className="relative max-w-sm">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search by participant name or ID"
                            className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-slate-100 font-medium text-slate-600"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                {['Participant Name', 'Participant ID', 'Score', 'Rank', 'Status'].map(h => (
                                    <th key={h} className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.map((p, i) => (
                                <tr key={i} className={`hover:bg-slate-50/30 transition-all ${p.status === 'Fail' ? 'bg-rose-50/20' : ''}`}>
                                    <td className="px-8 py-5 font-black text-slate-800">{p.name}</td>
                                    <td className="px-8 py-5 font-medium text-slate-400 text-sm">{p.id}</td>
                                    <td className="px-8 py-5">
                                        <input type="number" value={p.score}
                                            onChange={e => updateRow(i, 'score', e.target.value)}
                                            className="w-24 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-slate-100 font-black text-slate-800 text-center" />
                                    </td>
                                    <td className="px-8 py-5">
                                        <input type="number" value={p.rank}
                                            onChange={e => updateRow(i, 'rank', e.target.value)}
                                            className="w-20 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-slate-100 font-black text-slate-800 text-center" />
                                    </td>
                                    <td className="px-8 py-5">
                                        <select value={p.status} onChange={e => updateRow(i, 'status', e.target.value)}
                                            className={`px-5 py-3 rounded-xl font-black text-sm outline-none border appearance-none cursor-pointer ${p.status === 'Pass' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                            <option>Pass</option>
                                            <option>Fail</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bulk Update */}
            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Bulk Update & Remarks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <label className="text-sm font-black text-slate-700">Upload Batch Results File</label>
                        <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center gap-3 hover:border-blue-300 hover:bg-blue-50/10 transition-all cursor-pointer">
                            <span className="text-3xl">📤</span>
                            <p className="text-sm font-bold"><span className="text-blue-600">Upload a file</span> or drag and drop</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accepted formats: CSV, XLSX</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <label className="text-sm font-black text-slate-700">Overall Event Remarks</label>
                        <textarea rows={7} placeholder="Add summary notes or general comments about the event results..." className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-slate-100 font-medium text-slate-600 resize-none" />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 py-6">
                <button className="px-10 py-5 rounded-2xl font-black text-sm text-slate-400 hover:text-slate-600 transition-all">Cancel</button>
                <button onClick={() => setSaved(true)} className="px-10 py-5 rounded-2xl font-black text-sm bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                    {saved ? '✅ Saved!' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default EditResults;
