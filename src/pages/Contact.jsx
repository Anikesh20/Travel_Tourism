import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Clock, Globe, ArrowRight, Share2, Sparkles } from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm';

const Contact = () => {
    const contactInfo = [
        {
            icon: <MapPin className="text-brand-secondary" size={24} />,
            title: "Global Headquarters",
            detail: "Thamel-26, Kathmandu, Nepal",
            subDetail: "The heartbeat of our operations",
            link: "https://maps.google.com"
        },
        {
            icon: <Phone className="text-brand-secondary" size={24} />,
            title: "Direct Relations",
            detail: "+977-1-4XXXXXX",
            subDetail: "Available Sun-Fri, 9AM-6PM",
            link: "tel:+97714XXXXXX"
        },
        {
            icon: <Mail className="text-brand-secondary" size={24} />,
            title: "Digital Inquiries",
            detail: "info@travelquest.com",
            subDetail: "Rapid response guaranteed",
            link: "mailto:info@travelquest.com"
        },
        {
            icon: <MessageCircle className="text-emerald-500" size={24} />,
            title: "Instant Concierge",
            detail: "+977-98XXXXXXXX",
            subDetail: "24/7 Global WhatsApp Support",
            link: "https://wa.me/97798XXXXXXXX",
            isWhatsApp: true
        }
    ];

    return (
        <div className="min-h-screen bg-[#fafafa]">
            {/* Minimal Header */}
            <header className="pt-16 md:pt-24 pb-4">
                <div className="section-container !py-4 md:!py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl text-center md:text-left mx-auto md:mx-0"
                    >
                        <span className="text-brand-primary font-black tracking-[0.4em] uppercase text-[10px] mb-3 md:mb-4 block">Connectivity</span>
                        <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-brand-primary tracking-tighter leading-tight mb-4">
                            Let's Navigate Your <br /> <span className="text-brand-secondary italic text-shadow">Next Chapter.</span>
                        </h1>
                        <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed px-4 md:px-0">
                            A conversation is the first step toward a transformation. Our specialists are prepared to engineer your most profound journey yet.
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* Main Contact Grid */}
            <section className="pb-8 md:pb-4">
                <div className="section-container !py-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* Contact Details Column */}
                        <div className="lg:col-span-5 space-y-4 md:space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 px-4 md:px-0">
                                {contactInfo.map((info, idx) => (
                                    <motion.a
                                        href={info.link}
                                        target={info.link.startsWith('http') ? "_blank" : "_self"}
                                        rel="noopener noreferrer"
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group p-5 md:p-6 bg-white rounded-2xl md:rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-start transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                                    >
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4 bg-[#f9f9f9] group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                                            {React.cloneElement(info.icon, { size: 20 })}
                                        </div>
                                        <h3 className="text-[8px] md:text-[9px] font-black text-brand-primary uppercase tracking-[0.2em] mb-1">{info.title}</h3>
                                        <p className="text-sm md:text-base font-black text-brand-primary tracking-tight mb-0.5 group-hover:text-brand-secondary transition-colors whitespace-nowrap overflow-hidden text-ellipsis w-full">{info.detail}</p>
                                        <p className="text-[8px] md:text-[9px] font-medium text-gray-500">{info.subDetail}</p>
                                    </motion.a>
                                ))}
                            </div>

                            {/* Additional Info / CTA */}
                            <div className="mx-4 md:mx-0 p-6 md:p-8 bg-brand-primary rounded-[2rem] md:rounded-[2.5rem] text-white overflow-hidden relative group">
                                <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-brand-secondary/20 rounded-full blur-2xl md:blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                                <Sparkles className="text-brand-secondary mb-3 md:mb-4 w-5 h-5 md:w-6 md:h-6 opacity-50" />
                                <h4 className="text-lg md:text-2xl font-black mb-2 md:mb-3 tracking-tighter italic">"A journey of a thousand miles begins with a single message."</h4>
                                <p className="text-white/60 text-[10px] md:text-xs font-medium">We typically respond within 120 minutes during business hours.</p>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-7 px-4 md:px-0">
                            <div className="bg-white p-1 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.04)] border border-gray-100">
                                <div className="overflow-hidden rounded-[2.4rem] md:rounded-[3.4rem]">
                                    <EnquiryForm inline={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Immersive Map Experience */}
            <section className="py-12 md:py-20 bg-white border-t border-gray-100">
                <div className="section-container !py-4 md:!py-8">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                        <div className="lg:w-1/3 space-y-8 md:space-y-10 text-center lg:text-left px-4 md:px-0">
                            <div>
                                <span className="text-brand-primary font-black tracking-[0.3em] uppercase text-xs mb-3 md:mb-4 block">Physical Presence</span>
                                <h2 className="text-4xl md:text-5xl font-black text-brand-primary tracking-tighter">Navigate <br className="hidden md:block" /> to Our <span className="text-brand-secondary italic">Sanctum.</span></h2>
                            </div>
                            <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed">
                                Nestled in the historic Thamel district, our flagship office is a sanctuary for travelers starting their global journey.
                            </p>

                            <div className="space-y-4 md:space-y-6">
                                <div className="flex items-center space-x-4 md:space-x-5 p-5 md:p-6 bg-[#f9f9f9] rounded-2xl md:rounded-3xl border border-gray-50 text-left">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-brand-primary shadow-sm flex-shrink-0">
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">Visiting Hours</p>
                                        <p className="text-base md:text-lg font-black text-brand-primary italic">09:00 - 18:00 HRS</p>
                                    </div>
                                </div>
                                <button className="w-full py-5 md:py-6 bg-brand-primary text-white rounded-xl md:rounded-[2rem] font-black uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center space-x-3 md:space-x-4 shadow-xl hover:bg-brand-dark transition-all transform hover:-translate-y-1">
                                    <Share2 size={14} />
                                    <span>Share Location</span>
                                </button>
                            </div>
                        </div>

                        <div className="lg:w-2/3 w-full h-[350px] md:h-[600px] rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.1)] border-4 md:border-8 border-white relative group mx-4 md:mx-0">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.1292021115594!2d85.3125293!3d27.712613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fcb0aeb41f%3A0xb7a3b34b9d8a54!2zVGhhbWVsLCBLYXRobWFuZHUgNDQ2MDA!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-1000"
                                title="TravelQuest Office Location"
                            ></iframe>
                            <div className="absolute inset-0 pointer-events-none border-[12px] md:border-[20px] border-white/10 rounded-[2.8rem] md:rounded-[4.5rem]"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;

