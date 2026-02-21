import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../../../hooks/useAuth';

const cards = [
    {
        icon: '🗓',
        title: 'Class Routine',
        desc: 'View and manage the weekly class timetable for all grades.',
        to: '/principal/exam-routine/create',
    },
    {
        icon: '📋',
        title: 'Exam Routine',
        desc: 'Check upcoming examination schedules and invigilation duties.',
        to: '/principal/exam-routine',
    },
];

const RoutineSelector = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Topbar */}
            <header className="bg-white border-b border-slate-100 px-12 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow">
                        <span className="text-white text-lg">🎓</span>
                    </div>
                    <span className="font-black text-slate-800 text-lg tracking-tight">Springfield International School</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-700 text-sm">{user?.name || 'Dr. Evelyn Reed'}</span>
                        <img src={`https://i.pravatar.cc/150?u=${user?.email}`} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-slate-100" />
                    </div>
                    <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-black text-xs shadow hover:bg-blue-700 transition-all">Logout</button>
                </div>
            </header>

            {/* Hero */}
            <main className="flex-1 flex flex-col items-center justify-center px-8 pb-16 space-y-12">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
                    <p className="text-blue-600 font-black text-sm uppercase tracking-widest">{greeting}!</p>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight">
                        Welcome, {(user?.name || 'Dr. Reed').split(' ').pop()}
                    </h1>
                    <p className="text-slate-400 font-medium">Please select what you'd like to view today.</p>
                </motion.div>

                <div className="grid grid-cols-2 gap-8 w-full max-w-2xl">
                    {cards.map((c, i) => (
                        <motion.button
                            key={c.title}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.1 }}
                            onClick={() => navigate(c.to)}
                            className="bg-white border border-slate-100 rounded-[3rem] p-12 flex flex-col items-center gap-5 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 group text-left"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl text-blue-600 group-hover:scale-110 transition-transform duration-300">
                                {c.icon}
                            </div>
                            <div className="text-center">
                                <p className="text-xl font-black text-slate-900 tracking-tight">{c.title}</p>
                                <p className="text-slate-400 font-medium text-sm mt-2 leading-relaxed">{c.desc}</p>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </main>

            <footer className="pb-8 text-center">
                <p className="text-[11px] font-bold text-slate-400">© 2024 Springfield International School. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default RoutineSelector;
