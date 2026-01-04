import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Map, Hotel, FileText, Car, ShieldCheck } from 'lucide-react';

const services = [
    {
        icon: <Plane className="w-8 h-8" />,
        title: 'Airline Ticketing',
        desc: 'Domestic & International flights at the most competitive rates with group booking support.',
        color: 'bg-blue-50 text-blue-600',
    },
    {
        icon: <Map className="w-8 h-8" />,
        title: 'Tour Packages',
        desc: 'Customized international and domestic tour packages tailored to your preferences and budget.',
        color: 'bg-emerald-50 text-emerald-600',
    },
    {
        icon: <Hotel className="w-8 h-8" />,
        title: 'Hotel Booking',
        desc: 'Exclusive deals with luxury and budget hotels worldwide ensuring a comfortable stay.',
        color: 'bg-orange-50 text-orange-600',
    },
    {
        icon: <FileText className="w-8 h-8" />,
        title: 'Visa Assistance',
        desc: 'Hassle-free visa documentation and consultation for various countries with high success rates.',
        color: 'bg-purple-50 text-purple-600',
    },
    {
        icon: <Car className="w-8 h-8" />,
        title: 'Car Rental',
        desc: 'Reliable car rental services for local sightseeing and long-distance travel with professional drivers.',
        color: 'bg-red-50 text-red-600',
    },
    {
        icon: <ShieldCheck className="w-8 h-8" />,
        title: 'Travel Insurance',
        desc: 'Comprehensive travel insurance plans to keep you and your family protected during your journey.',
        color: 'bg-cyan-50 text-cyan-600',
    },
];

const Services = () => {
    return (
        <section className="bg-white py-24">
            <div className="section-container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-brand-secondary font-bold tracking-widest uppercase text-sm mb-4">Our Expertise</h2>
                    <h3 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-6">Comprehensive Travel Solutions</h3>
                    <p className="text-gray-600 text-lg">
                        We provide a wide range of travel services to ensure your journey is smooth, safe, and memorable.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -10 }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 ${service.color}`}>
                                {service.icon}
                            </div>
                            <h4 className="text-2xl font-bold text-brand-dark mb-4">{service.title}</h4>
                            <p className="text-gray-500 leading-relaxed mb-6">
                                {service.desc}
                            </p>
                            <button className="text-brand-primary font-semibold flex items-center space-x-2 group-hover:translate-x-2 transition-transform">
                                <span>Learn More</span>
                                <span className="text-xl">→</span>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
