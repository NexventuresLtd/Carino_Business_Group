// components/AboutMissionSection.jsx
import { motion } from 'framer-motion';
import { Target, Eye, Users, Shield } from 'lucide-react';

const AboutMissionSection = () => {

    const values = [
        {
            icon: Target,
            title: "Precision & Accuracy",
            description: "Every number tells a story. We ensure your financial data is accurate, compliant, and tells the right story to stakeholders and regulators."
        },
        {
            icon: Eye,
            title: "Transparency",
            description: "Clear, honest communication about your financial position. No hidden fees, no surprises - just straightforward professional service."
        },
        {
            icon: Users,
            title: "Partnership",
            description: "We don't just service clients; we build partnerships. Your success is our success, and we're invested in your growth journey."
        },
        {
            icon: Shield,
            title: "Compliance First",
            description: "Rwanda's financial landscape is evolving. We stay ahead of regulatory changes to keep your business compliant and penalty-free."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gray-100 w-11/12 m-auto px-10">
                <div className="words">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6 px-4 sm:px-6 lg:px-8 py-20"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
                            Our Mission & Vision
                        </h2>
                        <p className="text-lg text-[#6b7280] leading-relaxed">
                            At Carino Business Group, our mission is to empower Rwandan businesses with
                            accessible, professional accounting services that drive growth, ensure compliance,
                            and build investor confidence. We envision a future where every enterprise,
                            regardless of size, has the financial clarity and strategic guidance needed to
                            thrive in Rwanda's dynamic economic landscape.
                        </p>
                    </motion.div>
                </div>
                {/* Right Content - Visual Elements */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    {/* Main Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/90 backdrop-blur-sm border border-white/10 rounded-3xl p-8 relative overflow-hidden"
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37] rounded-full blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#f5d67b] rounded-full blur-2xl"></div>
                        </div>

                        <div className="relative space-y-6">
                            {/* Icon Grid */}

                            {/* Content */}
                            <div className="space-y-4">
                                <motion.h3
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="text-2xl font-bold text-gray-700"
                                >
                                    Trusted by Rwanda's Growing Businesses
                                </motion.h3>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 }}
                                    className="text-gray-600 leading-relaxed"
                                >
                                    From startups to established enterprises, we provide the financial
                                    clarity and strategic guidance needed to thrive in Rwanda's dynamic
                                    economic landscape.
                                </motion.p>

                                {/* Client Logos Placeholder */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.0 }}
                                    className="flex items-center gap-4 pt-4"
                                >
                                    {[1, 2, 3, 4].map((item) => (
                                        <div
                                            key={item}
                                            className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center"
                                        >
                                            <div className="w-8 h-8 bg-[#d4af37]/20 rounded-lg"></div>
                                        </div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating Elements */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        className="absolute -top-4 -right-4 bg-gradient-to-br from-[#d4af37] to-[#f5d67b] text-gray-900 px-4 py-2 rounded-full font-semibold text-sm shadow-2xl"
                    >
                        ✓ Trusted Partner
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4 }}
                        className="absolute -bottom-4 -left-4 bg-primary backdrop-blur-sm border border-white/10 text-white px-4 py-2 rounded-full font-semibold text-sm"
                    >
                        🏆 Excellence Award
                    </motion.div>
                </motion.div>
            </div>
            {/* Vision & Mission Section */}
            <div className="relative py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Vision Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <img src="/sml.jpg" alt="" className='h-60 w-full object-cover rounded-lg overflow-hidden' />

                            <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full">
                                <Eye className="w-5 h-5 text-primary" />
                                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                                    Our Vision
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-secondary leading-tight">
                                To become Rwanda's most trusted and accessible accounting partner
                            </h2>
                            <p className="text-lg text-[#6b7280] leading-relaxed">
                                We envision a Rwanda where every business, regardless of size, has access to
                                professional financial guidance that empowers growth, ensures compliance, and
                                builds sustainable success in the evolving East African market.
                            </p>
                        </motion.div>

                        {/* Mission Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-8 border border-gray-100"
                        >
                            <img src="/sml.jpg" alt="" className='h-60 w-full object-cover rounded-lg overflow-hidden' />
                            <div className="inline-flex items-center gap-2 bg-primary/20 mt-2 px-4 py-2 rounded-full mb-6">
                                <Target className="w-5 h-5 text-primary" />
                                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                                    Our Mission
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-secondary mb-6">
                                Empowering financial excellence across Rwanda
                            </h3>
                            <div className="space-y-4">
                                <p className="text-[#6b7280] leading-relaxed">
                                    To empower accountants, entrepreneurs, and growing businesses with clear financial
                                    systems and smart compliance strategies that drive sustainable growth and build
                                    investor confidence.
                                </p>
                                <p className="text-[#6b7280] leading-relaxed">
                                    We bridge the gap between complex financial regulations and practical business
                                    needs, making professional accounting accessible to all Rwandan enterprises.
                                </p>
                            </div>
                        </motion.div>
                    </div>


                </div>
            </div>
            {/* Who We Serve Section */}
            <div className="relative py-20 bg-gray-100">
                <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-4">
                            Who We Serve
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            We specialize in serving diverse business structures across Rwanda's
                            growing economic landscape.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Entrepreneurs & Startups",
                                img: '/sml.jpg',
                                description: "Navigating taxation, record-keeping, and building solid financial foundations from day one.",
                                clients: "Early-stage businesses, tech startups, retail entrepreneurs"
                            },
                            {
                                title: "NGOs & Cooperatives",
                                img: '/sml.jpg',
                                description: "Audit-readiness, donor compliance, and transparent financial reporting for social impact organizations.",
                                clients: "Agricultural cooperatives, savings groups, non-profits"
                            },
                            {
                                title: "Established Businesses",
                                img: '/sml.jpg',
                                description: "Strategic financial management, tax optimization, and growth planning for scaling enterprises.",
                                clients: "Limited companies, family businesses, growing SMEs"
                            }
                        ].map((segment, index) => (
                            <motion.div
                                key={segment.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="bg-gray-50 rounded-xl p-8 hover:bg-gray-750 transition-all group border border-gray-300"
                            >
                                <img src={segment.img} alt={segment.title} className="h-60 w-full object-cover rounded-lg overflow-hidden" />
                                <div className="w-12 h-12 bg-primary/20 mt-2 rounded-full flex items-center justify-center mb-6">
                                    <Users className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-700 mb-4">
                                    {segment.title}
                                </h3>
                                <p className="text-gray-500 mb-6 leading-relaxed">
                                    {segment.description}
                                </p>
                                <div className="text-sm text-primary font-semibold">
                                    {segment.clients}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Values Section */}
            <div className="relative py-20 bg-white">
                <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
                            The principles that guide every decision we make and every service we deliver
                            to our clients across Rwanda.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {values.map((value, index) => {
                            const IconComponent = value.icon;
                            return (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition-all group hover:-translate-y-2 border border-gray-200"
                                >
                                    <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                        <IconComponent className="w-7 h-7 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-secondary mb-4">
                                        {value.title}
                                    </h3>
                                    <p className="text-[#6b7280] leading-relaxed">
                                        {value.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>


        </div>
    );
};

export default AboutMissionSection;