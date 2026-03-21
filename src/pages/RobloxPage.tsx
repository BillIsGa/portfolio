import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { ProjectCard } from '../components/ProjectCard';
import { Globe, Languages, Layout, Award, Users, RefreshCw, ExternalLink, Code2, Shirt, ArrowRight } from 'lucide-react';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { Project } from '../types';

const RobloxPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'All';

  const setActiveTab = (tab: string) => {
    setSearchParams({ tab });
  };

  const parseVisits = (visits?: string): number => {
    if (!visits) return 0;
    const cleanVisits = visits.replace(/,/g, '');
    const match = cleanVisits.match(/([\d.]+)([BMk]?)/);
    if (match) {
      const val = parseFloat(match[1]);
      const unit = match[2];
      const mult = unit === 'B' ? 1000000000 : unit === 'M' ? 1000000 : unit === 'k' ? 1000 : 1;
      return val * mult;
    }
    return 0;
  };

  const initialProjects = PROJECTS.filter(p => p.category === 'Roblox').map(p => ({
    ...p,
    numericVisits: parseVisits(p.visits)
  }));

  const [projects, setProjects] = useState<Project[]>(initialProjects);
  
  const sortedProjects = [...projects].sort((a, b) => (b.numericVisits || 0) - (a.numericVisits || 0));
  const topThree = sortedProjects.slice(0, 3);
  
  const filteredProjects = sortedProjects.filter(p => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Localisation') return p.tags.includes('Localisation');
    if (activeTab === 'Development') return p.tags.includes('Development') || p.tags.includes('Scripting') || p.tags.includes('Luau') || p.tags.includes('UI/UX');
    if (activeTab === 'Clothing') return p.tags.includes('Clothing');
    return true;
  });

  const tabs = ['All', 'Localisation', 'Development', 'Clothing'];
  
  const [totalVisits, setTotalVisits] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSynced, setLastSynced] = useState<string>(new Date().toLocaleTimeString());

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Localisation':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Professional Localisation</h2>
                <p className="text-text-secondary text-lg leading-relaxed">
                  I provide high-end <span className="text-text-default font-semibold">Chinese-English translation</span> services, specialising in the Roblox platform. With a <span className="text-brand-default font-bold">C1 Advanced</span> certification in English and native-level Mandarin proficiency, I ensure your game resonates with global audiences.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-cta-bg rounded-2xl border border-border-default">
                    <h4 className="font-bold text-brand-default mb-1">C1 Certified</h4>
                    <p className="text-xs text-text-secondary">Advanced proficiency in English for complex technical and creative content.</p>
                  </div>
                  <div className="p-4 bg-cta-bg rounded-2xl border border-border-default">
                    <h4 className="font-bold text-brand-default mb-1">International Reach</h4>
                    <p className="text-xs text-text-secondary">Helping games scale to millions of players across diverse cultural regions.</p>
                  </div>
                </div>
                <p className="text-text-secondary">
                  My services go beyond simple word-for-word translation. I focus on <span className="italic">cultural adaptation</span>, ensuring slang, UI constraints, and game mechanics feel native to the target audience.
                </p>
              </div>
              <div className="rounded-[2.5rem] overflow-hidden border border-border-default shadow-xl">
                <img 
                  src="https://picsum.photos/seed/translation-ui/800/600" 
                  alt="Translation Interface" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8">Localisation Portfolio</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.filter(p => p.tags.includes('Localisation')).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 'Development':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 rounded-[2.5rem] overflow-hidden border border-border-default shadow-xl">
                <img 
                  src="https://picsum.photos/seed/roblox-dev/800/600" 
                  alt="Roblox Development" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <h2 className="text-3xl font-bold tracking-tight">Technical Development</h2>
                <p className="text-text-secondary text-lg leading-relaxed">
                  Specialising in <span className="text-text-default font-semibold">Luau scripting</span> and advanced GUI systems. I build robust, scalable front-end mechanics that enhance player immersion and experience.
                </p>
                <ul className="space-y-3">
                  {['Custom Phone & UI Systems', 'Advanced Vehicle Mechanics', 'DataStore Management', 'Optimised Game Loops'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-text-secondary">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-default" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-text-secondary">
                  From intuitive menu systems to complex interactive objects, I focus on clean code and performant implementation.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8">Development Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.filter(p => p.tags.includes('Development') || p.tags.includes('Scripting') || p.tags.includes('UI/UX')).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 'Clothing':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-12">
                <section>
                  <h2 className="text-3xl font-bold mb-6 text-brand-default">Avatar Asset Design</h2>
                  <p className="text-text-secondary text-lg leading-relaxed mb-6">
                    I design high-fidelity <span className="text-text-default font-semibold">2D clothing assets</span> for the Roblox marketplace, with a specific focus on realistic law enforcement and tactical uniforms.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <section>
                    <h3 className="text-xl font-bold mb-3">An Garda Síochána</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      Detailed recreations of the Irish national police force uniforms, including the Armed Support Unit and Regular units.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-xl font-bold mb-3">GCPD Collection</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      NYPD-inspired uniforms from the Batman universe, specifically the 'Gotham' TV series variants.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-xl font-bold mb-3">Police Scotland</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      Featuring iconic high-visibility vests and tactical gear used by the Scottish national force.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-xl font-bold mb-3">State Patrol</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      Arizona Highway Patrol (AZDPS) recreations with state-specific insignia and tactical gear.
                    </p>
                  </section>
                </div>

                <div className="p-8 bg-cta-bg rounded-3xl border border-border-default">
                  <h4 className="font-bold mb-2">Marketplace Presence</h4>
                  <p className="text-text-secondary text-sm">
                    My designs are built with attention to detail, ensuring they look sharp on all Roblox avatar types and stand out in the catalog.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="sticky top-24 space-y-6">
                  <div className="rounded-[2.5rem] overflow-hidden border border-border-default bg-cta-bg shadow-2xl">
                    <img 
                      src="https://picsum.photos/seed/roblox-uniforms/1200/1600" 
                      alt="Roblox Clothing Showcase" 
                      className="w-full h-auto"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-square rounded-2xl overflow-hidden border border-border-default">
                      <img src="https://picsum.photos/seed/uniform1/400/400" alt="Uniform Detail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="aspect-square rounded-2xl overflow-hidden border border-border-default">
                      <img src="https://picsum.photos/seed/uniform2/400/400" alt="Uniform Detail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8">Clothing Portfolio</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.filter(p => p.tags.includes('Clothing')).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </motion.div>
        );
      default:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-2">Project Library</h2>
              <p className="text-text-secondary text-sm">Browse through my complete portfolio of Roblox work.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </motion.div>
        );
    }
  };
  const fetchLiveStats = async () => {
    const robloxProjects = projects.filter(p => p.placeId);
    setIsLoading(true);
    
    try {
      const placeIds = robloxProjects.map(p => p.placeId).join(',');
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/roblox/games?placeIds=${placeIds}&_t=${Date.now()}`);
      
      let liveData = [];
      if (response.ok) {
        liveData = await response.json();
      }
      
      let newTotal = 0;
      const updatedProjects = projects.map(p => {
        const live = Array.isArray(liveData) ? liveData.find(ld => ld.placeId === p.placeId) : null;
        let numericVisits = p.numericVisits || 0;
        let visitsStr = p.visits || '0';
        let imageUrl = p.imageUrl;
        let isLive = false;

        if (live) {
          numericVisits = live.visits;
          visitsStr = live.visits.toLocaleString();
          imageUrl = live.iconUrl || p.imageUrl;
          isLive = true;
        } else if (p.visits) {
          numericVisits = parseVisits(p.visits);
          visitsStr = p.visits;
        }

        newTotal += numericVisits;
        return {
          ...p,
          visits: visitsStr,
          numericVisits,
          imageUrl,
          isLive
        };
      });

      setProjects(updatedProjects);
      setTotalVisits(newTotal);
      setLastSynced(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Failed to fetch live stats:", error);
      let staticTotal = 0;
      projects.forEach(p => {
        staticTotal += parseVisits(p.visits);
      });
      setTotalVisits(staticTotal);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveStats();
  }, []);

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-brand-default/10 text-brand-default rounded-2xl">
                <Layout size={32} />
              </div>
              <h1 className="text-4xl font-bold tracking-tight">Roblox</h1>
            </div>
            <button 
              onClick={fetchLiveStats}
              disabled={isLoading}
              className="p-2 text-text-secondary hover:text-brand-default transition-colors disabled:opacity-50"
              title="Refresh live stats"
            >
              <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-text-secondary text-lg leading-relaxed">
                I am a <span className="text-text-default font-semibold">Roblox Platform Specialist</span> providing a full suite of services from high-end localisation to technical GUI development and avatar asset design.
              </p>
              <div className="flex items-start gap-4 p-6 bg-cta-bg rounded-3xl border border-border-default">
                <Award className="text-brand-default shrink-0" size={24} />
                <div>
                  <h3 className="font-bold mb-1">Platform Expertise</h3>
                  <p className="text-text-secondary text-sm mb-3">Deep understanding of the Roblox ecosystem, Luau scripting, and community trends.</p>
                </div>
              </div>
              <p className="text-text-secondary leading-relaxed">
                Whether it's making your game accessible to millions of Chinese players or building realistic UI systems, I help creators scale their experiences.
              </p>
            </div>

            <div className="bg-brand-default p-8 md:p-12 rounded-[2.5rem] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Users size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-white/80 uppercase tracking-widest text-xs font-bold">Contributed to over</h3>
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tighter">
                  {isLoading && totalVisits === 0 ? (
                    <span className="opacity-50">Loading...</span>
                  ) : (
                    <AnimatedCounter value={totalVisits} />
                  )}
                </div>
                <p className="text-white/90 font-medium text-sm">known user interactions</p>
                <p className="text-white/60 text-[10px] mt-4 uppercase tracking-widest">
                  {isLoading ? "Syncing with Roblox..." : `Last synced: ${lastSynced}`}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top 3 Games Section */}
        <div className="mb-24 p-8 md:p-12 bg-cta-bg/40 rounded-[3rem] border border-border-default/60">
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-2">Top Contributions</h2>
            <p className="text-text-secondary text-sm">High-impact experiences with the largest player counts.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topThree.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Subsection Redirects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <button onClick={() => setActiveTab('Localisation')} className="text-left p-8 bg-cta-bg rounded-3xl border border-border-default hover:border-brand-default/30 transition-all hover:-translate-y-1 group">
            <Languages className="text-brand-default mb-4 group-hover:scale-110 transition-transform" size={24} />
            <h3 className="font-bold mb-2">Localisation</h3>
            <p className="text-text-secondary text-sm mb-4">Expert Chinese-English translation with a focus on retention and cultural fit.</p>
            <span className="text-brand-default text-xs font-bold flex items-center gap-1">
              View Localisation Services <ArrowRight size={12} />
            </span>
          </button>
          <button onClick={() => setActiveTab('Development')} className="text-left p-8 bg-cta-bg rounded-3xl border border-border-default hover:border-brand-default/30 transition-all hover:-translate-y-1 group">
            <Code2 className="text-brand-default mb-4 group-hover:scale-110 transition-transform" size={24} />
            <h3 className="font-bold mb-2">Development</h3>
            <p className="text-text-secondary text-sm mb-4">Specialising in Luau-based GUI systems and front-end game mechanics.</p>
            <span className="text-brand-default text-xs font-bold flex items-center gap-1">
              View Development Services <ArrowRight size={12} />
            </span>
          </button>
          <button onClick={() => setActiveTab('Clothing')} className="text-left p-8 bg-cta-bg rounded-3xl border border-border-default hover:border-brand-default/30 transition-all hover:-translate-y-1 group">
            <Shirt className="text-brand-default mb-4 group-hover:scale-110 transition-transform" size={24} />
            <h3 className="font-bold mb-2">Avatar Assets</h3>
            <p className="text-text-secondary text-sm mb-4">Custom clothing design and 2D asset creation for the Roblox marketplace.</p>
            <span className="text-brand-default text-xs font-bold flex items-center gap-1">
              View Clothing Collection <ArrowRight size={12} />
            </span>
          </button>
        </div>

        <div className="space-y-20">
          {/* Tabs Navigation */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-border-default pb-8">
            <div className="flex p-1 bg-cta-bg rounded-2xl border border-border-default overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all relative whitespace-nowrap ${
                    activeTab === tab ? 'text-white' : 'text-text-secondary hover:text-text-default'
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-brand-default rounded-xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {tab}
                </button>
              ))}
            </div>
            <div className="text-text-secondary text-sm font-medium">
              Showing {activeTab === 'All' ? 'Full Library' : `${activeTab} Services`}
            </div>
          </div>

          {/* Dynamic Tab Content */}
          <div className="min-h-[400px]">
            {renderTabContent()}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RobloxPage;
