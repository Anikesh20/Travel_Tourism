import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import { Eye, EyeOff, Lock, User, LogIn, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';
import apiClient from '../../api/client';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [is2FARequired, setIs2FARequired] = useState(false);
    const [tempUserId, setTempUserId] = useState(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (localStorage.getItem('adminUser')) {
            navigate('/admin/dashboard');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const data = await login(username, password);
            if (data.status === '2fa_required') {
                setIs2FARequired(true);
                setTempUserId(data.user_id);
            } else {
                localStorage.setItem('adminUser', JSON.stringify(data.user));
                navigate('/admin/dashboard');
            }
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await apiClient.post('/auth/verify-otp', {
                user_id: tempUserId,
                otp: otp
            });
            const data = response.data;
            localStorage.setItem('adminUser', JSON.stringify(data.user));
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Verification failed. Invalid OTP.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
            {/* Soft decorative circles */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[15%] -left-[10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[100px] opacity-60" />
                <div className="absolute -bottom-[15%] -right-[10%] w-[50%] h-[50%] bg-indigo-100 rounded-full blur-[100px] opacity-60" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md px-4"
            >
                <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block relative mb-6"
                        >
                            <div className="w-24 h-24 rounded-full p-1 bg-white shadow-xl border border-gray-50 flex items-center justify-center overflow-hidden">
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                {is2FARequired ? <ShieldCheck className="w-4 h-4 text-white" /> : <Lock className="w-4 h-4 text-white" />}
                            </div>
                        </motion.div>

                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            {is2FARequired ? 'Verification' : 'Admin Portal'}
                        </h2>
                        <p className="text-slate-600 mt-2 font-semibold">
                            {is2FARequired ? 'Enter the code sent to your email' : 'Please enter your details to sign in'}
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-red-50 border border-red-100 text-red-600 p-4 mb-8 rounded-2xl text-sm font-medium flex items-center"
                            >
                                <span className="w-2 h-2 bg-red-600 rounded-full mr-3 animate-pulse" />
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!is2FARequired ? (
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-800 ml-1">Username</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-100 text-slate-900 pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-400 font-semibold"
                                        placeholder="your-username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-800 ml-1">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="w-full bg-slate-50 border border-slate-100 text-slate-900 pl-12 pr-12 py-4 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-400 font-semibold"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between px-1">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                    <span className="text-sm text-slate-700 font-bold">Remember me</span>
                                </label>
                                <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-700">Forgot password?</a>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-2xl shadow-xl shadow-gray-200 transition-all active:scale-[0.98] flex items-center justify-center space-x-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Continue</span>
                                        <LogIn className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOTP} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-800 ml-1">OTP Code</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-100 text-slate-900 pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-400 font-black text-center tracking-[1em]"
                                        placeholder="000000"
                                        maxLength={6}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                    />
                                </div>
                                <p className="text-xs text-slate-500 text-center font-bold mt-2">The code expires in 10 minutes.</p>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-100 transition-all active:scale-[0.98] flex items-center justify-center space-x-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Verify Now</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => setIs2FARequired(false)}
                                className="w-full text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors py-2"
                            >
                                Back to login
                            </button>
                        </form>
                    )}
                </div>

                <div className="mt-10 text-center">
                    <p className="text-gray-400 text-sm font-medium">
                        &copy; {new Date().getFullYear()} Travel & Tourism. <br />
                        All rights reserved for administrative use only.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
