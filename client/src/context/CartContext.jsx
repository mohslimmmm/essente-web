import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the Context
const CartContext = createContext();

// Create the Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Calculate total whenever cart changes
  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(newTotal);
  }, [cart]);

  // Add item to cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    const quantityToAdd = product.quantity || 1;
    
    if (existingItem) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantityToAdd } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: quantityToAdd }]);
    }
    setIsCartOpen(true); // Open cart when adding item
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Clear cart
  const clearCart = () => setCart([]);

  // Fly-to-Cart Animation State
  const [isAnimationActive, setIsAnimationActive] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const triggerFlyAnimation = () => {
    setIsAnimationActive(true);
    setTimeout(() => setIsAnimationActive(false), 1000); // Reset after 1s
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      total, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      isAnimationActive,
      triggerFlyAnimation,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => useContext(CartContext);
