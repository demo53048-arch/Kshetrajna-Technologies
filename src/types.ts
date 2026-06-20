export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  role: string;
  date: string;
  image: string;
  readTime: string;
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "Enterprise" | "Web Solutions" | "Cloud & DevOps" | "AI & Analytics";
  image: string;
  client: string;
  services: string[];
  year: string;
  results: string[];
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Remote" | "Internship";
  experience: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
  date: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  experienceYears: string;
  coverLetter: string;
  resumeFileName: string;
  resumeFileContent?: string; // Mock Base64 or placeholder representing the uploaded file
  date: string;
}

export interface Quote {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  companyName: string;
  serviceArea: string;
  timeline: string;
  estimatedBudget: string;
  requirements: string;
  status: "Pending review" | "In discussion" | "Approved" | "Archived";
  date: string;
}

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  title: string;
  description: string;
}

export interface ServiceCta {
  heading: string;
  text: string;
  buttonText: string;
  buttonLink: string;
}

export interface DetailedServicePage {
  id: string;
  pageTitle: string;
  headline: string;
  subtitle: string;
  description: string;
  fullContent: string;
  services: ServiceDetail[];
  benefits: string[];
  process: string[];
  faqs: ServiceFaqItem[];
  cta: ServiceCta;
  highlights: string[];
}

export interface StartedProject {
  id: string;
  planId: string;
  planName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  companyName: string;
  additionalFeatures: string;
  status: "Initializing" | "In planning" | "Active execution" | "Finished";
  date: string;
}

export interface ServicePlan {
  id: string;
  name: string;
  price: string;
  badge?: string;
  duration: string;
  tagline: string;
  features: string[];
}

export interface CustomService {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  detailedDescription?: string;
  techStack?: string[];
}

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface DetailedServicePage {
  id: string;
  pageTitle: string;
  headline: string;
  subtitle: string;
  description: string;
  fullContent: string;
  benefits: string[];
  process: string[];
  faqs: ServiceFaqItem[];
  cta: {
    heading: string;
    text: string;
    buttonText: string;
    buttonLink: string;
  };
  highlights: string[];
}

