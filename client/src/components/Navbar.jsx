import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importing Router Navigation Links
import { ShoppingBag, User, Menu, X, Search, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Importing Global Auth Hook

export default function Navbar({ onCartOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth(); // Destructuring session attributes

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Brand Logo Anchor */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold tracking-widest uppercase cursor-pointer">
              VÉLO<span className="text-blue-600">.</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide uppercase">
            <Link to="/" className="text-brand-dark hover:text-blue-600 transition-colors">Shop All</Link>
            <a href="#" className="text-gray-500 hover:text-brand-dark transition-colors">New Arrivals</a>
            <a href="#" className="text-gray-500 hover:text-brand-dark transition-colors">Collections</a>
          </div>

          {/* Desktop Icon Controls */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-600 hover:text-brand-dark transition-colors cursor-pointer">
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* Dynamic Session User Avatar Module */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-end">
                  <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">Welcome</span>
                  <span className="text-xs font-semibold text-brand-dark">
                    {user.name.split(' ')[0]}
                  </span>
                </div>
                <button 
                  onClick={logout}
                  title="Sign Out"
                  className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                >
                  <LogOut size={18} strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-brand-dark transition-colors cursor-pointer"
                title="Account Registration / Login"
              >
                <User size={20} strokeWidth={1.5} />
              </Link>
            )}

            {/* Shopping Bag Trigger Control */}
            <button 
              onClick={onCartOpen} 
              className="text-gray-600 hover:text-brand-dark transition-colors relative cursor-pointer"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-fadeIn">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Shell Controls */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={onCartOpen} className="text-gray-600 relative p-2 cursor-pointer">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-blue-600 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-dark p-2 cursor-pointer">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Navigation Drawer Panel */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-4 animate-fadeIn">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-base font-medium text-brand-dark py-2 border-b border-gray-50">Shop All</Link>
          <a href="#" className="block text-base font-medium text-gray-600 py-2 border-b border-gray-50">New Arrivals</a>
          <a href="#" className="block text-base font-medium text-gray-600 py-2 border-b border-gray-50">Collections</a>
          
          <div className="flex flex-col space-y-4 pt-4">
            <a href="#" className="flex items-center text-gray-600 space-x-2 text-sm"><Search size={18}/> <span>Search Catalogue</span></a>
            
            {/* Mobile Adaptive Session Router */}
            {user ? (
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Logged In As</span>
                  <span className="text-sm font-semibold text-brand-dark">{user.name}</span>
                </div>
                <button 
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="flex items-center space-x-1 text-xs text-red-500 font-bold uppercase tracking-wider cursor-pointer"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)}
                className="flex items-center text-gray-600 space-x-2 text-sm cursor-pointer"
              >
                <User size={18}/> 
                <span>Sign In / Register</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}