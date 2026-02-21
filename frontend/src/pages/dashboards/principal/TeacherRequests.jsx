import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const mockRequests = [
    { id: 1, title: '20 Copies of "To Kill a Mockingbird"', requester: 'John Carter', department: 'English', type: 'Resources', status: 'Pending', date: 'Jul 26, 2024', priority: 'High', avatar: 'https://i.pravatar.cc/150?img=11', code: "REQ-2024-045" },
    { id: 2, title: 'New Projector for Room 104', requester: 'Sarah Jenkins', department: 'Science', type: 'Equipment', status: 'Pending', date: 'Jul 25, 2024', priority: 'Medium', avatar: 'https://i.pravatar.cc/150?img=5', code: "REQ-2024-046" },
    { id: 3, title: 'Professional Development Leave (3 Days)', requester: 'Michael Chang', department: 'Math', type: 'Leave', status: 'Approved', date: 'Jul 24, 2024', priority: 'Low', avatar: 'https://i.pravatar.cc/150?img=14', code: "REQ-2024-041" },
    { id: 4, title: 'Repair AC in Staff Room', requester: 'Emma Wilson', department: 'General', type: 'Maintenance', status: 'Rejected', date: 'Jul 23, 2024', priority: 'High', avatar: 'https://i.pravatar.cc/150?img=9', code: "REQ-2024-039" },
    { id: 5, title: 'Field Trip Approval: Science Museum', requester: 'David Miller', department: 'Science', type: 'Event', status: 'Pending', date: 'Jul 26, 2024', priority: 'High', avatar: 'https://i.pravatar.cc/150?img=12', code: "REQ-2024-048" },
    { id: 6, title: 'Additional Lab Supplies for Term 2', requester: 'Sarah Jenkins', department: 'Science', type: 'Resources', status: 'Pending', date: 'Jul 27, 2024', priority: 'Medium', avatar: 'https://i.pravatar.cc/150?img=5', code: "REQ-2024-050" },
];

const KPICard = ({ title, value, icon, color, gradient }) => (
    <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        className={`relative overflow-hidden p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm`}
    >
        <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10 blur-2xl ${gradient}`}></div>
        <div className="flex justify-between items-start relative z-10">
            <div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
                <h3 className="text-4xl font-black text-slate-800 tracking-tighter">{value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg ${color}`}>
                {icon}
            </div>
        </div>
    </motion.div>
);

const TeacherRequests = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [requests, setRequests] = useState(mockRequests);

    const kpis = [
        { title: "Total Requests", value: requests.length, icon: "📋", color: "bg-blue-500 text-white shadow-blue-500/30", gradient: "bg-blue-500" },
        { title: "Pending", value: requests.filter(r => r.status === 'Pending').length, icon: "⏳", color: "bg-amber-500 text-white shadow-amber-500/30", gradient: "bg-amber-500" },
        { title: "Approved", value: requests.filter(r => r.status === 'Approved').length, icon: "✅", color: "bg-emerald-500 text-white shadow-emerald-500/30", gradient: "bg-emerald-500" },
        { title: "Rejected", value: requests.filter(r => r.status === 'Rejected').length, icon: "❌", color: "bg-rose-500 text-white shadow-rose-500/30", gradient: "bg-rose-500" },
    ];

    const filteredRequests = requests.filter(req => {
        const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) || req.requester.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = activeFilter === 'All' || req.status === activeFilter;
        return matchesSearch && matchesFilter;
    });

    const handleAction = (id, newStatus) => {
        setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-200';
            case 'Approved': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
            case 'Rejected': return 'bg-rose-50 text-rose-600 border-rose-200';
            default: return 'bg-slate-50 text-slate-600 border-slate-200';
        }
    };

    const getPriorityStyles = (priority) => {
        switch (priority) {
            case 'High': return 'text-rose-500 bg-rose-50';
            case 'Medium': return 'text-amber-500 bg-amber-50';
            case 'Low': return 'text-emerald-500 bg-emerald-50';
            default: return 'text-slate-500 bg-slate-50';
        }
    };

    return (
        <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Teacher Requests</h1>
                    <p className="text-slate-500 font-medium">Manage and review all incoming requests from the educational staff.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-sm text-slate-700 hover:bg-slate-50 active:scale-95 transition-all shadow-sm">
                        📥 Export Report
                    </button>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/30 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2">
                        <span>⚙️</span> Request Settings
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, idx) => (
                    <KPICard key={idx} {...kpi} />
                ))}
            </div>

            {/* Toolbar: Search and Filter */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="relative w-full lg:w-96">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                    <input
                        type="text"
                        placeholder="Search requests or teachers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    />
                </div>

                <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 custom-scrollbar">
                    {['All', 'Pending', 'Approved', 'Rejected'].map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-8 py-4 rounded-2xl font-black text-sm transition-all whitespace-nowrap ${activeFilter === filter
                                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                                    : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Requests List Area */}
            <div className="grid grid-cols-1 gap-5">
                <AnimatePresence>
                    {filteredRequests.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-white rounded-[3rem] border border-slate-100 p-20 flex flex-col items-center justify-center text-center shadow-sm"
                        >
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-4xl mb-6">
                                📭
                            </div>
                            <h3 className="text-xl font-black text-slate-800 mb-2">No Requests Found</h3>
                            <p className="text-slate-500 font-medium max-w-md">We couldn't find any requests matching your current filters. Try adjusting your search criteria.</p>
                        </motion.div>
                    ) : (
                        filteredRequests.map((req) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                key={req.id}
                                className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between cursor-pointer"
                                onClick={() => navigate('/principal/request-detail')}
                            >
                                {/* Request Info */}
                                <div className="flex gap-6 items-start w-full lg:w-auto">
                                    <div className="relative flex-shrink-0">
                                        <img src={req.avatar} alt="Avatar" className="w-16 h-16 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-50 text-xs">
                                            {req.priority === 'High' ? '🔥' : req.priority === 'Medium' ? '⚡' : '🌱'}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{req.code}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                                            <span className="text-xs font-bold text-slate-500">{req.date}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                                            <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${getPriorityStyles(req.priority)}`}>
                                                {req.priority} Priority
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-black text-slate-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{req.title}</h3>
                                        <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                                            <span>{req.requester}</span>
                                            <span className="w-4 h-[1px] bg-slate-300"></span>
                                            <span className="text-slate-400">{req.department} Dept.</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Actions & Status */}
                                <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end" onClick={e => e.stopPropagation()}>
                                    <div className="flex items-center gap-4">
                                        <div className={`px-4 py-2 border rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 ${getStatusStyles(req.status)}`}>
                                            <span className="w-2 h-2 rounded-full currentColor bg-current opacity-70"></span>
                                            {req.status}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {req.status === 'Pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleAction(req.id, 'Approved')}
                                                    className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center text-xl"
                                                    title="Approve"
                                                >
                                                    ✓
                                                </button>
                                                <button
                                                    onClick={() => handleAction(req.id, 'Rejected')}
                                                    className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white hover:shadow-lg hover:shadow-rose-500/30 transition-all flex items-center justify-center text-xl"
                                                    title="Reject"
                                                >
                                                    ✕
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={() => navigate('/principal/request-detail')}
                                            className="ml-2 px-6 py-3 bg-slate-900 text-white font-bold text-sm rounded-2xl hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    height: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #E2E8F0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #CBD5E1;
                }
            `}} />
        </div>
    );
};

export default TeacherRequests;
