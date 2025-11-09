import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Types
interface NavItem {
  label: string;
  href: string;
}

// Navigation Component
const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const navItems: NavItem[] = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Team', href: '#team' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'News', href: '#news' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white shadow-sm'
          : 'bg-white/10 backdrop-blur-md border-b border-white/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#d4af37] to-[#f5d67b] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">₿</span>
            </div>
            <span className={`font-bold text-xl ${isScrolled ? 'text-black' : 'text-white'}`}>
              Finance
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -2 }}
                className={`text-sm font-medium transition-colors ${
                  isScrolled
                    ? 'text-gray-700 hover:text-[#d4af37]'
                    : 'text-white hover:text-[#f5d67b]'
                }`}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              isScrolled
                ? 'bg-[#d4af37] text-white hover:bg-[#c49d2e]'
                : 'bg-white text-black hover:bg-[#f5d67b]'
            }`}
          >
            Get Started
          </motion.button>

          {/* Mobile Menu Button */}
          <button className="md:hidden">
            <svg
              className={`w-6 h-6 ${isScrolled ? 'text-black' : 'text-white'}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

// Hero Component
const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const features = [
    {
      number: '01',
      title: 'Vision to plan',
      description: 'We will work together to identify your financial goals',
      link: 'Click to view',
    },
    {
      number: '02',
      title: 'Plan to execute',
      description: 'We will assist you in bringing your plan to life.',
      link: 'Click to view',
    },
    {
      number: '03',
      title: 'Flexible & growth',
      description: 'We will support you in managing your plans effectively',
      link: 'Click to view',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("https://images.unsplash.com/photo-1560472355-536de3962603?w=1600&q=80")',
          }}
        />
      </motion.div>

      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-0" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Hero Text */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-sm font-medium">
                Professional financial consultant
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Giving ideas for
              <br />
              your investments
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex justify-center space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-[#d4af37] text-white rounded-full font-medium hover:bg-[#c49d2e] transition-all shadow-lg hover:shadow-xl"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-medium hover:bg-white/30 transition-all"
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.number}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.2, duration: 0.8 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative group"
              >
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 h-full transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/40">
                  <div className="flex flex-col h-full">
                    <div className="text-[#d4af37] text-5xl font-bold mb-4 opacity-50">
                      {feature.number}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-200 mb-6 flex-grow text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className="text-[#f5d67b] font-medium text-sm inline-flex items-center group-hover:text-[#d4af37] transition-colors"
                    >
                      {feature.link}
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M9 5l7 7-7 7"></path>
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      
      {/* Spacer for scroll demo */}
      <div className="h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600 text-lg">Scroll to see the navigation effect</p>
      </div>
    </div>
  );
};

export default App;