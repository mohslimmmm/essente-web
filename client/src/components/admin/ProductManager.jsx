import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FiPlus, FiSearch, FiFilter } from 'react-icons/fi';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';

// Dummy categories
const CATEGORIES = [
  { id: '1', name: 'Living Room', slug: 'living', visible: true, order: 1 },
  { id: '2', name: 'Bedroom', slug: 'bedroom', visible: true, order: 2 },
  { id: '3', name: 'Office', slug: 'office', visible: true, order: 3 },
  { id: '4', name: 'Accessories', slug: 'accessories', visible: true, order: 4 }
];

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products'); // Use API service
        if (data.success) {
          // Map _id to id
           const mapped = data.data.map(p => ({ ...p, id: p._id }));
          setProducts(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.name?.toLowerCase().includes(searchTerm.toLowerCase()); // Handle both name/title
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Add or update product
  const handleSaveProduct = async (productData) => {
    try {
        if (editingProduct) {
             const { data } = await api.put(`/products/${editingProduct.id}`, productData);
             setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...data.data, id: data.data._id } : p));
        } else {
             const { data } = await api.post('/products', productData);
             setProducts(prev => [...prev, { ...data.data, id: data.data._id }]);
        }
        setEditingProduct(null);
    } catch (err) {
        console.error("Failed to save product", err);
        alert("Failed to save product");
    }
  };

  // Delete product
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
          await api.delete(`/products/${productId}`);
          setProducts(prev => prev.filter(p => p.id !== productId));
      } catch (err) {
          console.error("Failed to delete", err);
      }
    }
  };

  // Update single field (for inline editing)
  const handleUpdateField = (productId, field, value) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, [field]: parseFloat(value) || 0 } : p
    ));
  };

  // Open form for editing
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  // Open form for new product
  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-white font-light mb-2">Product Manager</h2>
          <p className="text-gray-400 text-sm">
            Manage your inventory • {products.length} total products
          </p>
        </div>
        <button
          onClick={handleAddProduct}
          className="flex items-center gap-2 px-6 py-3 bg-[#C5A059] text-black font-medium rounded-lg hover:bg-[#d4b06a] transition-colors"
        >
          <FiPlus size={20} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-[#1E1E1E] border border-[#333] text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:border-[#C5A059] transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-[#1E1E1E] border border-[#333] text-white pl-12 pr-8 py-3 rounded-lg focus:outline-none focus:border-[#C5A059] transition-colors appearance-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat.slug} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#1E1E1E] border border-[#333] p-4 rounded-lg">
          <div className="text-gray-500 text-sm mb-1">Total Products</div>
          <div className="text-2xl text-white font-light">{products.length}</div>
        </div>
        <div className="bg-[#1E1E1E] border border-[#333] p-4 rounded-lg">
          <div className="text-gray-500 text-sm mb-1">Low Stock</div>
          <div className="text-2xl text-red-400 font-light">
            {products.filter(p => p.stock < 10).length}
          </div>
        </div>
        <div className="bg-[#1E1E1E] border border-[#333] p-4 rounded-lg">
          <div className="text-gray-500 text-sm mb-1">New Collection</div>
          <div className="text-2xl text-[#C5A059] font-light">
            {products.filter(p => p.isNewCollection).length}
          </div>
        </div>
        <div className="bg-[#1E1E1E] border border-[#333] p-4 rounded-lg">
          <div className="text-gray-500 text-sm mb-1">Total Value</div>
          <div className="text-2xl text-white font-light">
            ${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1E1E1E] border border-[#333] rounded-lg overflow-hidden">
        <ProductTable
          products={filteredProducts}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onUpdateField={handleUpdateField}
        />
      </div>

      {/* Product Form Modal */}
      <ProductForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        product={editingProduct}
        categories={CATEGORIES}
      />
    </div>
  );
};

export default ProductManager;
