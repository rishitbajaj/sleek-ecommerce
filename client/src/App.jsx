import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import AuthPage from './pages/AuthPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage'; // Import Product Detail View
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function HomePage({ onCartOpen }) {
  return (
    <>
      <Navbar onCartOpen={onCartOpen} />
      <Hero />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ProductGrid />
      </main>
      <footer className="bg-white border-t border-gray-100 py-8 mt-20 text-center text-xs text-gray-400 tracking-wider uppercase">
        &copy; 2026 Vélo Studio. All rights reserved.
      </footer>
    </>
  );
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-brand-light text-brand-dark selection:bg-brand-accent selection:text-white">
            
            <Routes>
              {/* Core Catalog Shell */}
              <Route path="/" element={<HomePage onCartOpen={() => setIsCartOpen(true)} />} />
              
              {/* Session Controls Layout */}
              <Route path="/login" element={<AuthPage />} />

              {/* Secure Checkout Screen View */}
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* DYNAMIC VARIABLE IDENTIFIER PRODUCT ROUTE */}
              <Route path="/product/:id" element={<ProductDetailPage />} />
            </Routes>

            {/* Slide-out Overlay System */}
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;