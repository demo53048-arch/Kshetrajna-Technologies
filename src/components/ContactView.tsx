import React, { useState } from "react";
import { motion } from "motion/react";
import { companyDetails } from "../data";
import { createMessageInDB } from "../lib/firebase";
import { ContactMessage } from "../types";
import { MapPin, Phone, Mail, Send, CheckCircle2, ShieldAlert, Sparkles, Building2 } from "lucide-react";

interface ContactViewProps {
  onMessageSubmitted: (message: ContactMessage) => void;
}

type SubmissionStatus = "idle" | "sending" | "success" | "error";

export default function ContactView({ onMessageSubmitted }: ContactViewProps) {
  // Input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState("");
  const [messageText, setMessageText] = useState("");

  // Submit UI states
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setSubject("");
    setMessageText("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !subject.trim() || !messageText.trim()) {
      alert("Please fill in all mandatory fields marked with *");
      return;
    }

    const newMessage: ContactMessage = {
      id: "msg_" + Date.now(),
      name,
      email,
      phone,
      company: company || "Independent Creator",
      subject,
      message: messageText,
      date:
        new Date().toLocaleDateString() +
        " at " +
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setStatus("sending");
    setErrorMessage(null);

    try {
      await createMessageInDB(newMessage);

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessage }),
      });

      const responseBody = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !responseBody.success) {
        throw new Error(responseBody.error || "Failed to send confirmation email.");
      }

      setStatus("success");
      setSuccess(true);
      onMessageSubmitted(newMessage);

      setTimeout(() => {
        setSuccess(false);
        resetForm();
        setStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Contact submission failed:", error);
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 animate-fade-in py-16" id="contact-view-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Head */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-blue-700 font-bold block mb-2">Initiate Contact</span>
          <h1 className="font-display text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">Contact Us</h1>
          <div className="h-1 w-24 bg-blue-700 mx-auto mt-4 rounded"></div>
          <p className="mt-5 text-slate-600 text-sm sm:text-base leading-relaxed">
            Have an enterprise scope, custom software requirement, or technical query? Write directly to our management below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          
          {/* LEFT PANEL: Official Corporate Registry Details - 5 columns */}
          <div className="lg:col-span-5 space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm" id="corporate-disclosures-panel">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-blue-700 font-bold block mb-1">Company Entity Details</span>
              <h3 className="font-display text-xl font-bold text-slate-900 leading-tight">
                Kshetrajna Technologies LLP
              </h3>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                Registered in Botad, Gujarat under Limited Liability Partnership parameters.
              </p>
            </div>

            {/* Structured Fields */}
            <div className="space-y-6 text-sm">
              {/* Address details */}
              <div className="flex items-start space-x-3.5">
                <MapPin className="text-blue-700 shrink-0 mt-1" size={18} />
                <div>
                  <span className="text-xs uppercase font-mono text-slate-450 font-bold block">Registered Office Address</span>
                  <p className="text-slate-700 font-semibold text-xs leading-relaxed mt-1">
                    {companyDetails.registeredOffice.street},<br />
                    {companyDetails.registeredOffice.city}, {companyDetails.registeredOffice.stateAndZip}
                  </p>
                </div>
              </div>

              {/* GSTIN Field */}
              <div className="flex items-start space-x-3.5">
                <Building2 className="text-blue-750 text-blue-700 shrink-0 mt-1" size={18} />
                <div>
                  <span className="text-xs uppercase font-mono text-slate-450 font-bold block">Government Identifier</span>
                  <div className="mt-1.5 flex items-center space-x-2">
                    <span className="bg-slate-50 text-slate-805 font-mono text-xs px-2.5 py-1 rounded border border-slate-200 font-bold shadow-sm animate-pulse-slow">
                      GSTIN: {companyDetails.gstin}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-mono font-bold flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                      <span>Active Verified</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Telephone Mob */}
              <div className="flex items-start space-x-3.5">
                <Phone className="text-blue-700 shrink-0 mt-1" size={18} />
                <div>
                  <span className="text-xs uppercase font-mono text-slate-450 font-bold block">Mobile Call Center Support</span>
                  <a href={`tel:${companyDetails.phone}`} className="text-slate-705 text-xs hover:text-blue-700 font-bold transition-colors block mt-1">
                    {companyDetails.phone}
                  </a>
                </div>
              </div>

              {/* Corporate email */}
              <div className="flex items-start space-x-3.5">
                <Mail className="text-blue-700 shrink-0 mt-1" size={18} />
                <div>
                  <span className="text-xs uppercase font-mono text-slate-450 font-bold block">Corporate Email Address</span>
                  <a href={`mailto:${companyDetails.email}`} className="text-slate-705 text-xs hover:text-blue-700 font-bold transition-colors block mt-1 break-all">
                    {companyDetails.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Escalation disclaimer */}
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-2">
              <span className="text-[10px] text-blue-700 font-mono font-bold flex items-center space-x-1">
                <Sparkles size={11} />
                <span>Founder Escalation Policy</span>
              </span>
              <p className="text-[11px] text-slate-650 leading-relaxed font-sans font-medium">
                Every dispatch sent through this portal is auto-logged and reviewed regularly by Founder & MD <strong>Mr. Rutvik Kalasha</strong> and CEO <strong>Mr. Dhruvik Vanol</strong>.
              </p>
            </div>
          </div>

          {/* RIGHT PANEL: Dispatch Contact Form - 7 columns */}
          <div className="lg:col-span-7 bg-white border border-slate-205 rounded-2xl p-6 sm:p-8 shadow-sm" id="contact-dispatch-form-panel">
            {success ? (
              <div className="text-center py-16 space-y-4 animate-fade-in" id="contact-success-indicator">
                <div className="w-16 h-16 bg-green-50 border border-green-150 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-sm">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900">Inquiry Sent Successfully!</h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed font-semibold">
                  Thank you, <strong>{name}</strong>. Your message is recorded. You can view your sent inquiry instantly in the **Inbox** tab on the header!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm" id="customer-inquiry-form">
                <div className="flex items-center space-x-2 text-blue-700 mb-2">
                  <Sparkles size={14} />
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold">Verify Communications Line</span>
                </div>

                {status === "error" && errorMessage ? (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 p-4 text-sm"
                  >
                    <div className="font-bold">Submission failed</div>
                    <div>{errorMessage}</div>
                  </motion.div>
                ) : null}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anand Vyas"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="anand.vyas@org.in"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 97000 00000"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">Company / Agency Name</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Vyas Enterprises (Optional)"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Inquiry Subject *</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="SaaS Development partnership scope"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Detailed Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Describe your technical requirements, deadlines, or inquiries..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 resize-none font-medium"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={`w-full py-3.5 ${status === "sending" ? "bg-slate-400 hover:bg-slate-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"} text-white font-bold rounded-xl transition-all flex items-center justify-center space-x-2 shadow-sm`}
                  >
                    {status === "sending" ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="inline-block"
                        >
                          <Send size={15} />
                        </motion.span>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Dispatch Inquiry Securely</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
