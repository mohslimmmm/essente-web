import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

const ProductTable = ({ products, onEdit, onDelete, onUpdateField }) => {
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleCellClick = (productId, field, currentValue) => {
    setEditingCell({ productId, field });
    setEditValue(currentValue);
  };

  const handleSave = () => {
    if (editingCell) {
      onUpdateField(editingCell.productId, editingCell.field, editValue);
      setEditingCell(null);
      setEditValue('');
    }
  };

  const handleCancel = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const isEditing = (productId, field) => {
    return editingCell?.productId === productId && editingCell?.field === field;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#333]">
            <th className="text-left py-4 px-4 text-xs uppercase tracking-wider text-gray-500 font-medium">Image</th>
            <th className="text-left py-4 px-4 text-xs uppercase tracking-wider text-gray-500 font-medium">Title</th>
            <th className="text-left py-4 px-4 text-xs uppercase tracking-wider text-gray-500 font-medium">Price</th>
            <th className="text-left py-4 px-4 text-xs uppercase tracking-wider text-gray-500 font-medium">Stock</th>
            <th className="text-left py-4 px-4 text-xs uppercase tracking-wider text-gray-500 font-medium">Category</th>
            <th className="text-right py-4 px-4 text-xs uppercase tracking-wider text-gray-500 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-[#333] hover:bg-[#1a1a1a] transition-colors">
              {/* Image */}
              <td className="py-4 px-4">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-12 h-12 object-cover rounded-lg border border-[#333]"
                />
              </td>

              {/* Title */}
              <td className="py-4 px-4">
                <div className="text-white font-medium">{product.title}</div>
                <div className="text-gray-500 text-sm truncate max-w-xs">{product.description}</div>
              </td>

              {/* Price - Inline Editable */}
              <td className="py-4 px-4">
                {isEditing(product.id, 'price') ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-24 bg-[#0b0b0b] border border-[#C5A059] text-white px-2 py-1 rounded focus:outline-none"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSave();
                        if (e.key === 'Escape') handleCancel();
                      }}
                    />
                    <button onClick={handleSave} className="text-green-500 hover:text-green-400">
                      <FiCheck size={16} />
                    </button>
                    <button onClick={handleCancel} className="text-red-500 hover:text-red-400">
                      <FiX size={16} />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => handleCellClick(product.id, 'price', product.price)}
                    className="cursor-pointer hover:bg-[#2a2a2a] px-2 py-1 rounded transition-colors"
                  >
                    <span className="text-[#C5A059] font-medium">CAD ${product.price}</span>
                    {product.compareAtPrice && (
                      <span className="text-gray-500 text-sm line-through ml-2">
                        ${product.compareAtPrice}
                      </span>
                    )}
                  </div>
                )}
              </td>

              {/* Stock - Inline Editable */}
              <td className="py-4 px-4">
                {isEditing(product.id, 'stock') ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-20 bg-[#0b0b0b] border border-[#C5A059] text-white px-2 py-1 rounded focus:outline-none"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSave();
                        if (e.key === 'Escape') handleCancel();
                      }}
                    />
                    <button onClick={handleSave} className="text-green-500 hover:text-green-400">
                      <FiCheck size={16} />
                    </button>
                    <button onClick={handleCancel} className="text-red-500 hover:text-red-400">
                      <FiX size={16} />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => handleCellClick(product.id, 'stock', product.stock)}
                    className="cursor-pointer hover:bg-[#2a2a2a] px-2 py-1 rounded transition-colors"
                  >
                    <span className={`font-medium ${product.stock < 10 ? 'text-red-400' : 'text-white'}`}>
                      {product.stock}
                    </span>
                  </div>
                )}
              </td>

              {/* Category */}
              <td className="py-4 px-4">
                <span className="px-3 py-1 bg-[#C5A059]/10 text-[#C5A059] rounded-full text-sm">
                  {product.category}
                </span>
              </td>

              {/* Actions */}
              <td className="py-4 px-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors text-gray-400 hover:text-[#C5A059]"
                    title="Edit Product"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors text-gray-400 hover:text-red-400"
                    title="Delete Product"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {products.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No products found. Click "Add Product" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
