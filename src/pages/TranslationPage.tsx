import React from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../constants';
import { ProjectCard } from '../components/ProjectCard';

const TranslationPage: React.FC = () => {
  const projects = PROJECTS.filter(p => p.category === 'Translation');

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight mb-4">Translation & Localisation</h1>
          <p className="text-xl text-text-secondary mb-12 max-w-3xl">
            Professional translation and localisation services for digital products, documentation, 
            and legal materials, specialising in Chinese-English language pairs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TranslationPage;
