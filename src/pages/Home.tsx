import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Code, Box, Camera, Mail, Github, Twitter, Instagram } from 'lucide-react';
import { PROJECTS } from '../constants';
import { ProjectCard } from '../components/ProjectCard';

const Home: React.FC = () => {
  const featuredIds = ['pls-donate', 'voicemaster', 'lc-dcg-project'];
  const featuredProjects = PROJECTS.filter(p => featuredIds.includes(p.id));

  const services = [
    { icon: <Globe size={24} />, title: 'Translation', desc: 'Professional Chinese-English localisation for apps and docs.' },
    { icon: <Code size={24} />, title: 'Roblox', desc: 'Full-stack Roblox services: Localisation, Dev & Design.' },
    { icon: <Box size={24} />, title: 'Engineering', desc: 'Software development and technical systems.' },
    { icon: <Camera size={24} />, title: 'Photography', desc: 'Urban street photography and urban life.' },
  ];

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
              Designing <span className="text-brand-default">digital</span> experiences with precision.
            </h1>
            <p className="text-xl text-text-secondary mb-10 leading-relaxed">
              I'm <span className="text-text-default font-medium">Billy</span>, a designer, developer, and translator based in Ireland. 
              I combine creative and technical skills to produce clear, user-focused digital work.
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

      {/* Featured Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Projects</h2>
            <p className="text-text-secondary">A selection of my recent work across various disciplines.</p>
          </div>
          <Link to="/roblox" className="text-brand-default hover:text-brand-hover font-medium flex items-center gap-1">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Services</h2>
          <p className="text-text-secondary">Specialised solutions for digital platforms and global markets.</p>
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

      {/* Roblox Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="bg-cta-bg rounded-[2rem] p-8 md:p-16 border border-border-default relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Code size={200} />
          </div>
          <div className="relative z-10 max-w-2xl">
            <span className="text-brand-default font-bold uppercase tracking-widest text-xs mb-4 block">Roblox Specialisation</span>
            <h2 className="text-4xl font-bold mb-6">Expert Roblox Development & Localisation</h2>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              I provide end-to-end services for Roblox creators, from complex Luau scripting and UI design to full Chinese-English localisation for global reach.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/roblox" className="bg-brand-default text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-hover transition-colors">
                Explore Roblox
              </Link>
              <Link to="/engineering" className="bg-button-bg-transparent text-text-default px-6 py-3 rounded-xl font-semibold hover:bg-button-bg-transparent-hover transition-colors">
                Engineering Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
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
                Hello! I'm <span className="text-text-default font-medium">Billy</span>, a designer, developer, and translator based in Ireland. 
                I am also known as <span className="text-text-default font-medium">Channers (unknown_games)</span> on Discord, 
                and <span className="text-text-default font-medium">VexorianDev (BiLLYGeGe2)</span> on Roblox.
              </p>
              <p>
                I work across Chinese-English translation and localisation, UI/UX design, programming, 3D CAD modelling, and photography. 
                My approach combines creative and technical skills to produce clear, user-focused digital work.
              </p>
              <p>
                Whether it's localising a game for a global audience or scripting complex systems in Roblox, 
                I focus on tone, consistency, and intuitive design.
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
                Proficient in English and Mandarin Chinese, I specialise in localisation for games, apps, and UI content. 
                I’ve translated projects such as websites, Discord bots and video games, with a strong focus on tone, consistency, and layout-fit.
              </p>
            </div>

            <div className="bg-cta-bg p-8 rounded-3xl border border-border-default">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-brand-default">🖥️</span> Development
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Over time, I’ve developed my skills in Roblox Studio, where I specialise in scripting and UI design - 
                creating everything from intuitive interfaces to complex game mechanics, such as vehicles or phone GUI systems.
              </p>
            </div>

            <div className="bg-cta-bg p-8 rounded-3xl border border-border-default">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-brand-default">🧊</span> 3D Modelling & CAD
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Using SolidWorks, I create mechanical parts, assemblies, and technical drawings. 
                I also have basic experience with Blender for low-poly game assets and mesh optimisation.
              </p>
            </div>

            <div className="bg-cta-bg p-8 rounded-3xl border border-border-default">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-brand-default">📸</span> Photography
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                I am an amateur street photographer mainly using an original Sony CyberShot DSC-RX100 Mark I, 
                primarily focusing on emergency service units and other aspects of urban and rural life.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Photography Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-brand-default/10 text-brand-default rounded-2xl">
              <Camera size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Photography</h2>
              <p className="text-text-secondary">A collection of moments captured through my lens.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-border-default group">
              <img 
                src="https://picsum.photos/seed/street1/800/1000" 
                alt="Street Photography 1" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-border-default group">
              <img 
                src="https://picsum.photos/seed/street2/800/1000" 
                alt="Street Photography 2" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-border-default group">
              <img 
                src="https://picsum.photos/seed/street3/800/1000" 
                alt="Street Photography 3" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <p className="text-center text-text-secondary mt-8 text-sm italic">
            Mainly using a Sony CyberShot DSC-RX100 Mark I.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
