import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight, FiPercent, FiDollarSign, FiCopy } from 'react-icons/fi';

const INITIAL_PROMOTIONS = [
  { id: '1', code: 'WELCOME10', type: 'percentage', value: 10, active: true, createdAt: '2026-02-01' },
  { id: '2', code: 'FREESHIP', type: 'fixed', value: 15, active: true, createdAt: '2026-02-05' },
  { id: '3', code: 'BLACKFRIDAY', type: 'percentage', value: 25, active: false, createdAt: '2025-11-20' }
];

const INITIAL_BANNER = {
  text: 'Free Shipping on Orders Over $100 • Limited Time Only',
  active: true
};

const PromotionsManager = () => {
  const [promotions, setPromotions] = useState(INITIAL_PROMOTIONS);
  const [flashBanner, setFlashBanner] = useState(INITIAL_BANNER);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage',
    value: ''
  });

  // Toggle promotion active status
  const handleToggleActive = (promoId) => {
    setPromotions(prev => prev.map(promo =>
      promo.id === promoId ? { ...promo, active: !promo.active } : promo
    ));
  };

  // Delete promotion
  const handleDelete = (promoId) => {
    if (window.confirm('Are you sure you want to delete this promotion?')) {
      setPromotions(prev => prev.filter(promo => promo.id !== promoId));
    }
  };

  // Duplicate promotion
  const handleDuplicate = (promo) => {
    const newPromo = {
      ...promo,
      id: Date.now().toString(),
      code: `${promo.code}_COPY`,
      active: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setPromotions(prev => [...prev, newPromo]);
  };

  // Open form for editing
  const handleEdit = (promo) => {
    setEditingPromo(promo);
    setFormData({
      code: promo.code,
      type: promo.type,
      value: promo.value.toString()
    });
    setIsFormOpen(true);
  };

  // Open form for new promotion
  const handleAdd = () => {
    setEditingPromo(null);
    setFormData({ code: '', type: 'percentage', value: '' });
    setIsFormOpen(true);
  };

  // Save promotion
  const handleSave = (e) => {
    e.preventDefault();
    if (editingPromo) {
      setPromotions(prev => prev.map(promo =>
        promo.id === editingPromo.id
          ? { ...promo, code: formData.code, type: formData.type, value: parseFloat(formData.value) }
          : promo
      ));
    } else {
      const newPromo = {
        id: Date.now().toString(),
        code: formData.code.toUpperCase(),
        type: formData.type,
        value: parseFloat(formData.value),
        active: true,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setPromotions(prev => [...prev, newPromo]);
    }
    setIsFormOpen(false);
    setEditingPromo(null);
    setFormData({ code: '', type: 'percentage', value: '' });
  };

  // Update flash banner
  const handleBannerUpdate = () => {
    // In real app, this would save to backend
    alert('Flash banner updated successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-white font-light mb-2">Promotions Engine</h2>
          <p className="text-gray-400 text-sm">
            Manage coupons and marketing campaigns • {promotions.filter(p => p.active).length} active
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 bg-[#C5A059] text-black font-medium rounded-lg hover:bg-[#d4b06a] transition-colors"
        >
          <FiPlus size={20} />
          Create Promotion
        </button>
      </div>

      {/* Flash Banner Manager */}
      <div className="bg-[#1E1E1E] border border-[#333] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg text-white font-medium mb-1">Flash Banner</h3>
            <p className="text-sm text-gray-500">Update the announcement bar on your website</p>
          </div>
          <button
            onClick={() => setFlashBanner(prev => ({ ...prev, active: !prev.active }))}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              flashBanner.active
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : 'bg-gray-700/10 text-gray-500 border border-gray-700/20'
            }`}
          >
            {flashBanner.active ? <FiToggleRight size={20} /> : <FiToggleLeft size={20} />}
            {flashBanner.active ? 'Active' : 'Inactive'}
          </button>
        </div>

        <div className="space-y-3">
          <textarea
            value={flashBanner.text}
            onChange={(e) => setFlashBanner(prev => ({ ...prev, text: e.target.value }))}
            rows={2}
            className="w-full bg-[#0b0b0b] border border-[#333] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#C5A059] transition-colors resize-none"
            placeholder="Enter your flash banner message..."
          />
          <button
            onClick={handleBannerUpdate}
            className="px-6 py-2 bg-[#C5A059] text-black font-medium rounded-lg hover:bg-[#d4b06a] transition-colors text-sm"
          >
            Update Banner
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#1E1E1E] border border-[#333] p-4 rounded-lg">
          <div className="text-gray-500 text-sm mb-1">Total Promotions</div>
          <div className="text-2xl text-white font-light">{promotions.length}</div>
        </div>
        <div className="bg-[#1E1E1E] border border-[#333] p-4 rounded-lg">
          <div className="text-gray-500 text-sm mb-1">Active</div>
          <div className="text-2xl text-green-400 font-light">
            {promotions.filter(p => p.active).length}
          </div>
        </div>
        <div className="bg-[#1E1E1E] border border-[#333] p-4 rounded-lg">
          <div className="text-gray-500 text-sm mb-1">Inactive</div>
          <div className="text-2xl text-gray-500 font-light">
            {promotions.filter(p => !p.active).length}
          </div>
        </div>
      </div>

      {/* Promotions List */}
      <div className="bg-[#1E1E1E] border border-[#333] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#333]">
                <th className="text-left py-4 px-4 text-xs uppercase tracking-wider text-gray-500 font-medium">Code</th>
                <th className="text-left py-4 px-4 text-xs uppercase tracking-wider text-gray-500 font-medium">Type</th>
                <th className="text-left py-4 px-4 text-xs uppercase tracking-wider text-gray-500 font-medium">Value</th>
                <th className="text-left py-4 px-4 text-xs uppercase tracking-wider text-gray-500 font-medium">Status</th>
                <th className="text-left py-4 px-4 text-xs uppercase tracking-wider text-gray-500 font-medium">Created</th>
                <th className="text-right py-4 px-4 text-xs uppercase tracking-wider text-gray-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promo) => (
                <tr key={promo.id} className="border-b border-[#333] hover:bg-[#1a1a1a] transition-colors">
                  {/* Code */}
                  <td className="py-4 px-4">
                    <span className="font-mono text-[#C5A059] font-medium">{promo.code}</span>
                  </td>

                  {/* Type */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {promo.type === 'percentage' ? (
                        <>
                          <FiPercent size={16} className="text-blue-400" />
                          <span className="text-white">Percentage</span>
                        </>
                      ) : (
                        <>
                          <FiDollarSign size={16} className="text-green-400" />
                          <span className="text-white">Fixed Amount</span>
                        </>
                      )}
                    </div>
                  </td>

                  {/* Value */}
                  <td className="py-4 px-4">
                    <span className="text-white font-medium">
                      {promo.type === 'percentage' ? `${promo.value}%` : `CAD $${promo.value}`}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleToggleActive(promo.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        promo.active
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-gray-700/10 text-gray-500'
                      }`}
                    >
                      {promo.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>

                  {/* Created */}
                  <td className="py-4 px-4">
                    <span className="text-gray-500 text-sm">{promo.createdAt}</span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDuplicate(promo)}
                        className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors text-gray-400 hover:text-blue-400"
                        title="Duplicate"
                      >
                        <FiCopy size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(promo)}
                        className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors text-gray-400 hover:text-[#C5A059]"
                        title="Edit"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(promo.id)}
                        className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors text-gray-400 hover:text-red-400"
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {promotions.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No promotions yet. Click "Create Promotion" to get started.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1E1E1E] rounded-lg w-full max-w-md border border-[#333]">
            <div className="flex items-center justify-between p-6 border-b border-[#333]">
              <h3 className="text-xl font-light text-white">
                {editingPromo ? 'Edit Promotion' : 'Create New Promotion'}
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
                <label className="block text-sm text-gray-400 mb-2">Coupon Code *</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                  required
                  className="w-full bg-[#0b0b0b] border border-[#333] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#C5A059] transition-colors font-mono uppercase"
                  placeholder="e.g., SUMMER2026"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Discount Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full bg-[#0b0b0b] border border-[#333] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#C5A059] transition-colors"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount (CAD $)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Value * {formData.type === 'percentage' ? '(%)' : '(CAD $)'}
                </label>
                <input
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                  required
                  min="0"
                  step={formData.type === 'percentage' ? '1' : '0.01'}
                  max={formData.type === 'percentage' ? '100' : undefined}
                  className="w-full bg-[#0b0b0b] border border-[#333] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#C5A059] transition-colors"
                  placeholder={formData.type === 'percentage' ? 'e.g., 20' : 'e.g., 15.00'}
                />
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
                  {editingPromo ? 'Update' : 'Create'} Promotion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionsManager;
