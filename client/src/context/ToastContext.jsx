import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { X, ShoppingBag, Flame, Sparkles, CheckCircle } from 'lucide-react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timerRef = useRef(null);

  // High-fidelity smart add method with duplicate message prevention
  const addToast = useCallback((message, type = 'info') => {
    let standardBlockFlag = false;

    setToasts((prev) => {
      // 🛡️ STAGE GUARD: If an identical alert is already active on-screen, abort the push
      const isDuplicate = prev.some((toast) => toast.message === message);
      if (isDuplicate) {
        standardBlockFlag = true;
        return prev; 
      }

      const id = Math.random().toString(36).substring(2, 9);
      
      // Auto-dismiss execution logic
      setTimeout(() => {
        setToasts((currentToasts) => currentToasts.filter((t) => t.id !== id));
      }, 4000);

      return [...prev, { id, message, type }];
    });
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --- SINGLE THREAD TELEMETRY ENGINE ---
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    const locations = ['Tokyo', 'New York', 'Berlin', 'London', 'Paris', 'Seoul', 'Stockholm', 'Sydney'];
    const hooks = [
      'just added a design asset to their layout bag.',
      'successfully checked out an active catalog order.',
      'secured a limited premium product from stock storage.'
    ];

    timerRef.current = setInterval(() => {
      const location = locations[Math.floor(Math.random() * locations.length)];
      const hook = hooks[Math.floor(Math.random() * hooks.length)];
      
      if (Math.random() > 0.4) {
        addToast(`An architect in ${location} ${hook}`, 'telemetry');
      } else {
        addToast('High demand: Users currently evaluating checkout metrics.', 'alert');
      }
    }, 18000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* View Portal Stack */}
      <div className="fixed bottom-6 left-6 z-[9999] flex flex-col space-y-3 w-full max-w-sm sm:max-w-md pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-white/95 backdrop-blur-md border border-gray-100 p-4 rounded-xl shadow-xl flex items-start space-x-3.5 transition-all duration-300 animate-slide-in-left"
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle size={16} className="text-emerald-500" />}
              {toast.type === 'cart' && <ShoppingBag size={16} className="text-blue-500" />}
              {toast.type === 'alert' && <Flame size={16} className="text-orange-500 fill-orange-100" />}
              {toast.type === 'telemetry' && <Sparkles size={16} className="text-amber-500 fill-amber-100" />}
            </div>

            <div className="flex-1">
              <p className="text-[11px] font-mono leading-relaxed text-slate-700 font-medium">
                {toast.message}
              </p>
            </div>

            <button onClick={() => removeToast(toast.id)} className="text-gray-300 hover:text-slate-900 transition-colors p-0.5 cursor-pointer">
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);