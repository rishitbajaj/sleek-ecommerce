import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';

function App() {
  return (
    <div className="min-h-screen bg-brand-light text-brand-dark selection:bg-brand-accent selection:text-white">
      <Navbar />
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ProductGrid />
      </main>

      {/* Premium Minimal Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 mt-20 text-center text-xs text-gray-400 tracking-wider uppercase">
        &copy; 2026 Vélo Studio. All rights reserved.
      </footer>
    </div>
  );
}

export default App;