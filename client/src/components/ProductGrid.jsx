import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';

export default function ProductGrid() {
  const navigate = useNavigate();
  const { addToCart } = useCart() || {};
  const { addToast } = useToast() || {};

  // 📦 Real Premium Mock Inventory Array with explicit, unique dynamic IDs
  const premiumInventory = [
    {
      _id: 'prod-trench-01',
      name: 'Urban Minimalist Trench Coat',
      price: 295.00,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
      category: 'Outerwear'
    },
    {
      _id: 'prod-tote-02',
      name: 'Structured Modular Tote Bag',
      price: 145.00,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&auto=format&fit=crop',
      category: 'Accessories'
    },
    {
      _id: 'prod-trouser-03',
      name: 'Technical Tailored Trouser',
      price: 180.00,
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400&auto=format&fit=crop',
      category: 'Apparel'
    },
    {
      _id: 'prod-tee-04',
      name: 'Minimalist Mercerized Tee',
      price: 65.00,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400&auto=format&fit=crop',
      category: 'Essentials'
    },
    {
      _id: 'prod-blazer-05',
      name: 'Oversized Sculptural Blazer',
      price: 240.00,
      image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=400&auto=format&fit=crop',
      category: 'Outerwear'
    },
    {
      _id: 'prod-boot-06',
      name: 'Matte Leather Chelsea Boot',
      price: 310.00,
      image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=400&auto=format&fit=crop',
      category: 'Footwear'
    }
  ];

  const handleQuickAdd = (e, product) => {
    e.stopPropagation(); // 🚨 Prevents triggering the card redirection route event!
    if (!addToCart) return;

    // Create default configuration variants for quick actions
    const baseVariant = {
      ...product,
      _id: `${product._id}-M-Oatmeal`,
      name: `${product.name} (Oatmeal / M)`
    };

    addToCart(baseVariant);
    addToast?.(`Added ${product.name} to shopping bag.`, 'success');
  };

  return (
    <div className="w-full space-y-8 animate-luxury-drawer">
      {/* Catalog Metric Banner Headline */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-100 pb-5">
        <div>
          <h2 className="text-base font-bold tracking-tight text-[#1A1A1A]">Curated Catalog Index</h2>
          <p className="text-xs text-zinc-400 mt-0.5">Showing premium seasonal pieces engineered for modern spaces</p>
        </div>
        <span className="text-[11px] font-bold tracking-wider uppercase text-zinc-400">
          [{premiumInventory.length} Matrix Items Staged]
        </span>
      </div>

      {/* 🚀 Dynamic Responsive Matrix Grid System */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {premiumInventory.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)} // 🎯 Passes the exact individual ID dynamically!
            className="group bg-white border border-zinc-100 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
          >
            {/* Visual Media Canvas Anchor */}
            <div className="w-full aspect-[4/5] bg-zinc-50 rounded-xl overflow-hidden relative mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                loading="lazy"
              />
              
              {/* Category Micro Token */}
              <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-md text-[10px] font-semibold px-2.5 py-1 rounded-md text-zinc-600 tracking-wide shadow-2xs">
                {product.category}
              </span>

              {/* Sophisticated Overlay Vector Pointer Icon */}
              <div className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-2xs text-[#1A1A1A]">
                <ArrowUpRight size={14} />
              </div>
            </div>

            {/* Typography Content Identity Fields */}
            <div className="space-y-3">
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold text-zinc-800 tracking-tight group-hover:text-black transition-colors truncate">
                  {product.name}
                </h3>
                <p className="text-sm font-extrabold text-zinc-900">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              {/* Direct Quick Add Bag Utility Interfacer Action Trigger */}
              <button
                type="button"
                onClick={(e) => handleQuickAdd(e, product)}
                className="w-full h-10 bg-zinc-50 hover:bg-[#1A1A1A] text-zinc-700 hover:text-white rounded-xl font-semibold text-xs transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer border border-zinc-200/40 hover:border-transparent"
              >
                <ShoppingBag size={13} />
                <span>Quick Add</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}