'use client';

import React from 'react';
import Link from 'next/link';
import { useGhorerBazarCart } from '@/context/GhorerBazarCartContext';

export const FloatingWidgets: React.FC = () => {
  const { totalItems, subtotal, setCartOpen } = useGhorerBazarCart();

  return (
    <>
      {/* Floating Right Cart Button */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed top-1/2 -translate-y-1/2 right-0 z-[55] flex flex-col items-stretch shadow-[-2px_2px_10px_rgba(0,0,0,0.15)] rounded-l-lg overflow-hidden transition-transform hover:scale-[1.02] origin-right cursor-pointer font-sans"
        aria-label="Open Cart Drawer"
      >
        {/* Top part (Orange) */}
        <div className="bg-[var(--primary)] text-white px-3 py-2.5 flex flex-col items-center justify-center gap-1.5 min-w-[70px]">
          <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <span className="text-xs font-medium whitespace-nowrap">{totalItems} Items</span>
        </div>
        {/* Bottom part (White) */}
        <div className="bg-white text-[var(--primary)] p-2 flex items-center justify-center text-[13px] font-bold">
          ৳{subtotal.toFixed(2)}
        </div>
      </button>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--primary)] text-white z-50 flex justify-between items-center px-1 py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] font-sans">
        <Link href="/" className="flex flex-col items-center justify-center w-1/5 gap-1">
          <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span className="text-[10px] font-medium uppercase">Home</span>
        </Link>
        <Link href="/shop" className="flex flex-col items-center justify-center w-1/5 gap-1">
          <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
          </svg>
          <span className="text-[10px] font-medium uppercase">Menu</span>
        </Link>
        <button onClick={() => setCartOpen(true)} className="flex flex-col items-center justify-center w-1/5 gap-1 relative">
          <div className="relative">
            <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {totalItems}
            </span>
          </div>
          <span className="text-[10px] font-medium uppercase">Cart</span>
        </button>
        <Link href="/shop" className="flex flex-col items-center justify-center w-1/5 gap-1">
          <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <span className="text-[10px] font-medium uppercase">Search</span>
        </Link>
        <Link href="/login" className="flex flex-col items-center justify-center w-1/5 gap-1">
          <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          <span className="text-[10px] font-medium uppercase">Account</span>
        </Link>
      </div>
    </>
  );
};
export default FloatingWidgets;
