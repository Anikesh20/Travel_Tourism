import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Calendar } from 'lucide-react';

const destinations = [
    {
        id: 1,
        name: 'Dubai, UAE',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        price: '75,000',
        duration: '5 Days',
        rating: 4.9,
        tag: 'Luxury',
    },
    {
        id: 2,
        name: 'Bangkok, Thailand',
        image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        price: '45,000',
        duration: '4 Days',
        rating: 4.8,
        tag: 'Trending',
    },
    {
        id: 3,
        name: 'Pokhara, Nepal',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        price: '12,000',
        duration: '3 Days',
        rating: 4.7,
        tag: 'Nature',
    },
    {
        id: 4,
        name: 'Bali, Indonesia',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        price: '85,000',
        duration: '6 Days',
        rating: 4.9,
        tag: 'Featured',
    },
];

const Destinations = () => {
    return (
        <section id="destinations" className="py-24 bg-brand-accent/30">
            <div className="section-container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-brand-secondary font-bold tracking-widest uppercase text-sm mb-4">Top Destinations</h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-brand-primary">Popular Tour Packages</h3>
                    </div>
                    <button className="btn-secondary">View All Destinations</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {destinations.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-brand-primary uppercase tracking-wider">
                                        {item.tag}
                                    </span>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                                    <div className="bg-brand-primary/80 backdrop-blur-md p-2 rounded-xl text-white flex items-center space-x-1">
                                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                        <span className="text-xs font-bold">{item.rating}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center text-gray-400 text-xs mb-2 space-x-4">
                                    <div className="flex items-center space-x-1">
                                        <MapPin size={14} />
                                        <span>Adventure</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Calendar size={14} />
                                        <span>{item.duration}</span>
                                    </div>
                                </div>

                                <h4 className="text-xl font-bold text-brand-dark mb-4 group-hover:text-brand-primary transition-colors">
                                    {item.name}
                                </h4>

                                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <div>
                                        <p className="text-xs text-gray-400">Starting from</p>
                                        <p className="text-xl font-extrabold text-brand-primary">NPR {item.price}</p>
                                    </div>
                                    <button className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-colors">
                                        <ArrowIcon />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ArrowIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export default Destinations;
