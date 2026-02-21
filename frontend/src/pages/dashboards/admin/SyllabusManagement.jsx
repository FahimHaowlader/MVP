import React, { useState } from 'react';
import { motion } from 'framer-motion';

const syllabi = [
    { subject: 'Algebra II', code: 'ALG-201', grade: 'Grade 10', teacher: 'Mr. Robert Downing', updated: '2023-08-15' },
    { subject: 'World History', code: 'WH-301', grade: 'Grade 11', teacher: 'Ms. Amelia Earhart', updated: '2023-09-01' },
    { subject: 'Chemistry I', code: 'CHM-101', grade: 'Grade 10', teacher: 'Dr. Marie Curie', updated: '2023-08-20' },
    { subject: 'Literature', code: 'LIT-401', grade: 'Grade 12', teacher: 'Mr. William Shakespeare', updated: '2023-09-05' },
    { subject: 'Physics II', code: 'PHY-202', grade: 'Grade 11', teacher: 'Dr. Isaac Newton', updated: '2023-07-30' },
];

const SyllabusManagement = () => {
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const filtered = syllabi.filter(s =>
        s.subject.toLowerCase().includes(search.toLowerCase()) ||
        s.code.toLowerCase().includes(search.toLowerCase()) ||
        s.teacher.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-[1400px] mx-auto space-y-12 animate-in fade-in duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-2">Academic Management</p>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Syllabus Catalog</h1>
                    <p className="text-lg font-medium text-slate-400 mt-2">View, create, and update the syllabus for all subjects and classes.</p>
                </div>
                <button
                    onClick={() => { setEditItem(null); setShowModal(true); }}
                    className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-95 transition-all flex items-center gap-3"
                >
                    ➕ Add New
                </button>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                {/* Filters */}
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative group">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
                        <input
                            type="text"
                            placeholder="Search by subject..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-slate-100 transition-all font-medium text-slate-600"
                        />
                    </div>
                    <div className="flex gap-4">
                        {['Grade Level', 'Subject', 'Teacher'].map(label => (
                            <select key={label} className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-600 outline-none appearance-none cursor-pointer text-sm">
                                <option>{label} ▾</option>
                            </select>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Subject</th>
                                <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Grade</th>
                                <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Teacher</th>
                                <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Last Updated</th>
                                <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.map((item, i) => (
                                <motion.tr
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-slate-50/30 transition-all"
                                >
                                    <td className="px-10 py-6">
                                        <p className="font-black text-slate-800 tracking-tight">{item.subject} <span className="text-slate-400 font-bold">({item.code})</span></p>
                                    </td>
                                    <td className="px-10 py-6 font-bold text-slate-600">{item.grade}</td>
                                    <td className="px-10 py-6 font-bold text-slate-600">{item.teacher}</td>
                                    <td className="px-10 py-6 font-medium text-slate-400 text-sm">{item.updated}</td>
                                    <td className="px-10 py-6">
                                        <div className="flex justify-end gap-3">
                                            <button className="px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 font-black text-[11px] uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-2">
                                                👁 View
                                            </button>
                                            <button
                                                onClick={() => { setEditItem(item); setShowModal(true); }}
                                                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-black text-[11px] uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2"
                                            >
                                                ✏️ Edit
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-8 border-t border-slate-50 flex justify-between items-center bg-slate-50/20">
                    <p className="text-xs font-bold text-slate-400">Showing <span className="text-slate-900">1 to {filtered.length}</span> of 25 results</p>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400">‹</button>
                        <button className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black flex items-center justify-center text-xs shadow-lg">1</button>
                        <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-600 font-black text-xs">2</button>
                        <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400">›</button>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[3rem] p-12 max-w-2xl w-full shadow-2xl space-y-8"
                    >
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{editItem ? 'Edit Syllabus' : 'Add New Syllabus'}</h2>
                        <div className="grid grid-cols-2 gap-6">
                            {[['Subject Name', editItem?.subject], ['Subject Code', editItem?.code], ['Grade Level', editItem?.grade], ['Teacher', editItem?.teacher]].map(([label, val]) => (
                                <div key={label} className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
                                    <input defaultValue={val || ''} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-slate-100 transition-all font-bold text-slate-800" />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-4 pt-4">
                            <button onClick={() => setShowModal(false)} className="px-8 py-4 rounded-2xl font-black text-sm text-slate-400 hover:bg-slate-50 transition-all">Cancel</button>
                            <button onClick={() => setShowModal(false)} className="px-8 py-4 rounded-2xl font-black text-sm bg-slate-900 text-white shadow-xl hover:bg-slate-800 transition-all">Save Changes</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default SyllabusManagement;
