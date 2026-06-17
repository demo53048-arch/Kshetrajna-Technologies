import React, { useState } from "react";
import { blogData } from "../data";
import { BlogPost } from "../types";
import { Search, Calendar, User, Clock, ArrowLeft, BookOpen, Share2, CornerDownRight } from "lucide-react";

export default function BlogView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ["All", "Technology Philosophy", "Cloud Engineering", "Artificial Intelligence"];

  // Filtering blogs
  const filteredBlogs = blogData.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleShare = (postId: string) => {
    setCopiedId(postId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-slate-50 text-slate-800 animate-fade-in py-16" id="blog-view-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Render article reader mode if post is selected */}
        {activePost ? (
          <div id="blog-article-reader" className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-8 shadow-sm">
            <button
              onClick={() => setActivePost(null)}
              className="group flex items-center space-x-2 text-slate-550 hover:text-blue-700 text-xs sm:text-sm font-semibold transition-colors mb-6 py-2 cursor-pointer focus:outline-none"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform text-blue-700" />
              <span>Return to Publications</span>
            </button>

            {/* Header elements */}
            <div className="space-y-4">
              <span className="bg-blue-50 text-blue-700 font-mono text-[10px] tracking-widest font-bold uppercase px-2.5 py-1.5 rounded-md border border-blue-100">
                {activePost.category}
              </span>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                {activePost.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 border-y border-slate-100 py-3.5 mt-4">
                <div className="flex items-center space-x-2">
                  <User size={14} className="text-blue-700" />
                  <span className="text-slate-800 font-bold">{activePost.author}</span>
                  <span className="text-[10px] bg-slate-50 border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                    {activePost.role}
                  </span>
                </div>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>{activePost.date}</span>
                </div>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{activePost.readTime}</span>
                </div>
              </div>
            </div>

            {/* Main graphic */}
            <div className="aspect-[21/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
              <img
                src={activePost.image}
                alt={activePost.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Custom styled blog paragraph rendering */}
            <div className="prose prose-indigo max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-6 font-sans">
              {activePost.content.split("\n\n").map((para, i) => {
                if (para.startsWith("### ")) {
                  return (
                    <h3 key={i} className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-8 mb-4">
                      {para.replace("### ", "")}
                    </h3>
                  );
                } else if (para.startsWith("1. ") || para.startsWith("- ")) {
                  return (
                    <ul key={i} className="list-disc pl-6 space-y-2 text-slate-600">
                      {para.split("\n").map((li, j) => (
                        <li key={j} className="text-xs sm:text-sm leading-relaxed">
                          {li.replace(/^[0-9]\.\s*|-\s*/, "")}
                        </li>
                      ))}
                    </ul>
                  );
                } else {
                  return (
                    <p key={i} className="text-slate-600 text-xs sm:text-sm leading-relaxed" style={{ whiteSpace: "pre-wrap" }}>
                      {para.replace(/\*\*/g, "")}
                    </p>
                  );
                }
              })}
            </div>

            {/* Back bottom actions */}
            <div className="pt-8 border-t border-slate-100 flex justify-between items-center text-xs">
              <button
                onClick={() => setActivePost(null)}
                className="px-5 py-2 px-4 bg-white hover:bg-slate-50 border border-slate-205 text-slate-750 font-bold rounded-lg cursor-pointer shadow-sm"
              >
                Back to Blog
              </button>
              <button
                onClick={() => handleShare(activePost.id)}
                className="p-2 sm:px-4 sm:py-2 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200 transition-colors flex items-center space-x-1.5 shadow-sm"
              >
                <Share2 size={14} className="text-blue-700" />
                <span className="font-semibold">{copiedId === activePost.id ? "Copied Link!" : "Share"}</span>
              </button>
            </div>
          </div>
        ) : (
          <div id="blog-listings-mode" className="space-y-12">
            
            {/* Title Group */}
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs uppercase font-mono tracking-widest text-blue-700 font-bold block mb-2">Research & Musings</span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Philosophy & News</h1>
              <div className="h-1 w-24 bg-blue-700 mx-auto mt-4 rounded"></div>
              <p className="mt-5 text-slate-600 text-sm sm:text-base leading-relaxed">
                Insights on system balance, technical orchestration, and the evolutionary path of AI frameworks.
              </p>
            </div>

            {/* Search and Category Control Bar */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 pt-4">
              {/* Category tabs - 8 spans */}
              <div className="md:col-span-8 flex flex-wrap gap-1.5 items-center justify-start">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-blue-700 text-white font-bold"
                        : "bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50 shadow-sm"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Text Search - 4 spans */}
              <div className="md:col-span-4 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-450">
                  <Search size={14} className="text-blue-700" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-slate-800 pl-9 pr-4 py-2.5 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 shadow-sm transition-colors"
                />
              </div>
            </div>

            {/* Blog Post List Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" id="blogs-grid-items">
              {filteredBlogs.map((post) => (
                <article
                  key={post.id}
                  id={`blog-card-${post.id}`}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-blue-350 hover:shadow-md transition-all duration-300 flex flex-col justify-between group shadow-sm"
                >
                  <div className="relative aspect-[16/10] bg-slate-50 border-b border-slate-100 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/95 text-blue-700 text-[10px] font-mono font-bold px-2.5 py-1 rounded border border-slate-200 whitespace-nowrap shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-1 text-[10px] text-slate-500 font-mono mb-2">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-base font-bold font-display text-slate-900 leading-snug mb-2 group-hover:text-blue-700 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs text-slate-500 font-bold">{post.author}</span>
                      </div>
                      <button
                        onClick={() => setActivePost(post)}
                        className="text-xs font-semibold text-blue-700 group-hover:underline flex items-center space-x-1 cursor-pointer bg-transparent hover:text-blue-900 shadow-none hover:shadow-none p-0"
                      >
                        <span>Read Post</span>
                        <CornerDownRight size={12} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              {filteredBlogs.length === 0 && (
                <div className="col-span-full text-center py-16 text-slate-500 font-mono text-xs sm:text-sm border border-slate-200 rounded-xl bg-white shadow-sm">
                  No matching publications found. Modify your queries above.
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
