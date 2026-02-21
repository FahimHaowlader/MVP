import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const ParentProfile = () => {
    const { user } = useAuth();
    const { children } = useOutletContext();

    const parentData = {
        name: user?.name || 'Demo Parent',
        personal: {
            fullName: user?.name || 'Demo Parent',
            email: user?.email || 'parent@school.com',
            phone: '+1 (555) 123-4567',
            address: '123 Maple Street, Anytown, USA 12345'
        },
        emergency: {
            contact: '+1 (555) 765-4321',
            relationship: 'Spouse'
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* Header Area */}
            <div className="flex justify-between items-end">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                        <span>Dashboard</span>
                        <span>/</span>
                        <span className="text-slate-900">Parent Profile</span>
                    </div>
                    <div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tight">Parent Profile</h1>
                        <p className="text-slate-500 font-medium mt-2">View and manage your personal details and linked student accounts.</p>
                    </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-blue-100 flex items-center gap-3 transition-all active:scale-95 uppercase tracking-widest text-[11px]">
                    <span className="text-lg">✎</span> Edit Profile
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                        <InfoItem label="Full Name" value={parentData.personal.fullName} />
                        <InfoItem label="Email Address" value={parentData.personal.email} />
                        <InfoItem label="Phone Number" value={parentData.personal.phone} />
                    </div>
                </div>

                {/* Contact & Address */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Contact & Address</h3>
                    <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                        <div className="col-span-2">
                            <InfoItem label="Residential Address" value={parentData.personal.address} />
                        </div>
                        <InfoItem label="Emergency Contact" value={parentData.emergency.contact} />
                        <InfoItem label="Relationship" value={parentData.emergency.relationship} />
                    </div>
                </div>

                {/* My Children Section */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8 md:col-span-2">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Linked Students</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {children && children.length > 0 ? (
                            children.map((child, i) => (
                                <div key={i} className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between group hover:border-blue-200 hover:bg-white transition-all duration-300">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-3xl overflow-hidden bg-blue-100 flex items-center justify-center text-2xl shadow-inner">
                                            🎓
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-xl font-black text-slate-800 tracking-tight">{child.name}</h4>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                {child.className} - {child.section}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="text-blue-600 font-black text-[11px] uppercase tracking-widest hover:underline transition-all pr-4">
                                        Student Dashboard
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-400 font-medium">No linked students found.</p>
                        )}
                    </div>
                </div>

                {/* Account Settings */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8 md:col-span-2">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Account Settings</h3>
                    <div className="flex flex-wrap gap-4">
                        <button className="bg-slate-50 hover:bg-slate-100 px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-600 transition-all active:scale-95 flex items-center gap-2">
                            <span>🔄</span> Change Password
                        </button>
                        <button className="bg-slate-50 hover:bg-slate-100 px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-600 transition-all active:scale-95 flex items-center gap-2">
                            <span>🔔</span> Manage Notifications
                        </button>
                        <button className="bg-rose-50 hover:bg-rose-100 px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest text-rose-600 transition-all active:scale-95 flex items-center gap-2 ml-auto">
                            <span>🚪</span> Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ label, value }) => (
    <div className="space-y-1">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-sm font-black text-slate-800 tracking-tight leading-snug">{value}</p>
    </div>
);

export default ParentProfile;
