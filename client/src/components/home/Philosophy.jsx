import React from 'react';
import { FaGem, FaLeaf, FaLock, FaArrowRight } from 'react-icons/fa';

const Philosophy = () => {
  return (
    <section id="philosophie" className="py-20 md:py-32 bg-essente-cream max-w-7xl mx-auto px-4">
      <div className="container mx-auto text-center">
        <div className="inline-flex items-center space-x-4 mb-12">
          <div className="h-px w-12 bg-essente-gold"></div>
          <h3 className="text-4xl md:text-5xl font-elegant text-essente-charcoal">Notre Manifeste</h3>
          <div className="h-px w-12 bg-essente-gold"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pilier 1 */}
          <div className="group space-y-6 p-8 rounded-2xl border border-essente-gold/30 hover:border-essente-gold/70 bg-white/50 hover:bg-white transition-all duration-500 transform hover:-translate-y-2">
            <div className="relative">
              <div className="w-20 h-20 mx-auto bg-essente-gold/10 rounded-full flex items-center justify-center group-hover:bg-essente-gold/20 transition duration-500">
                <FaGem className="text-3xl text-essente-gold" />
              </div>
            </div>
            <h4 className="text-2xl font-elegant font-semibold text-essente-charcoal">Qualité Intemporelle</h4>
            <p className="text-essente-charcoal/80 leading-relaxed">
              Nous sélectionnons rigoureusement chaque matériau. Cachemire d'Écosse, lin de Normandie, coton biologique - 
              seuls les meilleurs éléments constituent nos créations.
            </p>
            <div className="pt-4">
              <button className="text-essente-gold hover:text-essente-gold-dark text-sm uppercase tracking-widest flex items-center justify-center space-x-2 mx-auto group-hover:underline">
                <span>Découvrir les matières</span>
                <FaArrowRight className="text-xs" />
              </button>
            </div>
          </div>

          {/* Pilier 2 */}
          <div className="group space-y-6 p-8 rounded-2xl border border-essente-gold/30 hover:border-essente-gold/70 bg-white/50 hover:bg-white transition-all duration-500 transform hover:-translate-y-2">
            <div className="relative">
              <div className="w-20 h-20 mx-auto bg-essente-gold/10 rounded-full flex items-center justify-center group-hover:bg-essente-gold/20 transition duration-500">
                <FaLeaf className="text-3xl text-essente-gold" />
              </div>
            </div>
            <h4 className="text-2xl font-elegant font-semibold text-essente-charcoal">Conscience Écologique</h4>
            <p className="text-essente-charcoal/80 leading-relaxed">
              De la production à l'emballage, chaque étape est pensée pour minimiser notre empreinte. 
              Des éditions limitées pour éviter le gaspillage.
            </p>
            <div className="pt-4">
              <button className="text-essente-gold hover:text-essente-gold-dark text-sm uppercase tracking-widest flex items-center justify-center space-x-2 mx-auto group-hover:underline">
                <span>Notre impact</span>
                <FaArrowRight className="text-xs" />
              </button>
            </div>
          </div>

          {/* Pilier 3 */}
          <div className="group space-y-6 p-8 rounded-2xl border border-essente-gold/30 hover:border-essente-gold/70 bg-white/50 hover:bg-white transition-all duration-500 transform hover:-translate-y-2">
            <div className="relative">
              <div className="w-20 h-20 mx-auto bg-essente-gold/10 rounded-full flex items-center justify-center group-hover:bg-essente-gold/20 transition duration-500">
                <FaLock className="text-3xl text-essente-gold" />
              </div>
            </div>
            <h4 className="text-2xl font-elegant font-semibold text-essente-charcoal">Éditions Limitées</h4>
            <p className="text-essente-charcoal/80 leading-relaxed">
              Nous créons en petites séries numérotées, garantissant l'exclusivité de chaque pièce. 
              Pas de surproduction.
            </p>
            <div className="pt-4">
              <button className="text-essente-gold hover:text-essente-gold-dark text-sm uppercase tracking-widest flex items-center justify-center space-x-2 mx-auto group-hover:underline">
                <span>Voir les éditions</span>
                <FaArrowRight className="text-xs" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
