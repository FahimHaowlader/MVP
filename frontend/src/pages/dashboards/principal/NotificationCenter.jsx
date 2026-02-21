import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const notifications = [
    { id: 1, icon: '▶', iconBg: 'bg-blue-50 text-blue-600', title: 'Request #12345 was forwarded to you', by: 'by Sarah Chen', time: '5 minutes ago', badge: null, unread: true },
    { id: 2, icon: '💬', iconBg: 'bg-blue-50 text-blue-600', title: 'New internal note on Request #12331', by: 'by David Lee', time: '1 hour ago', badge: null, unread: true },
    { id: 3, icon: '✅', iconBg: 'bg-emerald-50 text-emerald-600', title: "Request #12320 for 'New History Textbooks'", by: 'by Admin Office', time: '3 hours ago', badge: 'Approved', badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-100', unread: true },
    { id: 4, icon: '❌', iconBg: 'bg-rose-50 text-rose-500', title: "Request #12315 for 'Tablet Replacements'", by: 'by Finance Dept.', time: 'Yesterday at 3:15 PM', badge: 'Rejected', badgeColor: 'bg-rose-50 text-rose-500 border-rose-100', unread: false },
    { id: 5, icon: '💬', iconBg: 'bg-slate-100 text-slate-500', title: 'New internal note on Request #12298', by: 'by Michael Corr', time: '2 days ago', badge: null, unread: false },
];

const NotificationCenter = () => {
    const [items, setItems] = useState(notifications);

    const markAllRead = () => setItems(items.map(n => ({ ...n, unread: false })));
    const clearAll = () => setItems([]);

    return (
        <div className="max-w-[1000px] mx-auto space-y-10 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Administrator Notification Center</h1>
                <div className="flex gap-4">
                    <button onClick={markAllRead} className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
                        ✓ Mark all as read
                    </button>
                    <button onClick={clearAll} className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
                        🗑 Clear All
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                <AnimatePresence>
                    {items.length === 0 ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[3rem] border border-slate-100 shadow-sm p-20 flex flex-col items-center gap-5 text-center">
                            <span className="text-5xl">🔔</span>
                            <p className="text-2xl font-black text-slate-800">All caught up!</p>
                            <p className="text-slate-400 font-medium">No notifications to show.</p>
                        </motion.div>
                    ) : items.map((n, i) => (
                        <motion.div
                            key={n.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`bg-white rounded-[2rem] border border-slate-100 shadow-sm px-10 py-7 flex items-start gap-6 hover:shadow-md transition-all group ${n.unread ? 'border-l-4 border-l-blue-500' : ''}`}
                        >
                            {n.unread && <div className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0 mt-2.5" />}
                            {!n.unread && <div className="w-2.5 flex-shrink-0" />}
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl ${n.iconBg}`}>{n.icon}</div>
                            <div className="flex-1 min-w-0">
                                <p className={`font-black tracking-tight ${n.unread ? 'text-slate-900' : 'text-slate-600'}`}>{n.title}</p>
                                <p className="text-sm font-bold text-slate-400 mt-1">{n.by}</p>
                                {n.badge && (
                                    <span className={`inline-flex items-center gap-1.5 mt-3 px-4 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest ${n.badgeColor}`}>
                                        {n.badge === 'Approved' ? '✅' : '❌'} {n.badge}
                                    </span>
                                )}
                            </div>
                            <p className="text-[11px] font-bold text-slate-400 flex-shrink-0">{n.time}</p>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default NotificationCenter;
