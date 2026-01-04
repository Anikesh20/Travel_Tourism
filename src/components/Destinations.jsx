import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Star, Calendar, ArrowUpRight, Bookmark } from 'lucide-react';
import { getPackages } from '../api/packages';

const Destinations = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getPackages();
                setPackages(data);
            } catch (err) {
                console.error("Failed to load packages", err);
            }
        };
        fetch();
    }, []);

    return (
        <section id="destinations" className="py-20 md:py-32 bg-[#fafafa]">
            <div className="section-container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
                    <div className="max-w-xl">
                        <span className="text-brand-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Our Collection</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-primary tracking-tight">
                            The World's Most <br /> <span className="text-brand-secondary">Special Places</span>
                        </h2>
                    </div>
                </div>

                <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 pb-8 md:pb-0 snap-x snap-mandatory no-scrollbar px-4 md:px-0">
                    {packages.map((item, index) => (
                        <Link to={`/package/${item.id}`} key={item.id} className="flex-shrink-0 w-[240px] sm:w-[320px] md:w-auto snap-center group">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="relative bg-white rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 h-full"
                            >
                                {/* Image Container */}
                                <div className="relative h-[200px] sm:h-[320px] md:h-[380px] overflow-hidden">
                                    <img
                                        src={item.image_url}
                                        alt={item.destination}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                                    {/* Badge */}
                                    <div className="absolute top-3 left-3 md:top-6 md:left-6">
                                        <span className="glass-card px-2 py-1 md:px-4 md:py-2 rounded-full text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest">
                                            {item.badge || 'Trending'}
                                        </span>
                                    </div>

                                    {/* Hover Stats */}
                                    <div className="absolute bottom-4 left-4 right-4 translate-y-2 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 opacity-100">
                                        <div className="flex items-center justify-between text-white">
                                            <div className="flex items-center space-x-2">
                                                <div className="hidden sm:flex -space-x-2">
                                                    {[1, 2, 3].map(i => (
                                                        <div key={i} className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-brand-primary bg-gray-200 overflow-hidden">
                                                            <img src={`https://i.pravatar.cc/100?u=${i + index}`} alt="user" />
                                                        </div>
                                                    ))}
                                                </div>
                                                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-tighter opacity-80 sm:opacity-100">+120 Joined</span>
                                            </div>
                                            <div className="flex items-center space-x-1 glass-card px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-full">
                                                <Star size={8} className="text-yellow-400 fill-yellow-400 md:w-3 md:h-3" />
                                                <span className="text-[8px] md:text-[10px] font-bold">{item.rating || '4.9'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 md:p-8">
                                    <div className="flex items-center text-brand-secondary text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-2 md:mb-3">
                                        <MapPin size={8} className="mr-1.5 md:w-3 md:h-3" />
                                        <span>{item.type} • {item.duration}</span>
                                    </div>

                                    <h4 className="text-base md:text-2xl font-bold text-brand-dark mb-3 md:mb-6 group-hover:text-brand-primary transition-colors line-clamp-1">
                                        {item.destination}
                                    </h4>

                                    <div className="pt-3 md:pt-6 border-t border-gray-100 flex justify-between items-center">
                                        <div>
                                            <p className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-0.5 md:mb-1">Starting from</p>
                                            <p className="text-base md:text-2xl font-black text-brand-primary">
                                                <span className="text-[10px] md:text-sm font-medium mr-1 tracking-normal">NPR</span>
                                                {Number(item.price).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-brand-accent flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 group-hover:rotate-[360deg]">
                                            <ArrowUpRight size={16} className="md:w-6 md:h-6" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Destinations;

