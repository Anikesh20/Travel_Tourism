import React, { useState, useEffect } from 'react';
import {
    getBookings,
    updateBookingStatus,
    deleteBooking
} from '../../api/bookings';
import {
    Calendar,
    User,
    Mail,
    Phone,
    Package as PackageIcon,
    Trash2,
    Search,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Users,
    ChevronDown,
    Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Toast from '../../components/admin/Toast';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        try {
            const data = await getBookings();
            setBookings(data);
        } catch (err) {
            console.error(err);
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

    const handleStatusChange = async (id, status) => {
        try {
            await updateBookingStatus(id, status);
            showNotification(`Booking status updated to ${status}`, "success");
            loadBookings();
        } catch (err) {
            showNotification(err.message || "Failed to update status", "error");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this booking record?")) return;
        try {
            await deleteBooking(id);
            showNotification("Booking record deleted", "success");
            loadBookings();
        } catch (err) {
            showNotification(err.message || "Failed to delete booking", "error");
        }
    };

    const filteredBookings = Array.isArray(bookings) ? bookings.filter(b => {
        const matchesSearch =
            (b.user_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (b.package_name || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || b.status === filter;
        return matchesSearch && matchesFilter;
    }) : [];

    const getStatusStyles = (status) => {
        switch (status) {
            case 'confirmed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
            default: return 'bg-amber-50 text-amber-600 border-amber-100';
        }
    };

    return (
        <div className="pb-20 relative">
            <Toast
                show={notification.show}
                message={notification.message}
                type={notification.type}
                onClose={handleCloseNotification}
            />
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Booking Handler</h2>
                    <p className="text-slate-600 font-bold mt-1">Efficiently manage traveler reservations.</p>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search traveler or package..."
                            className="bg-white border border-slate-200 pl-12 pr-6 py-3 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-600/5 font-bold text-sm w-72 shadow-sm transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-2 mb-8 bg-slate-100 p-1.5 rounded-2xl w-fit">
                {['all', 'pending', 'confirmed', 'cancelled'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="h-64 flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
                    />
                </div>
            ) : filteredBookings.length === 0 ? (
                <div className="bg-white p-20 rounded-[3rem] text-center border border-slate-100 shadow-sm">
                    <AlertCircle size={64} className="mx-auto text-slate-200 mb-6" />
                    <h3 className="text-2xl font-black text-slate-900">No records found</h3>
                    <p className="text-slate-500 font-bold max-w-xs mx-auto">Try adjusting your filters or search term to find what you're looking for.</p>
                </div>
            ) : (
                <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-5 text-left text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Traveler</th>
                                    <th className="px-8 py-5 text-left text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Package Info</th>
                                    <th className="px-8 py-5 text-left text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Contact</th>
                                    <th className="px-8 py-5 text-left text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                    <th className="px-8 py-5 text-right text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredBookings.map((booking) => (
                                    <motion.tr
                                        layout
                                        key={booking.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="group hover:bg-slate-50/50 transition-colors"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                                                    {booking.user_name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 leading-none mb-1">{booking.user_name}</p>
                                                    <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                                        <Calendar size={10} className="mr-1" />
                                                        Booked: {new Date(booking.created_at).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <p className="font-bold text-slate-800 text-sm mb-1 flex items-center">
                                                    <PackageIcon size={14} className="mr-2 text-blue-500" />
                                                    {booking.package_name}
                                                </p>
                                                <div className="flex items-center space-x-3 text-xs text-slate-500 font-bold">
                                                    <span className="flex items-center">
                                                        <Users size={12} className="mr-1 text-slate-400" />
                                                        {booking.travelers} Persons
                                                    </span>
                                                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                                    <span className="text-blue-600">Travel Date: {booking.booking_date}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="space-y-1">
                                                <div className="flex items-center text-xs font-bold text-slate-600">
                                                    <Mail size={12} className="mr-2 text-slate-400" />
                                                    {booking.user_email}
                                                </div>
                                                <div className="flex items-center text-xs font-bold text-slate-600">
                                                    <Phone size={12} className="mr-2 text-slate-400" />
                                                    {booking.user_phone || "No phone"}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <div className="flex border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                                                    {booking.status !== 'confirmed' && (
                                                        <button
                                                            onClick={() => handleStatusChange(booking.id, 'confirmed')}
                                                            title="Confirm Booking"
                                                            className="p-2.5 bg-white hover:bg-emerald-50 text-emerald-600 transition-colors border-r border-slate-100"
                                                        >
                                                            <CheckCircle2 size={18} />
                                                        </button>
                                                    )}
                                                    {booking.status !== 'cancelled' && (
                                                        <button
                                                            onClick={() => handleStatusChange(booking.id, 'cancelled')}
                                                            title="Cancel Booking"
                                                            className="p-2.5 bg-white hover:bg-rose-50 text-rose-600 transition-colors border-r border-slate-100"
                                                        >
                                                            <XCircle size={18} />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(booking.id)}
                                                        title="Delete Record"
                                                        className="p-2.5 bg-white hover:bg-slate-900 hover:text-white text-slate-400 transition-all font-bold"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBookings;
