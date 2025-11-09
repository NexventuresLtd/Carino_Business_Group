// PortfolioSection.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, ExternalLink, Users, TrendingUp, Target, Award,
    Calendar, BarChart3, CheckCircle, ArrowRight, 
    DollarSign, Clock, UserCheck
} from 'lucide-react';
import PremiumFooter from '../components/footer';
import Navbar from '../components/navbar';

// Portfolio Data with Images
const portfolioData = [
    {
        id: 1,
        title: "Agricultural Cooperative Audit Readiness",
        client: "Rwanda Farmers Cooperative Union",
        category: "Audit & Compliance",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.1&auto=format&fit=crop&w=1000&q=80",
        duration: "3 Months",
        results: {
            saved: "2.5M RWF",
            achieved: "100% Compliance",
            impact: "5 Cooperatives"
        },
        challenge: "Multiple agricultural cooperatives struggling with financial documentation and audit compliance, risking their operational certificates.",
        solution: "Implemented comprehensive accounting systems, trained staff on proper record-keeping, and prepared complete audit documentation.",
        outcomes: [
            "Achieved 100% audit compliance for all cooperatives",
            "Saved 2.5M RWF in potential penalties",
            "Trained 25 cooperative accountants",
            "Streamlined financial reporting processes"
        ],
        testimonial: "Carino Group transformed our financial operations. We passed our external audit with zero findings for the first time."
    },
    {
        id: 2,
        title: "Tax Optimization for Construction Company",
        client: "Favorite Construction Technology Ltd",
        category: "Tax Consultancy",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.1&auto=format&fit=crop&w=1000&q=80",
        duration: "6 Months",
        results: {
            saved: "8M RWF",
            achieved: "95% Optimization",
            impact: "Ongoing Partnership"
        },
        challenge: "Construction company facing significant tax penalties due to improper VAT and WHT declarations across multiple projects.",
        solution: "Conducted comprehensive tax health check, implemented proper accounting systems, and negotiated with RRA for penalty reduction.",
        outcomes: [
            "Reduced tax liabilities by 8M RWF",
            "Implemented automated tax compliance systems",
            "Resolved all pending tax disputes",
            "Established ongoing tax advisory relationship"
        ],
        testimonial: "The tax savings alone paid for their services ten times over. Professional and highly effective."
    },
    {
        id: 3,
        title: "Business Plan for Tech Startup Funding",
        client: "Inuma Technology",
        category: "Business Development",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.1&auto=format&fit=crop&w=1000&q=80",
        duration: "2 Months",
        results: {
            saved: "50M RWF",
            achieved: "Funding Secured",
            impact: "Startup Launched"
        },
        challenge: "Tech startup with innovative product but lacking professional business plan and financial projections to attract investors.",
        solution: "Developed comprehensive business plan with market analysis, financial projections, and investor pitch deck.",
        outcomes: [
            "Secured 50M RWF in seed funding",
            "Developed 5-year financial projections",
            "Created investor-ready pitch materials",
            "Structured revenue model and KPIs"
        ],
        testimonial: "Their business plan was instrumental in securing our first major investment. Exceptional work!"
    },
    {
        id: 4,
        title: "Accounting Software Implementation & Training",
        client: "Multiple SMEs & NGOs",
        category: "Training & Capacity Building",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.1&auto=format&fit=crop&w=1000&q=80",
        duration: "Ongoing",
        results: {
            saved: "Time & Efficiency",
            achieved: "40+ Trained",
            impact: "15 Organizations"
        },
        challenge: "Multiple organizations using manual accounting systems leading to errors, delays, and compliance issues.",
        solution: "Implemented QuickBooks and Sage accounting software with comprehensive staff training and ongoing support.",
        outcomes: [
            "Trained 40+ accountants and administrators",
            "Reduced accounting processing time by 70%",
            "Eliminated manual errors in financial reporting",
            "Enabled real-time financial monitoring"
        ],
        testimonial: "The training transformed how we handle our finances. We're now more efficient and accurate than ever."
    },
    {
        id: 5,
        title: "Financial System Overhaul for Manufacturing",
        client: "T&U Hardware Store Ltd",
        category: "Management Consultancy",
        image: "https://images.unsplash.com/photo-1581094794329-cdcce89df61e?ixlib=rb-4.0.1&auto=format&fit=crop&w=1000&q=80",
        duration: "4 Months",
        results: {
            saved: "15% Costs",
            achieved: "System Optimized",
            impact: "Revenue Growth"
        },
        challenge: "Manufacturing company with disorganized financial systems affecting inventory management and profitability.",
        solution: "Redesigned financial workflows, implemented inventory management systems, and established performance metrics.",
        outcomes: [
            "Reduced operational costs by 15%",
            "Improved inventory turnover by 25%",
            "Implemented automated reporting systems",
            "Enhanced cash flow management"
        ],
        testimonial: "The system overhaul gave us clarity and control over our finances. Highly recommended for any growing business."
    },
    {
        id: 6,
        title: "Market Research for Retail Expansion",
        client: "KAN IMPORT & EXPORT LTD",
        category: "Market Research",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.1&auto=format&fit=crop&w=1000&q=80",
        duration: "3 Months",
        results: {
            saved: "Investment Risk",
            achieved: "Data-Driven Decision",
            impact: "Successful Expansion"
        },
        challenge: "Import/export company planning expansion but lacking market data and consumer insights for informed decision-making.",
        solution: "Conducted comprehensive market research, competitor analysis, and consumer behavior studies.",
        outcomes: [
            "Identified optimal market entry strategy",
            "Provided detailed competitor analysis",
            "Forecasted market demand accurately",
            "Supported 100M RWF expansion decision"
        ],
        testimonial: "The research gave us confidence in our expansion plans. Data-driven insights made all the difference."
    }
];

