import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';

const CommunicationSection = () => {
    const { user } = useAuth();
    const [notices, setNotices] = useState([]);
    const [view, setView] = useState('inbox'); // 'inbox', 'composer'
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAudience, setFilterAudience] = useState('All');

    const [form, setForm] = useState({
        title: '',
        message: '',
        audience: 'All'
    });

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('https://mvp-gilt-iota.vercel.app/api/notices', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotices(res.data);
            if (res.data.length > 0) setSelectedNotice(res.data[0]);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('https://mvp-gilt-iota.vercel.app/api/notices',
                form,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setForm({ title: '', message: '', audience: 'All' });
            setView('inbox');
            fetchNotices();
        } catch (err) {
            console.error(err);
        }
    };

    const categories = [
        { id: 'all', label: 'All Messages', icon: '📥', count: notices.length },
        { id: 'announcements', label: 'Announcements', icon: '📢', count: notices.filter(n => n.audience === 'All').length },
        { id: 'private', label: 'Private (Coming Soon)', icon: '🔒', count: 0 },
        { id: 'drafts', label: 'Drafts', icon: '📝', count: 0 },
        { id: 'sent', label: 'Sent', icon: '📤', count: notices.filter(n => n.postedBy?._id === user?._id).length },
    ];

    return (
        <div className="max-w-[1400px] mx-auto h-[calc(100vh-160px)] flex gap-8 animate-in fade-in duration-700">
            {/* Left Sidebar: Categories */}
            <div className="w-80 flex flex-col gap-6">
                <button
                    onClick={() => setView('composer')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 px-8 rounded-3xl shadow-xl shadow-blue-100 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                >
                    <span className="text-xl">+</span> New Announcement
                </button>

                <div className="bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-sm flex-1 overflow-y-auto no-scrollbar">
                    <div className="p-4 space-y-1">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all group ${cat.id === 'all' ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-xl opacity-70 group-hover:scale-110 transition-transform">{cat.icon}</span>
                                    <span className="font-black text-sm tracking-tight">{cat.label}</span>
                                </div>
                                {cat.count > 0 && (
                                    <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${cat.id === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                        {cat.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-white rounded-[3rem] border border-slate-100 shadow-premium overflow-hidden flex">
                <AnimatePresence mode="wait">
                    {view === 'inbox' ? (
                        <motion.div
                            key="inbox"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex flex-1 overflow-hidden"
                        >
                            {/* Middle Panel: List */}
                            <div className="w-[450px] border-r border-slate-50 flex flex-col">
                                <div className="p-8 border-b border-slate-50 space-y-4">
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">Messaging</h3>
                                    <div className="relative group">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">🔍</span>
                                        <input
                                            type="text"
                                            placeholder="Search messages..."
                                            className="w-full bg-slate-50/50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 text-sm font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-blue-100 transition-all shadow-inner"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-slate-50">
                                    {notices.map((notice) => (
                                        <button
                                            key={notice._id}
                                            onClick={() => setSelectedNotice(notice)}
                                            className={`w-full p-8 text-left transition-all hover:bg-slate-50/50 flex flex-col gap-3 relative border-l-4 ${selectedNotice?._id === notice._id ? 'bg-blue-50/30 border-blue-600' : 'border-transparent'}`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${notice.audience === 'All' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                                                    {notice.audience}
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                                                    {new Date(notice.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <h4 className="font-black text-slate-800 tracking-tight leading-snug line-clamp-1">{notice.title}</h4>
                                            <p className="text-xs font-medium text-slate-400 line-clamp-2 leading-relaxed italic">
                                                "{notice.message}"
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Right Panel: Content View */}
                            <div className="flex-1 overflow-y-auto no-scrollbar p-12 bg-slate-50/30">
                                {selectedNotice ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="max-w-[800px] mx-auto space-y-10"
                                    >
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-start">
                                                <div className="flex gap-4 items-center">
                                                    <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-blue-100">
                                                        {notice.postedBy?.name?.charAt(0) || "A"}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-extrabold text-slate-800 text-lg leading-tight uppercase tracking-tight">
                                                            {notice.postedBy?.name || "Administrator"}
                                                        </h4>
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                                                            Posted on {new Date(notice.date).toLocaleDateString()} • {new Date(notice.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button className="w-10 h-10 rounded-xl border border-slate-100 bg-white shadow-sm flex items-center justify-center hover:bg-slate-50 transition-colors">🗳️</button>
                                                    <button className="w-10 h-10 rounded-xl border border-slate-100 bg-white shadow-sm flex items-center justify-center hover:bg-slate-50 transition-colors text-rose-500">🗑️</button>
                                                </div>
                                            </div>

                                            <div className="h-px bg-slate-100 w-full"></div>

                                            <div className="space-y-4">
                                                <h1 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">
                                                    {selectedNotice.title}
                                                </h1>
                                                <div className="prose prose-slate max-w-none">
                                                    <p className="text-slate-600 font-medium text-lg leading-relaxed whitespace-pre-line">
                                                        {selectedNotice.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-8 bg-blue-600/5 rounded-3xl border border-blue-600/10 space-y-4">
                                            <h5 className="font-black text-blue-600 text-[11px] uppercase tracking-[0.2em]">Target Audience</h5>
                                            <div className="flex gap-3">
                                                <span className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-100">
                                                    {selectedNotice.audience}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-slate-300 flex-col gap-4 italic font-medium">
                                        <span className="text-6xl opacity-50">📬</span>
                                        Select a message to read the content
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="composer"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex-1 p-12 overflow-y-auto no-scrollbar"
                        >
                            <div className="max-w-[700px] mx-auto space-y-10 pb-20">
                                <div className="space-y-2">
                                    <h3 className="text-4xl font-black text-slate-800 tracking-tight">New Announcement</h3>
                                    <p className="text-slate-400 font-medium tracking-tight">Send a notification to the school community.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8 bg-slate-50/50 p-10 rounded-[2.5rem] border border-slate-100">
                                    <div className="space-y-3">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Message Title</label>
                                        <input
                                            type="text"
                                            placeholder="Enter a descriptive title..."
                                            className="w-full bg-white border border-slate-100 rounded-2xl py-4 px-6 font-bold text-slate-700 shadow-sm focus:ring-4 focus:ring-blue-100 transition-all transition-all"
                                            value={form.title}
                                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Target Audience</label>
                                            <select
                                                className="w-full bg-white border border-slate-100 rounded-2xl py-4 px-6 font-bold text-slate-700 shadow-sm focus:ring-4 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
                                                value={form.audience}
                                                onChange={(e) => setForm({ ...form, audience: e.target.value })}
                                            >
                                                <option value="All">All School</option>
                                                <option value="Student">Students Only</option>
                                                <option value="Teacher">Teachers Only</option>
                                                <option value="Parent">Parents Only</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Priority</label>
                                            <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
                                                {['Normal', 'High'].map(p => (
                                                    <button key={p} type="button" className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${p === 'Normal' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}>{p}</button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Message Content</label>
                                        <textarea
                                            rows="8"
                                            placeholder="Write your announcement details here..."
                                            className="w-full bg-white border border-slate-100 p-8 rounded-3xl font-medium text-slate-600 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm resize-none"
                                            value={form.message}
                                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="flex justify-end gap-6 pt-6">
                                        <button
                                            type="button"
                                            onClick={() => setView('inbox')}
                                            className="px-10 py-4 bg-white border border-slate-200 text-slate-400 font-black rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[11px]"
                                        >
                                            Discard
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-xl shadow-blue-100 transition-all active:scale-95 uppercase tracking-widest text-[11px]"
                                        >
                                            Post Announcement
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CommunicationSection;
