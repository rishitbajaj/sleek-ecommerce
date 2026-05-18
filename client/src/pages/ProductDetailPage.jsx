import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingBag, Star, ShieldCheck, Truck, RefreshCw, Loader2 } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams(); // Capture the unique Mongo ID directly from the URL path
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        // Querying your Express API for the target ID document record
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found or invalid database key.');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error("Single product capture fault:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSingleProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-sm font-light tracking-widest text-gray-400 uppercase">Fetching Specifications...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center p-4 text-center">
        <p className="text-red-500 font-semibold mb-4">Error: {error || 'Item missing'}</p>
        <Link to="/" className="text-xs font-bold text-blue-600 uppercase tracking-wider hover:underline">&larr; Return to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-brand-dark mb-12 transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to Grid Collection</span>
        </button>

        {/* Product Layout Grid Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-2xl border border-gray-100 shadow-xs">
          
          {/* Left Wing: Hero Image Display */}
          <div className="w-full aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-50">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-500"
            />
          </div>

          {/* Right Wing: Core Meta Information Fields */}
          <div className="flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-black tracking-widest text-blue-600 uppercase">
                {product.category} Collection
              </span>
              <h1 className="text-3xl font-black text-brand-dark tracking-tight leading-none uppercase">
                {product.name}
              </h1>
              
              {/* Product Quality Metrics */}
              <div className="flex items-center space-x-2 pt-1">
                <div className="flex items-center space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={`${i < Math.floor(product.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} 
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-500">({product.rating || '5.0'} / 5.0 Customer Index)</span>
              </div>

              {/* Pricing Display */}
              <p className="text-2xl font-black text-brand-dark pt-2">
                ${product.price ? product.price.toFixed(2) : '0.00'}
              </p>

              <hr className="border-gray-100 my-4" />

              {/* Dynamic Description Box */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Overview Specifications</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  {product.description || "Crafted using studio-grade architectural design frameworks. Engineered for baseline resilience, absolute material optimization, and premium long-form ergonomics suited for modern everyday deployment environments."}
                </p>
              </div>
            </div>

            {/* Practical Premium Badges and Interactive Cart Dispatch Actions */}
            <div className="space-y-6">
              <button 
                onClick={() => addToCart(product)}
                className="w-full flex items-center justify-center space-x-3 py-4 bg-brand-dark text-white text-xs font-bold uppercase tracking-widest rounded shadow-sm hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <ShoppingBag size={16} />
                <span>Add Item To Shopping Bag</span>
              </button>

              {/* Studio Assurances Layer */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 text-center">
                <div className="flex flex-col items-center p-2 space-y-1">
                  <Truck size={18} className="text-gray-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">Free Courier</span>
                </div>
                <div className="flex flex-col items-center p-2 space-y-1">
                  <RefreshCw size={18} className="text-gray-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">30-Day Policy</span>
                </div>
                <div className="flex flex-col items-center p-2 space-y-1">
                  <ShieldCheck size={18} className="text-gray-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">Vélo Assured</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}