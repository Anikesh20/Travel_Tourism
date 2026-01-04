import React, { useState, useEffect } from 'react';
import { Mail, Users, Package, TrendingUp, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { enquiryService, packageService } from '../../services/api';

const DashboardHome = () => {
    const [stats, setStats] = useState({
        enquiries: 0,
        packages: 0,
        admins: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const enqRes = await enquiryService.getAll();
                const pkgRes = await packageService.getAll();
                // This is a simple way to get counts without a dedicated stats API
                setStats({
                    enquiries: enqRes.data ? enqRes.data.length : 0,
                    packages: pkgRes ? pkgRes.length : 0,
                    admins: 2 // Fallback or fetch from admins API if available
                });
            } catch (err) {
                console.error("Failed to fetch dashboard stats", err);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { title: 'New Enquiries', value: stats.enquiries, icon: <Mail className="text-blue-600" />, link: '/admin/enquiries', color: 'bg-blue-50' },
        { title: 'Total Packages', value: stats.packages, icon: <Package className="text-emerald-600" />, link: '/admin/packages', color: 'bg-emerald-50' },
        { title: 'System Admins', value: stats.admins, icon: <Users className="text-amber-600" />, link: '/admin/admins', color: 'bg-amber-50' },
        { title: 'Growth', value: '+12%', icon: <TrendingUp className="text-purple-600" />, link: '#', color: 'bg-purple-50' },
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, i) => (
                    <Link key={i} to={card.link} className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-gray-500 text-xs font-black uppercase tracking-widest">{card.title}</h3>
                                <p className="text-4xl font-black text-brand-primary mt-2 tracking-tighter">{card.value}</p>
                            </div>
                            <div className={`p-4 ${card.color} rounded-2xl group-hover:scale-110 transition-transform`}>
                                {card.icon}
                            </div>
                        </div>
                        <div className="mt-6 flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                            <span>View Details</span>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
                <h3 className="text-xl font-black text-brand-primary tracking-tighter mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link to="/admin/packages" className="p-6 bg-gray-50 rounded-[2rem] text-center hover:bg-brand-primary hover:text-white transition-all group">
                        <Package className="mx-auto mb-3 text-brand-primary group-hover:text-white" />
                        <span className="font-extrabold text-sm">Add New Package</span>
                    </Link>
                    <Link to="/admin/enquiries" className="p-6 bg-gray-50 rounded-[2rem] text-center hover:bg-brand-primary hover:text-white transition-all group">
                        <Mail className="mx-auto mb-3 text-brand-primary group-hover:text-white" />
                        <span className="font-extrabold text-sm">Review Enquiries</span>
                    </Link>
                    <Link to="/admin/settings" className="p-6 bg-gray-50 rounded-[2rem] text-center hover:bg-brand-primary hover:text-white transition-all group">
                        <Settings className="mx-auto mb-3 text-brand-primary group-hover:text-white" />
                        <span className="font-extrabold text-sm">System Settings</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
