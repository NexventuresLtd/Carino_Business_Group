// components/Hero.jsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: "Streamlining Rwanda's Financial Future",
            subtitle: "Professional Finance & Business Consulting",
            bgImage: "url('sml.jpg')"
        },
        {
            title: "Building Solid Financial Foundations",
            subtitle: "Accounting & Tax Consultancy",
            bgImage: "url('sml.jpg')"
        },
        {
            title: "Empowering Businesses to Thrive",
            subtitle: "Business Development & Training",
            bgImage: "url('sml.jpg')"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative h-[90vh] overflow-hidden">
            {/* Background Image with Slide Change */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                style={{ backgroundImage: slides[currentSlide].bgImage }}
            />
            
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/80 via-[#000000]/60 to-[#000000]/40 z-10" />

            {/* Content */}
            <div className="relative z-20 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-7xl flex flex-col items-center text-center mx-auto"
                        >
                            <motion.p
                                className="text-[#d4af37] hidden text-sm sm:text-base font-medium mb-4 uppercase tracking-wider"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                {slides[currentSlide].subtitle}
                            </motion.p>
                            <motion.h1
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#ffffff] mb-8 leading-tight"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {slides[currentSlide].title}
                            </motion.h1>
                            <motion.p
                                className="text-lg sm:text-xl hidden text-[#ffffff]/90 mb-8 max-w-2xl leading-relaxed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                Empowering Rwandan businesses with professional accounting, tax consultancy, 
                                and business development services tailored to Rwanda's unique financial ecosystem.
                            </motion.p>
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="bg-[#d4af37] text-[#000000] px-8 py-4 rounded-md font-semibold hover:bg-[#f5d67b] transition-all shadow-lg hover:shadow-xl uppercase tracking-wide"
                            >
                                Get Started Now
                            </motion.button>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 bg-[#ffffff]/10 hover:bg-[#d4af37] p-3 rounded-full backdrop-blur-sm transition-all group"
                >
                    <ChevronLeft className="w-6 h-6 text-[#ffffff] group-hover:text-[#000000]" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 bg-[#ffffff]/10 hover:bg-[#d4af37] p-3 rounded-full backdrop-blur-sm transition-all group"
                >
                    <ChevronRight className="w-6 h-6 text-[#ffffff] group-hover:text-[#000000]" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                index === currentSlide
                                    ? 'bg-[#d4af37] w-8'
                                    : 'bg-[#ffffff]/50 hover:bg-[#ffffff]'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;