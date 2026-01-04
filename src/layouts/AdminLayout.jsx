import React, { useState } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Settings, Users, LogOut, Package, Mail } from 'lucide-react';

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

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`${isSidebarOpen ? 'w-64' : 'w-20'
                    } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
            >
                <div className="p-4 flex items-center justify-between h-16 border-b border-gray-800">
                    <span className={`font-bold text-xl ${!isSidebarOpen && 'hidden'}`}>Admin</span>
                    <button onClick={toggleSidebar} className="p-1 hover:bg-gray-800 rounded">
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 py-4">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/admin/dashboard"
                                className={`flex items-center p-3 hover:bg-gray-800 transition-colors ${isActive('/admin/dashboard') ? 'bg-gray-800 text-blue-400' : ''
                                    }`}
                            >
                                <Home size={20} className="min-w-[20px]" />
                                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/admins"
                                className={`flex items-center p-3 hover:bg-gray-800 transition-colors ${isActive('/admin/admins') ? 'bg-gray-800 text-blue-400' : ''
                                    }`}
                            >
                                <Users size={20} className="min-w-[20px]" />
                                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>Admins</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/packages"
                                className={`flex items-center p-3 hover:bg-gray-800 transition-colors ${isActive('/admin/packages') ? 'bg-gray-800 text-blue-400' : ''
                                    }`}
                            >
                                <Package size={20} className="min-w-[20px]" />
                                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>Packages</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/enquiries"
                                className={`flex items-center p-3 hover:bg-gray-800 transition-colors ${isActive('/admin/enquiries') ? 'bg-gray-800 text-blue-400' : ''
                                    }`}
                            >
                                <Mail size={20} className="min-w-[20px]" />
                                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>Enquiries</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/newsletters"
                                className={`flex items-center p-3 hover:bg-gray-800 transition-colors ${isActive('/admin/newsletters') ? 'bg-gray-800 text-blue-400' : ''
                                    }`}
                            >
                                <Users size={20} className="min-w-[20px]" />
                                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>Newsletters</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/settings"
                                className={`flex items-center p-3 hover:bg-gray-800 transition-colors ${isActive('/admin/settings') ? 'bg-gray-800 text-blue-400' : ''
                                    }`}
                            >
                                <Settings size={20} className="min-w-[20px]" />
                                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>Settings</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center text-red-400 hover:text-red-300 w-full p-2 rounded hover:bg-gray-800 transition-colors"
                    >
                        <LogOut size={20} className="min-w-[20px]" />
                        <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm h-16 flex items-center px-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {location.pathname === '/admin/dashboard' && 'Overview'}
                        {location.pathname === '/admin/admins' && 'Admin Management'}
                        {location.pathname === '/admin/packages' && 'Packages'}
                        {location.pathname === '/admin/enquiries' && 'Enquiries'}
                        {location.pathname === '/admin/newsletters' && 'Newsletter Subscribers'}
                        {location.pathname === '/admin/settings' && 'Settings'}
                    </h2>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
