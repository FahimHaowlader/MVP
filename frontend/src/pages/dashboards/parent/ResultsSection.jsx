import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const ParentResultsSection = () => {
    const { selectedChild } = useOutletContext();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            if (!selectedChild) return;
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                // Use a generic result search or specific student result endpoint
                // Since results/my is for self, we use a general one that handles childIds (already supported by backend)
                const res = await axios.get(`http://localhost:5001/api/parent/child/${selectedChild._id}/overview`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setResults(res.data.recentResults || []);
            } catch (err) {
                console.error("Error fetching results:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [selectedChild]);

    const getGradeColor = (marks) => {
        if (marks >= 90) return 'bg-emerald-50 text-emerald-600 border-emerald-100';
        if (marks >= 80) return 'bg-blue-50 text-blue-600 border-blue-100';
        if (marks >= 70) return 'bg-amber-50 text-amber-600 border-amber-100';
        return 'bg-rose-50 text-rose-500 border-rose-100';
    };

    if (!selectedChild) return <div className="p-10 text-center font-bold text-slate-400 uppercase tracking-widest">Please select a student first</div>;
    if (loading) return <div className="p-10 text-center font-black text-slate-400 tracking-widest uppercase animate-pulse">Fetching Academic Records...</div>;

    return (
        <div className="max-w-[1200px] mx-auto space-y-12 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-4">
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none">
                        Report <span className="text-blue-600">Cards.</span>
                    </h1>
                    <p className="text-lg font-medium text-slate-400">Viewing results for <span className="text-slate-900 font-bold">{selectedChild.name}</span></p>
                </div>
                <button className="bg-slate-900 hover:bg-slate-800 text-white font-black py-4 px-10 rounded-[1.5rem] shadow-xl transition-all active:scale-95 uppercase tracking-widest text-[11px]">
                    📥 Full Report PDF
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.length > 0 ? results.map((res, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{res.examType}</p>
                                <h3 className="text-2xl font-black text-slate-800 tracking-tight mt-1">Class {res.className}</h3>
                            </div>
                            <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${getGradeColor(res.average)}`}>
                                {res.average >= 90 ? 'A+' : res.average >= 80 ? 'A' : 'B'}
                            </span>
                        </div>

                        <div className="space-y-4">
                            {res.subjects.map((sub, idx) => (
                                <div key={idx} className="flex justify-between items-center text-sm font-bold">
                                    <span className="text-slate-500">{sub.subject}</span>
                                    <span className="text-slate-800">{sub.marks} / 100</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-slate-50 flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Overall Average</p>
                                <p className="text-3xl font-black text-blue-600 tracking-tighter">{res.average}%</p>
                            </div>
                            <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600">Details →</button>
                        </div>
                    </motion.div>
                )) : (
                    <div className="col-span-full p-20 text-center font-bold text-slate-300 uppercase tracking-widest border-2 border-dashed border-slate-100 rounded-[3rem]">
                        No exam results recorded for this student yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ParentResultsSection;
