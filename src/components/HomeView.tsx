import React from "react";
import { companyDetails, servicesData, projectsData } from "../data";
import { ArrowRight, Brain, Cpu, Layers, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface HomeViewProps {
  setCurrentPage: (page: string) => void;
}

export default function HomeView({ setCurrentPage }: HomeViewProps) {
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-slate-50 text-slate-800" id="home-view-container">
      {/* 1. Epic Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-28 md:pt-28 md:pb-36 border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(29,78,216,0.05),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.04),transparent_60%)]"></div>
        
        {/* Subtle geometric lines */}
        <div className="absolute top-1/4 left-1/10 w-0.5 h-32 bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0 hidden md:block"></div>
        <div className="absolute bottom-1/4 right-1/10 w-32 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 hidden md:block"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Pill flag */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full text-xs font-mono text-blue-700 mb-8 shadow-sm"
            >
              <Sparkles size={13} className="text-blue-600 animate-pulse" />
              <span className="font-bold uppercase tracking-widest text-[9px]">Established 2024</span>
            </motion.div>

            {/* Main Display Typography */}
            <motion.h1 
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6"
            >
              AI Development & Software Development Company in Gandhinagar, Gujarat
            </motion.h1>

            {/* Paragraph Text */}
            <motion.p 
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg md:text-xl text-slate-600 font-sans leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Delivering bespoke technology solutions designed for the modern enterprise. We specialize in turning complex challenges into streamlined digital opportunities.
            </motion.p>

            {/* Dynamic Interactive Call-To-Action buttons */}
            <motion.div 
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavigate("services")}
                id="btn-discover-services"
                className="w-full sm:w-auto px-8 py-4 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>View System Capabilities</span>
                <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavigate("contact")}
                id="btn-schedule-consult"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-medium border border-slate-300 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
              >
                <span>Initiate Consultation</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 1b. Primary Service Entry Links */}
      <section className="py-10 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900 mb-4">Explore Our Dedicated Service Pages</p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 text-sm">
              <a href="/ai-development-company-gandhinagar" className="inline-flex items-center rounded-full border border-blue-700 bg-blue-50 px-4 py-2 text-blue-700 hover:bg-blue-100 transition">AI Development Company Gandhinagar</a>
              <a href="/software-development-company-gandhinagar" className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-slate-800 hover:bg-slate-200 transition">Software Development Company Gandhinagar</a>
              <a href="/web-development-company-gujarat" className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-slate-800 hover:bg-slate-200 transition">Web Development Company Gujarat</a>
              <a href="/mobile-app-development-gujarat" className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-slate-800 hover:bg-slate-200 transition">Mobile App Development Gujarat</a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Pillars / Focus Areas */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl"
          >
            Why Partner with Kshetrajna?
          </motion.h2>
          <div className="h-1 w-20 bg-blue-700 mx-auto mt-4 rounded1"></div>
          <p className="mt-4 text-slate-605 text-sm sm:text-base leading-relaxed">
            We operate beyond standard development. Our work maps deeply to the practical parameters of Indian scale and global quality.
          </p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <Brain className="text-blue-700" size={28} />,
              title: "Strategic Ownership",
              desc: "We don't just write guidelines; we build complete systems. We take full structural stewardship of deployment, reliability, and scaling."
            },
            {
              icon: <Cpu className="text-blue-700" size={28} />,
              title: "Advanced Tech Prowess",
              desc: "From complex react flows to distributed database ledgers and real-time LLM orchestrations, we deploy elite engineering standardizations."
            },
            {
              icon: <ShieldCheck className="text-blue-700" size={28} />,
              title: "Compliant & Legal Trust",
              desc: "Based in Gujarat, with clean audit logs, real physical operations, official GST registration (24ABBFK4173C1ZR), and direct executive oversight."
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
              }}
              whileHover={{ 
                y: -8, 
                scale: 1.015,
                boxShadow: "0 12px 24px -10px rgba(29, 78, 216, 0.08)",
                borderColor: "rgba(59, 130, 246, 0.45)"
              }}
              className="bg-white border border-slate-200 p-8 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all duration-300 shadow-sm"
            >
              <div>
                <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg font-display font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. Interactive Bref Services Preview */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-xs uppercase font-mono tracking-widest text-blue-700 font-bold block mb-2">Our Capabilities</span>
              <h2 className="font-display text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
                Technical Execution Areas
              </h2>
            </div>
            <motion.button
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={() => handleNavigate("services")}
              className="text-blue-700 hover:text-blue-900 hover:underline text-sm font-semibold flex items-center space-x-1.5 cursor-pointer"
            >
              <span>Explore all services</span>
              <ArrowRight size={16} />
            </motion.button>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {servicesData.slice(0, 3).map((svc) => (
              <motion.div 
                key={svc.id} 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                }}
                whileHover={{ 
                  y: -5,
                  scale: 1.015,
                  borderColor: "rgba(59, 130, 246, 0.4)"
                }}
                className="bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl p-6 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md"
                onClick={() => handleNavigate("services")}
              >
                <h3 className="text-base font-semibold font-display text-slate-900 group-hover:text-blue-700 transition-colors mb-2">
                  {svc.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {svc.description}
                </p>
                <div className="flex items-center text-[11px] text-blue-750 group-hover:underline font-bold">
                  <span>Learn more</span>
                  <ArrowRight size={12} className="ml-1" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Executive Directorship Spot */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-xl"
        >
          <div className="absolute right-[-10%] bottom-[-20%] w-96 h-96 border-[40px] border-slate-800 rounded-full opacity-30"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7">
              <span className="text-xs uppercase font-mono tracking-widest text-slate-400 block mb-2">Leadership Foundation</span>
              <h2 className="font-display text-3xl font-bold text-white tracking-tight mb-4">
                Guided by Strategic Visionaries
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Meet our founding directors—<strong>Mr. Rutvik Kalasha</strong> (Founder & MD) and <strong>Mr. Dhruvik Vanol</strong> (CEO)—who direct overall long-term research, technology output, and strategic growth for local and global enterprises.
              </p>
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleNavigate("about")}
                  className="px-6 py-3 bg-white hover:bg-slate-200 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow cursor-pointer"
                >
                  Read Executive Bios
                </motion.button>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {companyDetails.leaders.map((leader, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ scale: 1.04, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="bg-slate-800/80 border border-slate-700/50 p-4 rounded-xl text-center shadow"
                >
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-slate-600 mb-3"
                    referrerPolicy="no-referrer"
                  />
                  <h4 className="text-xs sm:text-sm font-semibold font-display text-white leading-tight">
                    {leader.name}
                  </h4>
                  <p className="text-[10px] text-blue-300 font-mono mt-1 font-semibold uppercase">
                    {leader.role}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 5. Clean CTA Section */}
      <section className="py-20 text-center max-w-4xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl font-extrabold text-slate-900 tracking-tight"
        >
          Ready to Build Something Extraordinary?
        </motion.h2>
        <p className="mt-4 text-slate-600 text-sm leading-relaxed max-w-xl mx-auto">
          Contact our Botad, Gujarat Headquarters today. Learn how we optimize your stack, integrate Agentic AI, and clear path to operational expansion.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNavigate("contact")}
            className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-sm transition-all cursor-pointer shadow-md shadow-blue-500/10"
          >
            Send Us an Inquiry
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNavigate("career")}
            className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-sm transition-all border border-slate-300 cursor-pointer shadow-sm"
          >
            View Careers
          </motion.button>
        </div>
      </section>
    </div>
  );
}
