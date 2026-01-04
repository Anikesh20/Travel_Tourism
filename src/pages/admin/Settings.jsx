import React, { useState, useEffect } from 'react';
import { getSettings, updateSettings, updateProfile } from '../../api/settings';
import { Save, User, Mail, Lock } from 'lucide-react';

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Profile State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // SMTP State
    const [smtpSettings, setSmtpSettings] = useState({
        smtp_email: '',
        smtp_password: '',
        smtp_host: 'smtp.gmail.com',
        smtp_port: '587'
    });

    useEffect(() => {
        // Load settings and profile info
        const load = async () => {
            try {
                // Get SMTP settings
                const settings = await getSettings();
                if (settings) {
                    setSmtpSettings(prev => ({ ...prev, ...settings }));
                }

                // Get Current User Info
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

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (password && password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem('adminUser'));
            await updateProfile(user.id, username, password);

            // Update local storage if username changed
            user.username = username;
            localStorage.setItem('adminUser', JSON.stringify(user));

            setMessage('Profile updated successfully');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleSmtpUpdate = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            await updateSettings(smtpSettings);
            setMessage('SMTP settings saved successfully');
        } catch (err) {
            setError(err.message || 'Failed to save settings');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Settings</h2>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    className={`py-2 px-4 font-medium transition-colors ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('profile')}
                >
                    Profile Settings
                </button>
                <button
                    className={`py-2 px-4 font-medium transition-colors ${activeTab === 'smtp' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('smtp')}
                >
                    SMTP Settings
                </button>
            </div>

            {/* Messages */}
            {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</div>}
            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-bold mb-4 flex items-center"><User className="mr-2" size={20} /> My Profile</h3>
                    <form onSubmit={handleProfileUpdate}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Username</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">New Password (leave blank to keep current)</label>
                            <input
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="******"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Confirm New Password</label>
                            <input
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="******"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
                        >
                            <Save size={18} className="mr-2" />
                            {loading ? 'Saving...' : 'Update Profile'}
                        </button>
                    </form>
                </div>
            )}

            {/* SMTP Tab */}
            {activeTab === 'smtp' && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-bold mb-4 flex items-center"><Mail className="mr-2" size={20} /> SMTP Configuration</h3>
                    <form onSubmit={handleSmtpUpdate}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">SMTP Host</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={smtpSettings.smtp_host}
                                    onChange={(e) => setSmtpSettings({ ...smtpSettings, smtp_host: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">SMTP Port</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={smtpSettings.smtp_port}
                                    onChange={(e) => setSmtpSettings({ ...smtpSettings, smtp_port: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">SMTP Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={smtpSettings.smtp_email}
                                onChange={(e) => setSmtpSettings({ ...smtpSettings, smtp_email: e.target.value })}
                                placeholder="admin@example.com"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">SMTP Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={smtpSettings.smtp_password}
                                    onChange={(e) => setSmtpSettings({ ...smtpSettings, smtp_password: e.target.value })}
                                    placeholder="App Password"
                                />
                                <Lock size={16} className="absolute right-3 top-3 text-gray-400" />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Stored securely in database.</p>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
                        >
                            <Save size={18} className="mr-2" />
                            {loading ? 'Saving...' : 'Save Settings'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminSettings;
