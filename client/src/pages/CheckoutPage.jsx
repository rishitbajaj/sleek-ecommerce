import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CreditCard, ShoppingBag, ArrowLeft, CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = React.useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Simulate payment processing step
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl border border-gray-100 text-center space-y-6 shadow-xs">
          <div className="flex justify-center text-green-500 animate-bounce">
            <CheckCircle size={64} strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-bold text-brand-dark uppercase tracking-wider">Order Confirmed!</h2>
          <p className="text-sm text-gray-500">
            Thank you for shopping with us, {user?.name.split(' ')[0]}. Your sleek order has been securely processed and logged.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full py-3 bg-brand-dark text-white rounded text-xs font-semibold uppercase tracking-widest hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center p-4">
        <ShoppingBag size={48} className="text-gray-300 mb-4" />
        <p className="text-sm text-gray-400 uppercase tracking-widest mb-4">Your checkout bag is empty</p>
        <Link to="/" className="text-xs font-bold text-blue-600 uppercase tracking-wider hover:underline">&larr; Return to Storefront</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back navigation */}
        <Link to="/" className="inline-flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-brand-dark mb-8 transition-colors">
          <ArrowLeft size={14} />
          <span>Back to Grid</span>
        </Link>

        <h1 className="text-3xl font-black text-brand-dark uppercase tracking-tight mb-8">Secure Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Summary Form */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-2">
              <CreditCard size={16} />
              <span>Shipping & Payment</span>
            </h2>
            
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Recipient Name</label>
                <input type="text" required defaultValue={user?.name} className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-600" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Delivery Address</label>
                <input type="text" required placeholder="123 Studio Way, Apt 4B" className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-600" />
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded text-xs font-semibold uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-xs cursor-pointer">
                  Place Order — ${cartTotal.toFixed(2)}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Dynamic Bag Preview */}
          <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100 flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">Review Items ({cartItems.length})</h2>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center justify-between text-sm text-brand-dark">
                    <div className="flex items-center space-x-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded bg-gray-100" />
                      <div>
                        <p className="font-medium line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                      </div>
                    </div>
                    <p className="font-semibold">${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-6 space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Complimentary</span>
              </div>
              <div className="flex justify-between text-base font-bold text-brand-dark pt-2 border-t border-gray-100">
                <span>Total due</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}