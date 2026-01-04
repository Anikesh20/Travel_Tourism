import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Instagram, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-brand-dark text-white pt-24 pb-12">
            <div className="section-container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    <div className="space-y-8">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="bg-brand-primary p-2 rounded-lg border border-white/20">
                                <Globe className="text-white w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold font-display">
                                Travel<span className="text-brand-secondary">Quest</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed">
                            We are a premium travel agency dedicated to providing seamless travel experiences. From booking flights to customized tour packages, we handle it all.
                        </p>
                        <div className="flex space-x-4">
                            {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-secondary hover:text-brand-primary hover:border-brand-secondary transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold mb-8">Quick Links</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/about" className="hover:text-brand-secondary transition-colors">About Us</Link></li>
                            <li><Link to="/services" className="hover:text-brand-secondary transition-colors">Our Services</Link></li>
                            <li><Link to="/#destinations" className="hover:text-brand-secondary transition-colors">Popular Packages</Link></li>
                            <li><Link to="/contact" className="hover:text-brand-secondary transition-colors">Contact Support</Link></li>
                            <li><a href="#" className="hover:text-brand-secondary transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold mb-8">Service Areas</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#" className="hover:text-brand-secondary transition-colors">Airline Ticketing</a></li>
                            <li><a href="#" className="hover:text-brand-secondary transition-colors">Domestic Tours</a></li>
                            <li><a href="#" className="hover:text-brand-secondary transition-colors">International Vacation</a></li>
                            <li><a href="#" className="hover:text-brand-secondary transition-colors">Visa Consultation</a></li>
                            <li><a href="#" className="hover:text-brand-secondary transition-colors">Hotel Bookings</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold mb-8">Contact Us</h4>
                        <ul className="space-y-6 text-gray-400">
                            <li className="flex items-start space-x-3">
                                <MapPin className="text-brand-secondary flex-shrink-0" size={20} />
                                <span>Thamel-26, Kathmandu, Nepal</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="text-brand-secondary flex-shrink-0" size={20} />
                                <span>+977-1-4XXXXXX</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="text-brand-secondary flex-shrink-0" size={20} />
                                <span>info@travelquest.com</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                                    <svg size={12} viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.45L0 24l7.105-1.864a11.834 11.834 0 005.736 1.482h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                </div>
                                <span className="font-bold text-emerald-500">+977-98XXXXXXXX</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} TravelQuest. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-6">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-50 gray" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-50 gray" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5 opacity-50 gray" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
