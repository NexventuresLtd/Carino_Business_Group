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
  ChevronRight
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
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -300,
        }}
        className="fixed left-0 top-0 h-full w-64 bg-black text-white z-50 lg:translate-x-0 flex flex-col"
      >
        {/* Logo */}
        <div className="p-6 border-b border-yellow-600">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-yellow-500">CARINO</h1>
            <button onClick={onClose} className="lg:hidden text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">Business Group</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                activeSection === item.id
                  ? 'bg-yellow-600 text-black'
                  : 'text-gray-300 hover:bg-gray-900 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <div className="bg-gray-900 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-2">Need Support?</p>
            <div className="flex items-center gap-2 text-yellow-500 text-sm">
              <Mail className="w-4 h-4" />
              <span>info@carino.rw</span>
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
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-black hover:text-yellow-600"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-black">
              Streamlining Rwanda's Financial Future
            </h2>
            <p className="text-sm text-gray-600">Professional Accounting & Business Advisory</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <Phone className="w-4 h-4 text-yellow-600" />
            <span>+250 XXX XXX XXX</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-4 h-4 text-yellow-600" />
            <span>Kigali, Rwanda</span>
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
      icon: <Calculator className="w-8 h-8" />,
    },
    {
      title: 'Accounting & Bookkeeping',
      description: 'Monthly and annual bookkeeping, ledger management, reconciliations, financial reporting',
      icon: <FileText className="w-8 h-8" />,
    },
    {
      title: 'External Audit Support',
      description: 'Preparation for external audits, ensuring documentation compliance, liaison with auditors',
      icon: <Award className="w-8 h-8" />,
    },
    {
      title: 'Business Plan Development',
      description: 'Investor-ready business plans, market research, financial modeling, KPI alignment',
      icon: <Briefcase className="w-8 h-8" />,
    },
    {
      title: 'Training & Capacity Building',
      description: 'Software training (QuickBooks, Sage, Excel), taxation principles, accounting for cooperatives',
      icon: <GraduationCap className="w-8 h-8" />,
    },
    {
      title: 'Market Research & Polling',
      description: 'Research-driven decision support, consumer behavior analysis, financial forecasting',
      icon: <BarChart3 className="w-8 h-8" />,
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
            className="space-y-8"
          >
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-8 text-black">
              <h1 className="text-4xl font-bold mb-4">Welcome to Carino Business Group</h1>
              <p className="text-lg mb-6">
                Sharp, structured, and strategic financial solutions for Rwanda's growing businesses
              </p>
              <div className="flex gap-4">
                <button className="bg-black text-yellow-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition">
                  Get Started
                </button>
                <button className="border-2 border-black px-6 py-3 rounded-lg font-semibold hover:bg-black hover:text-yellow-500 transition">
                  Learn More
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white border-2 border-yellow-500 rounded-xl p-6"
                >
                  <div className="text-yellow-600 mb-3">{stat.icon}</div>
                  <h3 className="text-3xl font-bold text-black mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* What We Stand For */}
            <div className="bg-white border-l-4 border-yellow-500 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-black mb-4">What We Stand For</h2>
              <p className="text-gray-700 leading-relaxed">
                Carino means "cute" in Italian, and while our name reflects simplicity and charm, our work is sharp, structured, and strategic. We exist to help Rwandan businesses, cooperatives, and NGOs thrive financially through high-quality accounting, tax consultancy, and business development services.
              </p>
            </div>
          </motion.div>
        );

      case 'vision':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-8 border-2 border-yellow-500">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-yellow-600" />
                <h2 className="text-3xl font-bold text-black">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become Rwanda's most trusted and accessible accounting and business advisory partner, helping organizations build solid financial foundations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border-2 border-black">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-8 h-8 text-yellow-600" />
                <h2 className="text-3xl font-bold text-black">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
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
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-black mb-6">Our Core Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-yellow-500 transition-all"
                >
                  <div className="text-yellow-600 mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-black mb-3">{service.title}</h3>
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
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-black mb-6">Who We Serve</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Entrepreneurs & Startups', desc: 'Navigating taxation and record-keeping' },
                { title: 'NGOs and Cooperatives', desc: 'Needing audit-readiness' },
                { title: 'Established Businesses', desc: 'Especially those limited by shares' },
                { title: 'External Audit Clients', desc: 'Seeking clarity, accuracy, and compliance' },
                { title: 'Aspiring Accountants', desc: 'Through professional training programs' },
              ].map((client, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white border-l-4 border-yellow-500 rounded-lg p-6"
                >
                  <h3 className="text-xl font-bold text-black mb-2">{client.title}</h3>
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
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-black mb-6">Our Impact</h2>
            <div className="space-y-4">
              {[
                'Assisted 5+ cooperatives in achieving audit readiness, helping them retain compliance certificates',
                'Helped a limited company save over 8M RWF in tax penalties through strategic advisory',
                'Delivered QuickBooks training to over 40 upcoming accountants',
                'Developed business plans used to secure over 100M RWF in funding',
              ].map((impact, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-lg p-6 border-2 border-yellow-500 flex items-start gap-4"
                >
                  <ChevronRight className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 text-lg">{impact}</p>
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
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-black mb-6">Our Portfolio</h2>
            <p className="text-gray-600 mb-8">
              Some of the brands we've worked with to streamline their financial operations
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clients.map((client, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-yellow-500 transition-all text-center"
                >
                  <Building2 className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-black">{client}</h3>
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
    <div className="p-6 lg:p-8">
      {renderContent()}
    </div>
  );
};

// Main App Component
const Dash: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="min-h-screen bg-white">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        onNavigate={setActiveSection}
      />
      
      <div className="lg:ml-64 min-h-screen flex flex-col">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1">
          <MainContent activeSection={activeSection} />
        </main>
      </div>
    </div>
  );
};

export default Dash;