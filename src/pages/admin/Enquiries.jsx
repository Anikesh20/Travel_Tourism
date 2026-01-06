import React, { useState, useEffect } from 'react';
import { enquiryService } from '../../services/api';
import { Mail, Phone, Calendar, MessageSquare, Trash2, CheckCircle, Clock2, MoreHorizontal, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Toast from '../../components/admin/Toast';

const AdminEnquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

    const loadEnquiries = async () => {
        setLoading(true);
        try {
            const response = await enquiryService.getAll();
            if (response.status === 'success') {
                setEnquiries(response.data);
            }
        } catch (err) {
            console.error('Failed to fetch enquiries:', err);
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
    };

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, show: false }));
    };

    useEffect(() => {
        loadEnquiries();
    }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await enquiryService.updateStatus(id, newStatus);
            showNotification(`Enquiry marked as ${newStatus}`, "success");
            loadEnquiries();
        } catch (err) {
            showNotification(err.message || "Failed to update status", "error");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
        try {
            await enquiryService.delete(id);
            showNotification("Enquiry deleted successfully", "success");
            loadEnquiries();
        } catch (err) {
            showNotification(err.message || "Failed to delete enquiry", "error");
        }
    };

    const filteredEnquiries = enquiries.filter(enq => {
        if (filter === 'all') return true;
        return enq.status === filter;
    });

    const getStatusStyle = (status) => {
        switch (status) {
            case 'new': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'read': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'responded': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="p-8 relative">
            <Toast
                show={notification.show}
                message={notification.message}
                type={notification.type}
                onClose={handleCloseNotification}
            />
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-4xl font-black text-brand-primary tracking-tighter mb-2">Guest Enquiries</h1>
                    <p className="text-gray-500 font-medium">Manage and respond to your visitor's travel requests.</p>
                </div>

                <div className="flex bg-gray-100 p-1 rounded-2xl">
                    {['all', 'new', 'read', 'responded'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === type
                                ? 'bg-white text-brand-primary shadow-sm'
                                : 'text-gray-500 hover:text-brand-primary'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    <AnimatePresence>
                        {filteredEnquiries.map((enq) => (
                            <motion.div
                                key={enq.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start md:items-center hover:shadow-xl transition-all group"
                            >
                                {/* Left: User Info */}
                                <div className="flex items-center space-x-5 w-full md:w-1/4">
                                    <div className="w-16 h-16 bg-brand-accent rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <User className="text-brand-primary" size={28} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <h3 className="text-xl font-black text-brand-primary tracking-tight truncate">{enq.name}</h3>
                                        <div className={`mt-1 inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(enq.status)}`}>
                                            {enq.status}
                                        </div>
                                    </div>
                                </div>

                                {/* Center: Details */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow w-full md:w-auto">
                                    <div className="flex items-center space-x-3 text-gray-500">
                                        <Phone size={18} className="text-brand-secondary" />
                                        <span className="text-sm font-bold">{enq.phone}</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-gray-500">
                                        <Mail size={18} className="text-brand-secondary" />
                                        <span className="text-sm font-bold truncate">{enq.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-gray-500">
                                        <Calendar size={18} className="text-brand-secondary" />
                                        <span className="text-sm font-bold">{enq.date || 'TBD'}</span>
                                    </div>
                                </div>

                                {/* Message Tooltip/Preview */}
                                <div className="relative group/msg w-full md:w-1/4">
                                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 italic text-gray-500 text-sm line-clamp-2">
                                        "{enq.message}"
                                    </div>
                                    {/* Full message on hover could be added here */}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
                                    {enq.status === 'new' && (
                                        <button
                                            onClick={() => handleStatusUpdate(enq.id, 'read')}
                                            className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                            title="Mark as Read"
                                        >
                                            <Clock2 size={20} />
                                        </button>
                                    )}
                                    {enq.status !== 'responded' && (
                                        <button
                                            onClick={() => handleStatusUpdate(enq.id, 'responded')}
                                            className="p-3 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
                                            title="Mark as Responded"
                                        >
                                            <CheckCircle size={20} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(enq.id)}
                                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors ml-4"
                                        title="Delete"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredEnquiries.length === 0 && (
                        <div className="py-20 text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <MessageSquare className="text-gray-300" size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-400">No enquiries found</h3>
                            <p className="text-gray-400">Everything is up to date.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminEnquiries;
