'use client';

import React from 'react';
import Link from 'next/link';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useGhorerBazarCart } from '@/context/GhorerBazarCartContext';

export const CartDrawer: React.FC = () => {
  const { 
    items, 
    isCartOpen, 
    setCartOpen, 
    updateQuantity, 
    removeItem, 
    subtotal, 
    totalItems 
  } = useGhorerBazarCart();

  const FREE_SHIPPING_THRESHOLD = 2500;
  const progressPercent = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFree = FREE_SHIPPING_THRESHOLD - subtotal;

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Overlay backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        {/* Drawer Panel */}
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 animate-slide-in">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-[#fcfdfe]">
            <div className="flex items-center gap-2 text-[var(--primary)]">
              <ShoppingBag className="stroke-[2.5]" size={22} />
              <span className="font-bold text-lg">আপনার শপিং ব্যাগ ({totalItems})</span>
            </div>
            <button 
              onClick={() => setCartOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full text-gray-500 hover:text-black transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* Upsell Indicator */}
          {items.length > 0 && (
            <div className="bg-orange-50 border-b border-orange-100 p-4">
              {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                <p className="text-emerald-800 text-sm font-bold text-center">
                  🎉 অভিনন্দন! আপনি সারা দেশে ফ্রি ডেলিভারি অফারটি আনলক করেছেন!
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="text-gray-700 text-xs sm:text-sm font-semibold">
                    আর মাত্র <span className="text-[var(--primary)] font-bold">৳{remainingForFree}</span> টাকার কেনাকাটা করলেই সারা দেশে <span className="underline">ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!</span>
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[var(--primary)] h-2 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
                <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                  <ShoppingBag size={40} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">আপনার শপিং কার্ট খালি</h3>
                  <p className="text-sm text-gray-500 mt-1">আমাদের সেরা অফারগুলো দেখতে থাকুন এবং ব্যাগ ভর্তি করুন!</p>
                </div>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md transition-colors mt-2"
                >
                  কেনাকাটা করুন
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="flex gap-3 pb-4 border-b border-gray-100 items-start">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 relative shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.bnName || item.product.name}
                      className="w-full h-full object-contain p-1" 
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between h-full gap-1">
                    <div>
                      <h4 className="font-bold text-sm text-gray-800 leading-tight line-clamp-2">
                        {item.product.bnName || item.product.name}
                      </h4>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">
                        ওজন: {item.product.bnWeight || item.product.weight}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-gray-300 rounded-md bg-white">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-3 text-sm font-bold text-gray-800">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Pricing */}
                      <div className="text-right">
                        <span className="text-sm font-bold text-[var(--primary)]">
                          ৳{item.product.price * item.quantity}
                        </span>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-gray-400">
                            (৳{item.product.price} / পিস)
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => removeItem(item.product.id)}
                    className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded transition-colors"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="border-t border-gray-100 p-5 bg-[#fcfdfe] space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm text-gray-600 font-semibold">
                  <span>সর্বমোট পণ্য:</span>
                  <span>{totalItems} টি</span>
                </div>
                <div className="flex justify-between items-center text-base text-gray-800 font-bold">
                  <span>উপ-মোট (Subtotal):</span>
                  <span className="text-lg text-[var(--primary)] font-black">৳{subtotal}</span>
                </div>
                <p className="text-[11px] text-gray-400">ডেলিভারি চার্জ ও ট্যাক্স চেকআউট পেজে হিসাব করা হবে।</p>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="w-full py-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span>অর্ডার করতে এগিয়ে যান</span>
                  <ArrowRight size={18} />
                </Link>
                
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-bold text-gray-600 hover:text-black transition-colors"
                >
                  কেনাকাটা চালিয়ে যান
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
export default CartDrawer;
