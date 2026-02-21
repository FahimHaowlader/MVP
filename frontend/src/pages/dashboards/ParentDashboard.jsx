import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const ParentDashboard = () => {
    const { logout, user } = useAuth();
    const location = useLocation();
    const [children, setChildren] = useState([]);
    const [selectedChild, setSelectedChild] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChildren = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5001/api/parent/children', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setChildren(res.data);
                if (res.data.length > 0) {
                    setSelectedChild(res.data[0]);
                }
            } catch (err) {
                console.error("Error fetching children:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchChildren();
    }, []);

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <div className="w-72 bg-white border-r border-slate-100 flex flex-col">
                {/* Logo Section */}
                <div className="p-8 pb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
                        <span className="text-xl">🎓</span>
                    </div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tighter">SchoolSys</h1>
                </div>

                {/* Profile Header */}
                <div className="p-8 py-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden shadow-inner border-2 border-white">
                            <img src={`https://i.pravatar.cc/150?u=${user?.email}`} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-0.5">
                            <h2 className="text-sm font-black text-slate-800 tracking-tight leading-none">
                                {user?.name || "John Doe"}
                            </h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                Parent Account
                            </p>
                        </div>
                    </div>
                </div>                {/* Vertical Student Hub */}
                {children.length > 0 && (
                    <div className="px-4 py-6 space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block ml-4 mb-2">My Children</label>
                        <div className="space-y-2">
                            {children.map(child => (
                                <motion.button
                                    key={child._id}
                                    whileHover={{ x: 4 }}
                                    onClick={() => setSelectedChild(child)}
                                    className={`w-full p-3 rounded-[1.5rem] flex items-center gap-4 transition-all duration-300 border ${selectedChild?._id === child._id
                                            ? 'bg-slate-900 border-slate-900 shadow-2xl shadow-slate-200'
                                            : 'bg-white border-slate-50 hover:bg-slate-50'
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black shadow-inner ${selectedChild?._id === child._id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                                        }`}>
                                        {child.name.charAt(0)}
                                    </div>
                                    <div className="text-left flex-1 min-w-0">
                                        <p className={`text-[13px] font-black truncate tracking-tight leading-none ${selectedChild?._id === child._id ? 'text-white' : 'text-slate-700'
                                            }`}>
                                            {child.name.split(' ')[0]}
                                        </p>
                                        <p className={`text-[9px] font-bold uppercase tracking-widest mt-1 ${selectedChild?._id === child._id ? 'text-slate-400' : 'text-slate-400'
                                            }`}>
                                            Grade {child.className}
                                        </p>
                                    </div>
                                    {selectedChild?._id === child._id && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 animate-pulse" />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                )}
                {/* Unified Navigation */}
                <nav className="flex-1 px-4 space-y-0.5 py-4 overflow-y-auto no-scrollbar">
                    <SidebarLink to="/parent/profile" icon="👤" label="Profile" active={location.pathname === '/parent/profile'} />
                    <SidebarLink to="/parent/attendance" icon="📅" label="Attendance" active={location.pathname === '/parent/attendance'} />
                    <SidebarLink to="/parent/results" icon="📊" label="Results" active={location.pathname === '/parent/results'} />
                    <SidebarLink to="/parent/finance" icon="💳" label="Fees" active={location.pathname === '/parent/finance'} />
                    <SidebarLink to="/parent/communication" icon="✉️" label="Communication" active={location.pathname === '/parent/communication'} />
                    <SidebarLink to="/parent/security" icon="🔒" label="Security" active={location.pathname === '/parent/security'} />

                    <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-rose-500 font-bold text-[13px] hover:bg-rose-50 rounded-xl transition-all mt-4 group"
                    >
                        <span className="text-lg opacity-70 group-hover:scale-110 transition-transform">📤</span>
                        <span className="tracking-tight">Logout</span>
                    </button>
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50 flex flex-col">
                {/* Clean Context Header */}
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-12 py-6 sticky top-0 z-20 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Active Session</p>
                            <p className="text-sm font-black text-slate-800 tracking-tight mt-1">Monitoring: <span className="text-blue-600">{selectedChild?.name}</span></p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Academic Term</p>
                            <p className="text-sm font-black text-slate-800 tracking-tight mt-1">Fall 2024</p>
                        </div>
                        <div className="h-8 w-px bg-slate-100" />
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl hover:bg-slate-100 transition-colors cursor-pointer group">
                            <span className="group-hover:rotate-12 transition-transform">🔔</span>
                        </div>
                    </div>
                </header>

                <main className="p-12 flex-1">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
                        </div>
                    ) : (
                        <Outlet context={{ selectedChild, children }} />
                    )}
                </main>
            </div>
        </div>
    );
};

const SidebarLink = ({ to, icon, label, active }) => (
    <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-[13px] transition-all duration-200 active:scale-95 ${active
            ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
    >
        <span className={`text-lg transition-transform duration-200 ${active ? 'scale-110' : 'opacity-70 group-hover:opacity-100'}`}>{icon}</span>
        <span className="tracking-tight">{label}</span>
    </Link>
);

export default ParentDashboard;

