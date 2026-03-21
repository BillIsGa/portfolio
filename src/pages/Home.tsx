import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Code, Box, Camera } from 'lucide-react';
import { PROJECTS } from '../constants';
import { ProjectCard } from '../components/ProjectCard';

const Home: React.FC = () => {
  const featuredProjects = PROJECTS.slice(0, 3);

  const services = [
    { icon: <Globe size={24} />, title: 'Roblox', desc: 'Full-stack Roblox services: Localisation, Dev & Design.' },
    { icon: <Code size={24} />, title: 'Engineering', desc: 'Software development and technical systems.' },
    { icon: <Box size={24} />, title: 'CAD Modelling', desc: 'Mechanical design and 3D assemblies in SolidWorks.' },
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
                Roblox <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="bg-button-bg-transparent hover:bg-button-bg-transparent-hover text-text-default px-8 py-4 rounded-2xl font-semibold transition-all"
              >
                About Me
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
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

      {/* Roblox Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
    </div>
  );
};

export default Home;
