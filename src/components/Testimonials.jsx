import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Suman Thapa',
        role: 'Business Traveler',
        content: 'The ticketing service is impeccable. They found me the best prices for my last-minute trip to London. Highly recommended!',
        rating: 5,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suman',
    },
    {
        name: 'Anjali Sharma',
        role: 'Honeymoon Traveler',
        content: 'Our Maldives trip was like a dream. Everything from visa to hotel was handled perfectly. We didnt have to worry about a thing.',
        rating: 5,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali',
    },
    {
        name: 'Robert Wilson',
        role: 'Adventurer',
        content: 'Exploring Nepal with TravelQuest was the highlight of my year. The local guides were knowledgeable and the itinerary was perfect.',
        rating: 5,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    },
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="section-container">
                <div className="text-center mb-16">
                    <h2 className="text-brand-secondary font-bold tracking-widest uppercase text-sm mb-4">Testimonials</h2>
                    <h3 className="text-4xl md:text-5xl font-extrabold text-brand-primary">What Our Travelers Say</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative p-10 bg-brand-accent/20 rounded-[3rem] border border-brand-accent shadow-sm"
                        >
                            <div className="absolute top-8 right-10 text-brand-secondary/20">
                                <Quote size={60} />
                            </div>

                            <div className="flex mb-6">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} size={18} className="text-brand-secondary fill-brand-secondary" />
                                ))}
                            </div>

                            <p className="text-gray-600 text-lg mb-8 italic leading-relaxed relative z-10">
                                "{t.content}"
                            </p>

                            <div className="flex items-center space-x-4">
                                <img
                                    src={t.avatar}
                                    alt={t.name}
                                    className="w-14 h-14 rounded-full bg-white border-2 border-brand-secondary"
                                />
                                <div>
                                    <h4 className="font-bold text-brand-dark text-lg">{t.name}</h4>
                                    <p className="text-brand-primary text-sm font-medium">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center space-x-2 bg-gray-50 px-6 py-3 rounded-full border border-gray-100 shadow-sm">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg" alt="Google" className="h-5" />
                        <span className="text-gray-600 font-medium">4.9/5 based on 250+ Google Reviews</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
