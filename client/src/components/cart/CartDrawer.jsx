import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { FiX, FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { isCartOpen, closeCart, cart, updateQuantity, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-[1001] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[1002] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-elegant text-essente-charcoal flex items-center gap-2">
                <FiShoppingBag /> Shopping Cart
                <span className="text-sm font-sans text-gray-500 ml-2">
                  ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)
                </span>
              </h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                    <FiShoppingBag size={32} className="text-gray-300" />
                  </div>
                  <p className="text-gray-500">Your cart is empty</p>
                  <button
                    onClick={() => {
                        closeCart();
                        navigate('/collection');
                    }}
                    className="text-[#C5A059] font-medium hover:underline"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex gap-4 border-b border-gray-50 pb-6 last:border-0"
                  >
                    <div className="w-24 h-24 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium text-essente-charcoal line-clamp-1">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{item.category}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-200 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-gray-50 text-gray-600 transition-colors"
                          >
                            <FiMinus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-gray-50 text-gray-600 transition-colors"
                          >
                            <FiPlus size={12} />
                          </button>
                        </div>
                        <span className="font-medium text-essente-charcoal">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-[#C5A059] text-white font-medium rounded-lg hover:bg-[#A08442] transition-colors shadow-lg shadow-[#C5A059]/20 flex items-center justify-center gap-2 group"
                >
                  Checkout
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
