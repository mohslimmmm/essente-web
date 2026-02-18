import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#F9F9F9]/90 backdrop-blur-md text-essente-charcoal/80 pt-16 pb-8 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div className="space-y-4">
                    <h5 className="text-2xl font-elegant text-essente-charcoal mb-4">ESSENTÉ</h5>
                    <p className="text-sm text-essente-charcoal/60 leading-relaxed">
                        Redéfinir l'essentiel depuis 2018. Une approche consciente du luxe minimaliste.
                    </p>
                </div>
                
                <div>
                    <h5 className="text-essente-charcoal font-bold text-sm uppercase tracking-widest mb-6">Navigation</h5>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#collection" className="hover:text-essente-gold transition duration-300">Collection</a></li>
                        <li><a href="#philosophie" className="hover:text-essente-gold transition duration-300">Philosophie</a></li>
                        <li><a href="#processus" className="hover:text-essente-gold transition duration-300">Savoir-Faire</a></li>
                    </ul>
                </div>
                
                <div>
                    <h5 className="text-essente-charcoal font-bold text-sm uppercase tracking-widest mb-6">Support</h5>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-essente-gold transition duration-300">FAQ</a></li>
                        <li><a href="#" className="hover:text-essente-gold transition duration-300">Retours</a></li>
                        <li><a href="#" className="hover:text-essente-gold transition duration-300">Contact</a></li>
                    </ul>
                </div>
                
                <div>
                    <h5 className="text-essente-charcoal font-bold text-sm uppercase tracking-widest mb-6">Contact</h5>
                    <ul className="space-y-3 text-sm">
                        <li>Montréal, Québec, Canada</li>
                        <li>contact@essente.com</li>
                    </ul>
                </div>
            </div>
            
            <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-xs text-essente-charcoal/60">
                <div className="mb-4 md:mb-0">&copy; 2025 ESSENTÉ. Minimal Luxe.</div>
                <div className="flex space-x-6">
                    <a href="#" className="hover:text-essente-gold">Mentions Légales</a>
                    <a href="#" className="hover:text-essente-gold">Confidentialité</a>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
