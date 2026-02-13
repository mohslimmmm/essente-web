import React from 'react';
import { Link } from 'react-router-dom';

import img1 from '../../assets/images/Product flatlay.jpg';
import img2 from '../../assets/images/Product flatlay2.jpg';
import img3 from '../../assets/images/Quality wallet and watch.jpg';
import img4 from '../../assets/images/Minimal bathroom 2.jpg';

const FeaturedProducts = () => {
  const products = [
    { id: 1, name: "Vase Minimaliste", price: "85.00 €", image: img1 },
    { id: 2, name: "Bougie Parfumée", price: "45.00 €", image: img2 },
    { id: 3, name: "Plateau en Marbre", price: "120.00 €", image: img3 },
    { id: 4, name: "Coussins en Lin", price: "60.00 €", image: img4 },
  ];

  return (
    <section className="py-20 bg-white text-essente-charcoal">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-elegant font-light mb-4">La Sélection du Moment</h2>
          <div className="w-24 h-1 bg-essente-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className={`aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg relative`}>
                <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-80 object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full group-hover:translate-y-0 bg-white text-essente-charcoal px-6 py-2 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 font-medium text-sm hover:bg-essente-gold hover:text-white">
                  Ajouter au Panier
                </button>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-elegant">{product.name}</h3>
                <p className="text-essente-gold font-bold mt-1">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
            <Link to="/collection" className="inline-block border border-essente-charcoal px-8 py-3 rounded-none hover:bg-essente-charcoal hover:text-white transition-all duration-300 uppercase tracking-widest text-sm">
                Voir toute la collection
            </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
