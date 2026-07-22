'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--green-dark)] text-gray-300 mt-20 pt-14 pb-6 font-sans">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        
        {/* Column 1: Company Info */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-extrabold text-sm">
              GB
            </div>
            <p className="font-bold text-white tracking-wider">GHORER BAZAR</p>
          </div>
          <p className="text-xs leading-relaxed text-gray-400">
            Ghorer Bazar is an e-commerce platform dedicated to providing safe and reliable food to every home.
          </p>
          <p className="text-xs mt-3 flex items-start gap-2">
            <svg className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Rampura, Dhaka, Bangladesh
          </p>
          <p className="text-xs mt-1 flex items-center gap-2">
            <svg className="w-4 h-4 text-[var(--primary)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +8801234567890
          </p>
          <p className="text-xs mt-1 flex items-center gap-2">
            <svg className="w-4 h-4 text-[var(--primary)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            contact@ghorerbazar.com
          </p>
          <div className="flex gap-3 mt-4 text-lg">
            <a href="#" className="text-gray-400 hover:text-orange-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="18" height="18" x="3" y="3" rx="4" />
                <circle cx="12" cy="12" r="4" />
                <path d="M16.5 7.5h.01" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Information */}
        <div>
          <p className="text-white font-semibold mb-3">Information</p>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><Link href="/about" className="hover:text-orange-400">About us</Link></li>
            <li><Link href="/contact" className="hover:text-orange-400">Contact us</Link></li>
            <li><Link href="/about" className="hover:text-orange-400">Company information</Link></li>
            <li><Link href="/blog" className="hover:text-orange-400">Ghorer Bazar Stories</Link></li>
            <li><Link href="/terms" className="hover:text-orange-400">Terms & Conditions</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-orange-400">Privacy Policy</Link></li>
            <li><Link href="/about" className="hover:text-orange-400">Careers</Link></li>
          </ul>
        </div>

        {/* Column 3: Shop By */}
        <div>
          <p className="text-white font-semibold mb-3">Shop By</p>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><Link href="/?category=oil-ghee" className="hover:text-orange-400">Oil & Ghee</Link></li>
            <li><Link href="/?category=honey" className="hover:text-orange-400">Honey</Link></li>
            <li><Link href="/?category=dates" className="hover:text-orange-400">Dates</Link></li>
            <li><Link href="/?category=spices" className="hover:text-orange-400">Spices</Link></li>
            <li><Link href="/?category=nuts-seeds" className="hover:text-orange-400">Nuts & Seeds</Link></li>
            <li><Link href="/?category=beverage" className="hover:text-orange-400">Beverage</Link></li>
            <li><Link href="/?category=functional-food" className="hover:text-orange-400">Functional Foods</Link></li>
          </ul>
        </div>

        {/* Column 4: Support */}
        <div>
          <p className="text-white font-semibold mb-3">Support</p>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><Link href="/contact" className="hover:text-orange-400">Support Center</Link></li>
            <li><Link href="/faq" className="hover:text-orange-400">How to Order</Link></li>
            <li><Link href="/track-order" className="hover:text-orange-400">Order Tracking</Link></li>
            <li><Link href="/checkout" className="hover:text-orange-400">Payment</Link></li>
            <li><Link href="/shipping-returns" className="hover:text-orange-400">Shipping</Link></li>
            <li><Link href="/faq" className="hover:text-orange-400">FAQ</Link></li>
          </ul>
        </div>

        {/* Column 5: Consumer Policy */}
        <div>
          <p className="text-white font-semibold mb-3">Consumer Policy</p>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><Link href="/shipping-returns" className="hover:text-orange-400">Happy Return</Link></li>
            <li><Link href="/shipping-returns" className="hover:text-orange-400">Refund Policy</Link></li>
            <li><Link href="/shop" className="hover:text-orange-400">Pre-Order</Link></li>
            <li><Link href="/shop" className="hover:text-orange-400">Extra Discount</Link></li>
          </ul>
        </div>
      </div>

      {/* App & Payment logos */}
      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">Download App on Mobile :</span>
          <div className="bg-black text-white rounded-md px-3 py-1.5 text-[10px] flex items-center gap-1">▶ Google Play</div>
          <div className="bg-black text-white rounded-md px-3 py-1.5 text-[10px] flex items-center gap-1">App Store</div>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-gray-400 mr-1">Pay With:</span>
          <span className="bg-white text-black font-bold rounded px-2 py-1">bKash</span>
          <span className="bg-white text-black font-bold rounded px-2 py-1">VISA</span>
          <span className="bg-white text-black font-bold rounded px-2 py-1">Nagad</span>
          <span className="bg-white text-black font-bold rounded px-2 py-1">Rocket</span>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 mt-6 pt-4 text-center text-[11px] text-gray-500">
        Copyright © 2026 Ghorer Bazar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
