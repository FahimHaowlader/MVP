import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AddEventModal = ({ onClose }) => {
    const [attendees, setAttendees] = useState(['Grade 10 - Section A', 'Mr. John Doe']);
    const [newAttendee, setNewAttendee] = useState('');

    const addAttendee = (e) => {
        if (e.key === 'Enter' && newAttendee.trim()) {
            setAttendees([...attendees, newAttendee.trim()]);
            setNewAttendee('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="flex justify-between items-center px-10 py-8 border-b border-slate-50">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Add New Event</h2>
                    <button onClick={onClose} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 font-bold transition-all">✕</button>
                </div>

                <div className="px-10 py-8 space-y-7 overflow-y-auto max-h-[calc(100vh-180px)]">
                    {/* Event Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">Event Title</label>
                        <input placeholder="Enter the name of the event" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all font-medium text-slate-700" />
                    </div>

                    {/* Date, Start, End */}
                    <div className="grid grid-cols-3 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700">Date</label>
                            <input type="date" defaultValue="2024-10-28" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700">Start Time</label>
                            <input type="time" defaultValue="09:00" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700">End Time</label>
                            <input type="time" defaultValue="10:30" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800" />
                        </div>
                    </div>

                    {/* Location & Category */}
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700">Location</label>
                            <input placeholder="e.g., Room 101 or Online Link" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700">Event Category</label>
                            <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800 appearance-none">
                                <option>Meeting</option><option>Sports</option><option>Academic</option><option>Arts</option><option>Holiday</option>
                            </select>
                        </div>
                    </div>

                    {/* Recurring & Ending Date */}
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700">Recurring Event</label>
                            <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800 appearance-none">
                                <option>Repeats weekly</option><option>Does not repeat</option><option>Repeats monthly</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700">Ending Date</label>
                            <input type="date" defaultValue="2024-12-20" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800" />
                        </div>
                    </div>

                    {/* Attendees (tags) */}
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">Attendees</label>
                        <div className="flex flex-wrap gap-2 px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus-within:ring-4 focus-within:ring-blue-50 focus-within:border-blue-200 transition-all">
                            {attendees.map((a, i) => (
                                <span key={i} className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-[12px] font-black">
                                    {a}
                                    <button onClick={() => setAttendees(attendees.filter((_, ai) => ai !== i))} className="text-blue-400 hover:text-blue-700 font-black">×</button>
                                </span>
                            ))}
                            <input
                                value={newAttendee}
                                onChange={e => setNewAttendee(e.target.value)}
                                onKeyDown={addAttendee}
                                placeholder="Add more..."
                                className="flex-1 min-w-[100px] bg-transparent outline-none font-medium text-slate-600 text-sm"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">Description</label>
                        <textarea rows={4} placeholder="Add a description for the event..." className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700 resize-none" />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-4 px-10 py-6 border-t border-slate-50">
                    <button onClick={onClose} className="px-8 py-4 rounded-2xl font-black text-sm text-slate-400 hover:text-slate-600 transition-all">Cancel</button>
                    <button onClick={onClose} className="px-10 py-4 rounded-2xl font-black text-sm bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">Save Event</button>
                </div>
            </motion.div>
        </div>
    );
};

// Wrapper page that shows the modal directly
const AddEventPage = () => {
    const [open, setOpen] = useState(true);
    return (
        <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Events</h1>
                    <p className="text-slate-400 font-medium mt-2">Manage all school events and activities.</p>
                </div>
                <button onClick={() => setOpen(true)} className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                    + Add New Event
                </button>
            </div>
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm p-20 flex flex-col items-center justify-center text-center gap-6">
                <span className="text-6xl">📅</span>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">No Events Yet</h3>
                <p className="text-slate-400 font-medium">Click "Add New Event" to create your first school event.</p>
                <button onClick={() => setOpen(true)} className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                    + Add New Event
                </button>
            </div>
            <AnimatePresence>{open && <AddEventModal onClose={() => setOpen(false)} />}</AnimatePresence>
        </div>
    );
};

export default AddEventPage;
