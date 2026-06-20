import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Grid,
  Clock,
  Calendar,
  Users,
  FileText,
  Bell,
  File,
  HelpCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut,
} from "lucide-react";

type MenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number | null;
};

interface AdminSidebarProps {
  items: MenuItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onLogout?: () => void;
  companyName?: string;
  companySubtitle?: string;
  userName?: string;
  userEmail?: string;
}

export default function AdminSidebar({
  items,
  activeTab,
  onTabChange,
  onLogout,
  companyName = "Kshetrajna",
  companySubtitle = "Admin Panel",
  userName = "Admin",
  userEmail = "admin@kshetrajna.com",
}: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleTabChange = (tabId: string) => {
    onTabChange(tabId);
    // Close sidebar on mobile after selecting a tab
    if (window.innerWidth < 1024) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu toggle button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-2 rounded-lg bg-blue-600 text-white shadow-lg"
        aria-label="Toggle sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ type: "spring", stiffness: 300, damping: 35 }}
        className={`h-screen fixed left-6 top-6 bottom-6 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col z-40 lg:flex ${
          mobileOpen ? "flex" : "hidden"
        } w-60 lg:w-auto lg:left-6 lg:top-6 lg:bottom-6 lg:rounded-2xl left-0 top-0 bottom-0 rounded-none`}
      >
      {/* Header: Company Logo + Name */}
      <div className="px-3.5 py-3 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold shadow-sm flex-shrink-0">
            K
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-[13px] font-semibold text-slate-900 truncate">{companyName}</p>
                <ChevronDown size={12} className="text-slate-400 flex-shrink-0" />
              </div>
              <p className="text-[11px] text-slate-500 truncate">{companySubtitle}</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto px-2 py-2.5 space-y-0.5 min-h-0">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all relative group ${
                isActive
                  ? "bg-slate-50 text-slate-900 border-l-4 border-blue-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
              title={collapsed ? item.label : ""}
            >
              <span
                className={`flex items-center justify-center flex-shrink-0 ${
                  isActive ? "text-blue-600" : "text-slate-500"
                }`}
              >
                {item.icon}
              </span>
              {!collapsed && (
                <div className="flex items-center justify-between flex-1 min-w-0">
                  <span className="truncate">{item.label}</span>
                  {item.badge ? (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex-shrink-0 ml-1">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
              )}

              {/* Tooltip in collapsed */}
              {collapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:block pointer-events-none z-50">
                  <div className="bg-slate-900 text-white text-xs font-medium px-2 py-1 rounded-md shadow-lg whitespace-nowrap">
                    {item.label}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer: User Profile */}
      <div className="flex-shrink-0 px-3.5 py-3 border-t border-slate-100 bg-slate-50 space-y-2 relative">
        <button className="w-full flex items-center gap-2.5 group hover:bg-slate-100 transition-colors px-2 py-1.5 rounded-lg">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1 text-left">
              <p className="text-[12px] font-semibold text-slate-900 truncate">{userName}</p>
              <p className="text-[11px] text-slate-500 truncate">{userEmail}</p>
            </div>
          )}
          {!collapsed && (
            <div className="flex-shrink-0 text-slate-500">
              <Settings size={14} />
            </div>
          )}

          {/* Tooltip in collapsed */}
          {collapsed && (
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:block pointer-events-none z-50">
              <div className="bg-slate-900 text-white text-xs font-medium px-2 py-1 rounded-md shadow-lg whitespace-nowrap">
                {userName}
              </div>
            </div>
          )}
        </button>

        {onLogout && (
          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-2.5 group px-2 py-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-[12px] font-medium ${
              collapsed ? "justify-center" : "justify-start"
            }`}
            title={collapsed ? "Logout" : ""}
          >
            <LogOut size={14} className="flex-shrink-0" />
            {!collapsed && <span>Disconnect</span>}

            {collapsed && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:block pointer-events-none z-50">
                <div className="bg-slate-900 text-white text-xs font-medium px-2 py-1 rounded-md shadow-lg whitespace-nowrap">
                  Disconnect
                </div>
              </div>
            )}
          </button>
        )}
      </div>
    </motion.aside>
    </>
  );
}
