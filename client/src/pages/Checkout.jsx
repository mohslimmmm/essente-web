import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { FiCheckCircle, FiCreditCard, FiTruck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import PaymentForm from '../components/PaymentForm';

// Stripe Disabled
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// const stripePromise = loadStripe('...');

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [guestEmail, setGuestEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  
  // No longer needed separate state for paymentMethod as we only support Card via Stripe here for now
  // const [paymentMethod, setPaymentMethod] = useState('Card'); 
  
  const [error, setError] = useState('');

  const shippingPrice = 0; // Free shipping
  const taxPrice = total * 0.13;
  const totalPrice = total + taxPrice + shippingPrice;

  const handleInputChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentSuccess = async (paymentIntent) => {
      // Order is already created in PaymentForm, just clear cart and redirect
      clearCart();
      navigate('/order-confirmation');
  };

  const handlePaymentError = (errMsg) => {
      setError(errMsg);
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-essente-cream py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-elegant text-essente-charcoal mb-8 text-center">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Error display handled inside PaymentForm for better context */}
            <div className="space-y-8">
              
              {/* Contact Info (For Guest) */}
              {!user && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-8 rounded-lg shadow-sm border border-gray-100"
                >
                   <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-essente-charcoal text-white flex items-center justify-center">
                      <FiCheckCircle size={20} />
                    </div>
                    <h2 className="text-xl font-medium text-essente-charcoal">Contact Information</h2>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none transition-colors"
                      placeholder="email@example.com"
                    />
                    <p className="text-xs text-gray-500 mt-2">We will send your order confirmation here.</p>
                  </div>
                </motion.div>
              )}

              {/* Shipping Address */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-essente-charcoal text-white flex items-center justify-center">
                    <FiTruck size={20} />
                  </div>
                  <h2 className="text-xl font-medium text-essente-charcoal">Shipping Address</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={shippingAddress.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none transition-colors"
                      placeholder="123 Main St"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none transition-colors"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingAddress.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none transition-colors"
                      placeholder="10001"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none transition-colors"
                      placeholder="United States"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Payment Method - Stripe Elements */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-essente-charcoal text-white flex items-center justify-center">
                    <FiCreditCard size={20} />
                  </div>
                  <h2 className="text-xl font-medium text-essente-charcoal">Payment Method</h2>
                </div>

                <div className="space-y-4">
                  {/* We wrap ONLY the payment form part or whole page? Wrapping here allows access to elements */}
                  {/* Mock Payment Form - No Elements wrapper needed */}
                  <PaymentForm 
                    shippingAddress={shippingAddress} 
                    cart={cart}
                    itemsPrice={total}
                    taxPrice={taxPrice}
                    shippingPrice={shippingPrice}
                    totalPrice={totalPrice}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    email={user ? user.email : guestEmail}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 sticky top-28">
              <h2 className="text-xl font-elegant text-essente-charcoal mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-essente-charcoal">{item.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm text-gray-600">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-100 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>CAD ${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax</span>
                  <span>CAD ${taxPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between text-xl font-medium text-essente-charcoal">
                  <span>Total</span>
                  <span>CAD ${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
