import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Award, MapPin, Globe, Shield, Sparkles } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen">
            {/* Cinematic Page Header */}
            <section className="relative py-24 md:py-48 overflow-hidden bg-black">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        className="w-full h-full object-cover opacity-60"
                        alt="Mountain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black"></div>
                </div>

                <div className="section-container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-brand-secondary font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">The TravelQuest Story</span>
                        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-[0.8]">
                            Crafting <br /> <span className="text-brand-secondary italic">Legacies.</span>
                        </h1>
                        <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed px-4">
                            We don't just guide travelers; we curate profound connections between souls and the world's most breathtaking landscapes.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Heritage Section */}
            <section className="py-20 md:py-32 overflow-hidden">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                        <div className="lg:col-span-5 relative px-4 lg:px-0">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, x: -30 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative z-10"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90"
                                    alt="Our Team"
                                    className="rounded-[2.5rem] md:rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.15)] aspect-[4/5] object-cover"
                                />
                                <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-brand-secondary p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl text-brand-primary max-w-[200px] md:max-w-[280px] transform hover:rotate-2 transition-transform duration-500">
                                    <Sparkles className="mb-2 md:mb-4 w-6 h-6 md:w-8 md:h-8 opacity-50" />
                                    <p className="text-4xl md:text-6xl font-black mb-1 tracking-tighter">5+</p>
                                    <p className="font-black uppercase tracking-widest text-[8px] md:text-[10px] leading-tight opacity-70">Years of redefining travel excellence since 2018</p>
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-7 space-y-8 md:space-y-12 px-4 lg:px-0 mt-12 lg:mt-0 text-center lg:text-left">
                            <div className="space-y-4 md:space-y-6">
                                <span className="text-brand-secondary font-black tracking-[0.3em] uppercase text-xs">Our Heritage</span>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-primary tracking-tighter leading-[1.1]">
                                    A Legacy of <br /> Trusted Exploration
                                </h2>
                            </div>

                            <div className="space-y-6 md:space-y-8 text-gray-600 text-base md:text-lg font-medium leading-relaxed">
                                <p>
                                    Founded in the heart of the Himalayas, TravelQuest emerged from a single, powerful conviction: that travel should be more than a destination—it should be a transformation.
                                </p>
                                <p>
                                    As fully government-registered pioneers and proud members of IATA, we've spent the last half-decade building an ecosystem of trust, luxury, and unparalleled local expertise.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-4 md:pt-8 text-left">
                                <div className="p-6 md:p-10 bg-[#f9f9f9] rounded-[2rem] md:rounded-[3rem] border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-500 group">
                                    <Shield className="text-brand-secondary mb-3 md:mb-6 w-5 h-5 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
                                    <h4 className="font-black text-brand-primary uppercase tracking-tight mb-1 text-[10px] md:text-base">Govt. Regd.</h4>
                                    <p className="text-[8px] md:text-xs font-bold text-gray-400">LICENSE: 123456</p>
                                </div>
                                <div className="p-6 md:p-10 bg-[#f9f9f9] rounded-[2rem] md:rounded-[3rem] border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-500 group">
                                    <Award className="text-brand-secondary mb-3 md:mb-6 w-5 h-5 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
                                    <h4 className="font-black text-brand-primary uppercase tracking-tight mb-1 text-[10px] md:text-base">IATA Member</h4>
                                    <p className="text-[8px] md:text-xs font-bold text-gray-400">ACCREDITED</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision - Premium Grid */}
            <section className="py-16 md:py-32 bg-[#0a0a0a] text-white">
                <div className="section-container">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12 px-4 md:px-0">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group relative p-8 sm:p-10 md:p-16 bg-white/5 backdrop-blur-xl rounded-[2.5rem] md:rounded-[4rem] border border-white/10 hover:bg-white/[0.08] transition-all duration-700 overflow-hidden"
                        >
                            <div className="absolute -right-10 -top-10 w-32 md:w-40 h-32 md:h-40 bg-brand-secondary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                            <div className="relative z-10 w-12 h-12 md:w-20 md:h-20 bg-brand-secondary text-brand-primary rounded-xl md:rounded-3xl flex items-center justify-center mb-6 md:mb-10 transition-transform group-hover:rotate-12 duration-500">
                                <Target className="w-6 h-6 md:w-10 md:h-10" />
                            </div>
                            <h3 className="relative z-10 text-2xl md:text-4xl font-black mb-4 md:mb-8 tracking-tighter">Our Mission</h3>
                            <p className="relative z-10 text-gray-400 text-sm md:text-xl leading-relaxed font-medium">
                                To curate highly personalized episodes of discovery that exceed standard expectations, while pioneering sustainable and responsible tourism that honors our planet.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group relative p-8 sm:p-10 md:p-16 bg-white/5 backdrop-blur-xl rounded-[2.5rem] md:rounded-[4rem] border border-white/10 hover:bg-white/[0.08] transition-all duration-700 overflow-hidden"
                        >
                            <div className="absolute -right-10 -top-10 w-32 md:w-40 h-32 md:h-40 bg-brand-secondary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                            <div className="relative z-10 w-12 h-12 md:w-20 md:h-20 bg-white text-brand-primary rounded-xl md:rounded-3xl flex items-center justify-center mb-6 md:mb-10 transition-transform group-hover:-rotate-12 duration-500">
                                <Eye className="w-6 h-6 md:w-10 md:h-10" />
                            </div>
                            <h3 className="relative z-10 text-2xl md:text-4xl font-black mb-4 md:mb-8 tracking-tighter">Our Vision</h3>
                            <p className="relative z-10 text-gray-400 text-sm md:text-xl leading-relaxed font-medium">
                                To be recognized as the world's most thoughtful travel companion—a brand synonymous with innovation, integrity, and the creation of deep, life-altering experiences.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Global Presence */}
            <section className="py-20 md:py-32">
                <div className="section-container text-center">
                    <div className="max-w-2xl mx-auto mb-12 md:mb-20">
                        <span className="text-brand-secondary font-black tracking-[0.3em] uppercase text-xs mb-6 block">Our Sanctum</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-primary tracking-tighter">Where the Journey <br /> <span className="text-brand-secondary">Begins</span></h2>
                    </div>

                    <div className="relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.2)] aspect-video">
                        <img
                            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90"
                            alt="Map"
                            className="w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-brand-primary/10"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 text-center md:text-left max-w-md mx-auto"
                            >
                                <div className="bg-brand-primary p-4 rounded-2xl text-white shadow-lg shadow-brand-primary/20 flex-shrink-0">
                                    <MapPin size={32} />
                                </div>
                                <div className="space-y-3 md:space-y-4">
                                    <div className="inline-block px-3 py-1 bg-brand-secondary/20 text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-full">HQ Base</div>
                                    <h4 className="font-black text-2xl md:text-3xl text-brand-dark tracking-tight">Thamel Sanctum</h4>
                                    <p className="text-gray-500 font-medium text-sm md:text-base">Heart of Kathmandu, Nepal</p>
                                    <div className="pt-2 md:pt-4 flex items-center justify-center md:justify-start text-[10px] md:text-xs font-black uppercase tracking-widest text-brand-secondary">
                                        <div className="w-2 h-2 rounded-full bg-brand-secondary mr-2 animate-pulse"></div>
                                        Active & Ready
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;

