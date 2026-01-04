import React, { useState, useEffect } from 'react';
import {
    Users,
    TrendingUp,
    Map,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    MessageSquare,
    CalendarCheck,
    Package as PackageIcon
} from 'lucide-react';
import { dashboardService } from '../../services/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState([]);
    const [recentEnquiries, setRecentEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await dashboardService.getStats();
                if (response.success) {
                    const statsWithIcons = response.data.stats.map(stat => {
                        let icon;
                        switch (stat.label) {
                            case 'Total Enquiries': icon = <MessageSquare size={20} />; break;
                            case 'Active Bookings': icon = <CalendarCheck size={20} />; break;
                            case 'Featured Packages': icon = <PackageIcon size={20} />; break;
                            case 'Total Revenue': icon = <DollarSign size={20} />; break;
                            default: icon = <TrendingUp size={20} />;
                        }
                        return { ...stat, icon };
                    });
                    setStats(statsWithIcons);
                    setRecentEnquiries(response.data.recent_enquiries);
                }
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
        </div>;
    }

    return (
        <div className="space-y-8 animate-fade-in text-left">
            <div>
                <h1 className="text-3xl font-extrabold text-brand-dark mb-2">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-2xl ${stat.color} text-white flex items-center justify-center`}>
                                {stat.icon}
                            </div>
                            <div className={`flex items-center space-x-1 text-sm font-bold ${stat.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                                <span>{stat.trend}</span>
                                {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-brand-dark mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-brand-dark">Recent Enquiries</h3>
                        <button className="text-brand-primary text-sm font-bold hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Destination</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Travel Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-sm">
                                {recentEnquiries.length > 0 ? recentEnquiries.map((enquiry) => (
                                    <tr key={enquiry.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-brand-dark">{enquiry.name}</td>
                                        <td className="px-6 py-4 font-medium text-gray-600">{enquiry.destination || 'General Enquiry'}</td>
                                        <td className="px-6 py-4 font-medium text-gray-600">{new Date(enquiry.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${enquiry.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' :
                                                enquiry.status === 'pending' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                                                }`}>
                                                {enquiry.status}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-gray-400 italic">No recent enquiries found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden p-6">
                    <h3 className="text-xl font-bold text-brand-dark mb-6">Activity Feed</h3>
                    <div className="space-y-6">
                        {recentEnquiries.slice(0, 4).map((enquiry, i) => (
                            <div key={enquiry.id} className="flex space-x-4">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-brand-accent/50 flex items-center justify-center text-brand-primary">
                                        <Clock size={18} />
                                    </div>
                                    {i !== 3 && <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gray-100"></div>}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-brand-dark">New enquiry from {enquiry.name}</p>
                                    <p className="text-xs text-gray-400 mt-1">{new Date(enquiry.created_at).toLocaleTimeString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
