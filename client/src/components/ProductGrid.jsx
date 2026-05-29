import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Loader2, Search, SlidersHorizontal, Percent } from 'lucide-react';
import { useCart } from '../context/CartContext'; 
import PromoBanner from './PromoBanner'; // Import the new banner

export default function ProductGrid() {
  const { addToCart } = useCart(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter and Promo State Matrix
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [flashSaleActive, setFlashSaleActive] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) throw new Error('Network data capture failed');
        const data = await response.json();
        setProducts(data);
        
        const extractedCategories = ['All', ...new Set(data.map(item => item.category))];
        setCategories(extractedCategories);
      } catch (err) {
        setError("Failed to load products from the database.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
    <div className="space-y-6">
      {/* ⚡ Top Live Flash Control Node Injector */}
      <div className="-mx-4 sm:-mx-8 -mt-8 mb-4">
        <PromoBanner onSaleStatusChange={setFlashSaleActive} />
      </div>

      {/* SEARCH CONTROL HUB LAYOUT MODULE */}
      <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:max-w-sm flex items-center">
          <Search className="absolute left-3.5 text-gray-400" size={16} />
          <input 
            type="text"
            placeholder="Search our catalog index..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded text-xs font-medium focus:outline-none focus:bg-white focus:border-slate-900 transition-all placeholder:text-gray-400 text-slate-800"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto no-scrollbar">
          <div className="text-gray-400 flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider mr-2">
            <SlidersHorizontal size={12} />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded transition-all cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-md font-bold tracking-wider text-slate-900 uppercase">Catalog Index</h2>
          <p className="text-xs text-gray-400 mt-0.5">Showing {filteredProducts.length} computed matches.</p>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-100 rounded-2xl">
          <p className="text-sm text-gray-400 uppercase tracking-widest font-light">No matching product documents discovered.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map((product) => {
            // Compute structural sale markdown arrays on the fly
            const activePrice = flashSaleActive ? product.price * 0.8 : product.price;

            return (
              <div key={product._id} className="group relative flex flex-col space-y-4">
                <div className="w-full aspect-[3/4] overflow-hidden bg-white border border-gray-100 rounded-xl relative shadow-xs hover:shadow-md transition-all duration-300">
                  
                  {/* Dynamic Sale Floating Tag Alert badge */}
                  {flashSaleActive && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black text-[9px] uppercase tracking-widest px-2 py-1 rounded z-10 shadow flex items-center space-x-1 animate-bounce">
                      <Percent size={10} />
                      <span>20% OFF</span>
                    </div>
                  )}

                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out cursor-pointer"
                      loading="lazy"
                    />
                  </Link>
                  
                  <button 
                    onClick={() => addToCart({ ...product, price: activePrice })}
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
                  
                  {/* High contrast dual price view matrix mapping */}
                  <div className="text-right">
                    {flashSaleActive ? (
                      <div>
                        <p className="text-sm font-bold text-amber-600">${activePrice.toFixed(2)}</p>
                        <p className="text-[10px] font-mono text-gray-400 line-through">${product.price.toFixed(2)}</p>
                      </div>
                    ) : (
                      <p className="text-sm font-bold text-slate-900">${product.price.toFixed(2)}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}