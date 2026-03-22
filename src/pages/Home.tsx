import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Code, Box, Camera, Mail, Github, Twitter, Instagram } from 'lucide-react';
import { PROJECTS } from '../constants';
import { ProjectCard } from '../components/ProjectCard';
import { Project } from '../types';

const Home: React.FC = () => {
  const featuredIds = ['pls-donate', 'voicemaster', 'lc-dcg-project'];

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

  const [featuredProjects, setFeaturedProjects] = useState<Project[]>(
    PROJECTS.filter(p => featuredIds.includes(p.id))
  );

  useEffect(() => {
    const fetchLiveData = async () => {
      const robloxFeatured = featuredProjects.filter(p => p.placeId);
      if (robloxFeatured.length === 0) return;

      try {
        const placeIds = robloxFeatured.map(p => p.placeId).join(',');
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiUrl}/api/roblox/games?placeIds=${placeIds}&_t=${Date.now()}`);
        if (!response.ok) return;

        const liveData = await response.json();
        if (!Array.isArray(liveData) || liveData.length === 0) return;

        setFeaturedProjects(prev => prev.map(p => {
          const live = liveData.find((ld: any) => ld.placeId === p.placeId);
          if (!live) return p;
          return {
            ...p,
            visits: live.visits.toLocaleString(),
            numericVisits: live.visits,
            imageUrl: live.iconUrl || p.imageUrl,
            author: live.creator || p.author,
            isLive: true,
          };
        }));
      } catch (error) {
        console.error('Failed to fetch live data for featured projects:', error);
      }
    };

    fetchLiveData();
  }, []);

  const services = [
    { icon: <Globe size={24} />, title: 'Translation', desc: 'Chinese-English localisation for games, apps, and digital platforms.' },
    { icon: <Code size={24} />, title: 'Roblox', desc: 'Localisation, Luau scripting, UI design, and avatar clothing.' },
    { icon: <Box size={24} />, title: 'Engineering', desc: 'Software development, CAD modelling, and technical systems.' },
    { icon: <Camera size={24} />, title: 'Photography', desc: 'Street and urban photography across Ireland.' },
  ];

  const stats = [
    { value: '7B+', label: 'Combined visits across localised games' },
    { value: '10+', label: 'Shipped projects' },
    { value: 'C1', label: 'Certified English proficiency' },
  ];

  return (
    <div className="pt-24 pb-16">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
              Building things that <span className="text-brand-default">work</span> and look good doing it.
            </h1>
            <p className="text-xl text-text-secondary mb-10 leading-relaxed">
              I'm <span className="text-text-default font-medium">Billy</span>, a student based in Ireland with a focus on
              localisation, Roblox development, and software engineering. I like solving real problems and building things people actually use.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/roblox"
                className="bg-brand-default hover:bg-brand-hover text-white px-8 py-4 rounded-2xl font-semibold transition-all flex items-center gap-2 group"
              >
                View My Work <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-x-10 gap-y-4 border-t border-border-default pt-8"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-text-default">{stat.value}</span>
              <span className="text-text-secondary text-sm">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Featured Projects 
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Work</h2>
            <p className="text-text-secondary">A few projects I'm particularly proud of.</p>
          </div>
          <Link to="/roblox" className="text-brand-default hover:text-brand-hover font-medium flex items-center gap-1 text-sm">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
*/}
      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">What I Do</h2>
          <p className="text-text-secondary">A range of services across digital platforms and creative disciplines.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-cta-bg rounded-3xl border border-border-default hover:border-brand-default/30 transition-colors"
            >
              <div className="text-brand-default mb-6">{service.icon}</div>
              <h3 className="text-lg font-bold mb-2">{service.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About + Skills */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 pt-16 border-t border-border-default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold tracking-tight mb-8">About Me</h2>
            <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
              <p>
                I'm <span className="text-text-default font-medium">Billy</span>, a student based in Ireland.
                You might know me as <span className="text-text-default font-medium">Channers</span> on Discord
                or <span className="text-text-default font-medium">VexorianDev</span> on Roblox.
              </p>
              <p>
                My work spans Chinese-English localisation, Roblox scripting and UI design, software development,
                3D CAD modelling, and street photography. I tend to focus on the details, whether that's getting
                a translation to feel natural or making sure a UI actually makes sense to use.
              </p>
              <p>
                I'm always working on something new, and I'm open to freelance work and collaborations
                that are actually interesting.
              </p>

              <div className="pt-8 border-t border-border-default">
                <h3 className="text-text-default font-bold mb-4">Connect with me</h3>
                <div className="flex gap-4">
                  <a href="#" className="p-3 rounded-2xl bg-button-bg-transparent hover:bg-button-bg-transparent-hover text-text-default transition-all">
                    <Mail size={20} />
                  </a>
                  <a href="#" className="p-3 rounded-2xl bg-button-bg-transparent hover:bg-button-bg-transparent-hover text-text-default transition-all">
                    <Github size={20} />
                  </a>
                  <a href="#" className="p-3 rounded-2xl bg-button-bg-transparent hover:bg-button-bg-transparent-hover text-text-default transition-all">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="p-3 rounded-2xl bg-button-bg-transparent hover:bg-button-bg-transparent-hover text-text-default transition-all">
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-cta-bg p-8 rounded-3xl border border-border-default">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-brand-default">🌐</span> Translation & Localisation
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Fluent in English and Mandarin Chinese, I localise games, apps, and UI content with a focus on tone and
                cultural fit, not just word-for-word accuracy. Past work includes websites, Discord bots, and Roblox
                games reaching hundreds of millions of players.
              </p>
            </div>

            <div className="bg-cta-bg p-8 rounded-3xl border border-border-default">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-brand-default">🖥️</span> Development
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                I specialise in Roblox Studio scripting and UI design, building everything from phone GUI systems to
                vehicle mechanics. I also have experience in web development and general software engineering.
              </p>
            </div>

            <div className="bg-cta-bg p-8 rounded-3xl border border-border-default">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-brand-default">🧊</span> 3D Modelling & CAD
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                I use SolidWorks for mechanical parts, assemblies, and technical drawings.
                I also dabble in Blender for low-poly game assets when needed.
              </p>
            </div>

            <div className="bg-cta-bg p-8 rounded-3xl border border-border-default">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-brand-default">📸</span> Photography
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Amateur street photographer shooting mostly on a Sony CyberShot DSC-RX100 Mark I.
                I focus on emergency services, transport, and everyday urban life in Ireland.
              </p>
            </div>
          </motion.div>
        </div>

        {/*
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-brand-default/10 text-brand-default rounded-2xl">
                <Camera size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Photography</h2>
                <p className="text-text-secondary">Street and urban life across Ireland.</p>
              </div>
            </div>
            <Link to="/photography" className="text-brand-default hover:text-brand-hover font-medium flex items-center gap-1 text-sm">
              See more <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-border-default group">
              <img
                src="https://picsum.photos/seed/street1/800/600"
                alt="Street Photography 1"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-border-default group">
              <img
                src="https://picsum.photos/seed/street2/800/600"
                alt="Street Photography 2"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <p className="text-center text-text-secondary mt-6 text-sm italic">
            Mainly using a Sony CyberShot DSC-RX100 Mark I.
          </p>
          */}
        </motion.div>
      </section>

    </div>
  );
};

export default Home;