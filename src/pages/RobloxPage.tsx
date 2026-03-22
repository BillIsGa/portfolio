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
            <div className="max-w-4xl mx-auto text-center space-y-12 py-12">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  I specialize in Chinese and bring experience in providing localization services.
                </h2>
                <div className="flex justify-center py-4">
                  <div className="p-3 bg-cta-bg rounded-xl border border-border-default shadow-sm">
                    <Languages className="text-brand-default" size={32} />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold text-text-secondary">
                  Additionally, I hold a certified reading score of <span className="text-text-default underline decoration-brand-default underline-offset-8">C1 Advanced</span> on the CEFR scale.
                </h3>
              </div>

              <div className="pt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left border-t border-border-default">
                <div className="space-y-6">
                  <p className="text-xl text-text-secondary leading-relaxed">
                    I am also a member of George Gaitanis's <span className="text-text-default font-bold">International Translation Services</span>, which you can join to access localization services from various languages!
                  </p>
                </div>
                <div className="flex justify-center md:justify-end">
                  <div className="w-64 h-64 rounded-3xl overflow-hidden border border-border-default shadow-2xl bg-cta-bg flex items-center justify-center group hover:border-brand-default transition-colors">
                    <img 
                      src="/assets/ITSLogo.png" 
                      alt="International Translation Services Logo" 
                      className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8">Localisation Portfolio</h3>
              <div className="flex flex-wrap justify-center gap-6">
                {projects.filter(p => p.tags.includes('Localisation')).map((project) => (
                  <div key={project.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] max-w-[320px]">
                    <ProjectCard project={project} />
                  </div>
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
            <p>Soon</p>
          </motion.div>
        );
      case 'Clothing':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto space-y-24 py-12"
          >
            {/* An Garda Síochána Section */}
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl font-bold border-b border-border-default pb-4 inline-block px-8">An Garda Síochána</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[725fr_350fr] gap-8">
                <div className="aspect-[725/348] overflow-hidden">
                  <img src="/assets/GdaShirt.png" alt="Garda shirts and gilets" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-[350/348] overflow-hidden">
                  <img src="/assets/GdaDecJacket1.png" alt="A Detective Garda jacket" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="aspect-[350/348] w-full md:w-[350px] shrink-0 overflow-hidden">
                  <img src="/assets/ASUFleece.png" alt="ASU Fleece" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="text-sm text-text-secondary space-y-4 leading-relaxed">
                    <p>
                      An Garda Síochána is the national police and security force for the Republic of Ireland. 
                      Since Ireland is a small island, they are the only police force in the country. 
                      The name comes from the Irish term 'The Guardians of Peace'. 
                      Unlike many other security forces throughout the world, the Gardaí (plural for Garda, a single member of An Garda Síochána) are an unarmed police force, 
                      with only specialised units having firearms, noteably the Armed Support Unit, depicted to the left.
                    </p>
                    <p>
                      There many divisions in the Garda Síochána, such as the prementioned Armed Support Unit, the Regular Unit, the Roads Policing Unit, 
                      the Technical Unit, Water Unit, Criminal Assets Buerea, and Detectives, all of which have been drawn out as closely as possible to real life uniforms.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full aspect-[1000/348] overflow-hidden">
                <img src="/assets/GdaJacket.png" alt="Garda jackets with unit variants" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>

              <div className="grid grid-cols-3 gap-8">
                <div className="aspect-[350/348] overflow-hidden">
                  <img src="/assets/GdaDecJacket2.png" alt="A Detective Garda Jacket" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-[350/348] overflow-hidden">
                  <img src="/assets/CABJacket.png" alt="CAB Jacket" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-[350/348] overflow-hidden">
                  <img src="/assets/ASUFleece.png" alt="ASU Fleece" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>

            {/* Gotham City Police Department Section */}
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl font-bold border-b border-border-default pb-4 inline-block px-8">Gotham City Police Department</h2>
              </div>

               <div className="grid grid-cols-1 md:grid-cols-[630fr_350fr] gap-8 items-start">
                <div className="aspect-[630/348] overflow-hidden">
                  <img src="/assets/GCPDShirt.png" alt="GCPD standard" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm text-text-secondary space-y-4 leading-relaxed">
                    <p>
                      The GCPD is a fictional police department from the Batman universe. There have been many versions of the uniform, 
                      such as the green uniforms from Batman 2004, or the NYPD inspired ones from Nolan.
                    </p>
                    <p>
                      My personal favourite is the uniform from the FOX show, 'Gotham', which is what I have drawn. 
                      The uniform consists of a peaked cap, a light blue shirt with a dark-blue tie and black pants, with an optional black leather jacket. 
                      Note that there are multiple variants of the jacket.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[630fr_350fr] gap-8 items-center">
                <div className="aspect-[630/348] overflow-hidden">
                  <img src="/assets/GCPDJacket.png" alt="GCPD Template 2" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="grid grid-cols-2 gap-4 items-center">
                  <div className="flex flex-col gap-4">
                    <div className="aspect-[1141/1012] overflow-hidden">
                      <img src="/assets/GCPDBadge.png" alt="Badge 1" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <div className="aspect-[976/1114] overflow-hidden">
                      <img src="/assets/GCPDPatch.png" alt="Badge 2" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                  <div className="aspect-[515/705] overflow-hidden">
                    <img src="/assets/GCPDRef.png" alt="GCPD Reference" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </div>
            </div>

            {/* Scotland Section */}
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl font-bold border-b border-border-default pb-4 inline-block px-8">Scotland</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[630fr_350fr] gap-8">
                <div className="aspect-[630/348] overflow-hidden">
                  <img src="/assets/SAS.png" alt="Scotland Template 1" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-[350/348] overflow-hidden">
                  <img src="/assets/SASShort.png" alt="Scotland Template 2" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>

              <div className="max-w-[658px] mx-auto w-full aspect-[630/348] overflow-hidden">
                <img src="/assets/SFRS.png" alt="Scotland Template 3" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>

            {/* Arizona State Highway Patrol Section */}
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl font-bold border-b border-border-default pb-4 inline-block px-8">Arizona State Highway Patrol</h2>
              </div>

              <div className="space-y-8 max-w-[658px] mx-auto">
                <div className="aspect-[630/348] overflow-hidden">
                  <img src="/assets/AZDPSA.png" alt="Arizona Template 1" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-[630/348] overflow-hidden">
                  <img src="/assets/AZDPSB.png" alt="Arizona Template 2" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-[725/348] overflow-hidden">
                  <img src="/assets/AZDPSC.png" alt="AZDPS C" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
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
        let author = p.author;
        let isLive = false;

        if (live) {
          numericVisits = live.visits;
          visitsStr = live.visits.toLocaleString();
          imageUrl = live.iconUrl || p.imageUrl;
          author = live.creator || p.author;
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
          author,
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
