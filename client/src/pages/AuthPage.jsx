import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, ArrowLeft, Loader2 } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isLogin ? '/api/users/login' : '/api/users/register';
    
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      login(data); // Save user to state & localStorage
      navigate('/'); // Redirect back to store homepage
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center space-x-2 text-sm text-gray-500 hover:text-brand-dark transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} />
        <span>Back to Shop</span>
      </button>

      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl border border-gray-100 shadow-xs">
        <div>
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-brand-dark uppercase tracking-widest">
            VÉLO<span className="text-blue-600">.</span>
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            {isLogin ? 'Welcome back. Sign in to your account.' : 'Create an account to track orders.'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            {!isLogin && (
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Full Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-600"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            )}

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email Address</label>
              <input
                type="email"
                required
                className="mt-1 block w-full px-3 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-600"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Password</label>
              <input
                type="password"
                required
                className="mt-1 block w-full px-3 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-600"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded text-white bg-brand-dark hover:bg-gray-800 focus:outline-none transition-colors uppercase tracking-wider cursor-pointer"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : isLogin ? (
                <span className="flex items-center space-x-2"><LogIn size={16}/> <span>Sign In</span></span>
              ) : (
                <span className="flex items-center space-x-2"><UserPlus size={16}/> <span>Register</span></span>
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => { setIsLogin(!isLogin); setError(null); }}
            className="text-xs text-blue-600 hover:underline font-semibold uppercase tracking-wider cursor-pointer"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}