import React, { useState, useEffect } from 'react';
import { 
  Moon, Sun, FileText, Github, Linkedin, Mail, 
  MapPin, GraduationCap, Download, 
  BookOpen, ChevronRight, ChevronDown, Monitor 
} from 'lucide-react';

// --- Mock Data (保持不变) ---
const personalInfo = {
  name: "Le Chen | 陈乐",
  title: "Ph.D. Student at IPADS Lab, SJTU",
  advisor: "Prof. Yubin Xia",
  advisorUrl: "https://ipads.se.sjtu.edu.cn/pub/members/yubin_xia/",
  email: "cen-le@sjtu.edu.cn",
  location: "Shanghai, China",
  bio: "I am a Ph.D. student in Computer Science and Technology at Shanghai Jiao Tong University. I received my bachelor's degree in Software Engineering from SJTU.",
  research_interests: "My research interests lie in operating systems and LLM systems.",
};

const publications = [
  {
    id: 1,
    title: "Characterizing Mobile SoC for Accelerating Heterogeneous LLM Inference",
    authors: "Le Chen*, Dahu Feng*, Erhu Feng, Yingrui Wang, Rong Zhao, Yubin Xia, Pinjie Xu, Haibo Chen",
    venue: "SOSP 2025",
    year: 2025,
    tags: ["LLM Inference", "Heterogeneous SoC"],
    abstract: [
      "With the rapid advancement of AI technologies, contemporary mobile systems have begun integrating LLM capabilities on-device to enhance privacy and reduce response latency. Current mobile SoCs ship with diverse AI accelerators, yet there has not been a comprehensive characterization of these heterogeneous processors, and existing designs typically leverage only a single accelerator.",
      "We summarize the key performance characteristics of heterogeneous processors and SoC memory bandwidth, and propose heterogeneous parallel mechanisms to fully exploit both GPU and NPU resources. We further design a fast synchronization mechanism between heterogeneous processors that leverages a unified memory architecture. HeteroInfer delivers a 1.34x-6.02x end-to-end speedup over state-of-the-art GPU-only and NPU-only LLM engines while maintaining negligible interference with other applications."
    ],
    links: {
      pdf: "https://dl.acm.org/doi/10.1145/3731569.3764808"
    }
  },
  {
    id: 2,
    title: "μEFI: A Microkernel-Style UEFI with Isolation and Transparency",
    authors: "Le Chen, Yiyang Wu, Jinyu Gu, Yubin Xia, Haibo Chen",
    venue: "ATC 2025",
    year: 2025,
    tags: ["Operating System", "Firmware Security"],
    abstract: [
      "UEFI Secure Boot aims to ensure that only trusted drivers and applications are loaded during startup, yet the growing number of UEFI-related CVEs and emerging bypass attacks expose critical limitations.",
      "μEFI transparently runs UEFI modules in sandboxes by deprivileging them to user mode and isolating them across address spaces. We introduce trampoline injection, protocol analysis, a seccomp-like capability system, and automated input validation. μEFI runs complex UEFI modules without modifications and incurs only 1.91% overhead during the boot phase."
    ],
    links: {
      pdf: "https://www.usenix.org/conference/atc25/presentation/chen-le"
    }
  },
  {
    id: 3,
    title: "Encrypted Databases Made Secure Yet Maintainable",
    authors: "Mingyu Li, Xuyang Zhao, Le Chen, Cheng Tan, Huorong Li, Sheng Wang, Zeyu Mi, Yubin Xia, Feifei Li, Haibo Chen",
    venue: "OSDI 2023",
    year: 2023,
    tags: ["Database", "Security"],
    links: {
      pdf: "https://www.usenix.org/conference/osdi23/presentation/li-mingyu"
    }
  }
];

const highlightName = "Le Chen";

const serviceTeaching = [
  "Teaching Assistant, AI Computing Systems, Fall 2025",
  "Teaching Assistant, Operating System (SE3357), Spring 2024",
  "Teaching Assistant, Computer System Engineering (SJTU SE3331), Fall 2023"
];

// --- Components ---

