import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AssignmentsSection = () => {
    const [view, setView] = useState('list'); // 'list', 'create', 'edit'
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAssignment, setSelectedAssignment] = useState(null);

    const [assignmentData, setAssignmentData] = useState({
        title: '',
        description: '',
        classes: ['Biology 101'],
        subject: 'Science',
        type: 'Project',
        dueDate: '',
        dueTime: '',
        published: true,
        attachments: [{ name: 'Lab_Rubric.pdf', size: '1.2 MB' }]
    });

    const assignments = [
        {
            id: 1,
            title: 'Biology Homework: The Cell',
            classSubject: 'Grade 10 - Biology',
            dueDate: 'Oct 25, 2023',
            submissions: '22/25',
            status: 'Active'
        },
        {
            id: 2,
            title: 'History Essay: Ancient Rome',
            classSubject: 'Grade 10 - History',
            dueDate: 'Oct 22, 2023',
            submissions: '25/25',
            status: 'Closed'
        },
        {
            id: 3,
            title: 'Physics Lab Report',
            classSubject: 'Grade 11 - Physics',
            dueDate: 'Oct 20, 2023',
            submissions: '18/22',
            status: 'Active'
        }
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Active': return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
            case 'Closed': return 'bg-rose-50 text-rose-500 border border-rose-100';
            case 'Upcoming': return 'bg-amber-50 text-amber-600 border border-amber-100';
            default: return 'bg-slate-50 text-slate-500 border border-slate-100';
        }
    };

    const handleEdit = (item) => {
        setSelectedAssignment(item);
        setAssignmentData({
            ...assignmentData,
            title: item.title,
            description: "Students will design and conduct a simple experiment to test a hypothesis. This project will assess their understanding of the scientific method, data collection, and conclusion-forming skills.",
            classes: ['Science 101', 'Honors Biology'],
            attachments: [
                { name: 'project_rubric.pdf', size: '1.2 MB' },
                { name: 'example_setup.png', size: '2.5 MB' }
            ]
        });
        setView('edit');
    };

    if (view === 'create') {
        return (
            <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Create New Assignment</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Details & Attachments */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Assignment Details Card */}
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
                            <h3 className="text-xl font-black text-slate-800">Assignment Details</h3>

                            <div className="space-y-3">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Assignment Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Photosynthesis Lab Report"
                                    className="w-full bg-slate-50 border-none rounded-2xl py-5 px-6 font-bold text-slate-700 focus:ring-4 focus:ring-blue-100 transition-all shadow-inner placeholder:text-slate-300"
                                    value={assignmentData.title}
                                    onChange={(e) => setAssignmentData({ ...assignmentData, title: e.target.value })}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Assignment Description</label>
                                <div className="border border-slate-100 rounded-[2rem] overflow-hidden">
                                    <div className="flex items-center gap-6 px-8 py-4 bg-slate-50/50 border-b border-slate-50">
                                        <button className="font-black text-slate-400 hover:text-slate-800 transition-colors">B</button>
                                        <button className="italic text-slate-400 hover:text-slate-800 transition-colors">I</button>
                                        <button className="text-slate-400 hover:text-slate-800 transition-colors">⁝≡</button>
                                        <button className="text-slate-400 hover:text-slate-800 transition-colors">≡≡</button>
                                        <button className="text-slate-400 hover:text-slate-800 transition-colors">🔗</button>
                                    </div>
                                    <textarea
                                        rows="8"
                                        placeholder="Enter a detailed description, including instructions, and learning objectives..."
                                        className="w-full bg-transparent border-none p-8 font-medium text-slate-600 focus:ring-0 placeholder:text-slate-300 resize-none"
                                        value={assignmentData.description}
                                        onChange={(e) => setAssignmentData({ ...assignmentData, description: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Attachments Card */}
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
                            <h3 className="text-xl font-black text-slate-800">Attachments</h3>
                            <div className="border-2 border-dashed border-slate-100 rounded-[2rem] p-12 flex flex-col items-center justify-center gap-4 group hover:border-blue-400 transition-all cursor-pointer bg-slate-50/30">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">☁️</div>
                                <div className="text-center">
                                    <p className="font-black text-slate-800"><span className="text-blue-600">Click to upload</span> or drag and drop</p>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">PDF, DOCX, PNG, JPG (MAX. 10MB)</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {assignmentData.attachments.map((file, i) => (
                                    <div key={i} className="flex items-center justify-between px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <span className="text-xl text-blue-600">📄</span>
                                            <span className="font-black text-slate-700 text-sm">{file.name}</span>
                                        </div>
                                        <button className="text-slate-300 hover:text-rose-500 transition-colors">✕</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8 sticky top-8">
                            <h3 className="text-xl font-black text-slate-800">Settings</h3>
                            <div className="space-y-3">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Classes</label>
                                <div className="bg-slate-100/50 rounded-2xl p-6 border border-slate-100 space-y-2">
                                    {['Biology 101', 'Advanced Chemistry', 'Physics Fundamentals'].map((cls) => (
                                        <div key={cls} className="flex items-center justify-between">
                                            <span className="font-black text-slate-700 text-sm">{cls}</span>
                                            <span className="text-slate-300">↕</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Subject</label>
                                <select className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 font-black text-slate-700 appearance-none shadow-inner">
                                    <option>Science</option>
                                    <option>Mathematics</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Assignment Type</label>
                                <div className="flex bg-slate-50 p-1.5 rounded-2xl shadow-inner">
                                    {['Homework', 'Project', 'Quiz'].map((type) => (
                                        <button key={type} onClick={() => setAssignmentData({ ...assignmentData, type })} className={`flex-1 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${assignmentData.type === type ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>{type}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1 space-y-3">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Due Date</label>
                                    <input type="date" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 font-black text-slate-700 text-sm shadow-inner" />
                                </div>
                                <div className="flex-1 space-y-3">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Due Time</label>
                                    <input type="time" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 font-black text-slate-700 text-sm shadow-inner" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-4">
                                <label className="text-xs font-black text-slate-800">Publish Status</label>
                                <div onClick={() => setAssignmentData({ ...assignmentData, published: !assignmentData.published })} className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 ${assignmentData.published ? 'bg-blue-600' : 'bg-slate-200'}`}>
                                    <div className={`bg-white w-6 h-6 rounded-full shadow-sm transform transition-transform duration-300 ${assignmentData.published ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-6 pt-10 border-t border-slate-100">
                    <button onClick={() => setView('list')} className="px-10 py-5 bg-white border border-slate-100 text-slate-500 font-black rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-widest text-xs">Cancel</button>
                    <button className="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-100 transition-all active:scale-95 uppercase tracking-widest text-xs">Publish Assignment</button>
                </div>
            </div>
        );
    }

    if (view === 'edit') {
        return (
            <div className="max-w-[1000px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Edit Assignment</h1>
                    <p className="text-slate-500 font-medium tracking-tight">Update the details for '{selectedAssignment?.title}'.</p>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-premium border border-slate-100 overflow-hidden">
                    <div className="p-10 space-y-12">
                        {/* Basic Information */}
                        <section className="space-y-8">
                            <h3 className="text-xl font-black text-slate-800 border-b border-slate-50 pb-4 tracking-tight">Basic Information</h3>
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Assignment Title</label>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-4 px-6 font-bold text-slate-700 focus:ring-4 focus:ring-blue-100 transition-all shadow-inner"
                                        value={assignmentData.title}
                                        onChange={(e) => setAssignmentData({ ...assignmentData, title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Description</label>
                                    <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                                        <div className="flex items-center gap-6 px-6 py-3 bg-slate-50 border-b border-slate-100">
                                            <button className="font-black text-slate-400 hover:text-slate-800">B</button>
                                            <button className="italic text-slate-400 hover:text-slate-800">I</button>
                                            <button className="underline text-slate-400 hover:text-slate-800">U</button>
                                            <button className="text-slate-400 hover:text-slate-800">⁝≡</button>
                                            <button className="text-slate-400 hover:text-slate-800">≡≡</button>
                                            <button className="text-slate-400 hover:text-slate-800">🔗</button>
                                        </div>
                                        <textarea
                                            rows="6"
                                            className="w-full bg-white border-none p-6 font-medium text-slate-600 focus:ring-0 resize-none"
                                            value={assignmentData.description}
                                            onChange={(e) => setAssignmentData({ ...assignmentData, description: e.target.value })}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Scoping & Resources */}
                        <section className="space-y-8">
                            <h3 className="text-xl font-black text-slate-800 border-b border-slate-50 pb-4 tracking-tight">Scoping & Resources</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Class(es)</label>
                                    <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border border-slate-100 rounded-2xl min-h-[56px] shadow-inner">
                                        {assignmentData.classes.map(cls => (
                                            <span key={cls} className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black border border-blue-100 uppercase tracking-widest">
                                                {cls} <button className="hover:text-blue-800 transition-colors">✕</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Subject</label>
                                    <div className="relative">
                                        <select className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-4 px-6 font-bold text-slate-700 appearance-none cursor-pointer focus:ring-4 focus:ring-blue-100 transition-all shadow-inner">
                                            <option>Science</option>
                                        </select>
                                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▼</span>
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-4">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Attachments</label>
                                    <div className="border-2 border-dashed border-slate-100 rounded-[2rem] p-10 flex flex-col items-center justify-center gap-3 bg-slate-50/30 hover:bg-slate-50 transition-all cursor-pointer group">
                                        <span className="text-4xl text-slate-300 group-hover:scale-110 transition-transform duration-500">☁️</span>
                                        <p className="font-black text-slate-800 tracking-tight"><span className="text-blue-600">Click to upload</span> or drag and drop</p>
                                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">PDF, DOCX, or PNG (MAX. 10MB)</p>
                                    </div>
                                    <div className="space-y-3">
                                        {assignmentData.attachments.map((file, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl group/file hover:border-blue-200 transition-all shadow-sm">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-2xl">{file.name.endsWith('.png') ? '🖼️' : '📄'}</span>
                                                    <span className="font-black text-slate-700 text-sm tracking-tight">{file.name}</span>
                                                </div>
                                                <button className="text-slate-300 hover:text-red-500 transition-colors p-2 bg-slate-50 rounded-lg">🗑️</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Scheduling & Type */}
                        <section className="space-y-8">
                            <h3 className="text-xl font-black text-slate-800 border-b border-slate-50 pb-4 tracking-tight">Scheduling & Type</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Due Date & Time</label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-4 px-6 font-bold text-slate-700 shadow-inner focus:ring-4 focus:ring-blue-100 transition-all"
                                            defaultValue="10/26/2024, 03:30 PM"
                                        />
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3 text-slate-300 group-focus-within:text-blue-400">
                                            <span>📅</span>
                                            <span>🕒</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Assignment Type</label>
                                    <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100 shadow-inner">
                                        {['Homework', 'Project', 'Quiz'].map(t => (
                                            <button
                                                key={t}
                                                className={`flex-1 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${assignmentData.type === t ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-400 hover:text-slate-600'}`}
                                                onClick={() => setAssignmentData({ ...assignmentData, type: t })}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Publishing */}
                        <section className="space-y-8">
                            <h3 className="text-xl font-black text-slate-800 border-b border-slate-50 pb-4 tracking-tight">Publishing</h3>
                            <div className="flex items-center justify-between bg-slate-50/30 p-6 rounded-3xl border border-slate-100 shadow-inner">
                                <div className="space-y-1">
                                    <p className="font-black text-slate-800 text-sm tracking-tight">Status</p>
                                    <p className="text-xs text-slate-400 font-medium tracking-tight">Students can view the assignment once it's published.</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div
                                        onClick={() => setAssignmentData({ ...assignmentData, published: !assignmentData.published })}
                                        className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors duration-500 ${assignmentData.published ? 'bg-emerald-400' : 'bg-slate-200'}`}
                                    >
                                        <div className={`bg-white w-6 h-6 rounded-full shadow-sm transform transition-transform duration-500 ${assignmentData.published ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                    </div>
                                    <span className="font-black text-slate-700 text-sm tracking-widest uppercase">Published</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Form Footer */}
                    <div className="p-8 bg-slate-100/30 border-t border-slate-100 flex justify-end gap-4 rounded-b-[2.5rem]">
                        <button
                            onClick={() => setView('list')}
                            className="px-10 py-4 bg-white border border-slate-200 text-slate-500 font-black rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px] shadow-sm hover:shadow-md"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => setView('list')}
                            className="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-xl shadow-blue-100 transition-all active:scale-95 uppercase tracking-widest text-[10px] hover:-translate-y-0.5"
                        >
                            Update Assignment
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Header Area */}
            <div className="flex justify-between items-center group/header">
                <div className="space-y-1">
                    <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">Assignments</h1>
                    <p className="text-slate-500 font-medium">Manage and monitor student tasks and performance.</p>
                </div>
                <button
                    onClick={() => setView('create')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-black py-5 px-10 rounded-[1.5rem] shadow-xl shadow-blue-100 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3 uppercase tracking-widest text-sm"
                >
                    <span className="text-xl font-thin">+</span> New Assignment
                </button>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-wrap items-center gap-6">
                <div className="flex-1 min-w-[400px] relative group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors text-xl">🔍</span>
                    <input
                        type="text"
                        placeholder="Quick search assignments..."
                        className="w-full pl-16 pr-8 py-5 bg-slate-50/50 border-none rounded-2xl focus:ring-4 focus:ring-blue-100 transition-all text-slate-800 font-bold shadow-inner placeholder:text-slate-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {['All Classes', 'All Subjects', 'All Statuses'].map((f) => (
                    <select key={f} className="px-8 py-5 bg-slate-50 border-none rounded-2xl font-black text-slate-500 focus:ring-4 focus:ring-blue-100 appearance-none shadow-sm cursor-pointer min-w-[180px]">
                        <option>{f}</option>
                    </select>
                ))}
            </div>

            {/* Assignments Table */}
            <div className="bg-white rounded-[3rem] shadow-premium border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-50 bg-slate-50/40">
                            <th className="px-12 py-10 text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">Assignment Title</th>
                            <th className="px-12 py-10 text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] text-center">Class / Subject</th>
                            <th className="px-12 py-10 text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] text-center">Due Date</th>
                            <th className="px-12 py-10 text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] text-center">Submissions</th>
                            <th className="px-12 py-10 text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] text-center">Status</th>
                            <th className="px-12 py-10 text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {assignments
                            .filter(item =>
                                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.classSubject.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((item) => (
                                <tr key={item.id} className="hover:bg-blue-50/30 transition-all group/row cursor-pointer border-l-4 border-l-transparent hover:border-l-blue-600">
                                    <td className="px-12 py-10">
                                        <span className="text-xl font-black text-slate-800 tracking-tight group-hover/row:text-blue-600 transition-colors uppercase text-sm">{item.title}</span>
                                    </td>
                                    <td className="px-12 py-10 text-center font-bold text-slate-400">{item.classSubject}</td>
                                    <td className="px-12 py-10 text-center">
                                        <div className="flex flex-col">
                                            <span className="font-black text-slate-800">{item.dueDate}</span>
                                            <span className="text-[10px] text-slate-300 uppercase font-black tracking-widest mt-1">Deadline</span>
                                        </div>
                                    </td>
                                    <td className="px-12 py-10 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className="font-black text-slate-800">{item.submissions}</span>
                                            <div className="w-16 h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
                                                <div className="h-full bg-blue-500 w-3/4"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-12 py-10 text-center">
                                        <span className={`px-5 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase shadow-sm border ${getStatusStyle(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-12 py-10">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover/row:opacity-100 transition-all">
                                            <button className="w-10 h-10 bg-white shadow-md rounded-xl text-slate-400 hover:text-blue-600 border border-slate-100 flex items-center justify-center">👁️</button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEdit(item);
                                                }}
                                                className="w-10 h-10 bg-white shadow-md rounded-xl text-slate-400 hover:text-blue-600 border border-slate-100 flex items-center justify-center"
                                            >
                                                ✏️
                                            </button>
                                            <button className="w-10 h-10 bg-white shadow-md rounded-xl text-slate-400 hover:text-red-500 border border-slate-100 flex items-center justify-center">🗑️</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignmentsSection;
