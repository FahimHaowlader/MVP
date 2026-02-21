import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentCertificatesSection = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    const achievements = [
        {
            id: 1,
            date: 'March 15, 2024',
            title: 'First Place, Science Olympiad',
            image: 'https://images.unsplash.com/photo-1621510456681-229ef554193b?q=80&w=2070&auto=format&fit=crop',
            icon: '🏆',
            iconBg: 'bg-blue-600',
            awardedOn: 'March 15, 2024'
        },
        {
            id: 2,
            date: 'February 22, 2024',
            title: 'Certificate of Completion: Public Speaking 101',
            image: 'https://images.unsplash.com/photo-1621510456681-229ef554193b?q=80&w=2070&auto=format&fit=crop',
            icon: '🎓',
            iconBg: 'bg-indigo-400',
            awardedOn: 'February 22, 2024'
        },
        {
            id: 3,
            date: 'January 30, 2024',
            title: 'Participation in Annual Sports Meet',
            image: 'https://images.unsplash.com/photo-1621510456681-229ef554193b?q=80&w=2070&auto=format&fit=crop',
            icon: '⚽',
            iconBg: 'bg-blue-600',
            awardedOn: 'January 30, 2024'
        }
    ];

    // Default to first cert if none selected
    const currentCert = selectedCert || achievements[1];

    return (
        <div className="max-w-[1400px] mx-auto space-y-10 animate-in fade-in duration-700 p-10">
            <div className="space-y-4">
                <h1 className="text-5xl font-black text-slate-900 tracking-tight">My Certificates</h1>
                <p className="text-slate-500 font-medium">A timeline of your hard work and achievements.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Timeline Area */}
                <div className="flex-1 space-y-12 relative before:absolute before:left-[31px] before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-100">
                    {achievements.map((item, i) => (
                        <div key={item.id} className="relative pl-24 group cursor-pointer" onClick={() => setSelectedCert(item)}>
                            {/* Dot/Icon */}
                            <div className={`absolute left-0 top-0 w-16 h-16 rounded-full border-4 border-white ${item.iconBg} shadow-lg flex items-center justify-center text-2xl z-10 transition-transform group-hover:scale-110`}>
                                {item.icon}
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{item.date}</p>
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                                        {item.title}
                                    </h3>
                                </div>
                                <div className="w-full max-w-[500px] aspect-[16/10] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 bg-slate-50 group-hover:shadow-blue-100 transition-all">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Panel */}
                <div className="w-full lg:w-[450px]">
                    <div className="sticky top-10 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-premium space-y-8">
                        <div className="space-y-2">
                            <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
                                {currentCert.title}
                            </h3>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                                Awarded on: {currentCert.awardedOn}
                            </p>
                        </div>

                        <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 relative group">
                            <img src={currentCert.image} alt="Preview" className="w-full h-full object-cover p-4" />
                            <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <div className="space-y-4">
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-8 rounded-xl shadow-xl shadow-blue-100 transition-all active:scale-95 uppercase tracking-widest text-[11px] flex items-center justify-center gap-3">
                                📥 Download Certificate
                            </button>
                            <button className="w-full bg-white border border-slate-100 hover:bg-slate-50 text-slate-800 font-black py-4 px-8 rounded-xl transition-all active:scale-95 uppercase tracking-widest text-[11px] flex items-center justify-center gap-3">
                                🔗 Share Certificate
                            </button>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-50">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Share directly to:</p>
                            <div className="flex justify-center gap-6">
                                <SocialIcon icon="f" />
                                <SocialIcon icon="t" />
                                <SocialIcon icon="in" />
                                <SocialIcon icon="m" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SocialIcon = ({ icon }) => (
    <button className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all font-bold">
        {icon}
    </button>
);

export default StudentCertificatesSection;
