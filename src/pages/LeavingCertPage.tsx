import React from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../constants';
import { ProjectCard } from '../components/ProjectCard';

const LeavingCertPage: React.FC = () => {
  const projects = PROJECTS.filter(p => p.category === 'Leaving Cert');

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight mb-4">Leaving Cert Coursework</h1>
          <p className="text-xl text-text-secondary mb-12 max-w-3xl">
            A collection of practical and theoretical projects submitted for the Leaving Certificate, 
            demonstrating skills in technical drawing, 3D modelling, and construction studies.
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

export default LeavingCertPage;
