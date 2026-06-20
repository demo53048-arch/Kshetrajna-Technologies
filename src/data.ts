import { BlogPost, Project, Job, CustomService } from "./types";

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
  phone: "+91 8849181691",
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

export const servicesData: CustomService[] = [
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
    id: "agentic-ai",
    title: "Agentic AI & Automation",
    description: "Designing autonomous AI systems that intelligently tackle specific business workflows: decision automation, predictive analytics, and real-time optimization.",
    features: [
      "Multi-agent orchestration frameworks",
      "LLM-powered workflow automation",
      "Real-time decision engines with memory",
      "Autonomous process monitoring & self-correction"
    ],
    icon: "Brain"
  },
  {
    id: "web-app-development",
    title: "High-Fidelity Web & App Development",
    description: "Crafting responsive, fast-loading web applications and mobile-first experiences with deep integration into backend systems and cloud services.",
    features: [
      "React & TypeScript SPAs with Vite",
      "Server-side rendering with Node.js",
      "Progressive Web Apps (PWAs)",
      "App store-ready iOS & Android apps"
    ],
    icon: "Monitor"
  },
  {
    id: "cloud-architecture",
    title: "Cloud Architecture & DevOps",
    description: "Building scalable, cost-optimized cloud infrastructures on AWS and GCP with containerization, CI/CD pipelines, and security hardening.",
    features: [
      "Kubernetes orchestration & IaC",
      "Serverless function deployments",
      "Multi-region failover strategies",
      "24/7 monitoring and incident response"
    ],
    icon: "Cloud"
  },
  {
    id: "database-engineering",
    title: "Database Engineering & Optimization",
    description: "Designing resilient database topologies, implementing CQRS patterns, and optimizing query performance for mission-critical systems.",
    features: [
      "Relational & NoSQL database design",
      "Read replica synchronization",
      "Query optimization & indexing strategies",
      "Real-time data pipelines with Kafka/Debezium"
    ],
    icon: "Database"
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
      "Delivered market-aware routing and inventory matching for rural growers",
      "Enabled bilingual dashboards for farmers and buyers with real-time analytics"
    ]
  }
];

