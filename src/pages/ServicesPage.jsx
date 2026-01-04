import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import Services from '../components/Services';

const ServicesPage = () => {
    return (
        <div className="min-h-screen">
            {/* Precision Hero */}
            <section className="relative py-32 md:py-56 overflow-hidden bg-brand-primary">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/90 via-transparent to-brand-primary/40"></div>
                </div>

                <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-brand-secondary/10 rounded-full blur-[60px] md:blur-[120px] -mr-24 -mt-24 md:-mr-48 md:-mt-48 z-0"></div>

                <div className="section-container relative z-10 text-center lg:text-left">
                    <div className="max-w-3xl mx-auto lg:mx-0">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-brand-secondary font-black tracking-[0.4em] uppercase text-[10px] md:text-xs mb-4 md:mb-6 block"
                        >
                            Our Expertise
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-tight"
                        >
                            The Science of <br /> <span className="text-brand-secondary italic">Perfect Travel.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-base md:text-xl text-gray-400 font-medium leading-relaxed px-4 md:px-0"
                        >
                            We provide a sophisticated layer of logistics and curation that transforms simple travel into an art form.
                        </motion.p>
                    </div>
                </div>
            </section>

            <Services />

            {/* Strategic Call to Action */}
            <section className="py-20 md:py-40 bg-white border-t border-gray-100">
                <div className="section-container">
                    <div className="bg-[#0a0a0a] rounded-[2.5rem] md:rounded-[5rem] p-10 md:p-32 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(218,192,163,0.15),transparent)]"></div>

                        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-0">
                            <ShieldCheck className="w-12 h-12 md:w-16 md:h-16 text-brand-secondary mx-auto mb-6 md:mb-10" />
                            <h3 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-6 md:mb-10 tracking-tighter leading-tight">
                                Ready for a <br /> <span className="text-brand-secondary italic">Superior</span> Journey?
                            </h3>
                            <p className="text-gray-400 text-base md:text-xl mb-10 md:mb-16 font-medium leading-relaxed max-w-2xl mx-auto">
                                Join the elite group of travelers who demand more from their experiences. Your precision-crafted adventure is just a consultation away.
                            </p>
                            <button className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-6 bg-brand-secondary text-brand-primary rounded-xl md:rounded-[2rem] text-[10px] md:text-sm font-black uppercase tracking-[0.3em] hover:bg-white transition-all transform hover:-translate-y-2 active:scale-95 shadow-2xl">
                                Secure Your Consultation
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