// 1. Animated Background (保持不变)
const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/30 dark:bg-blue-600/30 blur-[100px] animate-blob mix-blend-multiply dark:mix-blend-normal" />
    <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-sky-400/30 dark:bg-indigo-700/30 blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-normal" />
    <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-400/30 dark:bg-sky-600/30 blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-normal" />
    <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
  </div>
);

// 2. Navbar (保持不变)
const Navbar = ({ isDark, themeMode, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Publications", href: "#publications" },
    { name: "Service", href: "#service" }
  ];

  const themeStatus = (() => {
    if (themeMode === 'system') {
      return {
        icon: isDark ? (
          <Moon size={18} className="text-slate-600" />
        ) : (
          <Sun size={18} className="text-yellow-400" />
        ),
        label: `跟随系统 · ${isDark ? '深色' : '浅色'}`
      };
    }
    if (themeMode === 'light') {
      return {
        icon: <Sun size={18} className="text-yellow-400" />,
        label: '浅色模式'
      };
    }
    return {
      icon: <Moon size={18} className="text-slate-300" />,
      label: '深色模式'
    };
  })();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b 
      ${scrolled 
        ? "bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-sm" 
        : "bg-transparent border-transparent"}`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-lg font-serif font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          Le Chen<span className="text-blue-600">.</span>
        </span>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-medium font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`切换主题，当前模式：${themeStatus.label}`}
            title="依次切换：跟随系统 → 浅色 → 深色"
          >
            <div className="flex items-center gap-2 px-2">
              {themeMode === 'system' && (
                <Monitor size={16} className="text-slate-500 dark:text-slate-300" />
              )}
              {themeStatus.icon}
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

// 3. Glass Card Container (Modified to accept props like onClick)
const GlassCard = ({ children, className = "", hoverEffect = false, ...props }) => (
  <div 
    className={`
      bg-white/60 dark:bg-slate-800/60 
      backdrop-blur-xl 
      border border-white/50 dark:border-slate-700/50 
      rounded-2xl p-6 shadow-sm
      transition-all duration-200
      ${hoverEffect ? "hover:shadow-xl hover:-translate-y-1" : ""}
      ${className}
    `}
    {...props}
  >
    {children}
  </div>
);

// 5. Main App Component
const App = () => {
  const [themeMode, setThemeMode] = useState('system');
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openAbstracts, setOpenAbstracts] = useState([]);

  const isDark = themeMode === 'system' ? systemPrefersDark : themeMode === 'dark';

  // Theme Initialization
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (event) => {
      setSystemPrefersDark(event.matches);
    };

    setSystemPrefersDark(mediaQuery.matches);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
      setThemeMode(savedTheme);
    } else {
      setThemeMode('system');
    }

    mediaQuery.addEventListener('change', handleSystemChange);
    setMounted(true);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemChange);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (themeMode === 'system') {
      localStorage.setItem('theme', 'system');
    } else {
      localStorage.setItem('theme', themeMode);
    }
  }, [themeMode, mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    setThemeMode((prev) => {
      if (prev === 'system') return 'light';
      if (prev === 'light') return 'dark';
      return 'system';
    });
  };

  const toggleAbstract = (id) => {
    setOpenAbstracts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isAbstractOpen = (id) => openAbstracts.includes(id);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans selection:bg-blue-500/30">
      <AnimatedBackground />
      <Navbar isDark={isDark} themeMode={themeMode} toggleTheme={toggleTheme} />

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20 space-y-16">
        
        {/* --- HERO SECTION --- */}
        <section id="about" className="grid md:grid-cols-[1.8fr_1fr] gap-10 items-center animate-fade-in-up scroll-mt-20">
          <div className="order-2 md:order-1 space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight text-slate-900 dark:text-white mb-2">
                {personalInfo.name}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
                {personalInfo.title}
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
                Advised by: {" "}
                <a
                  href={personalInfo.advisorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {personalInfo.advisor}
                </a>
              </p>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
              {personalInfo.bio}
              {" " + personalInfo.research_interests}
            </p>

          </div>

          {/* Avatar / Image */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end relative">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
               {/* Decorative rings */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-indigo-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
                 {/* Placeholder for actual image */}
                <img 
                  src="/src/assets/avatar.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover bg-slate-100 dark:bg-slate-800"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 items-center pt-2">
          <button
            className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-xl font-medium hover:opacity-90 transition-transform active:scale-95 shadow-lg shadow-blue-500/10"
            onClick={() => window.location.href = `mailto:${personalInfo.email}`}
          >
            <Mail size={18} />
            Email
          </button>
          <div className="flex gap-3 items-center">
            <a
              href="https://github.com/lec77"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Github size={22} />
            </a>
            <a
              href="https://ipads.se.sjtu.edu.cn/zh/pub/members/le_chen/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              中文主页
            </a>
          </div>
        </div>

        {/* --- PUBLICATIONS SECTION --- */}
        <section id="publications" className="space-y-6 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <BookOpen size={24} />
            </div>
            <h2 className="text-2xl font-bold font-serif">Selected Publications</h2>
          </div>

          <div className="grid gap-6">
            {publications.map((pub) => {
              const isOpen = isAbstractOpen(pub.id);
              const hasAbstract = !!pub.abstract;

              return (
                <GlassCard 
                  key={pub.id} 
                  hoverEffect={true} 
                  // 如果有abstract，则点击整个卡片触发toggle
                  onClick={hasAbstract ? () => toggleAbstract(pub.id) : undefined}
                  className={`relative overflow-hidden group transition-all ${hasAbstract ? 'cursor-pointer active:scale-[0.98] active:shadow-md' : ''}`}
                >
                  {/* Subtle gradient accent on left */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex flex-col gap-4">
                    {/* Top Row: Content + Chevron */}
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-2 flex-1">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {pub.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          {pub.authors.split(',').map((auth, i) => (
                            <span key={i} className={auth.includes(highlightName) ? "font-bold text-slate-900 dark:text-white underline decoration-blue-400/50 underline-offset-2" : ""}>
                              {auth}{i < pub.authors.split(',').length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          <span className="font-serif italic text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-700/50 px-2 py-0.5 rounded text-sm">
                            {pub.venue}
                          </span>
                          {pub.tags.map(tag => (
                            <span key={tag} className="text-xs text-slate-500 dark:text-slate-500 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      {/* Links (stopPropagation to prevent closing when clicking links) */}
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          {pub.links.pdf && (
                          <a href={pub.links.pdf} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-500 hover:text-red-600 transition-colors text-xs font-medium flex items-center gap-1">
                            <FileText size={14} /> PDF
                          </a>
                          )}
                          {pub.links.code && (
                          <a href={pub.links.code} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors text-xs font-medium flex items-center gap-1">
                            <Github size={14} /> Code
                          </a>
                          )}
                      </div>
                    </div>
                  </div>

                  {/* Animated Abstract Section using Grid-Rows trick */}
                  {hasAbstract && (
                    <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr] mt-0'}`}>
                      <div className="overflow-hidden">
                        <div className={`space-y-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4 transition-all duration-500 ease-out ${
                          isOpen 
                            ? 'opacity-100 translate-y-0 scale-100' 
                            : 'opacity-0 -translate-y-2 scale-95'
                        }`}>
                          {pub.abstract.map((paragraph, idx) => (
                            <p key={idx} className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* --- SERVICE SECTION --- */}
        <section id="service" className="space-y-6 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-lg">
              <GraduationCap size={24} />
            </div>
            <h2 className="text-2xl font-bold font-serif">Service & Teaching</h2>
          </div>

          <GlassCard>
            <div className="space-y-3">
              {serviceTeaching.map((item, index) => (
                <div key={item} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <ChevronRight size={16} className="mt-1 text-slate-300 dark:text-slate-500" />
                  <p className="text-sm md:text-base">{item}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* --- FOOTER --- */}
        <footer className="pt-10 border-t border-slate-200 dark:border-slate-800 text-center">
          <div className="flex flex-col items-center gap-4">
             <p className="text-slate-400 dark:text-slate-600 text-sm">
               © {new Date().getFullYear()} Le Chen. Built with React & Tailwind CSS.
             </p>
          </div>
        </footer>

      </main>

      {/* CSS for Animation Keyframes */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;