import React, { useState, useEffect, useRef } from "react";
import { 
  ContactMessage, 
  Application, 
  Quote, 
  StartedProject,
  Job,
  ServicePlan,
  CustomService,
  BlogPost,
  Project
} from "../types";
import { 
  db,
  auth, 
  googleSignIn, 
  logout, 
  initAuth,
  refreshGoogleAccessToken,
  clearCachedAccessToken,
  deleteMessageFromDB, 
  deleteApplicationFromDB, 
  updateQuoteStatusInDB, 
  deleteQuoteFromDB, 
  updateProjectStatusInDB, 
  deleteProjectFromDB,
  createJobInDB,
  deleteJobFromDB,
  createServicePlanInDB,
  deleteServicePlanFromDB,
  createCustomServiceInDB,
  deleteCustomServiceFromDB,
  updateJobInDB,
  updateServicePlanInDB,
  updateCustomServiceInDB,
  createPortfolioInDB,
  updatePortfolioInDB,
  deletePortfolioFromDB,
  createBlogPostInDB,
  updateBlogPostInDB,
  deleteBlogPostFromDB
} from "../lib/firebase";
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy 
} from "firebase/firestore";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Mail, 
  Send, 
  Trash2, 
  CheckCircle2, 
  FileText, 
  Clock, 
  AlertCircle, 
  UserCheck, 
  Lock,
  Layers, 
  Sliders, 
  Briefcase, 
  FileIcon,
  HelpCircle,
  Inbox,
  Sparkles,
  Search,
  Check,
  RefreshCw,
  Edit
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";

