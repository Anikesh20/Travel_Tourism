import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User, Globe, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        // Prevent body scroll when menu is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const isLightPage = !['/', '/services', '/about'].includes(location.pathname) &&
        !location.pathname.startsWith('/services/') &&
        !location.pathname.startsWith('/package/');

    const navLinks = [
        { title: 'Home', path: '/' },
        { title: 'About', path: '/about' },
        { title: 'Services', path: '/services' },
        { title: 'Contact', path: '/contact' },
    ];

    const getTextColor = (isScrolled, isLightPage, isActive = false) => {
        if (isActive) return 'text-red-600 underline decoration-2 underline-offset-8';
        if (isScrolled || isLightPage) return 'text-brand-primary';
        return 'text-white/80';
    };

    const getLogoColor = (isScrolled, isLightPage) => {
        if (isScrolled || isLightPage) return 'text-brand-primary';
        return 'text-white';
    };

    const getIconColor = (isScrolled, isLightPage) => {
        if (isScrolled || isLightPage) return 'text-brand-primary hover:bg-black/5';
        return 'text-white hover:bg-white/10';
    };

    return (
        <nav className={`fixed w-full transition-all duration-500 ${isOpen ? 'z-[999]' : 'z-50'} ${(isScrolled || isLightPage) && !isOpen ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="flex justify-between items-center relative z-[1001]">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="bg-brand-secondary p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
                            <Globe className="text-brand-primary w-5 h-5" />
                        </div>
                        <span className={`text-2xl font-black font-display tracking-tight transition-colors duration-300 ${getLogoColor(isScrolled, isLightPage)}`}>
                            Travel<span className={(isScrolled || isLightPage) ? "text-brand-primary" : "text-brand-secondary"}>Quest</span>
                        </span>
                    </Link>

                    {/* Centered Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-12">
                        {navLinks.map((link) => {
                            const isActive = (location.pathname === link.path && !link.path.startsWith('/#')) ||
                                (link.path.startsWith('/#') && location.hash === link.path.substring(1));
                            return (
                                <Link
                                    key={link.title}
                                    to={link.path}
                                    className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 hover:text-red-500 ${getTextColor(isScrolled, isLightPage, isActive)}`}
                                >
                                    {link.title}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button className={`p-2 rounded-full transition-colors ${getIconColor(isScrolled, isLightPage)}`}>
                            <Search size={20} />
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        {!isOpen && (
                            <button
                                onClick={() => setIsOpen(true)}
                                className={`${(isScrolled || isLightPage) ? 'text-brand-primary' : 'text-white'} p-2`}
                            >
                                <Menu size={28} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="md:hidden fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 overflow-hidden"
                    >
                        {/* Background Effects */}
                        <div className="absolute inset-0 bg-brand-primary/80 backdrop-blur-[60px]"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>

                        {/* Abstract Background Elements for Depth */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                            <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-brand-secondary/40 rounded-full blur-[120px] animate-pulse"></div>
                            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-brand-secondary/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>

                        {/* Circular Close Button with Glass Effect */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 text-white p-4 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20 hover:bg-white/20 transition-all active:scale-90 z-[110]"
                        >
                            <X size={28} />
                        </motion.button>

                        {/* Navigation Links */}
                        <div className="flex flex-col items-center space-y-6 sm:space-y-8 relative z-10 w-full">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.title}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{
                                        delay: index * 0.08,
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20
                                    }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-4xl sm:text-6xl font-black transition-all tracking-tighter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] block text-center uppercase ${location.pathname === link.path ? 'text-red-600 underline decoration-4' : 'text-white hover:text-red-500'}`}
                                    >
                                        {link.title}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Mobile CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navLinks.length * 0.1 }}
                                className="pt-8 w-full max-w-xs"
                            >
                                <button className="w-full py-5 bg-brand-secondary text-brand-primary rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:bg-white transition-all transform hover:-translate-y-1">
                                    Book Your Quest
                                </button>
                            </motion.div>
                        </div>

                        {/* Social Links in Mobile Menu */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="absolute bottom-10 flex space-x-8 text-white/50"
                        >
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-brand-secondary cursor-pointer transition-colors drop-shadow-md">Instagram</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-brand-secondary cursor-pointer transition-colors drop-shadow-md">Facebook</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-brand-secondary cursor-pointer transition-colors drop-shadow-md">Twitter</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

