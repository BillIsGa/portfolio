import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Code, Box, Camera, Mail, Github, Twitter, Instagram } from 'lucide-react';
import { PROJECTS } from '../constants';
import { ProjectCard } from '../components/ProjectCard';

const Home: React.FC = () => {
  const featuredIds = ['pls-donate', 'voicemaster', 'lc-dcg-project'];
  const featuredProjects = PROJECTS.filter(p => featuredIds.includes(p.id));

  const stats = [
    { value: '7B+', label: 'visits across localised projects' },
    { value: '10+', label: 'shipped projects' },
    { value: 'C1', label: 'certified English proficiency' },
    { value: '2+', label: 'years of experience' },
  ];

  const services = [
    {
      icon: <Globe size={20} />,
      title: 'Translation & Localisation',
      desc: 'Chinese-English localisation for games, apps, and digital platforms — with a focus on tone and cultural fit.',
      href: '/roblox?tab=Localisation',
    },
    {
      icon: <Code size={20} />,
      title: 'Roblox Development',
      desc: 'Luau scripting, UI systems, and avatar clothing for the Roblox platform.',
      href: '/roblox?tab=Development',
    },
    {
      icon: <Box size={20} />,
      title: 'Engineering',
      desc: 'Software development, CAD modelling, and technical systems.',
      href: '/engineering',
    },
    {
      icon: <Camera size={20} />,
      title: 'Photography',
      desc: 'Street and urban photography across Ireland.',
      href: '/#photography',
    },
  ];

  return (
    <div className="pt-24 pb-16">

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <p className="text-brand-default font-bold uppercase tracking-widest text-xs mb-6">
            Based in Ireland · Available for work
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.05]">
            Building things that <span className="text-brand-default">work</span> —{' '}
            and look good doing it.
          </h1>
          <p className="text-xl text-text-secondary mb-10 leading-relaxed max-w-2xl">
            I'm <span className="text-text-default font-medium">Billy</span>, a student with a focus on
            localisation, Roblox development, and software engineering. I like solving real problems
            and building things people actually use.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/roblox"
              className="bg-brand-default hover:bg-brand-hover text-white px-8 py-4 rounded-2xl font-semibold transition-all flex items-center gap-2 group"
            >
              View My Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#about"
              className="bg-button-bg-transparent hover:bg-button-bg-transparent-hover text-text-default px-8 py-4 rounded-2xl font-semibold transition-all"
            >
              About Me
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border-default rounded-3xl overflow-hidden border border-border-default"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-bg-primary px-8 py-8">
              <div className="text-3xl font-bold tracking-tight text-text-default mb-1">{stat.value}</div>
              <div className="text-text-secondary text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Featured Work ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Work</h2>
            <p className="text-text-secondary">A few projects I'm proud of.</p>
          </div>
          <Link
            to="/roblox"
            className="text-brand-default hover:text-brand-hover font-semibold flex items-center gap-1 text-sm transition-colors"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">What I Do</h2>
          <p className="text-text-secondary">Services across digital platforms and creative disciplines.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Link
                to={service.href}
                className="group flex flex-col h-full p-8 bg-cta-bg rounded-3xl border border-border-default hover:border-brand-default/40 transition-all hover:-translate-y-1"
              >
                <div className="text-brand-default mb-6 group-hover:scale-110 transition-transform w-fit">
                  {service.icon}
                </div>
                <h3 className="text-base font-bold mb-2">{service.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed flex-1">{service.desc}</p>
                <div className="mt-6 text-brand-default flex items-center gap-1 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight size={12} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 pt-16 border-t border-border-default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold tracking-tight mb-8">About Me</h2>
            <div className="space-y-5 text-text-secondary text-lg leading-relaxed">
              <p>
                I'm <span className="text-text-default font-medium">Billy</span>, a student based in Ireland.
                You might know me as <span className="text-text-default font-medium">Channers</span> on Discord
                or <span className="text-text-default font-medium">VexorianDev</span> on Roblox.
              </p>
              <p>
                My work spans Chinese-English localisation, Roblox scripting and UI design, software development,
                3D CAD modelling, and street photography. I tend to focus on the details — whether that's getting
                a translation to feel natural or making sure a UI actually makes sense to use.
              </p>
              <p>
                I'm always working on something new, and I'm open to collaborations that are actually interesting.
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-border-default">
              <p className="text-text-secondary text-sm font-medium mb-4">Connect with me</p>
              <div className="flex gap-3">
                {[
                  { icon: <Mail size={18} />, href: '#' },
                  { icon: <Github size={18} />, href: '#' },
                  { icon: <Twitter size={18} />, href: '#' },
                  { icon: <Instagram size={18} />, href: '#' },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className="p-3 rounded-2xl bg-button-bg-transparent hover:bg-button-bg-transparent-hover text-text-default transition-all hover:-translate-y-0.5"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-4"
          >
            {[
              {
                emoji: '🌐',
                title: 'Translation & Localisation',
                body: 'Fluent in English and Mandarin Chinese. Past work includes websites, Discord bots, and Roblox games reaching hundreds of millions of players — with a focus on tone and cultural fit, not just word-for-word accuracy.',
              },
              {
                emoji: '🖥️',
                title: 'Development',
                body: 'Roblox Studio scripting and UI design, from phone GUI systems to vehicle mechanics. Also experienced in web development and general software engineering.',
              },
              {
                emoji: '🧊',
                title: '3D Modelling & CAD',
                body: 'SolidWorks for mechanical parts, assemblies, and technical drawings. Basic Blender experience for low-poly game assets.',
              },
              {
                emoji: '📸',
                title: 'Photography',
                body: 'Amateur street photographer shooting on a Sony CyberShot DSC-RX100 Mark I. Focused on emergency services, transport, and everyday urban life in Ireland.',
              },
            ].map((card) => (
              <div key={card.title} className="bg-cta-bg p-6 rounded-2xl border border-border-default">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2">
                  <span>{card.emoji}</span> {card.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Photography Teaser ── */}
      <section id="photography" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-default/10 text-brand-default rounded-2xl">
              <Camera size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Photography</h2>
              <p className="text-text-secondary text-sm">Moments from around Ireland.</p>
            </div>
          </div>
          <Link
            to="/photography"
            className="text-brand-default hover:text-brand-hover font-semibold flex items-center gap-1 text-sm transition-colors"
          >
            View gallery <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-2 aspect-[16/10] rounded-3xl overflow-hidden border border-border-default group">
            <img
              src="https://picsum.photos/seed/street1/1200/750"
              alt="Street Photography"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-border-default group">
            <img
              src="https://picsum.photos/seed/street2/600/750"
              alt="Street Photography"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-border-default group">
            <img
              src="https://picsum.photos/seed/street3/600/750"
              alt="Street Photography"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <p className="text-text-secondary mt-6 text-sm text-center italic">
          Sony CyberShot DSC-RX100 Mark I
        </p>
      </section>

    </div>
  );
};

export default Home;