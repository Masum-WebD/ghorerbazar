'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, ShoppingCart, LogIn, User } from "lucide-react";
import { useCart } from "@/providers/CartProvider";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";

interface MobileBottomBarProps {
  onCartClick?: () => void;
}

const MobileBottomBar = ({ onCartClick }: MobileBottomBarProps) => {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { user } = useAuth();
  
  // Hide on dashboard pages
  if (pathname.startsWith("/dashboard")) return null;

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      id: "mobile-nav-home",
    },
    {
      label: "Shop",
      href: "/shop",
      icon: ShoppingBag,
      id: "mobile-nav-shop",
    },
    {
      label: "Cart",
      icon: ShoppingCart,
      badge: totalItems > 0 ? totalItems : null,
      id: "mobile-nav-cart",
      action: onCartClick,
    },
    {
      label: user ? "Account" : "Login",
      href: user ? "/dashboard" : "/login",
      icon: user ? User : LogIn,
      id: "mobile-nav-login",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Bottom Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        aria-label="Mobile navigation"
      >
        {/* Frosted glass backdrop */}
        <div
          className="absolute inset-0 rounded-t-2xl overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            boxShadow: "0 -4px 30px rgba(0,0,0,0.08), 0 -1px 0 rgba(0,0,0,0.06)",
          }}
        />

        {/* Nav items */}
        <div className="relative flex items-stretch h-[68px] px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.href ? isActive(item.href) : false;
            const isCartButton = item.action;

            const content = (
              <>
                {/* Active indicator pill */}
                {active && (
                  <span
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-1 rounded-b-full"
                    style={{
                      background: "hsl(145 63% 32%)",
                      boxShadow: "0 2px 8px hsl(145 63% 32% / 0.4)",
                    }}
                  />
                )}

                {/* Icon container */}
                <span
                  className="relative flex items-center justify-center w-11 h-8 rounded-xl transition-all duration-300"
                  style={
                    active
                      ? {
                          background: "hsl(145 63% 32% / 0.1)",
                          transform: "translateY(-2px)",
                        }
                      : {}
                  }
                >
                  <Icon
                    size={22}
                    strokeWidth={active ? 2.2 : 1.8}
                    style={{
                      color: active ? "hsl(145 63% 28%)" : "hsl(210 10% 55%)",
                      transition: "color 0.25s, transform 0.25s",
                      transform: active ? "scale(1.1)" : "scale(1)",
                    }}
                  />

                  {/* Cart badge */}
                  {item.badge && (
                    <span
                      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-white text-[10px] font-bold leading-none px-1"
                      style={{
                        background: "hsl(145 63% 32%)",
                        boxShadow: "0 2px 6px hsl(145 63% 32% / 0.5)",
                        animation: "badge-pop 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                      }}
                    >
                      {item.badge > 99 ? "99+" : item.badge}
                    </span>
                  )}
                </span>

                {/* Label */}
                <span
                  className="text-[10.5px] font-semibold tracking-wide transition-colors duration-200"
                  style={{
                    color: active ? "hsl(145 63% 28%)" : "hsl(210 10% 55%)",
                    fontFamily: "'Nunito Sans', sans-serif",
                  }}
                >
                  {item.label}
                </span>
              </>
            );

            if (isCartButton) {
              return (
                <button
                  key={item.id}
                  id={item.id}
                  onClick={item.action}
                  className="mobile-nav-item flex-1 flex flex-col items-center justify-center gap-0.5 relative group bg-transparent border-none cursor-pointer"
                  aria-label={item.label}
                >
                  {content}
                </button>
              );
            }

            return (
              <Link
                key={item.id}
                id={item.id}
                href={item.href || "#"}
                className="mobile-nav-item flex-1 flex flex-col items-center justify-center gap-0.5 relative group"
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
              >
                {content}
              </Link>
            );
          })}
        </div>

        {/* Safe area for phones with home indicator */}
        <div className="h-safe-area-bottom bg-transparent" />
      </nav>

      <style>{`
        @keyframes badge-pop {
          0%   { transform: scale(0.5); opacity: 0; }
          70%  { transform: scale(1.2); }
          100% { transform: scale(1);   opacity: 1; }
        }
        .mobile-nav-item:active > span {
          transform: scale(0.92) translateY(-2px);
        }
        @supports(padding-bottom: env(safe-area-inset-bottom)) {
          nav.fixed.bottom-0 {
            padding-bottom: env(safe-area-inset-bottom);
          }
        }
      `}</style>
    </>
  );
};

export default MobileBottomBar;
