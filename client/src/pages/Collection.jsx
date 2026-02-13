import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/common/ProductCard';

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch from the dummy endpoint we created
        const { data } = await axios.get('http://localhost:5000/api/v1/products/dummy');
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="pt-24 pb-12 min-h-screen bg-essente-cream text-essente-charcoal">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-elegant font-light mb-8 text-center text-essente-gold">
          Notre Collection
        </h1>
        <p className="text-center text-lg max-w-2xl mx-auto mb-16 font-light">
          Découvrez notre sélection exclusive de produits conçus pour élever votre quotidien.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
             // Show Skeleton Loaders
             Array.from({ length: 6 }).map((_, index) => (
                <ProductCard key={index} loading={true} />
             ))
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
