'use client';

import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ScrollToTop from "@/components/layout/ScrollToTop";
import CartSidebar from "@/components/layout/CartSidebar";
import { useCart } from "@/providers/CartProvider";

export default function PublicLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setIsCartOpen } = useCart();

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
      <ScrollToTop />
      <Topbar />
      <Navbar />
      <main className="flex-1" id="main-content">
        {children}
      </main>
      <Footer />
      <MobileBottomBar onCartClick={() => setIsCartOpen(true)} />
      <CartSidebar />
      <WhatsAppButton />
    </div>
  );
}
