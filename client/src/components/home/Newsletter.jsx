import React from 'react';
import { FaEnvelope, FaArrowRight } from 'react-icons/fa';

const Newsletter = () => {
  return (
    <section className="py-20 md:py-24 bg-essente-charcoal text-essente-cream/90 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-essente-gold/5 to-transparent"></div>
      <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
        <div className="inline-flex items-center space-x-4 mb-6">
          <div className="h-px w-12 bg-essente-gold"></div>
          <FaEnvelope className="text-essente-gold text-2xl" />
          <div className="h-px w-12 bg-essente-gold"></div>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-elegant mb-6 text-essente-gold">
          Rejoignez le Mouvement Conscient.
        </h3>
        <p className="text-lg mb-8 font-light max-w-2xl mx-auto">
          Recevez en avant-première les annonces de nos éditions limitées, des conseils d'entretien, 
          et des réflexions sur la mode durable.
        </p>

        <form className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 max-w-xl mx-auto">
          <div className="relative w-full md:w-2/3">
            <input 
              type="email" 
              placeholder="Votre adresse email" 
              required
              className="w-full p-4 pl-12 bg-essente-cream text-essente-charcoal border border-essente-gold focus:ring-2 focus:ring-essente-gold/50 focus:border-transparent rounded-lg shadow-inner placeholder-essente-charcoal/50 transition duration-300 focus:outline-none"
            />
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-essente-gold/70" />
          </div>
          
          <button 
            type="submit"
            className="w-full md:w-1/3 p-4 bg-essente-gold text-essente-charcoal border border-essente-gold hover:bg-essente-gold/90 transition-all duration-300 uppercase text-sm tracking-widest rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <span>S'inscrire</span>
            <FaArrowRight className="text-xs" />
          </button>
        </form>
        
        <p className="text-xs text-essente-cream/50 mt-6">
          En vous inscrivant, vous acceptez de recevoir nos communications. Désabonnez-vous à tout moment.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
