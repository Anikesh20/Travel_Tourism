import React, { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    Mail,
    Phone,
    Calendar,
    MapPin,
    Eye,
    Trash2,
    CheckCircle,
    Clock,
    XCircle
} from 'lucide-react';
import { enquiriesService } from '../../services/api';

const Enquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        try {
            const response = await enquiriesService.getAll();
            if (response.success) {
                setEnquiries(response.data);
            }
        } catch (error) {
            console.error('Error fetching enquiries:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'confirmed': return <CheckCircle size={16} className="text-emerald-500" />;
            case 'pending': return <Clock size={16} className="text-orange-500" />;
            case 'cancelled': return <XCircle size={16} className="text-red-500" />;
            default: return <Clock size={16} className="text-blue-500" />;
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            confirmed: 'bg-emerald-50 text-emerald-600 border-emerald-200',
            pending: 'bg-orange-50 text-orange-600 border-orange-200',
            cancelled: 'bg-red-50 text-red-600 border-red-200',
            default: 'bg-blue-50 text-blue-600 border-blue-200'
        };

        return styles[status] || styles.default;
    };

    const filteredEnquiries = enquiries.filter(enquiry => {
        const matchesSearch = enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            enquiry.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || enquiry.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-brand-dark">Enquiries</h1>
                    <p className="text-gray-500 mt-1">Manage customer enquiries and requests</p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-bold">
                        {filteredEnquiries.length} Total
                    </span>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 ring-brand-primary/20 focus:border-brand-primary transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <Filter size={20} className="text-gray-400" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 ring-brand-primary/20 focus:border-brand-primary transition-all font-medium"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Enquiries List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50/80 border-b border-gray-100">
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Destination</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredEnquiries.length > 0 ? filteredEnquiries.map((enquiry) => (
                                <tr key={enquiry.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-dark flex items-center justify-center text-white font-bold text-sm">
                                                {enquiry.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-bold text-brand-dark">{enquiry.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <Mail size={14} className="text-gray-400" />
                                                <span>{enquiry.email}</span>
                                            </div>
                                            {enquiry.phone && (
                                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                    <Phone size={14} className="text-gray-400" />
                                                    <span>{enquiry.phone}</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <MapPin size={16} className="text-brand-primary" />
                                            <span className="font-medium text-gray-700">
                                                {enquiry.destination || 'General Enquiry'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <Calendar size={14} className="text-gray-400" />
                                            <span>{new Date(enquiry.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusBadge(enquiry.status)}`}>
                                            {getStatusIcon(enquiry.status)}
                                            <span className="uppercase">{enquiry.status}</span>
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <button className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors">
                                                <Eye size={18} />
                                            </button>
                                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center space-y-3">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                <Mail size={32} className="text-gray-400" />
                                            </div>
                                            <p className="text-gray-500 font-medium">No enquiries found</p>
                                            <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Enquiries;
