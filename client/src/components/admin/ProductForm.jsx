import React, { useState, useEffect } from 'react';
import { FiX, FiUpload, FiImage } from 'react-icons/fi';

const ProductForm = ({ isOpen, onClose, onSave, product, categories }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    compareAtPrice: '',
    stock: '',
    category: '',
    image: '',
    isNewCollection: false,
    variants: []
  });

  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        description: product.description || '',
        price: product.price || '',
        compareAtPrice: product.compareAtPrice || '',
        stock: product.stock || '',
        category: product.category || '',
        image: product.image || '',
        isNewCollection: product.isNewCollection || false,
        variants: product.variants || []
      });
    } else {
      setFormData({
        title: '',
        description: '',
        price: '',
        compareAtPrice: '',
        stock: '',
        category: '',
        image: '',
        isNewCollection: false,
        variants: []
      });
    }
  }, [product, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...formData.variants];
    
    if (field === 'size' || field === 'color') {
        newVariants[index].combination = {
            ...newVariants[index].combination,
            [field]: value
        };
    } else {
        newVariants[index][field] = value;
    }
    
    setFormData(prev => ({ ...prev, variants: newVariants }));
  };

  const addVariant = () => {
      setFormData(prev => ({
          ...prev,
          variants: [
              ...prev.variants,
              {
                  sku: '',
                  combination: { size: '', color: '' },
                  price: prev.price || 0,
                  stock: 0
              }
          ]
      }));
  };

  const removeVariant = (index) => {
      setFormData(prev => ({
          ...prev,
          variants: prev.variants.filter((_, i) => i !== index)
      }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseFloat(formData.price) || 0,
      compareAtPrice: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : null,
      stock: parseInt(formData.stock) || 0,
      variants: formData.variants.map(v => ({
          ...v,
          price: parseFloat(v.price) || 0,
          stock: parseInt(v.stock) || 0
      })),
      id: product?.id || Date.now().toString()
    });
    onClose();
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // In a real implementation, handle file upload here
    console.log('File dropped:', e.dataTransfer.files);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1E1E1E] rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-[#333]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#333]">
          <h2 className="text-2xl font-light text-white">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Product Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-[#0b0b0b] border border-[#333] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#C5A059] transition-colors"
              placeholder="e.g., Velvet Sofa"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full bg-[#0b0b0b] border border-[#333] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#C5A059] transition-colors resize-none"
              placeholder="Describe your product..."
            />
          </div>

          {/* Price & Compare At Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Price (CAD $) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                className="w-full bg-[#0b0b0b] border border-[#333] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#C5A059] transition-colors"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Compare At Price (CAD $)</label>
              <input
                type="number"
                name="compareAtPrice"
                value={formData.compareAtPrice}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full bg-[#0b0b0b] border border-[#333] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#C5A059] transition-colors"
                placeholder="Optional"
              />
            </div>
          </div>

          {/* Stock & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Total Stock (General) *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full bg-[#0b0b0b] border border-[#333] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#C5A059] transition-colors"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full bg-[#0b0b0b] border border-[#333] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#C5A059] transition-colors"
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Product Image</label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-[#C5A059] bg-[#C5A059]/5' 
                  : 'border-[#333] hover:border-[#C5A059]/50'
              }`}
            >
              {formData.image ? (
                <div className="space-y-4">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded-lg mx-auto border border-[#333]"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                    className="text-sm text-red-400 hover:text-red-300"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <FiUpload className="mx-auto text-gray-500" size={48} />
                  <div>
                    <p className="text-white mb-1">Drag and drop image here</p>
                    <p className="text-sm text-gray-500">or click to browse</p>
                  </div>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Or paste image URL"
                    className="w-full max-w-md mx-auto bg-[#0b0b0b] border border-[#333] text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#C5A059] text-sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Variants Section (SKU Based) */}
          <div className="border-t border-[#333] pt-6">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm text-gray-400">Products Variants (SKU)</label>
              <button
                type="button"
                onClick={addVariant}
                className="text-[#C5A059] text-sm hover:underline"
              >
                + Add SKU Variant
              </button>
            </div>
            
            {formData.variants && formData.variants.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-[#0b0b0b] text-gray-200 uppercase font-medium">
                            <tr>
                                <th className="px-4 py-3">SKU</th>
                                <th className="px-4 py-3">Size</th>
                                <th className="px-4 py-3">Color</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Stock</th>
                                <th className="px-4 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#333]">
                           {formData.variants.map((variant, index) => (
                               <tr key={index} className="hover:bg-[#1a1a1a]">
                                   <td className="px-4 py-2">
                                       <input 
                                          type="text" 
                                          value={variant.sku}
                                          onChange={(e) => handleVariantChange(index, 'sku', e.target.value)}
                                          placeholder="SKU-001"
                                          className="bg-transparent border-b border-[#333] focus:border-[#C5A059] outline-none w-24"
                                       />
                                   </td>
                                   <td className="px-4 py-2">
                                       <input 
                                          type="text" 
                                          value={variant.combination?.size || ''}
                                          onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                                          placeholder="M"
                                          className="bg-transparent border-b border-[#333] focus:border-[#C5A059] outline-none w-16"
                                       />
                                   </td>
                                   <td className="px-4 py-2">
                                       <input 
                                          type="text" 
                                          value={variant.combination?.color || ''}
                                          onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                                          placeholder="Red"
                                          className="bg-transparent border-b border-[#333] focus:border-[#C5A059] outline-none w-24"
                                       />
                                   </td>
                                   <td className="px-4 py-2">
                                       <input 
                                          type="number" 
                                          value={variant.price}
                                          onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                                          className="bg-transparent border-b border-[#333] focus:border-[#C5A059] outline-none w-20"
                                       />
                                   </td>
                                   <td className="px-4 py-2">
                                       <input 
                                          type="number" 
                                          value={variant.stock}
                                          onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
                                          className="bg-transparent border-b border-[#333] focus:border-[#C5A059] outline-none w-16"
                                       />
                                   </td>
                                   <td className="px-4 py-2">
                                       <button 
                                          type="button" 
                                          onClick={() => removeVariant(index)}
                                          className="text-red-400 hover:text-red-300"
                                       >
                                           <FiX />
                                       </button>
                                   </td>
                               </tr>
                           ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500 bg-[#0b0b0b] rounded-lg border border-[#333] border-dashed">
                    No variants added yet. Click "+ Add SKU Variant" to start.
                </div>
            )}
          </div>

          {/* New Collection Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isNewCollection"
              id="isNewCollection"
              checked={formData.isNewCollection}
              onChange={handleChange}
              className="w-5 h-5 bg-[#0b0b0b] border border-[#333] rounded focus:ring-2 focus:ring-[#C5A059] text-[#C5A059]"
            />
            <label htmlFor="isNewCollection" className="text-white cursor-pointer">
              Mark as New Collection
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#333]">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-[#333] text-gray-300 rounded-lg hover:bg-[#2a2a2a] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#C5A059] text-black font-medium rounded-lg hover:bg-[#d4b06a] transition-colors"
            >
              {product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
