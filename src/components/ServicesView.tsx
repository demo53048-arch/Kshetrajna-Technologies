import React, { useState, useEffect, useRef } from "react";
import { servicesData } from "../data";
import { CustomService } from "../types";
import { db } from "../lib/firebase";
import { collection, onSnapshot, query, FirestoreError } from "firebase/firestore";
import { motion, AnimatePresence } from "motion/react";
import { 
  Layers, 
  BrainCircuit, 
  Cloud, 
  MonitorSmartphone, 
  Briefcase, 
  X, 
  Check, 
  Laptop, 
  Terminal,
  Activity,
  AlertTriangle,
  ChevronRight
} from "lucide-react";

export default function ServicesView() {
  const [liveServices, setLiveServices] = useState<CustomService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "custom_services"));
    const unsubscribe = onSnapshot(q, (snap) => {
      const list: CustomService[] = [];
      snap.forEach((doc) => {
        list.push(doc.data() as CustomService);
      });
      setLiveServices(list.sort((a, b) => a.id.localeCompare(b.id)));
      setLoading(false);
    }, (err: FirestoreError) => {
      console.warn("Firestore loading custom_services failed or inactive. Falling back to static data: ", err.message);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const services = liveServices.length > 0 ? liveServices : servicesData;

  const [activeService, setActiveService] = useState<string>("enterprise-software");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const serviceDetailsRef = useRef<HTMLDivElement | null>(null);
  
  // Custom Architecture Advisor States
  const [selectedCoreSvc, setSelectedCoreSvc] = useState<string>("enterprise-software");
  const [infrastructureTier, setInfrastructureTier] = useState<string>("cloud-native");

  // Map icon strings to components with professional cobalt blue accents
  const iconMap: Record<string, React.ReactNode> = {
    Layers: <Layers size={18} className="text-blue-700" />,
    BrainCog: <BrainCircuit size={18} className="text-blue-700" />,
    Cloud: <Cloud size={18} className="text-blue-700" />,
    MonitorSmartphone: <MonitorSmartphone size={18} className="text-blue-700" />,
    Briefcase: <Briefcase size={18} className="text-blue-700" />,
  };

  const getSvcDetails = (id: string): CustomService => {
    return services.find((s) => s.id === id) || services[0];
  };

  const currentSvc = getSvcDetails(activeService);

  const scrollServiceIntoView = () => {
    if (!serviceDetailsRef.current) return;
    serviceDetailsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Advisor logic
  const getAdvisorOutput = () => {
    const selectedSvc = getSvcDetails(selectedCoreSvc);
    const serviceName = selectedSvc?.title || "Standard Project";
    
    let stack = ["React", "TypeScript", "Vite", "Tailwind CSS"];
    let dbName = "PostgreSQL DB";
    let hosting = "Independent VM";
    let strategy = "Single-node deploy";

    if (selectedCoreSvc === "enterprise-software") {
      stack = ["Node.js", "Express", "TypeScript", "Drizzle ORM"];
      dbName = "Postgres via Cloud SQL / Supabase";
    } else if (selectedCoreSvc === "shopify-store") {
      stack = ["Shopify Liquid", "Remote GraphQL API", "Hydro Theme"];
      dbName = "Shopify Storefront Store SQL";
    } else if (selectedCoreSvc === "wordpress-woo") {
      stack = ["PHP WP Engine", "Custom Gutenberg JS", "Apollo Rest Client"];
      dbName = "MySQL Cluster Server";
    } else if (selectedCoreSvc === "landing-pages") {
      stack = ["Vite Bundler", "React CSS Grid", "Framer Motion"];
      dbName = "In-Memory Client Schema (None)";
    } else if (selectedCoreSvc === "speed-opt") {
      stack = ["Next.js SSR static rendering", "Brotli GZIP", "CDN routing"];
      dbName = "Edge Cache Records";
    } else if (selectedCoreSvc === "api-integration") {
      stack = ["Express Webhooks Middleware", "Redis Event Queue", "OAuth Client"];
      dbName = "Sync Logs Database";
    } else if (selectedCoreSvc === "payment-gateway") {
      stack = ["Stripe JS Elements", "Server Handshake Controller", "HTTPS SSL"];
      dbName = "Stripe Account Ledger";
    } else if (selectedCoreSvc === "bug-fixing") {
      stack = ["Sentry Integration", "Webpack Bundle Analyzer", "Jest testing"];
      dbName = "Regression Case Storage";
    } else if (selectedCoreSvc === "site-migration") {
      stack = ["Rsync Automation Scripts", "DNS Dynamic records", "SSH Handshake"];
      dbName = "Synced Replica Node";
    } else if (selectedCoreSvc === "ui-ux-refinement") {
      stack = ["Dynamic Viewport Hook", "Tailwind CSS custom spacing variables"];
      dbName = "Local Storage App preferences";
    }

    if (infrastructureTier === "cloud-native") {
      hosting = "GCP CLOUD RUN (Serverless)";
      strategy = "GitHub Actions / Terraform Auto-provisioning";
    } else if (infrastructureTier === "hybrid") {
      hosting = "HYBRID CLUSTER GATEWAY";
      strategy = "Multi-zone sync trigger failovers";
    } else {
      hosting = "LEGACY VPS NODE";
      strategy = "Manual cron schedules & local logs system";
    }

    return {
      serviceName,
      stack,
      db: dbName,
      hosting,
      strategy
    };
  };

  const advisor = getAdvisorOutput();

  return (
    <div className="bg-slate-50 text-slate-800 py-16 min-h-screen flex flex-col" id="services-page-wrapper">
      {/* Page Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12 px-4">
        <span className="text-xs uppercase font-mono tracking-widest text-blue-700 font-bold block mb-3">Technical Matrix</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">Our Capabilities</h1>
        <div className="h-1.5 w-24 bg-blue-700 mx-auto mb-6 rounded-full"></div>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          From architecture planning to deep code execution, we implement high-fidelity solutions for our partners.
        </p>
      </div>

      {/* Main Grid Content */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 overflow-hidden" id="services-view-container">
      
      {/* Sidebar: Service Navigation - Column Span 4 */}
      <section className="col-span-12 md:col-span-4 flex flex-col gap-3 h-full" id="sidebar-services-nav">
        <div className="mb-1 shrink-0">
          <span className="text-[10px] font-mono text-blue-700 font-bold uppercase tracking-widest block mb-0.5">Technical Matrix</span>
          <h2 className="text-xl font-black text-slate-900 leading-tight">Practice Areas</h2>
        </div>
        
        {/* Navigation list items container - Styled for nice vertical overflow scroll handling */}
        <div className="space-y-2 overflow-y-auto pr-1 max-h-[360px] md:max-h-[380px] scrollbar-thin scrollbar-thumb-slate-200" id="service-navigator-list">
          {services.map((svc) => (
            <button
              key={svc.id}
              onClick={() => {
                setActiveService(svc.id);
                scrollServiceIntoView();
              }}
              className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex gap-4 items-start cursor-pointer group ${
                activeService === svc.id
                  ? "bg-white border-blue-600 shadow-sm"
                  : "bg-white/60 border-slate-200 hover:border-slate-300 hover:bg-white flex gap-4 items-start opacity-75 hover:opacity-100"
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 transition-transform group-hover:scale-105 ${
                activeService === svc.id ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-400"
              }`}>
                {iconMap[svc.icon] || <Layers size={18} />}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight leading-snug truncate">
                  {svc.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-medium">
                  {svc.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* High Priority Red Box Section (Critical Alert) */}
        <div className="p-4 bg-red-50 border-2 border-red-600 rounded-xl shadow-md mt-auto shrink-0" id="critical-alert-box">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="text-red-600 animate-pulse" size={16} />
            <span className="text-[10px] font-bold text-red-700 uppercase tracking-tighter font-mono">
              Critical System Alert
            </span>
          </div>
          <p className="text-[11px] leading-tight text-red-800 font-semibold font-sans">
            Our security review indicates that Legacy Enterprise deployments (v1.2) must migrate by Q4 to maintain SOC2 compliance.
          </p>
        </div>
      </section>

      {/* Main Content: Details Banner + Interactive Advisor - Column Span 8 */}
      <section ref={serviceDetailsRef} className="col-span-12 md:col-span-8 flex flex-col gap-6 h-full" id="main-services-details-panel">
        
        {/* Active Service Header Card */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex-shrink-0" id="active-service-details">
          <div className="h-32 sm:h-36 bg-slate-800 relative">
            {/* Visual gradient overlay matching mockup */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-slate-900/90"></div>
            <div className="absolute bottom-0 p-5 sm:p-6 w-full flex justify-between items-end">
              <div>
                <span className="text-[10px] font-mono text-blue-400 font-bold uppercase mb-1 block">Core Competency</span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">
                  {currentSvc.title}
                </h3>
              </div>
              <div className="flex gap-1.5 mb-1 shrink-0">
                <span className="px-2 py-0.5 bg-white/10 border border-white/25 text-white rounded text-[9px] font-mono font-medium">Scalable</span>
                <span className="px-2 py-0.5 bg-white/10 border border-white/25 text-white rounded text-[9px] font-mono font-medium">Secure</span>
              </div>
            </div>
          </div>

          {/* Lower Key Engineering Deliverables block */}
          <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 sm:gap-6 justify-between">
            <div className="flex-1 min-w-0">
              <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-2.5 tracking-wider font-mono">
                Key Engineering Deliverables
              </h5>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
                {currentSvc.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0"></div>
                    <span className="truncate">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden sm:block w-px bg-slate-150"></div>
            <div className="w-full sm:w-48 flex flex-col justify-center shrink-0">
              <p className="text-[10px] text-slate-400 italic mb-2.5 font-medium leading-normal">
                High-performance code with guaranteed 99.9% uptime architecture and strict clean code principles.
              </p>
              <button 
                onClick={() => setIsDetailsOpen(true)}
                id="btn-blueprint-details-open"
                className="w-full py-2 bg-slate-900 hover:bg-slate-850 active:scale-95 text-white text-[10px] font-bold rounded-lg uppercase tracking-widest cursor-pointer transition-all text-center border-0"
              >
                View Blueprint
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Advisor Tool */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex-1 flex flex-col justify-between" id="tech-architecture-advisor">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">Infrastructure & Technology Advisor</h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">Live simulation of K-Tech standard deployments</p>
            </div>
            <div className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-[10px] font-bold font-mono shrink-0">
              ACTIVE SESSION
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1 items-stretch">
            {/* Controls */}
            <div className="space-y-4 flex flex-col justify-center">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Service Target</label>
                <div className="relative">
                  <select
                    value={selectedCoreSvc}
                    onChange={(e) => setSelectedCoreSvc(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 hover:border-slate-300 p-2.5 rounded-lg text-xs font-semibold flex justify-between items-center text-slate-800 focus:outline-none focus:border-blue-600 transition-all cursor-pointer"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Infra Tier</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "cloud-native", label: "Cloud Native" },
                    { id: "hybrid", label: "Hybrid" },
                    { id: "legacy", label: "Legacy" }
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setInfrastructureTier(tier.id)}
                      className={`py-2 rounded text-[10px] font-bold transition-all cursor-pointer ${
                        infrastructureTier === tier.id
                          ? "bg-blue-700 text-white shadow-sm"
                          : "bg-slate-50 text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-300"
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Terminal Output */}
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-[10px] relative overflow-hidden flex flex-col justify-between h-full min-h-[160px] shadow" id="terminal-advisor-output">
               <div className="flex justify-between text-slate-500 border-b border-slate-800 pb-1.5 mb-2 shrink-0">
                  <span>BUILD_PLAN_GEN_04</span>
                  <span className="text-emerald-500 font-bold animate-pulse">READY</span>
               </div>
               
               <div className="space-y-2.5 flex-1 flex flex-col justify-center">
                  <div>
                    <span className="text-slate-500 block font-bold">&gt; STACK RECO:</span>
                    <span className="text-blue-400 font-bold">{advisor.stack.join(" • ")}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-bold">&gt; DATABASE_ARCH:</span>
                    <span className="text-blue-300 font-bold">{advisor.db}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-bold">&gt; DEPLOY_TARGET:</span>
                    <span className="text-emerald-400 font-bold underline decoration-dotted">{advisor.hosting}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-bold">&gt; CD_PIPELINE:</span>
                    <span className="text-slate-300 leading-tight font-medium block">{advisor.strategy}</span>
                  </div>
               </div>

               <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
                  <div className="w-20 h-20 border-[10px] border-white rounded-full"></div>
               </div>
            </div>
          </div>
        </div>

      </section>

      {/* Full screen popup with premium layout and high-level animations */}
      <AnimatePresence>
        {isDetailsOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6" id="blueprint-modal">
            {/* Backdrop blur with simple fade transition */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailsOpen(false)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ transform: "scale(0.95) translateY(20px)", opacity: 0 }}
              animate={{ transform: "scale(1) translateY(0px)", opacity: 1 }}
              exit={{ transform: "scale(0.95) translateY(20px)", opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 25 }}
              className="bg-white text-slate-800 border border-slate-200 rounded-2xl w-full max-w-2xl shadow-2xl relative overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 w-full shrink-0" />

              <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
                
                {/* Title & Icon Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="flex items-center space-x-3.5">
                    <div className="p-3 bg-blue-50 text-blue-700 rounded-xl ring-4 ring-blue-50/40 shrink-0">
                      {iconMap[currentSvc.icon] || <Layers size={22} className="text-blue-700" />}
                    </div>
                    <div>
                      <span className="text-[9px] text-blue-700 uppercase font-mono tracking-widest font-extrabold block mb-0.5">
                        Enterprise System Blueprint
                      </span>
                      <h2 className="font-sans text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                        {currentSvc.title}
                      </h2>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsDetailsOpen(false)}
                    className="p-2 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-400 hover:rotate-90 transition-all duration-300 border border-slate-200 shrink-0 cursor-pointer"
                    title="Close details"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Body Content Columns */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Primary Left Column */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-mono text-[9px] uppercase text-slate-400 font-bold tracking-wider">
                        Practice Description
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-705 leading-relaxed font-semibold">
                        {currentSvc.description}
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-2 bg-slate-50/50 border border-slate-150 p-4 rounded-xl leading-relaxed">
                      <h3 className="font-mono text-[9px] uppercase text-blue-700 font-bold tracking-wider flex items-center space-x-1.5">
                        <Laptop size={12} />
                        <span>Delivery & Architecture Standards</span>
                      </h3>
                      <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                        {currentSvc.detailedDescription || `Our ${currentSvc.title} department coordinates high-velocity engineering sprint cycles directly backed by veteran architect reviews. We guarantee strict adherence to Clean Code concepts, secure variable storage, fully decoupled database indices, and defensive exception catching frameworks.`}
                      </p>
                      <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                        Every component undergoes automatic accessibility validation checks, microservice stress-testing reviews, and multi-region continuous build pipeline triggers.
                      </p>
                    </div>
                  </div>

                  {/* Secondary Right Column */}
                  <div className="md:col-span-5 space-y-4">
                    
                    {/* Key Capabilities */}
                    <div className="space-y-1.5">
                      <h3 className="font-mono text-[9px] uppercase text-slate-400 font-bold tracking-wider">
                        In-scope Capabilities
                      </h3>
                      <div className="space-y-1.5">
                        {currentSvc.features.map((feat, idx) => (
                          <div
                            key={idx} 
                            className="bg-white border border-slate-150 p-2 rounded-lg shadow-sm flex items-start space-x-2 text-xs text-slate-700"
                          >
                            <Check size={12} className="text-blue-700 shrink-0 mt-0.5" />
                            <span className="leading-tight font-semibold text-[10.5px]">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stack Badges */}
                    <div className="space-y-1.5">
                      <h3 className="font-mono text-[9px] uppercase text-slate-400 font-bold tracking-wider flex items-center space-x-1.5">
                        <Terminal size={12} />
                        <span>Standard Technical Stack</span>
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {(currentSvc.techStack || ["React", "TypeScript", "Tailwind CSS", "Vite", "Cloud Integration"]).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 text-[10px] bg-slate-900 border border-slate-850 rounded-md text-slate-200 font-mono font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Actions Bar */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                  <p className="text-[9px] text-slate-450 font-mono text-center sm:text-left leading-snug">
                    Need custom parameters? Submit a Request Quote form to receive a personalized architecture proposal.
                  </p>
                  <button
                    onClick={() => setIsDetailsOpen(false)}
                    className="w-full sm:w-auto px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold font-sans rounded-xl text-xs cursor-pointer shadow transition-all text-center border-0"
                  >
                    Acknowledge & Close
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
