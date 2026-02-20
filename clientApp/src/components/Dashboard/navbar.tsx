import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {

  Menu,

  Phone,
  MapPin,

  LogOut,
  User
} from 'lucide-react';
import type { UserData } from '../../pages/dashboardmain';



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
              <span>+250 788 771 301</span>
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
export default Navbar