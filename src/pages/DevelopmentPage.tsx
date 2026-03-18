import React from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../constants';
import { ProjectCard } from '../components/ProjectCard';
import { Code, Smartphone, Car, Shirt } from 'lucide-react';

const DevelopmentPage: React.FC = () => {
  const devProjects = PROJECTS.filter(p => p.category === 'Development');

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
              <Code size={32} />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Development & Roblox</h1>
          </div>
          <p className="text-text-secondary text-lg max-w-3xl leading-relaxed">
            Specialising in Roblox Studio development, I create everything from intuitive UI systems to complex game mechanics. 
            My work focuses on clean scripting (Luau) and user-centric design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 bg-cta-bg rounded-3xl border border-border-default">
            <Smartphone className="text-brand-default mb-4" size={24} />
            <h3 className="font-bold mb-2">UI/UX Systems</h3>
            <p className="text-text-secondary text-sm">Creating phone GUIs, inventory systems, and interactive menus.</p>
          </div>
          <div className="p-8 bg-cta-bg rounded-3xl border border-border-default">
            <Car className="text-brand-default mb-4" size={24} />
            <h3 className="font-bold mb-2">Scripting & Physics</h3>
            <p className="text-text-secondary text-sm">Advanced vehicle chassis, engine systems, and game mechanics.</p>
          </div>
          <div className="p-8 bg-cta-bg rounded-3xl border border-border-default">
            <Shirt className="text-brand-default mb-4" size={24} />
            <h3 className="font-bold mb-2">Clothing Design</h3>
            <p className="text-text-secondary text-sm">Designing high-quality clothing assets for the Roblox avatar shop.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-8">Selected Development Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {devProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DevelopmentPage;
