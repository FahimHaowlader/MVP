import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialQuals = [
    { id: 1, name: 'Master of Library Science', institution: 'State University', date: 'May 2015' },
    { id: 2, name: 'Bachelor of Arts in History', institution: 'College of Humanities', date: 'June 2013' },
    { id: 3, name: 'Certified Archivist', institution: 'National Archives Board', date: 'August 2018' },
];

const StaffQualifications = () => {
    const [quals, setQuals] = useState(initialQuals);
    const [adding, setAdding] = useState(false);
    const [editing, setEditing] = useState(null);
    const [newQ, setNewQ] = useState({ name: '', institution: '', date: '' });

    const addQual = () => {
        if (!newQ.name) return;
        setQuals([...quals, { id: Date.now(), ...newQ }]);
        setNewQ({ name: '', institution: '', date: '' });
        setAdding(false);
    };

    const deleteQual = (id) => setQuals(quals.filter(q => q.id !== id));

    const saveEdit = (id) => {
        setQuals(quals.map(q => q.id === id ? { ...q, ...editing } : q));
        setEditing(null);
    };

    return (
        <div className="max-w-[1100px] mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Breadcrumb */}
            <p className="text-xs font-bold text-slate-400">
                <span className="hover:text-blue-600 cursor-pointer transition-all">Staff</span>
                <span className="mx-2 text-slate-300">›</span>
                <span className="hover:text-blue-600 cursor-pointer transition-all">John Doe</span>
                <span className="mx-2 text-slate-300">›</span>
                <span className="text-slate-900 font-black">Qualifications</span>
            </p>

            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Manage Staff Qualifications</h1>

            <div className="grid grid-cols-4 gap-8">
                {/* Profile Card */}
                <div className="col-span-1 bg-white rounded-[3rem] border border-slate-100 shadow-sm flex flex-col items-center py-12 px-6 gap-5">
                    <img src="https://i.pravatar.cc/150?u=john.doe.staff" alt="" className="w-28 h-28 rounded-[2rem] object-cover shadow-lg" />
                    <div className="text-center">
                        <p className="text-xl font-black text-slate-900 tracking-tight">John Doe</p>
                        <p className="text-slate-400 font-bold text-sm mt-1">Head Librarian</p>
                    </div>
                </div>

                {/* Qualifications Table */}
                <div className="col-span-3 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="flex justify-between items-center p-10 pb-6">
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">Qualifications List</h2>
                        <button onClick={() => setAdding(true)}
                            className="flex items-center gap-2 px-7 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                            + Add New Qualification
                        </button>
                    </div>

                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-y border-slate-50 bg-slate-50/50">
                                {['Qualification', 'Issuing Institution', 'Date Obtained', 'Actions'].map(h => (
                                    <th key={h} className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {/* Add row */}
                            <AnimatePresence>
                                {adding && (
                                    <motion.tr initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                        <td className="px-8 py-4">
                                            <input value={newQ.name} onChange={e => setNewQ({ ...newQ, name: e.target.value })} placeholder="Qualification name"
                                                className="w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl outline-none font-bold text-slate-700 text-sm" />
                                        </td>
                                        <td className="px-8 py-4">
                                            <input value={newQ.institution} onChange={e => setNewQ({ ...newQ, institution: e.target.value })} placeholder="Institution"
                                                className="w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl outline-none font-bold text-slate-700 text-sm" />
                                        </td>
                                        <td className="px-8 py-4">
                                            <input value={newQ.date} onChange={e => setNewQ({ ...newQ, date: e.target.value })} placeholder="e.g., May 2020"
                                                className="w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl outline-none font-bold text-slate-700 text-sm" />
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="flex gap-3">
                                                <button onClick={addQual} className="px-5 py-2 bg-blue-600 text-white rounded-xl font-black text-xs shadow hover:bg-blue-700 transition-all">Save</button>
                                                <button onClick={() => setAdding(false)} className="px-5 py-2 bg-slate-100 text-slate-600 rounded-xl font-black text-xs hover:bg-slate-200 transition-all">Cancel</button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                )}
                            </AnimatePresence>

                            {quals.map((q, i) => (
                                <motion.tr key={q.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.05 }}
                                    className="hover:bg-slate-50/30 transition-all">
                                    <td className="px-8 py-5">
                                        {editing?.id === q.id
                                            ? <input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} className="w-full px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl outline-none font-black text-slate-900 text-sm" />
                                            : <span className="font-black text-slate-900">{q.name}</span>}
                                    </td>
                                    <td className="px-8 py-5">
                                        {editing?.id === q.id
                                            ? <input value={editing.institution} onChange={e => setEditing({ ...editing, institution: e.target.value })} className="w-full px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl outline-none font-bold text-slate-600 text-sm" />
                                            : <span className="font-bold text-slate-500">{q.institution}</span>}
                                    </td>
                                    <td className="px-8 py-5">
                                        {editing?.id === q.id
                                            ? <input value={editing.date} onChange={e => setEditing({ ...editing, date: e.target.value })} className="w-full px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl outline-none font-bold text-slate-600 text-sm" />
                                            : <span className="font-bold text-slate-500">{q.date}</span>}
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex gap-3">
                                            {editing?.id === q.id ? (
                                                <>
                                                    <button onClick={() => saveEdit(q.id)} className="text-blue-600 font-black text-sm hover:underline">Save</button>
                                                    <button onClick={() => setEditing(null)} className="text-slate-400 font-black text-sm hover:text-slate-600">Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => setEditing({ id: q.id, name: q.name, institution: q.institution, date: q.date })}
                                                        className="w-8 h-8 rounded-xl bg-slate-100 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center text-sm">✏</button>
                                                    <button onClick={() => deleteQual(q.id)}
                                                        className="w-8 h-8 rounded-xl bg-slate-100 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all flex items-center justify-center text-sm">🗑</button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StaffQualifications;
