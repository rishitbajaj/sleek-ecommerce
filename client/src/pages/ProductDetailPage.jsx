import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ArrowLeft, Plus, Minus, ShieldCheck, Truck } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart() || {};

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockInventory = [
        {
          _id: id || '1',
          name: 'Urban Minimalist Trench Coat',
          price: 295.00,
          image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
          description: 'A refined classic silhouette crafted with an advanced high-density technical textile layout composition. Features clean windproof structural drapery drape panels, invisible clean internal raw seams, and a signature hidden closure loop matrix engineered effortlessly for dynamic modern lifestyles.',
          sku: `ST-2026-${id?.substring(0, 4).toUpperCase() || 'TRNCH'}`,
          material: '70% Soft Technical Cotton, 30% Dense Matte Poly Nylon Blend Layer',
          origin: 'Exclusively Tailored Node // Tokyo Premium Hub Office'
        }
      ];
      setProduct(mockInventory[0]);
      setLoading(false);
    }, 300);
  }, [id]);

  const handleBagAllocation = () => {
    if (!product || !addToCart) return;
    
    // Yahan loop chalakar cart state mein item add ho raha hai
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    // 🚨 duplicate addToast line ko yahan se permanently delete kar diya hai.
    // Ab notification sirf CartContext se ek hi baar trigger hogi.
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-zinc-400 font-medium text-xs space-y-2 animate-pulse">
        <div className="w-5 h-5 border-2 border-zinc-300 border-t-zinc-800 rounded-full animate-spin" />
        <span>Loading item blueprint...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4 text-center px-4">
        <p className="text-zinc-400 font-medium text-sm">Specified product entry index cannot be found.</p>
        <Link to="/" className="text-xs font-bold underline text-[#1A1A1A]">
          Return to index catalog grid
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 animate-luxury-drawer">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center space-x-2 text-xs font-semibold text-zinc-400 hover:text-black transition-colors cursor-pointer bg-transparent border-none"
      >
        <ArrowLeft size={14} />
        <span>Back to catalog</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white border border-zinc-100 rounded-2xl p-6 sm:p-10 shadow-xs">
        
        {/* Left Column Image Showcase */}
        <div className="col-span-1 lg:col-span-6 bg-zinc-50 rounded-xl overflow-hidden max-h-[560px]">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
          />
        </div>

        {/* Right Column Specifications Data Block Panel */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-between py-2 space-y-8 lg:space-y-0">
          
          <div className="space-y-4">
            <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">SKU // {product.sku}</span>
            <h1 className="text-2xl font-bold tracking-tight text-[#1A1A1A]">{product.name}</h1>
            <p className="text-xl font-extrabold text-zinc-900">${Number(product.price).toFixed(2)}</p>
            <div className="h-[1.5px] w-full bg-zinc-100" />
            <p className="text-xs font-normal text-zinc-500 leading-relaxed">{product.description}</p>
          </div>

          {/* Technical Product Metadata Sheet List Table Row Card */}
          <div className="border-t border-b border-zinc-100 divide-y divide-zinc-100 text-xs my-4">
            <div className="py-3 flex justify-between">
              <span className="text-zinc-400">Composition Structure</span>
              <span className="text-zinc-700 font-medium text-right max-w-[240px] truncate">{product.material}</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="text-zinc-400">Dispatch Location</span>
              <span className="text-zinc-700 font-medium">{product.origin}</span>
            </div>
          </div>

          {/* Counter controls and allocation execution button trigger blocks */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              
              {/* Pill-Shaped Rounded Quantitative Interactive Adjuster Grid Container */}
              <div className="flex items-center border border-zinc-200 h-11 bg-zinc-50 rounded-xl overflow-hidden shrink-0">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-11 h-full hover:bg-zinc-200 text-zinc-500 transition-colors flex items-center justify-center font-bold cursor-pointer bg-transparent border-none"
                >
                  <Minus size={12} />
                </button>
                <span className="w-10 text-center font-bold text-zinc-800 select-none text-xs">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-11 h-full hover:bg-zinc-200 text-zinc-500 transition-colors flex items-center justify-center font-bold cursor-pointer bg-transparent border-none"
                >
                  <Plus size={12} />
                </button>
              </div>

              {/* Add to Bag CTA Execution Interface Button */}
              <button 
                onClick={handleBagAllocation}
                className="flex-1 h-11 bg-[#1A1A1A] text-white font-semibold text-xs tracking-wide rounded-xl hover:bg-zinc-800 transition-all duration-200 flex items-center justify-center cursor-pointer border-none shadow-xs"
              >
                Add to Shopping Bag
              </button>
            </div>

            {/* Verification Trust Badge Indicators Row List Menu */}
            <div className="flex items-center space-x-6 pt-1 text-[11px] text-zinc-400 font-medium">
              <span className="flex items-center space-x-1.5">
                <Truck size={13} />
                <span>Complimentary Air Freight Delivery</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <ShieldCheck size={13} />
                <span>Extended Warranted Quality</span>
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}