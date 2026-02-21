import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    const demoAccounts = [
        { role: 'Admin', email: 'admin@school.com', icon: '🔑', color: 'bg-blue-500' },
        { role: 'Principal', email: 'principal@school.com', icon: '🏛️', color: 'bg-slate-700' },
        { role: 'Teacher', email: 'teacher@school.com', icon: '👨‍🏫', color: 'bg-indigo-500' },
        { role: 'Student', email: 'student@school.com', icon: '🎓', color: 'bg-emerald-500' },
        { role: 'Parent', email: 'parent@school.com', icon: '👨‍👩-👧', color: 'bg-rose-500' },
        { role: 'Staff', email: 'staff@school.com', icon: '🏢', color: 'bg-amber-500' },
        { role: 'Librarian', email: 'librarian@school.com', icon: '📚', color: 'bg-purple-500' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (error) {
            setError('Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDemoLogin = async (demo) => {
        setEmail(demo.email);
        setPassword('123456');

        // Immediate login after filling
        setLoading(true);
        setError('');
        try {
            // Small delay for UX so user sees the fields being filled
            await new Promise(resolve => setTimeout(resolve, 500));
            await login(demo.email, '123456');
            navigate(from, { replace: true });
        } catch (error) {
            setError('Demo account error. Please try manual entry.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-20 -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-3xl opacity-20 -ml-80 -mb-80" />

            {/* Left Side - Brand & Info */}
            <div className="lg:w-1/2 flex flex-col justify-center p-12 lg:p-24 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl shadow-blue-200">
                            🎓
                        </div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tighter">SchoolSys</h1>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none">
                            Next-Gen <br />
                            <span className="text-blue-600">Education Portal.</span>
                        </h2>
                        <p className="text-xl text-slate-400 font-medium max-w-lg">
                            Experience the most advanced school management system. Manage academics, finances, and communication in one unified platform.
                        </p>
                    </div>

                    <div className="flex gap-12 pt-8">
                        <div>
                            <p className="text-4xl font-black text-slate-800 tracking-tighter">10k+</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Active Students</p>
                        </div>
                        <div>
                            <p className="text-4xl font-black text-slate-800 tracking-tighter">99.9%</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">System Uptime</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right Side - Login form & Demo */}
            <div className="lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="w-full max-w-xl bg-white rounded-[3rem] p-12 shadow-2xl shadow-slate-200 border border-slate-50"
                >
                    <div className="mb-10 text-center">
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h3>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Sign in to continue to your dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-700 font-bold focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                                placeholder="name@school.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                                <button type="button" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Forgot?</button>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-700 font-bold focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-bold text-center"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-100 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Sign Into Dashboard ➜</>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-px bg-slate-100" />
                            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Demo Access</p>
                            <div className="flex-1 h-px bg-slate-100" />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {demoAccounts.map((account, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => handleDemoLogin(account)}
                                    className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-slate-50 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
                                >
                                    <span className="text-xl group-hover:scale-110 transition-transform">{account.icon}</span>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-blue-600 transition-colors">{account.role}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;

