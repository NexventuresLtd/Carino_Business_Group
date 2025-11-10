import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  TrendingUp,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Calculator,
  Building2,
  ChevronRight,
  ChevronLeft,

  CheckCircle,
  Edit,
  Trash2,
  Plus,
  Search,
  LogOut,
  User
} from 'lucide-react';

// Types
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  status: 'active' | 'inactive';
}

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
}

interface Client {
  id: string;
  name: string;
  type: 'startup' | 'sme' | 'ngo' | 'cooperative' | 'enterprise';
  contact: string;
  email: string;
  projects: number;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

// Sidebar Component with hover tooltips
const Sidebar: React.FC<{
  isCollapsed: boolean;
  onToggle: () => void;
  activeSection: string;
  onNavigate: (id: string) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}> = ({ isCollapsed, onToggle, activeSection, onNavigate, isMobileOpen, onMobileClose }) => {
  const navItems: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'services', label: 'Services', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'clients', label: 'Clients', icon: <Users className="w-5 h-5" /> },
    { id: 'portfolio', label: 'Portfolio', icon: <Building2 className="w-5 h-5" /> },
  ];

  const handleNavigation = (id: string) => {
    onNavigate(id);
    // Close mobile sidebar after navigation
    if (window.innerWidth < 1024) {
      onMobileClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 280,
        }}
        className="fixed left-0 top-0 h-full bg-gray-900 text-white z-50 flex flex-col border-r border-gray-700"
        style={{
          transform: isMobileOpen ? 'translateX(0)' : (window.innerWidth < 1024 ? 'translateX(-100%)' : 'translateX(0)')
        }}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex ml-auto mb-3 justify-end items-center gap-2">
            <button
              onClick={onToggle}
              className="p-2 bg-gray-800 rounded-lg transition-colors lg:block"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
            <button
              onClick={onMobileClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors lg:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <motion.div
              initial={false}
              animate={{ opacity: isCollapsed ? 0 : 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-[#d4af37] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CARINO</h1>
                <p className="text-xs text-gray-400">Business Group</p>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.id} className="relative group">
              <button
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-2 transition-all ${activeSection === item.id
                    ? 'bg-[#d4af37] text-gray-900'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
              >
                <div className="flex-shrink-0">
                  {item.icon}
                </div>
                <motion.span
                  initial={false}
                  animate={{
                    opacity: isCollapsed ? 0 : 1,
                    width: isCollapsed ? 0 : 'auto'
                  }}
                  className="font-medium whitespace-nowrap overflow-hidden"
                >
                  {item.label}
                </motion.span>
              </button>

              {/* Hover Tooltip for collapsed sidebar */}
              {isCollapsed && (
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Contact Footer */}
        <motion.div
          initial={false}
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          className="p-4 border-t border-gray-700"
        >
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-2">Need Support?</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#d4af37] text-sm">
                <Mail className="w-4 h-4" />
                <span>info@carino.rw</span>
              </div>
              <div className="flex items-center gap-2 text-[#d4af37] text-sm">
                <Phone className="w-4 h-4" />
                <span>+250 788 123 456</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.aside>
    </>
  );
};

// Navbar Component
const Navbar: React.FC<{
  onMenuClick: () => void;
  activeSection: string;
  user: UserData | null;
  onLogout: () => void;
}> = ({ onMenuClick, activeSection, user, onLogout }) => {
  const sectionTitles = {
    overview: 'Dashboard Overview',
    services: 'Services Management',
    clients: 'Client Management',
    portfolio: 'Portfolio',
  };

  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="text-gray-600 hover:text-[#d4af37] transition-colors lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {sectionTitles[activeSection as keyof typeof sectionTitles]}
            </h2>
            <p className="text-sm text-gray-600">Streamlining Rwanda's Financial Future</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <Phone className="w-4 h-4 text-[#d4af37]" />
              <span>+250 788 123 456</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-4 h-4 text-[#d4af37]" />
              <span>Kigali, Rwanda</span>
            </div>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-40"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

// CRUD Components
const ServiceModal: React.FC<{
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Omit<Service, 'id'>) => void;
}> = ({ service, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    features: string[];
    status: 'active' | 'inactive';
    icon: string;
  }>({
    title: '',
    description: '',
    features: [''],
    status: 'active',
    icon: 'briefcase'
  });

  const iconOptions = [
    { value: 'calculator', label: 'Calculator', icon: '🧮' },
    { value: 'file-text', label: 'Document', icon: '📄' },
    { value: 'trending-up', label: 'Chart', icon: '📈' },
    { value: 'briefcase', label: 'Briefcase', icon: '💼' },
    { value: 'shield', label: 'Shield', icon: '🛡️' },
    { value: 'users', label: 'Users', icon: '👥' },
  ];

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        features: service.features,
        status: service.status,
        icon: service.icon
      });
    } else {
      setFormData({
        title: '',
        description: '',
        features: [''],
        status: 'active',
        icon: 'briefcase'
      });
    }
  }, [service]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {service ? 'Edit Service' : 'Add New Service'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
            <div className="grid grid-cols-3 gap-2">
              {iconOptions.map((iconOption) => (
                <button
                  key={iconOption.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, icon: iconOption.value }))}
                  className={`p-3 border rounded-lg text-2xl text-center transition-all ${formData.icon === iconOption.value
                      ? 'border-[#d4af37] bg-[#f5d67b]'
                      : 'border-gray-300 hover:border-gray-400'
                    }`}
                >
                  {iconOption.icon}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
                    placeholder="Enter feature"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-2 text-[#d4af37] hover:text-[#b8941f]"
              >
                <Plus className="w-4 h-4" />
                Add Feature
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#d4af37] text-white rounded-lg hover:bg-[#b8941f]"
            >
              {service ? 'Update' : 'Create'} Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Content Component
const MainContent: React.FC<{ activeSection: string }> = ({
  activeSection,
}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [serviceModal, setServiceModal] = useState<{ isOpen: boolean; service: Service | null }>({ isOpen: false, service: null });
  const [searchTerm, setSearchTerm] = useState('');

  // Load data from localStorage
  useEffect(() => {
    const savedServices = localStorage.getItem('carino-services');
    const savedClients = localStorage.getItem('carino-clients');

    if (savedServices) {
      setServices(JSON.parse(savedServices));
    } else {
      const defaultServices: Service[] = [
        {
          id: '1',
          title: 'Tax Consultancy',
          description: 'Comprehensive tax planning and compliance services for businesses of all sizes',
          icon: 'calculator',
          features: ['VAT & WHT Declarations', 'Tax Planning & Optimization', 'Penalty Avoidance', 'Tax Compliance Audits'],
          status: 'active'
        },
        {
          id: '2',
          title: 'Accounting & Bookkeeping',
          description: 'Professional accounting services ensuring accurate financial records and compliance',
          icon: 'file-text',
          features: ['Monthly Bookkeeping', 'Financial Reporting', 'Ledger Management', 'Compliance Monitoring'],
          status: 'active'
        },
        {
          id: '3',
          title: 'Business Advisory',
          description: 'Strategic business consulting to drive growth and operational efficiency',
          icon: 'trending-up',
          features: ['Strategic Planning', 'Financial Modeling', 'Performance Analysis', 'Growth Strategy'],
          status: 'active'
        }
      ];
      setServices(defaultServices);
      localStorage.setItem('carino-services', JSON.stringify(defaultServices));
    }

    if (savedClients) {
      setClients(JSON.parse(savedClients));
    } else {
      const defaultClients: Client[] = [
        {
          id: '1',
          name: 'Favorite Construction Technology Ltd',
          type: 'enterprise',
          contact: '+250 788 111 111',
          email: 'contact@favoriteconstruction.rw',
          projects: 3
        },
        {
          id: '2',
          name: 'Rwanda Tech Solutions',
          type: 'sme',
          contact: '+250 788 222 222',
          email: 'info@rwandatech.rw',
          projects: 1
        },
        {
          id: '3',
          name: 'Green Farmers Cooperative',
          type: 'cooperative',
          contact: '+250 788 333 333',
          email: 'coop@greenfarmers.rw',
          projects: 2
        }
      ];
      setClients(defaultClients);
      localStorage.setItem('carino-clients', JSON.stringify(defaultClients));
    }
  }, []);

  // Service CRUD operations
  const handleCreateService = (serviceData: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...serviceData,
      id: Date.now().toString()
    };
    const updatedServices = [...services, newService];
    setServices(updatedServices);
    localStorage.setItem('carino-services', JSON.stringify(updatedServices));
  };

  const handleUpdateService = (serviceData: Omit<Service, 'id'>) => {
    if (!serviceModal.service) return;
    const updatedServices = services.map(s =>
      s.id === serviceModal.service!.id ? { ...serviceData, id: serviceModal.service!.id } : s
    );
    setServices(updatedServices);
    localStorage.setItem('carino-services', JSON.stringify(updatedServices));
  };

  const handleDeleteService = (serviceId: string) => {
    const updatedServices = services.filter(s => s.id !== serviceId);
    setServices(updatedServices);
    localStorage.setItem('carino-services', JSON.stringify(updatedServices));
  };

  // Client CRUD operations
  const handleCreateClient = () => {
    const newClient: Client = {
      id: Date.now().toString(),
      name: 'New Client',
      type: 'sme',
      contact: '+250 788 000 000',
      email: 'client@example.rw',
      projects: 0
    };
    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    localStorage.setItem('carino-clients', JSON.stringify(updatedClients));
  };

  const handleDeleteClient = (clientId: string) => {
    const updatedClients = clients.filter(c => c.id !== clientId);
    setClients(updatedClients);
    localStorage.setItem('carino-clients', JSON.stringify(updatedClients));
  };

  const getIconEmoji = (iconName: string) => {
    const icons: { [key: string]: string } = {
      'calculator': '🧮',
      'file-text': '📄',
      'trending-up': '📈',
      'briefcase': '💼',
      'shield': '🛡️',
      'users': '👥'
    };
    return icons[iconName] || '💼';
  };

  const stats: Stat[] = [
    {
      label: 'Managed Revenue',
      value: '600M+ RWF',
      icon: <TrendingUp className="w-6 h-6" />,
      change: '+15%'
    },
    {
      label: 'Active Clients',
      value: `${clients.length}+`,
      icon: <Users className="w-6 h-6" />,
      change: `+${clients.length}`
    },
    {
      label: 'Tax Savings',
      value: '8M+ RWF',
      icon: <Calculator className="w-6 h-6" />,
      change: '+2M'
    },
    {
      label: 'Active Services',
      value: `${services.filter(s => s.status === 'active').length}`,
      icon: <Briefcase className="w-6 h-6" />,
      change: `+${services.filter(s => s.status === 'active').length}`
    },
  ];

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-[#d4af37] to-[#f5d67b] rounded-2xl p-8 text-gray-900">
              <h1 className="text-4xl font-bold mb-4">Welcome to Carino Business Group</h1>
              <p className="text-lg mb-6 max-w-2xl">
                Sharp, structured, and strategic financial solutions for Rwanda's growing businesses,
                cooperatives, and NGOs.
              </p>
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => setServiceModal({ isOpen: true, service: null })}
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Add New Service
                </button>
                <button
                  onClick={handleCreateClient}
                  className="border-2 border-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors"
                >
                  Add New Client
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
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#d4af37] transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-[#f5d67b] rounded-lg flex items-center justify-center">
                      {stat.icon}
                    </div>
                    {stat.change && (
                      <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                        {stat.change}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Active Services</h3>
                  <button
                    onClick={() => setServiceModal({ isOpen: true, service: null })}
                    className="text-[#d4af37] hover:text-[#b8941f] transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Service
                  </button>
                </div>
                <div className="space-y-3">
                  {services.filter(s => s.status === 'active').slice(0, 5).map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getIconEmoji(service.icon)}</span>
                        <div>
                          <p className="font-medium text-gray-900">{service.title}</p>
                          <p className="text-sm text-gray-600 line-clamp-1">{service.description}</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Clients</h3>
                  <button
                    onClick={handleCreateClient}
                    className="text-[#d4af37] hover:text-[#b8941f] transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Client
                  </button>
                </div>
                <div className="space-y-3">
                  {clients.slice(0, 5).map((client) => (
                    <div key={client.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{client.name}</p>
                        <p className="text-sm text-gray-600">{client.email}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${client.type === 'enterprise' ? 'bg-purple-100 text-purple-800' :
                          client.type === 'sme' ? 'bg-blue-100 text-blue-800' :
                            client.type === 'cooperative' ? 'bg-green-100 text-green-800' :
                              'bg-orange-100 text-orange-800'
                        }`}>
                        {client.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Services Management</h2>
                <p className="text-gray-600">Manage your service offerings and features</p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] w-full"
                  />
                </div>
                <button
                  onClick={() => setServiceModal({ isOpen: true, service: null })}
                  className="bg-[#d4af37] text-white px-4 py-2 rounded-lg hover:bg-[#b8941f] transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Service
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#d4af37] transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#f5d67b] rounded-lg flex items-center justify-center text-xl">
                      {getIconEmoji(service.icon)}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setServiceModal({ isOpen: true, service })}
                        className="p-2 text-gray-400 hover:text-[#d4af37] hover:bg-[#f5d67b] rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                      {service.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No services found</h3>
                <p className="text-gray-600 mb-4">Get started by creating your first service</p>
                <button
                  onClick={() => setServiceModal({ isOpen: true, service: null })}
                  className="bg-[#d4af37] text-white px-6 py-3 rounded-lg hover:bg-[#b8941f] transition-colors"
                >
                  Create Service
                </button>
              </div>
            )}
          </motion.div>
        );

      case 'clients':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Client Management</h2>
                <p className="text-gray-600">Manage your client relationships and information</p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] w-full"
                  />
                </div>
                <button
                  onClick={handleCreateClient}
                  className="bg-[#d4af37] text-white px-4 py-2 rounded-lg hover:bg-[#b8941f] transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Client
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClients.map((client) => (
                <div key={client.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#d4af37] transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-[#f5d67b] rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-gray-900" />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeleteClient(client.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{client.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {client.contact}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {client.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      {client.projects} projects
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${client.type === 'enterprise' ? 'bg-purple-100 text-purple-800' :
                      client.type === 'sme' ? 'bg-blue-100 text-blue-800' :
                        client.type === 'cooperative' ? 'bg-green-100 text-green-800' :
                          'bg-orange-100 text-orange-800'
                    }`}>
                    {client.type}
                  </span>
                </div>
              ))}
            </div>

            {filteredClients.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No clients found</h3>
                <p className="text-gray-600 mb-4">Get started by adding your first client</p>
                <button
                  onClick={handleCreateClient}
                  className="bg-[#d4af37] text-white px-6 py-3 rounded-lg hover:bg-[#b8941f] transition-colors"
                >
                  Add Client
                </button>
              </div>
            )}
          </motion.div>
        );

      case 'portfolio':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Our Portfolio</h2>
              <p className="text-gray-600">Showcasing our successful projects and client work</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client) => (
                <div key={client.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#d4af37] transition-all">
                  <div className="w-16 h-16 bg-[#f5d67b] rounded-lg flex items-center justify-center mb-4">
                    <Building2 className="w-8 h-8 text-gray-900" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{client.name}</h3>
                  <p className="text-gray-600 mb-4">Successfully completed {client.projects} projects</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${client.type === 'enterprise' ? 'bg-purple-100 text-purple-800' :
                        client.type === 'sme' ? 'bg-blue-100 text-blue-800' :
                          client.type === 'cooperative' ? 'bg-green-100 text-green-800' :
                            'bg-orange-100 text-orange-800'
                      }`}>
                      {client.type}
                    </span>
                    <span className="text-sm text-gray-500">{client.projects} projects</span>
                  </div>
                </div>
              ))}
            </div>

            {clients.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No portfolio items</h3>
                <p className="text-gray-600 mb-4">Add clients to showcase your portfolio</p>
                <button
                  onClick={handleCreateClient}
                  className="bg-[#d4af37] text-white px-6 py-3 rounded-lg hover:bg-[#b8941f] transition-colors"
                >
                  Add Client
                </button>
              </div>
            )}
          </motion.div>
        );

      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Section Under Development</h2>
            <p className="text-gray-600">This section is currently being updated with new content.</p>
          </motion.div>
        );
    }
  };

  return (
    <>
      <div className="w-full">
        {renderContent()}
      </div>

      {/* Service Modal */}
      <ServiceModal
        service={serviceModal.service}
        isOpen={serviceModal.isOpen}
        onClose={() => setServiceModal({ isOpen: false, service: null })}
        onSave={serviceModal.service ? handleUpdateService : handleCreateService}
      />
    </>
  );
};

// Main App Component
const Dash: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('carino-sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const [activeSection, setActiveSection] = useState(() => {
    const saved = localStorage.getItem('carino-active-section');
    return saved || 'overview';
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  // Load user data from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save sidebar state to localStorage
  useEffect(() => {
    localStorage.setItem('carino-sidebar-collapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  // Save active section to localStorage
  useEffect(() => {
    localStorage.setItem('carino-active-section', activeSection);
  }, [activeSection]);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileMenuClick = () => {
    setIsMobileOpen(true);
  };

  const handleMobileClose = () => {
    setIsMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
        activeSection={activeSection}
        onNavigate={setActiveSection}
        isMobileOpen={isMobileOpen}
        onMobileClose={handleMobileClose}
      />

      <div className={`flex-1 flex flex-col gap-3 min-w-0 transition-all duration-300  ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-70'}`}>
        <Navbar
          onMenuClick={handleMobileMenuClick}
          activeSection={activeSection}
          user={user}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto p-5">
          <MainContent
            activeSection={activeSection}
          />
        </main>
      </div>
    </div>
  );
};

export default Dash;