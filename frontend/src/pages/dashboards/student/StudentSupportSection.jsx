import React from 'react';
import { motion } from 'framer-motion';

const StudentSupportSection = () => {
    const resources = [
        { title: 'Academic Advising', icon: '🎓', desc: 'Get guidance on course selection, degree requirements, and academic planning.' },
        { title: 'Counseling & Wellness', icon: '🌿', desc: 'Confidential support for personal, emotional, and mental health concerns.' },
        { title: 'Technical (IT) Support', icon: '💻', desc: 'Assistance with password resets, software issues, and campus Wi-Fi.' },
        { title: 'Library Services', icon: '📖', desc: 'Access research databases, book study rooms, and get help from librarians.' },
        { title: 'Career Services', icon: '💼', desc: 'Get help with resumes, interviews, and finding internships or jobs.' },
        { title: 'Student Life', icon: '🎉', desc: 'Find information on clubs, events, and other campus activities.' },
    ];

    return (
        <div className="max-w-[1200px] mx-auto animate-in fade-in duration-700 p-10 space-y-20">
            {/* Header */}
            <div className="space-y-4 text-center">
                <h1 className="text-6xl font-black text-slate-900 tracking-tight leading-tight">Student Support & Resources</h1>
                <p className="text-xl font-medium text-slate-400 max-w-2xl mx-auto">
                    We're here to help you succeed. Find the resources you need below.
                </p>
                <div className="pt-8 relative max-w-2xl mx-auto">
                    <span className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300">🔍</span>
                    <input
                        type="text"
                        placeholder="Search for resources (e.g., 'career advice', 'IT help')"
                        className="w-full pl-16 pr-8 py-5 bg-white border border-slate-100 rounded-[2rem] text-sm font-bold shadow-premium focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    />
                </div>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources.map((res, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -8, shadow: '0 30px 60px -12px rgba(100, 100, 111, 0.2)' }}
                        className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8 group transition-all"
                    >
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 transform group-hover:-rotate-12 translate-y-0 group-hover:-translate-y-2">
                            {res.icon}
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">{res.title}</h3>
                            <p className="text-sm font-medium text-slate-400 leading-relaxed text-justify">
                                {res.desc}
                            </p>
                        </div>
                        <button className="text-xs font-black text-blue-600 hover:text-blue-700 transition-all flex items-center gap-2 uppercase tracking-widest pt-2">
                            Learn More ➔
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* FAQ Section */}
            <div className="space-y-12">
                <h2 className="text-4xl font-black text-slate-800 tracking-tight text-center">Frequently Asked Questions</h2>
                <div className="max-w-4xl mx-auto space-y-4">
                    <FAQItem question="How do I declare my major?" />
                    <FAQItem question="Where can I get help with my password?" />
                    <FAQItem question="What are the library's hours?" />
                </div>
            </div>
        </div>
    );
};

const FAQItem = ({ question }) => (
    <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 flex justify-between items-center group cursor-pointer hover:bg-white transition-all">
        <span className="text-lg font-black text-slate-700 tracking-tight group-hover:text-blue-600 transition-colors">{question}</span>
        <span className="text-blue-600 font-bold transition-transform group-hover:rotate-90">➔</span>
    </div>
);

export default StudentSupportSection;
