import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const OperationsSection = () => {
    const [activeTab, setActiveTab] = useState('admissions');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    // Admission State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('123456');
    const [role, setRole] = useState('Student');

    // Fee State
    const [studentId, setStudentId] = useState('');
    const [amount, setAmount] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [feeType, setFeeType] = useState('Tuition');
    const [description, setDescription] = useState('');

    const handleAdmissionSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5001/api/users',
                { name, email, password, role },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setStatus({ type: 'success', message: `Successfully onboarded ${name} as ${role}` });
            setName(''); setEmail('');
        } catch (err) {
            setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to create user' });
        } finally {
            setLoading(false);
            setTimeout(() => setStatus({ type: '', message: '' }), 5000);
        }
    };

    const handleFeeSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5001/api/admin/fees',
                { student: studentId, amount, dueDate, type: feeType, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setStatus({ type: 'success', message: 'Financial record successfully assigned' });
            setStudentId(''); setAmount('');
        } catch (err) {
            setStatus({ type: 'error', message: err.response?.data?.message || 'Financial assignment failed' });
        } finally {
            setLoading(false);
            setTimeout(() => setStatus({ type: '', message: '' }), 5000);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
            {/* Header Content */}
            <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none">
                    System <span className="text-blue-600">Operations.</span>
                </h1>
                <p className="text-lg font-medium text-slate-400 max-w-2xl">
                    Execute core administrative tasks, manage user lifecycles, and oversee financial distributions through this unified command center.
                </p>
            </div>

            {/* Status Notifications */}
            <AnimatePresence>
                {status.message && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`p-6 rounded-[1.5rem] border ${status.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'} font-black text-sm uppercase tracking-widest text-center shadow-lg`}
                    >
                        {status.type === 'success' ? '✅' : '❌'} {status.message}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Interface */}
            <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-premium overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[600px]">
                    {/* Left Navigation */}
                    <div className="bg-slate-50/50 border-r border-slate-100 p-10 space-y-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Select Domain</p>
                        <OperationTab active={activeTab === 'admissions'} onClick={() => setActiveTab('admissions')} icon="👤" label="User Onboarding" />
                        <OperationTab active={activeTab === 'fees'} onClick={() => setActiveTab('fees')} icon="💰" label="Fee Management" />

                        <div className="pt-12 mt-12 border-t border-slate-200/50 space-y-6">
                            <div className="flex items-center gap-4 group cursor-help">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs">ℹ️</div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Helpful Tip</p>
                            </div>
                            <p className="text-[11px] font-medium text-slate-400 leading-relaxed italic pr-4">
                                Ensure all email addresses are unique and valid before submitting onboarding requests.
                            </p>
                        </div>
                    </div>

                    {/* Right Form Area */}
                    <div className="lg:col-span-3 p-12 lg:p-20">
                        <AnimatePresence mode="wait">
                            {activeTab === 'admissions' ? (
                                <motion.div key="admissions" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
                                    <div className="space-y-2">
                                        <h3 className="text-3xl font-black text-slate-900 tracking-tight">Onboard New Instance</h3>
                                        <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">Create security credentials for new users</p>
                                    </div>

                                    <form onSubmit={handleAdmissionSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <InputField label="Full Name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Alexandra Smith" />
                                            <InputField label="Primary Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="alex@school.com" />
                                            <InputField label="Secure Password" type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">System Role</label>
                                                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-700 font-bold focus:ring-4 focus:ring-blue-100 transition-all outline-none appearance-none" value={role} onChange={e => setRole(e.target.value)}>
                                                    {['Student', 'Teacher', 'Parent', 'Admin', 'Staff', 'Librarian'].map(r => <option key={r} value={r}>{r}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="pt-6">
                                            <SubmitButton loading={loading} label="Execute Onboarding" />
                                        </div>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div key="fees" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
                                    <div className="space-y-2">
                                        <h3 className="text-3xl font-black text-slate-900 tracking-tight">Financial Distribution</h3>
                                        <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">Assign new fee structures to student profiles</p>
                                    </div>

                                    <form onSubmit={handleFeeSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <InputField label="Student Global ID" type="text" value={studentId} onChange={e => setStudentId(e.target.value)} placeholder="0x..." />
                                            <InputField label="Distribution Amount ($)" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="1500.00" />
                                            <InputField label="Statement Due Date" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Fee Classification</label>
                                                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-700 font-bold focus:ring-4 focus:ring-blue-100 transition-all outline-none appearance-none" value={feeType} onChange={e => setFeeType(e.target.value)}>
                                                    {['Tuition', 'Exam', 'Laboratory', 'Library', 'Transport'].map(t => <option key={t} value={t}>{t}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <InputField label="Transaction Description" type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Monthly tuition for Semester 1" />
                                        <div className="pt-6">
                                            <SubmitButton loading={loading} label="Finalize Assignment" />
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OperationTab = ({ active, onClick, icon, label }) => (
    <button onClick={onClick} className={`w-full flex items-center gap-4 p-5 rounded-[1.5rem] transition-all duration-300 ${active ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-400 hover:bg-white hover:text-slate-600'}`}>
        <span className="text-2xl">{icon}</span>
        <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
    </button>
);

const InputField = ({ label, type, value, onChange, placeholder }) => (
    <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-700 font-bold focus:ring-4 focus:ring-blue-100 transition-all outline-none"
            required
        />
    </div>
);

const SubmitButton = ({ loading, label }) => (
    <button type="submit" disabled={loading} className="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-100 transition-all active:scale-95 flex items-center gap-4 uppercase tracking-[0.2em] text-[10px] disabled:opacity-50">
        {loading ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : '➜'}
        {label}
    </button>
);

export default OperationsSection;
