import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth";

const SidebarLink = ({ to, icon, label, active, badge, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-[13px] transition-all duration-300 relative group active:scale-95 ${active
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
            : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
            }`}
    >
        <span className={`text-lg transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110 opacity-70 group-hover:opacity-100'}`}>{icon}</span>
        <span className="tracking-tight flex-1">{label}</span>
        {badge && (
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-rose-500 text-white'}`}>
                {badge}
            </span>
        )}
        {active && (
            <motion.div
                layoutId="activeGlow"
                className="absolute inset-0 bg-white/10 rounded-2xl blur-md -z-10"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
        )}
    </Link>
);

const NavSection = ({ title, children }) => (
    <div className="space-y-1">
        <p className="px-4 mb-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{title}</p>
        <div className="space-y-1">
            {children}
        </div>
    </div>
);

const PrincipalDashboard = () => {
    const { logout, user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans text-slate-900">
            {/* ── Sidebar ── */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 300 : 80 }}
                className="bg-[#0F172A] border-r border-slate-800 flex flex-col relative z-50 shadow-2xl"
            >
                {/* Toggle Button */}
                <button
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-3 top-10 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-500 transition-colors z-50"
                >
                    <span className="text-[10px]">{isSidebarOpen ? '❮' : '❯'}</span>
                </button>

                {/* Logo Area */}
                <div className="p-7 mb-4 flex items-center gap-4 overflow-hidden whitespace-nowrap">
                    <div className="min-w-[44px] min-h-[44px] bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                        <span className="text-2xl font-black">S</span>
                    </div>
                    <AnimatePresence>
                        {isSidebarOpen && (
                            <motion.h1
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="text-2xl font-black text-white tracking-tighter"
                            >
                                SchoolSys<span className="text-blue-500">.</span>
                            </motion.h1>
                        )}
                    </AnimatePresence>
                </div>

                {/* User Profile Hook */}
                <div className={`mx-4 mb-8 p-4 rounded-3xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm transition-all overflow-hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-blue-500/50 flex-shrink-0">
                            <img src={`https://i.pravatar.cc/150?u=${user?.email}`} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-black text-slate-100 truncate tracking-tight">{user?.name || "Principal Adams"}</p>
                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest truncate">Principal</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Scroll Area */}
                <nav className="flex-1 px-4 pb-8 overflow-y-auto custom-scrollbar space-y-8">

                    <NavSection title="Core">
                        <SidebarLink to="/principal/dashboard" icon="🏛️" label="Overview" active={location.pathname === '/principal/dashboard' || location.pathname === '/principal'} />
                        <SidebarLink to="/principal/notifications" icon="🔔" label="Inbox" active={location.pathname === '/principal/notifications'} badge="3" />
                        <SidebarLink to="/principal/requests" icon="📋" label="Teacher Requests" active={location.pathname === '/principal/requests'} />
                        <SidebarLink to="/principal/events" icon="🏟️" label="School Events" active={location.pathname.startsWith('/principal/events')} />
                    </NavSection>

                    <NavSection title="Academic Management">
                        <SidebarLink to="/principal/classes" icon="🏫" label="Manage Classes" active={location.pathname === '/principal/classes'} />
                        <SidebarLink to="/principal/routine-selector" icon="📆" label="Time Tables" active={location.pathname === '/principal/routine-selector'} />
                        <SidebarLink to="/principal/exam-routine" icon="📝" label="Exam Planning" active={location.pathname.startsWith('/principal/exam-routine')} />
                    </NavSection>

                    <NavSection title="Human Resources">
                        <SidebarLink to="/principal/staff-directory" icon="👥" label="Staff Directory" active={location.pathname === '/principal/staff-directory'} />
                        <SidebarLink to="/principal/staff-attendance" icon="✅" label="Attendance" active={location.pathname === '/principal/staff-attendance'} />
                        <SidebarLink to="/principal/staff-qualifications" icon="🎓" label="Qualifications" active={location.pathname === '/principal/staff-qualifications'} />
                        <SidebarLink to="/principal/teacher-schedule" icon="🗃" label="Teacher Load" active={location.pathname === '/principal/teacher-schedule'} />
                    </NavSection>

                    <NavSection title="Insights & Intelligence">
                        <SidebarLink to="/principal/school-performance" icon="📊" label="School Health" active={location.pathname === '/principal/school-performance'} />
                        <SidebarLink to="/principal/teacher-performance" icon="📈" label="Teacher KPIs" active={location.pathname.startsWith('/principal/teacher-performance')} />
                        <SidebarLink to="/principal/class-performance" icon="🏆" label="Class Rank" active={location.pathname === '/principal/class-performance'} />
                    </NavSection>

                    <NavSection title="Infrastructure">
                        <SidebarLink to="/principal/library-staff" icon="📚" label="Library" active={location.pathname === '/principal/library-staff'} />
                        <SidebarLink to="/principal/rooms/restore" icon="🔄" label="Room Recovery" active={location.pathname === '/principal/rooms/restore'} />
                        <SidebarLink to="/principal/global" icon="🌐" label="Settings" active={location.pathname === '/principal/global'} />
                    </NavSection>

                    {/* Logout */}
                    <div className="pt-4 border-t border-slate-800">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 text-rose-400 font-bold text-[13px] hover:bg-rose-500/10 rounded-2xl transition-all group"
                        >
                            <span className="text-lg group-hover:scale-110 transition-transform">📤</span>
                            <span className="tracking-tight">{isSidebarOpen && "Logout"}</span>
                        </button>
                    </div>
                </nav>
            </motion.aside>

            {/* ── Main Content Area ── */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Header / Top Bar */}
                <header className="h-20 bg-white/70 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 flex-shrink-0 z-40">
                    <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
                        <span>Principal</span>
                        <span>/</span>
                        <span className="text-slate-900">{location.pathname.split('/').pop()?.replace('-', ' ') || 'Overview'}</span>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Search Mini */}
                        <div className="relative group hidden md:block">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">🔍</span>
                            <input
                                type="text"
                                placeholder="Search everything..."
                                className="pl-12 pr-6 py-2.5 bg-slate-100 border-none rounded-2xl text-xs font-bold focus:ring-2 ring-blue-500/20 transition-all w-64"
                            />
                        </div>

                        {/* Calendar Icon */}
                        <button className="w-11 h-11 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-xl shadow-sm hover:shadow-md hover:bg-slate-50 transition-all">
                            📅
                        </button>

                        {/* Notifications */}
                        <button className="w-11 h-11 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-xl shadow-sm hover:shadow-md hover:bg-slate-50 transition-all relative">
                            🔔
                            <span className="absolute top-2.5 right-2.5 w-3 h-3 bg-rose-500 border-2 border-white rounded-full"></span>
                        </button>
                    </div>
                </header>

                {/* Content Viewport */}
                <main className="flex-1 overflow-y-auto bg-[#F8FAFC] custom-scrollbar">
                    <div className="p-10">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Global CSS for scrollbar */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #CBD5E1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94A3B8;
                }
                aside .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #334155;
                }
                aside .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #475569;
                }
            `}} />
        </div>
    );
};

export default PrincipalDashboard;
