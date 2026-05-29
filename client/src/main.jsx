import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      {/* 🚀 Inverted order: ToastProvider must wrap CartProvider */}
      <ToastProvider> 
        <CartProvider>
          <App />
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  </React.StrictMode>,
);