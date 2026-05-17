import React, { useState } from 'react';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = 2; // Temporary mock count

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold tracking-widest uppercase cursor-pointer">
              VÉLO<span className="text-blue-600">.</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide uppercase">
            <a href="#" className="text-brand-dark hover:text-blue-600 transition-colors">Shop All</a>
            <a href="#" className="text-gray-500 hover:text-brand-dark transition-colors">New Arrivals</a>
            <a href="#" className="text-gray-500 hover:text-brand-dark transition-colors">Collections</a>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-600 hover:text-brand-dark transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button className="text-gray-600 hover:text-brand-dark transition-colors">
              <User size={20} strokeWidth={1.5} />
            </button>
            <button className="text-gray-600 hover:text-brand-dark transition-colors relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button className="text-gray-600 relative p-2">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-blue-600 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-dark p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-4 animate-fadeIn">
          <a href="#" className="block text-base font-medium text-brand-dark py-2 border-b border-gray-50">Shop All</a>
          <a href="#" className="block text-base font-medium text-gray-600 py-2 border-b border-gray-50">New Arrivals</a>
          <a href="#" className="block text-base font-medium text-gray-600 py-2 border-b border-gray-50">Collections</a>
          <div className="flex items-center space-x-6 pt-4">
            <a href="#" className="flex items-center text-gray-600 space-x-2"><Search size={18}/> <span>Search</span></a>
            <a href="#" className="flex items-center text-gray-600 space-x-2"><User size={18}/> <span>Account</span></a>
          </div>
        </div>
      )}
    </nav>
  );
}