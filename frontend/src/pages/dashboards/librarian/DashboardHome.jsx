import React from 'react';
import { motion } from 'framer-motion';

const LibrarianDashboardHome = () => {
    const stats = [
        { label: 'Books Issued Today', value: '42', icon: '📤', color: 'blue' },
        { label: 'Overdue Returns', value: '12', icon: '⚠️', color: 'rose' },
        { label: 'New Arrivals', value: '8', icon: '✨', color: 'emerald' },
        { label: 'Visitor Count', value: '124', icon: '👥', color: 'indigo' },
    ];

    const recentActivity = [
        { type: 'issue', user: 'Aarav Sharma', book: 'The Midnight Library', time: '10 mins ago', avatar: 'https://i.pravatar.cc/150?u=1' },
        { type: 'return', user: 'Mia Rodriguez', book: 'Project Hail Mary', time: '25 mins ago', avatar: 'https://i.pravatar.cc/150?u=2' },
        { type: 'issue', user: 'Leo Carter', book: 'Klara and the Sun', time: '45 mins ago', avatar: 'https://i.pravatar.cc/150?u=3' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-2 leading-none">Management Console</p>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Library Overview</h1>
                </div>
                <div className="flex bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all">Today</button>
                    <button className="px-6 py-3 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-600 transition-all">Week</button>
                    <button className="px-6 py-3 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-600 transition-all">Month</button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full blur-3xl -mr-12 -mt-12 transition-all group-hover:bg-indigo-50" />
                        <div className="relative z-10 space-y-4">
                            <span className="text-3xl">{stat.icon}</span>
                            <div>
                                <p className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                        <div className="flex justify-between items-center px-2">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">Circulation Trends</h3>
                            <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Full Analytics →</button>
                        </div>
                        <div className="h-64 w-full bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 flex items-center justify-center">
                            <p className="text-slate-400 font-bold italic">Transaction Volume Chart Visualization</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight px-2">Recent Activity</h3>
                        <div className="space-y-6">
                            {recentActivity.map((activity, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-50">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden shadow-inner">
                                        <img src={activity.avatar} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-black text-slate-800 truncate tracking-tight">
                                            {activity.user}
                                        </p>
                                        <p className="text-[10px] font-bold text-slate-400 truncate">
                                            {activity.type === 'issue' ? 'Issued' : 'Returned'}: {activity.book}
                                        </p>
                                    </div>
                                    <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest whitespace-nowrap">{activity.time}</p>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-4 rounded-2xl border-2 border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 hover:text-slate-600 transition-all">
                            View All Logs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LibrarianDashboardHome;
