import React, { useState, useEffect } from 'react';
import { Timer, Zap } from 'lucide-react';

export default function PromoBanner({ onSaleStatusChange }) {
  // Set an initial countdown window (e.g., 15 minutes in seconds)
  const [timeLeft, setTimeLeft] = useState(900); 
  const [isSaleActive, setIsSaleActive] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!isSaleActive) {
        setIsSaleActive(true);
        onSaleStatusChange(true); // Signal the storefront matrix to slash prices
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isSaleActive, onSaleStatusChange]);

  // Format calculation arrays cleanly to standard timestamp strings
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`w-full py-2.5 px-4 text-center transition-all duration-500 flex items-center justify-center space-x-3 text-xs tracking-widest uppercase font-black ${
      isSaleActive 
        ? 'bg-amber-500 text-slate-950 animate-pulse' 
        : 'bg-slate-950 text-white border-b border-gray-800'
    }`}>
      <Zap size={14} className={isSaleActive ? 'fill-slate-950' : 'fill-amber-400 text-amber-400'} />
      
      {isSaleActive ? (
        <span>Flash Matrix Sale Active // 20% Automated Ledger Discount Applied Storewide</span>
      ) : (
        <div className="flex items-center space-x-2">
          <span>Next Structural Premium Stock Drop Window Closes In</span>
          <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-amber-400 flex items-center space-x-1">
            <Timer size={12} className="inline mr-1" />
            {formatTime(timeLeft)}
          </span>
        </div>
      )}
    </div>
  );
}