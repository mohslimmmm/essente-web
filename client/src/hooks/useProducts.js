import { useState, useEffect } from 'react';
import { getProducts } from '../services/productService';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data.data); // Assuming API returns { success: true, count: N, data: [] }
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error fetching products');
        setLoading(false);
        
        // Fallback to mock data if API fails (for demo purposes)
        console.warn('API failed, using mock data');
        setProducts([
            {
                _id: '1',
                name: "Manteau Laine Mérinos",
                category: "vetements",
                price: 450,
                image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "Coupe droite, 100% laine d'Italie.",
                isNewCollection: true
              },
              {
                _id: '2',
                name: "Sac Cabas Cuir",
                category: "accessoires",
                price: 320,
                image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "Cuir végétal, tannage naturel.",
                isNewCollection: false
              },
              {
                _id: '3',
                name: "Pull Cachemire Col Roulé",
                category: "vetements",
                price: 280,
                image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "Douceur absolue, beige minéral.",
                isNewCollection: false
              },
              {
                _id: '4',
                name: "Écharpe Soie Sauvage",
                category: "accessoires",
                price: 150,
                image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "Tissée main, finitions roulottées.",
                isNewCollection: true
              }
        ]);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
