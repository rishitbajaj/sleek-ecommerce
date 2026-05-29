import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { X, Trash2, ShoppingBag, User as UserIcon } from 'lucide-react';

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Safe default object fallbacks from Context Hook
  const { 
    cartItems = [], 
    itemsCount = 0, 
    subtotalPrice = 0, 
    updateQty, 
    removeFromCart 
  } = useCart() || {};
  
  const { user, logout } = useAuth() || {};
  const navigate = useNavigate();

  return (
    <>
      {/* --- SILK MINIMALIST NAVIGATION HEADER --- */}
      <nav className="w-full h-20 bg-[#FBFBFA]/90 backdrop-blur-md border-b border-zinc-100 sticky top-0 z-50 px-6 sm:px-12 flex items-center justify-between select-none">
        
        {/* Brand Core Logo */}
        <Link to="/" className="flex items-center space-x-2 tracking-tight group">
          <span className="text-lg font-bold tracking-[-0.03em] text-[#1A1A1A]">
            sleek<span className="font-light text-zinc-400 group-hover:text-[#1A1A1A] transition-colors">studio</span>
          </span>
        </Link>

        {/* Global Navigation and Action Portal */}
        <div className="flex items-center space-x-8 text-xs font-medium tracking-wide text-zinc-600">
          <Link to="/" className="hover:text-black transition-colors">Shop All</Link>
          
          {user ? (
            <div className="flex items-center space-x-6">
              <Link to="/profile" className="hover:text-black transition-colors flex items-center space-x-1">
                <UserIcon size={14} />
                <span className="hidden sm:inline">Account</span>
              </Link>
              <button 
                onClick={() => { logout?.(); navigate('/'); }} 
                className="text-zinc-400 hover:text-black transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:text-black transition-colors text-zinc-500">
              Sign In
            </Link>
          )}

          {/* Luxury Text Bag Button with Direct Visual Anchor */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#1A1A1A] text-white rounded-full hover:bg-zinc-800 transition-all duration-200 cursor-pointer text-[11px]"
          >
            <ShoppingBag size={13} strokeWidth={2.5} />
            <span className="font-semibold tracking-wider">Bag ({itemsCount})</span>
          </button>
        </div>
      </nav>

      {/* --- LUXURY SLIDING SHEET CANVAS OVERLAY --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[99999] overflow-hidden">
          {/* Backdrop Blur Dimmer Mask */}
          <div 
            className="absolute inset-0 bg-black/25 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex">
            {/* Pure Flat Canvas Panel Card Container */}
            <div className="w-screen max-w-md bg-white text-[#1A1A1A] flex flex-col justify-between animate-luxury-drawer relative shadow-2xl border-l border-zinc-100">
              
              {/* Sliding Card Sheet Header */}
              <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold tracking-tight">Shopping Bag</h2>
                  <p className="text-[11px] text-zinc-400 mt-0.5">{itemsCount} items currently curated</p>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-zinc-400 hover:text-black hover:bg-zinc-50 rounded-full transition-all cursor-pointer"
                >
                  <X size={16} strokeWidth={2} />
                </button>
              </div>

              {/* Scrollable Dynamic Product Manifest Feed */}
              <div className="flex-1 overflow-y-auto p-6 divide-y divide-zinc-100 no-scrollbar">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-3 py-24 text-center">
                    <div className="p-4 bg-zinc-50 rounded-full text-zinc-300">
                      <ShoppingBag size={24} />
                    </div>
                    <p className="font-medium text-zinc-400 text-sm">Your bag is empty.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-xs text-[#1A1A1A] font-bold underline cursor-pointer"
                    >
                      Continue browsing
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => {
                    if (!item) return null;
                    return (
                      <div key={item._id} className="flex items-start space-x-4 py-4 first:pt-0 last:pb-0 group">
                        {/* Render Thumbnail Image Frame Layout safely */}
                        <div className="w-16 h-20 bg-zinc-50 shrink-0 overflow-hidden rounded-md border border-zinc-100">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        </div>

                        {/* Interactive Metrics Specs info block */}
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="space-y-0.5">
                            <p className="text-xs font-semibold tracking-tight text-zinc-900 truncate">{item.name}</p>
                            <p className="text-[11px] text-zinc-400">Unit: ${Number(item.price || 0).toFixed(2)}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Fluid Rounded Touch Counter Controller */}
                            <div className="flex items-center border border-zinc-200 rounded-full text-xs bg-zinc-50 overflow-hidden">
                              <button 
                                onClick={() => updateQty?.(item._id, item.qty - 1)}
                                className="w-7 h-7 hover:bg-zinc-200 text-zinc-500 transition-colors cursor-pointer flex items-center justify-center font-bold"
                              >
                                -
                              </button>
                              <span className="w-6 text-center font-medium text-zinc-800 select-none text-[11px]">{item.qty}</span>
                              <button 
                                onClick={() => updateQty?.(item._id, item.qty + 1)}
                                className="w-7 h-7 hover:bg-zinc-200 text-zinc-500 transition-colors cursor-pointer flex items-center justify-center font-bold"
                              >
                                +
                              </button>
                            </div>

                            {/* Row Item Total Price node execution mapping */}
                            <span className="text-xs font-semibold text-zinc-900">
                              ${((item.qty || 1) * Number(item.price || 0)).toFixed(2)}
                            </span>

                            <button 
                              onClick={() => removeFromCart?.(item._id, item.name)}
                              className="text-zinc-300 hover:text-red-500 transition-colors cursor-pointer p-1.5 rounded-full hover:bg-red-50"
                            >
                              <Trash2 size={12} strokeWidth={2} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Lower Cart Action Call Settlement Summary Footer Drawer Block */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-zinc-100 bg-zinc-50/50 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-medium text-zinc-500">Subtotal</span>
                    <span className="text-xl font-bold tracking-tight text-[#1A1A1A]">
                      ${Number(subtotalPrice || 0).toFixed(2)}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/checkout');
                    }}
                    className="w-full py-3.5 bg-[#1A1A1A] text-white font-semibold text-xs tracking-wide rounded-xl hover:bg-zinc-800 transition-all duration-200 cursor-pointer text-center block shadow-sm"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}