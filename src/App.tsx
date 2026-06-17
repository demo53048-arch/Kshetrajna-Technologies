import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import ServicesView from "./components/ServicesView";
import PlansView from "./components/PlansView";
import QuoteView from "./components/QuoteView";
import PortfolioView from "./components/PortfolioView";
import BlogView from "./components/BlogView";
import CareerView from "./components/CareerView";
import ContactView from "./components/ContactView";
import AdminPanel from "./components/AdminPanel";
import { ContactMessage, Application } from "./types";
import { createMessageInDB, createApplicationInDB } from "./lib/firebase";

// Seed initial values to make testing interactive and visually satisfying from the first click!
const seedInquiries: ContactMessage[] = [
  {
    id: "seeder_msg_1",
    name: "Pranav Mehta",
    email: "pranav@vikasfinance.co.in",
    phone: "+91 91234 56789",
    company: "Vikas Finance Group",
    subject: "Inquiry on Secure Distributed Ledger Setup",
    message: "Dear Rutvik and Dhruvik,\n\nWe read your publication regarding corporate database scaling and monolithic design bottlenecks. At Vikas Finance, we are currently experiencing latency spikes on our regional cluster. We would love to initiate a strategic consultation call next Tuesday regarding your custom FinSecure Ledger configuration.\n\nWarm regards,\nPranav Mehta\nSolutions Architect, Vikas Finance",
    date: "15/06/2026 at 11:24 AM"
  }
];

const seedApplications: Application[] = [
  {
    id: "seeder_app_1",
    jobId: "fullstack-eng",
    jobTitle: "Lead Full-Stack Engineer",
    candidateName: "Harsh Vardhan",
    candidateEmail: "harsh.v.dev@gmail.com",
    candidatePhone: "+91 98980 43210",
    experienceYears: "5+",
    coverLetter: "Dear Team,\n\nI have been deploying high-frequency typed applications on React, Express, and Docker for the past five years. I enjoy designing modular state lines and taking active mentorship ownership. I live in Ahmedabad but I am fully open to hybrid on-site sprints in Botad.\n\nLooking forward to speaking with Dhruvik and Rutvik!",
    resumeFileName: "Harsh_Vardhan_CV.pdf",
    date: "16/06/2026"
  }
];

export default function App() {
  const validPages = [
    "home",
    "about",
    "services",
    "plans",
    "quote",
    "portfolio",
    "blog",
    "career",
    "contact",
    "admin-panel",
  ];

  const normalizeRoute = (raw: string | null | undefined): string | null => {
    if (!raw) return null;
    const route = raw
      .trim()
      .toLowerCase()
      .replace(/^#\/?/, "")
      .replace(/^\/?/, "")
      .replace(/\?.*$/, "")
      .replace(/\/+$/, "");

    if (!route) return null;

    if (route.includes("adminpanel") || route.includes("adminpanal") || route.includes("admin-panel")) {
      return "admin-panel";
    }

    if (validPages.includes(route)) {
      return route;
    }

    return null;
  };

  const derivePageFromUrl = (): string | null => {
    if (typeof window === "undefined") return null;

    const pathRoute = normalizeRoute(window.location.pathname);
    if (pathRoute) return pathRoute;

    return null;
  };

  const [currentPage, setCurrentPage] = useState<string>(() => derivePageFromUrl() || "home");
  const [adminOpen, setAdminOpen] = useState<boolean>(false);

  // Inquiries State (local mirrors for safety fallback)
  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem("kshetrajna_messages");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return seedInquiries;
      }
    }
    return seedInquiries;
  });

  // Applications State
  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem("kshetrajna_applications");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return seedApplications;
      }
    }
    return seedApplications;
  });

  // Synchronize state changes to localStorage
  useEffect(() => {
    localStorage.setItem("kshetrajna_messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("kshetrajna_applications", JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    const handleUrlRouting = () => {
      const page = derivePageFromUrl() || "home";
      setCurrentPage(page);
    };

    handleUrlRouting();
    window.addEventListener("hashchange", handleUrlRouting);
    window.addEventListener("popstate", handleUrlRouting);

    return () => {
      window.removeEventListener("hashchange", handleUrlRouting);
      window.removeEventListener("popstate", handleUrlRouting);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    const pagePath = currentPage === "home" ? "/" : `/${currentPage}`;
    url.search = "";
    url.hash = "";
    window.history.replaceState(null, "", `${url.origin}${pagePath}${url.search}${url.hash}`);
  }, [currentPage]);

  // Handlers (dispatching real-time records straight to Firestore)
  const handleNewMessage = async (msg: ContactMessage) => {
    try {
      await createMessageInDB(msg);
    } catch (err) {
      console.error("Firestore automatic write fail:", err);
    }
    setMessages((prev) => [msg, ...prev]);
  };

  const handleNewApplication = async (app: Application) => {
    try {
      await createApplicationInDB(app);
    } catch (err) {
      console.error("Firestore automatic write fail:", err);
    }
    setApplications((prev) => [app, ...prev]);
  };

  const handleDeleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const handleDeleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900 text-slate-755 font-sans" id="kshetrajna-app-root">
      {/* 1. Header Navigation */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        adminOpen={adminOpen}
        setAdminOpen={setAdminOpen}
        unreadCount={messages.length + applications.length}
      />

      {/* 2. Main Content Body Area */}
      <main className="flex-grow overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {currentPage === "home" && <HomeView setCurrentPage={setCurrentPage} />}
            {currentPage === "about" && <AboutView />}
            {currentPage === "services" && <ServicesView />}
            {currentPage === "plans" && <PlansView />}
            {currentPage === "quote" && <QuoteView />}
            {currentPage === "portfolio" && <PortfolioView />}
            {currentPage === "blog" && <BlogView />}
            {currentPage === "career" && <CareerView onApplySubmitted={handleNewApplication} />}
            {currentPage === "contact" && <ContactView onMessageSubmitted={handleNewMessage} />}
            {currentPage === "admin-panel" && <AdminPanel />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Global Footer with disclosures */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

