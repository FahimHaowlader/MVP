import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TOTAL_STEPS = 5;
const CURRENT_STEP = 3;

const UploadPayments = () => {
    const [tab, setTab] = useState('file');
    const [applyTo, setApplyTo] = useState('oldest');
    const [manualRows] = useState([
        { name: 'Olivia Chen', id: '11021', amount: '' },
        { name: 'Benjamin Carter', id: '12453', amount: '' },
        { name: 'Sophia Rodriguez', id: '10987', amount: '' },
    ]);
    const [processed, setProcessed] = useState(false);

    const progress = ((CURRENT_STEP - 1) / (TOTAL_STEPS - 1)) * 100;

    return (
        <div className="max-w-[900px] mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Progress Bar */}
            <div className="space-y-3">
                <p className="text-sm font-black text-slate-500 uppercase tracking-widest">Step {CURRENT_STEP} of {TOTAL_STEPS}</p>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-blue-600 rounded-full"
                    />
                </div>
            </div>

            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Step 3: Upload & Apply Payments</h1>

            {/* Main Panel */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                {/* Sub-tabs */}
                <div className="flex border-b border-slate-100 px-10">
                    {[['file', 'Apply from File'], ['manual', 'Apply Manually']].map(([val, label]) => (
                        <button
                            key={val}
                            onClick={() => setTab(val)}
                            className={`px-8 py-5 font-black text-sm border-b-2 transition-all ${tab === val ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className="p-12 space-y-10">
                    {tab === 'file' ? (
                        <>
                            {/* Upload Block */}
                            <div>
                                <h3 className="text-xl font-black text-slate-800 mb-6 tracking-tight">Upload Payment File</h3>
                                <div className="border-2 border-dashed border-slate-200 rounded-3xl p-16 flex flex-col items-center gap-5 hover:border-blue-300 hover:bg-blue-50/10 transition-all cursor-pointer">
                                    <p className="text-xl font-black text-slate-700">Drag & drop your payment spreadsheet here</p>
                                    <p className="text-sm font-bold text-slate-400">Accepted: .XLSX, .CSV. Max file size: 5MB</p>
                                    <button className="px-8 py-4 bg-slate-100 text-slate-700 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all">Browse Files</button>
                                </div>
                            </div>

                            {/* Rules */}
                            <div>
                                <h3 className="text-xl font-black text-slate-800 mb-6 tracking-tight">Define Payment Application Rules</h3>
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-600">Match Students By:</label>
                                        <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-800 appearance-none">
                                            <option>Student ID</option><option>Student Name</option><option>Roll Number</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-600">Map Payment Amount Column:</label>
                                        <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-800 appearance-none">
                                            <option>Column D - "Amount Paid"</option><option>Column C - "Payment"</option><option>Column E - "Total"</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-600">Apply Payments Towards:</label>
                                    <div className="flex gap-8">
                                        {[['oldest', 'Oldest Due Fee'], ['specific', 'Specific Fee Type']].map(([val, label]) => (
                                            <button key={val} onClick={() => setApplyTo(val)} className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${applyTo === val ? 'border-blue-600' : 'border-slate-300'}`}>
                                                    {applyTo === val && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                                                </div>
                                                <span className="font-bold text-slate-700">{label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-6">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">Manual Payment Entry</h3>
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 rounded-2xl">
                                        <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Student Name</th>
                                        <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                                        <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Amount ($)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {manualRows.map((r, i) => (
                                        <tr key={i}>
                                            <td className="px-6 py-5 font-black text-slate-800">{r.name}</td>
                                            <td className="px-6 py-5 font-bold text-slate-400 text-sm">{r.id}</td>
                                            <td className="px-6 py-5">
                                                <input placeholder="0.00" className="w-32 px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 font-bold text-slate-800 text-center" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
                <button className="px-10 py-5 rounded-2xl font-black text-sm border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all">Previous Step</button>
                <div className="flex gap-4">
                    <button onClick={() => setProcessed(true)} className="px-10 py-5 rounded-2xl font-black text-sm bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all">
                        {processed ? '✅ Processed' : 'Process Upload'}
                    </button>
                    <button className="px-10 py-5 rounded-2xl font-black text-sm bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">Next Step</button>
                </div>
            </div>
        </div>
    );
};

export default UploadPayments;
