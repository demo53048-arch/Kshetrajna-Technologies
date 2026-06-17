import { BlogPost, Project, Job } from "./types";

export const companyDetails = {
  name: "Kshetrajna Technologies LLP",
  tagline: "The Knower of the Field — Bridging Business Intent & Technical Execution",
  shortDescription: "A premier technology consulting and engineering firm delivering intelligent enterprise solutions, secure custom software, and highly optimized cloud architectures.",
  registeredOffice: {
    street: "323/1 - 37, Bhaktinagar-1, Bhabhan Road, Malani Vadi",
    city: "Botad, Bhavnagar",
    district: "Botad",
    stateAndZip: "Gujarat, India, 364710",
    full: "323/1 - 37, Bhaktinagar-1, Bhabhan Road, Malani Vadi, Botad, Bhavnagar, Botad, Gujarat, India, 364710"
  },
  gstin: "24ABBFK4173C1ZR",
  phone: "+91 9726459356",
  email: "kshetrajnatechnologies@gmail.com",
  socials: {
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    github: "https://github.com",
  },
  leaders: [
    {
      name: "Mr. Rutvik Kalasha",
      role: "Founder & MD",
      bio: "An evolutionary tech visionary and business strategist with years of leadership experience. Rutvik guides the overall long-term direction, regulatory framework, and strategic customer alliances of Kshetrajna Technologies, driving its core mission of 'bringing conscious intelligence to computational solutions'.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
    },
    {
      name: "Mr. Dhruvik Vanol",
      role: "Chief Executive Officer",
      bio: "An executive and technologist holding a strong pedigree in scaling digital platforms, software architectures, and global operations. Dhruvik directs the daily operations, engineering output, and technological strategy of the firm, translating complex business constraints into lean, performant solutions.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400",
    }
  ]
};

export const servicesData = [
  {
    id: "enterprise-software",
    title: "Enterprise Software Design",
    description: "Architecting high-frequency, resilient custom software fabrics tailored specifically to automate core operational flows, streamline logistics, and handle heavy workloads.",
    features: [
      "Fault-tolerant microservice architectures",
      "Robust REST & GraphQL API configurations",
      "High-throughput transactional databases",
      "Legacy modernization & system refactoring"
    ],
    icon: "Layers"
  },
  {
    id: "ai-automation",
    title: "Agentic AI & Automation",
    description: "Integrating modern LLM frameworks, automated multi-agent chains, and specialized retrieval-augmented generation (RAG) structures into daily workflows.",
    features: [
      "Natural Language conversational bots",
      "Automated content summarization workflows",
      "Custom training & vector database search",
      "Intelligent analytics & sentiment tracking"
    ],
    icon: "BrainCog"
  },
  {
    id: "cloud-devops",
    title: "Cloud Engineering & DevOps",
    description: "Designing elastic, auto-scaling cloud topologies with absolute security, cost-optimization, and automated zero-downtime deployment practices.",
    features: [
      "Multi-region GCP & AWS hybrid architectures",
      "Containerization using Docker & Kubernetes",
      "Secure infrastructure-as-code (Terraform)",
      "Continuous Integration & CD pipelines"
    ],
    icon: "Cloud"
  },
  {
    id: "web-mobile",
    title: "High-Fidelity Web & App Development",
    description: "Creating visually memorable, lightning-fast digital storefronts and reactive native mobile applications that capture user trust and drive engagement.",
    features: [
      "Sleek responsive React / Next.js clients",
      "Optimized Tailwind system layouts",
      "Native iOS & Android compilation",
      "Strict web accessibility and performance audits"
    ],
    icon: "MonitorSmartphone"
  },
  {
    id: "consultancy",
    title: "Strategic Business Consulting",
    description: "Partnering directly with founders and product owners to resolve organizational bottlenecks, align technical roadmaps, and support due diligence steps.",
    features: [
      "Technical viability & feasibility analysis",
      "Agile process management consulting",
      "Cloud spend & cost review audits",
      "CTO-as-a-Service strategic leadership"
    ],
    icon: "Briefcase"
  }
];

