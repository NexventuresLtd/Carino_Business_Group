// components/PremiumFooter.jsx
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
    MapPin, 
    Phone, 
    Mail, 
    Facebook, 
    Twitter, 
    Linkedin, 
    Instagram,
    ArrowUp,
    FileText,
    Users,
    Building,
    ChevronRight,
    Sparkles
} from 'lucide-react';
import { useState, useEffect } from 'react';

const PremiumFooter = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
            clearInterval(timer);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const footerColumns = [
        {
            title: "Carino Group",
            description: "Streamlining Rwanda's Financial Future",
            icon: Sparkles,
            links: [
                { 
                    name: "KG 123 St, Kimihurura", 
                    description: "Kigali, Rwanda",
                    icon: MapPin
                },
                { 
                    name: "+250 788 123 456", 
                    description: "Mon-Fri: 8AM-6PM",
                    icon: Phone
                },
                { 
                    name: "hello@carino.rw", 
                    description: "Response within 2 hours",
                    icon: Mail
                }
            ],
            social: true
        },
        {
            title: "Our Services",
            icon: FileText,
            links: [
                { name: "Tax Consultancy", description: "VAT, WHT & Income Tax" },
                { name: "Accounting & Bookkeeping", description: "Monthly & Annual" },
                { name: "External Audit Support", description: "Compliance Ready" },
                { name: "Business Plan Development", description: "Investor Ready" },
                { name: "Training & Capacity Building", description: "Professional Development" },
                { name: "Management Consultancy", description: "Strategic Planning" }
            ]
        },
        {
            title: "Industries",
            icon: Building,
            links: [
                { name: "Startups & SMEs", description: "Early Stage Support" },
                { name: "NGOs & Cooperatives", description: "Social Impact Focus" },
                { name: "Construction", description: "Project Accounting" },
                { name: "Import & Export", description: "Trade Compliance" },
                { name: "Technology", description: "Scale-up Solutions" },
                { name: "Agriculture", description: "Cooperative Support" }
            ]
        },
        {
            title: "Company",
            icon: Users,
            links: [
                { name: "About Carino", description: "Our Story & Mission" },
                { name: "Case Studies", description: "Success Stories" },
                { name: "Careers", description: "Join Our Team" },
                { name: "Blog & Insights", description: "Industry Updates" },
                { name: "Contact Sales", description: "Get Custom Quote" },
                { name: "Support Portal", description: "Client Resources" }
            ]
        }
    ];

    const socialLinks = [
        { 
            icon: Linkedin, 
            href: "#", 
            label: "LinkedIn",
            gradient: "from-blue-600 to-blue-800",
            hover: "hover:from-blue-500 hover:to-blue-700"
        },
        { 
            icon: Twitter, 
            href: "#", 
            label: "Twitter",
            gradient: "from-sky-400 to-sky-600",
            hover: "hover:from-sky-300 hover:to-sky-500"
        },
        { 
            icon: Facebook, 
            href: "#", 
            label: "Facebook",
            gradient: "from-blue-500 to-blue-700",
            hover: "hover:from-blue-400 hover:to-blue-600"
        },
        { 
            icon: Instagram, 
            href: "#", 
            label: "Instagram",
            gradient: "from-purple-500 to-pink-500",
            hover: "hover:from-purple-400 hover:to-pink-400"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants:Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-white overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#d4af37] rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#f5d67b] rounded-full blur-3xl"></div>
            </div>

            {/* Main Footer Content - Single Row */}
            <div className="relative max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                {/* Single Row: 4-Column Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
                >
                    {footerColumns.map((column, columnIndex) => {
                        const IconComponent = column.icon;
                        return (
                            <motion.div
                                key={column.title}
                                variants={itemVariants}
                                custom={columnIndex * 0.1}
                                className="space-y-6"
                            >
                                {/* Column Header */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#d4af37]/10 rounded-xl flex items-center justify-center">
                                        <IconComponent className="w-5 h-5 text-[#d4af37]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{column.title}</h3>
                                        {column.description && (
                                            <p className="text-gray-400 text-sm mt-1">{column.description}</p>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Links List */}
                                <ul className="space-y-4">
                                    {column.links.map((link, linkIndex) => {
                                        // const LinkIcon = null;
                                        return (
                                            <motion.li
                                                key={link.name}
                                                variants={itemVariants}
                                                custom={(columnIndex * 0.1) + (linkIndex * 0.05)}
                                            >
                                                <motion.a
                                                    href="#"
                                                    whileHover={{ 
                                                        x: 5, 
                                                        color: "#d4af37",
                                                        transition: { type: "spring", stiffness: 400 }
                                                    }}
                                                    className="text-gray-400 hover:text-[#d4af37] transition-all duration-200 flex items-start gap-3 group"
                                                >
                                                    {/* {LinkIcon ? (
                                                        // <LinkIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500 group-hover:text-[#d4af37] transition-colors" />
                                                    ) : (
                                                    )} */}
                                                        <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[#d4af37]" />
                                                    <div className="flex-1">
                                                        <div className="font-medium group-hover:text-[#d4af37] transition-colors">
                                                            {link.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                                                            {link.description}
                                                        </div>
                                                    </div>
                                                </motion.a>
                                            </motion.li>
                                        );
                                    })}
                                </ul>

                                {/* Social Links for First Column */}
                                {column.social && (
                                    <motion.div
                                        variants={itemVariants}
                                        className="pt-4 border-t border-gray-800"
                                    >
                                        <h4 className="text-sm font-semibold text-gray-300 mb-3">
                                            Follow Us
                                        </h4>
                                        <div className="flex gap-2">
                                            {socialLinks.map((social, index) => {
                                                const SocialIcon = social.icon;
                                                return (
                                                    <motion.a
                                                        key={social.label}
                                                        href={social.href}
                                                        variants={itemVariants}
                                                        custom={index * 0.1}
                                                        whileHover={{ 
                                                            scale: 1.1, 
                                                            y: -2,
                                                            transition: { type: "spring", stiffness: 400 }
                                                        }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className={`w-10 h-10 bg-gradient-to-br ${social.gradient} rounded-lg flex items-center justify-center shadow-lg ${social.hover} transition-all duration-300`}
                                                        aria-label={social.label}
                                                    >
                                                        <SocialIcon className="w-4 h-4 text-white" />
                                                    </motion.a>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Newsletter for First Column */}
                                {column.social && (
                                    <motion.div
                                        variants={itemVariants}
                                        className="pt-4"
                                    >
                                        <h4 className="text-sm font-semibold text-gray-300 mb-3">
                                            Stay Updated
                                        </h4>
                                        <div className="space-y-2">
                                            <input 
                                                type="email" 
                                                placeholder="Enter your email"
                                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#d4af37] focus:border-transparent text-white placeholder-gray-500 text-sm transition-all"
                                            />
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full bg-gradient-to-r from-[#d4af37] to-[#f5d67b] text-gray-900 px-3 py-2 rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
                                            >
                                                Subscribe
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="border-t border-gray-800 pt-8 mt-12"
                >
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                        {/* Copyright */}
                        <motion.div variants={itemVariants} className="text-center lg:text-left">
                            <p className="text-gray-400 text-sm">
                                © {currentTime.getFullYear()} Carino Business Group. All rights reserved.
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                                Kigali, Rwanda • {currentTime.toLocaleTimeString('en-US', { 
                                    hour: '2-digit', 
                                    minute: '2-digit',
                                    hour12: true 
                                })}
                            </p>
                        </motion.div>

                        {/* Legal Links */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap justify-center gap-4 text-sm text-gray-400"
                        >
                            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"].map((item, index) => (
                                <motion.a
                                    key={item}
                                    href="#"
                                    variants={itemVariants}
                                    custom={index * 0.1}
                                    whileHover={{ 
                                        color: "#d4af37",
                                        scale: 1.05
                                    }}
                                    className="transition-colors hover:text-[#d4af37] text-xs"
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll to Top Button */}
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0, y: 20 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f5d67b] rounded-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center group"
                    >
                        <ArrowUp className="w-5 h-5 text-gray-900" />
                    </motion.button>
                )}
            </AnimatePresence>
        </footer>
    );
};

export default PremiumFooter;