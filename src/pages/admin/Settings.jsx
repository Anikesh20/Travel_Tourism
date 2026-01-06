import React, { useState, useEffect } from 'react';
import { getSettings, updateSettings, updateProfile } from '../../api/settings';
import Toast from '../../components/admin/Toast';
import { Save, User, Mail, Lock, Shield, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

    // Toggle states for password visibility
    const [showProfilePass, setShowProfilePass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [showSmtpPass, setShowSmtpPass] = useState(false);

    // Profile State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // SMTP State
    const [smtpSettings, setSmtpSettings] = useState({
        smtp_user: '',
        smtp_pass: '',
        two_factor_system_enabled: '0'
    });

    useEffect(() => {
        const load = async () => {
            try {
                const settings = await getSettings();
                if (settings) {
                    setSmtpSettings(prev => ({
                        ...prev,
                        ...settings
                    }));
                }

                const user = JSON.parse(localStorage.getItem('adminUser'));
                if (user) {
                    setUsername(user.username);
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load settings');
            }
        };
        load();
    }, []);

    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
    };

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, show: false }));
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        if (password && password !== confirmPassword) {
            showNotification("Passwords do not match", "error");
            return;
        }

        setLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem('adminUser'));
            await updateProfile(user.id, username, password);

            const updatedUser = {
                ...user,
                username
            };
            localStorage.setItem('adminUser', JSON.stringify(updatedUser));

            showNotification('Profile updated successfully', 'success');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            showNotification(err.message || 'Failed to update profile', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSmtpUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await updateSettings(smtpSettings);
            showNotification('Security settings deployed successfully', 'success');
        } catch (err) {
            showNotification(err.message || 'Failed to save settings', 'error');
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'profile', label: 'Admin Profile', icon: User },
        { id: 'smtp', label: 'Security & Email', icon: Shield },
    ];

    return (
        <div className="max-w-4xl mx-auto pb-20 relative">
            <Toast
                show={notification.show}
                message={notification.message}
                type={notification.type}
                onClose={handleCloseNotification}
            />
            <div className="mb-8">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Settings</h2>
                <p className="text-slate-600 font-semibold mt-1">Manage your account and system-wide security configurations.</p>
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 bg-slate-100 p-1.5 rounded-2xl mb-8 w-fit">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            className={`flex items-center px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === tab.id
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-800'
                                }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <Icon size={18} className="mr-2" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Content Area */}
            {activeTab === 'profile' && (
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200"
                >
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                            <User size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">Personal Details</h3>
                            <p className="text-slate-500 text-sm font-bold">Update your administrative credentials.</p>
                        </div>
                    </div>

                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-800 ml-1">Username</label>
                            <input
                                type="text"
                                className="w-full bg-slate-50 border border-slate-100 text-slate-900 px-4 py-3 rounded-2xl focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all font-semibold"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-800 ml-1">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showProfilePass ? "text" : "password"}
                                        className="w-full bg-slate-50 border border-slate-100 text-slate-900 px-4 py-3 rounded-2xl focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all font-semibold"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowProfilePass(!showProfilePass)}
                                        className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
                                    >
                                        {showProfilePass ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-800 ml-1">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPass ? "text" : "password"}
                                        className="w-full bg-slate-50 border border-slate-100 text-slate-900 px-4 py-3 rounded-2xl focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all font-semibold"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                                        className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
                                    >
                                        {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>


                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-slate-900 hover:bg-black text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-slate-200 transition-all active:scale-95 flex items-center"
                        >
                            <Save size={18} className="mr-2" />
                            {loading ? 'Processing...' : 'Save Changes'}
                        </button>
                    </form>
                </motion.div>
            )}

            {/* Security/Email Tab */}
            {activeTab === 'smtp' && (
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200"
                >
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                            <Shield size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">Security & Email</h3>
                            <p className="text-slate-500 text-sm font-bold">Configure email delivery and global security rules.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSmtpUpdate} className="space-y-8">
                        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h4 className="font-black text-slate-900">System-Wide 2FA</h4>
                                    <p className="text-xs font-bold text-slate-500">Enforce OTP verification for all administrators.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={smtpSettings.two_factor_system_enabled === '1'}
                                        onChange={(e) => setSmtpSettings({ ...smtpSettings, two_factor_system_enabled: e.target.checked ? '1' : '0' })}
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-bold text-slate-800 ml-1">Gmail Address (SMTP User)</label>
                                <input
                                    type="email"
                                    className="w-full bg-slate-50 border border-slate-100 text-slate-900 px-4 py-3 rounded-2xl focus:outline-none focus:bg-white font-semibold"
                                    value={smtpSettings.smtp_user}
                                    onChange={(e) => setSmtpSettings({ ...smtpSettings, smtp_user: e.target.value })}
                                    placeholder="your-email@gmail.com"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-bold text-slate-800 ml-1">Gmail App Password</label>
                                <div className="relative">
                                    <input
                                        type={showSmtpPass ? "text" : "password"}
                                        className="w-full bg-slate-50 border border-slate-100 text-slate-900 px-4 py-3 rounded-2xl focus:outline-none focus:bg-white font-semibold"
                                        value={smtpSettings.smtp_pass}
                                        onChange={(e) => setSmtpSettings({ ...smtpSettings, smtp_pass: e.target.value })}
                                        placeholder="•••• •••• •••• ••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowSmtpPass(!showSmtpPass)}
                                        className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
                                    >
                                        {showSmtpPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <p className="text-[10px] text-slate-400 font-bold mt-2 ml-1 uppercase tracking-wider">Note: Uses secure Gmail defaults (Host: smtp.gmail.com, Port: 587)</p>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center justify-center"
                            >
                                <Save size={18} className="mr-2" />
                                {loading ? 'Saving Settings...' : 'Deploy System Settings'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}
        </div>
    );
};

export default AdminSettings;
