import React, { useState, useEffect } from "react";
import { servicesData } from "../data";
import { CustomService } from "../types";
import { db } from "../lib/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { motion, AnimatePresence } from "motion/react";
import { Layers, BrainCircuit, Cloud, MonitorSmartphone, Briefcase, ChevronRight, HelpCircle, Sparkles, X, Check, Laptop, Terminal } from "lucide-react";

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
    }, (err) => {
      console.error("Firestore loading custom_services failed: ", err);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const services = liveServices.length > 0 ? liveServices : servicesData;

  const [activeService, setActiveService] = useState<string>("enterprise-software");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // Custom Architecture Advisor States
  const [selectedCoreSvc, setSelectedCoreSvc] = useState<string>("enterprise-software");
  const [infrastructureTier, setInfrastructureTier] = useState<string>("cloud-native");

  // Map icon strings to components with professional blue accents
  const iconMap: Record<string, React.ReactNode> = {
    Layers: <Layers className="text-blue-700" size={24} />,
    BrainCog: <BrainCircuit className="text-blue-700" size={24} />,
    Cloud: <Cloud className="text-blue-700" size={24} />,
    MonitorSmartphone: <MonitorSmartphone className="text-blue-700" size={24} />,
    Briefcase: <Briefcase className="text-blue-700" size={24} />,
  };

  const getSvcDetails = (id: string) => {
    return services.find((s) => s.id === id);
  };

  const currentSvc = getSvcDetails(activeService) || services[0];

  // Advisor logic
  const getAdvisorOutput = () => {
    const serviceName = getSvcDetails(selectedCoreSvc)?.title || "Standard Project";
    
    let stack = ["React", "TypeScript", "Vite", "Tailwind CSS"];
    let db = "PostgreSQL";
    let hosting = "Independent VM";
    let strategy = "Single-node deploy";

    if (selectedCoreSvc === "enterprise-software") {
      stack = ["Node.js", "Express", "TypeScript", "Drizzle ORM"];
      db = "Postgres via Cloud SQL / Supabase";
    } else if (selectedCoreSvc === "ai-automation") {
      stack = ["@google/genai SDK", "Python", "FastAPI", "LangChain/LlamaIndex"];
      db = "Pinecone / pgvector in Postgres";
    } else if (selectedCoreSvc === "cloud-devops") {
      stack = ["Terraform", "Docker", "GitHub Actions", "Shell"];
      db = "Multi-zone DB with replicas";
    } else if (selectedCoreSvc === "web-mobile") {
      stack = ["React Native", "Expo", "React with NextJS", "Tailwind"];
      db = "Local SQLite with Cloud Sync";
    }

    if (infrastructureTier === "cloud-native") {
      hosting = "GCP Cloud Run / AWS ECS (Serverless Containers)";
      strategy = "Automated continuous delivery trigger pipelines";
    } else if (infrastructureTier === "high-availability") {
      hosting = "Google Kubernetes Engine (GKE) Cluster";
      strategy = "Multi-zone health check triggers, automated failovers";
    } else {
      hosting = "DigitalOcean Droplet or Simple VPS";
      strategy = "Pragmatic manual build triggers & systemd management";
    }

    return {
      serviceName,
      stack,
      db,
      hosting,
      strategy
    };
  };

  const advisor = getAdvisorOutput();

  return (
    <div className="bg-slate-50 text-slate-800 animate-fade-in py-16" id="services-view-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Head */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-blue-700 font-bold block mb-2">Technical Matrix</span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Our Capabilities</h1>
          <div className="h-1 w-24 bg-blue-700 mx-auto mt-4 rounded"></div>
          <p className="mt-5 text-slate-600 text-sm sm:text-base leading-relaxed">
            From architecture planning to deep code execution, we implement high-fidelity solutions for our partners.
          </p>
        </div>

        {/* Dynamic Detail Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          
          {/* Services Selector Navigation list - 5 columns */}
          <div className="lg:col-span-5 space-y-3" id="service-navigator-list">
            <h3 className="text-xs uppercase font-mono tracking-wider font-semibold text-slate-500 mb-3 pl-3">Select Practice Area</h3>
            {services.map((svc) => (
              <button
                key={svc.id}
                onClick={() => setActiveService(svc.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-4 cursor-pointer group ${
                  activeService === svc.id
                    ? "bg-white text-slate-900 border-blue-500 shadow-md"
                    : "bg-white/60 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-white"
                }`}
              >
                <div className="p-2 bg-blue-50 rounded-lg group-hover:scale-105 transition-transform shrink-0">
                  {iconMap[svc.icon] || <Layers size={20} />}
                </div>
                <div>
                  <h4 className="text-sm font-bold font-display tracking-tight text-slate-900 block">
                    {svc.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {svc.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Active Service Detailed View card - 7 columns */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm" id="active-service-details">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-blue-700">
                <Sparkles size={16} />
                <span className="text-xs uppercase font-mono tracking-widest font-bold">In-Depth View</span>
              </div>
              
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight">
                  {currentSvc.title}
                </h2>
                <p className="mt-3 text-sm text-slate-605 leading-relaxed">
                  {currentSvc.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-slate-450 mb-3 font-semibold">Key Capabilities & Features Included</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentSvc.features.map((feat, i) => (
                    <li key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-650">
                      <ChevronRight className="text-blue-700 mt-0.5 shrink-0" size={14} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-500 font-mono">
                Led by: <span className="text-slate-700 font-bold">Kshetrajna Solutions Team</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <button
                  onClick={() => setIsDetailsOpen(true)}
                  className="px-4.5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold font-display rounded-xl text-xs flex items-center space-x-1 shadow cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Blueprint Details</span>
                  <ChevronRight size={13} />
                </button>
                <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full font-mono font-medium">
                  Full lifecycle
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ARCHITECTURE ADVISOR - HIGHLY INTERACTIVE COMPONENT */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm" id="tech-architecture-advisor">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase mb-4">
              <HelpCircle size={10} />
              <span>Interactive Toolkit</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 tracking-tight">
              Cloud Infrastructure & Technology Advisor
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
              Plan your project parameters below to see the recommended technology stack and cloud framework Kshetrajna Technologies would implement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 pt-8 border-t border-slate-100">
            {/* Input form panel */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-slate-500 mb-2 font-bold">Core Service Requirement</label>
                <select
                  value={selectedCoreSvc}
                  onChange={(e) => setSelectedCoreSvc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3 py-2.5 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-slate-500 mb-2 font-bold">Infrastructure Deploy Tier</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "pragmatic", label: "Pragmatic VPS" },
                    { id: "cloud-native", label: "Cloud Native" },
                    { id: "high-availability", label: "High Scale GKE" }
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setInfrastructureTier(tier.id)}
                      className={`px-2 py-2 text-[10px] sm:text-xs font-bold rounded-lg border transition-all text-center cursor-pointer ${
                        infrastructureTier === tier.id
                          ? "bg-blue-750 bg-blue-700 text-white border-blue-700"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live interactive output panel */}
            <div className="lg:col-span-7 bg-slate-900 text-slate-300 p-6 rounded-xl space-y-4 font-mono text-xs shadow-lg relative overflow-hidden">
              <div className="absolute right-[-10%] bottom-[-10%] w-32 h-32 border-[12px] border-slate-800 rounded-full opacity-20"></div>
              
              <div className="text-slate-500 border-b border-sidebar border-slate-800 pb-2 flex justify-between text-[10px] relative z-10">
                <span>RECOMMENDED BLUEPRINT</span>
                <span className="text-blue-400 font-bold">K-TECH ROADMAP</span>
              </div>

              <div className="relative z-10">
                <div className="text-slate-500 text-[10px] uppercase font-bold">APPLICATION STRATEGY:</div>
                <div className="text-white font-sans text-sm font-bold">{advisor.serviceName}</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                <div>
                  <div className="text-slate-500 text-[10px] uppercase font-bold">CORE LANGUAGES & FRAMES:</div>
                  <div className="text-blue-400 mt-1 text-[11px] font-mono leading-tight font-semibold">
                    {advisor.stack.join(" • ")}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px] uppercase font-bold">DATABASE ARCHITECTURE:</div>
                  <div className="text-blue-300 mt-1 text-[11px] leading-tight font-semibold">
                    {advisor.db}
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-slate-500 text-[10px] uppercase font-bold">DEPLOY HOSTING TARGET:</div>
                <div className="text-emerald-400 font-sans mt-0.5 text-xs font-semibold">
                  {advisor.hosting}
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-slate-500 text-[10px] uppercase font-bold">RELIABILITY ASSURANCE:</div>
                <p className="text-[11px] leading-normal text-slate-400 font-sans mt-1">
                  {advisor.strategy}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full screen popup with premium layout and high-level animations */}
        <AnimatePresence>
          {isDetailsOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
              {/* Backdrop blur with simple fade transition */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDetailsOpen(false)}
                className="fixed inset-0 bg-slate-950/85 backdrop-blur-md cursor-pointer"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ transform: "scale(0.9) translateY(40px)", opacity: 0 }}
                animate={{ transform: "scale(1) translateY(0px)", opacity: 1 }}
                exit={{ transform: "scale(0.9) translateY(40px)", opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 25 }}
                className="bg-white text-slate-800 border border-slate-200 rounded-3xl w-full max-w-4xl shadow-2xl relative overflow-hidden z-10 max-h-[90vh] flex flex-col"
              >
                {/* Visual Header Ribbon */}
                <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 w-full shrink-0" />

                {/* Content area */}
                <div className="p-6 sm:p-10 overflow-y-auto flex-1 space-y-8">
                  
                  {/* Title & Icon Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3.5 bg-blue-50 text-blue-700 rounded-2xl ring-4 ring-blue-50/50">
                        {iconMap[currentSvc.icon] || <Layers size={28} className="text-blue-700" />}
                      </div>
                      <div>
                        <span className="text-[10px] text-blue-700 uppercase font-mono tracking-widest font-extrabold block mb-1">
                          Enterprise System Blueprint
                        </span>
                        <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                          {currentSvc.title}
                        </h2>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsDetailsOpen(false)}
                      className="p-2.5 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-400 hover:rotate-90 transition-all duration-300 border border-slate-200 shrink-0 self-end sm:self-auto cursor-pointer"
                      title="Close details"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Body Content Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    
                    {/* Primary Left Column */}
                    <div className="md:col-span-7 space-y-6">
                      <div className="space-y-3">
                        <h3 className="font-mono text-xs uppercase text-slate-400 font-bold tracking-wider">
                          Practice Description
                        </h3>
                        <p className="text-sm text-slate-705 leading-relaxed font-semibold">
                          {currentSvc.description}
                        </p>
                      </div>

                      <div className="space-y-3 pt-2 bg-slate-50/50 border border-slate-150 p-5 rounded-2xl leading-relaxed">
                        <h3 className="font-mono text-xs uppercase text-blue-700 font-bold tracking-wider flex items-center space-x-1">
                          <Laptop size={14} />
                          <span>Delivery & Architecture Standards</span>
                        </h3>
                        <p className="text-xs text-slate-600 font-medium font-sans">
                          {currentSvc.detailedDescription || `Our ${currentSvc.title} department coordinates high-velocity engineering sprint cycles directly backed by veteran architect reviews. We guarantee strict adherence to Clean Code concepts, secure variable storage, fully decoupled database indices, and defensive exception catching frameworks so your platform remains robust under extreme spikes.`}
                        </p>
                        <p className="text-xs text-slate-600 font-medium font-sans">
                          Every component undergoes automatic accessibility validation checks, microservice stress-testing reviews, and multi-region continuous build pipeline triggers.
                        </p>
                      </div>
                    </div>

                    {/* Secondary Right Column */}
                    <div className="md:col-span-5 space-y-6">
                      
                      {/* Key Capabilities */}
                      <div className="space-y-3">
                        <h3 className="font-mono text-xs uppercase text-slate-400 font-bold tracking-wider">
                          In-scope Capabilities
                        </h3>
                        <div className="space-y-2">
                          {currentSvc.features.map((feat, idx) => (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              key={idx} 
                              className="bg-white border border-slate-150 p-2.5 rounded-xl shadow-sm flex items-start space-x-2 text-xs text-slate-700"
                            >
                              <Check size={14} className="text-blue-700 shrink-0 mt-0.5" />
                              <span className="leading-tight font-medium">{feat}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Stack Badges */}
                      <div className="space-y-3">
                        <h3 className="font-mono text-xs uppercase text-slate-400 font-bold tracking-wider flex items-center space-x-1">
                          <Terminal size={14} />
                          <span>Standard Technical Stack</span>
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {(currentSvc.techStack || ["React 19", "TypeScript", "Tailwind CSS", "Firestore Ledger", "Vite Bundler", "Framer Motion", "GCP Edge"]).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 text-[10px] sm:text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-300 font-mono text-white font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] text-slate-450 font-mono text-center sm:text-left">
                      Need custom parameters? Submit a Request Quote form to receive a personalized architecture proposal.
                    </p>
                    <button
                      onClick={() => setIsDetailsOpen(false)}
                      className="w-full sm:w-auto px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold font-display rounded-xl text-xs cursor-pointer shadow-md transition-all text-center"
                    >
                      Acknowledge & Close Blueprint
                    </button>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
