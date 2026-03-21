import React from 'react';
import { motion } from 'motion/react';
import { Shirt, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ClothingPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/roblox" className="inline-flex items-center gap-2 text-brand-default hover:text-brand-hover mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Roblox
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-brand-default/10 text-brand-default rounded-2xl">
              <Shirt size={32} />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Roblox Clothing Collection</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="space-y-12">
              {/* An Garda Síochána */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-brand-default">An Garda Síochána</h2>
                <div className="space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    An Garda Síochána is the national police and security force for the Republic of Ireland. 
                    Since Ireland is a small island, they are the only police force in the country. 
                    The name comes from the Irish term 'The Guardians of Peace'. 
                    Unlike many other security forces throughout the world, the Gardaí (plural for Garda, a single member of An Garda Síochána) are an unarmed police force, 
                    with only specialised units having firearms, noteably the Armed Support Unit, depicted to the left.
                  </p>
                  <p>
                    There many divisions in the Garda Síochána, such as the prementioned Armed Support Unit, the Regular Unit, the Roads Policing Unit, 
                    the Technical Unit, Water Unit, Criminal Assets Buerea, and Detectives, all of which have been drawn out as closely as possible to real life uniforms.
                  </p>
                </div>
              </section>

              {/* Gotham City Police Department */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-brand-default">Gotham City Police Department</h2>
                <div className="space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    The GCPD is a fictional police department from the Batman universe. There have been many versions of the uniform, 
                    such as the green uniforms from Batman 2004, or the NYPD inspired ones from Nolan.
                  </p>
                  <p>
                    My personal favourite is the uniform from the FOX show, 'Gotham', which is what I have drawn. 
                    The uniform consists of a peaked cap, a light blue shirt with a dark-blue tie and black pants, with an optional black leather jacket. 
                    Note that there are multiple variants of the jacket.
                  </p>
                </div>
              </section>

              {/* Scotland */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-brand-default">Scotland</h2>
                <div className="text-text-secondary leading-relaxed">
                  <p>
                    Custom designed uniforms for Police Scotland, featuring the iconic high-visibility vests and tactical gear 
                    used by the national police force of Scotland.
                  </p>
                </div>
              </section>

              {/* Arizona State Highway Patrol */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-brand-default">Arizona State Highway Patrol</h2>
                <div className="text-text-secondary leading-relaxed">
                  <p>
                    Detailed recreations of the Arizona Department of Public Safety (AZDPS) Highway Patrol uniforms, 
                    focusing on the tan-coloured tactical gear and state-specific insignia.
                  </p>
                </div>
              </section>
            </div>

            <div className="relative">
              <div className="sticky top-24">
                <div className="rounded-[2rem] overflow-hidden border border-border-default bg-cta-bg shadow-2xl">
                  <img 
                    src="https://picsum.photos/seed/roblox-uniforms/1200/2400" 
                    alt="Roblox Clothing Showcase" 
                    className="w-full h-auto"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="mt-4 text-center text-sm text-text-secondary italic">
                  Showcase of various law enforcement uniforms designed for the Roblox platform.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClothingPage;
