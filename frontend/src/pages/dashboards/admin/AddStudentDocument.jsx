import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AddStudentDocument = () => {
    const [tab, setTab] = useState('single');
    const [saved, setSaved] = useState(false);
    const [dragging, setDragging] = useState(false);

    // Bulk upload state
    const [linkMethod, setLinkMethod] = useState('infer');
    const previewFiles = [
        { name: '12345_marksheet.pdf', id: '12345', status: 'Ready' },
        { name: '9876_admit_card.pdf', id: '9876', status: 'Ready' },
        { name: 'invalid_filename.pdf', id: '--', status: 'Error: No ID' },
    ];

    return (
        <div className="max-w-[1100px] mx-auto space-y-10 animate-in fade-in duration-700">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Add Student Document</h1>

            {/* Tab Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-2xl max-w-md">
                {[['single', 'Single Document Upload'], ['bulk', 'Bulk Document Upload']].map(([val, label]) => (
                    <button key={val} onClick={() => setTab(val)} className={`flex-1 py-3 rounded-xl font-black text-sm transition-all ${tab === val ? 'bg-white text-blue-600 shadow' : 'text-slate-400 hover:text-slate-600'}`}>
                        {label}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {tab === 'single' ? (
                    <motion.div key="single" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-10">
                        <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                            <h2 className="text-xl font-black text-slate-800 tracking-tight border-b border-slate-50 pb-6">Select Student</h2>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-xl">🔍</span>
                                <input placeholder="Search by Name or Student ID..." className="w-full pl-16 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-600" />
                            </div>
                        </div>

                        <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                            <h2 className="text-xl font-black text-slate-800 tracking-tight border-b border-slate-50 pb-6">Document Information</h2>
                            <div
                                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={() => setDragging(false)}
                                className={`border-2 border-dashed rounded-3xl p-16 flex flex-col items-center gap-4 transition-all cursor-pointer ${dragging ? 'border-blue-400 bg-blue-50/30' : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/10'}`}
                            >
                                <span className="text-4xl">☁️</span>
                                <p className="text-base font-bold"><span className="text-blue-600">Click to upload</span> or drag and drop</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PDF only (MAX. 10MB)</p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-700">Document Name</label>
                                    <input placeholder="e.g., Spring Semester Report Card" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-700">Document Category</label>
                                    <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-700 appearance-none">
                                        <option value="">Choose a category</option>
                                        <option>Report Card</option><option>Mark Sheet</option><option>Admit Card</option><option>Medical Record</option><option>Certificate</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700">Description (Optional)</label>
                                <textarea rows={3} placeholder="Add a brief description about the document..." className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-700 resize-none" />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button className="px-10 py-5 rounded-2xl font-black text-sm border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 transition-all">Cancel</button>
                            <button onClick={() => setSaved(true)} className="px-10 py-5 rounded-2xl font-black text-sm bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2">
                                📄 {saved ? 'Uploaded!' : 'Upload Document'}
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="bulk" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
                        {/* Breadcrumb */}
                        <p className="text-xs font-bold text-slate-400">Student Documents / Add Document / <span className="text-slate-900">Bulk Upload</span></p>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Bulk Document Upload</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {/* Left Steps */}
                            <div className="space-y-8">
                                {/* Step 1 */}
                                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                                    <h3 className="text-lg font-black text-blue-600 tracking-tight">Step 1: Upload Files</h3>
                                    <div className="border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center gap-4 hover:border-blue-300 hover:bg-blue-50/10 transition-all cursor-pointer">
                                        <span className="text-3xl">☁️</span>
                                        <p className="font-black text-slate-800">Drag & Drop PDFs here</p>
                                        <p className="text-slate-400 font-medium text-sm text-center">or click the button below to browse files from your computer.</p>
                                        <button className="px-8 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-sm hover:bg-slate-200 transition-all">Browse Files</button>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-5">
                                    <h3 className="text-lg font-black text-blue-600 tracking-tight">Step 2: Link to Students</h3>
                                    <p className="text-slate-500 font-medium text-sm">Choose how to link documents to students.</p>
                                    <div className="space-y-3">
                                        {[['infer', 'Infer from Filename'], ['manifest', 'Use Manifest File (CSV)']].map(([val, label]) => (
                                            <button key={val} onClick={() => setLinkMethod(val)} className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${linkMethod === val ? 'border-slate-900 bg-slate-50' : 'border-slate-100 hover:border-slate-200'}`}>
                                                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${linkMethod === val ? 'border-slate-900' : 'border-slate-300'}`}>
                                                    {linkMethod === val && <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />}
                                                </div>
                                                <span className="font-black text-slate-800">{label}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs font-medium text-slate-400">For manifest files, ensure the CSV contains 'student_id' and 'filename' columns. <span className="text-blue-600 font-bold cursor-pointer hover:underline">Download Template</span></p>
                                </div>

                                {/* Step 3 */}
                                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-5">
                                    <h3 className="text-lg font-black text-blue-600 tracking-tight">Step 3: Assign Category</h3>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-700">Document Type</label>
                                        <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-800 appearance-none">
                                            <option>Mark Sheet</option><option>Report Card</option><option>Admit Card</option><option>Certificate</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Right Preview */}
                            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6 h-fit sticky top-8">
                                <h3 className="text-lg font-black text-slate-800 tracking-tight">Upload Preview <span className="text-slate-400 font-bold">(3 files)</span></h3>
                                <div className="overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50/50">
                                                {['Filename', 'Student ID', 'Status'].map(h => (
                                                    <th key={h} className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {previewFiles.map((f, i) => (
                                                <tr key={i} className="hover:bg-slate-50/30 transition-all">
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-rose-500 text-lg">📄</span>
                                                            <span className="text-xs font-bold text-slate-700 truncate max-w-[120px]">{f.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 font-bold text-slate-600 text-sm">{f.id}</td>
                                                    <td className="px-5 py-4">
                                                        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${f.status === 'Ready' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                                            ● {f.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <button className="px-10 py-5 rounded-2xl font-black text-sm border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 transition-all">Cancel</button>
                            <button onClick={() => setSaved(true)} className="px-10 py-5 rounded-2xl font-black text-sm bg-slate-900 text-white shadow-xl hover:bg-slate-800 active:scale-95 transition-all">
                                {saved ? '✅ Uploaded!' : 'Upload All Documents'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AddStudentDocument;