// Components
const PortfolioPopup = ({ project, isOpen, onClose }: any) => {
    if (!isOpen || !project) return null;

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
                    className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative">
                        {/* Header Image */}
                        <div className="h-64 md:h-80 relative">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover rounded-t-lg"
                            />
                            <div className="absolute inset-0 bg-black/40 rounded-t-lg"></div>
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-black/30 rounded-full p-1"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 md:p-8">
                            {/* Project Header */}
                            <div className="mb-6">
                                <span className="inline-block bg-[#d4af37] text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">
                                    {project.category}
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                    {project.title}
                                </h2>
                                <p className="text-lg text-gray-600 mb-4">{project.client}</p>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{project.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        <span>{project.results.impact}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Results Summary */}
                            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                                <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
                                    <TrendingUp className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-gray-900">{project.results.saved}</div>
                                    <div className="text-sm text-gray-600">Savings/Achieved</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
                                    <Target className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-gray-900">{project.results.achieved}</div>
                                    <div className="text-sm text-gray-600">Success Rate</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
                                    <Award className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-gray-900">{project.results.impact}</div>
                                    <div className="text-sm text-gray-600">Impact Scale</div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Left Column */}
                                <div>
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">The Challenge</h3>
                                        <p className="text-gray-600 leading-relaxed">{project.challenge}</p>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Solution</h3>
                                        <p className="text-gray-600 leading-relaxed">{project.solution}</p>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div>
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Outcomes</h3>
                                        <div className="space-y-3">
                                            {project.outcomes.map((outcome: string, index: number) => (
                                                <div key={index} className="flex items-start gap-3">
                                                    <CheckCircle className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-600">{outcome}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Testimonial */}
                                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                                        <div className="flex items-center gap-2 mb-3">
                                            <BarChart3 className="w-5 h-5 text-[#d4af37]" />
                                            <h4 className="font-semibold text-gray-900">Client Testimonial</h4>
                                        </div>
                                        <p className="text-gray-600 italic">"{project.testimonial}"</p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="mt-8 text-center">
                                <button className="bg-[#d4af37] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#b8941f] transition-colors inline-flex items-center gap-2">
                                    Start Similar Project
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const PortfolioCard = ({ project, onClick }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:border-[#d4af37]/30 transition-all cursor-pointer group"
        onClick={() => onClick(project)}
    >
        <div className="relative overflow-hidden">
            <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
            <div className="absolute top-4 left-4">
                <span className="bg-[#d4af37] text-white px-2 py-1 rounded text-sm font-semibold">
                    {project.category}
                </span>
            </div>
        </div>

        <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#d4af37] transition-colors">
                {project.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{project.client}</p>

            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{project.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-semibold text-[#d4af37]">{project.results.saved}</span>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-[#d4af37] font-semibold text-sm">View Case Study</span>
                <ExternalLink className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    </motion.div>
);

const PortfolioFilters = ({ activeFilter, onFilterChange }: any) => {
    const filters = ["All", "Audit & Compliance", "Tax Consultancy", "Business Development", "Training & Capacity Building", "Management Consultancy", "Market Research"];

    return (
        <div className="flex flex-wrap gap-2 justify-center mb-12">
            {filters.map((filter) => (
                <button
                    key={filter}
                    onClick={() => onFilterChange(filter)}
                    className={`px-4 py-2 rounded-full font-semibold transition-colors border ${activeFilter === filter
                            ? 'bg-[#d4af37] text-white border-[#d4af37]'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-[#d4af37] hover:text-[#d4af37]'
                        }`}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
};

const HeroSection = () => (
    <div className="relative bg-gray-900 min-h-[70vh] flex items-center justify-center">
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
        <div className="relative z-10 max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
                Our Portfolio
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8"
            >
                Real-world financial solutions and measurable results for businesses across Rwanda
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-gray-300"
            >
                <div className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-[#d4af37]" />
                    <span>30+ Projects Completed</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-gray-400"></div>
                <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#d4af37]" />
                    <span>100M+ Funding Secured</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-gray-400"></div>
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#d4af37]" />
                    <span>98% Success Rate</span>
                </div>
            </motion.div>
            
            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8"
            >
                <button className="bg-[#d4af37] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#b8941f] transition-colors inline-flex items-center gap-2">
                    View Case Studies
                    <ArrowRight className="w-4 h-4" />
                </button>
            </motion.div>
        </div>
    </div>
);

// Main Portfolio Section Component
const PortfolioSection = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredProjects = activeFilter === "All"
        ? portfolioData
        : portfolioData.filter(project => project.category === activeFilter);

    return (
        <div className="min-h-screen bg-white">
            <Navbar/>
            <HeroSection />

            <div className="py-20 bg-gray-50">
                <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Filters */}
                    <PortfolioFilters
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                    />

                    {/* Portfolio Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <PortfolioCard
                                key={project.id}
                                project={project}
                                onClick={setSelectedProject}
                            />
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredProjects.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <p className="text-gray-500 text-lg">No projects found for the selected filter.</p>
                        </motion.div>
                    )}

                    {/* Stats Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="mt-16 bg-white rounded-2xl p-8 text-center border border-gray-100"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Portfolio Impact Summary</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                                <div className="text-3xl font-bold text-[#d4af37]">30+</div>
                                <div className="text-gray-600">Projects Completed</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-[#d4af37]">100M+</div>
                                <div className="text-gray-600">Funding Secured</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-[#d4af37]">8M+</div>
                                <div className="text-gray-600">Tax Savings</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-[#d4af37]">40+</div>
                                <div className="text-gray-600">Professionals Trained</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Project Popup */}
            <PortfolioPopup
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
            <PremiumFooter/>
        </div>
    );
};

export default PortfolioSection;