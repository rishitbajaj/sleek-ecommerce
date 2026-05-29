import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import AuthPage from './pages/AuthPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProfilePage from './pages/ProfilePage';


function HomePage({ onCartOpen }) {
  return (
    <>
      <Navbar onCartOpen={onCartOpen} />
      <Hero />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductGrid />
      </main>
      <footer className="bg-white border-t border-gray-100 py-12 mt-20 text-center text-xs text-gray-400 tracking-[0.2em] uppercase">
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
          <div className="min-h-screen bg-[#fafafa] text-slate-900 antialiased selection:bg-black selection:text-white">
            <Routes>
              <Route path="/" element={<HomePage onCartOpen={() => setIsCartOpen(true)} />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;