import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RequestDetail = () => {
    const [status, setStatus] = useState('Pending');
    const [forwardTo, setForwardTo] = useState('Vice Principal, Mrs. Davis');

    return (
        <div className="max-w-[1200px] mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Breadcrumb + Title + Actions */}
            <div className="flex justify-between items-start">
                <div>
                    <button className="text-sm font-black text-slate-400 hover:text-blue-600 transition-all mb-4 flex items-center gap-2">← Back to Dashboard</button>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Request for 20 Copies of 'To Kill a Mockingbird'</h1>
                </div>
                {status === 'Pending' ? (
                    <div className="flex gap-3 flex-shrink-0 ml-8">
                        <button onClick={() => setStatus('Approved')} className="flex items-center gap-2 px-7 py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm shadow-lg shadow-emerald-100 hover:bg-emerald-600 active:scale-95 transition-all">
                            ✅ Approve
                        </button>
                        <button onClick={() => setStatus('Rejected')} className="flex items-center gap-2 px-7 py-4 bg-rose-500 text-white rounded-2xl font-black text-sm shadow-lg shadow-rose-100 hover:bg-rose-600 active:scale-95 transition-all">
                            ❌ Reject
                        </button>
                    </div>
                ) : (
                    <span className={`px-8 py-4 rounded-2xl font-black text-sm flex-shrink-0 ml-8 ${status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                        {status === 'Approved' ? '✅' : '❌'} {status}
                    </span>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left — Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Requester Info */}
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">Requester Information</h2>
                        <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-3xl">
                            <img src="https://i.pravatar.cc/150?u=johncarter" alt="" className="w-16 h-16 rounded-2xl object-cover" />
                            <div className="flex-1">
                                <p className="font-black text-slate-900 text-lg">Mr. John Carter</p>
                                <p className="text-sm font-bold text-slate-500">English Department</p>
                                <p className="text-sm font-bold text-blue-500">j.carter@school.edu</p>
                            </div>
                            <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-xs text-slate-600 hover:bg-slate-50 shadow-sm transition-all">View Profile</button>
                        </div>
                    </div>

                    {/* Request Message */}
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">Request Message</h2>
                        <div className="bg-blue-50/30 border border-blue-50 rounded-3xl p-8 text-slate-700 font-medium leading-relaxed space-y-4 text-sm">
                            <p className="text-blue-700 font-bold">Hello Principal Adams,</p>
                            <p>I would like to request the purchase of 20 new copies of 'To Kill a Mockingbird' for the 10th-grade English curriculum. Our current copies are over a decade old and are in significant disrepair, with many pages torn or missing.</p>
                            <p>This classic novel is a cornerstone of our syllabus, and having new, intact copies would greatly enhance the students' reading experience and ensure all students have access to a complete text.</p>
                            <p>I have attached a quote from our preferred supplier for your review. Thank you for your consideration.</p>
                            <p className="text-blue-700 font-bold">Best regards,<br />John Carter</p>
                        </div>
                    </div>

                    {/* Attached Documents */}
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">Attached Documents</h2>
                        <div className="space-y-4">
                            {[['Book_Supplier_Quote.pdf', '128 KB'], ['Curriculum_Justification.docx', '88 KB']].map(([name, size]) => (
                                <div key={name} className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all group cursor-pointer">
                                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">📄</div>
                                    <div className="flex-1">
                                        <p className="font-black text-slate-800 text-sm">{name}</p>
                                        <p className="text-[11px] font-bold text-slate-400 mt-0.5">{size}</p>
                                    </div>
                                    <button className="text-slate-400 hover:text-blue-600 transition-all text-xl">⬇</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right — Sidebar */}
                <div className="space-y-6 lg:self-start lg:sticky lg:top-8">
                    {/* Request Details */}
                    <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-5">
                        <h3 className="font-black text-slate-800 tracking-tight text-lg">Request Details</h3>
                        {[['Request ID', '#BK-2024-045', 'text-blue-600'], ['Submitted On', 'July 26, 2024', 'text-slate-800'], ['Status', status, status === 'Pending' ? 'text-amber-600' : status === 'Approved' ? 'text-emerald-600' : 'text-rose-600']].map(([label, val, cls]) => (
                            <div key={label} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
                                <p className="text-[11px] font-black text-blue-500 uppercase tracking-widest">{label}</p>
                                <p className={`font-black text-sm ${cls}`}>{val}</p>
                            </div>
                        ))}
                    </div>

                    {/* Forward for Consultation */}
                    <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-5">
                        <h3 className="font-black text-slate-800 tracking-tight text-lg">Forward for Consultation</h3>
                        <div className="space-y-3">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Select Administrator</label>
                            <select value={forwardTo} onChange={e => setForwardTo(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-800 appearance-none">
                                <option>Vice Principal, Mrs. Davis</option><option>Finance Head, Mr. Reeves</option><option>Academic Director</option>
                            </select>
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-50 text-blue-600 rounded-2xl font-black text-sm hover:bg-blue-100 transition-all border border-blue-100">
                            ➤ Forward Request
                        </button>
                    </div>

                    {/* Activity */}
                    <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-5">
                        <h3 className="font-black text-slate-800 tracking-tight text-lg">Activity</h3>
                        <div className="space-y-5">
                            {[['📧', 'Request submitted by John Carter', 'July 26, 2024 - 09:15 AM'], ['👁', 'Viewed by Principal Adams', 'July 26, 2024 - 11:30 AM']].map(([icon, action, time]) => (
                                <div key={action} className="flex gap-4">
                                    <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white text-sm flex-shrink-0">{icon}</div>
                                    <div>
                                        <p className="text-sm font-black text-slate-800">{action}</p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1">{time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestDetail;
