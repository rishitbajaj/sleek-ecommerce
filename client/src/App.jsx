import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer'; // 1. Import Drawer
import { CartProvider } from './context/CartContext';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false); // 2. Setup Open/Close State

  return (
    <CartProvider>
      <div className="min-h-screen bg-brand-light text-brand-dark selection:bg-brand-accent selection:text-white">
        {/* 3. Pass Open Handler directly to Navbar */}
        <Navbar onCartOpen={() => setIsCartOpen(true)} />
        <Hero />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ProductGrid />
        </main>

        {/* 4. Inject Cart Drawer component */}
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        <footer className="bg-white border-t border-gray-100 py-8 mt-20 text-center text-xs text-gray-400 tracking-wider uppercase">
          &copy; 2026 Vélo Studio. All rights reserved.
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;