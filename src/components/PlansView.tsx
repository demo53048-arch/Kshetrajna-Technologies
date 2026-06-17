import React, { useState, useEffect } from "react";
import { StartedProject, ServicePlan } from "../types";
import { createProjectInDB, db } from "../lib/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ShieldCheck, CreditCard, ChevronRight, Briefcase, Sparkles, Building2, HelpCircle } from "lucide-react";

export default function PlansView() {
  const staticPlans: ServicePlan[] = [
    {
      id: "pilot-poc",
      name: "Pilot Proof-of-Concept",
      price: "$2,500",
      duration: "15 Business Days",
      tagline: "Ideal for fast verification, interactive SaaS designs, and initial database layouts.",
      features: [
        "1 Solid Interactive Prototype View",
        "Local Persistence Integration",
        "Pristine Tailwind Design Polish",
        "Source Code Handover",
        "Direct MD Rutvik Kalasha review"
      ]
    },
    {
      id: "saas-accelerator",
      name: "SaaS Acceleration Suite",
      price: "$7,500",
      badge: "Highly Requested",
      duration: "4 - 6 Weeks Delivery",
      tagline: "Our flagship custom engine setup designed to build scalable, full-featured web applications.",
      features: [
        "Complete Full-Stack Architecture",
        "Firestore / Relational Cloud SQL Setup",
        "OAuth Secure Login Integration",
        "Custom Automated Admin Control Panel",
        "Continuous Deployment Build Flow",
        "CEO Dhruvik Vanol consulting loop"
      ]
    },
    {
      id: "agentic-automation",
      name: "Agentic Automation Pack",
      price: "$14,500",
      duration: "8 - 12 Weeks Delivery",
      tagline: "Empower your workflows with server-authoritative autonomous agents, smart RAG, and AI pipelines.",
      features: [
        "Everything in SaaS Suite included",
        "Gemini API Core Vector Embeddings",
        "Self-Healing Autonomous Server Scripts",
        "Custom Voice / Multi-Modal Pipelines",
        "12-Month Support & Server SLA SLA",
        "High-Fidelity Speed Scale Tuning"
      ]
    }
  ];

  const [livePlans, setLivePlans] = useState<ServicePlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "service_plans"));
    const unsubscribe = onSnapshot(q, (snap) => {
      const list: ServicePlan[] = [];
      snap.forEach((doc) => {
        list.push(doc.data() as ServicePlan);
      });
      setLivePlans(list.sort((a, b) => a.id.localeCompare(b.id)));
      setLoading(false);
    }, (err) => {
      console.error("Firestore loading service_plans failed: ", err);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const plans = livePlans.length > 0 ? livePlans : staticPlans;


  const [selectedPlan, setSelectedPlan] = useState<ServicePlan | null>(null);

  // Form states
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [additionalFeatures, setAdditionalFeatures] = useState("");

  const [buySuccess, setBuySuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleStartProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    if (!clientName.trim() || !clientEmail.trim()) {
      setErrorMsg("Please fill in your name and email address.");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    const newProject: StartedProject = {
      id: "proj_" + Date.now(),
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      clientName,
      clientEmail,
      clientPhone: clientPhone || "Not provided",
      companyName: companyName || "Independent Creator",
      additionalFeatures,
      status: "Initializing",
      date: new Date().toLocaleDateString() + " at " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    try {
      await createProjectInDB(newProject);

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "project", payload: newProject }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to send project email.");
      }

      setBuySuccess(true);
      setClientName("");
      setClientEmail("");
      setClientPhone("");
      setCompanyName("");
      setAdditionalFeatures("");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "Failed to write details to Firestore database or send confirmation email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeEnrollment = () => {
    setSelectedPlan(null);
    setBuySuccess(false);
    setErrorMsg("");
  };

  return (
    <div className="bg-slate-50 text-slate-800 py-16" id="plans-view-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Area */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-blue-700 font-bold block mb-2">Flexible Engagement</span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Structured Service Plans</h1>
          <div className="h-1 w-24 bg-blue-700 mx-auto mt-4 rounded"></div>
          <p className="mt-5 text-slate-600 text-sm sm:text-base leading-relaxed">
            Select a tailored engineering plan, configure your custom scope parameters, and start your enterprise project stream with instantaneous Firestore ledger registration.
          </p>
        </div>

        {/* Plans Grid layout */}
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch mb-16"
        >
          {plans.map((plan) => {
            const isHighlyRequested = plan.badge !== undefined;
            return (
              <motion.div 
                key={plan.id}
                id={`plan-card-${plan.id}`}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 220, damping: 25 } }
                }}
                whileHover={{ y: -6, scale: 1.015, boxShadow: "0 12px 24px -10px rgba(0,0,0,0.08)" }}
                className={`flex flex-col justify-between bg-white border rounded-2xl p-6 sm:p-8 transition-colors duration-300 shadow-sm relative overflow-hidden ${
                  isHighlyRequested 
                    ? "border-blue-500 ring-2 ring-blue-50"
                    : "border-slate-200 hover:border-slate-350"
                }`}
              >
                {isHighlyRequested && (
                  <div className="absolute top-4 right-4 bg-blue-700 text-white font-mono font-bold text-[9px] uppercase px-2.5 py-1 rounded-full shadow-sm">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900 mb-1">{plan.name}</h3>
                  <div className="flex items-baseline space-x-1.5 mb-2 mt-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display">{plan.price}</span>
                    <span className="text-xs text-slate-500 font-medium font-mono">/ Setup</span>
                  </div>
                  <div className="text-xs text-blue-700 font-bold mb-4 font-mono flex items-center space-x-1.5 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded w-fit">
                    <Sparkles size={11} className="animate-pulse" />
                    <span>{plan.duration}</span>
                  </div>
                  <p className="text-slate-650 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                    {plan.tagline}
                  </p>

                  <ul className="space-y-3 pt-4 border-t border-slate-100 mb-8">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 size={16} className="text-blue-700 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setSelectedPlan(plan);
                    setBuySuccess(false);
                    setErrorMsg("");
                  }}
                  id={`btn-select-plan-${plan.id}`}
                  className={`w-full py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-1 cursor-pointer transition-all ${
                    isHighlyRequested
                      ? "bg-blue-700 hover:bg-blue-800 text-white shadow-lg shadow-blue-500/10"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-755 hover:text-slate-950 border border-slate-200"
                  }`}
                >
                  <span>Select & Start Project</span>
                  <ChevronRight size={14} />
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Popup enrollment modal */}
        <AnimatePresence>
          {selectedPlan && (
            <motion.div
              key="plan-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 sm:px-6 lg:px-8 bg-slate-950/60"
              onClick={closeEnrollment}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-3xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl"
                id="plan-start-wizard"
                onClick={(e) => e.stopPropagation()}
              >
              <div className="p-6 sm:p-10 border-t-4 border-blue-700">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] text-blue-700 uppercase font-mono tracking-widest font-extrabold block">Selected package configuration</span>
                    <h3 className="font-display text-lg sm:text-xl font-extrabold text-slate-950">
                      Enrollment: {selectedPlan.name} ({selectedPlan.price})
                    </h3>
                  </div>
                  <button 
                    onClick={closeEnrollment}
                    className="text-xs font-mono font-bold text-slate-400 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 px-2.5 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>

                {buySuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 space-y-4"
                  >
                    <div className="w-16 h-16 bg-blue-50 border border-blue-150 rounded-full flex items-center justify-center mx-auto text-blue-600 shadow-sm animate-bounce">
                      <ShieldCheck size={36} />
                    </div>
                    <h4 className="text-base font-bold font-display text-slate-900">Project Enrollment Initiated!</h4>
                    <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed font-semibold">
                      Your purchase intent has been officially logged to our Firestore system. One of our lead directors (Mr. Rutvik Kalasha / CEO Dhruvik Vanol) will retrieve your credentials and setup a personal Slack / Call channel.
                    </p>
                    <button
                      onClick={closeEnrollment}
                      className="mt-4 px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg text-xs"
                    >
                      Acknowledge & Close
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleStartProject} className="space-y-4 text-xs sm:text-sm">
                    {errorMsg && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 font-mono text-xs rounded-lg">
                        {errorMsg}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-705 font-bold mb-1.5 flex items-center space-x-1">
                          <CheckCircle2 size={12} className="text-blue-700" />
                          <span>Representative Name *</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="Anand Rajput"
                          className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-medium"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-slate-705 font-bold mb-1.5 flex items-center space-x-1">
                          <Building2 size={12} className="text-blue-700" />
                          <span>Corporate Email Address *</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="anand@rajputindustries.com"
                          className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-705 font-bold mb-1.5">Direct Call / WhatsApp</label>
                        <input
                          type="tel"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="+91 97000 50000"
                          className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-medium"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-slate-705 font-bold mb-1.5">Company Entity Name</label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Rajput Industries Private Ltd"
                          className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-705 font-bold mb-1.5">Are there any specific add-on services or instructions? (Optional)</label>
                      <textarea
                        rows={3}
                        value={additionalFeatures}
                        onChange={(e) => setAdditionalFeatures(e.target.value)}
                        placeholder="Detail any custom API integrations, specific cloud databases like bigquery or AWS, or unique UI patterns you desire..."
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 resize-none font-medium"
                      />
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={closeEnrollment}
                        className="px-4 py-2 bg-white text-slate-700 font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
                      >
                        Cancel
                      </button>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg cursor-pointer flex items-center space-x-1"
                      >
                        {isSubmitting ? (
                          <>
                            <span>Registering...</span>
                            <span className="w-3 h-3 border border-white rounded-full animate-spin border-t-transparent"></span>
                          </>
                        ) : (
                          <>
                            <CreditCard size={14} className="mr-1" />
                            <span>Confirm & Start Project</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
