import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Clock, Globe } from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm';

const Contact = () => {
    const contactInfo = [
        {
            icon: <MapPin className="text-brand-primary" size={28} />,
            title: "Our Office",
            detail: "Thamel-26, Kathmandu, Nepal",
            subDetail: "Near Garden of Dreams",
            link: "https://maps.google.com"
        },
        {
            icon: <Phone className="text-brand-primary" size={28} />,
            title: "Phone Number",
            detail: "+977-1-4XXXXXX",
            subDetail: "Mon-Fri, 9AM - 6PM",
            link: "tel:+97714XXXXXX"
        },
        {
            icon: <Mail className="text-brand-primary" size={28} />,
            title: "Email Address",
            detail: "info@travelquest.com",
            subDetail: "support@travelquest.com",
            link: "mailto:info@travelquest.com"
        },
        {
            icon: <MessageCircle className="text-emerald-500" size={28} />,
            title: "WhatsApp",
            detail: "+977-98XXXXXXXX",
            subDetail: "Chat with us now",
            link: "https://wa.me/97798XXXXXXXX",
            isWhatsApp: true
        }
    ];

    return (
        <div className="pt-20 min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-24 bg-brand-primary overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <Globe className="absolute -right-20 -bottom-20 w-96 h-96 text-white" />
                </div>
                <div className="section-container relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-extrabold text-white mb-6"
                    >
                        Get In <span className="text-brand-secondary">Touch</span>
                    </motion.h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Ready to plan your next adventure? Our team of travel experts is just a message away. Let's make your dream trip a reality.
                    </p>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="py-16 -mt-16 relative z-20">
                <div className="section-container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, idx) => (
                            <motion.a
                                href={info.link}
                                target={info.link.startsWith('http') ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`p-8 bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center transition-all hover:-translate-y-2 hover:shadow-2xl ${info.isWhatsApp ? 'ring-2 ring-emerald-500/20' : ''}`}
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${info.isWhatsApp ? 'bg-emerald-50' : 'bg-brand-accent/30'}`}>
                                    {info.icon}
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark mb-2">{info.title}</h3>
                                <p className="text-brand-primary font-bold mb-1">{info.detail}</p>
                                <p className="text-gray-400 text-sm">{info.subDetail}</p>
                                {info.isWhatsApp && (
                                    <span className="mt-4 px-4 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-full uppercase tracking-tighter shadow-sm animate-pulse">
                                        Online Now
                                    </span>
                                )}
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enquiry Form Integration */}
            <EnquiryForm />

            {/* Google Map Section */}
            <section className="py-24 bg-gray-50">
                <div className="section-container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-brand-primary mb-4">Visit Our Office</h2>
                        <p className="text-gray-600">Located in the heart of Kathmandu's tourist hub, Thamel.</p>
                    </div>

                    <div className="w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.1292021115594!2d85.3125293!3d27.712613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fcb0aeb41f%3A0xb7a3b34b9d8a54!2zVGhhbWVsLCBLYXRobWFuZHUgNDQ2MDA!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="TravelQuest Office Location"
                        ></iframe>

                        <div className="absolute bottom-8 left-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block border border-gray-100">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="bg-brand-primary p-2 rounded-lg text-white">
                                    <Clock size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Office Hours</p>
                                    <p className="text-sm font-bold text-brand-dark">9:00 AM - 6:00 PM</p>
                                </div>
                            </div>
                            <button className="w-full btn-primary !py-2 text-sm flex items-center justify-center space-x-2">
                                <MapPin size={16} />
                                <span>Get Directions</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Floating WhatsApp Button */}
            <motion.a
                href="https://wa.me/97798XXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-emerald-600 transition-colors"
            >
                <MessageCircle size={32} />
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
                </span>
            </motion.a>
        </div>
    );
};

export default Contact;