export const projectsData: Project[] = [
  {
    id: "agri-intel",
    title: "Unified Agri-Intelligence Platform",
    description: "A collaborative, multi-lingual agricultural logistics portal linking rural growers directly to commercial buyers, facilitating instant transportation scheduling, optimal price matching, and dynamic route optimization based on historical market trends.",
    category: "AI & Analytics",
    image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=800&h=450",
    client: "Western India Agro Co.",
    services: ["Agentic AI & Automation", "Enterprise Software Design", "High-Fidelity Web & App Development"],
    year: "2025",
    results: [
      "Reduced logistics overhead and waste by 24%",
      "Helped 4,200+ local agriculturalists achieve fair market rates",
      "99.9% uptime across remote cellular network links"
    ]
  },
  {
    id: "finsecure-ledger",
    title: "FinSecure Ledger Framework",
    description: "An advanced, high-velocity ledger processing pipeline with embedded anomaly detection logic, built for scale-up microfinance portfolios demanding fast consensus and compliance reporting.",
    category: "Cloud & DevOps",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800&h=450",
    client: "Vikas Finance Group",
    services: ["Cloud Engineering & DevOps", "Enterprise Software Design"],
    year: "2025",
    results: [
      "Process up to 4,500 active requests per second",
      "Completed rigorous internal regulatory compliance audit",
      "Sub-10ms response latency on edge node clusters"
    ]
  },
  {
    id: "nirvana-cms",
    title: "Nirvana Flow Headless CMS",
    description: "A real-time distributed digital asset manager for media organizations, boasting direct image optimization layers, integrated semantic Tagging models, and instant dynamic caching controls.",
    category: "Web Solutions",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=450",
    client: "Nirvana Media Guild",
    services: ["High-Fidelity Web & App Development", "Strategic Business Consulting"],
    year: "2024",
    results: [
      "350% boost in overall page loading performance indexes",
      "Intuitive single-dashboard management for 14 remote workspaces",
      "Automated tag structuring saves over 15 hours of weekly editor work"
    ]
  }
];

export const blogData: BlogPost[] = [
  {
    id: "blog-knower",
    title: "The Knower of the Field: Mapping Modern AI Architectures to Conscious Observers",
    summary: "Reflecting on the deeper philosophy of computation. How the concept of 'Kshetrajna'—the conscious witness of a specific arena—informs how we design intelligent agents, context boundaries, and recursive loops.",
    content: `Technology is never just cold syntax and silicon. It is an extension of intent, a structure created to understand and model 'the field' of work. In ancient Indian philosophy, the 'Kshetra' is the field of action, experience, and energy, while the 'Kshetrajna' is the knower of that field—the conscious observer that gives it structure, meaning, and focus.

### The Field and the Knower in Modern Software

As engineers, when we bootstrap databases, define variables, or map API gateways, we are sketching out a digital 'field' (Kshetra). However, without a cohesive observer or intelligence layer, a database remains just cold static storage.

Bringing in **Agentic AI**—system architectures that monitor context, reason dynamically, and execute targeted actions—represents a shift. The software begins to act as a localized 'knower' of its business domain. 

### Core Concepts of Knower Architectures

1. **Context Boundary Awareness**: A great AI agent doesn't need to process the entire world's data. It must be a master of its specified 'field' (its knowledge base, tools, and constraints).
2. **Deterministic-Probabilistic Balance**: Hardcoded software is fully deterministic but brittle. Pure probabilistic AI is highly flexible but unstable. True engineering craftsmanship fuses these into stable frameworks.
3. **Recursive Self-Correction**: Systems must monitor their own state, catch execution bugs, and pivot without crash sequences.

At **Kshetrajna Technologies LLP**, we let this philosophy run through everything we compile. We don't build blind software. We build systems that understand their context, respect boundaries, and empower the human teams operating them.`,
    category: "Technology Philosophy",
    author: "Mr. Rutvik Kalasha",
    role: "Founder & MD",
    date: "May 14, 2026",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600&h=350",
    readTime: "6 min read"
  },
  {
    id: "blog-monoliths",
    title: "Why Traditional Monoliths Fail at Enterprise Scale: Resilient Solutions",
    summary: "Exploring real-world scaling bottlenecks. Why monolithic enterprise databases struggle over time, and how we leverage hybrid distributed topologies to maintain sub-second latency.",
    content: `In the early days of a product, a single monolithic code repository and a centralized SQL database is a beautiful choice. It’s simple to test, rapid to compile, and straightforward to run.

But as traffic expands, specialized team modules start colliding:
- A slow financial reporting query locks crucial billing tables, blocking checkout flows.
- Continuous deployment becomes a logistical nightmare because a minor update to the billing portal requires redeploying the core catalog system.
- Disk usage scales in a linear fashion, requiring increasingly expensive horizontal scaling strategies.

### Embracing Hybrid Domain Topologies

Our team of cloud engineers at **Kshetrajna Technologies LLP** tackles this bottleneck by utilizing:

1. **Strict Service Boundaries**: Carving complex business domains into independent modules with strict API contracts.
2. **Command-Query Responsibility Segregation (CQRS)**: Decoupling write-heavy relational databases from read-heavy cache layers.
3. **Serverless Orchestration**: Designing scale-to-zero compute pipelines that handle spikes without breaking budgets.

Transitioning doesn’t mean rewriting everything from scratch. It means making pragmatic, high-impact surgical cuts that yield immediate operational relief.`,
    category: "Cloud Engineering",
    author: "Mr. Dhruvik Vanol",
    role: "Chief Executive Officer",
    date: "June 2, 2026",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600&h=350",
    readTime: "8 min read"
  },
  {
    id: "blog-agentic-era",
    title: "The Rise of Agentic AI: Transforming Daily Business Analytics",
    summary: "Moving past basic chatbot interfaces. How multi-agent setups collaborate behind the scenes to translate complex business query inputs into actionable reports and custom assets.",
    content: `For the past few grid cycles, the industry treated AI as a premium oracle interface—where a user types a single prompt and receives a paragraph of text back.

While impressive, this pattern forces humans to act as the integrating glue. We copy, paste, refine, and translate the output across our company tools.

### What is Agentic AI?

With **Agentic AI**, we deploy multiple specialized artificial systems that collaborate with distinct mandates:
- **Analyst Agent**: Queries analytical tables and runs mathematical checks.
- **Copywriter Agent**: Polishes raw analytics into clean, human-readable executive insights.
- **Auditor Agent**: Checks outputs against safety rules and company policies.

Instead of writing a simple template response, this network handles complex multi-step research. It represents the logical next phase of computing, and we are proud to build it for our alliance networks globally.`,
    category: "Artificial Intelligence",
    author: "Engineering Core Team",
    role: "Solutions Group",
    date: "June 12, 2026",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=600&h=350",
    readTime: "5 min read"
  }
];

