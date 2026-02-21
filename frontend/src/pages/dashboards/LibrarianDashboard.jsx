import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const LibrarianDashboard = () => {
    const { logout, user } = useAuth();
    const location = useLocation();

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Premium Sidebar */}
            <div className="w-72 bg-white border-r border-slate-100 flex flex-col">
                <div className="p-8 pb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                        <span className="text-xl">📚</span>
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
                                {user?.name || "Demo Librarian"}
                            </h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                Librarian
                            </p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-0.5 py-4 overflow-y-auto no-scrollbar">
                    <SidebarLink to="/librarian/dashboard" icon="📊" label="Dashboard" active={location.pathname === '/librarian/dashboard'} />
                    <SidebarLink to="/librarian/issue" icon="📘" label="Issue Book" active={location.pathname === '/librarian/issue'} />
                    <SidebarLink to="/librarian/return" icon="↩️" label="Return Book" active={location.pathname === '/librarian/return'} />
                    <SidebarLink to="/librarian/books" icon="📚" label="Manage Books" active={location.pathname === '/librarian/books'} />
                    <SidebarLink to="/librarian/students" icon="👨‍🎓" label="Manage Students" active={location.pathname === '/librarian/students'} />

                    <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-rose-500 font-bold text-[13px] hover:bg-rose-50 rounded-xl transition-all mt-4 group"
                    >
                        <span className="text-lg opacity-70 group-hover:scale-110 transition-transform">📤</span>
                        <span className="tracking-tight">Logout</span>
                    </button>
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
            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
    >
        <span className={`text-lg transition-transform duration-200 ${active ? 'scale-110' : 'opacity-70 group-hover:opacity-100'}`}>{icon}</span>
        <span className="tracking-tight">{label}</span>
    </Link>
);

export default LibrarianDashboard;
