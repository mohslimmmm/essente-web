import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="group product-card">
      <div className="relative overflow-hidden rounded-xl mb-4">
        {/* Image */}
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay Actions (Quick View / Add to Cart) - Simplified for now */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <button className="w-full py-3 bg-essente-cream text-essente-charcoal font-medium uppercase tracking-widest text-xs rounded shadow-lg hover:bg-essente-gold transition-colors">
             Ajouter au panier
           </button>
        </div>
        {/* Badge */}
        {product.isNewCollection && (
           <span className="absolute top-4 left-4 px-3 py-1 bg-essente-gold text-essente-charcoal text-xs uppercase tracking-widest rounded-full">
             Nouveau
           </span>
        )}
      </div>
      
      <div className="space-y-1">
        <h4 className="font-elegant text-lg text-essente-charcoal group-hover:text-essente-gold transition-colors">
          {product.name}
        </h4>
        <p className="text-sm text-essente-charcoal/60 truncate">
          {product.description}
        </p>
        <p className="text-essente-charcoal font-medium mt-1">
          {product.price} €
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
