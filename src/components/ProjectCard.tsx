import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const CardContent = (
    <>
      <div className="aspect-square overflow-hidden relative">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-brand-default text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
            View Project <ExternalLink size={14} />
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div />
          {project.visits && (
            <span className="text-[10px] font-bold text-text-secondary">
              {project.visits} Visits
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-1 group-hover:text-brand-default transition-colors">
          {project.title}
        </h3>
        {project.author && (
          <p className="text-xs text-text-secondary mb-3">by {project.author}</p>
        )}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-brand-default/5 text-brand-default text-[10px] font-medium rounded-md border border-brand-default/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  if (project.link) {
    return (
      <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="group block bg-cta-bg rounded-2xl border border-border-default overflow-hidden hover:border-brand-default/50 transition-all duration-300"
      >
        {CardContent}
      </motion.a>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group bg-cta-bg rounded-2xl border border-border-default overflow-hidden hover:border-brand-default/50 transition-all duration-300"
    >
      {CardContent}
    </motion.div>
  );
};
