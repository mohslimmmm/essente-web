import React from 'react';
import { motion } from 'framer-motion';

const Process = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="processus" className="py-20 md:py-32 bg-[#F9F9F9] max-w-7xl mx-auto px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-elegant text-[#1a1a1a] mb-4">Le Savoir-Faire ESSENTÉ</h3>
          <p className="text-lg text-[#1a1a1a]/70 max-w-2xl mx-auto">
            De la sélection des matières premières à la finition artisanale.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            { step: 1, title: 'Sélection', text: 'Choix rigoureux des matières premières nobles.' },
            { step: 2, title: 'Conception', text: 'Design minimaliste pensé pour la longévité.' },
            { step: 3, title: 'Confection', text: 'Travail artisanal avec des techniques traditionnelles.' },
            { step: 4, title: 'Contrôle', text: 'Vérification méticuleuse de chaque détail.' },
          ].map((item) => (
            <motion.div key={item.step} variants={itemVariants} className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#C5A059] rounded-full flex items-center justify-center text-white text-xl font-bold">
                {item.step}
              </div>
              <h4 className="font-elegant text-xl text-[#1a1a1a]">{item.title}</h4>
              <p className="text-sm text-[#1a1a1a]/70">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default Process;
