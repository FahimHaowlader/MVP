import React, { useState } from 'react';
import { motion } from 'framer-motion';

const staffList = [
    {
        name: 'Johnathan Doe',
        role: 'Librarian',
        dept: 'Main Library',
        email: 'j.doe@university.edu',
        phone: '(555) 123-4567',
        experience: '15+ Years',
        quote: '"I\'ve read every book in the classics section twice!"',
        avatar: 'https://i.pravatar.cc/150?u=jdoe',
        attendance: '98%',
        qualifications: [
            { degree: 'Master of Library and Information Science (MLIS)', school: 'University of Knowledge, 2008' },
            { degree: 'Certified Public Librarian (CPL)', school: 'National Library Association, 2010' },
            { degree: 'Advanced Digital Archiving Training', school: 'TechLearn Institute, 2022' },
        ],
        emergency: { name: 'Jane Doe', relation: 'Spouse', phone: '(555) 987-6543' },
    },
    {
        name: 'Sarah Mitchell',
        role: 'Administrative Officer',
        dept: 'Administration',
        email: 's.mitchell@university.edu',
        phone: '(555) 234-5678',
        experience: '8 Years',
        quote: '"Details make perfection, and perfection is not a detail."',
        avatar: 'https://i.pravatar.cc/150?u=smitchell',
        attendance: '95%',
        qualifications: [
            { degree: 'BSc in Business Administration', school: 'State University, 2015' },
            { degree: 'Certified Office Manager', school: 'Professional Institute, 2016' },
        ],
        emergency: { name: 'Tom Mitchell', relation: 'Spouse', phone: '(555) 876-5432' },
    },
    {
        name: 'Carlos Mendez',
        role: 'IT Support Specialist',
        dept: 'IT Department',
        email: 'c.mendez@university.edu',
        phone: '(555) 345-6789',
        experience: '5 Years',
        quote: '"Have you tried turning it off and on again?"',
        avatar: 'https://i.pravatar.cc/150?u=cmendez',
        attendance: '99%',
        qualifications: [
            { degree: 'BSc in Computer Science', school: 'Tech University, 2018' },
            { degree: 'CompTIA A+ Certified', school: 'CompTIA, 2019' },
        ],
        emergency: { name: 'Maria Mendez', relation: 'Parent', phone: '(555) 765-4321' },
    },
];

const StaffProfiles = () => {
    const [selected, setSelected] = useState(staffList[0]);

    return (
        <div className="max-w-[1400px] mx-auto space-y-12 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Human Resources</p>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Staff Directory</h1>
                </div>
                <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl hover:bg-slate-800 active:scale-95 transition-all">
                    ➕ Add Staff
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Staff List */}
                <div className="space-y-4">
                    {staffList.map((s, i) => (
                        <motion.button
                            key={i}
                            whileHover={{ x: 4 }}
                            onClick={() => setSelected(s)}
                            className={`w-full p-6 rounded-3xl flex items-center gap-5 text-left transition-all border ${selected.name === s.name ? 'bg-slate-900 border-slate-900 shadow-2xl shadow-slate-200' : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'}`}
                        >
                            <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner">
                                <img src={s.avatar} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className={`font-black tracking-tight ${selected.name === s.name ? 'text-white' : 'text-slate-800'}`}>{s.name}</p>
                                <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${selected.name === s.name ? 'text-slate-400' : 'text-slate-400'}`}>{s.role}</p>
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Profile Detail */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Breadcrumb */}
                    <p className="text-xs font-bold text-slate-400 tracking-widest">
                        Home / <span className="text-slate-600">Staff</span> / <span className="text-slate-900">{selected.name}</span>
                    </p>

                    {/* Header Card */}
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex items-center gap-8">
                        <div className="w-28 h-28 rounded-3xl overflow-hidden shadow-xl flex-shrink-0">
                            <img src={selected.avatar} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selected.name}</h2>
                            <p className="text-slate-500 font-bold mt-1">{selected.role}</p>
                            <p className="text-slate-400 italic text-sm mt-2">{selected.quote}</p>
                        </div>
                        <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all flex items-center gap-2 flex-shrink-0">
                            ✏️ Edit Profile
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Personal Info */}
                        <div className="md:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">Personal Information</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">
                                {selected.name} is a dedicated {selected.role.toLowerCase()} with {selected.experience} of experience in academic environments. They are committed to excellence in their department.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50">
                                    <span className="text-xl">✉️</span>
                                    <span className="font-bold text-slate-700">{selected.email}</span>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50">
                                    <span className="text-xl">📞</span>
                                    <span className="font-bold text-slate-700">{selected.phone}</span>
                                </div>
                            </div>

                            {/* Qualifications */}
                            <div className="pt-6 border-t border-slate-50 space-y-6">
                                <h3 className="text-xl font-black text-slate-800 tracking-tight">Qualifications</h3>
                                {selected.qualifications.map((q, i) => (
                                    <div key={i} className="flex gap-5">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl flex-shrink-0">🎓</div>
                                        <div>
                                            <p className="font-black text-slate-800 tracking-tight">{q.degree}</p>
                                            <p className="text-[11px] font-bold text-blue-600 mt-1">{q.school}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Sidebar Cards */}
                        <div className="space-y-6">
                            {/* Employment */}
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                                <h3 className="text-lg font-black text-slate-800 tracking-tight">Employment Details</h3>
                                <div className="space-y-4">
                                    {[['Position', selected.role], ['Department', selected.dept], ['Experience', selected.experience]].map(([label, val]) => (
                                        <div key={label}>
                                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{label}</p>
                                            <p className="font-black text-slate-800 tracking-tight mt-1">{val}</p>
                                        </div>
                                    ))}
                                    <button className="text-blue-600 font-black text-[11px] uppercase tracking-widest flex items-center gap-2 hover:underline mt-2">
                                        🔗 LinkedIn Profile
                                    </button>
                                </div>
                            </div>

                            {/* Emergency */}
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-5">
                                <h3 className="text-lg font-black text-slate-800 tracking-tight">Emergency Contact</h3>
                                {[['Name', selected.emergency.name], ['Relationship', selected.emergency.relation], ['Phone', selected.emergency.phone]].map(([label, val]) => (
                                    <div key={label}>
                                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{label}</p>
                                        <p className="font-black text-slate-800 tracking-tight mt-1">{val}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Attendance */}
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-5">
                                <h3 className="text-lg font-black text-slate-800 tracking-tight">Attendance</h3>
                                <div>
                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">YTD Attendance</p>
                                    <p className="text-4xl font-black text-slate-900 tracking-tighter mt-1">{selected.attendance}</p>
                                </div>
                                <button className="text-blue-600 font-black text-[11px] uppercase tracking-widest flex items-center gap-2 hover:underline">
                                    📅 View Full Record
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffProfiles;
