import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  TrendingUp,
  X,
  Mail,
  Phone,
  Building2,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

// Types
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
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
    { id: 'portfolio', label: 'Blogs', icon: <Building2 className="w-5 h-5" /> },
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
                <span>+250 788 771 301</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.aside>
    </>
  );
};
export default Sidebar;