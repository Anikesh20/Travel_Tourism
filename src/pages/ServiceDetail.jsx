import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import { CheckCircle2, ArrowLeft, ArrowRight, Star, Zap } from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm';

const ServiceDetail = () => {
    const { id } = useParams();
    const service = servicesData ? servicesData[id] : null;

    if (!service || !service.features) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-primary text-white">
                <div className="text-center">
                    <h2 className="text-4xl font-black mb-4">Service Not Found</h2>
                    <Link to="/services" className="text-brand-secondary hover:underline">Back to Services</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Header / Hero */}
            <section className="relative h-[40vh] md:h-[60vh] overflow-hidden bg-brand-primary">
                <div className="absolute inset-0">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-70" />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/60 via-transparent to-white"></div>
                </div>

                <div className="section-container relative z-10 h-full flex flex-col justify-end pb-12 md:pb-24">
                    <Link to="/services" className="flex items-center space-x-2 text-brand-secondary font-black uppercase tracking-[0.2em] text-[10px] mb-8 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
                        <span>All Services</span>
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl lg:text-8xl font-black text-brand-primary tracking-tighter leading-[0.9]"
                    >
                        {service.title}
                    </motion.h1>
                    <p className="text-brand-secondary font-black uppercase tracking-[0.3em] text-xs md:text-sm mt-4">{service.subtitle}</p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        {/* Left Side: Info */}
                        <div className="lg:col-span-7 space-y-12">
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tight">Earning Your Trust Through Discovery.</h2>
                                <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-medium">
                                    {service.longDesc}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {service.features.map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center space-x-4 p-5 bg-[#f9f9f9] rounded-2xl border border-gray-100 shadow-sm"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-brand-secondary/20 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 size={14} className="text-brand-primary" />
                                        </div>
                                        <span className="text-brand-primary font-bold text-sm tracking-tight">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl aspect-video">
                                <img src={service.image} alt="Feature" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6 p-4 md:p-8 glass-card rounded-2xl border border-white/20">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-brand-secondary rounded-2xl flex items-center justify-center text-brand-primary">
                                            <Zap size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-white/60 font-black uppercase tracking-widest">Global Status</p>
                                            <p className="text-xl text-white font-black tracking-tight tracking-tight">Active Coverage</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="lg:col-span-5 lg:sticky lg:top-32">
                            <div className="bg-[#fcfcfc] p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-gray-100 shadow-xl">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-black text-brand-primary mb-2">Initiate Inquiry</h3>
                                    <p className="text-gray-500 font-medium text-sm">Send us a message regarding {service.title} and our artisans will reach out shortly.</p>
                                </div>
                                <EnquiryForm inline={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetail;
