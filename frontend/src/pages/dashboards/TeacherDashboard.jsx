import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const TeacherDashboard = () => {
    const { logout, user } = useAuth();
    const location = useLocation();

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <div className="w-72 bg-white border-r border-slate-100 flex flex-col">
                {/* Profile Header - Compact */}
                <div className="p-8 pb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-100">
                            {user?.name?.charAt(0) || "E"}
                        </div>
                        <div className="space-y-0.5">
                            <h2 className="text-sm font-black text-slate-800 tracking-tight leading-none">
                                {user?.name || "Ms. Eleanor Vance"}
                            </h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                {user?.role || "Teacher"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Unified Navigation - All options in one group */}
                <nav className="flex-1 px-4 space-y-0.5 py-4 overflow-y-auto no-scrollbar">
                    <SidebarLink to="/teacher/dashboard" icon="🔳" label="Dashboard" active={location.pathname === '/teacher/dashboard'} />
                    <SidebarLink to="/teacher/assignments" icon="📄" label="Assignments" active={location.pathname === '/teacher/assignments'} />
                    <SidebarLink to="/teacher/grading" icon="📝" label="Grading" active={location.pathname === '/teacher/grading'} />
                    <SidebarLink to="/teacher/classes" icon="🏫" label="Classes" active={location.pathname === '/teacher/classes'} />
                    <SidebarLink to="/teacher/students" icon="👥" label="Students" active={location.pathname === '/teacher/students'} />
                    <SidebarLink to="/teacher/routine" icon="🗓️" label="Routine" active={location.pathname === '/teacher/routine'} />
                    <SidebarLink to="/teacher/attendance" icon="📅" label="Calendar" active={location.pathname === '/teacher/attendance'} />
                    <SidebarLink to="/teacher/communication" icon="💬" label="Messages" active={location.pathname === '/teacher/communication'} />
                    <SidebarLink to="/teacher/profile" icon="👤" label="My Profile" active={location.pathname === '/teacher/profile'} />
                    <SidebarLink to="/teacher/settings" icon="⚙️" label="Settings" active={location.pathname === '/teacher/settings'} />
                    <SidebarLink to="/teacher/help" icon="❓" label="Help" active={location.pathname === '/teacher/help'} />

                    <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-rose-500 font-bold text-[13px] hover:bg-rose-50 rounded-xl transition-all mt-4 group"
                    >
                        <span className="text-lg opacity-70 group-hover:scale-110 transition-transform">📤</span>
                        <span className="tracking-tight">Logout</span>
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50">
                <div className="p-10">
                    <Outlet />
                </div>
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

export default TeacherDashboard;
