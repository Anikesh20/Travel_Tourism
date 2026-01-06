import React, { useState } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import {
    Menu, X, LayoutDashboard, Settings,
    Users, LogOut, Package, Mail,
    ChevronRight, Bell, Search, Calendar, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        const user = localStorage.getItem('adminUser');
        if (!user) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminUser');
        navigate('/admin');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const navItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/admins', icon: Users, label: 'Admins' },
        { path: '/admin/packages', icon: Package, label: 'Packages' },
        { path: '/admin/bookings', icon: Calendar, label: 'Bookings' },
        { path: '/admin/enquiries', icon: Mail, label: 'Enquiries' },
        { path: '/admin/newsletters', icon: Users, label: 'Newsletters' },
        { path: '/admin/testimonials', icon: MessageSquare, label: 'Testimonials' },
        { path: '/admin/settings', icon: Settings, label: 'Settings' },
    ];

    const getPageTitle = () => {
        const item = navItems.find(item => item.path === location.pathname);
        return item ? item.label : 'Overview';
    };

    return (
        <div className="flex h-screen bg-[#f8fafc]">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 88 }}
                className="bg-white border-r border-slate-200 flex flex-col relative z-20 shadow-sm"
            >
                {/* Logo Section */}
                <div className="h-20 flex items-center px-6 mb-4">
                    <div className="flex items-center space-x-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-200">
                            <img src={logo} alt="Logo" className="w-7 h-7 object-contain brightness-0 invert" />
                        </div>
                        <AnimatePresence>
                            {isSidebarOpen && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="font-bold text-slate-800 text-lg whitespace-nowrap"
                                >
                                    Admin Panel
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`
                                    flex items-center px-4 py-3.5 rounded-2xl transition-all duration-200 group
                                    ${active
                                        ? 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-100/50'
                                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'}
                                `}
                            >
                                <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-blue-600' : 'text-slate-500 group-hover:scale-110 group-hover:text-slate-900 transition-all'}`} />
                                <AnimatePresence>
                                    {isSidebarOpen && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="ml-3 font-semibold text-sm whitespace-nowrap"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                                {active && isSidebarOpen && (
                                    <motion.div
                                        layoutId="sidebar-active-indicator"
                                        className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3.5 rounded-2xl text-slate-700 hover:bg-red-50 hover:text-red-600 transition-all group"
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <AnimatePresence>
                            {isSidebarOpen && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="ml-3 font-extrabold text-sm whitespace-nowrap"
                                >
                                    Sign Out
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>

                {/* Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className="absolute -right-3 top-24 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 shadow-sm z-30"
                >
                    {isSidebarOpen ? <X size={12} /> : <Menu size={12} />}
                </button>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between flex-shrink-0 relative z-10">
                    <div className="flex items-center space-x-4">
                        <div className="bg-slate-50 p-2 rounded-lg text-slate-400 lg:hidden">
                            <Menu size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                            {getPageTitle()}
                        </h2>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-100 focus-within:bg-white transition-all">
                            <Search className="w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search something..."
                                className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-48 font-bold text-slate-800 placeholder:text-slate-400"
                            />
                        </div>

                        <div className="relative cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors">
                            <Bell className="w-5 h-5 text-slate-800" />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </div>

                        <div className="flex items-center space-x-3 pl-4 border-l border-slate-100">
                            <div className="w-10 h-10 rounded-full border-2 border-blue-100 p-0.5">
                                <img
                                    src={`https://ui-avatars.com/api/?name=Admin&bg=3b82f6&color=fff`}
                                    className="w-full h-full rounded-full object-cover"
                                    alt="User"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto px-8 py-8 no-scrollbar">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
