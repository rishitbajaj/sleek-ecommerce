import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';

// Mock product data featuring minimalist aesthetics
const PRODUCTS = [
  {
    id: 1,
    name: "Minimalist Leather Backpack",
    category: "Travel",
    price: 185.00,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Classic Chronograph Watch",
    category: "Accessories",
    price: 240.00,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Wireless Studio Headphones",
    category: "Audio",
    price: 299.00,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Scented Soy Wax Candle",
    category: "Home",
    price: 35.00,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop"
  }
];

export default function ProductGrid() {
  return (
    <div className="py-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-brand-dark">Curated Essentials</h2>
          <p className="text-sm text-gray-500 mt-1">Handpicked designs built to last a lifetime.</p>
        </div>
        <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors mt-2 md:mt-0 block">
          View All Products &rarr;
        </a>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="group relative flex flex-col justify-between">
            {/* Image Wrapper */}
            <div className="w-full aspect-square overflow-hidden bg-gray-100 rounded-lg relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              {/* Quick Add Overlay Button */}
              <button className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm text-brand-dark text-xs font-semibold py-2.5 px-4 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2 hover:bg-white">
                <ShoppingCart size={14} />
                <span>Quick Add</span>
              </button>
            </div>

            {/* Product Meta Details */}
            <div className="mt-4 flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                  {product.category}
                </span>
                <h3 className="text-sm font-medium text-brand-dark leading-tight">
                  <a href="#">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                {/* Rating Layout */}
                <div className="flex items-center space-x-1 pt-0.5">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  <span className="text-xs text-gray-500 font-medium">{product.rating}</span>
                </div>
              </div>
              <p className="text-sm font-semibold text-brand-dark">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}