import React, { useState } from "react";
import { companyDetails } from "../data";
import { Quote } from "../types";
import { createQuoteInDB } from "../lib/firebase";
import { isValidTenDigitPhone } from "../lib/validation";
import { motion } from "motion/react";
import { FileText, ArrowRight, ShieldCheck, Banknote, Calendar, Zap, AlertCircle, Sparkles, User, Mail, Phone, Briefcase, MessageCircle } from "lucide-react";

export default function QuoteView() {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [serviceArea, setServiceArea] = useState("Enterprise Software Design");
  const [timeline, setTimeline] = useState("1-3 Months");
  const [estimatedBudget, setEstimatedBudget] = useState("$5,000 - $15,000");
  const [requirements, setRequirements] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim() || !clientPhone.trim() || !requirements.trim()) {
      setErrorText("Please complete all required fields marked with *.");
      return;
    }

    if (!isValidTenDigitPhone(clientPhone)) {
      setErrorText("Please enter a valid 10-digit WhatsApp number without country code.");
      return;
    }

    setErrorText("");
    setIsPending(true);

    const newQuote: Quote = {
      id: "quote_" + Date.now(),
      clientName,
      clientEmail,
      clientPhone: clientPhone || "Not specified",
      companyName: companyName || "Independent Founder",
      serviceArea,
      timeline,
      estimatedBudget,
      requirements,
      status: "Pending review",
      date: new Date().toLocaleDateString() + " at " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    try {
      await createQuoteInDB(newQuote);

      setFormSubmitted(true);
      // reset state
      setClientName("");
      setClientEmail("");
      setClientPhone("");
      setCompanyName("");
      setRequirements("");
    } catch (err: any) {
      console.error(err);
      setErrorText(err?.message || "Failed to save your quote request. Please retry.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 py-16" id="quote-view-container">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-blue-700 font-bold block mb-2">Architectural Blueprint</span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Request a Custom Quote</h1>
          <div className="h-1 w-24 bg-blue-700 mx-auto mt-4 rounded"></div>
          <p className="mt-4 text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
            Outline your system parameters, design scale, and timing requirements below to receive a secure, tailored proposal from our engineering MDs.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm"
        >
          {formSubmitted ? (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12 space-y-4"
            >
              <div className="w-16 h-16 bg-green-50 border border-green-150 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-sm">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900">Quotation Request Logged</h3>
              <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-semibold">
                Your custom quote parameters have been successfully recorded. We will send WhatsApp confirmation to the number you provided.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-6 px-4 py-2 bg-blue-705 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg text-xs cursor-pointer shadow-sm"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleQuoteSubmit} className="space-y-6 text-xs sm:text-sm">
              <div className="flex items-center space-x-2 text-blue-700 mb-2 font-semibold">
                <Sparkles size={14} />
                <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold">Enterprise Proposal Builder</span>
              </div>

              {errorText && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-mono text-xs flex items-center space-x-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{errorText}</span>
                </div>
              )}

              {/* Step 1: Personal Contacts */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400 border-b border-slate-100 pb-2">1. Client Contact Records</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-705 font-bold mb-1.5">Your Full Name *</label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                        <User size={16} />
                      </span>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Rahul Patel"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-10 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-medium"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-705 font-bold mb-1.5">Business Email *</label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                        <Mail size={16} />
                      </span>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="rahul@enterprise.co.in"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-10 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-705 font-bold mb-1.5">Call Number *</label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                        <Phone size={16} />
                      </span>
                      <input
                        type="tel"
                        required
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        minLength={10}
                        maxLength={10}
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="9876543210"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-10 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-medium"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-705 font-bold mb-1.5">Organization / Entity Name</label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                        <Briefcase size={16} />
                      </span>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Patel Logistics Group (Optional)"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-10 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: System Spec Choice */}
              <div className="space-y-4 pt-4">
                <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400 border-b border-slate-100 pb-2">2. Product Dimensions</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-755 font-bold mb-1.5 flex items-center space-x-1">
                      <Zap size={12} className="text-blue-700" />
                      <span>System Domain</span>
                    </label>
                    <select
                      value={serviceArea}
                      onChange={(e) => setServiceArea(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-semibold"
                    >
                      <option value="Enterprise Software Design">Enterprise Software</option>
                      <option value="Agentic AI & Automation">Agentic AI & RAG</option>
                      <option value="Cloud Engineering & DevOps">Cloud & DevOps</option>
                      <option value="High-Fidelity Web & App">UI/UX Web & Native Mobile</option>
                      <option value="Strategic Business Consulting">CTO-as-a-Service Advisory</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-755 font-bold mb-1.5 flex items-center space-x-1">
                      <Calendar size={12} className="text-blue-700" />
                      <span>Target Timeline</span>
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-semibold"
                    >
                      <option value="Under 1 Month">Under 1 Month (Fast-Track)</option>
                      <option value="1-3 Months">1-3 Months (Standard)</option>
                      <option value="3-6 Months">3-6 Months (Enterprise)</option>
                      <option value="Ongoing Continuous Support">Ongoing Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-755 font-bold mb-1.5 flex items-center space-x-1">
                      <Banknote size={12} className="text-blue-700" />
                      <span>Financial Capability</span>
                    </label>
                    <select
                      value={estimatedBudget}
                      onChange={(e) => setEstimatedBudget(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-semibold"
                    >
                      <option value="Under $5,000">Under $5,000 (Small Pilot)</option>
                      <option value="$5,000 - $15,000">$5,000 - $15,000 (Mid-Weight)</option>
                      <option value="$15,000 - $50,000">$15,000 - $50,000 (Complex SaaS)</option>
                      <option value="Above $50,050">Above $50,000 (Enterprise Custom)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Requirements details */}
              <div className="space-y-4 pt-4">
                <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400 border-b border-slate-100 pb-2">3. Requirements Outline</h3>
                <div>
                  <label className="block text-slate-705 font-bold mb-1.5">Describe your functional constraints, design needs or goals *</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute top-3 left-3 text-slate-400">
                      <MessageCircle size={16} />
                    </span>
                    <textarea
                      required
                      rows={4}
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      placeholder="Provide a brief summary of what you are aiming to build, target audiences, any specific database/API constraints, etc..."
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-10 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 resize-none font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-8 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl transition-all shadow-md flex items-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <>
                      <span>Logging Parameters...</span>
                      <span className="w-4 h-4 border-2 border-white rounded-full animate-spin border-t-transparent inline-block"></span>
                    </>
                  ) : (
                    <>
                      <span>Submit Proposal Parameters</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Informational checklist card */}
        <div className="mt-8 bg-blue-50/50 p-4 sm:p-6 rounded-xl border border-blue-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <h4 className="font-bold text-slate-900 flex items-center space-x-1.5 font-mono mb-1.5 text-blue-700">
              <ShieldCheck size={14} />
              <span>Real-time Secure Record</span>
            </h4>
            <p className="text-slate-600 leading-relaxed font-sans font-medium">
              We leverage safe transaction rules. Any logged records are isolated from search engine scraping.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 flex items-center space-x-1.5 font-mono mb-1.5 text-blue-700">
              <FileText size={14} />
              <span>Conscious Architecture Review</span>
            </h4>
            <p className="text-slate-600 leading-relaxed font-sans font-medium">
              Every system parameters document is indexed in our admin center to allow direct communication callbacks.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
