import React, { useState } from 'react';
import { motion } from 'framer-motion';

const StudentEventsSection = () => {
    const [activeTab, setActiveTab] = useState('Upcoming');

    const events = [
        {
            category: 'ACADEMIC',
            tag: 'REQUIRED',
            tagColor: 'bg-amber-100 text-amber-600',
            title: 'Annual Science Fair',
            desc: 'Showcasing the best student projects from across all grades.',
            date: 'Oct 26, 2024 | 9:00 AM - 4:00 PM',
            location: 'Main Gymnasium',
            catColor: 'bg-blue-100 text-blue-600'
        },
        {
            category: 'SPORTS',
            tag: 'OPTIONAL',
            tagColor: 'bg-slate-100 text-slate-500',
            title: 'Varsity Basketball Finals',
            desc: 'Cheer on our team in the championship game against Northwood High!',
            date: 'Nov 05, 2024 | 7:00 PM',
            location: 'Sports Arena',
            catColor: 'bg-emerald-100 text-emerald-600'
        },
        {
            category: 'CULTURAL',
            tag: 'OPTIONAL',
            tagColor: 'bg-slate-100 text-slate-500',
            title: 'Winter Music Concert',
            desc: 'A festive evening featuring performances by the school orchestra and choir.',
            date: 'Dec 12, 2024 | 6:30 PM',
            location: 'Auditorium',
            catColor: 'bg-purple-100 text-purple-600'
        }
    ];

    return (
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 animate-in fade-in duration-700">
            {/* Left Sidebar Filters */}
            <div className="w-full lg:w-72 space-y-12">
                <div className="space-y-6">
                    <h5 className="text-[11px] font-black text-slate-800 uppercase tracking-widest pl-1">Filters</h5>
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Date Range</label>
                            <input
                                type="text"
                                placeholder="mm/dd/yyyy"
                                className="w-full bg-white border border-slate-100 px-6 py-4 rounded-2xl font-bold text-xs shadow-sm focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Category</label>
                            <div className="space-y-3">
                                <SidebarCheckbox label="Academic" />
                                <SidebarCheckbox label="Sports" checked />
                                <SidebarCheckbox label="Cultural" />
                                <SidebarCheckbox label="Social" />
                                <SidebarCheckbox label="Workshops" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Attendance</label>
                            <div className="space-y-3">
                                <SidebarRadio label="All" checked />
                                <SidebarRadio label="Required" />
                                <SidebarRadio label="Optional" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 space-y-10">
                <div className="flex flex-wrap justify-between items-center gap-6">
                    <h1 className="text-5xl font-black text-slate-800 tracking-tight">School Events</h1>
                    <div className="relative group">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300">🔍</span>
                        <input
                            type="text"
                            placeholder="Search for events..."
                            className="pl-16 pr-8 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold shadow-premium focus:ring-4 focus:ring-blue-100 transition-all w-[350px] outline-none"
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-100 gap-12">
                    {['Upcoming Events', 'Past Events'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.split(' ')[0])}
                            className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === tab.split(' ')[0] ? 'text-blue-600' : 'text-slate-400 hover:text-slate-800'
                                }`}
                        >
                            {tab}
                            {activeTab === tab.split(' ')[0] && (
                                <motion.div layoutId="eventActiveTab" className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Event Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {events.map((event, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -8 }}
                            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col group transition-all"
                        >
                            <div className="p-10 flex-1 space-y-8 flex flex-col">
                                <div className="flex justify-between items-center">
                                    <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] ${event.catColor}`}>
                                        {event.category}
                                    </span>
                                    <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] ${event.tagColor}`}>
                                        {event.tag}
                                    </span>
                                </div>

                                <div className="space-y-4 flex-1">
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                                        {event.title}
                                    </h3>
                                    <p className="text-sm font-medium text-slate-400 leading-relaxed">
                                        {event.desc}
                                    </p>
                                </div>

                                <div className="h-px bg-slate-50 w-full"></div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-slate-500 font-bold text-xs">
                                        <span className="text-base">📅</span>
                                        {event.date}
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-500 font-bold text-xs">
                                        <span className="text-base">📍</span>
                                        {event.location}
                                    </div>
                                </div>

                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-8 rounded-xl shadow-xl shadow-blue-100 transition-all active:scale-95 uppercase tracking-widest text-[10px]">
                                    View Details
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const SidebarCheckbox = ({ label, checked = false }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
        <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${checked ? 'bg-blue-600' : 'border-2 border-slate-100 bg-white'
            }`}>
            {checked && <span className="text-white text-[10px]">✓</span>}
        </div>
        <span className={`text-xs font-black uppercase tracking-widest transition-colors ${checked ? 'text-slate-800' : 'text-slate-400 group-hover:text-slate-600'}`}>{label}</span>
    </label>
);

const SidebarRadio = ({ label, checked = false }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all border-2 ${checked ? 'border-blue-600 bg-white' : 'border-slate-100 bg-white'
            }`}>
            {checked && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
        </div>
        <span className={`text-xs font-black uppercase tracking-widest transition-colors ${checked ? 'text-slate-800' : 'text-slate-400 group-hover:text-slate-600'}`}>{label}</span>
    </label>
);

export default StudentEventsSection;