export const jobsData: Job[] = [
  {
    id: "fullstack-eng",
    title: "Lead Full-Stack Engineer",
    department: "Engineering Group",
    location: "Botad / Remote (India)",
    type: "Full-time",
    experience: "4+ Years",
    salary: "Competitive Compensation / Equity Optional",
    description: "Seeking a senior engineer to drive our React, TypeScript, and Node.js backend pipelines, taking active ownership of client delivery and mentoring micro-teams.",
    responsibilities: [
      "Architect clean, modular React web apps with high performance and accessibility",
      "Deploy robust Express/TypeScript APIs styled with secure authorization frameworks",
      "Coordinate with Mr. Dhruvik Vanol (CEO) to translate product scopes into technical delivery structures",
      "Review merge requests, maintain code styling standards, and optimize asset build pipelines"
    ],
    requirements: [
      "Proven history of deploying complex production-grade software applications",
      "Deep competency in TypeScript, React, Express, and Postgre/MongoDB structures",
      "Excellent communication and experience guiding engineering sprints",
      "Residency in Gujarat or willingness to coordinate via remote setups with the Botad team"
    ]
  },
  {
    id: "cloud-devops-lead",
    title: "Cloud & DevOps Solutions Architect",
    department: "Cloud Practice",
    location: "Botad / Hybrid (Gujarat)",
    type: "Full-time",
    experience: "3+ Years",
    salary: "Industry Standard Team Tier",
    description: "Help build and manage multi-region setups, automated CI/CD flow pipelines, and scale-to-zero container orchestrations for industrial partners.",
    responsibilities: [
      "Draft, review, and apply secure Terraform infrastructure scripts on Google Cloud Platform and AWS",
      "Maintain Docker files, Kubernetes cluster configs, and secure environment vaults",
      "Optimize continuous deployment workflows to allow frictionless team deployments",
      "Support on-call incident triage and establish robust monitoring/alerts dashboards"
    ],
    requirements: [
      "Professional Cloud Architect certification (GCP or AWS) is highly welcome",
      "Hands-on expertise with Docker, Kubernetes, Linux servers, and network protocols",
      "Strong coding proficiency in Shell scripting, Python, or Go",
      "Dedication to rock-solid infrastructure uptime and defensive resource security configurations"
    ]
  },
  {
    id: "frontend-intern",
    title: "Frontend Developer Associate",
    department: "Engineering Group",
    location: "Botad Office (On-site)",
    type: "Internship",
    experience: "0-1 Year",
    salary: "Full stipend with path to high-tier permanent hiring",
    description: "Launch your engineering journey! Work closely with our core team to design responsive, user-friendly CSS & React interfaces for our clients.",
    responsibilities: [
      "Translate Figma UI designs precisely into clean, styled Tailwind code components",
      "Connect frontend component modules to JSON-based backend API interfaces",
      "Fix user-reported responsive layout bugs and run diagnostic speed audits",
      "Prepare documentation for shared libraries and utility configurations"
    ],
    requirements: [
      "Solid fundamental command of semantic HTML, CSS/Tailwind, and modern Javascript",
      "Familiarity with React or other standard client-side state frameworks",
      "Eagerness to absorb feedback, learn, and grow as a software craftsperson",
      "Ability to join physically at our Botad Headquarters on Malani Vadi road"
    ]
  }
];
