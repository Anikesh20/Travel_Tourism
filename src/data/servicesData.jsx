import React from 'react';
import { Plane, Map, Hotel, FileText, Car, ShieldCheck } from 'lucide-react';

export const servicesData = {
    'airline-ticketing': {
        icon: <Plane className="w-12 h-12" />,
        title: 'Airline Ticketing',
        subtitle: 'Global Sky Connectivity',
        desc: 'Experience seamless global connectivity with our elite airline ticketing services. We leverage advanced GDS systems to secure the most competitive rates for both domestic and international routes, ensuring your journey begins with precision and comfort.',
        longDesc: 'Our dedicated sky-logistics team monitors global flight trends in real-time to provide you with optimized routes and flexible booking options. Whether you are traveling for business, leisure, or in a large group, we handle every detail from seat selection to transit management.',
        features: [
            'Priority seat selection & upgrades',
            'Real-time transit reconfiguration',
            'Corporate & Group booking support',
            '24/7 flight monitoring & updates',
            'Baggage allowance optimization',
            'Direct access to major global carriers'
        ],
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109c055?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        color: 'text-blue-500 bg-blue-500/10'
    },
    'tour-packages': {
        icon: <Map className="w-12 h-12" />,
        title: 'Bespoke Tour Packages',
        subtitle: 'Curated Cultural Immersion',
        desc: 'Transform your vacation into a profound legacy of memories with our tailor-made tour packages. From the untamed wilderness of the Himalayas to the luxury of global metropolises, we engineer every moment for wonder.',
        longDesc: 'Our travel artisans specialize in crafting itineraries that resonate with your personal soul. We don\'t just show you landmarks; we provide exclusive access to hidden gems, private cultural experiences, and high-end hospitality that standard tours simply cannot reach.',
        features: [
            'Private high-expert local guides',
            'Privileged access to heritage sites',
            'Bespoke culinary experiences',
            'Seamless high-end logistics',
            'Fully customizable daily itineraries',
            'Eco-conscious & Sustainable options'
        ],
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        color: 'text-emerald-500 bg-emerald-500/10'
    },
    'hotel-booking': {
        icon: <Hotel className="w-12 h-12" />,
        title: 'Elite Hotel Booking',
        subtitle: 'Sanctuaries of Luxury',
        desc: 'Access an world-class portfolio of stays, from boutique hideaways to iconic ultra-luxury landmarks. Our global hospitality network ensures you receive preferential treatment and the best possible rates at every destination.',
        longDesc: 'We maintain direct relationships with general managers at the world\'s finest properties. This allows us to offer our clients exclusive value-adds such as room upgrades, late check-outs, and complimentary lifestyle services that aren\'t available through public booking portals.',
        features: [
            'Preferential rates & room upgrades',
            'Complimentary breakfast & WiFi',
            'Early check-in & Late check-out',
            'Boutique & Heritage property access',
            'Resort-specific credit benefits',
            'Vetted high-safety standards'
        ],
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        color: 'text-orange-500 bg-orange-500/10'
    },
    'visa-assistance': {
        icon: <FileText className="w-12 h-12" />,
        title: 'Visa & Logistics',
        subtitle: 'Global Mobility Solutions',
        desc: 'Navigate the complexities of international borders with absolute confidence. Our dedicated visa concierge provides meticulous documentation support and interview coaching to ensure maximum success rates.',
        longDesc: 'International regulation is constantly shifting. Our specialists stay updated on the latest immigration policies to provide you with clear, simplified paths through the bureaucracy. We handle the heavy lifting of paperwork so you can focus on the journey ahead.',
        features: [
            'Comprehensive document vetting',
            'Priority interview scheduling',
            'Complex case consultation',
            'Passport handling & security',
            'Business & Tourist visa updates',
            'High-success interview coaching'
        ],
        image: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        color: 'text-purple-500 bg-purple-500/10'
    },
    'car-rental': {
        icon: <Car className="w-12 h-12" />,
        title: 'Private Car Rental',
        subtitle: 'Elegance in Motion',
        desc: 'Experience absolute freedom and luxury on the road. Our car rental services provide access to a premium fleet of vehicles and professional drivers, ensuring your local transit is as comfortable as your flight.',
        longDesc: 'Whether you need a sleek sedan for a business meeting or a rugged 4x4 for mountain exploration, we provide meticulously maintained vehicles and discreet, expert drivers who know the local terrain better than anyone else.',
        features: [
            'Professional multi-lingual drivers',
            'GPS-tracked secure transit',
            'Premium fleet (Sedan/SUV/Luxury)',
            'Hourly & Daily flexible rentals',
            'Airport fast-track transfers',
            'Roadside concierge assistance'
        ],
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        color: 'text-red-500 bg-red-500/10'
    },
    'travel-insurance': {
        icon: <ShieldCheck className="w-12 h-12" />,
        title: 'Travel Insurance',
        subtitle: 'Comprehensive Protection',
        desc: 'Protect what matters most with our global-standard travel insurance plans. We provide a sophisticated safety net for you and your family, covering everything from medical emergencies to trip interruptions.',
        longDesc: 'Real luxury is the peace of mind that comes from knowing you are covered globally. Our insurance partners provide instantaneous support for flight delays, lost baggage, and unforeseen medical situations, ensuring your lifestyle is never interrupted.',
        features: [
            'Global medical & dental cover',
            'Trip cancellation & interruption',
            'Loss of personal belongings',
            'Bag delay & missed connection',
            '24/7 global emergency hotline',
            'Adventure sport coverage options'
        ],
        image: 'https://images.unsplash.com/photo-1454165833767-023058b584a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        color: 'text-cyan-500 bg-cyan-500/10'
    }
};
