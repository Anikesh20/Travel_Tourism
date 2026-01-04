import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, Headphones, Star } from 'lucide-react';

const reasons = [
    {
        icon: <Award className="w-10 h-10" />,
        title: 'Elite Pricing',
        desc: 'Exclusive access to the best rates in the luxury market, guaranteed.',
    },
    {
        icon: <Users className="w-10 h-10" />,
        title: 'Expert Curation',
        desc: 'Our travel artisans craft journeys that resonate with your soul.',
    },
    {
        icon: <Headphones className="w-10 h-10" />,
        title: 'Concierge Care',
        desc: 'Unwavering support available 24/7, anywhere in the world.',
    },
    {
        icon: <Star className="w-10 h-10" />,
        title: 'Elite Access',
        desc: 'Hidden gems and privileged experiences reserved only for you.',
    },
];

const WhyChooseUs = () => {
    return (
        <section className="py-20 md:py-32 bg-[#050505] text-white overflow-hidden relative">
            {/* Background Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-brand-primary/20 rounded-full blur-[60px] md:blur-[120px] pointer-events-none"></div>

            <div className="section-container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-brand-secondary font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Our Distinction</span>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-8 md:mb-10 tracking-tighter leading-[0.9]">
                            Beyond the <br /> <span className="text-brand-secondary">Ordinary</span>
                        </h2>
                        <p className="text-gray-400 text-base md:text-lg mb-8 md:mb-12 max-w-lg leading-relaxed font-medium">
                            We don't just plan trips; we curate legacies. Experience a level of personalization that redefines the meaning of travel.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-12">
                            {['Ultra-Luxury Stays', 'Private Transfers', 'Expert Guides', 'VIP Fast-track'].map((item, i) => (
                                <div key={i} className="flex items-center space-x-3 group">
                                    <div className="flex-shrink-0 w-5 h-5 bg-brand-secondary/20 rounded-full flex items-center justify-center group-hover:bg-brand-secondary transition-colors duration-300">
                                        <CheckCircle2 size={12} className="text-brand-secondary group-hover:text-brand-primary" />
                                    </div>
                                    <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-300 group-hover:text-white transition-colors">{item}</span>
                                </div>
                            ))}
                        </div>

                        <button className="w-full sm:w-auto px-10 py-5 bg-brand-secondary text-brand-primary rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all transform hover:-translate-y-1 active:scale-95">
                            Discover the Difference
                        </button>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 mt-12 lg:mt-0 px-2 sm:px-0">
                        {reasons.map((reason, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="group p-5 sm:p-8 md:p-10 bg-white/5 backdrop-blur-xl rounded-[1.5rem] sm:rounded-[2.5rem] md:rounded-[3rem] border border-white/10 hover:border-brand-secondary/50 transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.08]"
                            >
                                <div className="text-brand-secondary mb-4 sm:mb-6 md:mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                                    {React.cloneElement(reason.icon, { className: "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" })}
                                </div>
                                <h4 className="text-sm sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 tracking-tight">{reason.title}</h4>
                                <p className="text-gray-500 leading-relaxed text-[10px] sm:text-xs md:text-sm font-medium group-hover:text-gray-300 transition-colors">
                                    {reason.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;

