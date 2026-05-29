import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ArrowLeft, Plus, Minus, ShieldCheck, Truck, Star } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams(); // 🎯 This captures the unique ID from URL (e.g. prod-tote-02)
  const navigate = useNavigate();
  const { addToCart } = useCart() || {};
  const { addToast } = useToast() || {};

  // Core States
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  
  // Variant States
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    setLoading(true);
    
    // 📦 Comprehensive Database Matrix mapping unique specs to unique IDs
    const fullDatabaseMatrix = [
      {
        _id: 'prod-trench-01',
        name: 'Urban Minimalist Trench Coat',
        price: 295.00,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
        description: 'A refined classic silhouette crafted with an advanced high-density technical textile layout composition. Features clean windproof structural drapery drape panels, invisible clean internal raw seams, and a signature hidden closure loop matrix engineered effortlessly for dynamic modern lifestyles.',
        sku: 'ST-2026-TRNCH',
        material: '70% Soft Technical Cotton, 30% Dense Matte Poly Nylon Blend Layer',
        origin: 'Tokyo Premium Hub Office',
        rating: 4.9,
        reviewsCount: 124,
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: [
          { name: 'Oatmeal', hex: '#EAE6DF' },
          { name: 'Charcoal', hex: '#2F3032' },
          { name: 'Olive Matte', hex: '#4B4E43' }
        ],
        relatedIds: ['prod-tote-02', 'prod-trouser-03']
      },
      {
        _id: 'prod-tote-02',
        name: 'Structured Modular Tote Bag',
        price: 145.00,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',
        description: 'Engineered for absolute spatial optimization. Features a rigid geometric protective base panel framework, water-resistant zippers, dual-internal structural compartments, and modular anchor loops for quick-access tech attachments.',
        sku: 'ST-2026-TOTE',
        material: '100% Recycled Ballistic Cordura Nylon Matrix with Calfskin Trims',
        origin: 'Seoul Design Studio Atelier',
        rating: 4.8,
        reviewsCount: 92,
        sizes: ['One Size'],
        colors: [
          { name: 'Matte Black', hex: '#1A1A1A' },
          { name: 'Silt Grey', hex: '#8E8E8C' }
        ],
        relatedIds: ['prod-trench-01', 'prod-tee-04']
      },
      {
        _id: 'prod-trouser-03',
        name: 'Technical Tailored Trouser',
        price: 180.00,
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop',
        description: 'Striking a precise equilibrium between razor-sharp sartorial lines and active ergonomically mapped movement. Designed with clean concealed clasp closures, integrated continuous waistband adjusters, and permanent dual front creases.',
        sku: 'ST-2026-TRSR',
        material: '85% Technical Wool Gabardine, 15% Four-Way Stretch Elastane Core',
        origin: 'Milan Production Facility Node',
        rating: 4.7,
        reviewsCount: 86,
        sizes: ['28', '30', '32', '34', '36'],
        colors: [
          { name: 'Midnight Navy', hex: '#1D242B' },
          { name: 'Charcoal', hex: '#2F3032' }
        ],
        relatedIds: ['prod-trench-01', 'prod-blazer-05']
      },
      {
        _id: 'prod-tee-04',
        name: 'Minimalist Mercerized Tee',
        price: 65.00,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop',
        description: 'An elevated basic redefined with a subtle luxurious lustrous sheen. Features an optimal high-density tight rib-bound crewneck collar that holds structure permanently over lifecycle use, flat-locked micro seams, and an elegant boxy fit silhouette drape.',
        sku: 'ST-2026-TEE',
        material: '100% Premium Long-Staple Mercerized Egyptian Organic Cotton',
        origin: 'Osaka Knitting Mill Block',
        rating: 4.9,
        reviewsCount: 310,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [
          { name: 'Chalk White', hex: '#F9F9F9' },
          { name: 'Parchment', hex: '#EFECE6' },
          { name: 'Ink Black', hex: '#0F0F10' }
        ],
        relatedIds: ['prod-trouser-03', 'prod-tote-02']
      },
      {
        _id: 'prod-blazer-05',
        name: 'Oversized Sculptural Blazer',
        price: 240.00,
        image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=600&auto=format&fit=crop',
        description: 'A structural statement overlay featuring relaxed drop-shoulder anatomy mappings, fluid internal unlined construction matrix layers, hidden pockets, and clean wrist venting structures. Crafted to layer over heavy knits seamlessly.',
        sku: 'ST-2026-BLZR',
        material: '60% Structured Flax Linen, 40% Soft Breathable Tencel Weave Blend',
        origin: 'Tokyo Premium Hub Office',
        rating: 4.6,
        reviewsCount: 42,
        sizes: ['S', 'M', 'L'],
        colors: [
          { name: 'Parchment', hex: '#EFECE6' },
          { name: 'Sage Matte', hex: '#8F978B' }
        ],
        relatedIds: ['prod-trouser-03', 'prod-tee-04']
      },
      {
        _id: 'prod-boot-06',
        name: 'Matte Leather Chelsea Boot',
        price: 310.00,
        image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=600&auto=format&fit=crop',
        description: 'A timeless silhouette engineered with a rugged yet sleek profile. Handcrafted using oil-tanned water-repellent matte leather layers, integrated flexible elastic gore gussets, and dense vibram-profile lightweight outsole units.',
        sku: 'ST-2026-BOOT',
        material: '100% Full-Grain Vegetable-Tanned Italian Calfskin Leather Wrapper',
        origin: 'Tuscany Artisanal Handcraft Cell',
        rating: 4.9,
        reviewsCount: 78,
        sizes: ['40', '41', '42', '43', '44', '45'],
        colors: [
          { name: 'Espresso', hex: '#2A1F1D' },
          { name: 'Ink Black', hex: '#0F0F10' }
        ],
        relatedIds: ['prod-trench-01', 'prod-trouser-03']
      }
    ];

    // 🎯 FIX: Filter inventory item that matches the URL ID parameter precisely!
    const activeTargetItem = fullDatabaseMatrix.find(item => item._id === id);
    
    if (activeTargetItem) {
      setProduct(activeTargetItem);
      setSelectedColor(activeTargetItem.colors[0]?.name || 'Default');
      
      // Build references for related lookbook view items automatically
      const hydratedRelated = fullDatabaseMatrix.filter(item => 
        activeTargetItem.relatedIds.includes(item._id)
      );
      activeTargetItem.hydratedRelatedProducts = hydratedRelated;
    } else {
      setProduct(null);
    }
    
    setLoading(false);
  }, [id]);

  const handleBagAllocation = () => {
    if (!product || !addToCart) return;
    
    const customizedProduct = {
      ...product,
      _id: `${product._id}-${selectedSize}-${selectedColor}`,
      name: `${product.name} (${selectedColor} / ${selectedSize})`,
      price: product.price
    };

    for (let i = 0; i < quantity; i++) {
      addToCart(customizedProduct);
    }
    
    addToast?.(`Added ${quantity}x ${product.name} (${selectedColor} / ${selectedSize}) to bag.`, 'success');
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-zinc-400 font-medium text-xs space-y-2 animate-pulse">
        <div className="w-5 h-5 border-2 border-zinc-200 border-t-zinc-800 rounded-full animate-spin" />
        <span>Loading accurate specifications data matrix...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4 text-center px-4">
        <p className="text-zinc-400 font-medium text-sm">Specified product entry index [{id}] cannot be found.</p>
        <Link to="/" className="text-xs font-bold underline text-[#1A1A1A]">
          Return to catalog overview grid
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-12 animate-luxury-drawer">
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center space-x-2 text-xs font-semibold text-zinc-400 hover:text-black transition-colors cursor-pointer bg-transparent border-none"
      >
        <ArrowLeft size={14} />
        <span>Back to catalog</span>
      </button>

      {/* Main Structural Matrix Box Card Component Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white border border-zinc-100 rounded-2xl p-6 sm:p-10 shadow-xs">
        
        {/* Left Aspect Media Core Display Window */}
        <div className="col-span-1 lg:col-span-6 bg-zinc-50 rounded-xl overflow-hidden max-h-[600px] flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-101"
          />
        </div>

        {/* Right Product Control Panel Core Configuration Node */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-between py-2 space-y-6 lg:space-y-0">
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">SKU // {product.sku}</span>
              <div className="flex items-center space-x-1 text-xs font-medium text-zinc-600">
                <Star size={13} className="fill-zinc-900 text-zinc-900" />
                <span>{product.rating}</span>
                <span className="text-zinc-300">({product.reviewsCount} reviews)</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1A1A1A]">{product.name}</h1>
            <p className="text-xl font-extrabold text-zinc-900">${Number(product.price).toFixed(2)}</p>
            <div className="h-[1px] w-full bg-zinc-100" />
            <p className="text-xs font-normal text-zinc-500 leading-relaxed">{product.description}</p>
          </div>

          {/* Color Select Grid Nodes */}
          <div className="space-y-2.5 pt-1">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
              Color Option: <span className="text-zinc-800 lowercase font-medium">{selectedColor}</span>
            </span>
            <div className="flex items-center space-x-3">
              {product.colors?.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  style={{ backgroundColor: color.hex }}
                  className={`w-7 h-7 rounded-full border cursor-pointer relative transition-transform duration-200 hover:scale-110 ${
                    selectedColor === color.name ? 'border-zinc-900 ring-2 ring-zinc-900/10 scale-105' : 'border-zinc-200'
                  }`}
                  title={color.name}
                >
                  {selectedColor === color.name && (
                    <span className="absolute inset-0.5 rounded-full border border-white mix-blend-difference" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sizing Interactive Selection Interface */}
          <div className="space-y-2.5 pt-1">
            <div className="flex justify-between items-baseline text-[11px] font-bold uppercase tracking-wider">
              <span className="text-zinc-400">Available Sizing Matrix</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`h-9 px-4 text-xs font-semibold rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedSize === size
                      ? 'bg-[#1A1A1A] text-white border-transparent'
                      : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:bg-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Info Tab Accords */}
          <div className="border border-zinc-100 rounded-xl overflow-hidden bg-zinc-50/50 my-1">
            <div className="flex border-b border-zinc-100 bg-zinc-50 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`flex-1 py-2 text-center cursor-pointer transition-all ${activeTab === 'details' ? 'border-zinc-900 text-zinc-900 bg-white' : 'border-transparent hover:text-zinc-600'}`}
              >
                Specifications
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('shipping')}
                className={`flex-1 py-2 text-center cursor-pointer transition-all ${activeTab === 'shipping' ? 'border-zinc-900 text-zinc-900 bg-white' : 'border-transparent hover:text-zinc-600'}`}
              >
                Shipping
              </button>
            </div>
            <div className="p-4 text-xs text-zinc-500 font-normal leading-relaxed min-h-[60px]">
              {activeTab === 'details' && (
                <ul className="space-y-1 list-none p-0 m-0">
                  <li><span className="font-semibold text-zinc-700">Material Structure:</span> {product.material}</li>
                  <li><span className="font-semibold text-zinc-700">Production Studio:</span> {product.origin}</li>
                </ul>
              )}
              {activeTab === 'shipping' && (
                <p>Complimentary air freight carbon-neutral transit logistics routed globally. Tracking parameters transmit dynamically within 24 hours of checkout settlement.</p>
              )}
            </div>
          </div>

          {/* Quantity Controls & Bag Dispatch Action Call Trigger */}
          <div className="space-y-4 pt-1">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-zinc-200 h-11 bg-zinc-50 rounded-xl overflow-hidden shrink-0">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-11 h-full hover:bg-zinc-200 text-zinc-500 transition-colors flex items-center justify-center font-bold cursor-pointer bg-transparent border-none"
                >
                  <Minus size={12} />
                </button>
                <span className="w-10 text-center font-bold text-zinc-800 select-none text-xs">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-11 h-full hover:bg-zinc-200 text-zinc-500 transition-colors flex items-center justify-center font-bold cursor-pointer bg-transparent border-none"
                >
                  <Plus size={12} />
                </button>
              </div>

              <button 
                onClick={handleBagAllocation}
                className="flex-1 h-11 bg-[#1A1A1A] text-white font-semibold text-xs tracking-wide rounded-xl hover:bg-zinc-800 transition-all duration-200 flex items-center justify-center cursor-pointer border-none shadow-xs"
              >
                Add to Shopping Bag
              </button>
            </div>

            <div className="flex items-center space-x-6 pt-1 text-[11px] text-zinc-400 font-medium">
              <span className="flex items-center space-x-1.5"><Truck size={13} /><span>Complimentary Logistics Delivery</span></span>
              <span className="flex items-center space-x-1.5"><ShieldCheck size={13} /><span>Secured Authenticity Assured</span></span>
            </div>
          </div>

        </div>
      </div>

      {/* Related Dynamic Collection Shelf Section */}
      <div className="space-y-4 pt-6 border-t border-zinc-100">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">Curated Ensemble Matches</h3>
          <p className="text-xs text-zinc-400 mt-0.5">Explore corresponding matrix variants meticulously styled for modular use cases</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {product.hydratedRelatedProducts?.map((item) => (
            <div 
              key={item._id} 
              onClick={() => {
                navigate(`/product/${item._id}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white border border-zinc-100 rounded-xl p-4 shadow-2xs hover:shadow-xs transition-all duration-300 group cursor-pointer"
            >
              <div className="w-full aspect-[4/5] bg-zinc-50 rounded-lg overflow-hidden mb-3">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" />
              </div>
              <div className="space-y-1 text-xs">
                <h4 className="font-bold text-zinc-800 truncate tracking-tight group-hover:text-black transition-colors">{item.name}</h4>
                <p className="font-extrabold text-zinc-900">${Number(item.price).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}