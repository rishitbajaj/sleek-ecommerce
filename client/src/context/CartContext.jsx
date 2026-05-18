import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Read state out of client storage models cleanly
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('vElo_cart');
    return localData ? JSON.parse(localData) : [];
  });

  // Sync state mutations to physical cache targets automatically
  useEffect(() => {
    localStorage.setItem('vElo_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Action: Insert item or cascade target quantification values
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item._id === product._id);
      if (itemExists) {
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevItems, { ...product, qty: 1 }];
    });
  };

  // Action: De-increment or eliminate single structural collection target
  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const targetItem = prevItems.find((item) => item._id === id);
      if (!targetItem) return prevItems;

      if (targetItem.qty === 1) {
        return prevItems.filter((item) => item._id !== id);
      } else {
        return prevItems.map((item) =>
          item._id === id ? { ...item, qty: item.qty - 1 } : item
        );
      }
    });
  };

  // Action: Flush state metrics completely
  const clearCart = () => setCartItems([]);

  // Compute aggregated state variables
  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, cartTotal, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}