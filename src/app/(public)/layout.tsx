import React from 'react';
import { GhorerBazarCartProvider } from '@/context/GhorerBazarCartContext';
import Header from '@/components/ghorerbazar/Header';
import Footer from '@/components/ghorerbazar/Footer';
import CartDrawer from '@/components/ghorerbazar/CartDrawer';
import FloatingWidgets from '@/components/ghorerbazar/FloatingWidgets';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GhorerBazarCartProvider>
      <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-[#25302b] font-sans antialiased">
        <Header />
        
        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4">
          {children}
        </main>

        <CartDrawer />
        <FloatingWidgets />
        <Footer />
      </div>
    </GhorerBazarCartProvider>
  );
}
