import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Loader2 } from 'lucide-react';

export default function ProductGrid() {
  // Setup state to hold data from the API
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the Express backend as soon as the component loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data: ", err);
        setError("Failed to load products from the database.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Sleek loading animation placeholder screen
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-sm font-light tracking-widest text-gray-500 uppercase">Loading Collection...</p>
      </div>
    );
  }

  // Graceful error display state
  if (error) {
    return (
      <div className="text-center py-24">
        <p className="text-red-500 font-medium">{error}</p>
        <p className="text-xs text-gray-400 mt-2">Make sure your Node.js server is running on port 5000.</p>
      </div>
    );
  }

  return (
    <div className="py-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-brand-dark">Curated Essentials</h2>
          <p className="text-sm text-gray-500 mt-1">Handpicked designs pulled dynamically from MongoDB.</p>
        </div>
        <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors mt-2 md:mt-0 block">
          View All Products &rarr;
        </a>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product) => (
          <div key={product._id} className="group relative flex flex-col justify-between">
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