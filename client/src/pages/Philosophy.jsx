import React from 'react';
import { motion } from 'framer-motion';

const Philosophy = () => {
  return (
    <div className="min-h-screen bg-essente-cream text-essente-charcoal pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-elegant font-light mb-6 text-essente-gold">
            Notre Philosophie
          </h1>
          <div className="h-1 w-24 bg-essente-gold mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="space-y-16">
          {/* Section 1: Essence */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg mx-auto font-light text-justify leading-relaxed"
          >
            <p className="text-xl md:text-2xl text-center mb-8 font-elegant text-essente-charcoal/80">
              "L'élégance n'est pas une question de luxe, c'est une question d'attitude."
            </p>
            <p>
              Chez <span className="font-bold text-primary-navy">ESSENTÉ</span>, nous croyons que le véritable luxe réside dans la simplicité et l'authenticité. 
              Chaque pièce de notre collection est le fruit d'une réflexion profonde sur l'essentiel, 
              éliminant le superflu pour ne garder que la beauté pure et la fonction. Nous ne créons pas seulement des objets, 
              mais des compagnons de vie qui s'embellissent avec le temps.
            </p>
          </motion.div>

          {/* Section 2: Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-essente-gold"
            >
              <h2 className="text-2xl font-elegant text-primary-navy mb-4">Artisanat & Excellence</h2>
              <p className="text-essente-charcoal/70 font-light">
                Nous collaborons avec des artisans d'exception qui perpétuent des savoir-faire ancestraux via des techniques modernes.
                La qualité des matériaux est notre priorité absolue, assurant une durabilité qui traverse le temps.
              </p>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-action-orange"
            >
              <h2 className="text-2xl font-elegant text-primary-navy mb-4">Durabilité Consciente</h2>
              <p className="text-essente-charcoal/70 font-light">
                 Une approche consciente de la consommation guide chacune de nos créations. 
                 Nous privilégions des productions limitées et responsables pour minimiser notre impact environnemental, 
                 sans jamais compromettre l'esthétique.
              </p>
            </motion.div>
          </div>

          {/* Manifesto */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-primary-navy text-essente-cream p-10 rounded-2xl text-center shadow-2xl"
          >
            <h3 className="text-3xl font-elegant mb-6 text-essente-gold">Notre Promesse</h3>
            <p className="text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Vous offrir des pièces intemporelles qui racontent une histoire. Votre histoire. 
              Moins, mais mieux. C'est ça, l'esprit Essenté.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Philosophy;
