import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, Headphones } from 'lucide-react';

const reasons = [
    {
        icon: <Award className="w-10 h-10" />,
        title: 'Best Price Guarantee',
        desc: 'We offer the most competitive prices in the market without compromising on quality.',
    },
    {
        icon: <Users className="w-10 h-10" />,
        title: 'Experienced Consultants',
        desc: 'Our team of travel experts has over 5+ years of experience in craftng perfect journeys.',
    },
    {
        icon: <Headphones className="w-10 h-10" />,
        title: '24/7 Support',
        desc: 'We are always here for you, providing round-the-clock assistance throughout your trip.',
    },
    {
        icon: <CheckCircle2 className="w-10 h-10" />,
        title: 'Trusted & Licensed',
        desc: 'Fully government registered and IATA member agency you can rely on.',
    },
];

const WhyChooseUs = () => {
    return (
        <section className="py-24 bg-brand-primary text-white overflow-hidden relative">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

            <div className="section-container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-brand-secondary font-bold tracking-widest uppercase text-sm mb-4">Why Travel With Us?</h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
                            Experience the World <br /> Like Never Before
                        </h3>
                        <p className="text-gray-300 text-lg mb-10 max-w-lg leading-relaxed">
                            With a passion for travel and a commitment to excellence, we go above and beyond to make every trip extraordinary.
                        </p>

                        <div className="space-y-6">
                            {['Personalized Itineraries', 'Exclusive Member Discounts', 'Hassle-free Documentation'].map((item, i) => (
                                <div key={i} className="flex items-center space-x-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-brand-secondary rounded-full flex items-center justify-center">
                                        <CheckCircle2 size={14} className="text-brand-primary" />
                                    </div>
                                    <span className="text-lg font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <button className="mt-12 btn-secondary !bg-white !text-brand-primary border-none">
                            Learn Our Story
                        </button>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reasons.map((reason, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors"
                            >
                                <div className="text-brand-secondary mb-6 italic">
                                    {reason.icon}
                                </div>
                                <h4 className="text-xl font-bold mb-4">{reason.title}</h4>
                                <p className="text-gray-400 leading-relaxed font-light">
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
