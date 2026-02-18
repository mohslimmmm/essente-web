import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-essente-cream flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiShoppingBag size={40} className="text-gray-400" />
          </div>
          <h2 className="text-3xl font-elegant text-essente-charcoal mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Explore our collection to find something you love.
          </p>
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 px-8 py-3 bg-essente-charcoal text-white rounded-lg hover:bg-essente-charcoal/90 transition-colors"
          >
            Start Shopping <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-essente-cream py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-elegant text-essente-charcoal">Shopping Cart</h1>
          <span className="text-gray-600">{cart.reduce((acc, item) => acc + item.quantity, 0)} Items</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex gap-6 items-center"
              >
                <div className="w-24 h-24 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-essente-charcoal">
                      <Link to={`/product/${item.id}`} className="hover:text-[#C5A059] transition-colors">
                        {item.name}
                      </Link>
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove item"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-4">{item.category}</p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center border border-gray-200 rounded-md">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-50 text-gray-600"
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-50 text-gray-600"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>
                    <div className="text-lg font-medium text-essente-charcoal">
                      CAD ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-red-500 hover:text-red-600 underline"
            >
              Clear Shopping Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 sticky top-28">
              <h2 className="text-xl font-elegant text-essente-charcoal mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
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
                  <span>CAD ${(total * 0.13).toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-8">
                <div className="flex justify-between text-xl font-medium text-essente-charcoal">
                  <span>Total</span>
                  <span>CAD ${(total * 1.13).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-[#C5A059] text-white font-medium rounded-lg hover:bg-[#d4b06a] transition-colors shadow-lg shadow-[#C5A059]/20"
              >
                Proceed to Checkout
              </button>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Secure Checkout • Free Shipping • 30-Day Returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
