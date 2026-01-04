import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Star, CheckCircle2, ArrowLeft, ArrowUpRight, Zap, Users, Clock, Shield } from 'lucide-react';
import { getPackages } from '../api/packages';
import EnquiryForm from '../components/EnquiryForm';

const PackageDetail = () => {
    const { id } = useParams();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const data = await getPackages();
                if (Array.isArray(data)) {
                    const found = data.find(p => p.id == id);
                    setPkg(found);
                }
            } catch (err) {
                console.error("Failed to load package", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPackage();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-brand-primary border-t-brand-secondary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!pkg) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-primary text-white">
                <div className="text-center">
                    <h2 className="text-4xl font-black mb-4 tracking-tighter">Package Not Found</h2>
                    <Link to="/#destinations" className="text-brand-secondary hover:underline font-black uppercase text-xs tracking-widest">Back to Destinations</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Immersive Header */}
            <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img src={pkg.image_url} alt={pkg.destination} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80"></div>
                </div>

                <div className="section-container relative z-10 h-full flex flex-col justify-end pb-12 md:pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Link to="/" className="inline-flex items-center space-x-2 text-white/80 font-black uppercase tracking-[0.2em] text-[10px] mb-8 group hover:text-brand-secondary transition-colors">
                            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
                            <span>Explorer Collection</span>
                        </Link>

                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="glass-card px-4 py-2 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                                {pkg.badge || 'Premium Collection'}
                            </span>
                            <div className="flex items-center space-x-1.5 bg-brand-secondary px-4 py-2 rounded-full text-brand-primary">
                                <Star size={12} className="fill-brand-primary" />
                                <span className="text-[10px] font-black">{pkg.rating || '4.9'} Rating</span>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.8] mb-6 md:mb-10">
                            {pkg.destination}
                        </h1>

                        <div className="flex flex-wrap items-center gap-8 text-white/80">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                    <Clock size={18} />
                                </div>
                                <div>
                                    <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Duration</p>
                                    <p className="font-bold text-sm">{pkg.duration}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                    <Users size={18} />
                                </div>
                                <div>
                                    <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Group Size</p>
                                    <p className="font-bold text-sm">Max 12 People</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                    <Shield size={18} />
                                </div>
                                <div>
                                    <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Safety</p>
                                    <p className="font-bold text-sm">Verified Elite</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 md:py-32 bg-[#fcfcfc]">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
                        {/* Detail Content */}
                        <div className="lg:col-span-7 space-y-16">
                            <div className="space-y-8">
                                <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tighter">Unveil the extraordinary <br /> in {pkg.destination}.</h2>
                                <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-medium">
                                    Experience the pinnacle of luxury travel with our curated {pkg.destination} expedition. This isn't just a tour; it's a meticulously engineered saga of discovery, comfort, and elite access.
                                </p>
                                <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                                    From the moment you arrive, you will be immersed in an environment of total care. Our expert artisans have selected the finest accommodations, private transportation, and local guides who possess profound knowledge of the region's heritage and secrets.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    'Privileged Heritage Site Access',
                                    'Premium 5-Star Accommodations',
                                    'Private Luxury Transfers',
                                    'Curated Local Culinary Tours',
                                    'Expert Multilingual Guides',
                                    'Comprehensive Trip Insurance'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center space-x-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                                        <div className="w-8 h-8 rounded-full bg-brand-secondary/20 flex items-center justify-center group-hover:bg-brand-secondary transition-colors">
                                            <CheckCircle2 size={16} className="text-brand-primary" />
                                        </div>
                                        <span className="font-bold text-brand-primary text-sm tracking-tight">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="relative rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl aspect-video group">
                                <img src={pkg.image_url} alt="Gallery" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-10 left-10 p-4 md:p-10 glass-card rounded-[2.5rem] border border-white/20">
                                    <div className="flex items-center space-x-6">
                                        <div className="w-16 h-16 bg-brand-secondary rounded-3xl flex items-center justify-center text-brand-primary shadow-xl">
                                            <Zap size={32} />
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-black text-white tracking-tight">Rapid Securement</h4>
                                            <p className="text-white/60 text-xs font-black uppercase tracking-widest">Limited Availability for 2026</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Booking Sidebar */}
                        <div className="lg:col-span-5 lg:sticky lg:top-32">
                            <div className="bg-white p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] border border-gray-100 shadow-2xl space-y-10">
                                <div>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-4">Investment</p>
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-sm font-bold text-brand-primary">NPR</span>
                                        <span className="text-5xl md:text-7xl font-black text-brand-primary tracking-tighter">
                                            {Number(String(pkg.price).replace(/[^0-9.-]+/g, "")).toLocaleString()}
                                        </span>
                                        <span className="text-gray-400 font-bold uppercase text-[10px]">/ Per Person</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-4 bg-brand-secondary/10 rounded-2xl border border-brand-secondary/20 flex items-center space-x-4">
                                        <Calendar size={20} className="text-brand-primary" />
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary/60">Available Slots</p>
                                            <p className="font-bold text-brand-primary text-sm">March - October 2026</p>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <h3 className="text-2xl font-black text-brand-primary mb-3">Book Your Quest</h3>
                                        <p className="text-gray-500 font-medium text-sm leading-relaxed">
                                            Ready to transform your vision into reality? Send an enquiry and our heritage consultants will personalize your {pkg.destination} journey.
                                        </p>
                                    </div>

                                    <EnquiryForm inline={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PackageDetail;
