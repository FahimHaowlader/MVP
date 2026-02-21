import React, { useState } from 'react';
import { motion } from 'framer-motion';

const sections = [
    { id: 'personal', label: 'Personal Information', icon: '👤' },
    { id: 'academic', label: 'Academic Information', icon: '🎓' },
    { id: 'guardian', label: 'Parent/Guardian Info', icon: '👨‍👩‍👧' },
    { id: 'health', label: 'Health & Special Needs', icon: '🏥' },
    { id: 'library', label: 'Library Activity', icon: '📚' },
];

const EditStudentProfile = () => {
    const [active, setActive] = useState('personal');
    const [saved, setSaved] = useState(false);

    return (
        <div className="max-w-[1200px] mx-auto space-y-0 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex items-center gap-6 mb-10">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-inner border-2 border-slate-50">
                    <img src="https://i.pravatar.cc/150?u=amelia" alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Profile: Amelia Vance</h1>
                    <p className="text-sm font-bold text-slate-400 mt-1">Student ID: 84321</p>
                </div>
            </div>

            <div className="flex gap-10">
                {/* Side Nav */}
                <div className="w-56 flex-shrink-0 space-y-1 sticky top-8 self-start">
                    {sections.map(s => (
                        <button
                            key={s.id}
                            onClick={() => setActive(s.id)}
                            className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-left transition-all text-[13px] font-bold ${active === s.id ? 'bg-blue-50 text-blue-700 font-black' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                        >
                            <span className="text-base">{s.icon}</span>
                            {s.label}
                        </button>
                    ))}
                </div>

                {/* Form */}
                <div className="flex-1 space-y-8 pb-24">
                    {/* Personal Information */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                        <h2 className="text-xl font-black text-slate-800 tracking-tight border-b border-slate-50 pb-6">Personal Information</h2>
                        <div className="grid grid-cols-2 gap-6">
                            {[['Full Name', 'text', 'Amelia Vance'], ['Student ID', 'text', '84321']].map(([label, type, val]) => (
                                <div key={label} className="space-y-2">
                                    <label className="text-sm font-black text-slate-600">{label}</label>
                                    <input type={type} defaultValue={val} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all font-medium text-slate-800" />
                                </div>
                            ))}
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-600">Date of Birth</label>
                                <input type="date" defaultValue="2008-05-12" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-600">Gender</label>
                                <select defaultValue="Female" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800 appearance-none">
                                    <option>Female</option><option>Male</option><option>Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-600">Contact Email</label>
                                <input type="email" defaultValue="amelia.vance@example.com" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-800" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-600">Phone Number</label>
                                <input type="tel" defaultValue="555-0101" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-800" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-600">Address</label>
                            <textarea defaultValue="123 Learning Lane, Knowledge City, ED 45678" rows={2} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700 resize-none" />
                        </div>
                    </div>

                    {/* Academic Information */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                        <h2 className="text-xl font-black text-slate-800 tracking-tight border-b border-slate-50 pb-6">Academic Information</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-600">Current Class/Grade</label>
                                <select defaultValue="Grade 10" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800 appearance-none">
                                    {['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(g => <option key={g}>{g}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-600">Enrollment Date</label>
                                <input type="date" defaultValue="2022-09-01" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-600">Academic Performance Summary</label>
                            <textarea defaultValue="Excels in Mathematics and Science. Shows consistent improvement in Literature." rows={3} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700 resize-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-600">Achievements / Awards</label>
                            <textarea defaultValue={"1st Place - Regional Science Fair (2023)\nHonor Roll - Fall 2023"} rows={3} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700 resize-none" />
                        </div>
                    </div>

                    {/* Parent/Guardian */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                        <h2 className="text-xl font-black text-slate-800 tracking-tight border-b border-slate-50 pb-6">Parent/Guardian Information</h2>
                        <div className="grid grid-cols-2 gap-6">
                            {[['Guardian 1 Full Name', 'Sarah Vance'], ['Relationship', 'Mother'], ['Guardian 1 Email', 'sarah.vance@example.com'], ['Guardian 1 Phone', '555-0102']].map(([label, val]) => (
                                <div key={label} className="space-y-2">
                                    <label className="text-sm font-black text-slate-600">{label}</label>
                                    <input defaultValue={val} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-800" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Health */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                        <h2 className="text-xl font-black text-slate-800 tracking-tight border-b border-slate-50 pb-6">Health & Special Requirements</h2>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-600">Allergies</label>
                            <textarea defaultValue="Mild peanut allergy. Carries an EpiPen." rows={3} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700 resize-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-600">Special Accommodations/Notes</label>
                            <textarea defaultValue="Preferential seating near the front of the classroom due to slight visual impairment." rows={3} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700 resize-none" />
                        </div>
                    </div>

                    {/* Library Activity */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                        <h2 className="text-xl font-black text-slate-800 tracking-tight border-b border-slate-50 pb-6">Library Activity</h2>
                        <p className="text-slate-500 font-medium">Library borrowing history and activity are managed in a separate module.</p>
                        <button className="text-blue-600 font-black text-sm flex items-center gap-2 hover:underline">View Full Library History →</button>
                    </div>
                </div>
            </div>

            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-72 right-0 bg-white/95 backdrop-blur border-t border-slate-100 px-12 py-5 flex justify-end gap-4 z-50">
                <button className="px-10 py-4 rounded-2xl font-black text-sm text-slate-400 hover:text-slate-600 transition-all">Cancel</button>
                <button onClick={() => setSaved(true)} className="px-10 py-4 rounded-2xl font-black text-sm bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                    {saved ? '✅ Saved!' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default EditStudentProfile;
