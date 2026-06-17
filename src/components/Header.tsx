import React, { useState } from "react";
import { companyDetails } from "../data";
import { Menu, X, Inbox, HelpCircle } from "lucide-react";

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  adminOpen: boolean;
  setAdminOpen: (open: boolean) => void;
  unreadCount: number;
}

export default function Header({
  currentPage,
  setCurrentPage,
  adminOpen,
  setAdminOpen,
  unreadCount,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "services", label: "Services" },
    { id: "plans", label: "Pricing & Plans" },
    { id: "quote", label: "Request Quote" },
    { id: "portfolio", label: "Portfolio" },
    { id: "blog", label: "Blog" },
    { id: "career", label: "Career" },
    { id: "contact", label: "Contact Us" },
  ];

  const handleNav = (pageId: string) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <header className="sticky top-0 z-40 bg-white/95 text-slate-800 border-b border-slate-200 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNav("home")}
            id="header-brand"
          >
            <img
              src="/KT.png"
              alt="Kshetrajna Technologies logo"
              className="w-10 h-10 rounded-full object-cover shadow-sm"
            />
            <div>
              <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-slate-900 uppercase block">
                Kshetrajna <span className="font-light text-slate-500 text-xs italic lowercase">Technologies</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" id="desktop-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleNav(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  currentPage === item.id
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Icon */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-trigger"
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-panel" className="lg:hidden bg-white border-b border-slate-200 animate-fade-in shadow-md">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-item-${item.id}`}
                onClick={() => handleNav(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                  currentPage === item.id
                    ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
