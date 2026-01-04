import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Plane, ShieldCheck, Clock } from 'lucide-react';
import heroImage from '../assets/hero-bg.png';

const Hero = () => {
    return (
        <div className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroImage}
                    alt="Beautiful Travel Destination"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/80 to-transparent"></div>
            </div>

            <div className="section-container relative z-10 w-full mt-16">
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-white uppercase bg-brand-secondary/30 backdrop-blur-md rounded-full border border-brand-secondary/40">
                            Explore the World with Trust
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
                            Affordable <span className="text-brand-secondary">Air Tickets</span> & Tours Worldwide
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-lg">
                            Your one-stop destination for hassle-free travel planning. From dream vacations to quick business trips, we've got you covered.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <button className="btn-primary py-4 px-8 flex items-center justify-center space-x-2">
                                <span>Book Now</span>
                                <ArrowRight size={20} />
                            </button>
                            <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-semibold transition-all hover:bg-white/20">
                                Get Free Quote
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                            <div className="text-white">
                                <div className="flex items-center space-x-2 text-brand-secondary mb-1">
                                    <Plane size={18} />
                                    <span className="font-bold">500+</span>
                                </div>
                                <p className="text-xs text-gray-400 uppercase tracking-widest">Happy Clients</p>
                            </div>
                            <div className="text-white">
                                <div className="flex items-center space-x-2 text-brand-secondary mb-1">
                                    <ShieldCheck size={18} />
                                    <span className="font-bold">100%</span>
                                </div>
                                <p className="text-xs text-gray-400 uppercase tracking-widest">Secure Booking</p>
                            </div>
                            <div className="text-white">
                                <div className="flex items-center space-x-2 text-brand-secondary mb-1">
                                    <Clock size={18} />
                                    <span className="font-bold">24/7</span>
                                </div>
                                <p className="text-xs text-gray-400 uppercase tracking-widest">Customer Support</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-white rounded-full"></div>
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
