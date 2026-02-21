import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ReturnBook = () => {
    const [scannedBook, setScannedBook] = useState({
        title: 'The Midnight Library',
        author: 'Matt Haig',
        isbn: '978-0-525-55947-4',
        borrowedBy: 'Aarav Sharma',
        dueDate: 'Oct 30, 2023',
        overdueDays: 0,
        fine: 0,
        cover: 'https://images-na.ssl-images-amazon.com/images/I/81WWiiLgEyL.jpg'
    });

    return (
        <div className="max-w-[1400px] mx-auto space-y-12 animate-in fade-in duration-700">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Return Book</h1>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                <div className="xl:col-span-2 space-y-8">
                    {/* Scan Book */}
                    <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -mr-32 -mt-32" />
                        <div className="relative z-10 space-y-6">
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Scan Book Barcode</h3>
                            <p className="text-slate-400 font-medium max-w-md text-lg">Use the barcode scanner to identify the book or enter the ISBN/Book ID manually.</p>
                            <div className="relative group max-w-2xl">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-3xl group-focus-within:text-indigo-600 transition-colors">📑</span>
                                <input
                                    type="text"
                                    placeholder="Scan barcode or enter ISBN..."
                                    autoFocus
                                    className="w-full pl-20 pr-8 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:ring-8 focus:ring-indigo-100/50 focus:border-indigo-200 transition-all font-black text-slate-700 text-2xl tracking-tight"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Book Inspection */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">Condition Inspection</h3>
                            <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-xl">Step 2 of 2</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <button className="p-6 rounded-3xl border-2 border-emerald-100 bg-emerald-50/10 flex flex-col items-center gap-3 hover:bg-emerald-50 transition-all group">
                                <span className="text-3xl">✨</span>
                                <span className="font-black text-[11px] uppercase tracking-widest text-emerald-600">Perfect</span>
                            </button>
                            <button className="p-6 rounded-3xl border-2 border-slate-100 flex flex-col items-center gap-3 hover:bg-slate-50 transition-all">
                                <span className="text-3xl">🩹</span>
                                <span className="font-black text-[11px] uppercase tracking-widest text-slate-400">Minor Damage</span>
                            </button>
                            <button className="p-6 rounded-3xl border-2 border-slate-100 flex flex-col items-center gap-3 hover:bg-slate-50 transition-all">
                                <span className="text-3xl">⚠️</span>
                                <span className="font-black text-[11px] uppercase tracking-widest text-slate-400">Damaged</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-6">
                        <button className="px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Reset</button>
                        <button className="px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest bg-indigo-600 text-white shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">Complete Return</button>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Scanned Result Card */}
                    <div className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                        <h3 className="text-[11px] font-black text-indigo-400 uppercase tracking-widest relative z-10">Borrowed Information</h3>

                        <div className="flex gap-8 relative z-10">
                            <div className="w-24 h-36 rounded-2xl overflow-hidden shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500">
                                <img src={scannedBook.cover} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-2xl font-black tracking-tight leading-tight">{scannedBook.title}</h4>
                                    <p className="text-sm font-bold text-slate-400 mt-1">{scannedBook.author}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Borrower</p>
                                    <p className="font-black text-indigo-400">{scannedBook.borrowedBy}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-10 border-t border-white/5 relative z-10">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Due Date</p>
                                <p className="text-xl font-black tracking-tighter">{scannedBook.dueDate}</p>
                            </div>
                            <div className="space-y-1 text-right">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</p>
                                <p className="text-xl font-black tracking-tighter text-emerald-400">On Time</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                        <div className="flex justify-between items-center">
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Late Fee</p>
                            <span className="text-3xl font-black text-slate-800 tracking-tighter">$0.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnBook;
