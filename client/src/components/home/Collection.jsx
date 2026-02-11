import React, { useState } from 'react';
import ProductCard from '../common/ProductCard';
import { useProducts } from '../../hooks/useProducts';

const Collection = () => {
  const { products, loading, error } = useProducts();
  const [filter, setFilter] = useState('all');

  // Filter products based on selected category
  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  if (loading) return <div className="text-center py-20"><div className="loader mx-auto"></div><p className="mt-4 text-essente-charcoal font-elegant">Chargement de la collection...</p></div>;
  if (error) return <div className="text-center py-20 text-red-500">Une erreur est survenue: {error}</div>;

  return (
    <section id="collection" className="py-20 md:py-32 max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-4 mb-6">
          <div className="h-px w-8 bg-essente-gold"></div>
          <span className="text-essente-gold uppercase tracking-widest text-sm">Édition Printemps 2025</span>
          <div className="h-px w-8 bg-essente-gold"></div>
        </div>
        <h3 className="text-4xl md:text-5xl font-elegant text-essente-charcoal mb-4">Collection Capsule</h3>
        <p className="text-lg text-essente-charcoal/70 max-w-2xl mx-auto">
          Quatre pièces essentielles, réinterprétées avec notre signature minimaliste.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {['all', 'vetements', 'accessoires'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2 rounded-full text-sm uppercase tracking-widest transition-all duration-300 border ${
              filter === f 
                ? 'border-essente-gold bg-essente-gold text-essente-charcoal' 
                : 'border-essente-gold/30 text-essente-charcoal/70 hover:border-essente-gold hover:text-essente-charcoal'
            }`}
          >
            {f === 'all' ? 'Tous' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center text-essente-charcoal/60">
            Aucun produit trouvé dans cette catégorie.
          </div>
        )}
      </div>
    </section>
  );
};

export default Collection;
