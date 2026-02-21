import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AddStudent = () => {
    const [saved, setSaved] = useState(false);

    return (
        <div className="max-w-[900px] mx-auto space-y-10 animate-in fade-in duration-700">
            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Add New Student</h1>
                <p className="text-slate-400 font-medium mt-2">Enter the details below to enroll a new student into the system.</p>
            </div>

            {/* Student Information */}
            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                <h2 className="text-xl font-black text-slate-800 tracking-tight border-b border-slate-50 pb-6">Student Information</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">Full Name</label>
                        <input placeholder="e.g., Jane Doe" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all font-medium text-slate-700" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">Student ID</label>
                        <input placeholder="e.g., S12345" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">Date of Birth</label>
                        <input type="date" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">Class / Grade</label>
                        <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800 appearance-none">
                            <option value="">Select a grade</option>
                            {['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(g => (
                                <option key={g}>{g}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Parent/Guardian */}
            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                <h2 className="text-xl font-black text-slate-800 tracking-tight border-b border-slate-50 pb-6">Parent/Guardian Contact</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">Full Name</label>
                        <input placeholder="e.g., John Smith" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700">Email Address</label>
                        <input type="email" placeholder="e.g., parent@example.com" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700">Phone Number</label>
                    <input type="tel" placeholder="e.g., (123) 456-7890" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700" />
                </div>
            </div>

            {/* Additional Notes */}
            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                <h2 className="text-xl font-black text-slate-800 tracking-tight border-b border-slate-50 pb-6">Additional Notes</h2>
                <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700">Health Notes & Special Requirements</label>
                    <textarea rows={4} placeholder="e.g., Allergic to peanuts. Requires an inhaler." className="w-full px-5 py-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700 resize-none" />
                </div>
            </div>

            {/* Actions */}
            <div className="border-t border-slate-100 pt-8 flex justify-end gap-4">
                <button className="px-10 py-5 rounded-2xl font-black text-sm border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 transition-all">Cancel</button>
                <button onClick={() => setSaved(true)} className="px-10 py-5 rounded-2xl font-black text-sm bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                    {saved ? '✅ Student Added!' : 'Add Student'}
                </button>
            </div>
        </div>
    );
};

export default AddStudent;
