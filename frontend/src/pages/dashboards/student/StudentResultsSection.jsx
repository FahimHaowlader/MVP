import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';

const StudentResultsSection = () => {
    const { user } = useAuth();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5001/api/results/my', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setResults(res.data);
            } catch (err) {
                console.error("Error fetching results:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, []);

    const calculateGPA = () => {
        if (results.length === 0) return "0.00";
        const sum = results.reduce((acc, curr) => acc + curr.average, 0);
        return (sum / results.length).toFixed(2);
    };

    const gpa = calculateGPA();

    const summaryCards = [
        { label: 'Yearly Average', value: `${gpa}%`, subValue: 'Based on all exams', color: 'blue', icon: '📈' },
        { label: 'Total Exams', value: results.length, subValue: 'Completed this year', color: 'indigo', icon: '📝' },
        { label: 'Class Rank', value: 'N/A', subValue: 'Calculated end of term', color: 'emerald', icon: '🏆' },
        { label: 'Performance', value: parseFloat(gpa) > 80 ? 'Good' : 'Fair', subValue: 'Current standing', color: 'amber', icon: '📅' },
    ];

    const filteredResults = activeTab === 'All'
        ? results
        : results.filter(r => r.examType === activeTab);

    const getGradeColor = (marks) => {
        if (marks >= 90) return 'bg-emerald-50 text-emerald-600 border-emerald-100';
        if (marks >= 80) return 'bg-blue-50 text-blue-600 border-blue-100';
        if (marks >= 70) return 'bg-amber-50 text-amber-600 border-amber-100';
        return 'bg-rose-50 text-rose-500 border-rose-100';
    };

    const getGradeLabel = (marks) => {
        if (marks >= 90) return 'A+';
        if (marks >= 80) return 'A';
        if (marks >= 70) return 'B';
        if (marks >= 60) return 'C';
        return 'F';
    };

    if (loading) return <div className="p-10 text-center font-black text-slate-400 tracking-widest uppercase animate-pulse">Loading Academic Records...</div>;

    return (
        <div className="max-w-[1400px] mx-auto space-y-12 animate-in fade-in duration-1000 p-4 lg:p-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div className="space-y-4">
                    <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none">
                        Student <span className="text-blue-600">Performance.</span>
                    </h1>
                    <p className="text-lg font-medium text-slate-400 max-w-xl">
                        A detailed breakdown of your academic journey for the <span className="text-slate-900 font-bold underline decoration-blue-200 underline-offset-4">2023-2024</span> year.
                    </p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-10 rounded-[1.5rem] shadow-2xl shadow-blue-100 flex items-center gap-3 transition-all active:scale-95 uppercase tracking-widest text-[11px]">
                    📥 Download Report Card
                </button>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {summaryCards.map((card, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -8 }}
                        className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8 group transition-all"
                    >
                        <div className="flex justify-between items-start">
                            <div className={`w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl transition-transform group-hover:scale-110`}>
                                {card.icon}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{card.label}</p>
                            <p className="text-5xl font-black text-slate-900 tracking-tighter">{card.value}</p>
                            <p className="text-[11px] font-bold text-slate-400 tracking-tight">{card.subValue}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Performance Details */}
            <div className="space-y-8">
                <div className="flex flex-wrap items-center justify-between gap-6 px-4">
                    <div className="flex border-b border-slate-100 gap-10">
                        {['All', 'Monthly', 'Term 1', 'Final'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {tab}
                                {activeTab === tab && <motion.div layoutId="activeResTab" className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full" />}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-premium overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Exam Type</th>
                                <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Subjects Breakdown</th>
                                <th className="px-10 py-8 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest">Avg Score</th>
                                <th className="px-10 py-8 text-right text-[11px] font-black text-slate-400 uppercase tracking-widest">Grade</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredResults.length > 0 ? filteredResults.map((row, i) => (
                                <tr key={i} className="group hover:bg-slate-50 transition-all duration-300 cursor-default">
                                    <td className="px-10 py-8 whitespace-nowrap">
                                        <p className="font-black text-slate-800 tracking-tight text-lg">{row.examType}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Class {row.className}</p>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex flex-wrap gap-2">
                                            {row.subjects.map((sub, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-600">
                                                    {sub.subject}: {sub.marks}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-center">
                                        <p className="font-black text-slate-700 text-xl tracking-tighter">{row.average.toFixed(1)}%</p>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] border ${getGradeColor(row.average)}`}>
                                            {getGradeLabel(row.average)}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="p-20 text-center font-bold text-slate-300 uppercase tracking-widest">No results found for this period</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentResultsSection;
