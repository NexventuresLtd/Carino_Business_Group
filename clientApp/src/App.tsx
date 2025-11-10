
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToHash from "./hooks/ScrollController";
import { useEffect } from "react";

import PageNoFound from "./pages/noFound-404";
import HomePage from "./pages/HomePage";
import AboutUS from "./pages/AboutUS";
import ServicesPage from "./pages/services";
import PortfolioSection from "./pages/portoflio";
import ContactPage from "./pages/contact";
import Dashboard from "./pages/dashboardmain";
import Login from "./pages/login";



export default function App() {




  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioSection />} />
        <Route path="/about" element={<AboutUS />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<PageNoFound />} />
      </Routes>
    </BrowserRouter>


  );
}