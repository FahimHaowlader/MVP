import React, { useState } from 'react';
import { motion } from 'framer-motion';

const syllabusData = {
    courseName: 'Introduction to Psychology',
    courseCode: 'PSY101',
    academicYear: '2024-2025',
    objectives: [
        'Understand basic psychological concepts',
        'Analyze human behavior',
        'Apply psychological principles to real-world situations',
    ],
    topics: [
        'Introduction to Psychology',
        'Cognitive Psychology',
        'Social Psychology',
    ],
    assessments: [
        'Midterm Exam (30%)',
        'Final Exam (40%)',
        'Class Participation (10%)',
        'Assignments (20%)',
    ],
    attachments: [
        { name: 'Course Outline.pdf', icon: '📄' },
        { name: 'Reading List.pdf', icon: '📄' },
    ],
};

const ReviewPublishSyllabus = () => {
    const [confirmed, setConfirmed] = useState(false);
    const [published, setPublished] = useState(false);

    const handlePublish = () => {
        if (confirmed) setPublished(true);
    };

    return (
        <div className="max-w-[860px] mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Review & Publish Syllabus</h1>
                <p className="text-blue-600 font-bold mt-2">Carefully review all details before publishing the syllabus. Once published, it will be available to students.</p>
            </div>

            {published ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-50 border border-emerald-100 rounded-[3rem] p-20 flex flex-col items-center gap-6 text-center">
                    <span className="text-6xl">🎉</span>
                    <h2 className="text-3xl font-black text-emerald-700">Syllabus Published!</h2>
                    <p className="text-emerald-600 font-bold max-w-md">The syllabus for <strong>Introduction to Psychology (PSY101)</strong> is now live and visible to all enrolled students.</p>
                    <button onClick={() => setPublished(false)} className="px-10 py-4 bg-white border border-emerald-200 rounded-2xl font-black text-sm text-emerald-700 hover:bg-emerald-50 transition-all shadow-sm">← Back to Syllabus</button>
                </motion.div>
            ) : (
                <div className="space-y-8">
                    {/* Details Card */}
                    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                        {/* Syllabus Details */}
                        <div className="p-10 space-y-0">
                            <h2 className="text-xl font-black text-slate-800 tracking-tight mb-6">Syllabus Details</h2>
                            <div className="divide-y divide-slate-50">
                                {[
                                    ['Course Name', syllabusData.courseName],
                                    ['Course Code', syllabusData.courseCode],
                                    ['Academic Year', syllabusData.academicYear],
                                ].map(([label, value]) => (
                                    <div key={label} className="flex items-start gap-0 py-5">
                                        <p className="w-56 text-sm font-black text-blue-500 flex-shrink-0">{label}</p>
                                        <p className="text-sm font-bold text-slate-800">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-slate-50 mx-10" />

                        {/* Learning Objectives */}
                        <div className="p-10 space-y-5">
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">Learning Objectives</h2>
                            <ul className="space-y-4">
                                {syllabusData.objectives.map((obj, i) => (
                                    <motion.li key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-start gap-4 text-slate-700 font-medium">
                                        <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0 mt-2" />
                                        {obj}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div className="h-px bg-slate-50 mx-10" />

                        {/* Topics */}
                        <div className="p-10 space-y-5">
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">Topics/Units</h2>
                            <ul className="space-y-4">
                                {syllabusData.topics.map((t, i) => (
                                    <li key={i} className="flex items-start gap-4 text-slate-700 font-medium">
                                        <span className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0 mt-2" />
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="h-px bg-slate-50 mx-10" />

                        {/* Assessment Methods */}
                        <div className="p-10 space-y-5">
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">Assessment Methods</h2>
                            <ul className="space-y-4">
                                {syllabusData.assessments.map((a, i) => (
                                    <li key={i} className="flex items-start gap-4 text-slate-700 font-medium">
                                        <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 mt-2" />
                                        {a}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="h-px bg-slate-50 mx-10" />

                        {/* Attachments */}
                        <div className="p-10 space-y-5">
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">Attachments</h2>
                            <div className="space-y-3">
                                {syllabusData.attachments.map((f, i) => (
                                    <div key={i} className="flex items-center gap-4 px-6 py-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all cursor-pointer group">
                                        <span className="text-2xl">📄</span>
                                        <p className="text-sm font-black text-slate-700 group-hover:text-blue-600 transition-colors">{f.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Confirmation */}
                    <div className="flex items-start gap-4 px-2">
                        <input
                            type="checkbox"
                            id="confirm"
                            checked={confirmed}
                            onChange={e => setConfirmed(e.target.checked)}
                            className="w-5 h-5 mt-0.5 rounded accent-blue-600 cursor-pointer flex-shrink-0"
                        />
                        <label htmlFor="confirm" className="text-sm font-bold text-slate-600 cursor-pointer leading-relaxed">
                            I confirm that all syllabus details are accurate and complete.
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-4 pt-2">
                        <button className="px-10 py-5 rounded-2xl font-black text-sm border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 transition-all">Go Back to Edit</button>
                        <button
                            onClick={handlePublish}
                            disabled={!confirmed}
                            className={`px-10 py-5 rounded-2xl font-black text-sm transition-all ${confirmed ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                        >
                            Publish Syllabus
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewPublishSyllabus;
