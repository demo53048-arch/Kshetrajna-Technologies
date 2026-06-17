import React from "react";
import { companyDetails } from "../data";
import { Shield, Sparkles, Target, Award, Users, BookOpen } from "lucide-react";
import { motion } from "motion/react";

export default function AboutView() {
  return (
    <div className="bg-slate-50 text-slate-800 py-16" id="about-view-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase font-mono tracking-widest text-blue-700 font-bold block mb-2"
          >
            Who We Are
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            The Knower of the Field
          </motion.h1>
          <div className="h-1 w-24 bg-blue-700 mx-auto mt-4 rounded"></div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-slate-600 text-base sm:text-lg leading-relaxed font-sans"
          >
            "Kshetrajna" represents the conscious master of the workspace. At Kshetrajna Technologies LLP, we translate business goals into clean, scalable software systems.
          </motion.p>
        </div>

        {/* Brand Philosophy Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight">
              A Purpose-Driven Tech Venture
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Founded in Botad, Gujarat, **Kshetrajna Technologies LLP** arose out of a core observation: modern business processes are becoming increasingly complex (the Field), but they often lack cohesive, self-rectifying digital intelligence (the Knower). 
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We bridge this gap by engineering systems that operate with logical awareness of their operational parameters. Whether organizing local agricultural distribution supply lines or optimizing transaction ledgers, our code is constructed for speed, clarity, and absolute security under tight constraints.
            </p>
            <div className="bg-white p-6 rounded-2xl border border-slate-205 shadow-sm">
              <span className="text-[11px] uppercase font-mono text-blue-750 font-bold block mb-2">Corporate Credential Identity</span>
              <p className="text-xs text-slate-600 font-mono leading-relaxed">
                Registered name: <strong>Kshetrajna Technologies LLP</strong><br />
                GSTIN: <strong>24ABBFK4173C1ZR</strong><br />
                Registered Address: 323/1 - 37, Bhaktinagar-1, Bhabhan Road, Malani Vadi, Botad, Bhavnagar, Botad, Gujarat, India, 364710
              </p>
            </div>
          </div>
          
          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {[
              {
                icon: <Target className="text-blue-700" size={24} />,
                title: "Precision Execution",
                desc: "We plan comprehensively and code surgically. Every endpoint, script, and component has a direct, justified purpose."
              },
              {
                icon: <Award className="text-blue-700" size={24} />,
                title: "Quality Integrity",
                desc: "We adhere strictly to legal disclosures (GST registered, registered LLP), providing transparent corporate accountability."
              },
              {
                icon: <Users className="text-blue-700" size={24} />,
                title: "Client Partnership",
                desc: "Our directors take active technical ownership of every release, avoiding the dilution typical of larger agencies."
              },
              {
                icon: <BookOpen className="text-blue-700" size={24} />,
                title: "Continuous Growth",
                desc: "We stay in step with modern cloud, AI, and vector models, incorporating them rationally without the marketing hype."
              }
            ].map((v, idx) => (
              <motion.div 
                key={idx} 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.02, y: -4, borderColor: "rgba(59, 130, 246, 0.4)" }}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-all shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="text-sm font-bold font-display text-slate-950 mb-1.5">{v.title}</h3>
                <p className="text-slate-605 text-xs leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 3. Executive Portraits - Crucial Detail */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-blue-740 font-bold block mb-2">Leadership Panel</span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
              Executive Directorship
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-3">
              Direct access to our leadership ensures continuous accountability, clear communication, and precise project outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {companyDetails.leaders.map((leader, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -6, scale: 1.015, boxShadow: "0 10px 20px -10px rgba(0,0,0,0.06)", borderColor: "#bfdbfe" }}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 transition-all duration-300 shadow-sm"
              >
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shrink-0 border-2 border-slate-100 shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-extrabold font-display text-slate-900 leading-tight">
                      {leader.name}
                    </h3>
                    <span className="inline-block bg-blue-50 text-blue-755 font-mono text-[10px] font-bold px-2.5 py-0.5 mt-1 rounded-md uppercase tracking-wider">
                      {leader.role}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                    {leader.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
