import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Instagram, Facebook, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { newsletterService } from '../services/api';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ loading: false, message: '', type: '' });

    const handleNewsletter = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus({ loading: true, message: '', type: '' });
        try {
            const data = await newsletterService.subscribe(email);
            if (data.success) {
                setStatus({ loading: false, message: 'Welcome to the inner circle!', type: 'success' });
                setEmail('');
            } else {
                setStatus({ loading: false, message: data.message || 'Subscription failed', type: 'error' });
            }
        } catch (error) {
            setStatus({ loading: false, message: 'Connection lost. Try again.', type: 'error' });
        }
    };

    return (
        <footer className="bg-[#0a0a0a] text-white pt-20 md:pt-32 pb-12 md:pb-16 text-center md:text-left">
            <div className="section-container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-16 mb-16 md:mb-24">
                    {/* Brand Section */}
                    <div className="lg:col-span-5 space-y-8 md:space-y-10">
                        <Link to="/" className="flex items-center justify-center md:justify-start space-x-3 group">
                            <div className="bg-brand-secondary p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                                <Globe className="text-brand-primary w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <span className="text-2xl md:text-3xl font-black font-display tracking-tighter">
                                Travel<span className="text-brand-secondary">Quest</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-md font-medium mx-auto md:mx-0">
                            We curate extraordinary journeys for the discerning traveler. From hidden gems to iconic landmarks, experience the world like never before.
                        </p>
                        <div className="flex justify-center md:justify-start space-x-4 md:space-x-5">
                            {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center hover:bg-brand-secondary hover:text-brand-primary transition-all duration-300 border border-white/5">
                                    <Icon size={18} className="md:w-5 md:h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="lg:col-span-2 hidden sm:block">
                        <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-brand-secondary mb-8 md:mb-10">Navigation</h4>
                        <ul className="space-y-4 md:space-y-5 text-gray-400 font-bold text-sm">
                            <li><Link to="/about" className="hover:text-white transition-colors flex items-center justify-center md:justify-start group"><ArrowRight size={14} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /> About Us</Link></li>
                            <li><Link to="/services" className="hover:text-white transition-colors flex items-center justify-center md:justify-start group"><ArrowRight size={14} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /> Our Services</Link></li>
                            <li><Link to="/#destinations" className="hover:text-white transition-colors flex items-center justify-center md:justify-start group"><ArrowRight size={14} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /> Destinations</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors flex items-center justify-center md:justify-start group"><ArrowRight size={14} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /> Contact</Link></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 hidden lg:block">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-brand-secondary mb-10">Experience</h4>
                        <ul className="space-y-5 text-gray-400 font-bold text-sm">
                            <li className="hover:text-white cursor-pointer transition-colors">Luxury Tours</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Private Jets</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Adventure</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Honeymoon</li>
                        </ul>
                    </div>

                    {/* Newsletter/Contact */}
                    <div className="lg:col-span-3">
                        <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-brand-secondary mb-8 md:mb-10">Get In Touch</h4>
                        <div className="space-y-5 md:space-y-6">
                            <div className="flex items-center justify-center md:justify-start space-x-3 md:space-x-4 group cursor-pointer">
                                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-secondary group-hover:text-brand-primary transition-all">
                                    <Phone size={16} className="md:w-[18px] md:h-[18px]" />
                                </div>
                                <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">+977 1 456 7890</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start space-x-3 md:space-x-4 group cursor-pointer">
                                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-secondary group-hover:text-brand-primary transition-all">
                                    <Mail size={16} className="md:w-[18px] md:h-[18px]" />
                                </div>
                                <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors text-ellipsis overflow-hidden">hello@travelquest.com</span>
                            </div>
                            <form onSubmit={handleNewsletter} className="mt-8 md:mt-10">
                                <div className="p-1 bg-white/5 rounded-xl md:rounded-2xl flex max-w-sm mx-auto md:mx-0 border border-white/5 focus-within:border-brand-secondary/30 transition-all">
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="bg-transparent border-none focus:ring-0 text-sm px-4 py-2 w-full font-bold outline-none"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <button
                                        disabled={status.loading}
                                        className="bg-brand-secondary text-brand-primary px-4 py-2 rounded-lg md:rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                    >
                                        {status.loading ? <Loader2 className="animate-spin w-3 h-3" /> : 'Join'}
                                    </button>
                                </div>
                                {status.message && (
                                    <p className={`mt-3 text-[10px] uppercase font-black tracking-widest ${status.type === 'success' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                        {status.message}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
                    <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                        © {new Date().getFullYear()} TravelQuest Luxury travel.
                    </p>
                    <div className="flex items-center space-x-6 md:space-x-10">
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white cursor-pointer transition-colors">Terms</span>
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white cursor-pointer transition-colors">Privacy</span>
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white cursor-pointer transition-colors">Cookies</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

