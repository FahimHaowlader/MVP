import React from 'react';
import { motion } from 'framer-motion';

const AnnouncementDetail = () => {
    const announcement = {
        title: "Annual Sports Day Schedule and Guidelines",
        publishedAt: "October 26, 2023 at 9:15 AM",
        content: `Dear students, we are excited to announce the schedule for our Annual Sports Day! This year's event will be held on Friday, November 10th, at the main sports complex.
        
The day will be filled with exciting competitions, team events, and a celebratory closing ceremony. We encourage all students to participate and show their school spirit. Please find the detailed schedule, event rules, and registration information in the documents attached below. Make sure to review the guidelines for participation and dress code. Let's make this year's Sports Day the best one yet!`,
        highlights: [
            "Track and Field events (100m, 200m, Relay Race)",
            "Team Sports (Football, Basketball, Volleyball)",
            "Fun Games (Sack Race, Tug of War)",
            "Awards and Closing Ceremony",
            "All participants must register by November 5th. Please refer to the attached PDF for the full schedule and rules."
        ],
        attachments: [
            { name: "Sports Day Schedule 2023.pdf", size: "1.2 MB", icon: "📄" },
            { name: "Competition Rules and Guidelines.docx", size: "450 KB", icon: "📝" }
        ],
        image: "https://images.unsplash.com/photo-1576434963959-292552882ad3?q=80&w=2070&auto=format&fit=crop" // Sports day themed image placeholder
    };

    return (
        <div className="max-w-[1000px] mx-auto py-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* Breadcrumb & Navigation */}
            <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest mb-8">
                <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                    <span>←</span> Announcements
                </button>
                <span>/</span>
                <span className="text-slate-800">Annual Sports Day Schedule</span>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-[2.5rem] shadow-premium border border-slate-100 overflow-hidden">
                <div className="p-12 space-y-10">
                    {/* Title Section */}
                    <div className="space-y-3">
                        <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
                            {announcement.title}
                        </h1>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                            Published on: {announcement.publishedAt}
                        </p>
                    </div>

                    {/* Content Text */}
                    <div className="prose prose-slate max-w-none">
                        <p className="text-slate-600 font-medium text-lg leading-relaxed whitespace-pre-line">
                            {announcement.content}
                        </p>
                    </div>

                    {/* Featured Image */}
                    <div className="rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200 border border-slate-100">
                        <img
                            src={announcement.image}
                            alt="Sports Day"
                            className="w-full h-[450px] object-cover"
                        />
                    </div>

                    {/* Highlights Section */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">Event Highlights:</h3>
                        <ul className="space-y-4">
                            {announcement.highlights.map((item, i) => (
                                <li key={i} className="flex gap-4 group">
                                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        {i + 1}
                                    </span>
                                    <p className="text-slate-600 font-bold leading-relaxed">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Attachments Section */}
                    <div className="space-y-6 pt-10 border-t border-slate-100">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">Attachments</h3>
                        <div className="grid gap-4">
                            {announcement.attachments.map((file, i) => (
                                <div key={i} className="flex items-center justify-between p-6 bg-slate-50/50 border border-slate-100 rounded-3xl group hover:border-blue-200 hover:bg-white transition-all shadow-sm">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                            {file.icon}
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-800 tracking-tight">{file.name}</p>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{file.size}</p>
                                        </div>
                                    </div>
                                    <button className="w-10 h-10 bg-white shadow-md rounded-xl text-slate-400 hover:text-blue-600 border border-slate-100 flex items-center justify-center transition-all active:scale-90">
                                        ⬇️
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Text */}
            <div className="mt-20 text-center space-y-4 pb-10">
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                    © 2023 Lexend Academy. All Rights Reserved.
                </p>
                <div className="flex justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <button className="hover:text-slate-800 transition-colors">Privacy Policy</button>
                    <button className="hover:text-slate-800 transition-colors">Terms of Service</button>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementDetail;
