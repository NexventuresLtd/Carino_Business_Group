// components/AboutHeroSection.jsx
import { motion } from 'framer-motion';
import {  Users, ArrowDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const AboutHeroSection = () => {
    const [currentStat, setCurrentStat] = useState(0);

    const stats = [
        { number: "30+", label: "Businesses Empowered" },
        { number: "600M+", label: "Revenue Managed" },
        { number: "40+", label: "Professionals Trained" },
        { number: "8M+", label: "Tax Savings" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStat((prev) => (prev + 1) % stats.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [stats.length]);

    const scrollToContent = () => {
        document.getElementById('about-content')?.scrollIntoView({ 
            behavior: 'smooth' 
        });
    };

    return (
        <div className="relative h-[60vh] bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-72 h-72 bg-[#d4af37] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#f5d67b] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#d4af37] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>
            </div>

            {/* Grid Pattern Overlay */}
           <img src="sml.jpg" className='w-full h-full object-cover object-left-center z-0 absolute' />
           <div className='w-full h-full bg-black/70 z-0 absolute' />
            <div className="relative max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-2"
                    >

                        {/* Main Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
                        >
                            Building Rwanda's
                            <span className="bg-gradient-to-r from-[#d4af37] to-[#f5d67b] bg-clip-text text-transparent">
                                {" "}Financial
                            </span>
                            <br />
                            Future Together
                        </motion.h1>

         

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4"
                        >
                            {stats.slice(0, 4).map((stat) => (
                                <div key={stat.label} className="text-left">
                                    <motion.div
                                        key={currentStat}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-2xl sm:text-3xl font-bold text-[#d4af37] mb-1"
                                    >
                                        {stat.number}
                                    </motion.div>
                                    <div className="text-sm text-gray-400 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={scrollToContent}
                                className="bg-gradient-to-r from-[#d4af37] to-[#f5d67b] text-gray-900 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all flex items-center justify-center gap-3"
                            >
                                <Users className="w-5 h-5" />
                                Discover Our Story
                                <ArrowDown className="w-4 h-4" />
                            </motion.button>
                            
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all"
                            >
                                Meet The Team
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Visual Elements */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Main Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 relative overflow-hidden"
                        >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-5">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37] rounded-full blur-2xl"></div>
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#f5d67b] rounded-full blur-2xl"></div>
                            </div>

                            <div className="relative space-y-6">
                                {/* Icon Grid */}

                                {/* Content */}
                                <div className="space-y-4">
                                    <motion.h3
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 }}
                                        className="text-2xl font-bold text-white"
                                    >
                                        Trusted by Rwanda's Growing Businesses
                                    </motion.h3>
                                    
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.9 }}
                                        className="text-gray-300 leading-relaxed"
                                    >
                                        From startups to established enterprises, we provide the financial 
                                        clarity and strategic guidance needed to thrive in Rwanda's dynamic 
                                        economic landscape.
                                    </motion.p>

                                    {/* Client Logos Placeholder */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.0 }}
                                        className="flex items-center gap-4 pt-4"
                                    >
                                        {[1, 2, 3, 4].map((item) => (
                                            <div
                                                key={item}
                                                className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center"
                                            >
                                                <div className="w-8 h-8 bg-[#d4af37]/20 rounded-lg"></div>
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Elements */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                            className="absolute -top-4 -right-4 bg-gradient-to-br from-[#d4af37] to-[#f5d67b] text-gray-900 px-4 py-2 rounded-full font-semibold text-sm shadow-2xl"
                        >
                            ✓ Trusted Partner
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4 }}
                            className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-sm border border-white/10 text-white px-4 py-2 rounded-full font-semibold text-sm"
                        >
                            🏆 Excellence Award
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <motion.button
                    onClick={scrollToContent}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-white/60 hover:text-white transition-colors"
                >
                    <ArrowDown className="w-6 h-6" />
                </motion.button>
            </motion.div>
        </div>
    );
};

export default AboutHeroSection;