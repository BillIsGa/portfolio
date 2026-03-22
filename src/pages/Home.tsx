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
    { icon: <Globe size={24} />, title: 'Translation', desc: 'Chinese-English localisation for games, apps, and digital platforms.' },
    { icon: <Code size={24} />, title: 'Roblox', desc: 'Localisation, Luau scripting, UI design, and avatar clothing.' },
    { icon: <Box size={24} />, title: 'Engineering', desc: 'Software development, CAD modelling, and technical systems.' },
    { icon: <Camera size={24} />, title: 'Photography', desc: 'Street and urban photography across Ireland.' },
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
              Building things that <span className="text-brand-default">work</span>, and look good doing it.
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

      {/* Roblox Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="bg-cta-bg rounded-[2rem] p-8 md:p-16 border border-border-default relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Code size={200} />
          </div>
          <div className="relative z-10 max-w-2xl">
            <span className="text-brand-default font-bold uppercase tracking-widest text-xs mb-4 block">Roblox</span>
            <h2 className="text-4xl font-bold mb-6">Localisation, Development & Design</h2>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              I've contributed to games with over a billion combined visits, handling Chinese localisation,
              Luau scripting, and UI systems. If you're building something on Roblox and need a hand, I'm available for work.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/roblox" className="bg-brand-default text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-hover transition-colors">
                Roblox Portfolio
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
                I'm <span className="text-text-default font-medium">Billy</span>, a student based in Ireland.
                You might know me as <span className="text-text-default font-medium">Channers</span> on Discord
                or <span className="text-text-default font-medium">BiLLYGeGe2</span> on Roblox.
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