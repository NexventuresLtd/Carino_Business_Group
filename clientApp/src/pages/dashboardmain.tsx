import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Target,
  Users,
  Briefcase,
  Award,
  TrendingUp,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Calculator,
  FileText,
  GraduationCap,
  BarChart3,
  Building2,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';

// Types
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
}

// Sidebar Component
const Sidebar: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (id: string) => void;
}> = ({ isOpen, onClose, activeSection, onNavigate }) => {
  const navItems: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'vision', label: 'Vision & Mission', icon: <Target className="w-5 h-5" /> },
    { id: 'services', label: 'Services', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'clients', label: 'Who We Serve', icon: <Users className="w-5 h-5" /> },
    { id: 'impact', label: 'Our Impact', icon: <Award className="w-5 h-5" /> },
    { id: 'portfolio', label: 'Portfolio', icon: <Building2 className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -280,
        }}
        className="fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-black via-gray-900 to-black z-50 lg:translate-x-0"
      >
        <div className="h-full flex flex-col relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-20 -left-20 w-40 h-40 bg-yellow-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-40 -right-20 w-60 h-60 bg-yellow-500 rounded-full opacity-5 blur-3xl"></div>

          {/* Logo */}
          <div className="p-8 relative">
            <button onClick={onClose} className="lg:hidden absolute top-6 right-6 text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">CARINO</h1>
                  <p className="text-xs text-yellow-500 font-medium">Business Group</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 relative space-y-2">
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all relative group ${
                    isActive
                      ? 'text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.icon}</span>
                  <span className="relative z-10 font-medium text-sm">{item.label}</span>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto relative z-10"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-6 relative">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500 rounded-full opacity-10 blur-2xl"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <p className="text-xs text-gray-400 font-medium">Get in Touch</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white text-xs">
                    <Mail className="w-3 h-3 text-yellow-500" />
                    <span>info@carino.rw</span>
                  </div>
                  <div className="flex items-center gap-2 text-white text-xs">
                    <Phone className="w-3 h-3 text-yellow-500" />
                    <span>+250 XXX XXX XXX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

// Navbar Component
const Navbar: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  return (
    <nav className="bg-white sticky top-0 z-30 backdrop-blur-xl bg-opacity-80">
      <div className="flex items-center justify-between px-6 lg:px-10 py-5">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-black hover:text-yellow-600 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-black">
              Streamlining Rwanda's Financial Future
            </h2>
            <p className="text-xs lg:text-sm text-gray-500 mt-0.5">Professional Accounting & Business Advisory</p>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-yellow-600" />
            </div>
            <span className="font-medium">Kigali, Rwanda</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Main Content Component
const MainContent: React.FC<{ activeSection: string }> = ({ activeSection }) => {
  const stats: Stat[] = [
    { label: 'Managed Revenue', value: '600M+ RWF', icon: <TrendingUp className="w-6 h-6" /> },
    { label: 'Active Clients', value: '30+', icon: <Users className="w-6 h-6" /> },
    { label: 'Tax Savings', value: '8M+ RWF', icon: <Calculator className="w-6 h-6" /> },
    { label: 'Trained Accountants', value: '40+', icon: <GraduationCap className="w-6 h-6" /> },
  ];

  const services: Service[] = [
    {
      title: 'Tax Consultancy',
      description: 'VAT, WHT, income tax declarations, tax planning and compliance, penalty avoidance strategies',
      icon: <Calculator className="w-7 h-7" />,
    },
    {
      title: 'Accounting & Bookkeeping',
      description: 'Monthly and annual bookkeeping, ledger management, reconciliations, financial reporting',
      icon: <FileText className="w-7 h-7" />,
    },
    {
      title: 'External Audit Support',
      description: 'Preparation for external audits, ensuring documentation compliance, liaison with auditors',
      icon: <Award className="w-7 h-7" />,
    },
    {
      title: 'Business Plan Development',
      description: 'Investor-ready business plans, market research, financial modeling, KPI alignment',
      icon: <Briefcase className="w-7 h-7" />,
    },
    {
      title: 'Training & Capacity Building',
      description: 'Software training (QuickBooks, Sage, Excel), taxation principles, accounting for cooperatives',
      icon: <GraduationCap className="w-7 h-7" />,
    },
    {
      title: 'Market Research & Polling',
      description: 'Research-driven decision support, consumer behavior analysis, financial forecasting',
      icon: <BarChart3 className="w-7 h-7" />,
    },
  ];

  const clients = [
    'EY AND K SERVICE LTD',
    'RECASE LTD',
    'BATE CONTRACTOR',
    'HABR COMPANY LTD',
    'TASE COMPANY LTD',
    'FAVORITE CONSTRUCTION TECHNOLOGY LTD',
    'AFFORDABLE MODERN CONSTRUCTION LTD',
    'ARCE CONSULTANCY LTD',
    'KAN IMPORT & EXPORT LTD',
    'INUMA TECHNOLOGY',
    'T&U HARDWARE STORE LTD',
    'ACORNS CONSULTANCY LTD',
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 p-12 lg:p-16">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full opacity-10 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-black rounded-full opacity-5 blur-3xl"></div>
              <div className="relative max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="inline-block bg-black bg-opacity-20 rounded-full px-4 py-2 mb-6">
                    <span className="text-black text-sm font-semibold">Welcome to Carino</span>
                  </div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-black leading-tight">
                    Sharp, Structured,<br />Strategic Finance
                  </h1>
                  <p className="text-xl text-black text-opacity-90 mb-8 leading-relaxed">
                    Professional financial solutions tailored for Rwanda's growing businesses, cooperatives, and NGOs.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-black text-yellow-400 px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform">
                      Get Started
                    </button>
                    <button className="bg-white bg-opacity-20 backdrop-blur-sm text-black px-8 py-4 rounded-full font-semibold hover:bg-opacity-30 transition-all">
                      Learn More
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-3xl p-8 hover:scale-105 transition-transform"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mb-4">
                    <div className="text-black">{stat.icon}</div>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-black mb-2">{stat.value}</h3>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* What We Stand For */}
            <div className="bg-white rounded-3xl p-10 lg:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">What We Stand For</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Carino means "cute" in Italian, and while our name reflects simplicity and charm, our work is sharp, structured, and strategic. We exist to help Rwandan businesses, cooperatives, and NGOs thrive financially through high-quality accounting, tax consultancy, and business development services.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'vision':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-3xl p-10 lg:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-10 blur-3xl"></div>
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-black bg-opacity-20 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-black" />
                </div>
                <h2 className="text-4xl font-bold text-black mb-6">Our Vision</h2>
                <p className="text-black text-opacity-90 text-xl leading-relaxed max-w-3xl">
                  To become Rwanda's most trusted and accessible accounting and business advisory partner, helping organizations build solid financial foundations.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-10 lg:p-14">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mb-6">
                <Briefcase className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-4xl font-bold text-black mb-6">Our Mission</h2>
              <p className="text-gray-600 text-xl leading-relaxed max-w-3xl">
                To empower accountants and entrepreneurs in growing businesses with clear financial systems and smart compliance strategies.
              </p>
            </div>
          </motion.div>
        );

      case 'services':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-black mb-3">Our Core Services</h2>
              <p className="text-gray-500 text-lg">Comprehensive financial solutions for your business</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-3xl p-8 hover:scale-105 transition-transform group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <div className="text-black">{service.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'clients':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-black mb-3">Who We Serve</h2>
              <p className="text-gray-500 text-lg">Empowering diverse organizations across Rwanda</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Entrepreneurs & Startups', desc: 'Navigating taxation and record-keeping', icon: <TrendingUp className="w-6 h-6" /> },
                { title: 'NGOs and Cooperatives', desc: 'Needing audit-readiness', icon: <Users className="w-6 h-6" /> },
                { title: 'Established Businesses', desc: 'Especially those limited by shares', icon: <Building2 className="w-6 h-6" /> },
                { title: 'External Audit Clients', desc: 'Seeking clarity, accuracy, and compliance', icon: <Award className="w-6 h-6" /> },
                { title: 'Aspiring Accountants', desc: 'Through professional training programs', icon: <GraduationCap className="w-6 h-6" /> },
              ].map((client, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-3xl p-8 group hover:scale-105 transition-transform"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <div className="text-black">{client.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">{client.title}</h3>
                  <p className="text-gray-600">{client.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'impact':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-black mb-3">Our Impact</h2>
              <p className="text-gray-500 text-lg">Real results for real businesses</p>
            </div>
            <div className="space-y-6">
              {[
                { text: 'Assisted 5+ cooperatives in achieving audit readiness, helping them retain compliance certificates', icon: <Award className="w-6 h-6" /> },
                { text: 'Helped a limited company save over 8M RWF in tax penalties through strategic advisory', icon: <Calculator className="w-6 h-6" /> },
                { text: 'Delivered QuickBooks training to over 40 upcoming accountants', icon: <GraduationCap className="w-6 h-6" /> },
                { text: 'Developed business plans used to secure over 100M RWF in funding', icon: <TrendingUp className="w-6 h-6" /> },
              ].map((impact, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-3xl p-8 flex items-start gap-6 hover:scale-105 transition-transform"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0">
                    <div className="text-black">{impact.icon}</div>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">{impact.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'portfolio':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-black mb-3">Our Portfolio</h2>
              <p className="text-gray-500 text-lg">Trusted by leading organizations across Rwanda</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-3xl p-8 text-center hover:scale-105 transition-transform group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Building2 className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="font-semibold text-black text-sm">{client}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 lg:p-12 max-w-7xl mx-auto">
      {renderContent()}
    </div>
  );
};

// Main App Component
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        onNavigate={setActiveSection}
      />
      
      <div className="lg:ml-72 min-h-screen flex flex-col">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1">
          <MainContent activeSection={activeSection} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;