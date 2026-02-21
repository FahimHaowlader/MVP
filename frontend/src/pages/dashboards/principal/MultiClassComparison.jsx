import React, { useState } from 'react';
import { motion } from 'framer-motion';

const classes = [
    'Grade 10 - Section A', 'Grade 10 - Section B', 'Grade 11 - Section A',
    'Grade 11 - Section C', 'Grade 12 - Section A', 'Grade 12 - Section B',
];

const comparisonData = {
    'Grade 10 - Section A': { gpa: '4.1 / A', pass: '98%', attendance: '96.5%', awards: 8, midterms: '98%', finals: '94%' },
    'Grade 10 - Section B': { gpa: '3.7 / B+', pass: '95%', attendance: '94.2%', awards: 5, midterms: '95%', finals: '91%' },
    'Grade 11 - Section C': { gpa: '3.9 / A-', pass: '100%', attendance: '95.8%', awards: 12, midterms: '96%', finals: '99%' },
};

const getBest = (key, cols) => {
    const vals = cols.map(c => parseFloat(comparisonData[c]?.[key] || '0'));
    return Math.max(...vals);
};

const MultiClassComparison = () => {
    const [selected, setSelected] = useState(['Grade 10 - Section A', 'Grade 10 - Section B', 'Grade 11 - Section C']);
    const [compared, setCompared] = useState(['Grade 10 - Section A', 'Grade 10 - Section B', 'Grade 11 - Section C']);
    const [expandTests, setExpandTests] = useState(false);

    const handleSelect = (e) => {
        const opts = Array.from(e.target.selectedOptions).map(o => o.value);
        setSelected(opts);
    };

    const metrics = [
        { label: 'Average Marks / GPA', key: 'gpa', isHigher: true },
        { label: 'Pass Percentage', key: 'pass', isHigher: true },
        { label: 'Average Attendance Rate', key: 'attendance', isHigher: true },
        { label: 'Awards / Recognitions', key: 'awards', isHigher: true },
    ];

    return (
        <div className="max-w-[1300px] mx-auto space-y-10 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Multi-Class Comparison</h1>
                    <p className="text-slate-400 font-medium mt-2">Detailed, metric-focused analysis across selected classes.</p>
                </div>
                <div className="flex gap-4">
                    <button className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-all text-xl">☀</button>
                    <button className="flex items-center gap-2 px-7 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm font-black text-[11px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
                        🖨 Print Report
                    </button>
                    <button className="flex items-center gap-2 px-7 py-4 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-100 font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 active:scale-95 transition-all">
                        ⬇ Download as CSV
                    </button>
                </div>
            </div>

            {/* Class Selector */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                <h2 className="text-lg font-black text-slate-800 tracking-tight">Select Classes to Compare</h2>
                <div className="flex gap-6 items-start">
                    <select multiple value={selected} onChange={handleSelect}
                        className="flex-1 px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-800 h-36">
                        {classes.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <button onClick={() => setCompared([...selected])}
                        className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 active:scale-95 transition-all shadow-lg">
                        Compare
                    </button>
                </div>
                <p className="text-[10px] font-bold text-slate-400">Hold Ctrl/Cmd to select multiple classes.</p>
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-50">
                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest w-52">Performance Metric</th>
                            {compared.map(c => (
                                <th key={c} className="px-8 py-6 text-[10px] font-black text-slate-700 uppercase tracking-widest">{c}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {metrics.map((m) => {
                            const bestRaw = compared.map(c => parseFloat(comparisonData[c]?.[m.key] || 0));
                            const bestVal = Math.max(...bestRaw);
                            return (
                                <tr key={m.key} className="hover:bg-slate-50/30 transition-all">
                                    <td className="px-10 py-5 font-black text-slate-800">{m.label}</td>
                                    {compared.map(c => {
                                        const rawVal = comparisonData[c]?.[m.key] ?? '–';
                                        const numericVal = parseFloat(rawVal);
                                        const isBest = numericVal === bestVal;
                                        return (
                                            <td key={c} className={`px-8 py-5 font-black text-sm ${isBest ? 'text-emerald-600 bg-emerald-50/30' : 'text-slate-600'}`}>
                                                {rawVal}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}

                        {/* Expandable Tests Row */}
                        <tr className="hover:bg-slate-50/30 transition-all cursor-pointer" onClick={() => setExpandTests(!expandTests)}>
                            <td className="px-10 py-5 font-black text-slate-800 flex items-center gap-2">
                                Top Mark in Each Test
                                <motion.span animate={{ rotate: expandTests ? 180 : 0 }} className="text-slate-400 text-sm">↓</motion.span>
                            </td>
                            {compared.map(c => <td key={c} className="px-8 py-5 font-bold text-slate-400">–</td>)}
                        </tr>

                        {expandTests && (
                            <>
                                {[['midterms', 'Midterms'], ['finals', 'Finals']].map(([key, label]) => {
                                    const vals = compared.map(c => parseFloat(comparisonData[c]?.[key] || 0));
                                    const best = Math.max(...vals);
                                    return (
                                        <motion.tr key={key} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                            className="bg-slate-50/30 hover:bg-slate-50 transition-all">
                                            <td className="px-10 py-4 font-black text-slate-500 italic text-sm pl-16">{label}</td>
                                            {compared.map((c, i) => (
                                                <td key={c} className={`px-8 py-4 text-sm font-black ${parseFloat(comparisonData[c]?.[key]) === best ? 'text-emerald-600' : 'text-slate-500'}`}>
                                                    {comparisonData[c]?.[key]}
                                                </td>
                                            ))}
                                        </motion.tr>
                                    );
                                })}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MultiClassComparison;
