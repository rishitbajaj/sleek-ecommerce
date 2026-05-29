import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth() || {};
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFBFA] flex flex-col items-center justify-center text-zinc-400 font-medium text-xs space-y-2">
        <div className="w-5 h-5 border-2 border-zinc-200 border-t-zinc-800 rounded-full animate-spin" />
        <span>Verifying secure workspace parameters...</span>
      </div>
    );
  }
  return user ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FBFBFA] text-[#1A1A1A] flex flex-col selection:bg-zinc-900 selection:text-white">
        
        {/* High-Fidelity Silk Modern Navbar Header */}
        <Navbar />

        {/* Main Viewport Content Route Dynamic Rendering Block Grid container matrix */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-8 pb-24 box-border">
          <Routes>
            <Route path="/" element={<ProductGrid />} />
            <Route path="/product/:id" element={<ProductDetailPage />} /> 
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/checkout" element={<CheckoutPage />} /> 
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Clean Luxury Fluid Footer Design Block Accent */}
        <footer className="w-full py-8 border-t border-zinc-100 px-6 sm:px-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-medium text-zinc-400 select-none">
          <span>Sleek Studio // Premium Minimal Architecture Platform Shell</span>
          <span className="text-[#1A1A1A] font-semibold">© 2026 Studio Corp. All rights reserved.</span>
        </footer>

      </div>
    </Router>
  );
}