// ServicesPage.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
     TrendingUp, Users, Shield, FileText,
    X, CheckCircle, ArrowRight, 
    BookOpen, Calculator, PieChart, LineChart, Users as UsersIcon
} from 'lucide-react';
import Navbar from '../components/navbar';
import PremiumFooter from '../components/footer';

// Service Data
const servicesData = [
    {
        id: 1,
        number: "01",
        title: "Tax Consultancy",
        shortDescription: "VAT, WHT, income tax declarations, tax planning and compliance, penalty avoidance strategies.",
        fullDescription: "Comprehensive tax consultancy services designed to ensure compliance while optimizing your tax position. We navigate Rwanda's complex tax landscape to help you avoid penalties and maximize savings.",
        score: "30+ CLIENTS",
        icon: Calculator,
        features: [
            "VAT, WHT, and income tax declarations",
            "Strategic tax planning and compliance",
            "Penalty avoidance and resolution strategies",
            "Tax optimization for businesses",
            "Regular tax health checks",
            "Representation before tax authorities"
        ],
        benefits: [
            "Reduce tax liabilities legally",
            "Avoid penalties and interest charges",
            "Ensure full compliance with RRA",
            "Strategic tax planning for growth",
            "Professional representation"
        ]
    },
    {
        id: 2,
        number: "02",
        title: "Accounting & Bookkeeping",
        shortDescription: "Monthly and annual bookkeeping, ledger management, reconciliations, and financial reporting.",
        fullDescription: "Professional accounting services that maintain accurate financial records, ensuring your business operations are transparent and audit-ready at all times.",
        score: "600M+ RWF",
        icon: BookOpen,
        features: [
            "Monthly and annual bookkeeping",
            "General ledger management",
            "Bank and account reconciliations",
            "Financial statement preparation",
            "Accounts payable/receivable management",
            "Fixed asset register maintenance"
        ],
        benefits: [
            "Accurate financial records",
            "Timely financial reporting",
            "Improved cash flow management",
            "Better business decision-making",
            "Audit-ready at all times"
        ]
    },
    {
        id: 3,
        number: "03",
        title: "External Audit Support",
        shortDescription: "Preparation for external audits, ensuring documentation compliance, and liaison with auditors.",
        fullDescription: "End-to-end audit support services that prepare your organization for successful external audits while ensuring complete documentation compliance.",
        score: "98% SUCCESS",
        icon: Shield,
        features: [
            "Complete audit preparation",
            "Documentation compliance review",
            "Liaison between business and auditors",
            "Audit response strategy",
            "Compliance certificate support",
            "Post-audit implementation support"
        ],
        benefits: [
            "Smooth audit processes",
            "Reduced audit findings",
            "Maintained compliance certificates",
            "Professional auditor liaison",
            "Continuous compliance improvement"
        ]
    },
    {
        id: 4,
        number: "04",
        title: "Business Plan Development",
        shortDescription: "Structuring investor-ready business plans, market research, and financial modeling.",
        fullDescription: "Comprehensive business plan development services that create compelling, investor-ready documents backed by thorough market research and realistic financial projections.",
        score: "100M+ FUNDED",
        icon: FileText,
        features: [
            "Investor-ready business plans",
            "Comprehensive market research",
            "Financial modeling and projections",
            "KPI development and alignment",
            "Executive summary development",
            "Pitch deck preparation"
        ],
        benefits: [
            "Secure funding and investment",
            "Clear business roadmap",
            "Investor confidence",
            "Strategic goal alignment",
            "Professional presentation"
        ]
    },
    {
        id: 5,
        number: "05",
        title: "Training & Capacity Building",
        shortDescription: "Software training, taxation principles, and accounting for cooperatives and NGOs.",
        fullDescription: "Professional training programs that build capacity in modern accounting practices, software proficiency, and Rwanda-specific tax regulations.",
        score: "40+ TRAINED",
        icon: Users,
        features: [
            "QuickBooks, Sage, and Excel training",
            "Rwanda taxation principles",
            "Accounting for cooperatives",
            "NGO financial management",
            "Software implementation support",
            "Ongoing professional development"
        ],
        benefits: [
            "Enhanced staff competency",
            "Software proficiency",
            "Updated tax knowledge",
            "Improved operational efficiency",
            "Sustainable skill development"
        ]
    },
    {
        id: 6,
        number: "06",
        title: "Management Consultancy",
        shortDescription: "Financial system optimization, budget creation, and operational efficiency reviews.",
        fullDescription: "Strategic management consultancy that optimizes your financial systems, implements effective budgeting, and enhances overall operational efficiency.",
        score: "95% EFFICIENCY",
        icon: PieChart,
        features: [
            "Financial system optimization",
            "Budget creation and controls",
            "Operational efficiency reviews",
            "Cost reduction strategies",
            "Performance monitoring systems",
            "Strategic planning support"
        ],
        benefits: [
            "Improved financial controls",
            "Cost savings identification",
            "Enhanced operational efficiency",
            "Better resource allocation",
            "Strategic growth planning"
        ]
    },
    {
        id: 7,
        number: "07",
        title: "Market Research & Polling",
        shortDescription: "Research-driven decision support, consumer behavior analysis, and financial forecasting.",
        fullDescription: "Data-driven market research services that provide actionable insights for strategic decision-making and accurate financial forecasting.",
        score: "50+ STUDIES",
        icon: LineChart,
        features: [
            "Market research and analysis",
            "Consumer behavior studies",
            "Competitive intelligence",
            "Financial forecasting models",
            "Data-driven decision support",
            "Industry trend analysis"
        ],
        benefits: [
            "Informed business decisions",
            "Market opportunity identification",
            "Accurate financial forecasts",
            "Competitive advantage",
            "Risk mitigation"
        ]
    }
];

