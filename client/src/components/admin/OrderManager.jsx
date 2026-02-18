import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FiCheck, FiX, FiTruck, FiEye, FiClock } from 'react-icons/fi';

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null); // For modal/details view

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/api/v1/orders');
      setOrders(data);
    } catch (err) {
      setError('Failed to load orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markAsDelivered = async (id) => {
    try {
      await api.put(`/api/v1/orders/${id}/deliver`);
      fetchOrders(); // Refresh list
    } catch (err) {
      console.error(err);
      alert('Failed to mark as delivered');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return <div className="text-white">Loading orders...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-[#1E1E1E] border border-[#333] rounded-lg p-6 shadow-xl">
      <h2 className="text-2xl text-white font-light mb-6">Orders Management</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#333] text-gray-400 text-sm uppercase tracking-wider">
              <th className="pb-4">ID</th>
              <th className="pb-4">User</th>
              <th className="pb-4">Date</th>
              <th className="pb-4">Total</th>
              <th className="pb-4">Paid</th>
              <th className="pb-4">Delivered</th>
              <th className="pb-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#333]">
            {orders.map((order) => (
              <tr key={order._id} className="text-gray-300 hover:bg-white/5 transition-colors">
                <td className="py-4 text-xs font-mono text-gray-500">{order._id.substring(0, 10)}...</td>
                <td className="py-4">{order.user?.name || 'Deleted User'}</td>
                <td className="py-4">{formatDate(order.createdAt)}</td>
                <td className="py-4 text-[#C5A059]">${order.totalPrice.toFixed(2)}</td>
                <td className="py-4">
                  {order.isPaid ? (
                    <span className="text-green-500 flex items-center gap-1 text-xs uppercase border border-green-500/20 bg-green-500/10 px-2 py-1 rounded w-fit">
                      <FiCheck size={12} /> {formatDate(order.paidAt)}
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center gap-1 text-xs uppercase border border-red-500/20 bg-red-500/10 px-2 py-1 rounded w-fit">
                        <FiX size={12} /> Not Paid
                    </span>
                  )}
                </td>
                <td className="py-4">
                  {order.isDelivered ? (
                    <span className="text-green-500 flex items-center gap-1 text-xs uppercase border border-green-500/20 bg-green-500/10 px-2 py-1 rounded w-fit">
                      <FiCheck size={12} /> {formatDate(order.deliveredAt)}
                    </span>
                  ) : (
                    <span className="text-yellow-500 flex items-center gap-1 text-xs uppercase border border-yellow-500/20 bg-yellow-500/10 px-2 py-1 rounded w-fit">
                       <FiClock size={12} /> Pending
                    </span>
                  )}
                </td>
                <td className="py-4">
                  {!order.isDelivered && (
                    <button 
                      onClick={() => markAsDelivered(order._id)}
                      className="bg-[#C5A059]/10 text-[#C5A059] hover:bg-[#C5A059] hover:text-white border border-[#C5A059]/30 px-3 py-1 rounded text-xs transition-colors uppercase tracking-wider"
                    >
                      Mark Delivered
                    </button>
                  )}
                  {/* Future: Add View Details button */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {orders.length === 0 && (
        <div className="text-center py-10 text-gray-500">
           <FiTruck className="mx-auto text-gray-600 mb-2" size={32} />
           <p>No orders found.</p>
        </div>
      )}
    </div>
  );
};

export default OrderManager;
