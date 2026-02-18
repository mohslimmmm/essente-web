import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../common/ProductCard';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
            if (data.success) {
                // Filter for "featured" or "new collection" products, or just take first 4
                // Since seeder sets isNewCollection for some, let's use that
                const featured = data.data.filter(p => p.isNewCollection).slice(0, 4);
                setProducts(featured.length > 0 ? featured : data.data.slice(0, 4));
            }
        } catch (err) {
            console.error("Failed to fetch featured products:", err);
        } finally {
            setLoading(false);
        }
    };
    fetchProducts();
  }, []);

  if (loading) {
      return <div className="py-20 text-center">Loading...</div>;
  }

  return (
    <section className="py-20 bg-white text-essente-charcoal">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-elegant font-light mb-4">La Sélection du Moment</h2>
          <div className="w-24 h-1 bg-essente-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={{...product, id: product._id}} />
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
