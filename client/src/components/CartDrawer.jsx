import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, cartTotal, removeFromCart, addToCart, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay layer */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col h-full">
          
          {/* Header Panel */}
          <div className="px-4 py-6 sm:px-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-medium text-brand-dark flex items-center space-x-2">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span>Shopping Bag</span>
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-brand-dark p-1 cursor-pointer">
              <X size={24} />
            </button>
          </div>

          {/* Product Items Streaming Node */}
          <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <p className="text-sm font-light text-gray-400 uppercase tracking-widest">Your bag is empty</p>
                <button onClick={onClose} className="text-xs font-semibold text-blue-600 uppercase tracking-wider hover:underline cursor-pointer">
                  Continue Shopping &rarr;
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex py-4 border-b border-gray-50 last:border-0">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-50">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-sm font-medium text-brand-dark">
                          <h3 className="line-clamp-1">{item.name}</h3>
                          <p className="ml-4">${(item.price * item.qty).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-xs text-gray-400 uppercase tracking-wider">{item.category}</p>
                      </div>
                      
                      <div className="flex flex-1 items-end justify-between text-xs">
                        {/* Incremental Adjustment Pods */}
                        <div className="flex items-center border border-gray-200 rounded bg-white">
                          <button onClick={() => removeFromCart(item._id)} className="px-2 py-1 text-gray-500 hover:bg-gray-50 font-bold cursor-pointer">-</button>
                          <span className="px-2 font-medium text-brand-dark">{item.qty}</span>
                          <button onClick={() => addToCart(item)} className="px-2 py-1 text-gray-500 hover:bg-gray-50 font-bold cursor-pointer">+</button>
                        </div>

                        {/* Complete Destruction Node */}
                        <button onClick={() => {
                          // Complete programmatic eviction bypass layout rule
                          for(let i=0; i<item.qty; i++) removeFromCart(item._id);
                        }} className="flex items-center text-red-500 hover:text-red-600 font-medium cursor-pointer">
                          <Trash2 size={14} className="mr-1" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Aggregated Totals Footer Panel */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 px-4 py-6 sm:px-6 bg-gray-50">
              <div className="flex justify-between text-base font-semibold text-brand-dark mb-4">
                <p>Subtotal</p>
                <p>${cartTotal.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-xs text-gray-400">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <button className="w-full flex items-center justify-center rounded bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-xs hover:bg-blue-700 transition-colors uppercase tracking-wider cursor-pointer">
                  Proceed To Checkout
                </button>
              </div>
              <div className="mt-3 text-center">
                <button onClick={clearCart} className="text-[11px] font-bold text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors cursor-pointer">
                  Clear Entire Bag
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}