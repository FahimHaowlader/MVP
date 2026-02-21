import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const StudentDashboard = () => {
    const { logout, user } = useAuth();
    const location = useLocation();

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <div className="w-72 bg-white border-r border-slate-100 flex flex-col">
                {/* Profile Header */}
                <div className="p-8 pb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-100">
                            {user?.name?.charAt(0) || "B"}
                        </div>
                        <div className="space-y-0.5">
                            <h2 className="text-sm font-black text-slate-800 tracking-tight leading-none uppercase">
                                {user?.name || "Bernice"}
                            </h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">
                                {user?.department || user?.grade || "Computer Science"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Unified Navigation - Matching Teacher Style */}
                <nav className="flex-1 px-4 space-y-0.5 py-4 overflow-y-auto no-scrollbar">
                    <SidebarLink to="/student/dashboard" icon="🔳" label="Dashboard" active={location.pathname === '/student/dashboard'} />
                    <SidebarLink to="/student/routine" icon="🗓️" label="Routine" active={location.pathname === '/student/routine'} />
                    <SidebarLink to="/student/grading" icon="📝" label="Grades" active={location.pathname === '/student/grading'} />
                    <SidebarLink to="/student/attendance" icon="📅" label="Attendance" active={location.pathname === '/student/attendance'} />
                    <SidebarLink to="/student/tasks" icon="📋" label="My Tasks" active={location.pathname === '/student/tasks'} />
                    <SidebarLink to="/student/calendar" icon="🗓️" label="Calendar" active={location.pathname === '/student/calendar'} />
                    <SidebarLink to="/student/announcements" icon="📢" label="Announcements" active={location.pathname === '/student/announcements'} />
                    <SidebarLink to="/student/events" icon="🎁" label="Events" active={location.pathname === '/student/events'} />
                    <SidebarLink to="/student/finance" icon="💳" label="Fees" active={location.pathname === '/student/finance'} />
                    <SidebarLink to="/student/syllabus" icon="📖" label="Syllabus" active={location.pathname === '/student/syllabus'} />
                    <SidebarLink to="/student/certificates" icon="🎖️" label="Certificates" active={location.pathname === '/student/certificates'} />
                    <SidebarLink to="/student/support" icon="🤝" label="Student Support" active={location.pathname === '/student/support'} />
                    <SidebarLink to="/student/profile" icon="👤" label="My Profile" active={location.pathname === '/student/profile'} />
                    <SidebarLink to="/student/settings" icon="⚙️" label="Settings" active={location.pathname === '/student/settings'} />

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
            <div className="flex-1 overflow-y-auto bg-slate-50/50">
                <main className="">
                    <Outlet />
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

export default StudentDashboard;
