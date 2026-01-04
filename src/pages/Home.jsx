import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Destinations from '../components/Destinations';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import EnquiryForm from '../components/EnquiryForm';

const Home = () => {
    useEffect(() => {
        // Smooth scroll for anchor links
        const handleAnchorClick = (e) => {
            const href = e.target.getAttribute('href');
            if (href && href.startsWith('/#')) {
                const id = href.split('#')[1];
                const element = document.getElementById(id);
                if (element) {
                    e.preventDefault();
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        document.querySelectorAll('a').forEach(anchor => {
            anchor.addEventListener('click', handleAnchorClick);
        });

        return () => {
            document.querySelectorAll('a').forEach(anchor => {
                anchor.removeEventListener('click', handleAnchorClick);
            });
        };
    }, []);

    return (
        <main className="animate-fade-in">
            <Hero />
            <Destinations />
            <WhyChooseUs />
            <Testimonials />
            <EnquiryForm />
        </main>
    );
};

export default Home;
