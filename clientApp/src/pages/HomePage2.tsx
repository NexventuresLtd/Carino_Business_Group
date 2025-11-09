import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

// Types
interface NavLink {
  label: string;
  href: string;
}

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

  const navLinks: NavLink[] = [
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
          : 'bg-white/10 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className={`text-xl font-bold ${isScrolled ? 'text-secondary' : 'text-white'}`}>
              Finance
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -2 }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isScrolled
                    ? 'text-secondary hover:bg-gray-100'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:block px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Get Started
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg ${
              isScrolled ? 'text-secondary' : 'text-white'
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white border-t"
        >
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg text-secondary hover:bg-gray-100 font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button className="w-full px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Get Started
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

// Hero Component
const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants:Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.section
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black to-black"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <motion.div variants={itemVariants} className="inline-block mb-4">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Professional finance solutions
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary mb-6 leading-tight"
            >
              Giving ideas for
              <br />
              <span className="text-primary">your investments</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Transform your financial future with expert guidance and innovative solutions tailored to your unique goals.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary text-white rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-primary/90 transition-colors"
              >
                <span>Get Started</span>
                <ArrowRight size={20} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-secondary rounded-lg font-medium border-2 border-gray-200 hover:border-primary transition-colors"
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0"
            >
              {[
                { value: '260+', label: 'Expert advisors' },
                { value: '200+', label: 'Client success' },
                { value: '98%', label: 'Satisfaction' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Image/Visual */}
          <motion.div
            variants={itemVariants}
            className="relative hidden lg:block"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              {/* Glass Card */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
                <div className="space-y-6">
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                    <div className="text-6xl font-bold text-primary">📊</div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-3 bg-gray-200 rounded-full w-3/4" />
                    <div className="h-3 bg-gray-200 rounded-full w-1/2" />
                    <div className="flex space-x-2 pt-4">
                      <div className="h-10 flex-1 bg-primary/20 rounded-lg" />
                      <div className="h-10 flex-1 bg-accent/20 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-white rounded-xl p-4 border border-gray-200"
              >
                <div className="text-3xl">💰</div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-white rounded-xl p-3 border border-gray-200"
              >
                <div className="text-2xl">📈</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-text">
      <Navigation />
      <Hero />
      
      {/* Placeholder sections for scroll effect */}
      <section className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-secondary mb-4">More sections coming...</h2>
          <p className="text-muted">Scroll to see the navigation change</p>
        </div>
      </section>
    </div>
  );
};

export default App;