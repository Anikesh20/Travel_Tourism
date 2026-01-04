import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Globe } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { title: 'Home', path: '/' },
        { title: 'About Us', path: '/about' },
        { title: 'Services', path: '/services' },
        { title: 'Destinations', path: '/#destinations' },
        { title: 'Contact', path: '/contact' },
    ];

    const isActive = (path) => {
        if (path.startsWith('/#')) {
            return false;
        }
        return location.pathname === path;
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="bg-brand-primary p-2 rounded-lg">
                            <Globe className="text-white w-6 h-6" />
                        </div>
                        <span className={`text-2xl font-bold font-display ${isScrolled ? 'text-brand-dark' : 'text-white'}`}>
                            Travel<span className="text-brand-secondary">Quest</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.title}
                                to={link.path}
                                className={`text-sm font-medium transition-colors hover:text-brand-secondary ${isActive(link.path)
                                    ? 'text-brand-secondary'
                                    : isScrolled ? 'text-brand-dark' : 'text-white'
                                    }`}
                            >
                                {link.title}
                            </Link>
                        ))}
                        <a href="tel:+9779800000000" className="flex items-center space-x-2 btn-primary !py-2 !px-4 text-sm">
                            <Phone size={16} />
                            <span>Call Now</span>
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`${isScrolled ? 'text-brand-dark' : 'text-white'} hover:text-brand-secondary px-3 py-2 rounded-md transition-colors`}
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-xl absolute w-full top-full left-0 animate-fade-in border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.title}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-4 rounded-md text-base font-medium border-b border-gray-50 last:border-0 ${isActive(link.path) ? 'text-brand-primary bg-brand-accent/30' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {link.title}
                            </Link>
                        ))}
                        <div className="px-3 py-4">
                            <a href="tel:+9779800000000" className="flex items-center justify-center space-x-2 btn-primary w-full">
                                <Phone size={18} />
                                <span>Contact Us</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
