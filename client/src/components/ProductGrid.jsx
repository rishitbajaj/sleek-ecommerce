import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext'; 

export default function ProductGrid() {
  const { addToCart } = useCart(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) throw new Error('Network data capture failed');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products from the database.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <Loader2 className="animate-spin text-slate-900" size={32} />
        <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">Syncing Inventory...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24 border border-dashed border-gray-200 rounded-xl bg-white max-w-md mx-auto">
        <p className="text-sm text-red-500 font-mono">{error}</p>
        <p className="text-xs text-gray-400 mt-2">Verify local Node.js engine port // 5000</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 uppercase tracking-[0.05em]">Curated Essentials</h2>
          <p className="text-xs text-gray-400 mt-1">Sourced dynamically from MongoDB collection buckets.</p>
        </div>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2 sm:mt-0">
          {products.length} Designs Listed
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {products.map((product) => (
          <div key={product._id} className="group relative flex flex-col space-y-4">
            <div className="w-full aspect-[3/4] overflow-hidden bg-white border border-gray-100 rounded-xl relative group shadow-xs hover:shadow-md transition-all duration-300">
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out cursor-pointer"
                  loading="lazy"
                />
              </Link>
              
              <button 
                onClick={() => addToCart(product)}
                className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-md text-white text-xs font-semibold py-3 px-4 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2 hover:bg-slate-800 z-20 cursor-pointer"
              >
                <ShoppingBag size={14} />
                <span className="tracking-wider uppercase text-[10px]">Quick Add</span>
              </button>
            </div>

            <div className="flex justify-between items-start px-1">
              <div className="space-y-1 max-w-[75%]">
                <span className="text-[9px] font-black tracking-[0.2em] text-blue-600 uppercase block">{product.category}</span>
                <h3 className="text-sm font-medium text-slate-800 tracking-tight truncate hover:text-blue-600 transition-colors">
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                </h3>
                <div className="flex items-center space-x-1.5">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-slate-500">{product.rating}</span>
                </div>
              </div>
              <p className="text-sm font-bold text-slate-900">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}