export const blogData: BlogPost[] = [
  {
    id: "blog-ai-development-gandhinagar",
    title: "AI Development Company in Gandhinagar: Building Intelligent Business Systems",
    summary: "Discover how AI development in Gandhinagar can transform Gujarat enterprises with smarter automation, analytics, and local delivery.",
    content: `## Why Gandhinagar Matters for AI Development

Gandhinagar is more than just a capital city. It has become a growing center for technology, innovation, and enterprise support in Gujarat. For businesses seeking AI services, working with an AI development company in Gandhinagar offers both regional understanding and technical depth.

The key question is not just whether you need AI, but whether your chosen partner can translate complex business problems into practical, reliable systems. Many companies in Gujarat invest in AI for automation, forecasting, decision support, and customer experience enhancements.

### What Does an AI Development Company in Gandhinagar Do?

A mature AI development company performs several distinct roles:
- **Opportunity identification**: It should find the right use cases rather than force AI into every workflow.
- **Data readiness**: It should audit, cleanse, and structure the data your organization already has.
- **Model engineering**: It should select the right machine learning or natural language technology for the problem.
- **Integration**: It should connect AI outputs to your existing systems, dashboards, or automation flows.
- **Governance and support**: It should provide monitoring, security, and ongoing optimization.

For many local enterprises, the most important benefit is not novelty. It is measurable impact.

### Practical AI Capabilities for Gujarat Businesses

Many businesses across Gujarat can benefit from AI in the following ways:
- **Customer service automation** with chatbots and help desk support.
- **Document search and retrieval** using semantic AI and knowledge engines.
- **Inventory and supply chain forecasting** for distributors and manufacturers.
- **Sales opportunity scoring** and lead prioritization.
- **Financial risk detection** for lending, accounting, or audit workflows.

These solutions are not isolated experiments. They become part of a broader operating model.

### Why Local Support Improves Outcome

Working with a firm that understands Gujarat's regulatory environment, language nuances, and commercial ecosystem has several advantages:
- faster communication,
- better stakeholder alignment,
- easier on-site validation,
- and more relevant use case selection.

A Gandhinagar-based AI partner can also help bridge the gap between technical teams and business leaders. This is especially valuable when a solution must integrate with local teams, local suppliers, or compliance processes.

### How We Approach AI Projects

Our AI project approach includes:
1. **Discovery workshops** to understand the business domain and define success metrics.
2. **Data assessment** to identify quality issues, missing values, and integration points.
3. **Solution design** to align model outputs with business workflows.
4. **Prototyping and validation** to test the AI on real data.
5. **Deployment and monitoring** to keep the system stable and accurate.

Every step is designed to reduce risk and increase confidence.

### Service Pages That Support AI Strategy

If you want a broader technology partner, our services also include:
- [Software Development Company in Gujarat](/software-development-company-gandhinagar) for building custom systems,
- [Web Development Company Gujarat](/web-development-company-gujarat) for customer-facing web experiences,
- [Mobile App Development Gujarat](/mobile-app-development-gujarat) for mobile delivery.

These service pages show how AI often fits into a larger digital transformation.

### FAQ

**What types of AI projects are typical for Gandhinagar companies?**
Projects often include process automation, intelligent search, demand forecasting, chat support automation, and predictive analytics.

**Can AI integrate with existing legacy systems?**
Yes. We build secure integration layers so AI can work with legacy databases, ERP systems, and other internal software.

**How much does local AI support cost?**
Costs vary by scope. Small pilots can start quickly, while enterprise-level AI systems require longer planning and integration. We recommend starting with a discovery phase to estimate costs accurately.

### The Local Advantage

In Gandhinagar, a trusted AI development partner provides close collaboration with decision-makers and fast feedback cycles. Local engagement can be a competitive advantage when speed and alignment matter.

When you combine that with solid technical execution, AI becomes a reliable driver of growth rather than an uncertain experiment.

### Next Steps for Your AI Initiative

To move forward, begin with a concrete business problem. Ask whether the AI should reduce cost, improve accuracy, increase speed, or enhance customer experience.

Then choose a partner who can deliver not only models but also the complete system: data, infrastructure, integration, and ongoing improvement.

If your business is ready to invest in intelligent transformation, our AI development services in Gandhinagar are designed to help you build solutions that deliver measurable results.`,
    category: "AI & Business",
    author: "Mr. Rutvik Kalasha",
    role: "Founder & MD",
    date: "June 20, 2026",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600&h=350",
    readTime: "12 min read",
    faqs: [
      {
        question: "What services does an AI development company in Gandhinagar provide?",
        answer: "It provides AI strategy, data readiness, model engineering, integration, and ongoing monitoring for local businesses."
      },
      {
        question: "Why choose a local AI partner?",
        answer: "A local partner offers better alignment with regional business practices, faster communication, and stronger context for Gujarat-specific use cases."
      },
      {
        question: "Can AI support my existing business software?",
        answer: "Yes, AI can typically integrate with existing ERP, CRM, document systems, and operational workflows through secure APIs and middleware."
      }
    ]
  },
  {
    id: "blog-software-development-gujarat",
    title: "Software Development Company in Gujarat: Building Robust Custom Systems",
    summary: "Learn why Gujarat businesses choose custom software development for operational scale, integration, and long-term flexibility.",
    content: `## Why Gujarat Needs Strong Software Development Partners

Gujarat is home to manufacturing giants, fast-growing service providers, and ambitious startups. These organizations need software that matches their unique operations, regulatory requirements, and customer expectations.

A dedicated software development company in Gujarat helps you build solutions that are not only functional, but also secure, maintainable, and aligned to the way your business actually works.

When you choose a partner, the decision should be about more than code. It should be about business ownership, quality, and the ability to evolve.

### What Custom Software Delivers

Custom software is designed for your specific process, data, and users. It delivers:
- **workflow automation**,
- **deep integration with existing systems**,
- **tailored user experiences**,
- **strong security controls**,
- **and room to grow.**

For many Gujarat companies, the biggest difference from SaaS is the ability to keep control over the product roadmap.

### Key Benefits of Local Software Development

Working with a Gujarat-based development company provides several advantages:
- **Better communication**: same time zone and often same language,
- **Faster onboarding**: local teams understand regional priorities,
- **Easier support**: physical presence for critical updates,
- **Contextual compliance**: local regulation knowledge for business processes.

If your company is considering digital transformation, local engineering support can accelerate the project while preserving clarity.

### A Structured Development Process

A healthy software development engagement usually follows a clear path:
1. **Discovery** — capture business requirements and success metrics.
2. **Design** — create functional flows and user experience layouts.
3. **Build** — implement secure backend services and intuitive interfaces.
4. **Test** — validate workflows, edge cases, and performance.
5. **Deploy** — launch the system and provide support.

This process reduces uncertainty and helps ensure the product works for the real users who rely on it.

### When Custom Software is the Right Choice

Choose custom development when you need:
- unique workflows,
- integrations with partners or legacy systems,
- data ownership,
- compliance controls,
- or a competitive advantage through proprietary technology.

If you need a digital solution for a core business capability, a generic SaaS product may fall short.

### How Software Integrates with AI and Web Services

Custom software often works best as part of a broader digital ecosystem. That ecosystem can include:
- **AI systems** from an [AI Development Company in Gandhinagar](/ai-development-company-gandhinagar),
- **web platforms** from a [Web Development Company Gujarat](/web-development-company-gujarat),
- **mobile apps** from a [Mobile App Development Gujarat](/mobile-app-development-gujarat) partner.

Combining these capabilities creates stronger business systems.

### Real-World Gujarat Use Cases

Examples of effective custom systems include:
- a dealer management portal for distributors,
- an inventory control system for manufacturers,
- a service delivery platform for logistics providers,
- a compliance tracking dashboard for regulated operations.

Each system is tailored for local workflows and company-specific requirements.

### FAQ

**What makes a software development partner successful in Gujarat?**
Success comes from understanding local business rhythms, providing clear communication, and delivering systems that can be maintained and extended.

**How quickly can a custom system launch?**
Simple systems can be launched in 3-5 months, while larger enterprise projects may take longer depending on scope.

**Is custom software more expensive than SaaS?**
Upfront costs are usually higher, but custom software often provides better long-term value for unique business needs and specific integrations.

### Conclusion

For Gujarat businesses, custom software is a strategic investment in process efficiency, integration, and digital differentiation.

If you want software that grows with your organization, a focused local partner can help you define and deliver the right solution.`,
    category: "Software Development",
    author: "Mr. Dhruvik Vanol",
    role: "Chief Executive Officer",
    date: "June 20, 2026",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&q=80&w=600&h=350",
    readTime: "14 min read",
    faqs: [
      {
        question: "Why choose a software development company in Gujarat?",
        answer: "Local partners offer better alignment with regional business practices, faster communication, and stronger context for Gujarat-specific digital needs."
      },
      {
        question: "Can custom software integrate with existing business systems?",
        answer: "Yes. We specialize in integrating custom software with ERP, CRM, inventory, and legacy systems."
      },
      {
        question: "What is the typical timeline for custom software?",
        answer: "Timelines vary, but many custom systems are delivered in 3-6 months depending on complexity."
      }
    ]
  },
  {
    id: "blog-web-development-trends-2026",
    title: "Web Development Trends in 2026: What Gujarat Businesses Should Build Today",
    summary: "Understand the most important web development trends for 2026 and how Gujarat companies can design fast, accessible, and search-friendly websites.",
    content: `## The Web in 2026: What Business Leaders Need to Know

The web continues to evolve. In 2026, speed, accessibility, search relevance, and experience consistency are the most important metrics for digital success. Websites are no longer just a brand presence; they are a business channel.

For Gujarat companies, the right website should perform well on mobile networks, support local search visibility, and provide clear conversion paths.

### Performance is the New Brand Standard

Fast websites are essential. Customers expect pages to load instantly, especially on smartphones.

A [Web Development Company Gujarat](/web-development-company-gujarat) should prioritize:
- optimized images,
- minimal JavaScript overhead,
- efficient caching,
- and strong mobile performance.

These improvements not only improve experience, but also help with search ranking.

### Accessibility and Inclusive Design

Accessible websites are better websites. They work for more people, reduce legal risk, and often perform better in search.

Accessibility means:
- clear structure,
- readable typography,
- accessible navigation,
- captions for media,
- and forms that are easy to use.

For local businesses, accessibility also means making digital experiences easy across regional languages and user abilities.

### Structured Data and SEO

Technical SEO remains critical. In 2026, websites should include structured data that helps search engines understand service pages, local business details, and FAQs.

A strong website uses:
- \`Organization\` schema,
- \`LocalBusiness\` schema,
- \`Service\` schema,
- and \`FAQPage\` schema where appropriate.

This improves how your pages appear in search results and supports local discovery.

### Progressive Web Apps and Modern Experiences

Progressive Web Apps (PWAs) are a powerful way to deliver app-like experiences without requiring native app installation.

PWAs can provide:
- offline access,
- faster repeat loading,
- push notifications,
- and an installable experience.

For businesses with a repeat customer base, PWAs are particularly compelling.

### Content and Conversion

A website must clearly tell visitors what your business does and how it helps them.

Service-specific pages like [AI Development Company in Gandhinagar](/ai-development-company-gandhinagar) and [Mobile App Development Gujarat](/mobile-app-development-gujarat) are powerful because they match targeted search intent.

Content should be:
- concise,
- scannable,
- helpful,
- and supported by strong calls to action.

### Integrated Analytics and Measurement

Modern websites should track meaningful signals, not just page views. This includes:
- form submissions,
- click-throughs,
- engagement events,
- and search behavior.

A well-built website should make it easy to interpret what users do and optimize accordingly.

### FAQ

**What is the most important web trend for 2026?**
Performance and accessibility are the top priorities. Fast, usable sites win both customers and search visibility.

**Do Gujarat companies need PWAs?**
PWAs are useful for businesses that want app-like performance and engagement without the overhead of app store distribution.

**How does structured data help local SEO?**
Structured data makes it easier for search engines to understand your pages better, improving the chances of rich snippets.

### Conclusion

Web development in 2026 is about building fast, accessible, and search-ready experiences.

If your business wants a website that performs and converts, our team can help you design it with local SEO, modern architecture, and strong user experience.`,
    category: "Web Development",
    author: "Engineering Core Team",
    role: "Solutions Group",
    date: "June 20, 2026",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=600&h=350",
    readTime: "13 min read",
    faqs: [
      {
        question: "What should Gujarat businesses prioritize in web development for 2026?",
        answer: "They should prioritize performance, accessibility, structured data, and mobile-first experiences."
      },
      {
        question: "Is a PWA worth building?",
        answer: "A PWA is worth building if your customers benefit from faster repeat visits, offline access, and an installable experience."
      },
      {
        question: "How does structured data improve SEO?",
        answer: "Structured data helps search engines understand your pages better, improving the chance of rich results and local discovery."
      }
    ]
  },
  {
    id: "blog-custom-software-vs-saas",
    title: "Custom Software vs SaaS Solutions: Choosing the Right Path for Your Business",
    summary: "Compare custom software and SaaS options for Gujarat businesses and decide which model delivers the best long-term value.",
    content: `## Custom Software vs SaaS: Which Is Right for Your Business?

Choosing between custom software and SaaS is one of the most important digital decisions a business can make.

SaaS is appealing because it is quick to deploy and often low-risk. Custom software is appealing because it can be tailored exactly to your needs.

For Gujarat companies, the right choice depends on your workflows, integration needs, and long-term strategy.

### When SaaS is a Good Choice

SaaS products are often ideal when your needs are standard and time-to-launch matters.

A SaaS solution works well for:
- email marketing,
- accounting,
- simple CRM,
- and common collaboration.

The benefits include:
- predictable subscription costs,
- automatic updates,
- lower upfront investment,
- and minimal development.

However, SaaS can be limiting when your processes do not fit the product.

### When Custom Software is Better

Custom software is the right path when you need:
- unique workflows,
- deep system integration,
- custom reporting,
- or stronger security controls.

Custom systems can adapt to the way your team works and can scale as your business changes.

They are particularly useful when a solution is a strategic differentiator rather than a commodity.

### Advantages of Custom Development

Custom software offers:
- greater flexibility,
- richer integration,
- complete ownership of the product,
- and a better fit for complex operations.

For example, a manufacturing company may need a custom order management system that connects inventory, finance, and production planning in a way no generic SaaS can.

### The Real Cost Comparison

SaaS often appears cheaper at first. Custom development usually requires a larger initial investment.

But over time, SaaS costs can add up through subscriptions, premium features, and integration fees.

Custom software can deliver better total cost of ownership if it removes duplication, speeds processes, and supports unique differentiation.

### Hybrid Strategies

The best approach for many businesses is a hybrid strategy:
- use SaaS for standard administrative functions,
- build custom software for core business workflows.

This approach gives you speed where it matters and specialization where it counts.

If you are unsure, our team can help you evaluate the right balance between SaaS and custom development.

### Internal Links to Services

If your business needs a custom build, our [Software Development Company in Gujarat](/software-development-company-gandhinagar) page explains the local engineering approach. If you also need a compelling public web presence, see [Web Development Company Gujarat](/web-development-company-gujarat).

### FAQs

**Is SaaS always cheaper than custom software?**
SaaS typically has lower upfront costs, but custom software can be more cost-effective over time for unique and integrated business needs.

**Can I start with SaaS and move to custom software later?**
Yes. Many businesses begin with SaaS and later transition to custom software once they understand their needs and scale.

**How should I decide between the two?**
Consider your workflow uniqueness, integration complexity, data ownership needs, and long-term business strategy.

### Conclusion

Custom software and SaaS both have roles in a technology strategy.

The right choice is about fit, not preference. If your business needs a durable, scalable system that aligns with your processes, custom software is usually the stronger long-term investment.`,
    category: "Business Strategy",
    author: "Engineering Core Team",
    role: "Solutions Group",
    date: "June 20, 2026",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600&h=350",
    readTime: "12 min read",
    faqs: [
      {
        question: "Should I choose SaaS or custom software?",
        answer: "Choose SaaS for standard needs and speed; choose custom software for unique workflows and long-term ownership."
      },
      {
        question: "Can I use both SaaS and custom software together?",
        answer: "Yes, a hybrid approach often provides the best balance between speed and customization."
      },
      {
        question: "How do I determine the right option for my company?",
        answer: "Evaluate your workflow uniqueness, integration requirements, data ownership, and long-term goals."
      }
    ]
  },
  {
    id: "blog-mobile-app-cost-india",
    title: "Mobile App Development Cost in India: Planning Your Gujarat App Investment",
    summary: "A practical guide to mobile app development cost in India, with budgeting advice for Gujarat businesses considering native or cross-platform apps.",
    content: `## How Much Does Mobile App Development Cost in India?

The cost of mobile app development in India depends on multiple factors, including the app's complexity, the platforms targeted, and the backend services required.

For Gujarat businesses, the right budget should also account for user experience, app store readiness, and local support.

### Key Cost Factors

The main cost drivers are:
- **Complexity**: simple apps are cheaper than feature-rich apps.
- **Platform**: building for both Android and iOS costs more than a single platform.
- **Design**: premium UI/UX increases effort.
- **Backend services**: cloud sync, authentication, and APIs add to the budget.
- **Integration**: connecting the app with existing systems or third-party services can require additional development.

A typical app budget in India may range from moderate to high depending on these elements.

### Native vs Cross-Platform Development

There are two common development approaches:
- **Native development** for Android and iOS,
- **Cross-platform development** using frameworks like React Native or Flutter.

Native apps often deliver polished performance and deeper platform integration. Cross-platform apps can reduce development effort and time by sharing a common codebase.

Many Gujarat businesses choose cross-platform development to reach both major platforms more efficiently.

### App Types and Expected Budgets

Different app categories have different cost profiles:
- **Simple corporate apps** with information and contact forms,
- **Marketplace apps** with listings, transactions, and reviews,
- **Enterprise productivity apps** for field operations or internal workflows,
- **Customer engagement apps** with chat, notifications, and personalization.

A simple app can often be delivered on a smaller budget, while enterprise-grade apps require more investment.

### How to Reduce Risk and Cost

The best way to manage cost is to start with a minimum viable product (MVP). This allows you to validate the idea and gather user feedback before building more advanced features.

A good development partner will also help you scope the project clearly and avoid scope creep.

### Why Local Support Matters

If you want a polished app with reliable support, local engineering teams in Gujarat can provide faster communication and context-aware guidance.

Our mobile teams also work closely with web and backend engineering, so your app can fit into a complete digital ecosystem.

For example, an app can connect with a backend system built by a [Software Development Company in Gujarat](/software-development-company-gandhinagar) and a public website created by a [Web Development Company Gujarat](/web-development-company-gujarat).

### FAQ

**How much does a simple mobile app cost in India?**
A simple mobile app can cost approximately ₹4-8 lakhs in India, while more complex business apps can cost ₹10-20 lakhs or more.

**Is cross-platform development cheaper than native?**
Yes, cross-platform development is often more cost-effective when you need both Android and iOS support from one codebase.

**Do you help with app store submission?**
Yes, our team handles submission and review processes for both Google Play and the Apple App Store.

### Conclusion

Mobile app development cost in India is an investment in the user experience and the business systems that support it.

If you plan carefully and work with a trusted partner, you can build a mobile product that serves your customers and integrates with your broader technology strategy.`,
    category: "Mobile Development",
    author: "Engineering Core Team",
    role: "Solutions Group",
    date: "June 20, 2026",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600&h=350",
    readTime: "13 min read",
    faqs: [
      {
        question: "What is the typical cost of mobile app development in India?",
        answer: "A simple app can cost around ₹4-8 lakhs, while a more complex business app may cost ₹10-20 lakhs depending on features and platforms."
      },
      {
        question: "Is cross-platform development cheaper than native?",
        answer: "Generally yes, because it uses a shared codebase for both Android and iOS."
      },
      {
        question: "Will you handle app store submission?",
        answer: "Yes, we manage submission and review for Google Play and Apple App Store."
      }
    ]
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
      "Design and implement full-stack features for our service platforms.",
      "Lead architectural decisions on backend design, database topology, and API contracts.",
      "Review code, mentor junior engineers, and maintain code quality standards.",
      "Collaborate closely with project stakeholders to translate business requirements into technical roadmaps.",
      "Support production deployments and participate in on-call rotations."
    ],
    qualifications: [
      "4+ years of professional experience in full-stack web development.",
      "Deep proficiency in TypeScript, React, and Node.js.",
      "Experience with relational databases (PostgreSQL/MySQL) and cache layers (Redis).",
      "Familiarity with CI/CD pipelines, Docker, and deployment best practices.",
      "Strong communication and mentoring abilities.",
      "Passion for code quality, scalability, and user experience."
    ]
  },
  {
    id: "ai-ml-engineer",
    title: "AI & Machine Learning Engineer",
    department: "AI Solutions Group",
    location: "Botad / Remote (India)",
    type: "Full-time",
    experience: "3+ Years",
    salary: "Competitive Compensation / Equity Optional",
    description: "Join our AI team to build production-grade machine learning systems, agentic AI workflows, and intelligent automation pipelines.",
    responsibilities: [
      "Design and train machine learning models for business automation and analytics.",
      "Develop agentic AI systems that autonomously solve multi-step business workflows.",
      "Implement feature engineering pipelines and model evaluation frameworks.",
      "Deploy models to production using FastAPI, Docker, and cloud services.",
      "Collaborate with data engineers to optimize training data pipelines."
    ],
    qualifications: [
      "3+ years of experience building production ML systems.",
      "Strong background in Python, scikit-learn, PyTorch, and TensorFlow.",
      "Experience with LLMs, prompt engineering, and multi-agent architectures.",
      "Familiarity with cloud platforms (AWS/GCP) and containerization.",
      "Understanding of MLOps, model versioning, and deployment practices.",
      "Ability to translate business requirements into AI solutions."
    ]
  },
  {
    id: "devops-engineer",
    title: "DevOps & Cloud Infrastructure Engineer",
    department: "Infrastructure Group",
    location: "Botad / Remote (India)",
    type: "Full-time",
    experience: "3+ Years",
    salary: "Competitive Compensation / Equity Optional",
    description: "Build and maintain scalable, secure, and resilient cloud infrastructure supporting our client delivery and internal operations.",
    responsibilities: [
      "Design and manage Kubernetes clusters, container registries, and orchestration workflows.",
      "Develop Infrastructure as Code (IaC) using Terraform and Helm.",
      "Implement CI/CD pipelines using GitHub Actions and GitLab CI.",
      "Monitor system performance, automate incident response, and maintain SLAs.",
      "Collaborate with engineers to optimize resource utilization and reduce cloud costs."
    ],
    qualifications: [
      "3+ years of hands-on DevOps and cloud infrastructure experience.",
      "Proficiency with AWS or GCP (ECS, EKS, GKE, or equivalent).",
      "Strong experience with Kubernetes, Docker, and container orchestration.",
      "Experience with IaC tools (Terraform, CloudFormation, or Helm).",
      "Familiarity with monitoring tools (Prometheus, Grafana, DataDog).",
      "Linux system administration and networking knowledge."
    ]
  },
  {
    id: "product-manager",
    title: "Senior Product Manager",
    department: "Product & Strategy",
    location: "Botad (India)",
    type: "Full-time",
    experience: "5+ Years",
    salary: "Competitive Compensation / Equity Optional",
    description: "Lead product strategy and execution for our client-facing platforms and internal tools.",
    responsibilities: [
      "Define product vision, roadmap, and OKRs aligned with business objectives.",
      "Conduct user research and competitive analysis to inform product decisions.",
      "Work closely with design and engineering teams to deliver customer-centric solutions.",
      "Manage product releases, feature prioritization, and stakeholder communication.",
      "Analyze metrics and user feedback to drive continuous product improvement."
    ],
    qualifications: [
      "5+ years of product management experience in B2B SaaS or technology services.",
      "Strong analytical skills and experience with data-driven decision making.",
      "Excellent communication and cross-functional leadership abilities.",
      "Technical literacy (not necessarily coding, but system design understanding).",
      "Experience managing complex product roadmaps and stakeholder management.",
      "Passion for building products that solve real business problems."
    ]
  }
];
