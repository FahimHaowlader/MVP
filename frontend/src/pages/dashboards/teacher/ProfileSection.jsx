import React from 'react';
import useAuth from '../../../hooks/useAuth';

const ProfileSection = () => {
    const { user } = useAuth();

    // Mock data for the design
    const teacherData = {
        name: user.name || 'Dr. Eleanor Vance',
        title: 'Physics Teacher',
        experience: '12 Years of Experience',
        rating: '4.9',
        reviews: '213',
        students: '1,500+',
        aboutMe: 'Passionate and dedicated teacher with a strong commitment to inspiring and empowering students through engaging, creative, and personalized learning experiences. Skilled in fostering a positive classroom environment that encourages curiosity, critical thinking, and a love for lifelong learning.',
        email: user.email || 'eleanor.vance@school.edu',
        phone: '+1 (555) 123-4567',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
        subjects: ['Quantum Physics', 'Astrophysics', 'Applied Mathematics'],
        badges: ['Top Rated', 'Expert Educator', 'Student Choice']
    };

    return (
        <div className="max-w-6xl mx-auto glass rounded-[3rem] shadow-premium overflow-hidden p-0 animate-slide-up bg-white/40">
            {/* Profile Banner Background */}
            <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            </div>

            <div className="px-12 pb-12 -mt-24 relative">
                <div className="flex flex-col md:flex-row gap-16">
                    {/* Left Side: Profile & Stats */}
                    <div className="md:w-1/3 flex flex-col items-center">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-500"></div>
                            <img
                                src={teacherData.avatar}
                                alt={teacherData.name}
                                className="relative w-56 h-56 rounded-full border-8 border-white shadow-2xl object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                            />
                            <div className="absolute bottom-8 right-8 w-8 h-8 bg-green-500 rounded-full border-4 border-white animate-pulse shadow-lg"></div>
                        </div>

                        <div className="text-center mt-8">
                            <h2 className="text-4xl font-black text-slate-800 tracking-tighter">{teacherData.name}</h2>
                            <p className="text-blue-600 font-black uppercase text-xs tracking-[0.2em] mt-2">{teacherData.title}</p>

                            <div className="flex flex-wrap justify-center gap-2 mt-6">
                                {teacherData.badges.map((badge, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 shadow-sm">
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="w-full mt-10 space-y-5">
                            <div className="flex items-center justify-between bg-white shadow-xl shadow-slate-200/50 p-6 rounded-[2rem] hover-lift transition-all border border-slate-50 relative overflow-hidden group/card">
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                                <div className="flex items-center gap-5 relative z-10">
                                    <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">⭐</div>
                                    <span className="font-black text-slate-500 uppercase text-[10px] tracking-widest">Rating</span>
                                </div>
                                <span className="font-black text-slate-800 text-2xl relative z-10">{teacherData.rating}</span>
                            </div>

                            <div className="flex items-center justify-between bg-white shadow-xl shadow-slate-200/50 p-6 rounded-[2rem] hover-lift transition-all border border-slate-50 relative overflow-hidden group/card">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                                <div className="flex items-center gap-5 relative z-10">
                                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">💬</div>
                                    <span className="font-black text-slate-500 uppercase text-[10px] tracking-widest">Reviews</span>
                                </div>
                                <span className="font-black text-slate-800 text-2xl relative z-10">{teacherData.reviews}</span>
                            </div>

                            <div className="flex items-center justify-between bg-white shadow-xl shadow-slate-200/50 p-6 rounded-[2rem] hover-lift transition-all border border-slate-50 relative overflow-hidden group/card">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                                <div className="flex items-center gap-5 relative z-10">
                                    <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">🎓</div>
                                    <span className="font-black text-slate-500 uppercase text-[10px] tracking-widest">Students</span>
                                </div>
                                <span className="font-black text-slate-800 text-2xl relative z-10">{teacherData.students}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: About & Contact */}
                    <div className="md:w-2/3 pt-32">
                        <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <div className="flex items-center gap-4 mb-6">
                                <h3 className="text-4xl font-black text-slate-800 tracking-tighter">About Me</h3>
                                <div className="h-0.5 flex-1 bg-slate-100 rounded-full"></div>
                            </div>
                            <p className="text-slate-500 leading-relaxed text-xl font-medium opacity-90 first-letter:text-6xl first-letter:font-black first-letter:text-blue-600 first-letter:mr-3 first-letter:float-left">
                                {teacherData.aboutMe}
                            </p>

                            <div className="mt-10">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Core Expertise</h4>
                                <div className="flex flex-wrap gap-4">
                                    {teacherData.subjects.map((subject, idx) => (
                                        <div key={idx} className="px-6 py-3 bg-white shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-50 flex items-center gap-3 hover-lift cursor-pointer group/subject">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 group-hover/subject:scale-150 transition-transform"></div>
                                            <span className="font-black text-slate-700 tracking-tight">{subject}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            <div className="flex items-center gap-4 mb-8">
                                <h3 className="text-3xl font-black text-slate-800 tracking-tighter">Contact Presence</h3>
                                <div className="h-0.5 flex-1 bg-slate-100 rounded-full"></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex items-center gap-5 bg-white shadow-xl shadow-slate-200/50 p-6 rounded-[2rem] hover-lift border border-slate-50 group/contact">
                                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl group-hover/contact:bg-blue-600 group-hover/contact:text-white transition-colors duration-500 shadow-inner">✉️</div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</span>
                                        <span className="text-slate-800 font-black truncate text-lg tracking-tight">{teacherData.email}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5 bg-white shadow-xl shadow-slate-200/50 p-6 rounded-[2rem] hover-lift border border-slate-50 group/contact">
                                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl group-hover/contact:bg-indigo-600 group-hover/contact:text-white transition-colors duration-500 shadow-inner">📞</div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobile Contact</span>
                                        <span className="text-slate-800 font-black text-lg tracking-tight">{teacherData.phone}</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="mt-16 flex flex-col sm:flex-row gap-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                            <button className="group/btn relative flex-1">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover/btn:opacity-100 transition duration-1000 group-hover/btn:duration-200"></div>
                                <div className="relative bg-blue-600 hover:bg-blue-700 text-white font-black py-6 px-10 rounded-2xl shadow-2xl transition-all flex items-center justify-center gap-4 text-xl active:scale-95">
                                    <span className="text-3xl group-hover/btn:rotate-12 transition-transform">📅</span> Book a Lesson
                                </div>
                            </button>
                            <button className="flex-1 bg-white hover:bg-slate-50 text-slate-700 font-black py-6 px-10 rounded-2xl shadow-xl shadow-slate-200/50 transition-all hover-lift text-xl active:scale-95 border border-slate-100">
                                View Full Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
