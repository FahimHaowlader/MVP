import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialRooms = [
    { id: 1, name: 'Science Lab A', deleted: 'October 26, 2023' },
    { id: 2, name: 'Room 204B', deleted: 'September 15, 2023' },
    { id: 3, name: 'Art Studio', deleted: 'August 01, 2023' },
    { id: 4, name: 'Library Annex', deleted: 'June 22, 2023' },
];

const RestoreDeletedRooms = () => {
    const [rooms, setRooms] = useState(initialRooms);
    const [selected, setSelected] = useState([]);
    const [search, setSearch] = useState('');
    const [restored, setRestored] = useState([]);

    const toggleSelect = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
    const toggleAll = () => setSelected(selected.length === rooms.length ? [] : rooms.map(r => r.id));

    const restoreOne = (id) => {
        setRestored([...restored, rooms.find(r => r.id === id)?.name]);
        setRooms(rooms.filter(r => r.id !== id));
        setSelected(selected.filter(s => s !== id));
    };

    const restoreSelected = () => {
        const names = rooms.filter(r => selected.includes(r.id)).map(r => r.name);
        setRestored([...restored, ...names]);
        setRooms(rooms.filter(r => !selected.includes(r.id)));
        setSelected([]);
    };

    const filtered = rooms.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="max-w-[1100px] mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Breadcrumb */}
            <p className="text-xs font-bold text-slate-400">Dashboard / <span className="text-slate-500">Rooms</span> / <span className="text-slate-900 font-black">Deleted Rooms</span></p>

            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Restore Deleted Rooms</h1>
                <p className="text-slate-400 font-medium mt-2">Find and restore rooms that have been previously deleted from the system.</p>
            </div>

            {restored.length > 0 && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-8 py-4 rounded-2xl font-bold text-sm flex items-center gap-3">
                    ✅ Restored: <span className="font-black">{restored.join(', ')}</span>
                </motion.div>
            )}

            {/* Search + Actions */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                    <input value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search by room name or number..."
                        className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700" />
                </div>
                <button className="flex items-center gap-2 px-7 py-5 bg-white border border-slate-100 rounded-2xl font-black text-sm text-slate-600 shadow-sm hover:bg-slate-50 transition-all">
                    ⚙ Filter
                </button>
                <button onClick={restoreSelected} disabled={selected.length === 0}
                    className="flex items-center gap-2 px-7 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 disabled:opacity-40 active:scale-95 transition-all">
                    ⊡ Restore Selected {selected.length > 0 && `(${selected.length})`}
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-50 bg-slate-50/50">
                            <th className="px-8 py-5 w-12">
                                <input type="checkbox" checked={selected.length === rooms.length && rooms.length > 0} onChange={toggleAll}
                                    className="w-4 h-4 rounded accent-blue-600 cursor-pointer" />
                            </th>
                            <th className="px-4 py-5 text-[10px] font-black text-blue-500 uppercase tracking-widest">Room Name / Number</th>
                            <th className="px-8 py-5 text-[10px] font-black text-blue-500 uppercase tracking-widest">Date Deleted</th>
                            <th className="px-8 py-5 text-right text-[10px] font-black text-blue-500 uppercase tracking-widest">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        <AnimatePresence>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-16 text-center">
                                        <p className="text-2xl font-black text-slate-800">All rooms restored!</p>
                                        <p className="text-slate-400 font-medium mt-2">No deleted rooms remaining.</p>
                                    </td>
                                </tr>
                            ) : filtered.map((r, i) => (
                                <motion.tr key={r.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} transition={{ delay: i * 0.05 }}
                                    className={`hover:bg-slate-50/30 transition-all ${selected.includes(r.id) ? 'bg-blue-50/20' : ''}`}>
                                    <td className="px-8 py-5">
                                        <input type="checkbox" checked={selected.includes(r.id)} onChange={() => toggleSelect(r.id)}
                                            className="w-4 h-4 rounded accent-blue-600 cursor-pointer" />
                                    </td>
                                    <td className="px-4 py-5 font-black text-slate-900">{r.name}</td>
                                    <td className="px-8 py-5 font-bold text-blue-500">{r.deleted}</td>
                                    <td className="px-8 py-5 text-right">
                                        <button onClick={() => restoreOne(r.id)}
                                            className="px-7 py-3 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow hover:bg-blue-700 active:scale-95 transition-all">
                                            Restore
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="px-8 py-5 flex justify-between items-center border-t border-slate-50">
                    <p className="text-[11px] font-bold text-blue-500">Showing 1 to {filtered.length} of 12 results</p>
                    <div className="flex gap-3">
                        <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-black text-xs text-slate-500 hover:bg-slate-50 transition-all">Previous</button>
                        <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-black text-xs text-slate-500 hover:bg-slate-50 transition-all">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestoreDeletedRooms;
