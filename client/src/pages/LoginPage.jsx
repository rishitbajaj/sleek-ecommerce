import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth() || {};
  const { addToast } = useToast() || {};
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast?.('Please populate all credential lines before accessing gateway.', 'alert');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await login?.(email, password);
      if (success) {
        addToast?.('Welcome back. Interface context restored.', 'success');
        navigate(from, { replace: true });
      } else {
        addToast?.('Invalid authentication credentials provided.', 'alert');
      }
    } catch (err) {
      addToast?.('System execution bottleneck. Re-verify node link status.', 'alert');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center px-4 py-8 animate-luxury-drawer">
      <div className="max-w-md w-full bg-white border border-zinc-100 rounded-2xl p-8 sm:p-10 shadow-sm space-y-6">
        
        {/* Text Header Node Branding Section */}
        <div className="text-center space-y-1.5">
          <h2 className="text-xl font-bold tracking-tight text-[#1A1A1A]">Welcome Back</h2>
          <p className="text-xs text-zinc-400">Enter credentials to restore active session state</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Email Element Layout Box Container */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-600">Email Address</label>
            <div className="relative flex items-center">
              <Mail size={14} className="absolute left-4 text-zinc-400" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="w-full h-11 pl-11 pr-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none text-zinc-800 transition-all focus:border-zinc-400 focus:bg-white text-xs font-medium"
                required
              />
            </div>
          </div>

          {/* Password Element Layout Box Container */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-zinc-600">Password</label>
              <span className="text-[11px] text-zinc-400 hover:text-black cursor-pointer transition-colors">Forgot password?</span>
            </div>
            <div className="relative flex items-center">
              <Lock size={14} className="absolute left-4 text-zinc-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                className="w-full h-11 pl-11 pr-12 bg-zinc-50 border border-zinc-200 rounded-xl outline-none text-zinc-800 transition-all focus:border-zinc-400 focus:bg-white text-xs font-medium"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-zinc-400 hover:text-zinc-700 p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Execute Submit Authorization Panel Action Trigger Toggle */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-[#1A1A1A] text-white font-semibold rounded-xl hover:bg-zinc-800 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer disabled:bg-zinc-200 text-xs shadow-xs"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In'}</span>
              {!isSubmitting && <ArrowRight size={13} />}
            </button>
          </div>
        </form>

        <div className="pt-4 border-t border-zinc-100 text-center text-xs text-zinc-400">
          <span>New to this workspace? </span>
          <button type="button" className="text-[#1A1A1A] font-bold hover:underline bg-transparent cursor-pointer">
            Create account
          </button>
        </div>

      </div>
    </div>
  );
}