import React from 'react';

const Process = () => {
  return (
    <section id="processus" className="py-20 md:py-32 bg-essente-charcoal/5 max-w-7xl mx-auto px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-elegant text-essente-charcoal mb-4">Le Savoir-Faire ESSENTÉ</h3>
          <p className="text-lg text-essente-charcoal/70 max-w-2xl mx-auto">
            De la sélection des matières premières à la finition artisanale.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: 1, title: 'Sélection', text: 'Choix rigoureux des matières premières nobles.' },
            { step: 2, title: 'Conception', text: 'Design minimaliste pensé pour la longévité.' },
            { step: 3, title: 'Confection', text: 'Travail artisanal avec des techniques traditionnelles.' },
            { step: 4, title: 'Contrôle', text: 'Vérification méticuleuse de chaque détail.' },
          ].map((item) => (
            <div key={item.step} className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-essente-gold rounded-full flex items-center justify-center text-essente-cream text-xl font-bold">
                {item.step}
              </div>
              <h4 className="font-elegant text-xl">{item.title}</h4>
              <p className="text-sm text-essente-charcoal/70">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
