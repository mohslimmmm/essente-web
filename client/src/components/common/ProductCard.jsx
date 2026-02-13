import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

export const ProductSkeleton = () => (
  <div className="product-card animate-pulse">
    <div className="relative overflow-hidden rounded-xl mb-4 bg-gray-200 h-[400px] w-full"></div>
    <div className="space-y-2">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4 mt-2"></div>
    </div>
  </div>
);

const ProductCard = ({ product, loading }) => {
  const { addToCart, triggerFlyAnimation } = useCart();

  if (loading) return <ProductSkeleton />;

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigating if wrapped in Link
    addToCart(product);
    triggerFlyAnimation();
  };

  return (
    <motion.div 
      className="group product-card cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative overflow-hidden mb-4 bg-gray-100">
        {/* Image with Hover Zoom */}
        <div className="overflow-hidden">
          <motion.img 
            src={product.image} 
            alt={product.name}
            className="w-full h-[400px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        
        {/* Quick Add Button */}
        <motion.button 
           onClick={handleAddToCart}
           initial={{ opacity: 0, y: 10 }}
           whileHover={{ scale: 1.02 }}
           className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-3 uppercase tracking-widest text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 w-[90%]"
        >
           AJOUTER RAPIDE
        </motion.button>

        {/* Badge */}
        {product.isNewCollection && (
           <span className="absolute top-4 left-4 px-3 py-1 bg-[#C5A059] text-white text-xs uppercase tracking-widest">
             New
           </span>
        )}
      </div>
      
      <div className="space-y-1 text-center">
        <h4 className="font-elegant text-lg text-[#1a1a1a]">
          {product.name} — <span className="text-[#1a1a1a]">{product.price}</span>
        </h4>
      </div>
    </motion.div>
  );
};

export default ProductCard;
