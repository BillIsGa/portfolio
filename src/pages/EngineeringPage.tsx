import React from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../constants';
import { ProjectCard } from '../components/ProjectCard';
import { Code2, Cpu, Database, Settings, Terminal, Bot } from 'lucide-react';

const EngineeringPage: React.FC = () => {
  const projects = PROJECTS.filter(p => p.category === 'Engineering');

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-brand-default/10 text-brand-default rounded-2xl">
              <Settings size={32} />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Software & Engineering</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-text-secondary text-lg leading-relaxed">
                My technical expertise extends beyond game platforms into <span className="text-text-default font-semibold">Software Development</span> and <span className="text-text-default font-semibold">Mechanical Engineering</span>.
              </p>
              <p className="text-text-secondary leading-relaxed">
                I build robust systems, from automated Discord bots and technical documentation to precision mechanical assemblies in SolidWorks.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-cta-bg rounded-3xl border border-border-default">
                <Code2 className="text-brand-default mb-2" size={24} />
                <h3 className="font-bold text-sm">Software</h3>
                <p className="text-text-secondary text-xs">Web & App Dev</p>
              </div>
              <div className="p-6 bg-cta-bg rounded-3xl border border-border-default">
                <Cpu className="text-brand-default mb-2" size={24} />
                <h3 className="font-bold text-sm">CAD</h3>
                <p className="text-text-secondary text-xs">Mechanical Design</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 bg-cta-bg rounded-3xl border border-border-default">
            <Terminal className="text-brand-default mb-4" size={24} />
            <h3 className="font-bold mb-2">Automation</h3>
            <p className="text-text-secondary text-sm">Building custom scripts and bots to streamline workflows and community management.</p>
          </div>
          <div className="p-8 bg-cta-bg rounded-3xl border border-border-default">
            <Database className="text-brand-default mb-4" size={24} />
            <h3 className="font-bold mb-2">Technical Docs</h3>
            <p className="text-text-secondary text-sm">Localising and structuring complex technical documentation for global audiences.</p>
          </div>
          <div className="p-8 bg-cta-bg rounded-3xl border border-border-default">
            <Bot className="text-brand-default mb-4" size={24} />
            <h3 className="font-bold mb-2">Discord Systems</h3>
            <p className="text-text-secondary text-sm">Expertise in managing and localising large-scale Discord bot ecosystems.</p>
          </div>
        </div>

        <div className="space-y-20">
          {/* Software Section */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Software Development</h2>
              <p className="text-text-secondary text-sm">Web applications, tools, and automated systems.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.filter(p => !p.tags.includes('CAD')).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* Engineering Section */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Mechanical Engineering</h2>
              <p className="text-text-secondary text-sm">Precision 3D modelling and technical assemblies in SolidWorks.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.filter(p => p.tags.includes('CAD')).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EngineeringPage;
