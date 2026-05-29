import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// 🚨 CORE IMPORTS: Re-verifying pristine layout components
import Navbar from './components/Navbar.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';

// Security Route Guard Layer Node
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth() || {};
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFBFA] flex flex-col items-center justify-center text-zinc-400 font-medium text-xs space-y-2">
        <div className="w-5 h-5 border-2 border-zinc-200 border-t-zinc-800 rounded-full animate-spin" />
        <span>Verifying secure session tokens...</span>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FBFBFA] text-[#1A1A1A] flex flex-col selection:bg-zinc-900 selection:text-white">
        
        {/* 1. Global Navigation Header */}
        <Navbar />

        {/* 2. Main Workspace Dynamic Viewport Router Canvas */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-8 pb-24 box-border">
          <Routes>
            {/* Catalog Grid Index Route */}
            <Route path="/" element={<ProductGrid />} />
            
            {/* Dynamic Product Detail Routing Interface Target */}
            <Route path="/product/:id" element={<ProductDetailPage />} /> 
            
            {/* Authentication Gateway Credentials Panel */}
            <Route path="/login" element={<LoginPage />} /> 
            
            {/* Secure Transaction Ledger Counter */}
            <Route path="/checkout" element={<CheckoutPage />} /> 
            
            {/* Protected Account Dashboard Panel Node */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            
            {/* Catch-all Wildcard Route Reset Trigger */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* 3. Luxury Minimalist Studio Corporate Footer */}
        <footer className="w-full py-8 border-t border-zinc-100 px-6 sm:px-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-medium text-zinc-400 select-none">
          <span>Sleek Studio // Premium Minimal Architecture Platform Shell</span>
          <span className="text-[#1A1A1A] font-semibold">© 2026 Studio Corp. All rights reserved.</span>
        </footer>

      </div>
    </Router>
  );
}