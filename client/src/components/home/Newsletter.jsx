import React from 'react';

const Newsletter = () => {
  return (
    <section className="py-20 bg-essente-charcoal text-essente-cream">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-elegant font-light mb-6">Restez Inspiré</h2>
        <p className="text-lg font-light mb-10 text-gray-300">
          Inscrivez-vous à notre newsletter pour recevoir nos dernières collections, 
          invitations exclusives et conseils de style.
        </p>

        <form className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
          <input 
            type="email" 
            placeholder="Votre adresse email" 
            className="w-full px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-essente-gold focus:ring-1 focus:ring-essente-gold transition-all duration-300 rounded-none"
          />
          <button 
            type="submit" 
            className="w-full md:w-auto px-8 py-4 bg-essente-gold text-essente-charcoal font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300"
          >
            S'inscrire
          </button>
        </form>
        
        <p className="text-xs text-gray-500 mt-6">
          En vous inscrivant, vous acceptez notre politique de confidentialité. 
          Vous pouvez vous désinscrire à tout moment.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
