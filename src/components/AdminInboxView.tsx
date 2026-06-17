import React, { useState } from "react";
import { ContactMessage, Application } from "../types";
import { Inbox, FileText, Mail, Trash2, X, Eye, ShieldCheck, Clock, CheckCircle2, AlertCircle } from "lucide-react";

interface AdminInboxProps {
  messages: ContactMessage[];
  applications: Application[];
  onDeleteMessage: (id: string) => void;
  onDeleteApplication: (id: string) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminInboxView({
  messages,
  applications,
  onDeleteMessage,
  onDeleteApplication,
  onClearAll,
  isOpen,
  onClose,
}: AdminInboxProps) {
  const [activeTab, setActiveTab] = useState<"inquiries" | "applications">("inquiries");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  if (!isOpen) return null;

  return (
    <div id="admin-inbox-backdrop" className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-sm animate-fade-in animate-duration-150">
      <div className="w-full max-w-lg bg-white border-l border-slate-205 h-full flex flex-col justify-between shadow-2xl relative animate-fade-in text-slate-800">
        
        {/* Header Block */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
              <Inbox size={16} />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-slate-900 text-base">Inquiries & Submissions</h3>
              <p className="text-[10px] text-slate-500 font-mono font-semibold">Prototype Live Sandboxed Inbox</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded-lg border border-slate-200 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Controls Bar */}
        <div className="flex border-b border-slate-200 bg-slate-50/60 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`flex-1 py-3 text-center border-b-2 font-mono transition-all cursor-pointer ${
              activeTab === "inquiries"
                ? "border-blue-700 text-blue-700 bg-white"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Inquiries ({messages.length})
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`flex-1 py-3 text-center border-b-2 font-mono transition-all cursor-pointer ${
              activeTab === "applications"
                ? "border-blue-700 text-blue-700 bg-white"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Applications ({applications.length})
          </button>
        </div>

        {/* Main List Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/30">
          {activeTab === "inquiries" ? (
            messages.length === 0 ? (
              <div className="text-center py-16 text-slate-500 font-mono space-y-2">
                <AlertCircle size={24} className="mx-auto text-blue-700" />
                <p className="text-xs font-bold text-slate-800">No customer inquiries logged yet.</p>
                <p className="text-[10px] leading-relaxed max-w-xs mx-auto text-slate-500 font-medium">
                  Submit a message through the **Contact Us** page to see it logged securely here in real-time.
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 hover:border-blue-400 transition-all group shadow-sm text-slate-800"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-xs sm:text-sm truncate max-w-[200px]" title={msg.subject}>
                        {msg.subject}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5 font-semibold">
                        From: {msg.name} ({msg.company || "Guest User"})
                      </p>
                    </div>
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <button
                        onClick={() => setSelectedMessage(msg)}
                        className="p-1 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded"
                        title="Read message body"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => onDeleteMessage(msg.id)}
                        className="p-1 text-red-500 hover:text-red-750 hover:bg-red-50 rounded"
                        title="Delete Inquiry"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2 rounded border border-slate-100 font-medium">
                    {msg.message}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-450 font-mono">
                    <span>Email: {msg.email}</span>
                    <span>{msg.date}</span>
                  </div>
                </div>
              ))
            )
          ) : (
            applications.length === 0 ? (
              <div className="text-center py-16 text-slate-500 font-mono space-y-2">
                <AlertCircle size={24} className="mx-auto text-blue-700" />
                <p className="text-xs font-bold text-slate-800">No career applications logged yet.</p>
                <p className="text-[10px] leading-relaxed max-w-xs mx-auto text-slate-500 font-medium">
                  Apply to an opening inside the **Career** accordion to see your application logged securely here.
                </p>
              </div>
            ) : (
              applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 hover:border-blue-400 transition-all group shadow-sm text-slate-800"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-xs sm:text-sm">
                        {app.candidateName}
                      </h4>
                      <p className="text-[10px] text-blue-700 font-bold font-mono uppercase mt-0.5">
                        Targeting: {app.jobTitle}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="p-1 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded"
                        title="Read application logs"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => onDeleteApplication(app.id)}
                        className="p-1 text-red-500 hover:text-red-750 hover:bg-red-50 rounded"
                        title="Delete Application"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-600">
                    <div className="bg-slate-50 p-1.5 rounded truncate border border-slate-100 font-semibold">CV: {app.resumeFileName}</div>
                    <div className="bg-slate-50 p-1.5 rounded text-right border border-slate-100 font-semibold">Exp: {app.experienceYears} Years</div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-450 font-mono">
                    <span>Ph: {app.candidatePhone}</span>
                    <span>{app.date}</span>
                  </div>
                </div>
              ))
            )
          )}
        </div>

        {/* Clear All action strip */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between gap-4 shadow-inner">
          <span className="text-[10px] text-slate-500 leading-normal font-mono font-medium max-w-[280px]">
            * Data held entirely local. Clearing data restores factory defaults.
          </span>
          <button
            onClick={onClearAll}
            className="px-3.5 py-1.5 bg-white hover:bg-red-50 hover:text-red-650 text-slate-500 hover:text-red-600 text-xs font-mono font-bold rounded-lg border border-slate-200 hover:border-red-200 transition-all cursor-pointer shrink-0"
          >
            Clear Data
          </button>
        </div>

        {/* INLINE MESSAGE DETAIL MODAL */}
        {selectedMessage && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm p-6 flex flex-col justify-between z-10 animate-fade-in text-slate-800">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="text-blue-700 font-mono text-[10px] uppercase font-bold">Message Detail</span>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 border border-slate-200 rounded-full cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              <div>
                <span className="text-[10px] text-slate-450 uppercase font-mono font-bold">SUBJECT DISPATCHED:</span>
                <h4 className="text-sm font-bold font-display text-slate-900 mt-0.5">{selectedMessage.subject}</h4>
              </div>

              <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-450 font-bold">SENDER NAME:</span>
                  <div className="font-sans text-xs mt-0.5 text-slate-800 font-semibold">{selectedMessage.name}</div>
                </div>
                <div>
                  <span className="text-slate-450 font-bold">COMPANY:</span>
                  <div className="font-sans text-xs mt-0.5 text-slate-800 font-semibold">{selectedMessage.company}</div>
                </div>
                <div>
                  <span className="text-slate-450 font-bold">EMAIL SUPPORT:</span>
                  <div className="text-xs text-blue-700 truncate mt-0.5 font-bold">{selectedMessage.email}</div>
                </div>
                <div>
                  <span className="text-slate-450 font-bold">PHONE VALUE:</span>
                  <div className="text-xs mt-0.5 text-slate-830 font-semibold">{selectedMessage.phone || "No phone provided"}</div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-slate-450 uppercase font-mono font-bold">MESSAGE BODY CONTENTS:</span>
                <p className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-700 text-xs leading-relaxed max-h-[180px] overflow-y-auto whitespace-pre-wrap font-sans font-medium">
                  {selectedMessage.message}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 cursor-pointer shadow-sm"
              >
                Close Msg Reader
              </button>
            </div>
          </div>
        )}

        {/* INLINE APPLICATION DETAIL MODAL */}
        {selectedApp && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm p-6 flex flex-col justify-between z-10 animate-fade-in text-slate-800">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="text-blue-700 font-mono text-[10px] uppercase font-bold">Application Rec</span>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 border border-slate-200 rounded-full cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              <div>
                <span className="text-[10px] text-slate-450 uppercase font-mono font-bold">CANDIDATE DISCHARGE:</span>
                <h4 className="text-sm font-bold font-display text-slate-900 mt-0.5">{selectedApp.candidateName}</h4>
                <div className="text-blue-700 font-mono text-[10px] mt-0.5 uppercase tracking-wide font-extrabold">
                  Position: {selectedApp.jobTitle}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-450 font-bold">EMAIL CONTACT:</span>
                  <div className="text-xs text-blue-700 truncate mt-0.5 font-bold">{selectedApp.candidateEmail}</div>
                </div>
                <div>
                  <span className="text-slate-450 font-bold">MOBILE PHONE:</span>
                  <div className="text-xs mt-0.5 text-slate-800 font-semibold">{selectedApp.candidatePhone}</div>
                </div>
                <div>
                  <span className="text-slate-450 font-bold">ATTACHED FILE:</span>
                  <div className="text-xs text-teal-650 mt-0.5 font-sans flex items-center space-x-1.5 truncate text-blue-700 font-bold">
                    <FileText size={12} />
                    <span>{selectedApp.resumeFileName}</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-450 font-bold">ASSESSMENT EXPER:</span>
                  <div className="text-xs mt-0.5 text-slate-805 font-semibold">{selectedApp.experienceYears} Years Depth</div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-slate-450 uppercase font-mono font-bold">COVER BIO / STATEMENT:</span>
                <p className="bg-slate-50 p-4 rounded-xl border border-slate-205 text-slate-705 text-xs leading-relaxed max-h-[160px] overflow-y-auto whitespace-pre-wrap font-sans font-medium">
                  {selectedApp.coverLetter || "No cover statement compiled by the candidate."}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 cursor-pointer shadow-sm"
              >
                Close Application Reader
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
