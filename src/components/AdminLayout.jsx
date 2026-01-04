import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    MessageSquare,
    CalendarCheck,
    Package,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Search,
    User
} from 'lucide-react';

const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();

    const menuItems = [
        { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
        { title: 'Enquiries', icon: <MessageSquare size={20} />, path: '/admin/enquiries' },
        { title: 'Bookings', icon: <CalendarCheck size={20} />, path: '/admin/bookings' },
        { title: 'Packages', icon: <Package size={20} />, path: '/admin/packages' },
        { title: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-primary text-white transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:relative lg:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    <div className="p-6 flex items-center justify-between border-b border-white/10">
                        <Link to="/admin" className="flex items-center space-x-2">
                            <div className="bg-brand-secondary p-1.5 rounded-lg text-brand-primary">
                                <Package size={20} strokeWidth={2.5} />
                            </div>
                            <span className="text-xl font-bold font-display tracking-tight text-white italic">
                                Quest<span className="text-brand-secondary">Admin</span>
                            </span>
                        </Link>
                        <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="flex-grow p-4 space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.title}
                                to={item.path}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive(item.path)
                                    ? 'bg-brand-secondary text-brand-primary font-bold shadow-lg'
                                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-white/10">
                        <button className="flex items-center space-x-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/10 transition-all w-full">
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            <div className="flex-grow flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
                    <div className="flex items-center space-x-4">
                        <button
                            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={20} />
                        </button>
                        <div className="hidden sm:flex items-center bg-gray-50 px-4 py-2 rounded-full border border-gray-100 focus-within:ring-2 ring-brand-primary/10 transition-all">
                            <Search size={18} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-48 lg:w-64"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button className="p-2 text-gray-400 hover:text-brand-primary transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>
                        <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
                            <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-xs uppercase">
                                AD
                            </div>
                            <div className="hidden sm:block text-left">
                                <p className="text-sm font-bold text-brand-dark">Admin User</p>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Administrator</p>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-grow p-4 lg:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