// Types
interface Service {
    id: number;
    number: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    score: string;
    icon: React.ComponentType<any>;
    features: string[];
    benefits: string[];
}

interface ServicePopupProps {
    service: Service | null;
    isOpen: boolean;
    onClose: () => void;
}

interface ServiceCardProps {
    service: Service;
    onClick: (service: Service) => void;
}

// Components
const ServicePopup = ({ service, isOpen, onClose }: ServicePopupProps) => {
    if (!isOpen || !service) return null;

    const IconComponent = service.icon;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center">
                                    <IconComponent className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{service.title}</h2>
                                    <p className="text-[#d4af37] font-semibold">{service.score}</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Overview</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {service.fullDescription}
                                </p>

                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                                    <div className="space-y-2">
                                        {service.features.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <CheckCircle className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                                                <span className="text-gray-600 text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                    <h4 className="font-semibold text-gray-900 mb-4">Benefits You Get</h4>
                                    <div className="space-y-3">
                                        {service.benefits.map((benefit, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-[#d4af37] rounded-full flex-shrink-0"></div>
                                                <span className="text-gray-600 text-sm">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="text-center">
                                    <button className="bg-[#d4af37] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#b8941f] transition-colors w-full">
                                        Get This Service
                                    </button>
                                    <p className="text-gray-500 text-sm mt-3">
                                        Free initial consultation included
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const ServiceCard = ({ service, onClick }: ServiceCardProps) => {
    const IconComponent = service.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-6 hover:bg-gray-50 transition-all cursor-pointer group border border-gray-100"
            onClick={() => onClick(service)}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-[#d4af37] rounded-lg flex items-center justify-center group-hover:bg-[#b8941f] transition-colors">
                    <IconComponent className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-300">{service.number}</span>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">{service.shortDescription}</p>

            <div className="flex items-center justify-between">
                <span className="text-[#d4af37] font-semibold text-sm">{service.score}</span>
                <div className="flex items-center gap-1 text-[#d4af37] group-hover:gap-2 transition-all">
                    <span className="text-sm font-semibold">Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                </div>
            </div>
        </motion.div>
    );
};

const HeroSection = () => (
    <div className="relative h-[70vh] min-h-[500px] bg-gray-900 overflow-hidden">
        {/* Background Image */}
        <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80')"
            }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
            <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                >
                    Professional Financial Services
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8"
                >
                    Streamlining Rwanda's Financial Future with Comprehensive Accounting, Tax, and Business Solutions
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button className="bg-[#d4af37] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#b8941f] transition-colors">
                        Get Started Today
                    </button>
                    <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
                        View Our Portfolio
                    </button>
                </motion.div>
            </div>
        </div>
    </div>
);

const StatsSection = () => (
    <div className="bg-gray-50 py-16">
        <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                    { number: "30+", label: "Businesses Served" },
                    { number: "600M+", label: "Revenue Managed" },
                    { number: "8M+", label: "Tax Savings" },
                    { number: "40+", label: "Professionals Trained" }
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-3xl font-bold text-[#d4af37] mb-2">{stat.number}</div>
                        <div className="text-gray-600">{stat.label}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
);

const ServicesGrid = ({ onServiceClick }: { onServiceClick: (service: Service) => void }) => (
    <div className="py-20 bg-white">
        <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Our Core Services
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Comprehensive financial solutions designed to help Rwandan businesses thrive 
                    in today's competitive landscape.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {servicesData.map((service) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        onClick={onServiceClick}
                    />
                ))}
            </div>
        </div>
    </div>
);

const WhoWeServe = () => (
    <div className="py-20 bg-gray-50">
        <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Who We Serve
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    We specialize in serving diverse business structures across Rwanda's 
                    growing economic landscape.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    {
                        title: "Entrepreneurs & Startups",
                        description: "Navigating taxation, record-keeping, and building solid financial foundations from day one.",
                        icon: UsersIcon
                    },
                    {
                        title: "NGOs & Cooperatives",
                        description: "Audit-readiness, donor compliance, and transparent financial reporting for social impact organizations.",
                        icon: Shield
                    },
                    {
                        title: "Established Businesses",
                        description: "Strategic financial management, tax optimization, and growth planning for scaling enterprises.",
                        icon: TrendingUp
                    },
                    {
                        title: "Aspiring Accountants",
                        description: "Professional training and capacity building in modern accounting practices and software.",
                        icon: BookOpen
                    }
                ].map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-lg p-6 text-center border border-gray-100"
                        >
                            <div className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-4">
                                <IconComponent className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    </div>
);

const CTASection = () => (
    <div className="py-20 bg-[#d4af37] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Streamline Your Financial Operations?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    Join over 30 businesses, cooperatives, and NGOs who trust Carino Business Group 
                    for professional financial management and business development services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-white text-[#d4af37] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Get Free Consultation
                    </button>
                    <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#d4af37] transition-colors">
                        Contact Our Team
                    </button>
                </div>
            </motion.div>
        </div>
    </div>
);

// Main Component
const ServicesPage = () => {
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    return (
        <div className="min-h-screen bg-white">
            <Navbar/>
            <HeroSection />
            <StatsSection />
            <ServicesGrid onServiceClick={setSelectedService} />
            <WhoWeServe />
            <CTASection />

            <ServicePopup
                service={selectedService}
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
            />
            <PremiumFooter/>
        </div>
    );
};

export default ServicesPage;