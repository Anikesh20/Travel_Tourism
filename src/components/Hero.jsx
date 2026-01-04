import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Search, Bookmark, ChevronDown } from 'lucide-react';
import { getPackages } from '../api/packages';

const Hero = () => {
    const [packages, setPackages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getPackages();
                setPackages(data.slice(0, 5)); // Featured top 5
                setLoading(false);
            } catch (err) {
                console.error("Failed to load packages", err);
                setLoading(false);
            }
        };
        fetch();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % packages.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + packages.length) % packages.length);
    };

    if (loading || packages.length === 0) {
        return <div className="h-screen bg-brand-primary flex items-center justify-center text-white">Loading...</div>;
    }

    const currentItem = packages[currentIndex];

    return (
        <div className="relative h-screen min-h-[700px] w-full overflow-hidden text-white">
            {/* Background Images with Transitions */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentItem.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={currentItem.image_url}
                        alt={currentItem.destination}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
                </motion.div>
            </AnimatePresence>

            {/* Vertical Pagination Indicator (Left) */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center space-y-6">
                <div className="text-xs font-bold tracking-widest vertical-text transform -rotate-180 mb-4 opacity-70">
                    0{currentIndex + 1} / 0{packages.length}
                </div>
                <div className="w-[1px] h-32 bg-white/20 relative">
                    <motion.div
                        className="absolute top-0 left-0 w-full bg-brand-secondary"
                        initial={{ height: 0 }}
                        animate={{ height: `${((currentIndex + 1) / packages.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
                {packages.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-brand-secondary scale-150' : 'bg-white/40 hover:bg-white'}`}
                    />
                ))}
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 h-full flex items-center pt-20 pb-12 lg:py-0">
                <div className="section-container w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                    {/* Text Content (Left) */}
                    <div className="max-w-xl text-center lg:text-left">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentItem.id}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.6 }}
                            >
                                <motion.h1
                                    className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tighter mb-4 text-shadow"
                                    style={{ lineHeight: 0.9 }}
                                >
                                    {currentItem.destination.split(' ')[0]}
                                </motion.h1>
                                <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 line-clamp-3 max-w-md mx-auto lg:mx-0">
                                    {currentItem.description}
                                </p>
                                <div className="flex items-center justify-center lg:justify-start space-x-6">
                                    <button className="flex items-center space-x-3 bg-brand-primary hover:bg-brand-primary/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all group text-sm sm:text-base">
                                        <span>Explore</span>
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Preview Cards Slider (Right) - Shown on tablet/desktop */}
                    <div className="hidden sm:flex lg:flex items-center space-x-4 lg:space-x-6 overflow-visible lg:pl-12 pr-4 pt-8 lg:py-8 justify-center lg:justify-start">
                        <div className="flex space-x-4 lg:space-x-6 no-scrollbar overflow-x-auto">
                            {packages.map((pkg, idx) => {
                                // Show 3 cards ahead of current index
                                if (idx === currentIndex) return null;
                                return (
                                    <motion.div
                                        key={pkg.id}
                                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                        className="relative min-w-[180px] sm:min-w-[200px] lg:min-w-[240px] h-[260px] sm:h-[300px] lg:h-[340px] rounded-2xl lg:rounded-3xl overflow-hidden glass-card group cursor-pointer"
                                        onClick={() => setCurrentIndex(idx)}
                                    >
                                        <img src={pkg.image_url} alt={pkg.destination} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 right-4">
                                            <div className="flex items-center space-x-1 mb-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <div key={i} className={`w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full ${i < Math.floor(pkg.rating || 5) ? 'bg-white' : 'bg-white/30'}`} />
                                                ))}
                                            </div>
                                            <h3 className="text-sm lg:text-xl font-bold truncate">{pkg.destination}</h3>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-12 left-1/2 lg:left-3/4 -translate-x-1/2 z-20 flex items-center space-x-4">
                <button
                    onClick={handlePrev}
                    className="w-14 h-14 rounded-full glass-card flex items-center justify-center hover:bg-white/20 transition-all border border-white/10"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={handleNext}
                    className="w-14 h-14 rounded-full glass-card flex items-center justify-center hover:bg-white/20 transition-all border border-white/10"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Scroll Down */}
            <div className="absolute bottom-12 left-12 lg:left-24 z-20 hidden md:flex items-center space-x-3 text-white/50 animate-bounce">
                <ChevronDown size={20} />
                <span className="text-xs font-bold tracking-widest uppercase">Scroll Down</span>
            </div>
        </div>
    );
};

export default Hero;

