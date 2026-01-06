import React, { useState, useEffect } from 'react';
import { Mail, Users, Package, TrendingUp, Settings, ArrowRight, Calendar, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { enquiryService, packageService } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import Toast from '../../components/admin/Toast';

const DashboardHome = () => {
    const [stats, setStats] = useState({
        enquiries: 0,
        packages: 0,
        admins: 0
    });
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

    const fetchStats = async () => {
        try {
            const enqRes = await enquiryService.getAll();
            const pkgRes = await packageService.getAll();
            setStats({
                enquiries: enqRes.data ? enqRes.data.length : 0,
                packages: pkgRes ? pkgRes.length : 0,
                admins: 2
            });
        } catch (err) {
            console.error("Failed to fetch dashboard stats", err);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
    };

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, show: false }));
    };

    const cards = [
        {
            title: 'New Enquiries',
            value: stats.enquiries,
            icon: Mail,
            link: '/admin/enquiries',
            color: 'blue',
            trend: '+12.5%'
        },
        {
            title: 'Active Packages',
            value: stats.packages,
            icon: Package,
            link: '/admin/packages',
            color: 'indigo',
            trend: '+3.2%'
        },
        {
            title: 'Team Admins',
            value: stats.admins,
            icon: Users,
            link: '/admin/admins',
            color: 'purple',
            trend: 'Stable'
        },
        {
            title: 'Growth Rate',
            value: '24%',
            icon: TrendingUp,
            link: '#',
            color: 'emerald',
            trend: '+4.3%'
        },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="space-y-10 relative">
            <Toast
                show={notification.show}
                message={notification.message}
                type={notification.type}
                onClose={handleCloseNotification}
            />
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Overview</h1>
                    <p className="text-slate-700 font-bold mt-1">Check how your travel management system is performing today.</p>
                </div>
                <div className="flex items-center space-x-3 bg-white border border-slate-200 p-2 rounded-2xl shadow-sm">
                    <div className="bg-slate-50 p-2 rounded-xl">
                        <Calendar className="w-5 h-5 text-slate-600" />
                    </div>
                    <span className="text-sm font-bold text-slate-800 pr-3 border-r border-slate-100">Jan 06, 2026</span>
                    <span className="text-sm font-bold text-slate-500 pl-1">Last sync: 2 min ago</span>
                </div>
            </div>

            {/* Stats Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {cards.map((card, i) => {
                    const Icon = card.icon;
                    const colors = {
                        blue: 'bg-blue-50 text-blue-600 border-blue-100 shadow-blue-100/20',
                        indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100 shadow-indigo-100/20',
                        purple: 'bg-purple-50 text-purple-600 border-purple-100 shadow-purple-100/20',
                        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-100/20',
                    };

                    return (
                        <motion.div key={i} variants={item}>
                            <Link to={card.link} className="block group">
                                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`p-4 rounded-2xl border ${colors[card.color]}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex items-center space-x-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold">
                                            <ArrowUpRight className="w-3 h-3" />
                                            <span>{card.trend}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-slate-700 text-sm font-black uppercase tracking-wider">{card.title}</p>
                                        <div className="flex items-baseline space-x-2 mt-1">
                                            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{card.value}</h3>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center text-xs font-bold text-slate-500 group-hover:text-blue-600 transition-colors">
                                        <span>Show Analytics</span>
                                        <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Two Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity / Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">Performance Summary</h3>
                            <p className="text-slate-700 text-sm font-bold">Activity and trends over the last 30 days.</p>
                        </div>
                        <select className="bg-slate-50 border-none rounded-xl text-sm font-bold px-4 py-2 focus:ring-2 focus:ring-blue-100">
                            <option>Monthly</option>
                            <option>Weekly</option>
                        </select>
                    </div>

                    {/* Placeholder for a chart/visual */}
                    <div className="h-64 bg-slate-50 rounded-3xl border border-dashed border-slate-200 flex items-center justify-center">
                        <div className="text-center">
                            <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Analytics Visualization</p>
                            <p className="text-slate-300 text-sm mt-1">Data processing in real-time...</p>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mr-4">
                                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-500 uppercase">Conversion Rate</p>
                                <p className="text-lg font-black text-slate-900">14.2%</p>
                            </div>
                        </div>
                        <div className="flex items-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mr-4">
                                <div className="w-3 h-3 bg-indigo-500 rounded-full" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-500 uppercase">Avg. Session</p>
                                <p className="text-lg font-black text-slate-900">4m 32s</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Shortcuts */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden"
                >
                    <div className="relative z-10 flex flex-col h-full">
                        <h3 className="text-xl font-black tracking-tight mb-2">Quick Commands</h3>
                        <p className="text-slate-400 text-sm font-medium mb-8">Access frequently used features.</p>

                        <div className="space-y-4 flex-1">
                            <Link to="/admin/packages" className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                                <div className="flex items-center">
                                    <div className="p-2 bg-blue-600 rounded-lg mr-3">
                                        <Package size={18} />
                                    </div>
                                    <span className="font-bold">Add Package</span>
                                </div>
                                <ArrowRight size={16} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link to="/admin/enquiries" className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                                <div className="flex items-center">
                                    <div className="p-2 bg-emerald-600 rounded-lg mr-3">
                                        <Mail size={18} />
                                    </div>
                                    <span className="font-bold">Check Enquiries</span>
                                </div>
                                <ArrowRight size={16} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link to="/admin/settings" className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                                <div className="flex items-center">
                                    <div className="p-2 bg-slate-700 rounded-lg mr-3">
                                        <Settings size={18} />
                                    </div>
                                    <span className="font-bold">Settings</span>
                                </div>
                                <ArrowRight size={16} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10">
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl relative overflow-hidden group">
                                <div className="relative z-10">
                                    <p className="font-black text-lg">System Update</p>
                                    <p className="text-blue-100 text-sm mt-1">Version 2.4.0 is available.</p>
                                    <button
                                        onClick={() => showNotification("Starting system update to v2.4.0...", "success")}
                                        className="mt-4 px-4 py-2 bg-white text-blue-700 text-xs font-black uppercase rounded-xl hover:bg-blue-50 transition-colors"
                                    >
                                        Update Now
                                    </button>
                                </div>
                                <div className="absolute -bottom-4 -right-4 opacity-20 transform group-hover:scale-110 transition-transform">
                                    <Settings size={100} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full" />
                </motion.div>
            </div>
        </div>
    );
};

export default DashboardHome;
