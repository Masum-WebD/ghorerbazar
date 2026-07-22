'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGhorerBazarCart } from '@/context/GhorerBazarCartContext';
import { categories } from '@/data/ghorerbazarProducts';

export const Header: React.FC = () => {
  const { totalItems, setCartOpen } = useGhorerBazarCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleSubmenu = (menuName: string) => {
    setExpandedSubmenu(prev => (prev === menuName ? null : menuName));
  };

  return (
    <>
      {/* ================= HEADER TOP & NAV ================= */}
      <header className="bg-white sticky top-0 z-40 border-b border-orange-100 font-sans">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between md:justify-start gap-4 md:gap-6">
          
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden text-gray-700 hover:text-[var(--primary)] shrink-0 transition-colors"
            aria-label="Open Mobile Menu"
          >
            <svg className="w-7 h-7" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24">
              <path d="M21 17.9995V19.9995H3V17.9995H21ZM17.4038 3.90332L22 8.49951L17.4038 13.0957L15.9896 11.6815L19.1716 8.49951L15.9896 5.31753L17.4038 3.90332ZM12 10.9995V12.9995H3V10.9995H12ZM12 3.99951V5.99951H3V3.99951H12Z"></path>
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <img
              src="https://backoffice.ghorerbazar.com/company_logo/qJaKf1768887846.png"
              alt="Ghorer Bazar Logo"
              className="h-9 md:h-12 object-contain"
            />
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="flex-1 hidden md:flex justify-center">
            <form onSubmit={handleSearch} className="w-full max-w-[450px] relative">
              <input
                type="text"
                placeholder="Search in..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f5f5f5] border border-transparent rounded-full py-2.5 pl-5 pr-12 text-sm focus:outline-none focus:ring-0 focus:border-[var(--primary)] transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bg-[var(--primary)] hover:bg-[var(--primary-dark)] transition text-white w-8 h-8 rounded-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </form>
          </div>

          {/* Mobile Right Icons */}
          <div className="flex lg:hidden items-center gap-5 sm:gap-6 text-gray-700 shrink-0">
            <Link href="/track-order" className="hover:text-[var(--primary)] transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </Link>
            <Link href="/login" className="hover:text-[var(--primary)] transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </Link>
            <button onClick={() => setCartOpen(true)} className="relative hover:text-[var(--primary)] transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              <span className="absolute -top-1.5 -right-2 bg-[var(--primary)] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            </button>
          </div>

          {/* Desktop Nav Actions */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[var(--green-dark)] shrink-0">
            <Link href="/track-order" className="flex flex-col items-center gap-1 hover:text-[var(--primary)] transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              Track Order
            </Link>
            <Link href="/login" className="flex flex-col items-center gap-1 hover:text-[var(--primary)] transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              Sign in
            </Link>
            <Link href="/wishlist" className="flex flex-col items-center gap-1 hover:text-[var(--primary)] transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              Wishlist
            </Link>
            <button onClick={() => setCartOpen(true)} className="relative flex flex-col items-center gap-1 hover:text-[var(--primary)] transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              <span className="absolute -top-1 -right-2 bg-[var(--primary)] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
              Cart
            </button>
          </nav>
        </div>

        {/* Category Navigation Sub-Bar (Dark Green) */}
        <div className="bg-[var(--green-dark)] text-white py-1">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center gap-6 text-[13px] font-medium overflow-x-auto md:overflow-visible scrollbar-none whitespace-nowrap">
              <li><Link href="/?category=combos" className="hover:text-orange-300 py-3 block">Combos</Link></li>
              <li><Link href="/?category=offer-zone" className="hover:text-orange-300 py-3 block">Offer Zone</Link></li>

              {/* Honey Dropdown */}
              <li className="relative group">
                <Link href="/?category=honey" className="hover:text-orange-300 py-3 flex items-center gap-1 cursor-pointer">
                  Honey <svg className="w-3 h-3 transition-transform group-hover:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </Link>
                <ul className="absolute top-full left-0 bg-white shadow-lg w-44 z-50 hidden group-hover:block border-t-2 border-[var(--primary)]">
                  <li><Link href="/?category=honey" className="block px-4 py-2.5 text-gray-700 text-sm hover:bg-[var(--primary)] hover:text-white transition">Sundarban Honey</Link></li>
                  <li><Link href="/?category=honey" className="block px-4 py-2.5 text-gray-700 text-sm hover:bg-[var(--primary)] hover:text-white transition">Black Seed Honey</Link></li>
                </ul>
              </li>

              <li><Link href="/?category=oil-ghee" className="hover:text-orange-300 py-3 block">Oil & Ghee</Link></li>

              {/* Dates Dropdown */}
              <li className="relative group">
                <Link href="/?category=dates" className="hover:text-orange-300 py-3 flex items-center gap-1 cursor-pointer">
                  Dates <svg className="w-3 h-3 transition-transform group-hover:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </Link>
                <ul className="absolute top-full left-0 bg-white shadow-lg w-40 z-50 hidden group-hover:block border-t-2 border-[var(--primary)]">
                  <li><Link href="/?category=dates" className="block px-4 py-2.5 text-gray-700 text-sm hover:bg-[var(--primary)] hover:text-white transition">Ajwa Dates</Link></li>
                  <li><Link href="/?category=dates" className="block px-4 py-2.5 text-gray-700 text-sm hover:bg-[var(--primary)] hover:text-white transition">Medjool Dates</Link></li>
                </ul>
              </li>

              {/* Spices Dropdown */}
              <li className="relative group">
                <Link href="/?category=spices" className="hover:text-orange-300 py-3 flex items-center gap-1 cursor-pointer">
                  Spices <svg className="w-3 h-3 transition-transform group-hover:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </Link>
                <ul className="absolute top-full left-0 bg-white shadow-lg w-40 z-50 hidden group-hover:block border-t-2 border-[var(--primary)]">
                  <li><Link href="/?category=spices" className="block px-4 py-2.5 text-gray-700 text-sm hover:bg-[var(--primary)] hover:text-white transition">Turmeric Powder</Link></li>
                  <li><Link href="/?category=spices" className="block px-4 py-2.5 text-gray-700 text-sm hover:bg-[var(--primary)] hover:text-white transition">Chili Powder</Link></li>
                </ul>
              </li>

              {/* Nuts & Seeds Dropdown */}
              <li className="relative group">
                <Link href="/?category=nuts-seeds" className="hover:text-orange-300 py-3 flex items-center gap-1 cursor-pointer">
                  Nuts & Seeds <svg className="w-3 h-3 transition-transform group-hover:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </Link>
                <ul className="absolute top-full left-0 bg-white shadow-lg w-48 z-50 hidden group-hover:block border-t-2 border-[var(--primary)]">
                  <li><Link href="/?category=nuts-seeds" className="block px-4 py-2.5 text-gray-700 text-sm hover:bg-[var(--primary)] hover:text-white transition">Cashew Nuts</Link></li>
                  <li><Link href="/?category=nuts-seeds" className="block px-4 py-2.5 text-gray-700 text-sm hover:bg-[var(--primary)] hover:text-white transition">Chia Seeds</Link></li>
                </ul>
              </li>

              {/* Beverage Dropdown */}
              <li className="relative group">
                <Link href="/?category=beverage" className="hover:text-orange-300 py-3 flex items-center gap-1 cursor-pointer">
                  Beverage <svg className="w-3 h-3 transition-transform group-hover:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </Link>
                <ul className="absolute top-full left-0 bg-white shadow-lg w-32 z-50 hidden group-hover:block border-t-2 border-[var(--primary)]">
                  <li><Link href="/?category=beverage" className="block px-4 py-2.5 text-gray-700 text-sm hover:bg-[var(--primary)] hover:text-white transition">Tea</Link></li>
                  <li><Link href="/?category=beverage" className="block px-4 py-2.5 text-gray-700 text-sm hover:bg-[var(--primary)] hover:text-white transition">Coffee</Link></li>
                </ul>
              </li>

              <li><Link href="/?category=rice" className="hover:text-orange-300 py-3 block">Rice</Link></li>
              <li><Link href="/?category=flours-lentils" className="hover:text-orange-300 py-3 block">Flours & Lentils</Link></li>
              <li><Link href="/?category=organic" className="hover:text-orange-300 py-3 block">Certified</Link></li>
              <li><Link href="/?category=pickle" className="hover:text-orange-300 py-3 block">Pickle</Link></li>
              <li><Link href="/?category=tabaya" className="hover:text-orange-300 py-3 block">Tabaya</Link></li>
            </ul>
          </div>
        </div>
      </header>

      {/* ================= MOBILE SIDEBAR DRAWER ================= */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-[60] flex">
          {/* Overlay */}
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 transition-opacity"
          />

          {/* Sidebar Drawer */}
          <div className="relative w-[280px] max-w-[80%] h-full bg-white shadow-xl overflow-y-auto flex flex-col z-10 animate-slide-in">
            {/* Orange Signin Header */}
            <div className="p-4 bg-white sticky top-0 z-10 border-b border-gray-100">
              <Link
                href="/login"
                onClick={() => setMobileSidebarOpen(false)}
                className="bg-[var(--primary)] rounded-lg p-3.5 flex items-center gap-3 text-white"
              >
                <div className="w-10 h-10 bg-orange-300 rounded-full flex items-center justify-center overflow-hidden shrink-0 border-2 border-white/20">
                  <svg className="w-8 h-8 text-white mt-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-[15px] leading-tight">Hello there!</div>
                  <div className="text-sm">Signin</div>
                </div>
              </Link>
            </div>

            {/* Mobile Categories List */}
            <div className="px-4 py-4 flex-1">
              <div className="bg-[#f9f9f9] rounded-lg border border-gray-100 overflow-hidden">
                <ul className="text-[13px] text-gray-700 font-medium">
                  {categories.map((cat) => (
                    <li key={cat.id} className="border-b border-gray-200 last:border-0">
                      <Link
                        href={`/?category=${cat.id}`}
                        onClick={() => setMobileSidebarOpen(false)}
                        className="block p-3 hover:text-[var(--primary)]"
                      >
                        {cat.bnName} ({cat.name})
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-600 text-sm mb-2 px-1">Quick Links</h4>
                <div className="w-8 h-0.5 bg-[var(--primary)] mb-3 mx-1"></div>
                <div className="bg-[#f9f9f9] rounded-lg border border-gray-100 overflow-hidden p-2">
                  <ul className="text-[13px] text-gray-700 space-y-1">
                    <li>
                      <Link href="/about" onClick={() => setMobileSidebarOpen(false)} className="flex items-center gap-3 p-2 hover:text-[var(--primary)]">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/wishlist" onClick={() => setMobileSidebarOpen(false)} className="flex items-center gap-3 p-2 hover:text-[var(--primary)]">
                        Wishlist
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq" onClick={() => setMobileSidebarOpen(false)} className="flex items-center gap-3 p-2 hover:text-[var(--primary)]">
                        FAQs
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
