import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';

const StudentFinanceSection = () => {
    const { user } = useAuth();
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFees = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`https://mvp-gilt-iota.vercel.app/api/admin/fees/${user._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFees(res.data);
            } catch (err) {
                console.error("Error fetching fees:", err);
            } finally {
                setLoading(false);
            }
        };
        if (user?._id) fetchFees();
    }, [user?._id]);

    const total = fees.reduce((acc, curr) => curr.status === 'Unpaid' ? acc + curr.amount : acc, 0);

    if (loading) return <div className="p-10 text-center font-black text-slate-400 tracking-widest uppercase animate-pulse">Loading Financial Records...</div>;

    return (
        <div className="max-w-[1200px] mx-auto animate-in fade-in duration-700 p-10 space-y-12">
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-xl shadow-blue-100">
                    <span className="text-white">🧾</span>
                </div>
                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Financial <span className="text-blue-600">Ledger.</span></h1>
                    <p className="text-slate-500 font-medium">Review your fee structure, payment history, and pending invoices.</p>
                </div>
            </div>

            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-premium overflow-hidden flex flex-col">
                <div className="p-10 flex-1">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="px-6 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest pb-10">Invoice Type</th>
                                <th className="px-6 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest pb-10">Due Date</th>
                                <th className="px-6 py-8 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest pb-10">Status</th>
                                <th className="px-6 py-8 text-right text-[11px] font-black text-slate-400 uppercase tracking-widest pb-10">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {fees.length > 0 ? fees.map((fee, i) => (
                                <tr key={i} className="group hover:bg-slate-50/30 transition-colors">
                                    <td className="px-6 py-8">
                                        <p className="font-black text-slate-800 tracking-tight text-lg">{fee.title}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">INV-{fee._id.slice(-6).toUpperCase()}</p>
                                    </td>
                                    <td className="px-6 py-8 text-sm font-bold text-slate-500">{new Date(fee.dueDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-8 text-center">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${fee.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                                            }`}>
                                            {fee.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-8 text-right font-black text-slate-800 text-xl tracking-tighter">${fee.amount.toFixed(2)}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="p-20 text-center font-bold text-slate-300 uppercase tracking-widest">No financial records found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {total > 0 && (
                    <div className="bg-slate-900 p-10 px-16 border-t border-slate-800 flex justify-between items-center group">
                        <div className="space-y-1">
                            <p className="text-xs font-black text-blue-400 uppercase tracking-widest">Outstanding Balance</p>
                            <p className="text-5xl font-black text-white tracking-tighter group-hover:scale-105 transition-transform origin-left">${total.toFixed(2)}</p>
                        </div>
                        <button className="bg-white hover:bg-slate-100 text-slate-900 font-black py-5 px-16 rounded-2xl shadow-xl transition-all active:scale-95 uppercase tracking-widest text-sm">
                            Clear Balance 💳
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentFinanceSection;
