import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingBag, Star, ShieldCheck, Truck, RefreshCw, Loader2 } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) throw new Error('Specification matrix lookup failed');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-slate-900" size={32} />
        <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">Compiling Details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-4 text-center">
        <div className="border border-red-100 bg-white p-8 rounded-xl max-w-sm space-y-4">
          <p className="text-red-500 font-mono text-xs">{error}</p>
          <Link to="/" className="block text-xs font-bold bg-slate-900 text-white py-3 uppercase tracking-widest hover:bg-slate-800">Return to Grid</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-slate-900 mb-10 transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Catalog Index</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-6 sm:p-10 rounded-2xl border border-gray-100 shadow-xs">
          <div className="w-full aspect-[3/4] bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center" />
          </div>

          <div className="flex flex-col justify-between py-2 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-black tracking-[0.25em] text-blue-600 uppercase block bg-blue-50 w-max px-2.5 py-1 rounded">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className={`fill-amber-400 text-amber-400`} />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-400">({product.rating} Profile Rating)</span>
              </div>

              <p className="text-2xl font-black text-slate-900 pt-2">${product.price.toFixed(2)}</p>
              
              <div className="pt-4 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Description Blueprint</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  {product.description || "Crafted using premium architectural composition frameworks. Formulated for resilient daily structural usage, optimized material load weight distribution, and functional aesthetic execution."}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <button 
                onClick={() => addToCart(product)}
                className="w-full flex items-center justify-center space-x-3 py-4 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-slate-800 transition-colors cursor-pointer shadow-sm hover:shadow-md"
              >
                <ShoppingBag size={14} />
                <span>Secure Entry to Bag</span>
              </button>

              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 text-center text-gray-500">
                <div className="flex flex-col items-center space-y-1">
                  <Truck size={16} />
                  <span className="text-[9px] font-bold uppercase tracking-wider">Free Delivery</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <RefreshCw size={16} />
                  <span className="text-[9px] font-bold uppercase tracking-wider">Returns Window</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <ShieldCheck size={16} />
                  <span className="text-[9px] font-bold uppercase tracking-wider">Vélo Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}