import React, { useState } from 'react';
import { motion } from 'framer-motion';

const payments = [
    { name: 'Olivia Chen', id: '11021', original: 500, applied: 500, newBal: 0, status: 'Paid in Full' },
    { name: 'Benjamin Carter', id: '12453', original: 750, applied: 500, newBal: 250, status: 'Partial Payment' },
    { name: 'Sophia Rodriguez', id: '10987', original: 300, applied: 350, newBal: -50, status: 'Overpayment' },
    { name: 'Liam Goldberg', id: '13004', original: 500, applied: 500, newBal: 0, status: 'Paid in Full' },
];

const statusStyles = {
    'Paid in Full': 'text-emerald-600 bg-emerald-50',
    'Partial Payment': 'text-amber-600 bg-amber-50',
    'Overpayment': 'text-rose-600 bg-rose-50',
};
const statusIcons = {
    'Paid in Full': '✅',
    'Partial Payment': '⚠️',
    'Overpayment': '🚫',
};
const rowBg = {
    'Paid in Full': 'bg-emerald-50/20',
    'Partial Payment': 'bg-amber-50/20',
    'Overpayment': 'bg-rose-50/20',
};

const FeeManagement = () => {
    const [step, setStep] = useState(3);
    const [confirmed, setConfirmed] = useState(false);

    if (confirmed) return (
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 animate-in fade-in duration-700">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-5xl shadow-xl">✅</div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Payments Processed!</h2>
            <p className="text-slate-400 font-medium">All 150 student fee payments have been confirmed and recorded.</p>
            <button onClick={() => setConfirmed(false)} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-800 transition-all">Back to Fee Management</button>
        </div>
    );

    return (
        <div className="max-w-[1200px] mx-auto space-y-12 animate-in fade-in duration-700">
            {/* Breadcrumb */}
            <p className="text-xs font-bold text-slate-400">
                Home / <span className="text-slate-600">Fee Management</span> / <span className="text-slate-600">Bulk Fee Payment</span> / <span className="text-slate-900">Step 3: Review & Confirm</span>
            </p>

            {/* Title */}
            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Review & Confirm Bulk Payment</h1>
                <p className="text-lg font-medium text-slate-400 mt-2">Please review the payment details below. This action is final and cannot be undone.</p>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center gap-4">
                {['Select Students', 'Set Payment', 'Review & Confirm'].map((label, i) => (
                    <React.Fragment key={i}>
                        <div className={`flex items-center gap-3 ${i + 1 <= step ? 'text-slate-900' : 'text-slate-300'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${i + 1 < step ? 'bg-slate-900 text-white' : i + 1 === step ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-slate-100 text-slate-400'}`}>
                                {i + 1 < step ? '✓' : i + 1}
                            </div>
                            <span className={`font-black text-sm tracking-tight ${i + 1 === step ? 'text-slate-900' : 'text-slate-400'}`}>{label}</span>
                        </div>
                        {i < 2 && <div className={`flex-1 h-px ${i + 1 < step ? 'bg-slate-900' : 'bg-slate-100'}`} />}
                    </React.Fragment>
                ))}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[['Total Students', '150', '👥'], ['Total Payment Amount', '$75,000.00', '💰'], ['Number of Warnings', '8', '⚠️']].map(([label, val, icon], i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                        <span className="text-3xl">{icon}</span>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
                            <p className="text-4xl font-black text-slate-900 tracking-tighter mt-1">{val}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Payment Table */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                {['Student Name/ID', 'Original Balance', 'Applied Payment', 'New Balance', 'Status/Warning'].map(h => (
                                    <th key={h} className="px-8 py-6 text-[11px] font-black text-slate-500 uppercase tracking-widest">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {payments.map((p, i) => (
                                <motion.tr
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    className={`${rowBg[p.status]} hover:brightness-95 transition-all`}
                                >
                                    <td className="px-8 py-5">
                                        <p className="font-black text-slate-800">{p.name}</p>
                                        <p className="text-xs font-bold text-slate-400">(ID: {p.id})</p>
                                    </td>
                                    <td className="px-8 py-5 font-bold text-slate-700">${p.original.toFixed(2)}</td>
                                    <td className="px-8 py-5 font-bold text-slate-700">${p.applied.toFixed(2)}</td>
                                    <td className="px-8 py-5">
                                        <span className={`font-black text-lg tracking-tight ${p.newBal === 0 ? 'text-emerald-600' : p.newBal < 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                                            {p.newBal < 0 ? '-' : ''}${Math.abs(p.newBal).toFixed(2)}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 w-fit ${statusStyles[p.status]}`}>
                                            {statusIcons[p.status]} {p.status}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center py-6">
                <button className="text-blue-600 font-black text-sm uppercase tracking-widest hover:underline">Cancel</button>
                <div className="flex gap-4">
                    <button className="px-10 py-5 rounded-2xl font-black text-sm border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all shadow-sm">Previous Step</button>
                    <button
                        onClick={() => setConfirmed(true)}
                        className="px-10 py-5 rounded-2xl font-black text-sm bg-slate-900 text-white shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-95 transition-all"
                    >
                        Confirm and Process Payments
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeeManagement;
