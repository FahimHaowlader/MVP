import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PrincipalAddStaff = () => {
    const [saved, setSaved] = useState(false);

    return (
        <div className="max-w-[900px] mx-auto space-y-10 animate-in fade-in duration-700">
            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Add New Staff Member</h1>
                <p className="text-blue-600 font-bold mt-2">Enter the details below to add a new member to the library staff.</p>
            </div>

            {/* Personal Information */}
            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                <h2 className="text-xl font-black text-slate-800 tracking-tight border-b border-slate-50 pb-6">Personal Information</h2>
                <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700">Full Name</label>
                    <input placeholder="e.g., Jane Smith" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all font-medium text-slate-700" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">Email Address</label>
                        <input type="email" placeholder="e.g., jane.smith@school.edu" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">Phone Number</label>
                        <input type="tel" placeholder="e.g., (555) 123-4567" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700" />
                    </div>
                </div>
            </div>

            {/* Employment Details */}
            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                <h2 className="text-xl font-black text-slate-800 tracking-tight border-b border-slate-50 pb-6">Employment Details</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">Role/Position</label>
                        <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800 appearance-none">
                            <option>Librarian</option><option>Administrative Officer</option><option>IT Support</option><option>Counselor</option><option>Security</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">Department</label>
                        <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800 appearance-none">
                            <option>Main Library</option><option>Administration</option><option>IT Department</option><option>Counseling</option>
                        </select>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700">Employment Start Date</label>
                    <input type="date" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800" />
                </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                <h2 className="text-xl font-black text-slate-800 tracking-tight border-b border-slate-50 pb-6">Additional Information</h2>
                <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700">Initial Qualifications & Notes</label>
                    <textarea rows={5} placeholder="Add any relevant qualifications, previous experience, or notes..." className="w-full px-5 py-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700 resize-none" />
                </div>
            </div>

            <div className="border-t border-slate-100 pt-8 flex justify-end gap-4">
                <button className="px-10 py-5 rounded-2xl font-black text-sm border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 transition-all">Cancel</button>
                <button onClick={() => setSaved(true)} className="px-10 py-5 rounded-2xl font-black text-sm bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                    {saved ? '✅ Staff Added!' : 'Add Staff Member'}
                </button>
            </div>
        </div>
    );
};

export default PrincipalAddStaff;
