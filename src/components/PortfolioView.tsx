import React, { useState } from "react";
import { projectsData } from "../data";
import { Project } from "../types";
import { Calendar, User, Eye, ArrowUpRight, X, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function PortfolioView() {
  const [filter, setFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["All", "Enterprise", "Web Solutions", "Cloud & DevOps", "AI & Analytics"];

  const filteredProjects = filter === "All"
    ? projectsData
    : projectsData.filter((p) => p.category === filter);

  return (
    <div className="bg-slate-50 text-slate-800 py-16" id="portfolio-view-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Group */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase font-mono tracking-widest text-blue-700 font-bold block mb-2"
          >
            Our Work
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Delivered Feats
          </motion.h1>
          <div className="h-1 w-24 bg-blue-700 mx-auto mt-4 rounded"></div>
          <p className="mt-5 text-slate-600 text-sm sm:text-base leading-relaxed">
            Case studies representing our meticulous engineering and business alignment.
          </p>
        </div>

        {/* Filter Category Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12" id="portfolio-category-filters">
          {categories.map((cat) => {
            const isSelected = filter === cat;
            return (
              <button
                key={cat}
                id={`portfolio-filter-${cat.toLowerCase().replace(/\s/g, "-")}`}
                onClick={() => setFilter(cat)}
                className="relative px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors duration-250 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-500 overflow-visible"
              >
                {isSelected && (
                  <motion.div
                    layoutId="active-category-indicator"
                    className="absolute inset-0 bg-blue-700 rounded-lg shadow-md shadow-blue-500/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 transition-colors ${isSelected ? "text-white" : "text-slate-600 hover:text-slate-900"}`}>
                  {cat}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid Layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
          id="portfolio-items-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                key={proj.id}
                id={`portfolio-card-${proj.id}`}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-400 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between group shadow-sm"
              >
                {/* Graphic container */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 border-b border-slate-100">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 text-blue-700 text-[10px] font-mono tracking-wider font-bold uppercase px-2.5 py-1 rounded-md border border-slate-200 backdrop-blur-sm shadow-sm">
                      {proj.category}
                    </span>
                  </div>
                </div>

                {/* Text content details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] text-slate-500 font-mono flex items-center space-x-2 mb-2">
                      <span>Client: {proj.client}</span>
                      <span>•</span>
                      <span>{proj.year}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 leading-tight mb-2 group-hover:text-blue-750 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-slate-605 text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                      {proj.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.services.slice(0, 2).map((srv, idx) => (
                        <span key={idx} className="bg-slate-50 text-slate-605 text-[9px] font-mono px-2 py-0.5 rounded border border-slate-200">
                          {srv}
                        </span>
                      ))}
                      {proj.services.length > 2 && (
                        <span className="bg-slate-50 text-slate-605 text-[9px] font-mono px-1.5 py-0.5 rounded border border-slate-200 font-bold">
                          +{proj.services.length - 2} more
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedProject(proj)}
                      id={`btn-view-details-${proj.id}`}
                      className="w-full py-2.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold rounded-lg text-xs transition-colors border border-slate-200 flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <span>View Case Details</span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500 text-xs sm:text-sm font-mono border border-slate-200 rounded-xl">
              No projects deployed under current category. Check back later!
            </div>
          )}
        </motion.div>

        {/* Dynamic Project Details Overlay Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              id="portfolio-case-modal" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md"
            >
              <motion.div 
                initial={{ scale: 0.94, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.94, y: 15, opacity: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 25 }}
                className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
              >
                
                {/* Image banner */}
                <div className="relative aspect-[21/9] overflow-hidden border-b border-slate-100 bg-slate-50">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-full border border-slate-200 backdrop-blur-sm transition-all focus:outline-none shadow-sm cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Text content detailed reading */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div>
                    <div className="flex items-center space-x-3 text-blue-750 text-blue-700 font-mono text-[10px] uppercase font-bold">
                      <Sparkles size={12} />
                      <span>{selectedProject.category} Case Study</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 mt-1.5 leading-tight">
                      {selectedProject.title}
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-slate-600">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-bold">CLIENT ASSOCIATE:</div>
                      <div className="text-slate-800 mt-0.5 font-semibold">{selectedProject.client}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-bold">DEPLOYMENT CYCLE:</div>
                      <div className="text-slate-800 mt-0.5 font-semibold">{selectedProject.year}</div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">SYSTEM CATEGORY:</div>
                      <div className="text-blue-700 mt-0.5 font-bold uppercase">{selectedProject.category}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-slate-500">Technical Context & Objective</h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-slate-500">Practice Capabilities Deployed</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.services.map((srv, i) => (
                        <span key={i} className="bg-slate-50 text-slate-700 font-semibold text-xs px-3 py-1.5 rounded border border-slate-205">
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quantitative Outcomes achieved */}
                  <div className="space-y-3 bg-blue-50/50 border border-blue-100 p-5 rounded-2xl">
                    <h4 className="text-xs uppercase font-mono tracking-wider font-extrabold text-blue-700">Quantitative Feats Achieved</h4>
                    <ul className="space-y-2.5">
                      {selectedProject.results.map((res, i) => (
                        <li key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-800">
                          <CheckCircle2 className="text-emerald-600 mt-0.5 shrink-0" size={15} />
                          <span className="font-medium text-slate-700">{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-750 font-bold rounded-xl text-xs transition-colors cursor-pointer border border-slate-200 shadow-sm"
                    >
                      Close Case Reader
                    </button>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
