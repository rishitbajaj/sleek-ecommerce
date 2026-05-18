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

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-gray-100 text-center space-y-6 shadow-xs">
          <CheckCircle size={48} className="text-green-500 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Transaction Approved</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            Thank you for your order, {user?.name.split(' ')[0]}. Your session logs have updated your ledger successfully.
          </p>
          <button onClick={() => navigate('/')} className="w-full py-3 bg-slate-900 text-white rounded text-xs font-bold uppercase tracking-widest hover:bg-slate-800 cursor-pointer">
            Return to Terminal
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-4">
        <ShoppingBag size={32} className="text-gray-300 mb-2" />
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Bag Matrix Null</p>
        <Link to="/" className="text-xs font-bold text-blue-600 uppercase tracking-wider hover:underline">&larr; Return to Base</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link to="/" className="inline-flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-slate-900 transition-colors">
          <ArrowLeft size={14} />
          <span>Abort Process</span>
        </Link>

        <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Secure Check-Out</h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-gray-100 space-y-6 shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-2">
              <CreditCard size={14} />
              <span>Billing Credentials</span>
            </h2>
            
            <form onSubmit={(e) => { e.preventDefault(); setOrderPlaced(true); clearCart(); }} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Authorized Profile Name</label>
                <input type="text" required defaultValue={user?.name} className="mt-1.5 block w-full px-3 py-2.5 border border-gray-200 rounded text-sm bg-gray-50/50 focus:outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Destination Node Address</label>
                <input type="text" required placeholder="Street Address, City, Region" className="mt-1.5 block w-full px-3 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-slate-900" />
              </div>
              <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded text-xs font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-sm cursor-pointer">
                Authorize Ledger Payment — ${cartTotal.toFixed(2)}
              </button>
            </form>
          </div>

          <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-gray-100 space-y-6 shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">Invoice Ledger</h2>
            <div className="space-y-4 max-h-[240px] overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between text-xs text-slate-800">
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded bg-gray-50 border border-gray-100" />
                    <div>
                      <p className="font-medium truncate max-w-[140px]">{item.name}</p>
                      <p className="text-gray-400">Count: {item.qty}</p>
                    </div>
                  </div>
                  <p className="font-bold">${(item.price * item.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Freight Costs</span>
                <span className="text-green-600 font-bold uppercase text-[10px]">Complimentary</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-gray-100">
                <span>Aggregate Balance</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}