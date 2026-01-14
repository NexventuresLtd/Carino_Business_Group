// components/ExtendedServicesSection.jsx
import { motion } from 'framer-motion';
import { Shield, Lightbulb, BookOpen, Calculator } from 'lucide-react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// @ts-ignore: importing CSS without type declarations
import "swiper/css";


const ExtendedServicesSection = () => {
    const extendedServices = [
        {
            number: "01",
            title: "The Foundation (Compliance)",
            description: " Accurate bookkeeping, smart tax solutions, and audit support to keep your business compliant and stress-free.",
            score: "40+ TRAINED",
            icon: Calculator
        },
        {
            number: "02",
            title: "Financial Compliance",
            description: "We ensure regulatory compliance and audit readiness, helping your business avoid risks and operate smoothly.",
            score: "95% EFFICIENCY",
            icon: Shield
        },
        {
            number: "03",
            title: "The People (Capacity)",
            description: "Practical training that empowers accountants and entrepreneurs to master financial systems and strategies.",
            score: "100M+ FUNDED",
            icon: Lightbulb
        }
    ];

    const clientBrands = [
        "EY AND K SERVICE LTD", "RECASE LTD", "BATE CONTRACTOR", "HABR COMPANY LTD",
        "TASE COMPANY LTD", "FAVORITE CONSTRUCTION", "AFFORDABLE MODERN CONSTRUCTION",
        "ARCE CONSULTANCY LTD", "KAN IMPORT & EXPORT", "INUMA TECHNOLOGY",
        "T&U HARDWARE STORE", "ACORNS CONSULTANCY", "AXIMA LTD", "EDEN GENERAL CONTRACTOR",
        "MEASUREMENTS CORPORATION LTD", "HABR COMPANY LTD"
    ];

    return (
        <div className="bg-white">
            {/* Extended Services Section */}
            <div className="relative z-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 hidden"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-4">
                            Comprehensive Financial Solutions
                        </h2>
                        <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
                            Beyond core services, we offer specialized solutions to ensure your business
                            thrives in every aspect of financial management.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 ">
                        {extendedServices.map((service, index) => {
                            const IconComponent = service.icon;
                            return (
                                <motion.div
                                    key={service.number}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="bg-[#ffffff] rounded-lg shadow-2xl p-6 sm:p-8 hover:shadow-3xl transition-all -translate-y-40 group hover:-translate-y-30"
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#f5d67b] flex items-center justify-center mb-4 sm:mb-6 group-hover:border-[#d4af37] transition-colors">
                                            <span className="text-2xl sm:text-3xl font-bold text-[#6b7280] group-hover:text-[#d4af37] transition-colors">
                                                {service.number}
                                            </span>
                                        </div>

                                        <div className="mb-3 sm:mb-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f5d67b]/20 flex items-center justify-center group-hover:bg-[#d4af37]/20 transition-colors">
                                            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37]" />
                                        </div>

                                        <h3 className="text-lg sm:text-xl font-bold text-[#000000] mb-2 sm:mb-3">
                                            {service.title}
                                        </h3>

                                        <p className="text-sm sm:text-base text-[#6b7280] mb-4 sm:mb-6 leading-relaxed">
                                            {service.description}
                                        </p>

                                        <div className="text-xs sm:text-sm font-bold text-[#d4af37] uppercase tracking-wider">
                                            {service.score}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* CTA Section */}
            <div className="relative py-20 bg-primary">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Ready to Streamline Your Financial Future?
                        </h2>
                        <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
                            Join over 30 businesses, cooperatives, and NGOs who trust Carino Business Group
                            for their financial management and business development needs.
                        </p>
                        <motion.button
                            onClick={() => window.location.href = "/contact"}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[white] text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-md font-semibold hover:bg-[#f5d67b] transition-all shadow-lg hover:shadow-xl uppercase tracking-wide text-sm sm:text-base"
                        >
                            Start Your Journey Today
                        </motion.button>
                    </motion.div>
                </div>
            </div>
            {/* Client Portfolio Section */}
            <div className="relative py-20 bg-white">
                <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-4">
                            Trusted by Leading Businesses
                        </h2>
                        <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
                            We're proud to have supported these amazing organizations in achieving
                            their financial goals and compliance requirements.
                        </p>
                    </motion.div>
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={16}
                        navigation={{
                            nextEl: "bg-red-100 text-red-500",
                            prevEl: ".custom-prev",
                        }}
                        slidesPerView={2}


                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: true,
                        }}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                            1280: { slidesPerView: 5 },
                        }}
                    >
                        {clientBrands.map((brand, index) => (
                            <SwiperSlide key={brand}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05, duration: 0.4 }}
                                    viewport={{ once: true }}
                                    className="bg-gray-50 rounded-lg p-4 sm:p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-200"
                                >
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#f5d67b]/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37]" />
                                    </div>
                                    <h3 className="text-xs sm:text-sm font-semibold text-black leading-tight">
                                        {brand}
                                    </h3>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </div>


        </div>
    );
};

export default ExtendedServicesSection;