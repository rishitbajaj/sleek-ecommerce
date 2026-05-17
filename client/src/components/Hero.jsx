import React from 'react';

export default function Hero() {
  return (
    <div className="relative bg-[#f3f4f6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[60vh] sm:min-h-[80vh] flex items-center">
        <div className="relative z-10 max-w-lg lg:max-w-2xl space-y-6 py-12">
          <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase block">
            Summer Drop 2026
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-brand-dark leading-none">
            Refined Aesthetics. <br />
            Ultimate Comfort.
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-light max-w-md">
            Experience the new standard of minimal design. Carefully engineered essentials curated for the modern wardrobe.
          </p>
          <div className="pt-4">
            <button className="bg-brand-dark text-white px-8 py-3.5 text-sm font-medium uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-sm hover:shadow-md">
              Explore Collection
            </button>
          </div>
        </div>
        
        {/* Placeholder decorative graphic structural backdrop */}
        <div className="absolute right-0 bottom-0 top-0 w-1/2 hidden md:block bg-gradient-to-l from-gray-200 to-transparent">
          {/* We'll tie an image or canvas block here later */}
        </div>
      </div>
    </div>
  );
}