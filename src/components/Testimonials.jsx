import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowRight, Loader2 } from 'lucide-react';
import { getTestimonials } from '../api/testimonials';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getTestimonials();
                setTestimonials(data);
            } catch (err) {
                console.error("Failed to fetch testimonials", err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    if (loading) {
        return (
            <div className="py-20 flex justify-center items-center">
                <Loader2 className="animate-spin text-brand-primary" size={40} />
            </div>
        );
    }

    if (testimonials.length === 0) return null;
    return (
        <section className="py-20 md:py-32 bg-white overflow-hidden">
            <div className="section-container">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 md:mb-20 gap-8">
                    <div className="max-w-xl">
                        <span className="text-brand-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Voices of Experience</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-primary tracking-tighter leading-[1.1]">
                            What Our <br /> <span className="text-brand-secondary">Travelers Say</span>
                        </h2>
                    </div>
                    <div className="flex items-center space-x-3 bg-brand-accent/30 px-4 md:px-6 py-2 md:py-3 rounded-2xl border border-brand-accent/50 self-start md:self-end">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <img key={i} src={`https://i.pravatar.cc/100?u=${i + 10}`} className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white" alt="user" />
                            ))}
                        </div>
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-brand-primary">2,500+ Happy Clients</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group relative p-8 md:p-12 bg-[#fcfcfc] rounded-[2.5rem] md:rounded-[3.5rem] border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="absolute top-8 right-8 md:top-10 md:right-12 text-brand-secondary/10 group-hover:text-brand-secondary/20 transition-colors">
                                <Quote size={48} className="md:w-16 md:h-16" fill="currentColor" />
                            </div>

                            <div className="flex mb-6 md:mb-8 space-x-1">
                                {[...Array(Number(t.rating) || 5)].map((_, i) => (
                                    <Star key={i} size={14} className="text-brand-secondary fill-brand-secondary md:w-4 md:h-4" />
                                ))}
                            </div>

                            <p className="text-gray-600 text-base md:text-lg mb-8 md:mb-10 font-medium leading-relaxed italic relative z-10">
                                "{t.content}"
                            </p>

                            <div className="flex items-center space-x-4 md:space-x-5 pt-6 md:pt-8 border-t border-gray-100">
                                <img
                                    src={t.avatar}
                                    alt={t.name}
                                    className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl object-cover border-2 border-white shadow-lg"
                                />
                                <div>
                                    <h4 className="font-black text-xs md:text-base text-brand-dark uppercase tracking-tight">{t.name}</h4>
                                    <p className="text-brand-secondary text-[8px] md:text-[10px] font-black uppercase tracking-widest">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button className="inline-flex items-center space-x-4 group">
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary">View More Stories</span>
                        <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all">
                            <ArrowRight size={20} />
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

