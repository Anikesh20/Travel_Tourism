import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plane, Map, Hotel, FileText, Car, ShieldCheck, ArrowRight } from 'lucide-react';

const services = [
    {
        icon: <Plane className="w-8 h-8" />,
        title: 'Airline Ticketing',
        slug: 'airline-ticketing',
        desc: 'Domestic & International flights at the most competitive rates with group booking support.',
        color: 'from-blue-500/10 to-blue-500/20 text-blue-600',
    },
    {
        icon: <Map className="w-8 h-8" />,
        title: 'Tour Packages',
        slug: 'tour-packages',
        desc: 'Customized international and domestic tour packages tailored to your preferences and budget.',
        color: 'from-emerald-500/10 to-emerald-500/20 text-emerald-600',
    },
    {
        icon: <Hotel className="w-8 h-8" />,
        title: 'Hotel Booking',
        slug: 'hotel-booking',
        desc: 'Exclusive deals with luxury and budget hotels worldwide ensuring a comfortable stay.',
        color: 'from-orange-500/10 to-orange-500/20 text-orange-600',
    },
    {
        icon: <FileText className="w-8 h-8" />,
        title: 'Visa Assistance',
        slug: 'visa-assistance',
        desc: 'Hassle-free visa documentation and consultation for various countries with high success rates.',
        color: 'from-purple-500/10 to-purple-500/20 text-purple-600',
    },
    {
        icon: <Car className="w-8 h-8" />,
        title: 'Car Rental',
        slug: 'car-rental',
        desc: 'Reliable car rental services for local sightseeing and long-distance travel with professional drivers.',
        color: 'from-red-500/10 to-red-500/20 text-red-600',
    },
    {
        icon: <ShieldCheck className="w-8 h-8" />,
        title: 'Travel Insurance',
        slug: 'travel-insurance',
        desc: 'Comprehensive travel insurance plans to keep you and your family protected during your journey.',
        color: 'from-cyan-500/10 to-cyan-500/20 text-cyan-600',
    },
];

const Services = () => {
    return (
        <section className="bg-white py-20 md:py-32">
            <div className="section-container">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 md:mb-20 gap-8">
                    <div className="max-w-2xl">
                        <span className="text-brand-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">What We Do</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-primary tracking-tight leading-[1.1]">
                            Experience the Art <br /> of <span className="text-brand-secondary">Perfect Travel</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-10 px-2 sm:px-0">
                    {services.map((service, index) => (
                        <Link to={`/services/${service.slug}`} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group relative p-5 sm:p-8 md:p-10 bg-white border border-gray-100 rounded-[1.5rem] sm:rounded-[2.5rem] md:rounded-[3rem] hover:bg-brand-primary transition-all duration-500 overflow-hidden h-full"
                            >
                                {/* Abstract Background Shape */}
                                <div className="absolute -right-8 -top-8 w-24 h-24 md:w-32 md:h-32 bg-brand-secondary/10 rounded-full group-hover:scale-[5] transition-transform duration-700"></div>

                                <div className={`relative z-10 w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl md:rounded-3xl bg-gradient-to-br flex items-center justify-center mb-4 sm:mb-6 md:mb-10 transition-transform group-hover:scale-110 group-hover:rotate-6 duration-500 ${service.color}`}>
                                    {React.cloneElement(service.icon, { className: "w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" })}
                                </div>

                                <h4 className="relative z-10 text-sm sm:text-xl md:text-2xl font-bold text-brand-dark mb-2 sm:mb-4 group-hover:text-white transition-colors duration-300 tracking-tight">
                                    {service.title}
                                </h4>
                                <p className="relative z-10 text-gray-500 leading-relaxed mb-4 sm:mb-6 md:mb-8 group-hover:text-white/70 transition-colors duration-300 font-medium text-[10px] sm:text-sm md:text-base line-clamp-2 sm:line-clamp-none">
                                    {service.desc}
                                </p>

                                <div className="relative z-10 flex items-center space-x-2 sm:space-x-3 text-brand-primary font-black uppercase tracking-widest text-[8px] sm:text-[10px] md:text-xs group-hover:text-brand-secondary transition-colors duration-300">
                                    <span>Learn More</span>
                                    <ArrowRight size={12} className="group-hover:translate-x-2 transition-transform sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;

