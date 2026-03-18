import React from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Twitter, Instagram } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight mb-8">About Me</h1>
            <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
              <p>
                Hello! I'm Billy, a 16-year-old designer, developer, and translator based in Ireland. 
                I am also known as <span className="text-text-default font-medium">Channers</span> or <span className="text-text-default font-medium">unknown_games</span> on Discord, 
                and <span className="text-text-default font-medium">VexorianDev</span> or <span className="text-text-default font-medium">BiLLYGeGe2</span> on Roblox.
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
                <h2 className="text-text-default font-bold mb-4">Connect with me</h2>
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
            animate={{ opacity: 1, scale: 1 }}
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
      </section>
    </div>
  );
};

export default About;
