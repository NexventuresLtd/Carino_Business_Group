import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ArrowRight, Phone, Mail } from 'lucide-react';

// Navigation Component
const Navigation: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        const unsubscribe = scrollY.on('change', (latest) => {
            setIsScrolled(latest > 50);
        });
        return () => unsubscribe();
    }, [scrollY]);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-sm'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex-shrink-0"
                    >
                        <a href="#home" className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#f5d67b] rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">C</span>
                            </div>
                            <span className={`text-xl font-bold transition-colors ${isScrolled ? 'text-black' : 'text-white'
                                }`}>
                                Carino
                            </span>
                        </a>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className={`text-sm font-medium transition-colors hover:text-[#d4af37] ${isScrolled ? 'text-black' : 'text-white'
                                    }`}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 }}
                            className="bg-[#d4af37] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#f5d67b] transition-colors"
                        >
                            Get Started
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-black' : 'text-white'
                            }`}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial={false}
                animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md"
            >
                <div className="px-4 py-4 space-y-3">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="block text-black hover:text-[#d4af37] font-medium transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <button className="w-full bg-[#d4af37] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#f5d67b] transition-colors">
                        Get Started
                    </button>
                </div>
            </motion.div>
        </motion.nav>
    );
};

// Hero Component
const Hero: React.FC = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="bg-black/70 z-10 absolute w-full h-full" ></div>
                <video src="/3dVideo/fina_annimation.mp4" autoPlay loop muted className="absolute inset-0 w-full h-full object-cover" />
            </div>

            {/* Content */}
            <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    {/* Top Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2"
                    >
                        <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse" />
                        <span className="text-white/90 text-sm font-medium">Streamlining Rwanda's Financial Future</span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight"
                    >
                        Professional{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f5d67b]">
                            Accounting
                        </span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5d67b] to-[#d4af37]">
                            & Tax Solutions
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed"
                    >
                        Empowering Rwandan businesses, cooperatives, and NGOs with expert accounting,
                        tax consultancy, and business development services. Build solid financial foundations with us.
                    </motion.p>

                    {/* Stats Glass Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8"
                    >
                        {[
                            { value: '600M+', label: 'RWF Revenue Managed' },
                            { value: '30+', label: 'Active Clients' },
                            { value: '100M+', label: 'Funding Secured' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1 + index * 0.1 }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
                            >
                                <div className="text-3xl font-bold text-[#d4af37] mb-2">{stat.value}</div>
                                <div className="text-sm text-gray-300">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
                    >
                        <button className="group bg-[#d4af37] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#f5d67b] transition-all flex items-center space-x-2 shadow-lg shadow-[#d4af37]/20">
                            <span>Get Started</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all">
                            View Portfolio
                        </button>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6 }}
                        className="flex flex-wrap items-center justify-center gap-6 pt-8 text-gray-400 text-sm"
                    >
                        <a href="tel:+2501234567" className="flex items-center space-x-2 hover:text-[#d4af37] transition-colors">
                            <Phone className="w-4 h-4" />
                            <span>+250 123 4567</span>
                        </a>
                        <a href="mailto:info@carino.rw" className="flex items-center space-x-2 hover:text-[#d4af37] transition-colors">
                            <Mail className="w-4 h-4" />
                            <span>info@carino.rw</span>
                        </a>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
                >
                    <motion.div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
};

// Main App Component
const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-black">
            <Navigation />
            <Hero />

            {/* Placeholder sections for scroll effect */}
            <section className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-black mb-4">About Us</h2>
                    <p className="text-gray-600">More sections coming soon...</p>
                </div>
            </section>
        </div>
    );
};

export default App;