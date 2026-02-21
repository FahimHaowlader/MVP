import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialClasses = [
    { id: 1, name: 'Class 4A', grade: 'Grade 4', students: 28 },
    { id: 2, name: 'Class 3B', grade: 'Grade 3', students: 25 },
    { id: 3, name: 'Class 5C', grade: 'Grade 5', students: 30 },
    { id: 4, name: 'Class 2A', grade: 'Grade 2', students: 22 },
    { id: 5, name: 'Class 1A', grade: 'Grade 1', students: 20 },
];

const ManageClasses = () => {
    const [classes, setClasses] = useState(initialClasses);
    const [selected, setSelected] = useState([]);
    const [search, setSearch] = useState('');
    const [gradeFilter, setGradeFilter] = useState('All Grades');
    const [sortOrder, setSortOrder] = useState('desc');
    const [page, setPage] = useState(1);

    const toggleSelect = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
    const toggleAll = () => setSelected(selected.length === classes.length ? [] : classes.map(c => c.id));
    const deleteOne = (id) => { setClasses(classes.filter(c => c.id !== id)); setSelected(selected.filter(s => s !== id)); };

    const filtered = classes
        .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) && (gradeFilter === 'All Grades' || c.grade === gradeFilter))
        .sort((a, b) => sortOrder === 'desc' ? b.students - a.students : a.students - b.students);

    return (
        <div className="max-w-[1200px] mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Manage Classes</h1>
                <button className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                    + Add New Class
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex gap-4 items-center">
                <div className="relative flex-1">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by class name/number..."
                        className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700" />
                </div>
                <select value={gradeFilter} onChange={e => setGradeFilter(e.target.value)}
                    className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 appearance-none">
                    {['All Grades', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'].map(g => <option key={g}>{g}</option>)}
                </select>
                <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}
                    className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 appearance-none">
                    <option value="desc">Sort by Students ↓</option>
                    <option value="asc">Sort by Students ↑</option>
                </select>
                <button onClick={() => { setSearch(''); setGradeFilter('All Grades'); setSortOrder('desc'); }}
                    className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-2xl font-black text-sm text-slate-500 hover:bg-slate-50 shadow-sm transition-all">
                    🔄 Reset
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-50 bg-slate-50/50">
                            <th className="px-8 py-5 w-12">
                                <input type="checkbox" checked={selected.length === classes.length && classes.length > 0} onChange={toggleAll} className="w-4 h-4 rounded accent-blue-600 cursor-pointer" />
                            </th>
                            {['Class Number/Name', 'Grade Level', 'Number of Students', 'Actions'].map(h => (
                                <th key={h} className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        <AnimatePresence>
                            {filtered.map((c, i) => (
                                <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.04 }}
                                    className={`hover:bg-slate-50/30 transition-all ${selected.includes(c.id) ? 'bg-blue-50/20' : ''}`}>
                                    <td className="px-8 py-5">
                                        <input type="checkbox" checked={selected.includes(c.id)} onChange={() => toggleSelect(c.id)} className="w-4 h-4 rounded accent-blue-600 cursor-pointer" />
                                    </td>
                                    <td className="px-6 py-5 font-black text-slate-900">{c.name}</td>
                                    <td className="px-6 py-5 font-bold text-slate-500">{c.grade}</td>
                                    <td className="px-6 py-5 font-bold text-slate-700">{c.students}</td>
                                    <td className="px-6 py-5">
                                        <div className="flex gap-3">
                                            <button className="w-9 h-9 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-100 transition-all flex items-center justify-center text-base">✏</button>
                                            <button onClick={() => deleteOne(c.id)} className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition-all flex items-center justify-center text-base">🗑</button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="px-8 py-5 flex justify-between items-center border-t border-slate-50">
                    <p className="text-[11px] font-bold text-slate-400">Showing 1-{filtered.length} of 25 results</p>
                    <div className="flex gap-2">
                        {['‹', '1', '2', '3', '›'].map((p, i) => (
                            <button key={i} onClick={() => typeof p === 'string' && !isNaN(p) && setPage(+p)}
                                className={`w-9 h-9 rounded-xl font-black text-sm transition-all ${page === +p ? 'bg-blue-600 text-white shadow' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageClasses;
