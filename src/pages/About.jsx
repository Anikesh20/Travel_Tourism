import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Award, MapPin } from 'lucide-react';

const About = () => {
    return (
        <div className="pt-24 min-h-screen">
            {/* Page Header */}
            <section className="bg-brand-primary py-24 text-white">
                <div className="section-container text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-extrabold mb-6"
                    >
                        Our Story
                    </motion.h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Dedicated to making world exploration accessible, comfortable, and unforgettable for everyone.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Our Team"
                                className="rounded-[3rem] shadow-2xl"
                            />
                            <div className="absolute -bottom-8 -right-8 bg-brand-secondary p-8 rounded-[2rem] shadow-xl text-brand-primary max-w-[240px]">
                                <p className="text-4xl font-extrabold mb-1">5+</p>
                                <p className="font-bold uppercase tracking-widest text-sm">Years of Experience in Travel Industry</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-4xl font-extrabold text-brand-primary">Premier Travel Agency Since 2018</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                TravelQuest started with a simple vision: to bridge the gap between dream destinations and reality. Over the years, we have grown into one of Nepal's most trusted travel agencies, serving thousands of happy travelers.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                We are fully government registered and proud members of IATA, ensuring that every booking you make with us is secure and professional. Our team consists of passionate travelers who understand exactly what makes a journey special.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 bg-brand-accent/20 rounded-2xl border border-brand-accent">
                                    <h4 className="font-bold text-brand-primary mb-2">Government Regd.</h4>
                                    <p className="text-sm text-gray-500">License No: 123456/078/79</p>
                                </div>
                                <div className="p-6 bg-brand-accent/20 rounded-2xl border border-brand-accent">
                                    <h4 className="font-bold text-brand-primary mb-2">IATA Member</h4>
                                    <p className="text-sm text-gray-500">Accredited Agency</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 bg-gray-50">
                <div className="section-container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="p-12 bg-white rounded-[3rem] shadow-sm border border-gray-100"
                        >
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                                <Target size={32} />
                            </div>
                            <h3 className="text-3xl font-bold text-brand-dark mb-6">Our Mission</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                To provide personalized, reliable, and high-quality travel services that exceed customer expectations while promoting sustainable and responsible tourism worldwide.
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -10 }}
                            className="p-12 bg-white rounded-[3rem] shadow-sm border border-gray-100"
                        >
                            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-8">
                                <Eye size={32} />
                            </div>
                            <h3 className="text-3xl font-bold text-brand-dark mb-6">Our Vision</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                To become the leading travel companion globally, recognized for our innovation, integrity, and dedication to creating life-changing experiences for every traveler.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Office Locations */}
            <section className="py-24">
                <div className="section-container text-center">
                    <h2 className="text-3xl font-extrabold text-brand-primary mb-12">Our Presence</h2>
                    <div className="max-w-4xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl border border-gray-200 aspect-video relative">
                        {/* Mock Map Background */}
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                            <img src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Map" className="w-full h-full object-cover opacity-50" />
                            <div className="absolute bg-white p-6 rounded-2xl shadow-xl border border-brand-primary/20 flex items-start space-x-4 max-w-sm text-left">
                                <div className="bg-brand-primary p-3 rounded-xl text-white">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl text-brand-dark">Head Office</h4>
                                    <p className="text-gray-600">Thamel, Kathmandu, Nepal</p>
                                    <p className="text-sm font-medium text-brand-primary mt-2">Open: 9 AM - 6 PM (Sun-Fri)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
