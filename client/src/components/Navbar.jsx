import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, User, LogOut, X, Plus, Minus, Trash2 } from 'lucide-react';

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, itemsCount, subtotalPrice, updateQty, removeFromCart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* --- PRIMARY FIXED HEADER NAVIGATION --- */}
      <nav className="w-full h-16 bg-white border-b border-gray-100 sticky top-0 z-50 px-4 sm:px-8 flex items-center justify-between">
        {/* Brand Logo Anchor */}
        <Link to="/" className="text-sm font-black uppercase tracking-[0.25em] text-slate-900 hover:opacity-80 transition-opacity">
          Sleek // Studio
        </Link>

        {/* Global Navigation Controls */}
        <div className="flex items-center space-x-6">
          {user ? (
            <div className="flex items-center space-x-6">
              {/* Profile Route Link Button */}
              <Link to="/profile" className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-slate-900 transition-colors flex items-center space-x-1.5">
                <User size={14} />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              
              {/* System Logout Button Trigger */}
              <button 
                onClick={handleLogoutClick}
                className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-red-500 transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Exit</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-slate-900 transition-colors flex items-center space-x-1.5">
              <User size={14} />
              <span>Login</span>
            </Link>
          )}

          {/* Interactive Core Cart Indicator Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-slate-800 hover:text-blue-600 transition-colors flex items-center space-x-2 border border-gray-100 rounded-lg bg-gray-50/50 cursor-pointer group"
          >
            <ShoppingBag size={16} className="group-hover:scale-105 transition-transform" />
            <span className="text-xs font-mono font-bold bg-slate-900 text-white px-1.5 py-0.5 rounded-md min-w-[20px] text-center">
              {itemsCount}
            </span>
          </button>
        </div>
      </nav>

      {/* --- SLIDE-OUT DRAWER OVERLAY PANEL --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[10000] overflow-hidden">
          {/* Dark Glass Backdrop Dimmer */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            {/* Sliding Sidebar Body Container */}
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out border-l border-gray-100">
              
              {/* Drawer Header Segment */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Your Allocation Bag</h2>
                  <p className="text-[10px] font-mono text-gray-400 mt-0.5">Total units indexed: {itemsCount}</p>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-slate-900 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Scrollable Items Grid */}
              <div className="flex-1 overflow-y-auto p-6 divide-y divide-gray-100 no-scrollbar">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-3 text-center opacity-60 py-20">
                    <ShoppingBag size={32} className="text-gray-300" />
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-mono">Staging queue is completely empty.</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item._id} className="flex items-center space-x-4 py-4 first:pt-0 last:pb-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded-lg bg-gray-50 border border-gray-100 shrink-0" 
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <p className="text-xs font-bold text-slate-800 truncate tracking-tight">{item.name}</p>
                        <p className="text-xs font-mono font-bold text-slate-900">${Number(item.price).toFixed(2)}</p>
                        
                        {/* Quantity Increment/Decrement Adjuster Panel */}
                        <div className="flex items-center space-x-2 pt-1">
                          <div className="flex items-center border border-gray-100 rounded bg-gray-50">
                            <button 
                              onClick={() => updateQty(item._id, item.qty - 1)}
                              className="p-1 text-gray-500 hover:text-slate-900 cursor-pointer"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="px-2 text-xs font-mono font-bold text-slate-700 min-w-[20px] text-center">
                              {item.qty}
                            </span>
                            <button 
                              onClick={() => updateQty(item._id, item.qty + 1)}
                              className="p-1 text-gray-500 hover:text-slate-900 cursor-pointer"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          
                          {/* Individual Item Purge Trashcan Icon */}
                          <button 
                            onClick={() => removeFromCart(item._id, item.name)}
                            className="text-gray-300 hover:text-red-500 p-1 transition-colors cursor-pointer"
                            title="Remove asset"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Checkout Pricing Summary Block */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold uppercase tracking-wider text-gray-400">Subtotal Price</span>
                    <span className="font-mono font-black text-slate-900 text-base">${subtotalPrice.toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-mono leading-normal">Shipping, local node logistics, and clearing fees calculated dynamically at completion.</p>
                  
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/checkout');
                    }}
                    className="w-full bg-slate-900 text-white py-3 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors cursor-pointer shadow-sm text-center flex items-center justify-center space-x-2"
                  >
                    <span>Proceed to Transaction Portal</span>
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