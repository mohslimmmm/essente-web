import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/common/ProductCard';
import { motion } from 'framer-motion';
import { FiGrid, FiList, FiFilter, FiSearch, FiX } from 'react-icons/fi';

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [showFilters, setShowFilters] = useState(false);



  const categories = [
    { id: 'all', name: 'Tous les Produits', count: 0 },
    { id: 'bedroom', name: 'Chambre', count: 0 },
    { id: 'living', name: 'Salon', count: 0 },
    { id: 'office', name: 'Bureau', count: 0 },
    { id: 'accessories', name: 'Accessoires', count: 0 },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        if (data.success && data.data.length > 0) {
          // Map _id to id for compatibility
          const mappedProducts = data.data.map(p => ({ ...p, id: p._id }));
          setProducts(mappedProducts);
        } else {
          console.warn("API returned empty data.");
          // No fallback
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        // No fallback
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by price range
    result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-high':
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        result = result.filter(p => p.isNewCollection);
        break;
      default:
        // featured - keep original order
        break;
    }

    setFilteredProducts(result);
  }, [selectedCategory, sortBy, products, searchTerm, priceRange]);

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0a192f] via-[#0a192f] to-[#1a1a1a] text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#C5A059] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C5A059] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-elegant font-light mb-6 tracking-wide">
              Notre <span className="text-[#C5A059]">Collection</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
              Découvrez notre sélection exclusive de produits conçus pour élever votre quotidien avec élégance et simplicité.
            </p>
            <div className="mt-8 flex justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#C5A059] rounded-full"></span>
                <span>Qualité Premium</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#C5A059] rounded-full"></span>
                <span>Design Intemporel</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#C5A059] rounded-full"></span>
                <span>Livraison Offerte</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#C5A059] transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="bg-white border-b border-gray-200 sticky top-[100px] z-10 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? 'bg-[#C5A059] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-2"
              >
                <FiFilter size={16} />
                Price Filter
              </button>
            </div>

            {/* Sort & View Controls */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#C5A059] bg-white"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-[#C5A059] text-white' : 'bg-white text-gray-600'}`}
                >
                  <FiGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-[#C5A059] text-white' : 'bg-white text-gray-600'}`}
                >
                  <FiList size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Price Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="flex items-center gap-6">
                <label className="text-sm font-medium text-gray-700">Price Range:</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Min:</span>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Max:</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 5000 })}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <button
                    onClick={() => setPriceRange({ min: 0, max: 5000 })}
                    className="text-sm text-[#C5A059] hover:underline"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            {!loading && (
              <span>
                {filteredProducts.length} {filteredProducts.length === 1 ? 'produit' : 'produits'}
                {selectedCategory !== 'all' && ` dans "${categories.find(c => c.id === selectedCategory)?.name}"`}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCard key={index} loading={true} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div 
            className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <FiFilter className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-elegant text-gray-700 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-500">Essayez de modifier vos filtres</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-4 px-6 py-2 bg-[#C5A059] text-white rounded-lg hover:bg-[#A08442] transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-[#1a1a1a] to-[#0a192f] text-white py-16 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-elegant mb-4">Restez Informé</h3>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir nos nouveautés et offres exclusives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
            />
            <button className="px-8 py-3 bg-[#C5A059] text-white rounded-lg hover:bg-[#A08442] transition-colors font-medium">
              S'inscrire
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collection;
