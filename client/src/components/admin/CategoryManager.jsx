import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiMove, FiEye, FiEyeOff, FiPackage } from 'react-icons/fi';

const INITIAL_CATEGORIES = [
  { id: '1', name: 'Living Room', slug: 'living', visible: true, order: 1, productCount: 9 },
  { id: '2', name: 'Bedroom', slug: 'bedroom', visible: true, order: 2, productCount: 7 },
  { id: '3', name: 'Office', slug: 'office', visible: true, order: 3, productCount: 6 },
  { id: '4', name: 'Accessories', slug: 'accessories', visible: true, order: 4, productCount: 8 }
];

const CategoryManager = () => {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', slug: '' });

  // Toggle visibility
  const handleToggleVisibility = (categoryId) => {
    setCategories(prev => prev.map(cat =>
      cat.id === categoryId ? { ...cat, visible: !cat.visible } : cat
    ));
  };

  // Delete category
  const handleDelete = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    }
  };

  // Open form for editing
  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, slug: category.slug });
    setIsFormOpen(true);
  };

  // Open form for new category
  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', slug: '' });
    setIsFormOpen(true);
  };

  // Save category
  const handleSave = (e) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories(prev => prev.map(cat =>
        cat.id === editingCategory.id 
          ? { ...cat, name: formData.name, slug: formData.slug }
          : cat
      ));
    } else {
      const newCategory = {
        id: Date.now().toString(),
        name: formData.name,
        slug: formData.slug,
        visible: true,
        order: categories.length + 1,
        productCount: 0
      };
      setCategories(prev => [...prev, newCategory]);
    }
    setIsFormOpen(false);
    setEditingCategory(null);
    setFormData({ name: '', slug: '' });
  };

  // Move category up/down
  const handleMove = (categoryId, direction) => {
    const index = categories.findIndex(cat => cat.id === categoryId);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === categories.length - 1)
    ) {
      return;
    }

    const newCategories = [...categories];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newCategories[index], newCategories[swapIndex]] = [newCategories[swapIndex], newCategories[index]];
    
    // Update order numbers
    newCategories.forEach((cat, idx) => {
      cat.order = idx + 1;
    });

    setCategories(newCategories);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-white font-light mb-2">Category Manager</h2>
          <p className="text-gray-400 text-sm">
            Organize your product categories • {categories.length} categories
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 bg-[#C5A059] text-black font-medium rounded-lg hover:bg-[#d4b06a] transition-colors"
        >
          <FiPlus size={20} />
          Add Category
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#1E1E1E] border border-[#333] p-4 rounded-lg">
          <div className="text-gray-500 text-sm mb-1">Total Categories</div>
          <div className="text-2xl text-white font-light">{categories.length}</div>
        </div>
        <div className="bg-[#1E1E1E] border border-[#333] p-4 rounded-lg">
          <div className="text-gray-500 text-sm mb-1">Visible</div>
          <div className="text-2xl text-green-400 font-light">
            {categories.filter(c => c.visible).length}
          </div>
        </div>
        <div className="bg-[#1E1E1E] border border-[#333] p-4 rounded-lg">
          <div className="text-gray-500 text-sm mb-1">Hidden</div>
          <div className="text-2xl text-gray-500 font-light">
            {categories.filter(c => !c.visible).length}
          </div>
        </div>
      </div>

      {/* Category List */}
      <div className="bg-[#1E1E1E] border border-[#333] rounded-lg overflow-hidden">
        <div className="divide-y divide-[#333]">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="p-4 hover:bg-[#1a1a1a] transition-colors flex items-center justify-between"
            >
              {/* Left: Drag Handle + Info */}
              <div className="flex items-center gap-4 flex-1">
                {/* Drag Handle */}
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => handleMove(category.id, 'up')}
                    disabled={index === 0}
                    className={`p-1 rounded transition-colors ${
                      index === 0 
                        ? 'text-gray-700 cursor-not-allowed' 
                        : 'text-gray-500 hover:text-[#C5A059] hover:bg-[#2a2a2a]'
                    }`}
                    title="Move up"
                  >
                    <FiMove size={16} className="rotate-180" />
                  </button>
                  <button
                    onClick={() => handleMove(category.id, 'down')}
                    disabled={index === categories.length - 1}
                    className={`p-1 rounded transition-colors ${
                      index === categories.length - 1
                        ? 'text-gray-700 cursor-not-allowed'
                        : 'text-gray-500 hover:text-[#C5A059] hover:bg-[#2a2a2a]'
                    }`}
                    title="Move down"
                  >
                    <FiMove size={16} />
                  </button>
                </div>

                {/* Category Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-medium">{category.name}</h3>
                    <span className="text-xs text-gray-500 font-mono">/{category.slug}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FiPackage size={14} />
                    <span>{category.productCount} products</span>
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                {/* Visibility Toggle */}
                <button
                  onClick={() => handleToggleVisibility(category.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    category.visible
                      ? 'text-green-400 hover:bg-green-400/10'
                      : 'text-gray-600 hover:bg-gray-600/10'
                  }`}
                  title={category.visible ? 'Visible on site' : 'Hidden from site'}
                >
                  {category.visible ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                </button>

                {/* Edit */}
                <button
                  onClick={() => handleEdit(category)}
                  className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors text-gray-400 hover:text-[#C5A059]"
                  title="Edit Category"
                >
                  <FiEdit2 size={18} />
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors text-gray-400 hover:text-red-400"
                  title="Delete Category"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No categories yet. Click "Add Category" to get started.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1E1E1E] rounded-lg w-full max-w-md border border-[#333]">
            <div className="flex items-center justify-between p-6 border-b border-[#333]">
              <h3 className="text-xl font-light text-white">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Category Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    name: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                  }))}
                  required
                  className="w-full bg-[#0b0b0b] border border-[#333] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#C5A059] transition-colors"
                  placeholder="e.g., Living Room"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">URL Slug *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  required
                  className="w-full bg-[#0b0b0b] border border-[#333] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#C5A059] transition-colors font-mono text-sm"
                  placeholder="e.g., living-room"
                />
                <p className="text-xs text-gray-600 mt-1">Used in URLs: /collection/{formData.slug}</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#333]">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-6 py-3 border border-[#333] text-gray-300 rounded-lg hover:bg-[#2a2a2a] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C5A059] text-black font-medium rounded-lg hover:bg-[#d4b06a] transition-colors"
                >
                  {editingCategory ? 'Update' : 'Add'} Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;
