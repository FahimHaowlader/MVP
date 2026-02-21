import React from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";
import useAuth from '../../hooks/useAuth';

const AdminDashboard = () => {
    const { logout, user } = useAuth();
    const location = useLocation();

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Premium Sidebar */}
            <div className="w-72 bg-white border-r border-slate-100 flex flex-col">
                <div className="p-8 pb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-200">
                        <span className="text-xl">⚙️</span>
                    </div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tighter">SchoolSys</h1>
                </div>

                <div className="p-8 py-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden shadow-inner border-2 border-white">
                            <img src={`https://i.pravatar.cc/150?u=${user?.email}`} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-0.5">
                            <h2 className="text-sm font-black text-slate-800 tracking-tight leading-none">
                                {user?.name || "System Admin"}
                            </h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                System Administrator
                            </p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-4 overflow-y-auto no-scrollbar space-y-6">

                    {/* ── Section 1: Overview ── */}
                    <div>
                        <p className="px-4 mb-2 text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Overview</p>
                        <div className="space-y-0.5">
                            <SidebarLink to="/admin/dashboard" icon="🏛️" label="Dashboard" active={location.pathname === '/admin/dashboard'} />
                            <SidebarLink to="/admin/calendar" icon="🗓️" label="School Calendar" active={location.pathname === '/admin/calendar'} />
                            <SidebarLink to="/admin/operations" icon="🛠️" label="Operations" active={location.pathname === '/admin/operations'} />
                            <SidebarLink to="/admin/scheduling" icon="⚙️" label="Scheduling" active={location.pathname === '/admin/scheduling'} />
                        </div>
                    </div>

                    {/* ── Section 2: Academic ── */}
                    <div>
                        <p className="px-4 mb-2 text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Academic</p>
                        <div className="space-y-0.5">
                            <SidebarLink to="/admin/syllabus" icon="📋" label="Syllabus" active={location.pathname === '/admin/syllabus'} />
                            <SidebarLink to="/admin/syllabus/review" icon="📝" label="Review Syllabus" active={location.pathname === '/admin/syllabus/review'} />
                            <SidebarLink to="/admin/routine" icon="📅" label="Routine Overview" active={location.pathname === '/admin/routine'} />
                            <SidebarLink to="/admin/routine/confirm" icon="▶️" label="Submit Routine" active={location.pathname === '/admin/routine/confirm'} />
                            <SidebarLink to="/admin/scheduler" icon="🗓️" label="Class Scheduler" active={location.pathname === '/admin/scheduler'} />
                        </div>
                    </div>

                    {/* ── Section 3: People & Records ── */}
                    <div>
                        <p className="px-4 mb-2 text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">People & Records</p>
                        <div className="space-y-0.5">
                            <SidebarLink to="/admin/staff" icon="👨‍💼" label="Staff Profiles" active={location.pathname === '/admin/staff'} />
                            <SidebarLink to="/admin/staff/add" icon="👤" label="Add Staff" active={location.pathname === '/admin/staff/add'} />
                            <SidebarLink to="/admin/teachers/add" icon="🧑‍🏫" label="Add Teacher" active={location.pathname === '/admin/teachers/add'} />
                            <SidebarLink to="/admin/students/add" icon="➕" label="Add Student" active={location.pathname === '/admin/students/add'} />
                            <SidebarLink to="/admin/students/document" icon="📄" label="Add Document" active={location.pathname === '/admin/students/document'} />
                        </div>
                    </div>

                    {/* ── Section 4: Finance & Events ── */}
                    <div>
                        <p className="px-4 mb-2 text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Finance & Events</p>
                        <div className="space-y-0.5">
                            <SidebarLink to="/admin/fees" icon="💳" label="Fee Management" active={location.pathname === '/admin/fees'} />
                            <SidebarLink to="/admin/fees/upload" icon="💰" label="Upload Payments" active={location.pathname === '/admin/fees/upload'} />
                            <SidebarLink to="/admin/events" icon="🏆" label="Event Results" active={location.pathname === '/admin/events'} />
                            <SidebarLink to="/admin/events/add" icon="📅" label="Add Event" active={location.pathname === '/admin/events/add'} />
                            <SidebarLink to="/admin/events/add-results" icon="📝" label="Add Results" active={location.pathname === '/admin/events/add-results'} />
                            <SidebarLink to="/admin/edit-results" icon="✏️" label="Edit Results" active={location.pathname === '/admin/edit-results'} />
                            <SidebarLink to="/admin/certificates" icon="🎖️" label="E-Certificates" active={location.pathname.startsWith('/admin/certificates')} />
                        </div>
                    </div>

                    <div className="pt-2 border-t border-slate-50">
                        <button
                            onClick={logout}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-rose-500 font-bold text-[13px] hover:bg-rose-50 rounded-xl transition-all group"
                        >
                            <span className="text-lg opacity-70 group-hover:scale-110 transition-transform">📤</span>
                            <span className="tracking-tight">Logout</span>
                        </button>
                    </div>
                </nav>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50/50">
                <main className="p-12">
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
            ? 'bg-slate-900 text-white shadow-md shadow-slate-200'
            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
    >
        <span className={`text-lg transition-transform duration-200 ${active ? 'scale-110' : 'opacity-70 group-hover:opacity-100'}`}>{icon}</span>
        <span className="tracking-tight">{label}</span>
    </Link>
);

export default AdminDashboard;
