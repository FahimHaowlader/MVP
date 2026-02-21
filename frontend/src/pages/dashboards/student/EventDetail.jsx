import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';

const EventDetail = () => {
    const { id } = useParams();
    const [isRSVPed, setIsRSVPed] = useState(false);

    return (
        <div className="max-w-[1200px] mx-auto animate-in fade-in duration-700 p-10 space-y-12">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
                <Link to="/student/dashboard" className="text-slate-400 hover:text-blue-600 transition-colors">Home</Link>
                <span className="text-slate-300">/</span>
                <Link to="/student/events" className="text-slate-400 hover:text-blue-600 transition-colors">Events</Link>
                <span className="text-slate-300">/</span>
                <span className="text-slate-800">Annual Computer Science Career Fair</span>
            </div>

            {/* Banner Image */}
            <div className="w-full h-[450px] rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100 relative group">
                <img
                    src="https://images.unsplash.com/photo-1511578334221-d302ccdbca1c?q=80&w=2070&auto=format&fit=crop"
                    alt="Event Banner"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>

            {/* Content Grid */}
            <div className="flex flex-col lg:flex-row gap-16">
                <div className="flex-1 space-y-12">
                    {/* Header Details */}
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <span className="px-5 py-2 rounded-full bg-amber-50 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em]">Mandatory Attendance</span>
                            <span className="px-5 py-2 rounded-full bg-emerald-50 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em]">Registration Required</span>
                        </div>
                        <h1 className="text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                            Annual Computer Science Career Fair
                        </h1>
                        <p className="text-2xl font-bold text-slate-400 tracking-tight">
                            Connect with top tech companies and discover your future career path.
                        </p>
                    </div>

                    {/* Description Section */}
                    <div className="space-y-6">
                        <h3 className="text-3xl font-black text-slate-800 tracking-tight">About This Event</h3>
                        <p className="text-lg font-medium text-slate-500 leading-relaxed text-justify">
                            Join us for the largest tech recruiting event of the year. The Annual Computer Science Career Fair brings together over 50 leading companies from various sectors, including software development, AI research, cybersecurity, and data science. This is a unique opportunity for students to network with industry professionals, learn about internship and full-time opportunities, and get a feel for the current job market. Prepare your resumes and get ready to make lasting connections!
                        </p>
                    </div>

                    {/* Keynote Speakers */}
                    <div className="space-y-8">
                        <h3 className="text-3xl font-black text-slate-800 tracking-tight">Keynote Speakers</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <SpeakerCard name="Jane Doe" title="CEO, Innovatech" img="https://i.pravatar.cc/150?u=jane" />
                            <SpeakerCard name="John Smith" title="Lead AI Researcher, FutureAI" img="https://i.pravatar.cc/150?u=john" />
                        </div>
                    </div>

                    {/* What to Bring (Accordion Style but simple) */}
                    <div className="space-y-6">
                        <h3 className="text-3xl font-black text-slate-800 tracking-tight">What to Bring</h3>
                        <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-6">
                            <div className="flex justify-between items-center cursor-pointer">
                                <span className="text-xl font-black text-slate-800 tracking-tight">Required Materials</span>
                                <span className="text-blue-600 font-bold">▲</span>
                            </div>
                            <ul className="space-y-4 text-slate-500 font-medium">
                                <li className="flex items-center gap-3"><span className="text-blue-600 text-xl">•</span> Multiple copies of your printed resume</li>
                                <li className="flex items-center gap-3"><span className="text-blue-600 text-xl">•</span> Student ID for check-in</li>
                                <li className="flex items-center gap-3"><span className="text-blue-600 text-xl">•</span> A laptop or tablet for taking notes (optional)</li>
                                <li className="flex items-center gap-3"><span className="text-blue-600 text-xl">•</span> Professional attire is recommended</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info Card */}
                <div className="w-full lg:w-[420px] space-y-8">
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-premium space-y-10 sticky top-10">
                        <div className="space-y-2 text-center">
                            <button
                                onClick={() => setIsRSVPed(!isRSVPed)}
                                className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-blue-100/50 flex items-center justify-center gap-3 ${isRSVPed ? 'bg-emerald-500 text-white shadow-emerald-100' : 'bg-blue-600 text-white'
                                    }`}
                            >
                                {isRSVPed ? 'RSVP Confirmed ✓' : 'RSVP Now ➔'}
                            </button>
                            <p className="text-[11px] font-black text-slate-400 pt-4 uppercase tracking-[0.05em]">Registration deadline: October 25, 2024</p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex gap-6 items-start group">
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">📅</div>
                                <div className="space-y-1">
                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none">Date & Time</p>
                                    <p className="text-lg font-black text-slate-800 tracking-tight leading-tight pt-1">
                                        October 28, 2024, 10:00 AM - 4:00 PM
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start group">
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">📍</div>
                                <div className="space-y-1">
                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none">Location</p>
                                    <p className="text-lg font-black text-slate-800 tracking-tight leading-tight pt-1">
                                        University Grand Hall, 123 College Ave
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 text-sm">
                            🗓️ Add to Calendar
                        </button>
                    </div>

                    <div className="w-full h-64 rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm relative group cursor-crosshair">
                        <img src="https://images.unsplash.com/photo-1541339907198-e08759df9a73?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Venue" />
                        <div className="absolute inset-0 bg-slate-900/10" />
                    </div>

                    <div className="bg-slate-50/50 rounded-[2.5rem] p-10 border border-slate-100 space-y-6">
                        <h4 className="text-xl font-black text-slate-800 tracking-tight">Have questions?</h4>
                        <p className="text-sm font-medium text-slate-400 leading-relaxed">
                            Contact the Career Services department for more information.
                        </p>
                        <p className="text-sm font-black text-blue-600 underline">career@university.edu</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SpeakerCard = ({ name, title, img }) => (
    <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 flex items-center gap-6 group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer">
        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-sm ring-4 ring-slate-100 group-hover:ring-blue-100 transition-all">
            <img src={img} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
            <p className="text-xl font-black text-slate-800 tracking-tight leading-tight">{name}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{title}</p>
        </div>
    </div>
);

export default EventDetail;
