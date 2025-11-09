// ContactPage.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Phone, Mail, MapPin, Clock, Send, CheckCircle,
    MessageCircle, User, Building, FileText
} from 'lucide-react';
import Navbar from '../components/navbar';
import PremiumFooter from '../components/footer';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
            name: '',
            email: '',
            company: '',
            phone: '',
            service: '',
            message: ''
        });
    };

    const contactInfo = [
        {
            icon: Phone,
            title: "Call Us",
            details: ["+250 788 123 456", "+250 789 987 654"],
            description: "Available Monday to Friday, 8:00 AM - 5:00 PM"
        },
        {
            icon: Mail,
            title: "Email Us",
            details: ["info@carinogroup.rw", "support@carinogroup.rw"],
            description: "We'll respond within 24 hours"
        },
        {
            icon: MapPin,
            title: "Visit Us",
            details: ["KG 123 St, Kimihurura", "Kigali, Rwanda"],
            description: "Schedule an appointment for office visit"
        },
        {
            icon: Clock,
            title: "Business Hours",
            details: ["Monday - Friday: 8:00 AM - 5:00 PM", "Saturday: 9:00 AM - 1:00 PM"],
            description: "Closed on Sundays and public holidays"
        }
    ];

    const services = [
        "Tax Consultancy",
        "Accounting & Bookkeeping",
        "External Audit Support",
        "Business Plan Development",
        "Training & Capacity Building",
        "Management Consultancy",
        "Market Research & Polling",
        "Other"
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            {/* Hero Section */}
            <div className="relative bg-gray-900 py-20">
                <div className="absolute inset-0 bg-black/70"></div>
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80')"
                    }}
                ></div>
                
                <div className="relative max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                    >
                        Get In Touch
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
                    >
                        Ready to streamline your financial future? Let's start the conversation.
                    </motion.p>
                </div>
            </div>

            {/* Main Content */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    Let's Start Your Financial Success Story
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Whether you're a startup needing tax guidance, an established business seeking audit support, 
                                    or an organization requiring financial training, we're here to help you achieve your goals.
                                </p>
                            </div>

                            {/* Contact Cards */}
                            <div className="space-y-6">
                                {contactInfo.map((item, index) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="bg-white rounded-lg p-6 border border-gray-100 hover:border-[#d4af37]/30 transition-all"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-[#d4af37] rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <IconComponent className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                        {item.title}
                                                    </h3>
                                                    <div className="space-y-1 mb-2">
                                                        {item.details.map((detail, idx) => (
                                                            <p key={idx} className="text-gray-600">
                                                                {detail}
                                                            </p>
                                                        ))}
                                                    </div>
                                                    <p className="text-sm text-gray-500">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Quick Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                viewport={{ once: true }}
                                className="bg-[#d4af37] rounded-lg p-6 text-white"
                            >
                                <h3 className="text-xl font-semibold mb-4">Why Choose Carino Group?</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold">30+</div>
                                        <div className="text-sm">Businesses Served</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold">98%</div>
                                        <div className="text-sm">Success Rate</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold">24h</div>
                                        <div className="text-sm">Response Time</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold">100%</div>
                                        <div className="text-sm">Client Satisfaction</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-lg p-8 border border-gray-100"
                        >
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <CheckCircle className="w-16 h-16 text-[#d4af37] mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        Thank You!
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Your message has been received. We'll get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="bg-[#d4af37] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b8941f] transition-colors"
                                    >
                                        Send Another Message
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-3 mb-6">
                                        <MessageCircle className="w-8 h-8 text-[#d4af37]" />
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            Send Us a Message
                                        </h2>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Full Name *
                                                </label>
                                                <div className="relative">
                                                    <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-colors"
                                                        placeholder="Enter your full name"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Email Address *
                                                </label>
                                                <div className="relative">
                                                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-colors"
                                                        placeholder="Enter your email"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Company Name
                                                </label>
                                                <div className="relative">
                                                    <Building className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                                    <input
                                                        type="text"
                                                        id="company"
                                                        name="company"
                                                        value={formData.company}
                                                        onChange={handleChange}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-colors"
                                                        placeholder="Enter company name"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Phone Number
                                                </label>
                                                <div className="relative">
                                                    <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-colors"
                                                        placeholder="+250 XXX XXX XXX"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Service Interested In *
                                            </label>
                                            <div className="relative">
                                                <FileText className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                                <select
                                                    id="service"
                                                    name="service"
                                                    required
                                                    value={formData.service}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-colors appearance-none"
                                                >
                                                    <option value="">Select a service</option>
                                                    {services.map((service, index) => (
                                                        <option key={index} value={service}>
                                                            {service}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Your Message *
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={6}
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-colors resize-none"
                                                placeholder="Tell us about your financial needs and how we can help..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-[#d4af37] text-white py-4 rounded-lg font-semibold hover:bg-[#b8941f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5" />
                                                    Send Message
                                                </>
                                            )}
                                        </button>

                                        <p className="text-sm text-gray-500 text-center">
                                            * Required fields. We respect your privacy and will never share your information.
                                        </p>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="bg-white py-16 border-t border-gray-100">
                <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Located in the heart of Kigali, we're easily accessible for face-to-face consultations.
                        </p>
                    </motion.div>

                    <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                            <MapPin className="w-12 h-12 mx-auto mb-4 text-[#d4af37]" />
                            <p className="text-lg font-semibold">Interactive Map</p>
                            <p className="text-sm">KG 123 St, Kimihurura, Kigali, Rwanda</p>
                        </div>
                    </div>
                </div>
            </div>

            <PremiumFooter />
        </div>
    );
};

export default ContactPage;