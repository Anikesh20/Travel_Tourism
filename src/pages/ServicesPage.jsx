import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Globe, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

const serviceDetails = [
    {
        id: 'flights',
        icon: <Plane size={48} />,
        title: 'Airline Ticketing',
        subtitle: 'Domestic & International Flights',
        desc: 'We provide seamless flight booking services for thousands of destinations across the globe. Our advanced booking system ensures you get the best fares updated in real-time.',
        features: [
            'Best fare guarantee for all international sectors',
            'Instant cancellation & reissue support',
            'Exclusive group booking discounts',
            'Corporate travel management solutions'
        ],
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109c055?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        color: 'text-blue-600 bg-blue-50'
    },
    {
        id: 'tours',
        icon: <Globe size={48} />,
        title: 'Tours & Packages',
        subtitle: 'Fixed & Customized Holiday Packages',
        desc: 'From romantic honeymoons to adventurous family vacations, we craft experiences that last a lifetime. Choose from our pre-designed fixed packages or customize your own.',
        features: [
            'Honeymoon, Family & Group special tours',
            'Adventurous trekking and hiking packages',
            'Religious and cultural heritage tours',
            'Full accommodation and transport planning'
        ],
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        color: 'text-emerald-600 bg-emerald-50'
    },
    {
        id: 'visa',
        icon: <FileText size={48} />,
        title: 'Visa Services',
        subtitle: 'Expert Consultation & Documentation',
        desc: 'Navigating through visa requirements can be complex. Our experienced consultants provide step-by-step guidance to ensure your application has the highest chance of success.',
        features: [
            'Tourist & Business visa assistance',
            'Comprehensive documentation support',
            'Interview preparation and coaching',
            'Up-to-date information on visa policies'
        ],
        image: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        color: 'text-orange-600 bg-orange-50'
    }
];

const ServicesPage = () => {
    return (
        <div className="pt-24 min-h-screen">
            {/* Hero */}
            <section className="bg-brand-primary py-24 text-white">
                <div className="section-container text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Our Services</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Comprehensive travel solutions tailored to your unique needs. We handle the logistics so you can focus on the journey.
                    </p>
                </div>
            </section>

            {/* Services Detail List */}
            <section className="py-24 space-y-32">
                {serviceDetails.map((service, index) => (
                    <div key={service.id} className="section-container">
                        <div className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-center`}>
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 !== 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="lg:w-1/2"
                            >
                                <div className={`w-20 h-20 ${service.color} rounded-3xl flex items-center justify-center mb-8`}>
                                    {service.icon}
                                </div>
                                <h2 className="text-4xl font-extrabold text-brand-primary mb-4">{service.title}</h2>
                                <h4 className="text-xl font-bold text-brand-secondary mb-6">{service.subtitle}</h4>
                                <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                                    {service.desc}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                    {service.features.map((feature, fIdx) => (
                                        <div key={fIdx} className="flex items-start space-x-3">
                                            <CheckCircle2 className="text-brand-secondary flex-shrink-0 mt-1" size={18} />
                                            <span className="text-gray-700 font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className="btn-primary py-4 px-8 flex items-center space-x-3">
                                    <span>Enquire About This Service</span>
                                    <ArrowRight size={20} />
                                </button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="lg:w-1/2 relative"
                            >
                                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                                    <img src={service.image} alt={service.title} className="w-full h-full object-cover aspect-[4/3]" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 to-transparent"></div>
                                </div>
                                {/* Decorative background element */}
                                <div className={`absolute -z-10 w-full h-full border-4 border-dashed rounded-[3rem] -top-6 ${index % 2 !== 0 ? '-left-6 border-brand-secondary/40' : '-right-6 border-brand-primary/20'}`}></div>
                            </motion.div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Booking CTA */}
            <section className="py-24 bg-brand-accent/20">
                <div className="section-container text-center">
                    <h3 className="text-3xl md:text-5xl font-extrabold text-brand-primary mb-8 px-4">
                        Ready to Start Your Journey?
                    </h3>
                    <p className="text-gray-600 text-xl mb-12 max-w-2xl mx-auto">
                        Our experts are standing by to help you plan your next adventure.
                    </p>
                    <button className="btn-primary !px-12 !py-5 text-xl font-bold shadow-2xl">
                        Get a Custom Quote
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
