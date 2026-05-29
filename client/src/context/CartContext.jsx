import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('sleek_cart_matrix');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem('sleek_cart_matrix', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existItem = prevItems.find((item) => item._id === product._id);
      if (existItem) {
        addToast(`Incremented quantity for [ ${product.name} ].`, 'cart');
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      addToast(`Allocated [ ${product.name} ] to your bag.`, 'cart');
      return [...prevItems, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id, name) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    if (name) addToast(`Removed [ ${name} ] from staging.`, 'alert');
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      const item = cartItems.find(i => i._id === id);
      removeFromCart(id, item?.name);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? { ...item, qty: Number(qty) } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('sleek_cart_matrix');
  };

  const itemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotalPrice = cartItems.reduce((acc, item) => acc + (Number(item.price) * item.qty), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        itemsCount,
        subtotalPrice,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);