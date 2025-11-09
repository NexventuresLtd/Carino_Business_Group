// components/AboutMissionSection.jsx
import { motion } from 'framer-motion';
import { Target, Eye, Users, Award, TrendingUp, Shield } from 'lucide-react';

const AboutMissionSection = () => {
    const missionStats = [
        {
            icon: Users,
            number: "30+",
            title: "Businesses Served",
            description: "SMEs, NGOs & Cooperatives"
        },
        {
            icon: TrendingUp,
            number: "600M+",
            title: "Revenue Managed",
            description: "RWF in business revenue"
        },
        {
            icon: Shield,
            number: "8M+",
            title: "Tax Savings",
            description: "RWF saved for clients"
        },
        {
            icon: Award,
            number: "40+",
            title: "Professionals Trained",
            description: "Accountants & Administrators"
        }
    ];

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
                            <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full">
                                <Eye className="w-5 h-5 text-primary" />
                                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                                    Our Vision
                                </span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-bold text-secondary leading-tight">
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
                            className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
                        >
                            <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full mb-6">
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

                    {/* Mission Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
                    >
                        {missionStats.map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                                >
                                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <IconComponent className="w-8 h-8 text-primary" />
                                    </div>
                                    <div className="text-2xl font-bold text-secondary mb-2">{stat.number}</div>
                                    <div className="font-semibold text-secondary mb-2">{stat.title}</div>
                                    <div className="text-sm text-[#6b7280]">{stat.description}</div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
            {/* Who We Serve Section */}
            <div className="relative py-20 bg-gray-900">
                <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Who We Serve
                        </h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            We specialize in serving diverse business structures across Rwanda's 
                            growing economic landscape.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Entrepreneurs & Startups",
                                description: "Navigating taxation, record-keeping, and building solid financial foundations from day one.",
                                clients: "Early-stage businesses, tech startups, retail entrepreneurs"
                            },
                            {
                                title: "NGOs & Cooperatives",
                                description: "Audit-readiness, donor compliance, and transparent financial reporting for social impact organizations.",
                                clients: "Agricultural cooperatives, savings groups, non-profits"
                            },
                            {
                                title: "Established Businesses",
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
                                className="bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all group border border-gray-700"
                            >
                                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                                    <Users className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">
                                    {segment.title}
                                </h3>
                                <p className="text-gray-300 mb-6 leading-relaxed">
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