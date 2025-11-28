import React, { useState, useEffect } from 'react';

import Sidebar from '../components/Dashboard/siderBar';
import Navbar from '../components/Dashboard/navbar';
import MainContent from '../components/Dashboard/mainController';



export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  status: 'active' | 'inactive';
}

export interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
}

export interface Client {
  id: string;
  name: string;
  type: 'startup' | 'sme' | 'ngo' | 'cooperative' | 'enterprise';
  contact: string;
  email: string;
  projects: number;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}


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
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
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