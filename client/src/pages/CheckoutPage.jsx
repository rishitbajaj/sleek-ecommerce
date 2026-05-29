import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ArrowLeft, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CheckoutPage() {
  // Gracefully destructure values with safe default protection hooks fallbacks
  const { cartItems = [], subtotalPrice = 0, clearCart } = useCart() || {};
  const { addToast } = useToast() || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', address: '', city: '', postalCode: '', cardNumber: '', expiry: '', cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmission = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.address || !formData.cardNumber) {
      addToast?.('Please finalize mapping vital shipping coordinate credentials.', 'alert');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      addToast?.('Order clearing settlement finalized successfully.', 'success');
      clearCart?.();
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="w-full min-h-[55vh] border border-zinc-100 bg-white rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-5 shadow-xs animate-luxury-drawer">
        <div className="p-3 bg-zinc-50 rounded-full text-zinc-900">
          <CheckCircle2 size={36} strokeWidth={1.5} />
        </div>
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight text-[#1A1A1A]">Order Confirmed</h1>
          <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">Your secure clearing allocation transmission process finalized flawlessly. Courier routing maps are staging.</p>
        </div>
        <div className="h-[1px] w-16 bg-zinc-100" />
        <Link to="/" className="px-5 py-2.5 bg-[#1A1A1A] text-white rounded-xl font-semibold text-xs hover:bg-zinc-800 transition-all shadow-xs">
          Return to Dashboard Index
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 animate-luxury-drawer">
      <Link to="/" className="flex items-center space-x-2 text-xs font-semibold text-zinc-400 hover:text-black transition-colors">
        <ArrowLeft size={13} />
        <span>Return to index catalog</span>
      </Link>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Shipping details and encrypted credit authorization form submission card frame element (7 Columns) */}
        <form onSubmit={handleOrderSubmission} className="col-span-1 lg:col-span-7 border border-zinc-100 p-6 sm:p-8 bg-white rounded-2xl shadow-xs space-y-6 text-xs font-medium text-zinc-700">
          <div>
            <h2 className="text-base font-bold text-[#1A1A1A] tracking-tight">Checkout Clearance Ledger</h2>
            <p className="text-xs text-zinc-400 font-normal mt-0.5">Input secure transport freight destinations and settlement data</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-zinc-500">First Name</label>
              <input type="text" name="firstName" required onChange={handleInputChange} className="w-full h-10 px-3 bg-zinc-50 border border-zinc-200 focus:border-zinc-400 rounded-xl outline-none focus:bg-white transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-500">Last Name</label>
              <input type="text" name="lastName" required onChange={handleInputChange} className="w-full h-10 px-3 bg-zinc-50 border border-zinc-200 focus:border-zinc-400 rounded-xl outline-none focus:bg-white transition-colors" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500">Contact Email</label>
            <input type="email" name="email" required onChange={handleInputChange} className="w-full h-10 px-3 bg-zinc-50 border border-zinc-200 focus:border-zinc-400 rounded-xl outline-none focus:bg-white transition-colors" />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500">Delivery Street Address</label>
            <input type="text" name="address" required onChange={handleInputChange} className="w-full h-10 px-3 bg-zinc-50 border border-zinc-200 focus:border-zinc-400 rounded-xl outline-none focus:bg-white transition-colors" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-zinc-500">City</label>
              <input type="text" name="city" required onChange={handleInputChange} className="w-full h-10 px-3 bg-zinc-50 border border-zinc-200 focus:border-zinc-400 rounded-xl outline-none focus:bg-white transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-500">Postal Zip Code</label>
              <input type="text" name="postalCode" required onChange={handleInputChange} className="w-full h-10 px-3 bg-zinc-50 border border-zinc-200 focus:border-zinc-400 rounded-xl outline-none focus:bg-white transition-colors" />
            </div>
          </div>

          {/* Secure vault card inputs row framework matrix block */}
          <div className="pt-4 border-t border-zinc-100 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#1A1A1A]">
              <CreditCard size={14} />
              <span>Encrypted Settlement Gateway Vault</span>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-zinc-500">Card Number (PAN)</label>
              <input type="text" name="cardNumber" placeholder="0000 0000 0000 0000" maxLength="19" required onChange={handleInputChange} className="w-full h-10 px-3 bg-zinc-50 border border-zinc-200 focus:border-zinc-400 rounded-xl outline-none focus:bg-white transition-colors tracking-wider" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-zinc-500">Expiry Date</label>
                <input type="text" name="expiry" placeholder="MM/YY" maxLength="5" required onChange={handleInputChange} className="w-full h-10 px-3 bg-zinc-50 border border-zinc-200 focus:border-zinc-400 rounded-xl outline-none focus:bg-white transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-zinc-500">CVV Vault Code</label>
                <input type="password" name="cvv" placeholder="•••" maxLength="4" required onChange={handleInputChange} className="w-full h-10 px-3 bg-zinc-50 border border-zinc-200 focus:border-zinc-400 rounded-xl outline-none focus:bg-white transition-colors" />
              </div>
            </div>
          </div>

          <button type="submit" disabled={isProcessing || cartItems.length === 0} className="w-full h-12 bg-[#1A1A1A] text-white font-semibold rounded-xl hover:bg-zinc-800 transition-all flex items-center justify-center cursor-pointer disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed shadow-xs">
            <span>{isProcessing ? 'Processing secure network settlement...' : 'Authorize Transaction Order'}</span>
          </button>
        </form>

        {/* Live current items manifest cost aggregation checkout details view card (5 Columns) */}
        <div className="col-span-1 lg:col-span-5 border border-zinc-100 p-6 bg-white rounded-2xl shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Curated Order Items</h3>
          <div className="h-[1px] w-full bg-zinc-100" />
          
          <div className="max-h-[200px] overflow-y-auto divide-y divide-zinc-50 pr-1 no-scrollbar">
            {cartItems.length === 0 ? (
              <p className="text-xs text-zinc-400 py-2 font-normal italic">Your shopping cart registry is empty.</p>
            ) : (
              cartItems.map((item) => {
                if (!item) return null;
                return (
                  <div key={item._id} className="py-3 flex justify-between items-center text-xs">
                    <div className="min-w-0 flex-1 pr-4 font-normal">
                      <p className="font-semibold text-zinc-900 truncate">{item.name}</p>
                      <p className="text-[11px] text-zinc-400 mt-0.5">Quantity Count: {item.qty}</p>
                    </div>
                    <span className="font-bold text-zinc-900 shrink-0">
                      ${((item.qty || 1) * Number(item.price || 0)).toFixed(2)}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          <div className="pt-4 border-t border-zinc-100 space-y-2">
            <div className="flex justify-between text-xs text-zinc-400 font-normal">
              <span>Standard Premium Courier Cargo</span>
              <span className="font-semibold text-green-600">Complimentary</span>
            </div>
            <div className="flex justify-between items-baseline pt-2">
              <span className="text-xs font-semibold text-zinc-500">Aggregate Total</span>
              <span className="text-xl font-extrabold tracking-tight text-[#1A1A1A]">
                ${Number(subtotalPrice || 0).toFixed(2)}
              </span>
            </div>

            <div className="flex items-center space-x-1.5 pt-3 text-[10px] text-zinc-400 font-medium select-none border-t border-zinc-50 mt-2">
              <ShieldCheck size={13} className="text-zinc-400 shrink-0" />
              <span>AES-256 Bit Secure Transaction Layer Endorsement Matrix.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}