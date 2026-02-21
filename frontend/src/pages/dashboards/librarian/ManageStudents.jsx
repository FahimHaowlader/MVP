import React from 'react';
import { motion } from 'framer-motion';

const ManageStudents = () => {
    const students = [
        { name: 'Aarav Sharma', id: '789123', class: '10-A', borrowed: 2, limit: 5, status: 'Active' },
        { name: 'Mia Rodriguez', id: '789124', class: '9-C', borrowed: 0, limit: 3, status: 'Active' },
        { name: 'Leo Carter', id: '789125', class: '11-B', borrowed: 5, limit: 5, status: 'Restricted' },
        { name: 'Chloe Chen', id: '789126', class: '8-D', borrowed: 1, limit: 3, status: 'Active' },
    ];

    return (
        <div className="max-w-[1400px] mx-auto space-y-12 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Library Members</h1>
                    <p className="text-lg font-medium text-slate-400 mt-2">Manage library access and borrowing privileges for students.</p>
                </div>
                <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
                    ➕ Add New Member
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {students.map((student, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-8"
                    >
                        <div className="flex justify-between items-start">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center overflow-hidden">
                                <img src={`https://i.pravatar.cc/150?u=${student.id}`} alt="" className="w-full h-full object-cover" />
                            </div>
                            <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${student.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                }`}>
                                {student.status}
                            </span>
                        </div>

                        <div>
                            <h4 className="text-2xl font-black text-slate-800 tracking-tight">{student.name}</h4>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Class {student.class} • ID {student.id}</p>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-50">
                            <div className="flex justify-between items-end">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Borrowing</p>
                                <p className="text-xl font-black text-slate-800 tracking-tighter">{student.borrowed} / {student.limit}</p>
                            </div>
                            <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-1000 ${student.borrowed === student.limit ? 'bg-rose-500' : 'bg-indigo-600'}`}
                                    style={{ width: `${(student.borrowed / student.limit) * 100}%` }}
                                />
                            </div>
                        </div>

                        <button className="w-full py-4 rounded-xl bg-slate-50 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all">
                            View Reading History →
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ManageStudents;
