import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, Calendar, MapPin, DollarSign, ArrowLeft, Loader2, ClipboardList } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders/myorders', {
          headers: {
            'Authorization': `Bearer ${user?.token}`
          }
        });
        if (!response.ok) throw new Error('Failed to query ledger database matrices.');
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchUserOrders();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-[#fafafa] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link to="/" className="inline-flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-slate-900 transition-colors">
          <ArrowLeft size={14} />
          <span>Terminal Hub</span>
        </Link>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-2xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-[9px] font-black tracking-[0.2em] text-blue-600 uppercase block">Verified Account Profile</span>
            <h1 className="text-xl font-bold text-slate-900 mt-0.5">{user?.name}</h1>
            <p className="text-xs text-gray-400 font-mono mt-0.5">{user?.email}</p>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded px-4 py-2.5 text-center">
            <span className="text-[9px] font-bold tracking-wider text-gray-400 uppercase block">Ledger Records</span>
            <span className="text-md font-mono font-bold text-slate-800">{orders.length} Orders</span>
          </div>
        </div>

        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-2 pt-4">
          <ClipboardList size={14} />
          <span>Historical Statement Ledger</span>
        </h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="animate-spin text-slate-900" size={24} />
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Querying Database Files...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 border border-red-100 p-4 rounded text-xs font-mono">
            Error reading entries: {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl space-y-4">
            <Package size={28} className="text-gray-300 mx-auto" />
            <p className="text-xs text-gray-400 uppercase tracking-widest">No order document signatures registered.</p>
            <Link to="/" className="inline-block px-4 py-2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-slate-800 transition-colors">Begin Sourcing Catalog</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-2xs hover:border-gray-200 transition-all">
                {/* Meta Summary Top Box */}
                <div className="bg-gray-50/70 border-b border-gray-100 px-6 py-4 flex flex-wrap justify-between items-center gap-4 text-xs font-mono text-gray-500">
                  <div className="flex space-x-6">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Transaction Identification</span>
                      <span className="text-slate-700 font-medium">{order._id}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Timestamp Signature</span>
                      <span className="text-slate-700 flex items-center space-x-1">
                        <Calendar size={12} className="text-gray-400" />
                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Settled Cost</span>
                    <span className="text-slate-900 font-black text-sm">${order.totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Internal Items Block Grid Loop */}
                <div className="p-6 space-y-4">
                  <div className="divide-y divide-gray-50">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                        <div className="flex items-center space-x-4">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded bg-gray-50 border border-gray-100" />
                          <div className="text-xs">
                            <p className="font-bold text-slate-800 tracking-tight">{item.name}</p>
                            <p className="text-gray-400 mt-0.5">Allocation Units: {item.qty} × ${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-slate-900 font-mono">${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Location Node */}
                  <div className="border-t border-gray-100 pt-4 flex items-center space-x-2 text-xs text-gray-400">
                    <MapPin size={12} className="text-gray-300 shrink-0" />
                    <span className="font-bold uppercase text-[9px] tracking-wider text-gray-400">Node Destination:</span>
                    <span className="truncate text-slate-600 font-medium">{order.shippingAddress}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}