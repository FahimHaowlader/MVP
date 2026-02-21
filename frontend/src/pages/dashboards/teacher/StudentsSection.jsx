import React, { useState } from 'react';

const StudentsSection = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterGrade, setFilterGrade] = useState('All');

    // Mock student data with performance metrics
    const [students] = useState([
        { id: '101', name: 'Alex Johnson', grade: '10th', attendance: '98%', performance: 'A+', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150&h=150' },
        { id: '102', name: 'Sophie Miller', grade: '10th', attendance: '95%', performance: 'A', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150' },
        { id: '103', name: 'Jordan Lee', grade: '11th', attendance: '88%', performance: 'B+', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150' },
        { id: '104', name: 'Emma Wilson', grade: '10th', attendance: '92%', performance: 'A-', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150' },
        { id: '105', name: 'Lucas Brown', grade: '11th', attendance: '97%', performance: 'A+', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150' },
        { id: '106', name: 'Mia Garcia', grade: '12th', attendance: '78%', performance: 'C', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=150&h=150' }
    ]);

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterGrade === 'All' || student.grade === filterGrade)
    );

    const getPerformanceBg = (grade) => {
        if (grade.startsWith('A')) return 'bg-emerald-50 text-emerald-600 border-emerald-100';
        if (grade.startsWith('B')) return 'bg-blue-50 text-blue-600 border-blue-100';
        return 'bg-rose-50 text-rose-600 border-rose-100';
    };

    return (
        <div className="space-y-10 animate-slide-up">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-black text-slate-800 tracking-tighter">My Students</h1>
                    <p className="text-slate-400 font-bold mt-2 uppercase tracking-[0.2em] text-xs">Managing 48 Active Students across 3 Classes</p>
                </div>
                <div className="flex gap-4">
                    <button className="p-4 bg-white shadow-xl shadow-slate-200/50 rounded-2xl text-slate-400 hover:text-blue-600 hover-lift transition-all border border-slate-50">
                        <span className="text-2xl">📊</span>
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-blue-200 transition-all hover-lift flex items-center gap-3">
                        <span className="text-2xl">➕</span> Add Student
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="glass p-5 rounded-[2.5rem] shadow-premium border border-white/50 flex flex-wrap items-center gap-6">
                <div className="flex-1 min-w-[300px] relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 text-xl">🔍</span>
                    <input
                        type="text"
                        placeholder="Search student by name or ID..."
                        className="w-full pl-16 pr-8 py-5 bg-slate-50/50 rounded-3xl border-none focus:ring-4 focus:ring-blue-100 transition-all font-bold placeholder:text-slate-300 text-slate-600 shadow-inner"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    {['All', '10th', '11th', '12th'].map(grade => (
                        <button
                            key={grade}
                            onClick={() => setFilterGrade(grade)}
                            className={`px-8 py-5 rounded-3xl font-black transition-all ${filterGrade === grade ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 scale-105' : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-50'}`}
                        >
                            {grade === 'All' ? 'All Classes' : `${grade} Grade`}
                        </button>
                    ))}
                </div>
            </div>

            {/* Students Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredStudents.map((student, idx) => (
                    <div key={student.id} className="group glass p-8 rounded-[3rem] shadow-premium border border-white/50 hover-lift transition-all animate-fade-in relative overflow-hidden" style={{ animationDelay: `${idx * 0.1}s` }}>
                        {/* Status Glow */}
                        <div className={`absolute -top-12 -right-12 w-24 h-24 blur-[60px] opacity-20 ${getPerformanceBg(student.performance).split(' ')[0]}`}></div>

                        <div className="flex items-start gap-6 relative z-10">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                                <img src={student.image} alt={student.name} className="relative w-24 h-24 rounded-3xl object-cover border-4 border-white shadow-xl transform transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full shadow-lg"></div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">{student.name}</h3>
                                <p className="text-slate-400 font-bold text-sm tracking-widest uppercase mt-1">ID: #{student.id}</p>
                                <div className="flex gap-2 mt-4">
                                    <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest">{student.grade}</span>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getPerformanceBg(student.performance)}`}>Grade {student.performance}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="bg-white/50 p-4 rounded-2xl border border-white">
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Attendance</p>
                                <div className="flex items-end gap-2 mt-1">
                                    <span className="text-xl font-black text-slate-800">{student.attendance}</span>
                                    <div className="h-1.5 flex-1 bg-slate-100 rounded-full mb-1.5 overflow-hidden">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: student.attendance }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/50 p-4 rounded-2xl border border-white">
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Growth</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xl font-black text-emerald-500">+12%</span>
                                    <span className="text-lg">📈</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100/50 flex gap-3">
                            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2 active:scale-95 text-sm">
                                <span>📧</span> Message
                            </button>
                            <button className="w-14 h-14 bg-white hover:bg-slate-50 text-slate-400 hover:text-blue-600 rounded-2xl border border-slate-50 shadow-sm flex items-center justify-center transition-all hover-lift active:scale-95">
                                <span className="text-xl">📁</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentsSection;
