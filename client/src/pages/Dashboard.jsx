import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/api/v1/orders/myorders');
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders', err);
        setError('Failed to load orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-essente-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Client Dashboard
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Welcome back, {user?.name}
              </p>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Full name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user?.name}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user?.email}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                 <dt className="text-sm font-medium text-gray-500">
                  Account Type
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user?.role}
                </dd>
              </div>
               {/* Order History */}
              <div className="bg-white px-4 py-5 sm:px-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Recent Orders</h4>
                {loading ? (
                  <div className="text-center py-4">Loading orders...</div>
                ) : error ? (
                  <div className="text-red-500 text-center py-4">{error}</div>
                ) : orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order._id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center bg-gray-50 hover:bg-white transition-colors">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Order #{order._id.substring(0, 8)}</p>
                          <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-sm font-bold text-[#C5A059]">${order.totalPrice.toFixed(2)}</p>
                           <span className={`text-xs px-2 py-1 rounded-full ${
                             order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                           }`}>
                             {order.isDelivered ? 'Delivered' : 'Pending'}
                           </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border border-dashed border-gray-300 rounded-md p-8 text-center text-gray-500">
                    No orders placed yet.
                  </div>
                )}
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
