import React from "react";
import { companyDetails } from "../data";
import { MapPin, Phone, Mail, Award, ArrowUp, ArrowRight } from "lucide-react";

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const handleNav = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 text-slate-600 border-t border-slate-200 font-sans" id="global-footer">
      {/* Upper Brand & Highlight Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand details */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => handleNav("home")}>
              <div className="relative flex items-center justify-center w-8 h-8 bg-blue-700 rounded text-white font-bold text-sm shadow-sm">
                K
              </div>
              <span className="font-display font-bold text-[17px] text-slate-900 tracking-tight">
                Kshetrajna Technologies
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              {companyDetails.tagline}
            </p>
            <div className="space-y-2 pt-2">
              <span className="text-xs uppercase font-mono tracking-widest text-slate-405 block">Leadership</span>
              <span className="text-xs text-slate-700 block">Founder & MD: <strong className="text-slate-900 font-semibold">{companyDetails.leaders[0].name}</strong></span>
              <span className="text-xs text-slate-700 block">CEO: <strong className="text-slate-900 font-semibold">{companyDetails.leaders[1].name}</strong></span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-slate-900 font-bold text-xs uppercase font-mono tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About Us" },
                { id: "services", label: "Services" },
                { id: "portfolio", label: "Portfolio" },
                { id: "blog", label: "Blog" },
                { id: "career", label: "Careers" },
                { id: "contact", label: "Contact Us" }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNav(link.id)}
                    className="text-slate-500 hover:text-blue-700 font-medium transition-colors duration-150 text-left text-xs sm:text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Corporate Disclosures */}
          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-slate-900 font-bold text-xs uppercase font-mono tracking-wider">Registered Information</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="text-blue-700 shrink-0 mt-1" size={16} />
                <div>
                  <strong className="text-slate-800 font-semibold block text-sm">{companyDetails.name}</strong>
                  <span className="text-slate-500 text-xs block leading-relaxed mt-1">
                    {companyDetails.registeredOffice.street},<br />
                    {companyDetails.registeredOffice.city}, {companyDetails.registeredOffice.stateAndZip}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center space-x-3 text-slate-700">
                  <Phone className="text-blue-700 shrink-0" size={16} />
                  <a href={`tel:${companyDetails.phone}`} className="text-xs hover:text-blue-700 font-semibold transition-colors">
                    {companyDetails.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-slate-700">
                  <Mail className="text-blue-700 shrink-0" size={16} />
                  <a href={`mailto:${companyDetails.email}`} className="text-xs hover:text-blue-700 font-semibold transition-colors break-all">
                    {companyDetails.email}
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center space-x-2 text-xs">
                <span className="bg-white text-slate-600 px-2.5 py-1 rounded-md font-mono border border-slate-200 shadow-sm text-[10px]">
                  GSTIN: {companyDetails.gstin}
                </span>
                <span className="bg-white text-slate-600 px-2.5 py-1 rounded-md font-mono border border-slate-200 shadow-sm text-[10px]">
                  LLP Registered
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Lower copyright bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {currentYear} {companyDetails.name}. All Rights Reserved under regional laws.</p>
          <div className="flex items-center space-x-6">
            <span className="text-[10px] text-slate-450 font-mono">Designed for pristine standards</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center space-x-1.5 text-slate-500 hover:text-blue-700 font-semibold transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
