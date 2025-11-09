// components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Menu, X, TrendingUp, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled 
                ? 'bg-white/95 backdrop-blur-md shadow-lg' 
                : 'bg-transparent'
        }`}>
            <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-[#d4af37] to-[#f5d67b] rounded-full flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-[#000000]" />
                        </div>
                        <span className={`text-xl font-bold transition-colors ${
                            scrolled ? 'text-[#000000]' : 'text-[#ffffff]'
                        }`}>
                            Carino Group
                        </span>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {['Home', 'About', 'Services',  'Portfolio', 'Contact'].map((item, index) => (
                            <motion.a
                                key={item}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                href={`${item.toLowerCase()}`}
                                className={`transition-colors text-sm font-medium ${
                                    scrolled 
                                        ? 'text-[#000000] hover:text-[#d4af37]' 
                                        : 'text-[#ffffff] hover:text-[#d4af37]'
                                }`}
                            >
                                {item}
                            </motion.a>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hidden md:flex items-center gap-2 bg-[#d4af37] text-[#000000] px-6 py-2 rounded-md hover:bg-[#f5d67b] transition-all font-medium"
                    >
                        <PhoneCall className="w-4 h-4" />
                        Free Consultation
                    </motion.button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`md:hidden p-2 transition-colors ${
                            scrolled ? 'text-[#000000]' : 'text-[#ffffff]'
                        }`}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-[#d4af37]/20"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {['Home', 'About', 'Services',  'Portfolio', 'Contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`${item.toLowerCase()}`}
                                    className="block text-[#000000] hover:text-[#d4af37] transition-colors py-2 text-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                            <button className="w-full bg-[#d4af37] text-[#000000] px-6 py-3 rounded-md hover:bg-[#f5d67b] transition-all font-medium mt-4 text-center">
                                Free Consultation
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;