import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const handleScrollToProducts = () => {
    window.scrollTo({
      top: window.innerHeight * 0.75,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative bg-gradient-to-b from-white to-[#f4f4f5] border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl space-y-6">
          <span className="text-xs font-bold tracking-[0.3em] text-blue-600 uppercase block animate-fadeIn">
            Summer Drop 2026
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
            Refined Aesthetics.<br />
            <span className="text-gray-400">Ultimate Comfort.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl font-light leading-relaxed">
            Experience the new standard of minimal design. Carefully engineered essentials curated for the modern wardrobe.
          </p>
          <div className="pt-4">
            {/* FIXED: High contrast button with bold dark styling */}
            <button 
              onClick={handleScrollToProducts}
              className="group inline-flex items-center space-x-3 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-md shadow-sm transition-all hover:shadow-md cursor-pointer"
            >
              <span>Explore Collection</span>
              <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Abstract Background Design Element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
    </div>
  );
}