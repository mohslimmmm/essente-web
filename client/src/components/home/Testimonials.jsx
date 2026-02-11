import React from 'react';
import { FaUser } from 'react-icons/fa';

const Testimonials = () => {
  return (
    <section className="py-20 bg-essente-cream max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h3 className="text-3xl md:text-4xl font-elegant text-essente-charcoal mb-4">Ils parlent de nous</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: 'Sophie L.', city: 'Paris', text: '"Mon manteau ESSENTÉ est devenu mon vêtement signature. Deux ans plus tard, il est toujours aussi parfait."' },
          { name: 'Thomas B.', city: 'Lyon', text: '"Enfin une marque qui comprend que le vrai luxe est dans la durabilité et non dans le logo."' },
          { name: 'Camille R.', city: 'Bordeaux', text: '"J\'ai réduit ma garde-robe de 70% grâce à ESSENTÉ. Moins de choix, plus de style."' },
        ].map((t, index) => (
          <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-essente-gold/20">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-essente-gold/10 rounded-full flex items-center justify-center mr-4">
                <FaUser className="text-essente-gold" />
              </div>
              <div>
                <h4 className="font-elegant font-semibold">{t.name}</h4>
                <p className="text-sm text-essente-charcoal/60">{t.city}</p>
              </div>
            </div>
            <p className="text-essente-charcoal/80 italic">
              {t.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
