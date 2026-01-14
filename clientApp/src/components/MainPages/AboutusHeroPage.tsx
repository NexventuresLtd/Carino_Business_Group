// components/AboutHeroSection.jsx
import { motion } from 'framer-motion';
import {  Users, ArrowDown } from 'lucide-react';

const AboutHeroSection = () => {

    const scrollToContent = () => {
        document.getElementById('about-content')?.scrollIntoView({ 
            behavior: 'smooth' 
        });
    };

    return (
        <div className="relative min-h-[60vh] bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-72 h-72 bg-[#d4af37] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#f5d67b] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#d4af37] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>
            </div>

            {/* Grid Pattern Overlay */}
           <img src="/sml.jpg" className='w-full h-full object-cover object-left-center z-0 absolute' />
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

         

                        <p className='max-w-2xl mt-3 hidden'>
                            Welcome to carino busines get to know us one of the best in the wrols kiki the ass
                            jomunia ywtu soze turyire   
                            Welcome to carino busines get to know us one of the best in the wrols kiki the ass
                            jomunia ywtu soze turyire 
                        </p>
                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex hidden flex-col sm:flex-row gap-4 pt-4"
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