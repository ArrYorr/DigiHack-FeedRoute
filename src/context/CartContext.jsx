import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // --- 1. NEW: Calculate Total Automatically ---
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      
      // --- 2. FIX: Ensure item has an image ---
      // If product has no 'imageUrl' but has a 'gallery', use the first image from gallery
      const imageToUse = product.imageUrl || (product.gallery && product.gallery[0]) || null;

      return [...prevItems, { ...product, imageUrl: imageToUse, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // --- 3. FIX: Renamed function to match CartPage (updateItemQuantity -> updateQuantity) ---
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity, // Now matches what CartPage asks for
    cartTotal,      // Now available for CartPage to read
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};