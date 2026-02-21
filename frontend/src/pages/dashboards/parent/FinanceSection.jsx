import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const ParentFinanceSection = () => {
    const { selectedChild } = useOutletContext();
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFees = async () => {
            if (!selectedChild) return;
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                // Use existing generic fee retrieval logic if available or overview
                const res = await axios.get(`http://localhost:5001/api/admin/fees/${selectedChild._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFees(res.data || []);
            } catch (err) {
                console.error("Error fetching fees:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchFees();
    }, [selectedChild]);

    const totalUnpaid = fees.reduce((acc, curr) => curr.status === 'Unpaid' ? acc + curr.amount : acc, 0);

    if (!selectedChild) return <div className="p-10 text-center font-bold text-slate-400 uppercase tracking-widest">Please select a student first</div>;
    if (loading) return <div className="p-10 text-center font-black text-slate-400 tracking-widest uppercase animate-pulse">Accessing Payment Records...</div>;

    return (
        <div className="max-w-[1200px] mx-auto space-y-12 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-4">
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none">
                        Fees & <span className="text-blue-600">Payments.</span>
                    </h1>
                    <p className="text-lg font-medium text-slate-400">Tracking financial ledger for <span className="text-slate-900 font-bold">{selectedChild.name}</span></p>
                </div>
                <div className="flex items-center gap-4 bg-emerald-50 p-4 rounded-3xl border border-emerald-100 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-2xl">🛡️</div>
                    <div>
                        <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest leading-none">Secure Payments</p>
                        <p className="text-sm font-black text-emerald-600 tracking-tight">Active & Protected</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Invoice</th>
                                    <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Due Date</th>
                                    <th className="px-10 py-8 text-right text-[11px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {fees.length > 0 ? fees.map((fee, i) => (
                                    <tr key={i} className="group hover:bg-slate-50/30 transition-colors">
                                        <td className="px-10 py-6">
                                            <p className="font-black text-slate-800 tracking-tight text-lg">{fee.title}</p>
                                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border ${fee.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                                                }`}>
                                                {fee.status}
                                            </span>
                                        </td>
                                        <td className="px-10 py-6 text-sm font-bold text-slate-500 uppercase tracking-widest">
                                            {new Date(fee.dueDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-10 py-6 text-right font-black text-slate-800 text-xl tracking-tighter">${fee.amount.toFixed(2)}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="3" className="p-20 text-center font-bold text-slate-300 uppercase tracking-widest">No fee records found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-8 shadow-2xl shadow-slate-200">
                        <div className="space-y-2">
                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Total Outstanding</p>
                            <h2 className="text-6xl font-black tracking-tighter">${totalUnpaid.toFixed(2)}</h2>
                        </div>
                        <p className="text-xs font-medium text-slate-400 leading-relaxed">Please ensure all pending invoices are cleared by the due dates to avoid administrative delays.</p>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-900/40 transition-all active:scale-95 uppercase tracking-widest text-sm">
                            Make Payment Now
                        </button>
                    </div>

                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Payment Methods</h4>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center opacity-50 grayscale hover:grayscale-0 cursor-pointer">💳</div>
                            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center opacity-50 grayscale hover:grayscale-0 cursor-pointer">🏦</div>
                            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center opacity-50 grayscale hover:grayscale-0 cursor-pointer">₿</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentFinanceSection;
