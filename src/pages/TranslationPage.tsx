import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../constants';
import { ProjectCard } from '../components/ProjectCard';
import { Globe, Languages, Layout, Award, Users, RefreshCw, ExternalLink } from 'lucide-react';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { Project } from '../types';

const TranslationPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(PROJECTS.filter(p => p.category === 'Translation'));
  const [totalVisits, setTotalVisits] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSynced, setLastSynced] = useState<string>(new Date().toLocaleTimeString());

  const fetchLiveStats = async () => {
    const robloxProjects = projects.filter(p => p.placeId);
    if (robloxProjects.length === 0) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const placeIds = robloxProjects.map(p => p.placeId).join(',');
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/roblox/games?placeIds=${placeIds}&_t=${Date.now()}`);
      
      if (!response.ok) throw new Error('Failed to fetch live data');
      
      const liveData = await response.json();

      if (Array.isArray(liveData) && liveData.length > 0) {
        let newTotal = 0;
        const updatedProjects = projects.map(p => {
          const live = liveData.find(ld => ld.placeId === p.placeId);
          if (live) {
            newTotal += live.visits;
            return {
              ...p,
              visits: live.visits.toLocaleString(),
              imageUrl: live.iconUrl || p.imageUrl,
              description: `${p.description} (Live: ${live.playing.toLocaleString()} playing now)`,
              isLive: true
            };
          }
          
          // Fallback for non-Roblox or missing live data
          if (p.visits) {
            const cleanVisits = p.visits.replace(/,/g, '');
            const match = cleanVisits.match(/([\d.]+)([BMk]?)/);
            if (match) {
              const val = parseFloat(match[1]);
              const unit = match[2];
              const mult = unit === 'B' ? 1000000000 : unit === 'M' ? 1000000 : unit === 'k' ? 1000 : 1;
              newTotal += val * mult;
            }
          }
          return p;
        });

        setProjects(updatedProjects);
        setTotalVisits(newTotal);
        setLastSynced(new Date().toLocaleTimeString());
      }
    } catch (error) {
      console.error("Failed to fetch live stats:", error);
      // If live fetch fails, calculate from whatever static data we have
      let staticTotal = 0;
      projects.forEach(p => {
        if (p.visits) {
          const cleanVisits = p.visits.replace(/,/g, '');
          const match = cleanVisits.match(/([\d.]+)([BMk]?)/);
          if (match) {
            const val = parseFloat(match[1]);
            const unit = match[2];
            const mult = unit === 'B' ? 1000000000 : unit === 'M' ? 1000000 : unit === 'k' ? 1000 : 1;
            staticTotal += val * mult;
          }
        }
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
                <Globe size={32} />
              </div>
              <h1 className="text-4xl font-bold tracking-tight">Translation & Localisation</h1>
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
                I specialize in <span className="text-text-default font-semibold">Chinese</span> and bring extensive experience in providing localization services for games, apps, and digital platforms.
              </p>
              <div className="flex items-start gap-4 p-6 bg-cta-bg rounded-3xl border border-border-default">
                <Award className="text-brand-default shrink-0" size={24} />
                <div>
                  <h3 className="font-bold mb-1">C1 Advanced Certification</h3>
                  <p className="text-text-secondary text-sm mb-3">Certified reading score of C1 Advanced on the CEFR scale.</p>
                  <a 
                    href="https://www.efset.org/cert/srrbM1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-brand-default hover:underline flex items-center gap-1"
                  >
                    View Certificate <ExternalLink size={10} />
                  </a>
                </div>
              </div>
              <p className="text-text-secondary leading-relaxed">
                I am also a member of <span className="text-text-default font-medium">George Gaitanis's International Translation Services</span>, 
                a global network providing localization services across various languages.
              </p>
            </div>

            <div className="bg-brand-default p-8 md:p-12 rounded-[2.5rem] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Users size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-white/80 uppercase tracking-widest text-xs font-bold">Live Global Impact</h3>
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tighter">
                  {isLoading && totalVisits === 0 ? (
                    <span className="opacity-50">Loading...</span>
                  ) : (
                    <AnimatedCounter value={totalVisits} />
                  )}
                </div>
                <p className="text-white/90 font-medium text-sm">Total verified user interactions across all projects.</p>
                <p className="text-white/60 text-[10px] mt-4 uppercase tracking-widest">
                  {isLoading ? "Syncing with Roblox..." : `Last synced: ${lastSynced}`}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 bg-cta-bg rounded-3xl border border-border-default">
            <Languages className="text-brand-default mb-4" size={24} />
            <h3 className="font-bold mb-2">Mandarin Chinese</h3>
            <p className="text-text-secondary text-sm">Specialising in high-quality Chinese-English localisation with cultural nuance.</p>
          </div>
          <div className="p-8 bg-cta-bg rounded-3xl border border-border-default">
            <Layout className="text-brand-default mb-4" size={24} />
            <h3 className="font-bold mb-2">UI/UX Localisation</h3>
            <p className="text-text-secondary text-sm">Ensuring translated text fits perfectly within UI constraints and layout-fit.</p>
          </div>
          <div className="p-8 bg-cta-bg rounded-3xl border border-border-default">
            <Globe className="text-brand-default mb-4" size={24} />
            <h3 className="font-bold mb-2">Game Localisation</h3>
            <p className="text-text-secondary text-sm">Expertise in localising game mechanics, dialogue, and community content.</p>
          </div>
        </div>

        <div className="space-y-20">
          {/* Banana Studios Section */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Banana Studios Games</h2>
              <p className="text-text-secondary text-sm">A major collection of obstacle courses and simulators localised for Banana Studios.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.filter(p => p.author === 'Banana Studios Games').map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* Other Roblox Games */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Roblox Experiences</h2>
              <p className="text-text-secondary text-sm">Localisation services for various top-tier Roblox experiences.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.filter(p => p.placeId && p.author !== 'Banana Studios Games').map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* Sites & Documentation */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Sites & Documentation</h2>
              <p className="text-text-secondary text-sm">Localisation for web platforms, documentation, and Discord bots.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.filter(p => !p.placeId).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TranslationPage;
