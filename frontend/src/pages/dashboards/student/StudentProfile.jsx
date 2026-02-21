import React from 'react';
import { motion } from 'framer-motion';

const StudentProfile = () => {
    const student = {
        name: "Alex Johnson",
        id: "12345678",
        personal: {
            fullName: "Alex Johnson",
            dob: "August 15, 2002",
            gender: "Male",
            nationality: "Canadian"
        },
        contact: {
            email: "alex.j@university.edu",
            phone: "+1 (123) 456-7890",
            address: "123 University Ave, Toronto, ON, M5G 1L7, Canada"
        },
        parents: {
            father: {
                name: "Robert Johnson",
                phone: "+1 (555) 123-4567",
                email: "r.johnson@email.com"
            },
            mother: {
                name: "Maria Johnson",
                phone: "+1 (555) 987-6543",
                email: "m.johnson@email.com"
            }
        },
        academic: {
            program: "Bachelor of Science",
            faculty: "Computer Science",
            enrollmentDate: "September 1, 2021",
            graduationDate: "April 30, 2025"
        },
        emergency: {
            name: "Jane Doe",
            relationship: "Mother",
            phone: "+1 (987) 654-3210"
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
                        <span className="text-slate-900">My Profile</span>
                    </div>
                    <div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tight">Student Profile</h1>
                        <p className="text-slate-500 font-medium mt-2">View and manage your personal, contact, and academic information.</p>
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
                        <InfoItem label="Full Name" value={student.personal.fullName} />
                        <InfoItem label="Date of Birth" value={student.personal.dob} />
                        <InfoItem label="Gender" value={student.personal.gender} />
                        <InfoItem label="Nationality" value={student.personal.nationality} />
                    </div>
                </div>

                {/* Contact Details */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Contact Details</h3>
                    <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                        <InfoItem label="Email Address" value={student.contact.email} />
                        <InfoItem label="Phone Number" value={student.contact.phone} />
                        <div className="col-span-2">
                            <InfoItem label="Mailing Address" value={student.contact.address} />
                        </div>
                    </div>
                </div>

                {/* Parent / Guardian Information */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8 md:col-span-2">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Parent / Guardian Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Father */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="text-blue-600 text-xl font-black">👤</span>
                                <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs">Father's Information</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-y-6">
                                <InfoItem label="Full Name" value={student.parents.father.name} />
                                <InfoItem label="Phone Number" value={student.parents.father.phone} />
                                <div className="col-span-2">
                                    <InfoItem label="Email Address" value={student.parents.father.email} />
                                </div>
                            </div>
                        </div>
                        {/* Mother */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="text-rose-500 text-xl font-black">👤</span>
                                <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs">Mother's Information</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-y-6">
                                <InfoItem label="Full Name" value={student.parents.mother.name} />
                                <InfoItem label="Phone Number" value={student.parents.mother.phone} />
                                <div className="col-span-2">
                                    <InfoItem label="Email Address" value={student.parents.mother.email} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Academic Program */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Academic Program</h3>
                    <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                        <InfoItem label="Program" value={student.academic.program} />
                        <InfoItem label="Faculty" value={student.academic.faculty} />
                        <InfoItem label="Enrollment Date" value={student.academic.enrollmentDate} />
                        <InfoItem label="Expected Graduation" value={student.academic.graduationDate} />
                    </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Emergency Contact</h3>
                    <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                        <InfoItem label="Contact Name" value={student.emergency.name} />
                        <InfoItem label="Relationship" value={student.emergency.relationship} />
                        <div className="col-span-2">
                            <InfoItem label="Phone Number" value={student.emergency.phone} />
                        </div>
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

export default StudentProfile;
