// components/PremiumFooter.jsx
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
    MapPin,
    Mail,
    Linkedin,
    Instagram,
    ArrowUp,
    ChevronRight,
    PhoneCall
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

    interface FooterLink {
        name: string;
        icon?: any;
    }

    interface FooterColumn {
        title: string;
        links: FooterLink[];
    }

    const footerColumns: FooterColumn[] = [
        {
            title: "Contact",
            links: [
                {
                    name: "KG 123 St, Kimihurura",
                    icon: MapPin
                },
                {
                    name: "+250 788 123 456",
                    icon: PhoneCall
                },
                {
                    name: "hello@carino.rw",
                    icon: Mail
                }
            ]
        },
        {
            title: "Company",
            links: [
                { name: "About" },
                // { name: "Careers" },
                { name: "Blog" },
                { name: "Contact" }
            ]
        }
        , {
            title: "Services",
            links: [
                { name: "Tax Consultancy" },
                { name: "Accounting" },
                { name: "Audit Support" },
                { name: "Business Planning" }
            ]
        }
        ,


        {
            title: "Subscriptions",
            links: [
                { name: "Subscribe To Our Newsletter to stay updated on our latest news and offers" },
            ]
        }
    ];

    const socialLinks = [
        {
            icon: Linkedin,
            href: "#",
            label: "LinkedIn"
        },
        {
            icon: Instagram,
            href: "#",
            label: "Instagram"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    return (
        <footer className="relative bg-gray-50 text-gray-800 border-t border-gray-100">
            <h3 className='text-center py-10 font-bold text-2xl poppins'>Looking for financial advisor? <a href='/contact' className='text-primary font-bold underline underline-offset-8'>Send Message</a></h3>
            {/* Main Footer Content */}
            <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                {/* Grid Layout */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
                >
                    {footerColumns.map((column) => (
                        <motion.div
                            key={column.title}
                            variants={itemVariants}
                            className="space-y-4"
                        >
                            <h3 className="text-sm poppins font-semibold text-gray-900 uppercase tracking-wider">
                                {column.title}
                            </h3>

                            <ul className="space-y-2">
                                {column.links.map((link) => (
                                    <motion.li
                                        key={link.name}
                                        variants={itemVariants}
                                    >
                                        <motion.a
                                            href={`/${link.name.toLowerCase()}`}
                                            whileHover={{
                                                x: 3,
                                                color: "#1a1a1a",
                                                transition: { type: "spring", stiffness: 400 }
                                            }}
                                            className="text-gray-600 hover:text-gray-900 transition-all duration-200 flex items-center gap-2 text-sm"
                                        >
                                            {link.icon ? (
                                                <link.icon className="w-3 h-3 flex-shrink-0" />
                                            ) : (
                                                <ChevronRight className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100" />
                                            )}
                                            <span>{link.name}</span>
                                        </motion.a>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Social Links for Contact Column */}
                            {column.title === "Contact" && (
                                <motion.div
                                    variants={itemVariants}
                                    className="pt-4 mt-4 border-t border-gray-100"
                                >
                                    <div className="flex gap-3">
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
                                                    whileTap={{ scale: 0.95 }}
                                                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                                                    aria-label={social.label}
                                                >
                                                    <SocialIcon className="w-4 h-4 text-gray-700" />
                                                </motion.a>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                            {column.title === "Subscriptions" && (
                                <motion.div
                                    variants={itemVariants}
                                    className="pt-4 mt-4 border-t border-gray-100"
                                >
                                    <form className="flex flex-col sm:flex-row gap-3">
                                        <input
                                            type="email"
                                            placeholder="Your email address"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        />
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200"
                                        >
                                            Subscribe
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="border-t border-gray-100 pt-8 mt-12"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Copyright */}
                        <motion.div
                            variants={itemVariants}
                            className="text-center md:text-left"
                        >
                            <p className="text-gray-500 text-sm">
                                © {currentTime.getFullYear()} Carino Business Group
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                                Kigali, Rwanda
                            </p>
                        </motion.div>

                        {/* Legal Links */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap justify-center gap-4 text-xs text-gray-500"
                        >
                            {["Privacy", "Terms", "Disclaimer"].map((item, index) => (
                                <motion.a
                                    key={item}
                                    href="#"
                                    variants={itemVariants}
                                    custom={index * 0.1}
                                    whileHover={{
                                        color: "#1a1a1a",
                                        scale: 1.05
                                    }}
                                    className="transition-colors duration-200"
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
                        whileHover={{ scale: 1.05, backgroundColor: "#f5f5f5" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 z-50 w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                    >
                        <ArrowUp className="w-4 h-4 text-gray-700" />
                    </motion.button>
                )}
            </AnimatePresence>
        </footer>
    );
};

export default PremiumFooter;