export default function AdminPanel() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  

  // Firestore Collections State
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [projects, setProjects] = useState<StartedProject[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [plans, setPlans] = useState<ServicePlan[]>([]);
  const [services, setServices] = useState<CustomService[]>([]);
  
  // Static Data State (from data.ts)
  // Firestore Portfolio Collection
  const [firestorePortfolio, setFirestorePortfolio] = useState<Project[]>([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Project | null>(null);
  
  // Firestore Blog Collection
  const [firestoreBlogPosts, setFirestoreBlogPosts] = useState<BlogPost[]>([]);
  const [selectedFirestoreBlogPost, setSelectedFirestoreBlogPost] = useState<BlogPost | null>(null);

  // Navigation Panel Views
  const [activeTab, setActiveTab] = useState<"inquiries" | "applications" | "quotes" | "projects" | "gmail" | "jobs" | "plans" | "services" | "portfolio-crud" | "blog-crud">("inquiries");

  const navScrollRef = useRef<HTMLDivElement | null>(null);
  const navItemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (!activeTab) return;
    const container = navScrollRef.current;
    const el = navItemRefs.current[activeTab];
    if (!container || !el) return;
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const offset = elRect.top - containerRect.top - (container.clientHeight / 2) + (el.clientHeight / 2);
    container.scrollBy({ top: offset, behavior: 'smooth' });
  }, [activeTab]);

  // Plan creation form states
  const [planName, setPlanName] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  const [planDuration, setPlanDuration] = useState("");
  const [planTagline, setPlanTagline] = useState("");
  const [planBadge, setPlanBadge] = useState("");
  const [planFeatures, setPlanFeatures] = useState("");
  const [planCreateStatus, setPlanCreateStatus] = useState("");

  // Service creation form states
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [serviceFeatures, setServiceFeatures] = useState("");
  const [serviceIcon, setServiceIcon] = useState("Layers");
  const [serviceDetailedDesc, setServiceDetailedDesc] = useState("");
  const [serviceTechStack, setServiceTechStack] = useState("");
  const [serviceCreateStatus, setServiceCreateStatus] = useState("");
  
  // Portfolio creation form states
  const [portfolioTitle, setPortfolioTitle] = useState("");
  const [portfolioClient, setPortfolioClient] = useState("");
  const [portfolioDescription, setPortfolioDescription] = useState("");
  const [portfolioCategory, setPortfolioCategory] = useState("");
  const [portfolioServices, setPortfolioServices] = useState("");
  const [portfolioYear, setPortfolioYear] = useState("");
  const [portfolioResults, setPortfolioResults] = useState("");
  const [portfolioImage, setPortfolioImage] = useState("");
  const [portfolioCreateStatus, setPortfolioCreateStatus] = useState("");

  // Blog creation form states
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSummary, setBlogSummary] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogRole, setBlogRole] = useState("");
  const [blogDate, setBlogDate] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogReadTime, setBlogReadTime] = useState("");
  const [blogCreateStatus, setBlogCreateStatus] = useState("");

  // Selection states
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [selectedProject, setSelectedProject] = useState<StartedProject | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // New Job Creation states
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobDept, setNewJobDept] = useState("Engineering Group");
  const [newJobLocation, setNewJobLocation] = useState("Botad / Remote (India)");
  const [newJobType, setNewJobType] = useState<any>("Full-time");
  const [newJobExperience, setNewJobExperience] = useState("");
  const [newJobSalary, setNewJobSalary] = useState("");
  const [newJobDescription, setNewJobDescription] = useState("");
  const [newJobResponsibilities, setNewJobResponsibilities] = useState("");
  const [newJobRequirements, setNewJobRequirements] = useState("");
  const [jobCreateStatus, setJobCreateStatus] = useState("");
  const [isSeedingJobs, setIsSeedingJobs] = useState(false);

  // Editing element IDs to switch forms from "Create" to "Update"
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);

  // Gmail Writer Panel States
  const [toEmail, setToEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [mailStatus, setMailStatus] = useState("");
  const [mailSending, setMailSending] = useState(false);

  // Fetch recent Gmail history states
  const [gmailMessages, setGmailMessages] = useState<any[]>([]);
  const [gmailLoading, setGmailLoading] = useState(false);

  // Initialize Auth Check
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
        
        // Define corporate administrator email guidelines
        const admins = ["dhruviktra.rajput.1379@gmail.com", "kshetrajnatechnologies@gmail.com"];
        if (user.email && admins.includes(user.email)) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
        setIsAdmin(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Listen to Firestore Realtime streams if authorized
  useEffect(() => {
    if (!isAdmin) return;

    // Realtime Contact Messages
    const qMessages = query(collection(db, "messages"));
    const unsubscribeMessages = onSnapshot(qMessages, (snap) => {
      const list: ContactMessage[] = [];
      snap.forEach((doc) => list.push(doc.data() as ContactMessage));
      setMessages(list.sort((a, b) => b.id.localeCompare(a.id)));
    }, (err) => console.error("Firestore listening error: messages", err));

    // Realtime Job Applications
    const qApps = query(collection(db, "applications"));
    const unsubscribeApps = onSnapshot(qApps, (snap) => {
      const list: Application[] = [];
      snap.forEach((doc) => list.push(doc.data() as Application));
      setApplications(list.sort((a, b) => b.id.localeCompare(a.id)));
    }, (err) => console.error("Firestore listening error: applications", err));

    // Realtime Quote Proposals
    const qQuotes = query(collection(db, "quotes"));
    const unsubscribeQuotes = onSnapshot(qQuotes, (snap) => {
      const list: Quote[] = [];
      snap.forEach((doc) => list.push(doc.data() as Quote));
      setQuotes(list.sort((a, b) => b.id.localeCompare(a.id)));
    }, (err) => console.error("Firestore listening error: quotes", err));

    // Realtime Started Projects
    const qProjects = query(collection(db, "projects"));
    const unsubscribeProjects = onSnapshot(qProjects, (snap) => {
      const list: StartedProject[] = [];
      snap.forEach((doc) => list.push(doc.data() as StartedProject));
      setProjects(list.sort((a, b) => b.id.localeCompare(a.id)));
    }, (err) => console.error("Firestore listening error: projects", err));

    // Realtime Job Openings
    const qJobs = query(collection(db, "jobs"));
    const unsubscribeJobs = onSnapshot(qJobs, (snap) => {
      const list: Job[] = [];
      snap.forEach((doc) => list.push(doc.data() as Job));
      setJobs(list.sort((a, b) => b.id.localeCompare(a.id)));
    }, (err) => console.error("Firestore listening error: jobs", err));

    // Realtime Service Plans
    const qPlans = query(collection(db, "service_plans"));
    const unsubscribePlans = onSnapshot(qPlans, (snap) => {
      const list: ServicePlan[] = [];
      snap.forEach((doc) => list.push(doc.data() as ServicePlan));
      setPlans(list.sort((a, b) => a.id.localeCompare(b.id)));
    }, (err) => console.error("Firestore listening error: service_plans", err));

    // Realtime Custom Services
    const qServices = query(collection(db, "custom_services"));
    const unsubscribeServices = onSnapshot(qServices, (snap) => {
      const list: CustomService[] = [];
      snap.forEach((doc) => list.push(doc.data() as CustomService));
      setServices(list.sort((a, b) => a.id.localeCompare(b.id)));
    }, (err) => console.error("Firestore listening error: custom_services", err));

    // Realtime Portfolio Projects
    const qPortfolio = query(collection(db, "portfolio"));
    const unsubscribePortfolio = onSnapshot(qPortfolio, (snap) => {
      const list: Project[] = [];
      snap.forEach((doc) => list.push(doc.data() as Project));
      setFirestorePortfolio(list.sort((a, b) => a.id.localeCompare(b.id)));
    }, (err) => console.error("Firestore listening error: portfolio", err));

    // Realtime Blog Posts
    const qBlog = query(collection(db, "blog_posts"));
    const unsubscribeBlog = onSnapshot(qBlog, (snap) => {
      const list: BlogPost[] = [];
      snap.forEach((doc) => list.push(doc.data() as BlogPost));
      setFirestoreBlogPosts(list.sort((a, b) => b.id.localeCompare(a.id)));
    }, (err) => console.error("Firestore listening error: blog_posts", err));

    return () => {
      unsubscribeMessages();
      unsubscribeApps();
      unsubscribeQuotes();
      unsubscribeProjects();
      unsubscribeJobs();
      unsubscribePlans();
      unsubscribeServices();
      unsubscribePortfolio();
      unsubscribeBlog();
    };
  }, [isAdmin]);

  // Auth Operations
  const handleLogin = async () => {
    setIsAuthenticating(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setCurrentUser(result.user);
        setAccessToken(result.accessToken);
        
        // Define corporate administrator email guidelines
        const admins = ["dhruviktra.rajput.1379@gmail.com", "kshetrajnatechnologies@gmail.com"];
        if (result.user.email && admins.includes(result.user.email)) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : String(error);
      alert(`Google authentication failed: ${message}`);
    } finally {
      setIsAuthenticating(false);
    }
  };
  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
    setAccessToken(null);
    setIsAdmin(false);
  };

  // Status updates
  const handleUpdateQuoteStatus = async (id: string, stat: any) => {
    try {
      await updateQuoteStatusInDB(id, stat);
      if (selectedQuote && selectedQuote.id === id) {
        setSelectedQuote({ ...selectedQuote, status: stat });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateProjectStatus = async (id: string, stat: any) => {
    try {
      await updateProjectStatusInDB(id, stat);
      if (selectedProject && selectedProject.id === id) {
        setSelectedProject({ ...selectedProject, status: stat });
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Job Management operations
  const handleSeedJobs = async () => {
    setIsSeedingJobs(true);
    try {
      const { jobsData } = await import("../data");
      for (const j of jobsData) {
        // Only seed if NOT already present
        await createJobInDB(j);
      }
      alert("Successfully seeded Default Openings from data.ts into Firestore!");
    } catch (e) {
      console.error(e);
      alert("Seeding failed: " + (e instanceof Error ? e.message : String(e)));
    } finally {
      setIsSeedingJobs(false);
    }
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle.trim() || !newJobDescription.trim()) {
      alert("Please fill in Job Title and Description!");
      return;
    }
    setJobCreateStatus("Compiling specifications...");
    const parsedResponsibilities = newJobResponsibilities
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    const parsedRequirements = newJobRequirements
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const id = editingJobId || "job_" + Date.now();
    const newJob: Job = {
      id,
      title: newJobTitle,
      department: newJobDept,
      location: newJobLocation,
      type: newJobType,
      experience: newJobExperience || "Not specified",
      salary: newJobSalary || "Competitive Compensation",
      description: newJobDescription,
      responsibilities: parsedResponsibilities.length > 0 ? parsedResponsibilities : ["Contribute to development operations"],
      requirements: parsedRequirements.length > 0 ? parsedRequirements : ["Familiarity with React and TypeScript"],
    };

    try {
      if (editingJobId) {
        await updateJobInDB(newJob);
        setJobCreateStatus("Successfully updated in Google Cloud Firestore!");
        setEditingJobId(null);
      } else {
        await createJobInDB(newJob);
        setJobCreateStatus("Successfully locked into Google Cloud Firestore!");
      }
      // Reset states
      setNewJobTitle("");
      setNewJobExperience("");
      setNewJobSalary("");
      setNewJobDescription("");
      setNewJobResponsibilities("");
      setNewJobRequirements("");
      setTimeout(() => setJobCreateStatus(""), 3000);
    } catch (err: any) {
      console.error(err);
      setJobCreateStatus("Submission failed: " + err.message);
    }
  };

  // Gmail API: Read recent user emails (genuine Google API communication)
  const fetchRecentEmails = async () => {
    let token = accessToken;
    if (!token) {
      token = await refreshGoogleAccessToken();
      if (token) {
        setAccessToken(token);
      }
    }
    if (!token) {
      setGmailMessages([{ id: "error", snippet: "⚠ Gmail API Error: No active OAuth token found. Please sign in again.", sizeEstimate: 0 }]);
      return;
    }

    setGmailLoading(true);
    setGmailMessages([]);
    try {
      const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=5", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Gmail list error:", errText);
        let friendlyMsg = `HTTP ${res.status}: ${res.statusText}`;
        try {
          const errJson = JSON.parse(errText);
          const apiMsg = errJson?.error?.message || errJson?.error_description;
          if (apiMsg) friendlyMsg = apiMsg;
        } catch { /* Not JSON */ }
        if (res.status === 401 || /invalid.*credentials/i.test(friendlyMsg)) {
          clearCachedAccessToken();
          setAccessToken(null);
          setGmailMessages([{ id: "error", snippet: "⚠ Gmail API Error: invalid or expired token. Please sign in again.", sizeEstimate: 0 }]);
        } else {
          setGmailMessages([{ id: "error", snippet: `⚠ Gmail API Error: ${friendlyMsg}`, sizeEstimate: 0 }]);
        }
        return;
      }

      const data = await res.json();
      if (data.messages && data.messages.length > 0) {
        const list = [];
        for (const m of data.messages) {
          const detailRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${m.id}?format=minimal`, {
            headers: { "Authorization": `Bearer ${token}` }
          });
          const detail = await detailRes.json();
          list.push(detail);
        }
        setGmailMessages(list);
      } else {
        setGmailMessages([]);
      }
    } catch (err) {
      console.error("Gmail listing error:", err);
      setGmailMessages([{ id: "error", snippet: `⚠ Network error: ${err instanceof Error ? err.message : String(err)}`, sizeEstimate: 0 }]);
    } finally {
      setGmailLoading(false);
    }
  };

  // Gmail API: Compose & Dispatch Real Email
  const handleSendGmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
      alert("No authorized active access token. Please sign in with Google.");
      return;
    }
    if (!toEmail.trim() || !emailBody.trim()) {
      alert("Please enter target email and message body contents!");
      return;
    }

    setMailSending(true);
    setMailStatus("Framing and sealing SMTP packages...");

    let token: string | null = accessToken;
    if (!token) {
      token = await refreshGoogleAccessToken();
      if (token) {
        setAccessToken(token);
      }
    }
    if (!token) {
      alert("No authorized active access token. Please sign in with Google.");
      setMailStatus("⚠ Gmail API Error: No active OAuth token available. Please sign in again.");
      setMailSending(false);
      return;
    }

    try {
      // Craft Base64 RFC-2822 Web Compliant raw mail packages
      const rawMessage = [
        `To: ${toEmail}`,
        `Subject: ${emailSubject || "Follow up from Kshetrajna Technologies"}`,
        'Content-Type: text/html; charset="UTF-8"',
        'MIME-Version: 1.0',
        '',
        `<div style="font-family: sans-serif; color: #1e293b; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #1d4ed8; border-bottom: 2px solid #3b82f6; padding-bottom: 6px;">Kshetrajna Technologies LLP</h2>
          <p style="font-size: 14px; leading-relaxed: 1.5;">${emailBody.replace(/\n/g, '<br />')}</p>
          <hr style="border: 0; border-top: 1px solid #cbd5e1; margin-top: 24px;" />
          <p style="font-size: 11px; color: #64748b;">
            Representative Office: Botad, Gujarat, India, 364710<br />
            Founder & MD: Mr. Rutvik Kalasha | CEO: Mr. Dhruvik Vanol<br />
            Mo: +91 8849181691 | Email: kshetrajnatechnologies@gmail.com
          </p>
         </div>`
      ].join('\r\n');

      // Convert to URL Safe Base64
      const base64UrlSafe = btoa(unescape(encodeURIComponent(rawMessage)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          raw: base64UrlSafe
        })
      });

      if (res.ok) {
        setMailStatus("Successfully dispatched via Google SMTP servers!");
        setToEmail("");
        setEmailSubject("");
        setEmailBody("");
        setTimeout(() => setMailStatus(""), 4000);
      } else {
        const errText = await res.text();
        console.error("Gmail API error response:", errText);
        let friendlyError = `HTTP ${res.status}: ${res.statusText}`;
        try {
          const errJson = JSON.parse(errText);
          const apiMsg = errJson?.error?.message || errJson?.error_description || errJson?.message;
          if (apiMsg) {
            friendlyError = apiMsg;
          }
        } catch {
          // Not JSON - use raw text
          if (errText) friendlyError = errText;
        }
        // 401 = token expired or invalid — clear it so re-auth banner appears
        if (res.status === 401 || /invalid.*auth|invalid.*credential|token.*expired/i.test(friendlyError)) {
          clearCachedAccessToken();
          setAccessToken(null);
          setMailStatus("⚠ OAuth token expired or invalid. Click \"Authorize Gmail API\" above to re-authenticate.");
        } else {
          setMailStatus(`⚠ Gmail API Error: ${friendlyError}`);
        }
      }
    } catch (err: any) {
      console.error(err);
      setMailStatus("Dispatch failed: " + err.message);
    } finally {
      setMailSending(false);
    }
  };

  // Helper reply templates
  const triggerEmailReply = (targetType: string, targetName: string, targetEmail: string, subjectLine?: string) => {
    setToEmail(targetEmail);
    setEmailSubject(subjectLine ? `RE: ${subjectLine}` : `Follow-up regarding your request - Kshetrajna Technologies`);
    setEmailBody(`Dear ${targetName},\n\nThank you for reaching out to us. We have received your parameters in our Firestore centralized corporate channel.\n\nOur founding directors, Mr. Rutvik Kalasha (MD) and Mr. Dhruvik Vanol (CEO) have conducted an initial audit on your profile.\n\nCould you please share your target budgets or list your available times for a technical briefing?\n\nWarm regards,\nKshetrajna Tech Operations team`);
    setActiveTab("gmail");
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!planName.trim() || !planPrice.trim() || !planDuration.trim() || !planTagline.trim()) {
      setPlanCreateStatus("Mandatory fields are missing!");
      return;
    }
    const id = editingPlanId || "plan_" + Date.now();
    const newPlan: ServicePlan = {
      id,
      name: planName.trim(),
      price: planPrice.trim(),
      duration: planDuration.trim(),
      tagline: planTagline.trim(),
      badge: planBadge.trim() || undefined,
      features: planFeatures.split("\n").map(f => f.trim()).filter(Boolean)
    };
    try {
      if (editingPlanId) {
        await updateServicePlanInDB(newPlan);
        setPlanCreateStatus("SUCCESS: Plan updated and synchronized with UI!");
        setEditingPlanId(null);
      } else {
        await createServicePlanInDB(newPlan);
        setPlanCreateStatus("SUCCESS: Plan created and synchronized with UI!");
      }
      setPlanName("");
      setPlanPrice("");
      setPlanDuration("");
      setPlanTagline("");
      setPlanBadge("");
      setPlanFeatures("");
      setTimeout(() => setPlanCreateStatus(""), 4500);
    } catch (err: any) {
      setPlanCreateStatus(`Error: ${err.message}`);
    }
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceTitle.trim() || !serviceDesc.trim() || !serviceFeatures.trim()) {
      setServiceCreateStatus("Mandatory fields are missing!");
      return;
    }
    const id = editingServiceId || "svc_" + Date.now();
    const newService: CustomService = {
      id,
      title: serviceTitle.trim(),
      description: serviceDesc.trim(),
      features: serviceFeatures.split("\n").map(f => f.trim()).filter(Boolean),
      icon: serviceIcon,
      detailedDescription: serviceDetailedDesc.trim() || undefined,
      techStack: serviceTechStack.split(",").map(t => t.trim()).filter(Boolean)
    };
    try {
      if (editingServiceId) {
        await updateCustomServiceInDB(newService);
        setServiceCreateStatus("SUCCESS: Service capability updated and synchronized with UI!");
        setEditingServiceId(null);
      } else {
        await createCustomServiceInDB(newService);
        setServiceCreateStatus("SUCCESS: Service capability created and synchronized with UI!");
      }
      setServiceTitle("");
      setServiceDesc("");
      setServiceFeatures("");
      setServiceIcon("Layers");
      setServiceDetailedDesc("");
      setServiceTechStack("");
      setTimeout(() => setServiceCreateStatus(""), 4500);
    } catch (err: any) {
      setServiceCreateStatus(`Error: ${err.message}`);
    }
  };

  // Portfolio CRUD Handlers
  const handleCreatePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!portfolioTitle.trim() || !portfolioClient.trim() || !portfolioDescription.trim()) {
      setPortfolioCreateStatus("Mandatory fields are missing!");
      return;
    }
    const id = selectedPortfolio?.id || "prj_" + Date.now();
    const newPortfolio: Project = {
      id,
      title: portfolioTitle.trim(),
      description: portfolioDescription.trim(),
      client: portfolioClient.trim(),
      category: (portfolioCategory.trim() || "Enterprise") as Project["category"],
      image: portfolioImage.trim() || "",
      services: portfolioServices.split(",").map(s => s.trim()).filter(Boolean),
      year: portfolioYear.trim() || new Date().getFullYear().toString(),
      results: portfolioResults.split("\n").map(r => r.trim()).filter(Boolean)
    };
    try {
      if (selectedPortfolio) {
        await updatePortfolioInDB(newPortfolio);
        setPortfolioCreateStatus("SUCCESS: Portfolio project updated!");
        setSelectedPortfolio(null);
      } else {
        await createPortfolioInDB(newPortfolio);
        setPortfolioCreateStatus("SUCCESS: Portfolio project created!");
      }
      setPortfolioTitle("");
      setPortfolioClient("");
      setPortfolioDescription("");
      setPortfolioCategory("");
      setPortfolioServices("");
      setPortfolioYear("");
      setPortfolioResults("");
      setPortfolioImage("");
      setTimeout(() => setPortfolioCreateStatus(""), 4500);
    } catch (err: any) {
      setPortfolioCreateStatus(`Error: ${err.message}`);
    }
  };

  const handleDeletePortfolio = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this portfolio project?")) {
      try {
        await deletePortfolioFromDB(id);
        setPortfolioCreateStatus("Portfolio project deleted successfully!");
        setTimeout(() => setPortfolioCreateStatus(""), 4500);
      } catch (err: any) {
        setPortfolioCreateStatus(`Error: ${err.message}`);
      }
    }
  };

  // Blog CRUD Handlers
  const handleCreateBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim() || !blogSummary.trim() || !blogContent.trim()) {
      setBlogCreateStatus("Mandatory fields are missing!");
      return;
    }
    const id = selectedFirestoreBlogPost?.id || "blog_" + Date.now();
    const newBlogPost: BlogPost = {
      id,
      title: blogTitle.trim(),
      summary: blogSummary.trim(),
      content: blogContent.trim(),
      category: blogCategory.trim() || "General",
      author: blogAuthor.trim() || "Kshetrajna Technologies",
      role: blogRole.trim() || "Technical Writer",
      date: blogDate.trim() || new Date().toISOString().split('T')[0],
      image: blogImage.trim() || "",
      readTime: blogReadTime.trim() || "5",
      faqs: []
    };
    try {
      if (selectedFirestoreBlogPost) {
        await updateBlogPostInDB(newBlogPost);
        setBlogCreateStatus("SUCCESS: Blog post updated!");
        setSelectedFirestoreBlogPost(null);
      } else {
        await createBlogPostInDB(newBlogPost);
        setBlogCreateStatus("SUCCESS: Blog post created!");
      }
      setBlogTitle("");
      setBlogSummary("");
      setBlogContent("");
      setBlogCategory("");
      setBlogAuthor("");
      setBlogRole("");
      setBlogDate("");
      setBlogImage("");
      setBlogReadTime("");
      setTimeout(() => setBlogCreateStatus(""), 4500);
    } catch (err: any) {
      setBlogCreateStatus(`Error: ${err.message}`);
    }
  };

  const handleDeleteBlogPost = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await deleteBlogPostFromDB(id);
        setBlogCreateStatus("Blog post deleted successfully!");
        setTimeout(() => setBlogCreateStatus(""), 4500);
      } catch (err: any) {
        setBlogCreateStatus(`Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen py-16" id="admin-panel-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Area removed per request */}

        {/* Lock screen / Authentication Block */}
        {!currentUser || !isAdmin ? (
          <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-xl content-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-blue-700"></div>
            
            <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-700 mb-6 shadow-inner">
              <Lock size={26} />
            </div>

            <h3 className="font-display text-lg sm:text-xl font-bold text-slate-950 mb-2">Restricted Access</h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 font-semibold">
              Authorized admin accounts only (<span className="text-blue-700 font-bold">dhruviktra.rajput.1379@gmail.com</span> or <span className="text-blue-700 font-bold">kshetrajnatechnologies@gmail.com</span>). Verify parameters first.
            </p>

            {currentUser && !isAdmin ? (
              <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-[10px] sm:text-xs">
                Logged in under non-admin: <strong>{currentUser.email}</strong>.<br />
                Please coordinate with MD Mr. Rutvik Kalasha for access override keys.
              </div>
            ) : null}

            <button
              onClick={handleLogin}
              disabled={isAuthenticating}
              className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
            >
              {isAuthenticating ? (
                <>
                  <span>Authenticating...</span>
                  <RefreshCw className="animate-spin" size={16} />
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>Authenticate with Google</span>
                </>
              )}
            </button>

            {currentUser && (
              <button
                onClick={handleLogout}
                className="mt-4 text-xs font-mono font-bold text-slate-400 hover:text-red-500 transition-colors"
              >
                Sign out of current account
              </button>
            )}
          </div>
        ) : (
          <div className="relative">
            <AdminSidebar 
              items={[
                { id: "inquiries", label: "Client Inquiries", icon: <Inbox size={16} />, badge: messages.length > 0 ? messages.length : null },
                { id: "applications", label: "Job Applications", icon: <Briefcase size={16} />, badge: applications.length > 0 ? applications.length : null },
                { id: "quotes", label: "Quotation Requests", icon: <FileText size={16} />, badge: quotes.length > 0 ? quotes.length : null },
                { id: "projects", label: "Corporate Projects", icon: <CheckCircle2 size={16} />, badge: projects.length > 0 ? projects.length : null },
                { id: "portfolio-crud", label: "Portfolio CRUD", icon: <Layers size={16} />, badge: firestorePortfolio.length > 0 ? firestorePortfolio.length : null },
                { id: "blog-crud", label: "Blog CRUD", icon: <FileText size={16} />, badge: firestoreBlogPosts.length > 0 ? firestoreBlogPosts.length : null },
                { id: "jobs", label: "Current Openings", icon: <Briefcase size={16} />, badge: jobs.length > 0 ? jobs.length : null },
                { id: "plans", label: "Service Plans", icon: <Sliders size={16} />, badge: plans.length > 0 ? plans.length : null },
                { id: "services", label: "Capabilities", icon: <Layers size={16} />, badge: services.length > 0 ? services.length : null },
                { id: "gmail", label: "Gmail API", icon: <Mail size={16} />, badge: null },
              ]}
              activeTab={activeTab}
              onTabChange={(tabId) => setActiveTab(tabId as any)}
              onLogout={handleLogout}
              companyName="Kshetrajna"
              companySubtitle="Admin Panel"
              userName={currentUser?.displayName || "Admin"}
              userEmail={currentUser?.email || "admin@kshetrajna.com"}
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pl-72 pt-16 lg:pt-0 px-4 lg:px-0">
            
            {/* L1: Left Control rail (5 columns) - HIDDEN, navigation now in sidebar */}
            <div className="lg:col-span-4 hidden">
              <div className="lg:sticky lg:top-6 space-y-6 self-start">
                <div className="px-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400 font-semibold">Admin Panel</p>
                  <h3 className="mt-2 text-lg font-bold tracking-tight">Database Collections</h3>
                  <p className="mt-2 text-sm text-slate-500">Quick access to Firestore collection dashboards and CRUD sections.</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-[32px] shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-slate-100 bg-slate-50">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold">Navigation</p>
                  </div>
                    <div ref={navScrollRef} className="divide-y divide-slate-100 overflow-y-auto max-h-[60vh]">
                    {[
                      { id: "inquiries", label: "Client Inquiries", icon: <Inbox size={18} />, color: "bg-blue-50 text-blue-700", count: messages.length },
                      { id: "applications", label: "Job Applications", icon: <Briefcase size={18} />, color: "bg-amber-50 text-amber-700", count: applications.length },
                      { id: "quotes", label: "Quotation Requests", icon: <FileText size={18} />, color: "bg-purple-50 text-purple-700", count: quotes.length },
                      { id: "projects", label: "Corporate Projects", icon: <CheckCircle2 size={18} />, color: "bg-emerald-50 text-emerald-700", count: projects.length },
                      { id: "portfolio-crud", label: "Portfolio CRUD", icon: <Layers size={18} />, color: "bg-teal-50 text-teal-700", count: firestorePortfolio.length },
                      { id: "blog-crud", label: "Blog CRUD", icon: <FileText size={18} />, color: "bg-orange-50 text-orange-700", count: firestoreBlogPosts.length },
                      { id: "jobs", label: "Current Openings", icon: <Briefcase size={18} />, color: "bg-indigo-50 text-indigo-700", count: jobs.length },
                      { id: "plans", label: "Service Plans", icon: <Sliders size={18} />, color: "bg-rose-50 text-rose-700", count: plans.length },
                      { id: "services", label: "Capabilities", icon: <Layers size={18} />, color: "bg-cyan-50 text-cyan-700", count: services.length },
                      { id: "gmail", label: "Gmail API", icon: <Mail size={18} />, color: "bg-red-50 text-red-700", count: "Live" },
                    ].map((tab) => {
                      const isSelected = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          ref={(el) => { navItemRefs.current[tab.id] = el }}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`w-full flex items-center gap-3 px-6 py-4 text-left transition ${
                            isSelected ? "bg-slate-50 text-slate-900" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                          }`}
                        >
                          <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${tab.color}`}>
                            {tab.icon}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold truncate">{tab.label}</p>
                          </div>
                          <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${isSelected ? "bg-slate-100 text-slate-700" : "bg-slate-100 text-slate-500"}`}>
                            {tab.count}
                          </span>
                        </button>
                      );
                    })}
                    <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
                      {currentUser && (
                        <button
                          onClick={handleLogout}
                          className="w-full inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          Disconnect
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* L2: Right Detail Stream panel (8 columns) - now full width */}
            <div className="lg:col-span-12 bg-white border border-slate-205 rounded-2xl p-6 sm:p-8 shadow-sm">
              
              <AnimatePresence mode="wait">
                {activeTab === "inquiries" && (
                  <motion.div
                    key="inquiries"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h3 className="font-display text-base sm:text-lg font-bold text-slate-950 flex items-center space-x-2">
                        <Inbox size={20} className="text-blue-700" />
                        <span>Client Contact Inquiries</span>
                      </h3>
                      <span className="text-[10px] font-mono font-bold bg-blue-50 border border-blue-105 px-2 py-0.5 rounded text-blue-750">
                        {messages.length} Records Found
                      </span>
                    </div>

                    {messages.length === 0 ? (
                      <div className="text-center py-16 space-y-3 font-mono">
                        <AlertCircle className="mx-auto text-slate-400" size={24} />
                        <p className="text-xs font-bold text-slate-800">No contact submissions saved in Firestore.</p>
                      </div>
                    ) : (
                      <div className="space-y-3.5">
                        {messages.map((msg) => (
                          <div 
                            key={msg.id} 
                            onClick={() => setSelectedMessage(msg)}
                            className={`border rounded-xl p-4 transition-all duration-200 cursor-pointer text-xs sm:text-sm text-slate-800 ${
                              selectedMessage?.id === msg.id 
                                ? "border-blue-500 bg-blue-50/10 shadow-sm"
                                : "border-slate-200 hover:border-slate-300 bg-slate-50/20"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-display font-bold text-slate-950">{msg.subject}</h4>
                                <p className="text-[10px] text-slate-500 font-mono mt-0.5 font-semibold">
                                  From: {msg.name} ({msg.company})
                                </p>
                              </div>
                              <button
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  if (confirm("Permanently delete message from Firestore database?")) {
                                    await deleteMessageFromDB(msg.id);
                                    if (selectedMessage?.id === msg.id) setSelectedMessage(null);
                                  }
                                }}
                                className="p-1 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <p className="text-slate-650 line-clamp-2 leading-relaxed bg-slate-50 p-2 rounded text-xs mb-3 font-medium">
                              {msg.message}
                            </p>
                            <div className="flex flex-wrap justify-between items-center text-[10px] font-mono text-slate-500 gap-2">
                              <span>Support Email: <strong className="text-blue-700">{msg.email}</strong></span>
                              <span>Filing: {msg.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Expand Message Reader Panel */}
                    {selectedMessage && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-5 border border-blue-200 bg-blue-50/5 rounded-2xl relative space-y-4 shadow-sm"
                      >
                        <h4 className="text-xs uppercase font-mono tracking-wider text-blue-700 font-extrabold border-b border-blue-100 pb-2">Active Inquiry Spec Sheet</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px] font-mono">
                          <div>
                            <span className="text-slate-400 font-bold">CLIENT FULL NAME:</span>
                            <div className="text-xs text-slate-900 mt-0.5 font-sans font-bold">{selectedMessage.name}</div>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold">ORGANIZATION:</span>
                            <div className="text-xs text-slate-900 mt-0.5 font-sans font-bold">{selectedMessage.company}</div>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold">EMAIL ADDRESS:</span>
                            <div className="text-xs text-blue-700 font-bold mt-0.5">{selectedMessage.email}</div>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold">PHONE NUMBER:</span>
                            <div className="text-xs text-slate-900 mt-0.5 font-bold">{selectedMessage.phone || "Not specified."}</div>
                          </div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
                          {selectedMessage.message}
                        </div>
                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => triggerEmailReply("Inquiry", selectedMessage.name, selectedMessage.email, selectedMessage.subject)}
                            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg text-xs flex items-center space-x-1.5 shadow"
                          >
                            <Mail size={13} />
                            <span>Dispatch Gmail Reply</span>
                          </button>
                        </div>
                      </motion.div>
                    )}

                  </motion.div>
                )}

                {activeTab === "applications" && (
                  <motion.div
                    key="applications"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h3 className="font-display text-base sm:text-lg font-bold text-slate-950 flex items-center space-x-2">
                        <Briefcase size={20} className="text-amber-700" />
                        <span>Candidate job filings</span>
                      </h3>
                      <span className="text-[10px] font-mono font-bold bg-amber-50 border border-amber-105 px-2 py-0.5 rounded text-amber-750">
                        {applications.length} Applicants
                      </span>
                    </div>

                    {applications.length === 0 ? (
                      <div className="text-center py-16 space-y-3 font-mono">
                        <AlertCircle className="mx-auto text-slate-400" size={24} />
                        <p className="text-xs font-bold text-slate-800">No applications registered in Firestore.</p>
                      </div>
                    ) : (
                      <div className="space-y-3.5">
                        {applications.map((app) => (
                          <div 
                            key={app.id} 
                            onClick={() => setSelectedApp(app)}
                            className={`border rounded-xl p-4 transition-all duration-200 cursor-pointer text-xs sm:text-sm text-slate-800 ${
                              selectedApp?.id === app.id 
                                ? "border-amber-500 bg-amber-50/10 shadow-sm"
                                : "border-slate-200 hover:border-slate-300 bg-slate-50/10"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-display font-bold text-slate-950">{app.candidateName}</h4>
                                <div className="text-[10px] text-blue-700 font-bold font-mono uppercase tracking-wider mt-0.5">
                                  Applying for: {app.jobTitle}
                                </div>
                              </div>
                              <button
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  if (confirm("Permanently delete applications document from Firestore?")) {
                                    await deleteApplicationFromDB(app.id);
                                    if (selectedApp?.id === app.id) setSelectedApp(null);
                                  }
                                }}
                                className="p-1 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-600 mb-2">
                              <div className="bg-slate-50 p-1.5 rounded truncate border border-slate-100 font-bold">CV: {app.resumeFileName}</div>
                              <div className="bg-slate-50 p-1.5 rounded text-right border border-slate-100 font-bold">Experience: {app.experienceYears} Years</div>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                              <span>Candidate Mob: {app.candidatePhone}</span>
                              <span>Filing: {app.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Expand Candidate Panel */}
                    {selectedApp && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-5 border border-amber-200 bg-amber-50/5 rounded-2xl relative space-y-4 shadow-sm"
                      >
                        <h4 className="text-xs uppercase font-mono tracking-wider text-amber-700 font-extrabold border-b border-amber-100 pb-2">Active Candidacy Spec Sheet</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px] font-mono">
                          <div>
                            <span className="text-slate-400 font-bold">CANDIDATE FULL NAME:</span>
                            <div className="text-xs text-slate-900 mt-0.5 font-sans font-bold">{selectedApp.candidateName}</div>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold">JOB ROLE APPLIED:</span>
                            <div className="text-xs text-blue-700 mt-0.5 font-bold">{selectedApp.jobTitle} (ID: {selectedApp.jobId})</div>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold">EMAIL ADDRESS:</span>
                            <div className="text-xs text-blue-700 font-bold mt-0.5">{selectedApp.candidateEmail}</div>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold">CONTACT PHONE:</span>
                            <div className="text-xs text-slate-905 mt-0.5 font-bold">{selectedApp.candidatePhone}</div>
                          </div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-205 text-xs text-slate-700 leading-relaxed font-sans font-medium">
                          <strong>Cover Letter:</strong><br />
                          {selectedApp.coverLetter || "No cover statement uploaded."}
                        </div>
                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => triggerEmailReply("Application", selectedApp.candidateName, selectedApp.candidateEmail, `Your Tech Application for ${selectedApp.jobTitle}`)}
                            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg text-xs flex items-center space-x-1.5 shadow"
                          >
                            <Mail size={13} />
                            <span>Dispatch Gmail Reply</span>
                          </button>
                        </div>
                      </motion.div>
                    )}

                  </motion.div>
                )}

                {activeTab === "quotes" && (
                  <motion.div
                    key="quotes"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h3 className="font-display text-base sm:text-lg font-bold text-slate-950 flex items-center space-x-2">
                        <FileIcon size={20} className="text-purple-700" />
                        <span>Custom Quotation proposals</span>
                      </h3>
                      <span className="text-[10px] font-mono font-bold bg-purple-50 border border-purple-105 px-2 py-0.5 rounded text-purple-750">
                        {quotes.length} Quotes
                      </span>
                    </div>

                    {quotes.length === 0 ? (
                      <div className="text-center py-16 space-y-3 font-mono">
                        <AlertCircle className="mx-auto text-slate-400" size={24} />
                        <p className="text-xs font-bold text-slate-800">No quotation requests logged in Firestore database.</p>
                      </div>
                    ) : (
                      <div className="space-y-3.5">
                        {quotes.map((q) => (
                          <div 
                            key={q.id} 
                            onClick={() => setSelectedQuote(q)}
                            className={`border rounded-xl p-4 transition-all duration-200 cursor-pointer text-xs sm:text-sm text-slate-800 ${
                              selectedQuote?.id === q.id 
                                ? "border-purple-500 bg-purple-50/10 shadow-sm"
                                : "border-slate-200 hover:border-slate-300 bg-slate-50/10"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-display font-bold text-slate-950">Project: {q.serviceArea}</h4>
                                <div className="text-[10px] text-slate-500 font-mono mt-0.5 font-semibold">
                                  Requested by: {q.clientName} ({q.companyName})
                                </div>
                              </div>
                              <button
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  if (confirm("Permanently delete quotation doc from Firestore?")) {
                                    await deleteQuoteFromDB(q.id);
                                    if (selectedQuote?.id === q.id) setSelectedQuote(null);
                                  }
                                }}
                                className="p-1 text-slate-400 hover:text-red-500 rounded"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono mb-2">
                              <div className="bg-slate-50 p-1.5 rounded border border-slate-100 font-semibold">Timeline: <span className="font-bold text-slate-900">{q.timeline}</span></div>
                              <div className="bg-slate-50 p-1.5 rounded text-right border border-slate-100 font-semibold">Budget: <span className="font-bold text-blue-700">{q.estimatedBudget}</span></div>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className={`px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold ${
                                q.status === "Approved" 
                                  ? "bg-green-100 text-green-700"
                                  : q.status === "In discussion" 
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-slate-100 text-slate-500"
                              }`}>
                                {q.status}
                              </span>
                              <span className="text-[10px] font-mono text-slate-450">{q.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Expand Quote Details Panel */}
                    {selectedQuote && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-5 border border-purple-200 bg-purple-50/5 rounded-2xl relative space-y-4 shadow-sm"
                      >
                        <h4 className="text-xs uppercase font-mono tracking-wider text-purple-700 font-extrabold border-b border-purple-100 pb-2">Active Quotation Spec Sheet</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-[10px] font-mono">
                          <div>
                            <span className="text-slate-450 font-bold">CLIENT REPRESENTATIVE:</span>
                            <div className="text-xs text-slate-900 mt-0.5 font-sans font-bold">{selectedQuote.clientName}</div>
                          </div>
                          <div>
                            <span className="text-slate-450 font-bold">COMPANY NAME:</span>
                            <div className="text-xs text-slate-900 mt-0.5 font-sans font-bold">{selectedQuote.companyName}</div>
                          </div>
                          <div>
                            <span className="text-slate-450 font-bold">EMAIL ADDRESS:</span>
                            <div className="text-xs text-blue-700 font-bold mt-0.5">{selectedQuote.clientEmail}</div>
                          </div>
                          <div>
                            <span className="text-slate-450 font-bold">SYSTEM DOMAIN:</span>
                            <div className="text-xs text-purple-700 font-bold mt-0.5">{selectedQuote.serviceArea}</div>
                          </div>
                          <div>
                            <span className="text-slate-450 font-bold">TARGET TIMELINE:</span>
                            <div className="text-xs text-indigo-700 font-bold mt-0.5">{selectedQuote.timeline || "1-3 Months (Standard)"}</div>
                          </div>
                          <div>
                            <span className="text-slate-450 font-bold">FINANCIAL CAPABILITY:</span>
                            <div className="text-xs text-emerald-700 font-bold mt-0.5">{selectedQuote.estimatedBudget || "Not specified"}</div>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs leading-relaxed font-medium text-slate-705">
                          <strong>Requirements Description:</strong><br />
                          {selectedQuote.requirements}
                        </div>

                        <div className="flex flex-wrap justify-between items-center gap-4 pt-2 border-t border-slate-105">
                          <div className="flex items-center space-x-2 text-xs">
                            <span className="font-bold text-slate-600 font-mono">Workflow controls:</span>
                            <select
                              value={selectedQuote.status}
                              onChange={(e) => handleUpdateQuoteStatus(selectedQuote.id, e.target.value as any)}
                              className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs font-semibold focus:outline-none focus:border-blue-700"
                            >
                              <option value="Pending review">Pending review</option>
                              <option value="In discussion">In discussion</option>
                              <option value="Approved">Approved</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </div>

                          <button
                            onClick={() => triggerEmailReply("Quotation Proposal", selectedQuote.clientName, selectedQuote.clientEmail, `Custom Quotation specs: ${selectedQuote.serviceArea}`)}
                            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg text-xs flex items-center space-x-1.5 shadow"
                          >
                            <Mail size={13} />
                            <span>Reply with Gmail</span>
                          </button>
                        </div>
                      </motion.div>
                    )}

                  </motion.div>
                )}

                {activeTab === "projects" && (
                  <motion.div
                    key="projects"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h3 className="font-display text-base sm:text-lg font-bold text-slate-950 flex items-center space-x-2">
                        <Layers size={20} className="text-emerald-700" />
                        <span>Started Plan purchases</span>
                      </h3>
                      <span className="text-[10px] font-mono font-bold bg-emerald-50 border border-emerald-105 px-2 py-0.5 rounded text-emerald-750">
                        {projects.length} Projects
                      </span>
                    </div>

                    {projects.length === 0 ? (
                      <div className="text-center py-16 space-y-3 font-mono">
                        <AlertCircle className="mx-auto text-slate-400" size={24} />
                        <p className="text-xs font-bold text-slate-800">No project plan purchases logged in Firestore.</p>
                      </div>
                    ) : (
                      <div className="space-y-3.5">
                        {projects.map((p) => (
                          <div 
                            key={p.id} 
                            onClick={() => setSelectedProject(p)}
                            className={`border rounded-xl p-4 transition-all duration-200 cursor-pointer text-xs sm:text-sm text-slate-800 ${
                              selectedProject?.id === p.id 
                                ? "border-emerald-500 bg-emerald-50/10 shadow-sm"
                                : "border-slate-200 hover:border-slate-300 bg-slate-50/10"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-display font-bold text-slate-950">{p.planName}</h4>
                                <div className="text-[10px] text-slate-500 font-mono mt-0.5 font-semibold">
                                  Client: {p.clientName} ({p.companyName})
                                </div>
                              </div>
                              <button
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  if (confirm("Permanently delete project document from Firestore?")) {
                                    await deleteProjectFromDB(p.id);
                                    if (selectedProject?.id === p.id) setSelectedProject(null);
                                  }
                                }}
                                className="p-1 text-slate-400 hover:text-red-500 rounded"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>

                            <p className="text-slate-650 text-xs mb-3 truncate bg-slate-50 p-2 border border-slate-100 rounded font-medium">
                              Scope adjustments: {p.additionalFeatures || "Standard configuration spec."}
                            </p>

                            <div className="flex justify-between items-center text-[10px] font-mono">
                              <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                                p.status === "Finished" 
                                  ? "bg-green-105 bg-green-100 text-green-700"
                                  : p.status === "Active execution" 
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-slate-100 text-slate-500"
                              }`}>
                                {p.status}
                              </span>
                              <span className="text-slate-450">{p.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Expand Project Panel */}
                    {selectedProject && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-5 border border-emerald-200 bg-emerald-50/5 rounded-2xl relative space-y-4 shadow-sm"
                      >
                        <h4 className="text-xs uppercase font-mono tracking-wider text-emerald-700 font-extrabold border-b border-emerald-100 pb-2">Active Project Plan Spec Sheet</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px] font-mono">
                          <div>
                            <span className="text-slate-400 font-bold">CLIENT NAME:</span>
                            <div className="text-xs text-slate-900 mt-0.5 font-sans font-bold">{selectedProject.clientName}</div>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold">SELECTED PLAN PACKAGE:</span>
                            <div className="text-xs text-emerald-700 font-bold mt-0.5 font-sans uppercase">{selectedProject.planName}</div>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold">CORPORATE GROUP:</span>
                            <div className="text-xs text-slate-905 mt-0.5 font-sans font-bold">{selectedProject.companyName}</div>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold">CLIENT EMAIL:</span>
                            <div className="text-xs text-blue-700 font-bold mt-0.5">{selectedProject.clientEmail}</div>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs leading-relaxed font-sans font-medium">
                          <strong>Add-on requests:</strong><br />
                          {selectedProject.additionalFeatures || "No extra custom properties declared."}
                        </div>

                        <div className="flex flex-wrap justify-between items-center gap-4 pt-2 border-t border-slate-105">
                          <div className="flex items-center space-x-2 text-xs">
                            <span className="font-bold text-slate-655 font-mono">Progression workflow:</span>
                            <select
                              value={selectedProject.status}
                              onChange={(e) => handleUpdateProjectStatus(selectedProject.id, e.target.value as any)}
                              className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs font-semibold focus:outline-none focus:border-blue-700"
                            >
                              <option value="Initializing">Initializing</option>
                              <option value="In planning">In planning</option>
                              <option value="Active execution">Active execution</option>
                              <option value="Finished">Finished</option>
                            </select>
                          </div>

                          <button
                            onClick={() => triggerEmailReply("Project plan", selectedProject.clientName, selectedProject.clientEmail, `Initialization plan setup: ${selectedProject.planName}`)}
                            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg text-xs flex items-center space-x-1.5 shadow"
                          >
                            <Mail size={13} />
                            <span>Reply with Gmail</span>
                          </button>
                        </div>
                      </motion.div>
                    )}

                  </motion.div>
                )}

                {activeTab === "gmail" && (
                  <motion.div
                    key="gmail"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                    id="gmail-integration-console"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h3 className="font-display text-base sm:text-lg font-bold text-slate-950 flex items-center space-x-2">
                        <Mail size={20} className="text-red-700" />
                        <span>Corporate Gmail Dispatch Center</span>
                      </h3>
                      {accessToken ? (
                        <span className="text-[10px] font-mono font-bold bg-green-50 border border-green-150 px-2.5 py-0.5 rounded text-green-700">
                          OAuth Active
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-bold bg-red-50 border border-red-150 px-2.5 py-0.5 rounded text-red-700">
                          OAuth Inactive
                        </span>
                      )}
                    </div>

                    {!accessToken && (
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="text-xs text-amber-805 text-amber-800 font-semibold leading-relaxed">
                          <strong>Gmail API Authorization Required:</strong> Your session does not have an active Google OAuth access token. Please authorize to compose and send emails.
                        </div>
                        <button
                          type="button"
                          onClick={handleLogin}
                          className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg text-xs shrink-0 cursor-pointer shadow transition-all hover:scale-[1.02]"
                        >
                          Authorize Gmail API
                        </button>
                      </div>
                    )}

                    {/* Quick sending email form */}
                    <form onSubmit={handleSendGmail} className="space-y-4 text-xs sm:text-sm">
                      <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold border-b border-slate-100 pb-1.5 flex items-center space-x-1">
                        <Send size={11} className="text-blue-700" />
                        <span>Compose Secure Reply Packet</span>
                      </h4>

                      {mailStatus && (
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-xs font-mono font-bold">
                          {mailStatus}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-705 font-bold mb-1.5">Recipient Full Email *</label>
                          <input
                            type="email"
                            required
                            value={toEmail}
                            onChange={(e) => setToEmail(e.target.value)}
                            placeholder="applicant@gmail.com"
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-705 font-bold mb-1.5">Email Subject Line</label>
                          <input
                            type="text"
                            value={emailSubject}
                            onChange={(e) => setEmailSubject(e.target.value)}
                            placeholder="Re: Tech Inquiry - Kshetrajna Technologies"
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-705 font-bold mb-1.5">Mime Plain-text Body Contents *</label>
                        <textarea
                          required
                          rows={6}
                          value={emailBody}
                          onChange={(e) => setEmailBody(e.target.value)}
                          placeholder="Type your official direct email callback message here. It is automatically wrapped in Kshetrajna Corporate branding signatures..."
                          className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3.5 py-3 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-medium"
                        />
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          disabled={mailSending}
                          className="px-6 py-3 bg-red-750 bg-red-700 hover:bg-red-800 font-bold font-display text-white rounded-xl text-xs sm:text-sm shadow flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
                        >
                          {mailSending ? (
                            <>
                              <span>Sending SMTP package...</span>
                              <RefreshCw size={13} className="animate-spin" />
                            </>
                          ) : (
                            <>
                              <Send size={13} />
                              <span>Send via oauth.gmail API</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>

                    {/* Fetch and verify Gmail communications */}
                    <div className="pt-6 border-t border-slate-100 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold">Verify Sent Inbox History</h4>
                        <button
                          type="button"
                          onClick={fetchRecentEmails}
                          disabled={gmailLoading}
                          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-650 hover:text-slate-950 font-mono text-[10px] font-bold rounded border border-slate-200 flex items-center space-x-1"
                        >
                          <RefreshCw size={10} className={gmailLoading ? "animate-spin" : ""} />
                          <span>Retrieve logs</span>
                        </button>
                      </div>

                      {gmailLoading ? (
                        <div className="text-center py-6 text-xs text-slate-450 font-mono">
                          Querying messages via authorized HTTP Bearer client...
                        </div>
                      ) : gmailMessages.length === 0 ? (
                        <div className="p-4 bg-slate-25 bg-slate-50 border border-slate-100 rounded-xl text-center text-[11px] text-slate-500 font-sans font-medium">
                          No recent messages scanned. Hit Retrieve logs to fetch directly from real Gmail API credentials.
                        </div>
                      ) : (
                        <div className="space-y-2 text-xs">
                          {gmailMessages.map((m, idx) => (
                            <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                                <span>Msg Unique ID: {m.id}</span>
                                <span>Estimated Size: {m.sizeEstimate} Bytes</span>
                              </div>
                              <p className="text-slate-700 leading-relaxed font-mono text-[11px] truncate">
                                Snippet Preview: {m.snippet}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </motion.div>
                )}

                {activeTab === "jobs" && (
                  <motion.div
                    key="jobs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                    id="jobs-management-console"
                  >
                    <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-3 gap-3">
                      <div className="space-y-1">
                        <h3 className="font-display text-base sm:text-lg font-bold text-slate-950 flex items-center space-x-2">
                          <Briefcase size={20} className="text-indigo-700" />
                          <span>Current Careers & Openings</span>
                        </h3>
                        <p className="text-slate-500 text-xs font-medium leading-tight">
                          Manage job vacancies listed in real-time. Created roles display instantly on the Careers page.
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono font-bold bg-indigo-50 border border-indigo-150 px-2.5 py-0.5 rounded text-indigo-700">
                          {jobs.length} Active Vacancies
                        </span>
                        {jobs.length === 0 && (
                          <button
                            type="button"
                            onClick={handleSeedJobs}
                            disabled={isSeedingJobs}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-[10px] font-bold rounded shadow-sm transition-all flex items-center space-x-1 disabled:opacity-50"
                          >
                            <RefreshCw size={10} className={isSeedingJobs ? "animate-spin" : ""} />
                            <span>{isSeedingJobs ? "Seeding..." : "Seed Default Openings"}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left Side: Create Opening Form */}
                      <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-5 space-y-4">
                        <h4 className="text-xs uppercase font-mono tracking-wider text-slate-500 font-bold border-b border-slate-100 pb-2 flex items-center space-x-1.5">
                          <Sparkles size={12} className="text-indigo-600" />
                          <span>{editingJobId ? "Modify Job Opening" : "Bootstrap New Opening"}</span>
                        </h4>

                        {jobCreateStatus && (
                          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-800 text-xs font-mono font-bold leading-relaxed">
                            {jobCreateStatus}
                          </div>
                        )}

                        <form onSubmit={handleCreateJob} className="space-y-3.5 text-xs sm:text-sm">
                          <div>
                            <label className="block text-slate-705 font-bold mb-1">Job Title *</label>
                            <input
                              type="text"
                              required
                              value={newJobTitle}
                              onChange={(e) => setNewJobTitle(e.target.value)}
                              placeholder="e.g. Senior Backend Engineer"
                              className="w-full bg-white border border-slate-200 text-slate-900 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 font-medium"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-slate-705 font-bold mb-1">Department *</label>
                              <select
                                value={newJobDept}
                                onChange={(e) => setNewJobDept(e.target.value)}
                                className="w-full bg-white border border-slate-200 text-slate-800 px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-600 font-semibold"
                              >
                                <option value="Engineering Group">Engineering Group</option>
                                <option value="Cloud Practice">Cloud Practice</option>
                                <option value="Solutions Group">Solutions Group</option>
                                <option value="Design & UX">Design & UX</option>
                                <option value="Operations">Operations</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-slate-705 font-bold mb-1">Job Type *</label>
                              <select
                                value={newJobType}
                                onChange={(e) => setNewJobType(e.target.value as any)}
                                className="w-full bg-white border border-slate-200 text-slate-800 px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-600 font-semibold"
                              >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Remote">Remote</option>
                                <option value="Internship font-semibold">Internship</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-slate-705 font-bold mb-1">Location *</label>
                              <input
                                type="text"
                                required
                                value={newJobLocation}
                                onChange={(e) => setNewJobLocation(e.target.value)}
                                placeholder="Botad / Remote (India)"
                                className="w-full bg-white border border-slate-200 text-slate-900 px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-600 font-medium"
                              />
                            </div>

                            <div>
                              <label className="block text-slate-705 font-bold mb-1">Experience required *</label>
                              <input
                                type="text"
                                required
                                value={newJobExperience}
                                onChange={(e) => setNewJobExperience(e.target.value)}
                                placeholder="e.g. 3+ Years"
                                className="w-full bg-white border border-slate-200 text-slate-900 px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-600 font-medium"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-slate-705 font-bold mb-1">Compensation / Salary Range *</label>
                            <input
                              type="text"
                              required
                              value={newJobSalary}
                              onChange={(e) => setNewJobSalary(e.target.value)}
                              placeholder="e.g. Competitive Compensation / Equity"
                              className="w-full bg-white border border-slate-200 text-slate-900 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-indigo-600 font-medium"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-705 font-bold mb-1">Role Description *</label>
                            <textarea
                              required
                              rows={3}
                              value={newJobDescription}
                              onChange={(e) => setNewJobDescription(e.target.value)}
                              placeholder="Fleshed-out background of the opportunity..."
                              className="w-full bg-white border border-slate-200 text-slate-900 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-indigo-600 font-medium resize-none"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-705 font-bold mb-1">
                              Responsibilities (one per line) *
                            </label>
                            <textarea
                              rows={3}
                              required
                              value={newJobResponsibilities}
                              onChange={(e) => setNewJobResponsibilities(e.target.value)}
                              placeholder="e.g. Architect modular codebases&#10;Deploy robust Firestore indices"
                              className="w-full bg-white border border-slate-200 text-slate-900 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-indigo-600 font-mono text-[11px] resize-none"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-705 font-bold mb-1">
                              Job Requirements (one per line) *
                            </label>
                            <textarea
                              rows={3}
                              required
                              value={newJobRequirements}
                              onChange={(e) => setNewJobRequirements(e.target.value)}
                              placeholder="e.g. 4+ years of professional engineering&#10;Absolute love for clean typescript"
                              className="w-full bg-white border border-slate-200 text-slate-900 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-indigo-600 font-mono text-[11px] resize-none"
                            />
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2 pt-2">
                            <button
                              type="submit"
                              className="flex-1 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 font-bold font-display text-white rounded-xl text-xs sm:text-sm shadow-md cursor-pointer transition-all flex items-center justify-center space-x-1.5"
                            >
                              <Check size={14} />
                              <span>{editingJobId ? "Update Job Vacancy" : "Create Opening vacancy"}</span>
                            </button>
                            {editingJobId && (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingJobId(null);
                                  setNewJobTitle("");
                                  setNewJobDept("Engineering Group");
                                  setNewJobLocation("Botad / Remote (India)");
                                  setNewJobType("Full-time");
                                  setNewJobExperience("");
                                  setNewJobSalary("");
                                  setNewJobDescription("");
                                  setNewJobResponsibilities("");
                                  setNewJobRequirements("");
                                }}
                                className="px-4 py-2.5 border border-slate-300 hover:bg-slate-150 text-slate-705 font-bold rounded-xl text-xs sm:text-sm shadow-sm cursor-pointer transition-all bg-white"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </form>
                      </div>

                      {/* Right Side: Vacancies List & Quick actions */}
                      <div className="space-y-4">
                        <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold border-b border-slate-100 pb-2">
                          Live Active Openings List
                        </h4>

                        {jobs.length === 0 ? (
                          <div className="border border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50/25 space-y-3 font-mono">
                            <AlertCircle className="mx-auto text-slate-400" size={20} />
                            <p className="text-xs font-bold text-slate-800">No active job listings are live in Firestore.</p>
                            <p className="text-[10px] text-slate-550 max-w-xs mx-auto leading-relaxed">
                              You can manually bootstrap a vacancy on the left or seed defaults to test!
                            </p>
                          </div>
                        ) : (
                          <div className="max-h-[70vh] overflow-y-auto space-y-3 pr-1">
                            {jobs.map((job) => (
                              <div
                                key={job.id}
                                onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)}
                                className={`border rounded-xl p-4 transition-all duration-200 cursor-pointer text-xs sm:text-sm text-slate-800 ${
                                  selectedJob?.id === job.id
                                    ? "border-indigo-500 bg-indigo-50/5 shadow-sm"
                                    : "border-slate-200 hover:border-slate-300 bg-slate-50/25"
                                }`}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex-1 min-w-0 pr-2">
                                    <h4 className="font-display font-bold text-slate-950 flex items-center gap-1.5 flex-wrap">
                                      <span className="truncate">{job.title}</span>
                                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                                        {job.type}
                                      </span>
                                    </h4>
                                    <p className="text-[10px] text-slate-500 font-mono mt-1 font-semibold">
                                      Dept: {job.department} | Loc: {job.location}
                                    </p>
                                  </div>
                                  <div className="flex items-center space-x-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditingJobId(job.id);
                                        setNewJobTitle(job.title);
                                        setNewJobDept(job.department);
                                        setNewJobLocation(job.location);
                                        setNewJobType(job.type);
                                        setNewJobExperience(job.experience);
                                        setNewJobSalary(job.salary);
                                        setNewJobDescription(job.description);
                                        setNewJobResponsibilities(job.responsibilities.join("\n"));
                                        setNewJobRequirements(job.requirements.join("\n"));
                                        window.scrollTo({ top: 300, behavior: "smooth" });
                                      }}
                                      className="p-1 px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-xs font-bold font-mono transition-colors flex items-center space-x-1 shrink-0 cursor-pointer"
                                      title="Edit Vacancy Specifications"
                                    >
                                      <Edit size={11} />
                                      <span>EDIT</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={async () => {
                                        if (confirm(`Are you sure you want to CLOSE & REMOVE the opening: "${job.title}"?`)) {
                                          await deleteJobFromDB(job.id);
                                          if (selectedJob?.id === job.id) setSelectedJob(null);
                                          if (editingJobId === job.id) {
                                            setEditingJobId(null);
                                            setNewJobTitle("");
                                            setNewJobExperience("");
                                            setNewJobSalary("");
                                            setNewJobDescription("");
                                            setNewJobResponsibilities("");
                                            setNewJobRequirements("");
                                          }
                                        }
                                      }}
                                      className="p-1 px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold font-mono transition-colors flex items-center space-x-1 shrink-0"
                                      title="Close / Delete Job Opening"
                                    >
                                      <Trash2 size={12} />
                                      <span>CLOSE</span>
                                    </button>
                                  </div>
                                </div>

                                <p className="text-slate-650 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-lg text-[11px] mb-2 font-medium">
                                  {job.description}
                                </p>

                                <div className="flex flex-wrap justify-between items-center text-[10px] font-mono text-slate-500 gap-1.5 pt-1">
                                  <span>Exp: <strong className="text-slate-700">{job.experience}</strong></span>
                                  <span>Salary: <strong className="text-indigo-700">{job.salary}</strong></span>
                                </div>

                                {selectedJob?.id === job.id && (
                                  <div className="mt-4 pt-3 border-t border-slate-200 space-y-3 text-[11px] text-slate-700 animate-fade-in block">
                                    <div>
                                      <h5 className="font-bold font-display text-[10px] text-slate-900 uppercase font-mono tracking-wider mb-1">Responsibilities:</h5>
                                      <ul className="list-disc list-inside space-y-0.5 pl-1">
                                        {job.responsibilities.map((r, idx) => <li key={idx} className="truncate">{r}</li>)}
                                      </ul>
                                    </div>
                                    <div>
                                      <h5 className="font-bold font-display text-[10px] text-slate-900 uppercase font-mono tracking-wider mb-1">Requirements:</h5>
                                      <ul className="list-disc list-inside space-y-0.5 pl-1">
                                        {job.requirements.map((r, idx) => <li key={idx} className="truncate">{r}</li>)}
                                      </ul>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "plans" && (
                  <motion.div
                    key="plans"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-display text-xl font-bold text-slate-900">Dynamic Service Plans Console</h3>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">CRUD administration module for PlansView pricing tiers</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start animate-fade-in">
                      {/* Create form */}
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center space-x-2 text-rose-700">
                          <Sliders size={16} />
                          <span className="text-xs font-mono font-bold uppercase tracking-wider">{editingPlanId ? "Modify Existing Plan" : "Configure New Service Plan"}</span>
                        </div>

                        {planCreateStatus && (
                          <div className={`p-3 rounded-lg text-xs font-bold leading-relaxed ${
                            planCreateStatus.startsWith("SUCCESS") ? "bg-emerald-50 border border-emerald-250 text-emerald-800" : "bg-red-50 border border-red-200 text-red-800"
                          }`}>
                            {planCreateStatus}
                          </div>
                        )}

                        <form onSubmit={handleCreatePlan} className="space-y-3 text-xs">
                          <div>
                            <label className="block text-slate-700 font-bold mb-1">Plan Display Name *</label>
                            <input
                              type="text"
                              required
                              value={planName}
                              onChange={(e) => setPlanName(e.target.value)}
                              placeholder="e.g. Enterprise Microservices Fabric"
                              className="w-full bg-white border border-slate-200 text-slate-900 px-3 py-2 rounded-lg font-medium focus:outline-none focus:border-rose-600"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-slate-700 font-bold mb-1">Price Label *</label>
                              <input
                                type="text"
                                required
                                value={planPrice}
                                onChange={(e) => setPlanPrice(e.target.value)}
                                placeholder="e.g. $19,500 / Custom"
                                className="w-full bg-white border border-slate-200 text-slate-900 px-3 py-2 rounded-lg font-medium focus:outline-none focus:border-rose-600"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-700 font-bold mb-1">Delivery Duration *</label>
                              <input
                                type="text"
                                required
                                value={planDuration}
                                onChange={(e) => setPlanDuration(e.target.value)}
                                placeholder="e.g. 10 - 14 Business Days"
                                className="w-full bg-white border border-slate-200 text-slate-900 px-3 py-2 rounded-lg font-medium focus:outline-none focus:border-rose-600"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-slate-700 font-bold mb-1">Brief Tagline Description *</label>
                            <input
                              type="text"
                              required
                              value={planTagline}
                              onChange={(e) => setPlanTagline(e.target.value)}
                              placeholder="Describe who this tier is meant for..."
                              className="w-full bg-white border border-slate-200 text-slate-900 px-3 py-2 rounded-lg font-medium focus:outline-none focus:border-rose-600"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-700 font-bold mb-1">Display Ribbon / Badge (Optional)</label>
                            <input
                              type="text"
                              value={planBadge}
                              onChange={(e) => setPlanBadge(e.target.value)}
                              placeholder="e.g. Highly Requested / Popular"
                              className="w-full bg-white border border-slate-200 text-slate-900 px-3 py-2 rounded-lg font-medium focus:outline-none focus:border-rose-600"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-700 font-bold mb-1">Key Deliverables / Features (one per line) *</label>
                            <textarea
                              rows={4}
                              required
                              value={planFeatures}
                              onChange={(e) => setPlanFeatures(e.target.value)}
                              placeholder="e.g. Absolute 12-Month SLA Support&#10;Dynamic dashboard console&#10;OAuth Google Workspace logs integration"
                              className="w-full bg-white border border-slate-200 text-slate-900 px-3 py-2 rounded-lg font-mono text-[11px] focus:outline-none focus:border-rose-600 resize-none"
                            />
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2 pt-1">
                            <button
                              type="submit"
                              className="flex-1 px-5 py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-xl shadow cursor-pointer transition-all hover:scale-[1.01]"
                            >
                              {editingPlanId ? "Update Plan Settings" : "Publish New Service Plan"}
                            </button>
                            {editingPlanId && (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingPlanId(null);
                                  setPlanName("");
                                  setPlanPrice("");
                                  setPlanDuration("");
                                  setPlanTagline("");
                                  setPlanBadge("");
                                  setPlanFeatures("");
                                }}
                                className="px-4 py-2.5 border border-slate-300 hover:bg-slate-150 text-slate-700 font-bold rounded-xl shadow cursor-pointer transition-all bg-white"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </form>
                      </div>

                      {/* List area */}
                      <div className="space-y-4">
                        <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold border-b border-slate-100 pb-2">Active Service Plans (Firestore)</h4>
                        {plans.length === 0 ? (
                          <div className="border border-dashed border-slate-200 rounded-2xl p-6 text-center bg-slate-50/20 font-sans text-xs font-semibold text-slate-500">
                            No custom service plans are currently configured in your Firebase database.
                            <div className="text-[10px] text-slate-400 font-mono mt-3 leading-relaxed font-normal">
                              The user-facing PlansView will seamlessly fall back to displaying the standard 3 statically coded packages until you create one here.
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3 max-h-[80vh] overflow-y-auto pr-1">
                            {plans.map((p) => (
                              <div key={p.id} className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 text-xs relative shadow-sm">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h5 className="font-display font-bold text-slate-950 text-sm flex items-center gap-2">
                                      <span>{p.name}</span>
                                      {p.badge && (
                                        <span className="text-[9px] font-mono px-2 py-0.5 bg-rose-50 text-rose-700 font-extrabold rounded-full border border-rose-100">
                                          {p.badge}
                                        </span>
                                      )}
                                    </h5>
                                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                                      Price: <strong className="text-rose-600">{p.price}</strong> | Duration: {p.duration}
                                    </p>
                                  </div>
                                  <div className="flex items-center space-x-1.5 shrink-0">
                                    <button
                                      onClick={() => {
                                        setEditingPlanId(p.id);
                                        setPlanName(p.name);
                                        setPlanPrice(p.price);
                                        setPlanDuration(p.duration);
                                        setPlanTagline(p.tagline || "");
                                        setPlanBadge(p.badge || "");
                                        setPlanFeatures(p.features.join("\n"));
                                        window.scrollTo({ top: 300, behavior: "smooth" });
                                      }}
                                      className="p-1 px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer"
                                      title="Edit Service Plan"
                                    >
                                      <Edit size={11} />
                                      <span>EDIT</span>
                                    </button>
                                    <button
                                      onClick={async () => {
                                        if (confirm(`Permanently delete the plan "${p.name}"?`)) {
                                          await deleteServicePlanFromDB(p.id);
                                          if (editingPlanId === p.id) {
                                            setEditingPlanId(null);
                                            setPlanName("");
                                            setPlanPrice("");
                                            setPlanDuration("");
                                            setPlanTagline("");
                                            setPlanBadge("");
                                            setPlanFeatures("");
                                          }
                                        }
                                      }}
                                      className="p-1 px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-650 rounded text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer"
                                    >
                                      <Trash2 size={11} />
                                      <span>DELETE</span>
                                    </button>
                                  </div>
                                </div>
                                <p className="text-slate-600 font-medium italic text-[11px] bg-slate-50 border border-slate-100 p-2 rounded">
                                  {p.tagline}
                                </p>
                                <div className="space-y-1 pt-1">
                                  <span className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-widest pl-1 block">Inclusions:</span>
                                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-600 font-semibold pl-1">
                                    {p.features.map((f, i) => <li key={i}>{f}</li>)}
                                  </ul>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "portfolio-crud" && (
                  <motion.div
                    key="portfolio-crud"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-display text-xl font-bold text-slate-900">Portfolio Projects Management</h3>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">Create, update, and delete featured portfolio items.</p>
                    </div>

                    {portfolioCreateStatus && (
                      <div className={`p-4 rounded-lg text-xs font-bold ${
                        portfolioCreateStatus.includes("SUCCESS") ? "bg-emerald-50 border border-emerald-200 text-emerald-800" : "bg-red-50 border border-red-200 text-red-800"
                      }`}>
                        {portfolioCreateStatus}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                        <h4 className="text-sm font-bold text-teal-700">{selectedPortfolio ? "Edit Portfolio Project" : "Create Portfolio Project"}</h4>
                        <form onSubmit={handleCreatePortfolio} className="space-y-3 text-xs">
                          <div>
                            <label className="block text-slate-700 font-bold mb-1">Project Title *</label>
                            <input
                              type="text"
                              required
                              value={portfolioTitle}
                              onChange={(e) => setPortfolioTitle(e.target.value)}
                              className="w-full bg-white border border-slate-200 text-slate-900 px-3 py-2 rounded-lg font-medium focus:outline-none focus:border-teal-600"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-700 font-bold mb-1">Client / Organization *</label>
                            <input
                              type="text"
                              required
                              value={portfolioClient}
                              onChange={(e) => setPortfolioClient(e.target.value)}
                              className="w-full bg-white border border-slate-200 text-slate-900 px-3 py-2 rounded-lg font-medium focus:outline-none focus:border-teal-600"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-700 font-bold mb-1">Project Summary *</label>
                            <textarea
                              rows={3}
                              required
                              value={portfolioDescription}
                              onChange={(e) => setPortfolioDescription(e.target.value)}
                              className="w-full bg-white border border-slate-200 text-slate-900 px-3 py-2 rounded-lg font-medium focus:outline-none focus:border-teal-600 resize-none"
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-slate-700 font-bold mb-1">Category</label>
                              <input
                                type="text"
                                value={portfolioCategory}
                                onChange={(e) => setPortfolioCategory(e.target.value)}
                                className="w-full bg-white border border-slate-200 text-slate-900 px-3 py-2 rounded-lg font-medium focus:outline-none focus:border-teal-600"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-700 font-bold mb-1">Year</label>
                              <input
                                type="number"
                                value={portfolioYear}
                                onChange={(e) => setPortfolioYear(e.target.value)}
                                className="w-full bg-white border border-slate-200 text-slate-900 px-3 py-2 rounded-lg font-medium focus:outline-none focus:border-teal-600"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-slate-700 font-bold mb-1">Technology / Services Used</label>
                            <input
                              type="text"
                              value={portfolioServices}
                              onChange={(e) => setPortfolioServices(e.target.value)}
                              placeholder="Comma separated"
                              className="w-full bg-white border border-slate-200 text-slate-900 px-3 py-2 rounded-lg font-medium focus:outline-none focus:border-teal-600"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-700 font-bold mb-1">Key Results / Outcomes</label>
                            <textarea
                              rows={3}
                              value={portfolioResults}
                              onChange={(e) => setPortfolioResults(e.target.value)}
                              placeholder="One result per line"
                              className="w-full bg-white border border-slate-200 text-slate-900 px-3 py-2 rounded-lg font-mono text-[11px] focus:outline-none focus:border-teal-600 resize-none"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-700 font-bold mb-1">Image URL</label>
                            <input
                              type="text"
                              value={portfolioImage}
                              onChange={(e) => setPortfolioImage(e.target.value)}
                              placeholder="https://..."
                              className="w-full bg-white border border-slate-200 text-slate-900 px-3 py-2 rounded-lg font-medium focus:outline-none focus:border-teal-600"
                            />
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2 pt-1">
                            <button
                              type="submit"
                              className="flex-1 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow cursor-pointer transition-all hover:scale-[1.01]"
                            >
                              {selectedPortfolio ? "Update Project" : "Create Project"}
                            </button>
                            {selectedPortfolio && (
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedPortfolio(null);
                                  setPortfolioTitle("");
                                  setPortfolioClient("");
                                  setPortfolioDescription("");
                                  setPortfolioCategory("");
                                  setPortfolioServices("");
                                  setPortfolioYear("");
                                  setPortfolioResults("");
                                  setPortfolioImage("");
                                }}
                                className="px-4 py-2.5 border border-slate-300 hover:bg-slate-150 text-slate-700 font-bold rounded-xl shadow cursor-pointer transition-all bg-white"
                              >
                                Cancel Edit
                              </button>
                            )}
                          </div>
                        </form>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold border-b border-slate-100 pb-2">Projects in Firestore</h4>
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                          <div className="p-4 bg-slate-50 border-b border-slate-200">
                            <h4 className="text-sm font-bold text-teal-700">Projects in Firestore</h4>
                          </div>
                          <div className="max-h-96 overflow-y-auto">
                            {firestorePortfolio.length === 0 ? (
                              <div className="p-4 text-center text-xs text-slate-500">No projects yet</div>
                            ) : (
                              firestorePortfolio.map((proj) => (
                                <div key={proj.id} className="p-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer">
                                  <div className="flex justify-between items-start mb-1">
                                    <p className="font-semibold text-xs text-slate-900">{proj.title}</p>
                                    <div className="flex gap-1">
                                      <button
                                        onClick={() => {
                                          setSelectedPortfolio(proj);
                                          setPortfolioTitle(proj.title);
                                          setPortfolioClient(proj.client);
                                          setPortfolioDescription(proj.description);
                                          setPortfolioCategory(proj.category);
                                          setPortfolioServices(proj.services.join(", "));
                                          setPortfolioYear(proj.year.toString());
                                          setPortfolioResults(proj.results.join("\n"));
                                          setPortfolioImage(proj.image);
                                        }}
                                        className="px-1.5 py-0.5 bg-teal-100 hover:bg-teal-200 text-teal-700 text-[9px] font-bold rounded"
                                      >
                                        Edit
                                      </button>
                                      <button onClick={() => handleDeletePortfolio(proj.id)} className="px-1.5 py-0.5 bg-red-100 hover:bg-red-200 text-red-700 text-[9px] font-bold rounded">Delete</button>
                                    </div>
                                  </div>
                                  <p className="text-[9px] text-slate-600">{proj.client} • {proj.year}</p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "blog-crud" && (
                  <motion.div
                    key="blog-crud"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-display text-xl font-bold text-slate-900">Blog Posts Management</h3>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">Create, update, and delete blog articles</p>
                    </div>

                    {blogCreateStatus && (
                      <div className={`p-4 rounded-lg text-xs font-bold ${
                        blogCreateStatus.includes("SUCCESS") ? "bg-orange-100 text-orange-800" : "bg-red-100 text-red-800"
                      }`}>
                        {blogCreateStatus}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Create/Edit Form */}
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 max-h-96 overflow-y-auto">
                        <h4 className="text-sm font-bold text-orange-700">{selectedFirestoreBlogPost ? "Edit Post" : "Create Post"}</h4>
                        <form onSubmit={handleCreateBlogPost} className="space-y-2 text-xs">
                          <div>
                            <label className="block text-[9px] uppercase font-bold text-slate-600 mb-1">Title *</label>
                            <input type="text" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-orange-500" />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase font-bold text-slate-600 mb-1">Summary *</label>
                            <textarea value={blogSummary} onChange={(e) => setBlogSummary(e.target.value)} rows={2} className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-orange-500" />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase font-bold text-slate-600 mb-1">Content *</label>
                            <textarea value={blogContent} onChange={(e) => setBlogContent(e.target.value)} rows={4} className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-orange-500" />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[9px] uppercase font-bold text-slate-600 mb-1">Category</label>
                              <input type="text" value={blogCategory} onChange={(e) => setBlogCategory(e.target.value)} className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-orange-500" />
                            </div>
                            <div>
                              <label className="block text-[9px] uppercase font-bold text-slate-600 mb-1">Read Time (min)</label>
                              <input type="number" value={blogReadTime} onChange={(e) => setBlogReadTime(e.target.value)} className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-orange-500" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[9px] uppercase font-bold text-slate-600 mb-1">Author</label>
                              <input type="text" value={blogAuthor} onChange={(e) => setBlogAuthor(e.target.value)} className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-orange-500" />
                            </div>
                            <div>
                              <label className="block text-[9px] uppercase font-bold text-slate-600 mb-1">Role</label>
                              <input type="text" value={blogRole} onChange={(e) => setBlogRole(e.target.value)} className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-orange-500" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase font-bold text-slate-600 mb-1">Date</label>
                            <input type="date" value={blogDate} onChange={(e) => setBlogDate(e.target.value)} className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-orange-500" />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase font-bold text-slate-600 mb-1">Image URL</label>
                            <input type="text" value={blogImage} onChange={(e) => setBlogImage(e.target.value)} className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-orange-500" />
                          </div>
                          <button type="submit" className="w-full px-2 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded transition-colors">
                            {selectedFirestoreBlogPost ? "Update Post" : "Create Post"}
                          </button>
                          {selectedFirestoreBlogPost && (
                            <button type="button" onClick={() => setSelectedFirestoreBlogPost(null)} className="w-full px-2 py-1.5 bg-slate-300 hover:bg-slate-400 text-slate-700 text-xs font-bold rounded transition-colors">
                              Cancel Edit
                            </button>
                          )}
                        </form>
                      </div>

                      {/* Posts List */}
                      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                        <div className="p-4 bg-slate-50 border-b border-slate-200">
                          <h4 className="text-sm font-bold text-orange-700">Posts in Firestore</h4>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {firestoreBlogPosts.length === 0 ? (
                            <div className="p-4 text-center text-xs text-slate-500">No posts yet</div>
                          ) : (
                            firestoreBlogPosts.map((post) => (
                              <div key={post.id} className="p-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer">
                                <div className="flex justify-between items-start mb-1">
                                  <p className="font-semibold text-xs text-slate-900 line-clamp-1">{post.title}</p>
                                  <div className="flex gap-1">
                                    <button onClick={() => { setSelectedFirestoreBlogPost(post); setBlogTitle(post.title); setBlogSummary(post.summary); setBlogContent(post.content); setBlogCategory(post.category); setBlogAuthor(post.author); setBlogRole(post.role); setBlogDate(post.date); setBlogImage(post.image); setBlogReadTime(post.readTime.toString()); }} className="px-1.5 py-0.5 bg-orange-100 hover:bg-orange-200 text-orange-700 text-[9px] font-bold rounded">Edit</button>
                                    <button onClick={() => handleDeleteBlogPost(post.id)} className="px-1.5 py-0.5 bg-red-100 hover:bg-red-200 text-red-700 text-[9px] font-bold rounded">Delete</button>
                                  </div>
                                </div>
                                <p className="text-[9px] text-slate-600">{post.category} • {post.readTime}min</p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "services" && (
                  <motion.div
                    key="services"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-display text-xl font-bold text-slate-900">Dynamic Capabilities Matrix Console</h3>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">CRUD administration module for ServicesView practice areas</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start animate-fade-in">
                      {/* Create form */}
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center space-x-2 text-cyan-700">
                          <Layers size={16} />
                          <span className="text-xs font-mono font-bold uppercase tracking-wider">{editingServiceId ? "Modify Existing Service Capability" : "Configure New Service Capability"}</span>
                        </div>

                        {serviceCreateStatus && (
                          <div className={`p-3 rounded-lg text-xs font-bold leading-relaxed ${
                            serviceCreateStatus.startsWith("SUCCESS") ? "bg-emerald-50 border border-emerald-250 text-emerald-800" : "bg-red-50 border border-red-200 text-red-800"
                          }`}>
                            {serviceCreateStatus}
                          </div>
                        )}

                        <form onSubmit={handleCreateService} className="space-y-3 text-xs">
                          <div>
                            <label className="block text-slate-700 font-bold mb-1">Service Title *</label>
                            <input
                              type="text"
                              required
                              value={serviceTitle}
                              onChange={(e) => setServiceTitle(e.target.value)}
                              placeholder="e.g. Artificial Intelligence & RAG pipelines"
                              className="w-full bg-white border border-slate-200 text-slate-900 px-3 py-2 rounded-lg font-medium focus:outline-none focus:border-cyan-600"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-700 font-bold mb-1">Brief Elevator Tagline *</label>
                            <input
                              type="text"
                              required
                              value={serviceDesc}
                              onChange={(e) => setServiceDesc(e.target.value)}
                              placeholder="Short 2-sentence capsule summary..."
                              className="w-full bg-white border border-slate-200 text-slate-900 px-3 py-2 rounded-lg font-medium focus:outline-none focus:border-cyan-600"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-slate-705 font-bold mb-1">Visual Icon Key</label>
                              <select
                                value={serviceIcon}
                                onChange={(e) => setServiceIcon(e.target.value)}
                                className="w-full bg-white border border-slate-200 text-slate-900 px-3 py-2 rounded-lg font-medium focus:outline-none focus:border-cyan-600 cursor-pointer text-xs"
                              >
                                <option value="Layers">Layers (Stacked grids)</option>
                                <option value="BrainCog">BrainCog (Cognitive AI)</option>
                                <option value="Cloud">Cloud (Cloud Infrastructure)</option>
                                <option value="MonitorSmartphone">Monitor & Phone</option>
                                <option value="Briefcase">Briefcase (Corporate)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-slate-700 font-bold mb-1">Tech Stack (comma separated)</label>
                              <input
                                type="text"
                                value={serviceTechStack}
                                onChange={(e) => setServiceTechStack(e.target.value)}
                                placeholder="React, Node.js, Gemini API"
                                className="w-full bg-white border border-slate-200 text-slate-900 px-3 py-2 rounded-lg font-medium focus:outline-none focus:border-cyan-600"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-slate-700 font-bold mb-1">Custom Detailed Blueprint Description (Optional)</label>
                            <textarea
                              rows={3}
                              value={serviceDetailedDesc}
                              onChange={(e) => setServiceDetailedDesc(e.target.value)}
                              placeholder="Detailed structural specification mapping standards under high workload loads..."
                              className="w-full bg-white border border-slate-200 text-slate-900 px-3 py-2 rounded-lg font-medium focus:outline-none focus:border-cyan-600 resize-none text-[11px]"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-700 font-bold mb-1">Key Focus Capabilities (one per line) *</label>
                            <textarea
                              rows={4}
                              required
                              value={serviceFeatures}
                              onChange={(e) => setServiceFeatures(e.target.value)}
                              placeholder="e.g. Vector embeddings generation&#10;GCP Edge clusters config&#10;Custom automated microservice loops"
                              className="w-full bg-white border border-slate-200 text-slate-900 px-3 py-2 rounded-lg font-mono text-[11px] focus:outline-none focus:border-cyan-600 resize-none"
                            />
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2 pt-1">
                            <button
                              type="submit"
                              className="flex-1 px-5 py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded-xl shadow cursor-pointer transition-all hover:scale-[1.01]"
                            >
                              {editingServiceId ? "Update Service Settings" : "Inject Custom Capability Service"}
                            </button>
                            {editingServiceId && (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingServiceId(null);
                                  setServiceTitle("");
                                  setServiceDesc("");
                                  setServiceFeatures("");
                                  setServiceIcon("Layers");
                                  setServiceDetailedDesc("");
                                  setServiceTechStack("");
                                }}
                                className="px-4 py-2.5 border border-slate-300 hover:bg-slate-150 text-slate-750 font-bold rounded-xl shadow cursor-pointer transition-all bg-white"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </form>
                      </div>

                      {/* List area */}
                      <div className="space-y-4">
                        <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold border-b border-slate-100 pb-2">Active Services Matrix (Firestore)</h4>
                        {services.length === 0 ? (
                          <div className="border border-dashed border-slate-200 rounded-2xl p-6 text-center bg-slate-50/20 font-sans text-xs font-semibold text-slate-500">
                            No custom capability services are currently configured in your Firebase database.
                            <div className="text-[10px] text-slate-400 font-mono mt-3 leading-relaxed font-normal">
                              The user-facing ServicesView will seamlessly fall back to displaying the standard 5 capabilities until you create one here.
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3 max-h-[80vh] overflow-y-auto pr-1">
                            {services.map((s) => (
                              <div key={s.id} className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 text-xs relative shadow-sm">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h5 className="font-display font-bold text-slate-950 text-sm flex items-center gap-2">
                                      <span>{s.title}</span>
                                      <span className="text-[10px] font-mono font-normal text-slate-450 uppercase">[{s.icon}]</span>
                                    </h5>
                                  </div>
                                  <div className="flex items-center space-x-1.5 shrink-0">
                                    <button
                                      onClick={() => {
                                        setEditingServiceId(s.id);
                                        setServiceTitle(s.title);
                                        setServiceDesc(s.description);
                                        setServiceFeatures(s.features.join("\n"));
                                        setServiceIcon(s.icon || "Layers");
                                        setServiceDetailedDesc(s.detailedDescription || "");
                                        setServiceTechStack(s.techStack ? s.techStack.join(", ") : "");
                                        window.scrollTo({ top: 300, behavior: "smooth" });
                                      }}
                                      className="p-1 px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer"
                                      title="Edit service capability"
                                    >
                                      <Edit size={11} />
                                      <span>EDIT</span>
                                    </button>
                                    <button
                                      onClick={async () => {
                                        if (confirm(`Are you sure you want to delete "${s.title}" from dynamic capabilities?`)) {
                                          await deleteCustomServiceFromDB(s.id);
                                          if (editingServiceId === s.id) {
                                            setEditingServiceId(null);
                                            setServiceTitle("");
                                            setServiceDesc("");
                                            setServiceFeatures("");
                                            setServiceIcon("Layers");
                                            setServiceDetailedDesc("");
                                            setServiceTechStack("");
                                          }
                                        }
                                      }}
                                      className="p-1 px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-650 rounded text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer"
                                    >
                                      <Trash2 size={11} />
                                      <span>DELETE</span>
                                    </button>
                                  </div>
                                </div>
                                <p className="text-slate-600 font-medium leading-relaxed bg-slate-50 border border-slate-100 p-2 rounded text-[11px]">
                                  {s.description}
                                </p>
                                {s.detailedDescription && (
                                  <div className="text-[10px] text-slate-500 bg-slate-50/50 p-2 rounded border border-slate-100 leading-normal">
                                    <strong>Blueprint details:</strong> {s.detailedDescription}
                                  </div>
                                )}
                                {s.techStack && s.techStack.length > 0 && (
                                  <div className="flex flex-wrap gap-1 pt-1">
                                    {s.techStack.map((tech, idx) => (
                                      <span key={idx} className="bg-slate-100 border border-slate-250 text-slate-700 text-[9px] font-mono px-2 py-0.5 rounded">
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                <div className="space-y-1 pt-1">
                                  <span className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-widest pl-1 block">Capabilities:</span>
                                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-655 font-semibold pl-1">
                                    {s.features.map((f, i) => <li key={i}>{f}</li>)}
                                  </ul>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>

        )}

      </div>
    </div>
  );
}
