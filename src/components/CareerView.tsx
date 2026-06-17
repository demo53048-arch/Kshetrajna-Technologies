import React, { useState, useRef, useEffect } from "react";
import { jobsData } from "../data";
import { Job, Application } from "../types";
import { db } from "../lib/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { Briefcase, MapPin, Calendar, Clock, DollarSign, ArrowRight, CheckCircle2, ChevronDown, ChevronUp, Upload, X, HelpCircle, FileText } from "lucide-react";

interface CareerViewProps {
  onApplySubmitted: (app: Application) => void;
}

export default function CareerView({ onApplySubmitted }: CareerViewProps) {
  const [liveJobs, setLiveJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "jobs"));
    const unsubscribe = onSnapshot(q, (snap) => {
      const list: Job[] = [];
      snap.forEach((doc) => {
        list.push(doc.data() as Job);
      });
      setLiveJobs(list.sort((a, b) => b.id.localeCompare(a.id)));
      setLoading(false);
    }, (err) => {
      console.error("Failed to load jobs from Firestore", err);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const currentJobs = liveJobs.length > 0 ? liveJobs : jobsData;

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  // Application Form States
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidatePhone, setCandidatePhone] = useState("");
  const [experienceYears, setExperienceYears] = useState("0-1");
  const [coverLetter, setCoverLetter] = useState("");
  
  // File Upload states
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Success indicator
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState("");

  const toggleExpand = (jobId: string) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Submit Application handling
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    if (!candidateName.trim() || !candidateEmail.trim() || !candidatePhone.trim()) {
      setErrorText("Please populate the required fields!");
      return;
    }

    setErrorText("");
    setIsSubmitting(true);

    const newApp: Application = {
      id: "app_" + Date.now(),
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      candidateName,
      candidateEmail,
      candidatePhone,
      experienceYears,
      coverLetter,
      resumeFileName: file ? file.name : "Generated_CV_Assessment.pdf",
      date: new Date().toLocaleDateString(),
    };

    try {
      onApplySubmitted(newApp);

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "application", payload: newApp }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to send application email.");
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        setSelectedJob(null);
        setSubmitSuccess(false);
        setCandidateName("");
        setCandidateEmail("");
        setCandidatePhone("");
        setExperienceYears("0-1");
        setCoverLetter("");
        setFile(null);
      }, 2800);
    } catch (err: any) {
      console.error("Career application failed:", err);
      setErrorText(err?.message || "Something went wrong while sending your application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 animate-fade-in py-16" id="career-view-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-blue-700 font-bold block mb-2">Build the Future</span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Join Our Team</h1>
          <div className="h-1 w-24 bg-blue-700 mx-auto mt-4 rounded"></div>
          <p className="mt-5 text-slate-600 text-sm sm:text-base leading-relaxed">
            Collaborate directly with Mr. Rutvik Kalasha (MD) and Mr. Dhruvik Vanol (CEO) on pioneering SaaS modules and automated cloud structures.
          </p>
        </div>

        {/* Benefits Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          {[
            { title: "Direct Leadership", value: "Coordinate directly with executive founders. Your outputs are reviewed, integrated, and scaled immediately with clear feedback lanes." },
            { title: "Pure Code Craftsmanship", value: "No legacy clutter. We deploy cutting-edge reactive components, automated orchestration setups, and pristine type safety." },
            { title: "Pragmatic Progression", value: "Clear growth tracks. Physical and remote hybrid flexibility supporting sustainable developer sanity." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-display font-semibold text-sm uppercase font-mono tracking-wider text-blue-700 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Open vacancies listings Accordion */}
        <div className="max-w-4xl mx-auto space-y-4" id="career-jobs-accordion">
          <h2 className="text-lg font-bold font-display text-slate-900 border-b border-slate-205 pb-3 pl-2">Current Openings ({currentJobs.length})</h2>
          {currentJobs.map((job) => {
            const isExpanded = expandedJobId === job.id;
            return (
              <div
                key={job.id}
                id={`job-row-${job.id}`}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 shadow-sm"
              >
                {/* Accordion trigger Row */}
                <div
                  onClick={() => toggleExpand(job.id)}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors gap-4"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <span className="text-[10px] bg-blue-50 border border-blue-100 text-blue-700 px-2.5 py-0.5 rounded font-mono uppercase font-bold">
                      {job.department}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold font-display text-slate-900 leading-tight mt-1.5 truncate">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-550 font-mono">
                      <span className="flex items-center space-x-1">
                        <MapPin size={12} className="text-blue-700" />
                        <span className="text-slate-600 font-medium">{job.location}</span>
                      </span>
                      <span>•</span>
                      <span className="text-slate-600 font-medium">{job.type}</span>
                    </div>
                  </div>

                  <div className="flex items-center flex-wrap gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedJob(job);
                      }}
                      className="px-3 py-2 bg-blue-700 text-white text-[11px] font-semibold rounded-xl hover:bg-blue-800 transition"
                    >
                      Apply in popup
                    </button>
                    <div className="flex items-center space-x-3 text-slate-500">
                      <span className="hidden sm:inline text-xs text-slate-450">{isExpanded ? "Collapse" : "Expand details"}</span>
                      {isExpanded ? <ChevronUp size={18} className="text-blue-700" /> : <ChevronDown size={18} className="text-slate-500" />}
                    </div>
                  </div>
                </div>

                {/* Expanded content details */}
                {isExpanded && (
                  <div className="px-5 pb-6 sm:px-6 border-t border-slate-100 pt-5 space-y-6 animate-fade-in text-xs sm:text-sm text-slate-705">
                    <div>
                      <h4 className="font-semibold font-display uppercase font-mono tracking-wider text-[11px] text-slate-500 mb-2">Role Overview:</h4>
                      <p className="leading-relaxed text-slate-600 font-sans">
                        {job.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">EXPERIENCE DEPTH Required:</span>
                        <div className="text-slate-800 text-sm font-bold mt-0.5">{job.experience}</div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">FINANCIAL COMPENSATION:</span>
                        <div className="text-blue-700 text-sm font-bold mt-0.5">{job.salary}</div>
                      </div>
                    </div>

                    {/* Key Duties */}
                    <div className="space-y-2.5">
                      <h4 className="font-semibold font-display uppercase font-mono tracking-wider text-[11px] text-slate-500">Key Responsibilities:</h4>
                      <ul className="space-y-1.5 pl-1.5">
                        {job.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start space-x-2.5 text-slate-700">
                            <ArrowRight className="text-blue-700 shrink-0 mt-1" size={12} />
                            <span className="leading-relaxed">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Minimum requirements */}
                    <div className="space-y-2.5">
                      <h4 className="font-semibold font-display uppercase font-mono tracking-wider text-[11px] text-slate-500">Requirements / Desired Skillset:</h4>
                      <ul className="space-y-1.5 pl-1.5">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="flex items-start space-x-2.5 text-slate-700">
                            <CheckCircle2 className="text-blue-700 shrink-0 mt-0.5" size={14} />
                            <span className="leading-relaxed">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA apply now button */}
                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => setSelectedJob(job)}
                        id={`btn-apply-job-${job.id}`}
                        className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs sm:text-sm cursor-pointer shadow flex items-center space-x-1.5"
                      >
                        <span>Apply Online Now</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dynamic Apply Modal Form Slideout Dialog */}
        {selectedJob && (
          <div
            id="apply-form-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-fade-in"
          >
            <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
              
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 rounded-full border border-slate-200"
              >
                <X size={16} />
              </button>

              <div className="p-6 sm:p-8 space-y-6 text-slate-800">
                <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-4 items-start">
                  <div className="space-y-3">
                    <span className="text-[10px] text-blue-700 uppercase font-mono font-bold">APPLICATION ENTRANCE</span>
                    <h3 className="text-lg sm:text-xl font-extrabold font-display text-slate-900 mt-1">
                      Applying for: {selectedJob.title}
                    </h3>
                    <p className="text-slate-500 text-xs font-mono mt-0.5 font-semibold">
                      Job ID: {selectedJob.id} | Dept: {selectedJob.department}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                      Begin your application with a quick, modern submission flow: upload your resume, add a cover note, and send it directly to the team for fast review.
                    </p>
                  </div>

                  <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-slate-50">
                    <img
                      src="/KT.png"
                      alt="Application entrance illustration"
                      className="h-full w-full object-cover max-h-[180px]"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-4 text-white text-[11px] font-semibold">
                      Application popup ready
                    </div>
                  </div>
                </div>

                {submitSuccess ? (
                  <div className="text-center py-10 space-y-4 animate-fade-in">
                    <div className="w-16 h-16 bg-green-50 border border-green-150 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-sm">
                      <CheckCircle2 size={36} />
                    </div>
                    <h4 className="text-base font-bold font-display text-slate-900">Application Logged Successfully!</h4>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed font-semibold">
                      Thank you for submitting your profile, Mr/Ms. <strong>{candidateName}</strong>. Our management team (including CEO Dhruvik Vanol) will audit your submission and get in touch.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                    {/* Basic Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={candidateName}
                          onChange={(e) => setCandidateName(e.target.value)}
                          placeholder="Rutvik Sharma"
                          className="w-full bg-slate-55 bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-bold mb-1.5">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={candidateEmail}
                          onChange={(e) => setCandidateEmail(e.target.value)}
                          placeholder="e.g. candidate@gmail.com"
                          className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1.5">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={candidatePhone}
                          onChange={(e) => setCandidatePhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-bold mb-1.5">Years of Tech Experience *</label>
                        <select
                          value={experienceYears}
                          onChange={(e) => setExperienceYears(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-semibold"
                        >
                          <option value="0-1">Fledgling / Fresh (0 - 1 Year)</option>
                          <option value="1-3">Associate (1 - 3 Years)</option>
                          <option value="3-5">Mid-Weight (3 - 5 Years)</option>
                          <option value="5+">Accomplished / Principal (5+ Years)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1.5">Brief Cover Statement / Bio</label>
                      <textarea
                        rows={3}
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        placeholder="Detail briefly why you want to take technical ownership at Kshetrajna Technologies..."
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 resize-none font-medium"
                      />
                    </div>

                    {/* DRAG AND DROP FILE UPLOADER */}
                    <div>
                      <label className="block text-slate-700 font-bold mb-1.5">Upload Digital Resume (PDF) *</label>
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                          dragging
                            ? "border-blue-705 border-blue-700 bg-blue-50/50"
                            : file
                            ? "border-green-500/50 bg-green-50/20"
                            : "border-slate-200 hover:border-slate-350 bg-slate-50"
                        }`}
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileSelect}
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                        />
                        
                        {file ? (
                          <div className="space-y-2 animate-fade-in">
                            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600 border border-green-200 shadow-sm">
                              <FileText size={20} />
                            </div>
                            <div className="text-xs text-slate-800 font-bold leading-tight truncate max-w-xs mx-auto">
                              {file.name}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono">
                              {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready to dispatch
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="mx-auto text-blue-700" size={24} />
                            <div className="text-xs text-slate-600 font-semibold">
                              Drag and drop your layout PDF, or <span className="text-blue-700 hover:underline font-bold">browse files</span>
                            </div>
                            <div className="text-[9px] text-slate-500">
                              Supports structured PDF formats up to 5MB
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setSelectedJob(null)}
                        className="px-4 py-2.5 bg-white hover:bg-slate-50 rounded-lg text-xs font-semibold cursor-pointer border border-slate-200 shadow-sm text-slate-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg text-xs cursor-pointer shadow-md"
                      >
                        Dispatch Application
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
