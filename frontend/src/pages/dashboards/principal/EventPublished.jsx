import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const EventPublishedModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-6">
        <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 16 }}
            className="bg-white rounded-[3rem] shadow-2xl w-full max-w-md overflow-hidden"
        >
            {/* Close */}
            <div className="flex justify-end px-8 pt-8">
                <button onClick={onClose} className="w-9 h-9 rounded-xl hover:bg-slate-100 text-slate-400 font-black transition-all flex items-center justify-center">✕</button>
            </div>

            <div className="px-10 pb-5 space-y-6">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight text-center">Event Published! What's Next?</h2>

                {/* Event Preview Card */}
                <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
                    <div className="h-32 bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
                        <div className="text-center space-y-1 px-6">
                            <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Event Natural</p>
                            <p className="text-xs font-bold text-slate-500">Natural conditioning Saltronics</p>
                            <p className="text-[8px] text-slate-400">Lorem ipsum dolor sit amet consectetur...</p>
                            <div className="inline-block px-3 py-1 bg-emerald-600 rounded-full text-[8px] font-black text-white mt-1">REGISTER</div>
                        </div>
                    </div>
                    <div className="p-5 bg-white">
                        <p className="font-black text-slate-900">Annual Science Fair</p>
                        <p className="text-[11px] font-bold text-slate-400 mt-0.5">October 26, 2023</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 active:scale-95 transition-all shadow-xl shadow-blue-100">
                        Send Announcement
                    </button>
                    <button className="w-full py-4 text-blue-600 font-black text-sm hover:text-blue-700 transition-all flex items-center justify-center gap-2">
                        🔗 Copy Event Link
                    </button>
                    <div className="h-px bg-slate-50" />
                    <button className="w-full py-4 text-slate-500 font-black text-sm hover:text-slate-700 transition-all">View Published Event</button>
                    <button className="w-full py-4 text-slate-500 font-black text-sm hover:text-slate-700 transition-all">Create New Event</button>
                    <button onClick={onClose} className="w-full py-4 bg-slate-100 text-slate-800 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all">Return to Dashboard</button>
                </div>
            </div>
            <div className="pb-6" />
        </motion.div>
    </div>
);

const EventPublishedPage = () => {
    const [showModal, setShowModal] = useState(true);
    const [copied, setCopied] = useState(false);

    return (
        <div className="max-w-[1200px] mx-auto animate-in fade-in duration-700">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Events</h1>
                    <p className="text-slate-400 font-medium mt-2">Manage and publish school events.</p>
                </div>
                <button onClick={() => setShowModal(true)} className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                    + Publish New Event
                </button>
            </div>

            {/* Recent events list as background content */}
            <div className="grid grid-cols-3 gap-8">
                {[
                    { name: 'Annual Science Fair', date: 'Oct 26, 2023', status: 'Published', color: 'emerald' },
                    { name: 'Parent-Teacher Meeting', date: 'Nov 5, 2023', status: 'Scheduled', color: 'blue' },
                    { name: 'Inter-School Sports', date: 'Dec 1, 2023', status: 'Draft', color: 'slate' },
                ].map((e, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                        <div className={`h-24 bg-gradient-to-br from-${e.color}-50 to-${e.color}-100 rounded-2xl`} />
                        <div>
                            <p className="font-black text-slate-900">{e.name}</p>
                            <p className="text-xs font-bold text-slate-400 mt-1">{e.date}</p>
                        </div>
                        <span className={`px-4 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest ${e.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : e.status === 'Scheduled' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                            {e.status}
                        </span>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {showModal && <EventPublishedModal onClose={() => setShowModal(false)} />}
            </AnimatePresence>
        </div>
    );
};

export default EventPublishedPage;
