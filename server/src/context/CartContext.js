import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context
const CartContext = createContext();

// 2. Create the Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // The function to add an item
  const addToCart = (product) => {
    // Check if item is already in cart to increase quantity instead of duplicates
    const existingItem = cart.find((item) => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // The value we are "broadcasting" to the whole app
  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 3. Create a custom hook to make it easy to use
export const useCart = () => useContext(CartContext);