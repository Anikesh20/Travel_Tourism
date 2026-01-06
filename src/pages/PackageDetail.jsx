import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    Clock,
    MapPin,
    Users,
    Star,
    ShieldCheck,
    ArrowLeft,
    CheckCircle2,
    Plane,
    Hotel,
    Camera,
    Info,
    X
} from 'lucide-react';
import apiClient from '../api/client';
import { createBooking } from '../api/bookings';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PackageDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [packageData, setPackageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    // Form State
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        user_phone: '',
        booking_date: '',
        travelers: 1
    });

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const response = await apiClient.get(`/packages?id=${id}`);
                setPackageData(response.data);
            } catch (err) {
                setError("Package not found");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPackage();
        window.scrollTo(0, 0);
    }, [id]);

    const handleBooking = async (e) => {
        e.preventDefault();
        setBookingLoading(true);
        try {
            const bookingData = {
                ...formData,
                package_id: id,
                total_price: packageData.price
            };
            await createBooking(bookingData);
            setShowSuccess(true);
            setFormData({
                user_name: '',
                user_email: '',
                user_phone: '',
                booking_date: '',
                travelers: 1
            });
            setTimeout(() => setShowSuccess(false), 5000);
        } catch (err) {
            alert(err.message || "Failed to create booking");
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
            />
        </div>
    );

    if (error || !packageData) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
            <Info size={64} className="text-slate-300 mb-4" />
            <h2 className="text-3xl font-black text-slate-900 mb-2">Oops! Package not found</h2>
            <p className="text-slate-500 font-bold mb-8">The package you're looking for might have been moved or deleted.</p>
            <button
                onClick={() => navigate('/destinations')}
                className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold flex items-center"
            >
                <ArrowLeft size={18} className="mr-2" />
                Explore Other Destinations
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <img
                    src={packageData.image_url}
                    className="w-full h-full object-cover"
                    alt={packageData.destination}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap items-center gap-3 mb-4"
                        >
                            <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase">
                                {packageData.type}
                            </span>
                            {packageData.badge && (
                                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border border-white/20">
                                    {packageData.badge}
                                </span>
                            )}
                            <div className="flex items-center text-yellow-400 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                <Star size={14} fill="currentColor" className="mr-1" />
                                <span className="text-xs font-black">{packageData.rating}</span>
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-7xl font-black text-white mb-4 tracking-tight"
                        >
                            {packageData.destination}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap items-center gap-6 text-white/80 font-bold"
                        >
                            <div className="flex items-center">
                                <Clock size={20} className="mr-2 text-blue-400" />
                                {packageData.duration}
                            </div>
                            <div className="flex items-center">
                                <MapPin size={20} className="mr-2 text-rose-400" />
                                Premium Route
                            </div>
                            <div className="flex items-center">
                                <ShieldCheck size={20} className="mr-2 text-emerald-400" />
                                Safe & Verified
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Tabs Navigation */}
                        <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar mb-8">
                            {[
                                { id: 'overview', label: 'Overview' },
                                { id: 'itinerary', label: 'Itinerary' },
                                { id: 'included', label: 'Included & Excluded' },
                                { id: 'visa', label: 'Visa & Documents' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-8 py-4 text-sm font-black uppercase tracking-widest whitespace-nowrap transition-all relative ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                >
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === 'overview' && (
                                    <section className="animate-in fade-in duration-500">
                                        <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight flex items-center">
                                            <span className="w-1.5 h-8 bg-blue-600 rounded-full mr-4" />
                                            Trip Overview
                                        </h2>
                                        <p className="text-slate-600 text-lg leading-relaxed font-semibold whitespace-pre-line">
                                            {packageData.description || `Experience the breathtaking beauty of ${packageData.destination}. This tour is designed for travelers who seek both comfort and excitement.`}
                                        </p>
                                    </section>
                                )}

                                {activeTab === 'itinerary' && (
                                    <section>
                                        <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight flex items-center">
                                            <span className="w-1.5 h-8 bg-indigo-600 rounded-full mr-4" />
                                            Day by Day Plan
                                        </h2>
                                        <div className="space-y-8">
                                            {packageData.itinerary ? JSON.parse(packageData.itinerary).map((item, idx) => (
                                                <div key={idx} className="flex gap-6 group">
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-sm shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform">
                                                            D{item.day}
                                                        </div>
                                                        <div className="w-0.5 h-full bg-slate-100 my-2" />
                                                    </div>
                                                    <div className="flex-1 pb-8">
                                                        <h3 className="text-xl font-black text-slate-900 mb-2">{item.title}</h3>
                                                        <p className="text-slate-500 font-bold leading-relaxed">{item.description}</p>
                                                    </div>
                                                </div>
                                            )) : (
                                                <p className="text-slate-400 font-bold italic">Itinerary details coming soon...</p>
                                            )}
                                        </div>
                                    </section>
                                )}

                                {activeTab === 'included' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-emerald-50/50 p-8 rounded-[2.5rem] border border-emerald-100">
                                            <h3 className="text-xl font-black text-emerald-900 mb-6 flex items-center">
                                                <CheckCircle2 className="mr-3 text-emerald-600" />
                                                What's Included
                                            </h3>
                                            <ul className="space-y-4">
                                                {packageData.included ? JSON.parse(packageData.included).map((item, idx) => (
                                                    <li key={idx} className="flex items-start text-emerald-800 font-bold text-sm">
                                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                                                        {item}
                                                    </li>
                                                )) : (
                                                    <li className="text-emerald-400/60 font-medium italic">Standard inclusions apply...</li>
                                                )}
                                            </ul>
                                        </div>
                                        <div className="bg-rose-50/50 p-8 rounded-[2.5rem] border border-rose-100">
                                            <h3 className="text-xl font-black text-rose-900 mb-6 flex items-center">
                                                <X className="mr-3 text-rose-600" />
                                                What's Excluded
                                            </h3>
                                            <ul className="space-y-4">
                                                {packageData.excluded ? JSON.parse(packageData.excluded).map((item, idx) => (
                                                    <li key={idx} className="flex items-start text-rose-800 font-bold text-sm">
                                                        <div className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                                                        {item}
                                                    </li>
                                                )) : (
                                                    <li className="text-rose-400/60 font-medium italic">No specific exclusions listed...</li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'visa' && (
                                    <section>
                                        <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight flex items-center">
                                            <span className="w-1.5 h-8 bg-amber-500 rounded-full mr-4" />
                                            Visa & Documents
                                        </h2>
                                        <div className="bg-amber-50 rounded-[2.5rem] p-8 border border-amber-100">
                                            <p className="text-amber-900/80 text-lg leading-relaxed font-semibold whitespace-pre-line">
                                                {packageData.visa_requirements || "Please contact our office for the latest visa and document requirements for this destination. Generally, a passport valid for at least 6 months is required."}
                                            </p>
                                        </div>
                                    </section>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Column: Booking Form */}
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="sticky top-28 bg-white p-8 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100"
                        >
                            <div className="mb-8">
                                <p className="text-slate-500 font-bold mb-1">Starting from</p>
                                <h3 className="text-4xl font-black text-slate-900 tracking-tight">
                                    {packageData.price}
                                    <span className="text-sm text-slate-400 font-bold ml-2 italic">/ person</span>
                                </h3>
                            </div>

                            <form onSubmit={handleBooking} className="space-y-4">
                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-4 focus:ring-blue-600/5 transition-all"
                                        placeholder="John Doe"
                                        value={formData.user_name}
                                        onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-4 focus:ring-blue-600/5 transition-all"
                                        placeholder="john@example.com"
                                        value={formData.user_email}
                                        onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-4 focus:ring-blue-600/5 transition-all"
                                        placeholder="+977 98XXXXXXXX"
                                        value={formData.user_phone}
                                        onChange={(e) => setFormData({ ...formData, user_phone: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Travel Date</label>
                                        <input
                                            type="date"
                                            required
                                            className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 font-bold text-slate-900 focus:ring-4 focus:ring-blue-600/5 transition-all"
                                            value={formData.booking_date}
                                            onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Travelers</label>
                                        <input
                                            type="number"
                                            min="1"
                                            required
                                            className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-4 focus:ring-blue-600/5 transition-all"
                                            value={formData.travelers}
                                            onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={bookingLoading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-[1.5rem] font-black text-lg shadow-xl shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-70"
                                >
                                    {bookingLoading ? 'Processing...' : 'Reserve Securely'}
                                </button>

                                <div className="flex items-center justify-center text-slate-400 font-bold text-xs pt-4">
                                    <ShieldCheck size={16} className="mr-2 text-emerald-500" />
                                    No immediate payment required
                                </div>
                            </form>

                            {/* Success Notification */}
                            <AnimatePresence>
                                {showSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                        className="absolute inset-0 bg-white/95 backdrop-blur-md rounded-[3rem] p-8 flex flex-col items-center justify-center text-center z-10"
                                    >
                                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-6">
                                            <CheckCircle2 size={48} />
                                        </div>
                                        <h4 className="text-2xl font-black text-slate-900 mb-2">Booking Requested!</h4>
                                        <p className="text-slate-500 font-bold">We will contact you within 24 hours to confirm your trip details.</p>
                                        <button
                                            onClick={() => setShowSuccess(false)}
                                            className="mt-8 text-blue-600 font-black tracking-widest uppercase text-xs hover:underline"
                                        >
                                            Dismiss
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PackageDetail;
