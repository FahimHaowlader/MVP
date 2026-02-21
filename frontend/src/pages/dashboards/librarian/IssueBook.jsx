import React, { useState } from 'react';
import { motion } from 'framer-motion';

const IssueBook = () => {
    const [selectedStudent, setSelectedStudent] = useState({
        name: 'Aarav Sharma',
        id: '789123',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/150?u=aarav'
    });

    const [selectedBook, setSelectedBook] = useState({
        title: 'The Midnight Library',
        author: 'Matt Haig',
        isbn: '978-0-525-55947-4',
        status: 'Available',
        cover: 'https://images-na.ssl-images-amazon.com/images/I/81WWiiLgEyL.jpg'
    });

    return (
        <div className="max-w-[1400px] mx-auto space-y-12 animate-in fade-in duration-700">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Issue Book</h1>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                <div className="xl:col-span-2 space-y-8">
                    {/* Find Student */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">Find Student</h3>
                        <div className="relative group">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-blue-600 transition-colors">🔍</span>
                            <input
                                type="text"
                                placeholder="Enter student name, ID, or scan barcode"
                                className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all font-medium text-slate-600"
                            />
                        </div>
                    </div>

                    {/* Find Book */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">Find Book</h3>
                        <div className="relative group">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-blue-600 transition-colors">🔍</span>
                            <input
                                type="text"
                                placeholder="Enter book title, ISBN, or scan barcode"
                                className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all font-medium text-slate-600"
                            />
                        </div>
                    </div>

                    {/* Transaction Details */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">Transaction Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Issue Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        defaultValue="2023-10-26"
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-black text-slate-800"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Due Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        defaultValue="2023-11-09"
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-black text-slate-800"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-6">
                        <button className="px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
                        <button className="px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">Issue Book</button>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Selected Student Card */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Selected Student</h3>
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-inner border-2 border-slate-50">
                                <img src={selectedStudent.avatar} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xl font-black text-slate-800 tracking-tight">{selectedStudent.name}</h4>
                                <p className="text-xs font-bold text-slate-400">ID: {selectedStudent.id}</p>
                                <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest rounded-lg mt-2">● {selectedStudent.status}</span>
                            </div>
                        </div>
                    </div>

                    {/* Selected Book Card */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Selected Book</h3>
                        <div className="flex gap-6">
                            <div className="w-24 h-36 rounded-xl overflow-hidden shadow-lg shadow-slate-200 flex-shrink-0">
                                <img src={selectedBook.cover} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-2 py-1">
                                <h4 className="text-lg font-black text-slate-800 tracking-tight leading-tight">{selectedBook.title}</h4>
                                <p className="text-xs font-bold text-slate-500">{selectedBook.author}</p>
                                <p className="text-[10px] font-medium text-slate-400">ISBN: {selectedBook.isbn}</p>
                                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest rounded-lg mt-2">● {selectedBook.status}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssueBook;
