'use client';

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Search, User, ChevronDown, ChevronRight, LayoutDashboard, Settings, LogOut, Phone, LogIn, MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/providers/CartProvider";
import { AuthModal } from "@/components/auth/AuthModal";
import { useSettings } from "@/providers/SettingsProvider";
import { useAuth } from "@/providers/AuthProvider";
import { SearchInput } from "./SearchInput";
import { UserDropdown } from "./UserDropdown";
import Image from "next/image";

const MOBILE_HEADER_HEIGHT = "calc(3.5rem + 1px)"; /* h-11 + py-1.5*2 + 1px border */

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  {
    label: "Our Products",
    href: "/shop",
    hasDropdown: true,
    children: [
      { label: "Geotextile and Geo bags", href: "/shop/geotextile-and-geo-bags" },
      { label: "Geo growing bags for plants", href: "/shop/geo-gardening-grow-bag" },
      { label: "Garden or Agro Products", href: "/shop/gardening-item" },
      { label: "Natural coir products", href: "/shop/natural-coir-products" },
    ],
  },
  { label: "Our Design Services", href: "/page/architectural-structure-design" },
  {
    label: "House & Factory Design",
    href: "/blog/house-building-and-factory-design",
    hasDropdown: true,
    children: [
      { label: "Tin Shed House Design", href: "/blog/house-building-and-factory-design/tin-shed-house-design" },
      { label: "One Storey House Design", href: "/blog/house-building-and-factory-design/one-storey-house-design" },
      { label: "Two Storey or Duplex House Design", href: "/blog/house-building-and-factory-design/two-storey-or-duplex-house-design" },
      { label: "Three storey or Above House Design", href: "/blog/house-building-and-factory-design/three-storey-or-above-house-design" },
      { label: "Factory, Agro Farm and Industry Shed Design", href: "/blog/house-building-and-factory-design/factory-and-industry-design" },
    ],
  },
  {
    label: "Tips and Tricks",
    href: "/blog/tips-and-tricks",
    hasDropdown: true,
    children: [
      { label: "Civil Engineering & Geotextile", href: "/blog/tips-and-tricks/civil-engineering-tips-tricks" },
      { label: "Home Decor Ideas", href: "/blog/tips-and-tricks/home-decor-ideas" },
      { label: "Agro Tips And Tricks", href: "/blog/tips-and-tricks/agro-tips-and-tricks" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const linkClass =
  "px-3.5 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1 whitespace-nowrap relative after:absolute after:bottom-1 after:left-2.5 after:right-2.5 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [expandedLink, setExpandedLink] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { settings } = useSettings();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setExpandedLink(null);
  }, [pathname]);

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "#") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (href.startsWith("#")) {
      const el = document.getElementById(href.replace("#", ""));
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (href.includes("#")) {
      const [path, hash] = href.split("#");
      if (pathname === path) {
        const el = document.getElementById(hash);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.pushState(null, "", href);
        }
      }
    }
  };

  const mobileMenu = mounted && mobileOpen && (
    <>
      <div
        className="fixed inset-0 z-[100] bg-black/40 lg:hidden"
        style={{ top: MOBILE_HEADER_HEIGHT }}
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />
      <div
        className="fixed left-0 right-0 bottom-0 z-[101] bg-background lg:hidden overflow-y-auto border-t border-border shadow-lg"
        style={{ top: MOBILE_HEADER_HEIGHT }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="container-main py-4 space-y-3">
          <SearchInput className="w-full" placeholder="Search products..." onSelect={() => setMobileOpen(false)} />

          <nav className="space-y-0.5" aria-label="Mobile navigation links">
            {navLinks.map((link) => (
              <div key={link.label}>
                <div className="flex items-center">
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      smoothScroll(e, link.href);
                      if (!link.children) setMobileOpen(false);
                    }}
                    className="flex-1 py-2.5 px-2 text-sm font-medium text-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedLink((cur) => (cur === link.label ? null : link.label))
                      }
                      className="p-2 text-muted-foreground"
                      aria-label={`Toggle ${link.label} submenu`}
                      aria-expanded={expandedLink === link.label}
                    >
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${expandedLink === link.label ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>

                {link.children && expandedLink === link.label && (
                  <div className="pl-3 pb-1 space-y-0.5">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={(e) => {
                          smoothScroll(e, child.href);
                          setMobileOpen(false);
                        }}
                        className="block py-2 px-2 text-sm text-muted-foreground hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {user ? (
            <div className="pt-2 border-t border-border mt-2">
              <div className="flex items-center gap-3 p-2 mb-2 bg-muted/50 rounded-lg">
                {user.avatar_url ? (
                  <Image src={user.avatar_url} alt={user.name} width={40} height={40} className="rounded-full object-cover shrink-0 border border-border/50" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <User size={20} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5 mb-1">
                    <Phone size={12} className="text-muted-foreground shrink-0" />
                    <p className="text-xs text-muted-foreground truncate">{user.phone || user.email}</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wider">
                      {user.role}
                    </span>
                    {user.role !== 'affiliate' && user.affiliate_approved && (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700 uppercase tracking-wider">
                        Affiliate
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                {user.role === 'customer' && user.affiliate_approved ? (
                  <>
                    <Link
                      href="/dashboard/affiliate"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted hover:text-primary rounded-lg transition-colors"
                    >
                      <LayoutDashboard size={16} />
                      Affiliate Dashboard
                    </Link>
                    <Link
                      href="/dashboard/customer"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted hover:text-primary rounded-lg transition-colors"
                    >
                      <LayoutDashboard size={16} />
                      Customer Dashboard
                    </Link>
                  </>
                ) : (
                  <Link
                    href={`/dashboard/${user.role === 'wholesaler' ? 'customer' : user.role || 'customer'}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted hover:text-primary rounded-lg transition-colors"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                )}
                <Link
                  href={user.affiliate_approved ? "/dashboard/affiliate/profile" : `/dashboard/${user.role === 'wholesaler' ? 'customer' : user.role || 'customer'}/profile`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted hover:text-primary rounded-lg transition-colors"
                >
                  <Settings size={16} />
                  Profile Settings
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                    router.push("/");
                  }}
                  className="flex items-center w-full gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors text-left font-medium"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileOpen(false);
                setAuthModalOpen(true);
              }}
              className="flex items-center justify-center gap-2 w-full btn-gradient-primary text-white py-2.5 rounded-lg text-sm font-medium"
            >
              <User size={16} />
              Login / Register
            </button>
          )}
        </div>
      </div>
    </>
  );

  const mobileSearch = mounted && searchOpen && (
    <div className="fixed top-0 left-0 right-0 bg-background z-[102] lg:hidden flex flex-col shadow-md">
      <div
        className="px-3 flex items-center gap-2 border-b border-border shrink-0 py-2"
      >
        <SearchInput className="flex-1" placeholder="Search products..." autoFocus onSelect={() => setSearchOpen(false)} />
        <button
          type="button"
          onClick={() => setSearchOpen(false)}
          className="p-1.5 text-foreground hover:bg-muted rounded-full transition-colors"
          aria-label="Close search"
        >
          <X size={22} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] bg-primary text-white px-4 py-2 rounded-md text-sm font-semibold"
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-50 w-full self-start border-b border-border bg-background transition-shadow duration-200 ${scrolled ? "shadow-md" : ""
          }`}
      >
        <nav className="container-main py-2" role="navigation" aria-label="Main navigation">
          <div className="hidden lg:flex items-center justify-center h-10 border-x border-gray-200 px-2 mx-auto w-fit divide-x divide-gray-200">
            {navLinks.map((link) => (
              <div key={link.label} className="group relative">
                <Link
                  href={link.href}
                  onClick={(e) => smoothScroll(e, link.href)}
                  className={linkClass}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown
                      size={13}
                      className="text-muted-foreground group-hover:rotate-180 transition-transform duration-200"
                    />
                  )}
                </Link>

                {link.children && (
                  <div className="absolute top-full left-0 pt-1 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-[60]">
                    <div className="w-64 bg-background shadow-lg border border-border rounded-lg py-1.5">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={(e) => smoothScroll(e, child.href)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-primary hover:text-white transition-colors"
                        >
                          <ChevronRight size={13} className="opacity-60 shrink-0" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex lg:hidden items-center justify-between h-11 gap-2">
            <Link href="/" className="shrink-0 flex items-center">
              <Image src={settings?.logo_url || "/assets/logo.png"} alt={settings?.name || "Siraj Tech"} width={150} height={32} className="h-8 w-auto object-contain" priority />
            </Link>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <a
                href={`tel:${settings?.mobile || "01705175403"}`}
                className="p-2 text-foreground hover:bg-gray-100 hover:text-primary rounded-full transition-all flex items-center justify-center"
                aria-label="Call Us"
              >
                <Phone size={20} strokeWidth={2} />
              </a>
              {user ? (
                <UserDropdown />
              ) : (
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(true)}
                  className="p-2 text-foreground hover:bg-gray-100 hover:text-primary rounded-full transition-all flex items-center justify-center"
                  aria-label="Login or Register"
                >
                  <LogIn size={20} strokeWidth={2} />
                </button>
              )}
              <Link
                href="/track-order"
                className="p-2 text-foreground hover:bg-gray-100 hover:text-primary rounded-full transition-all flex items-center justify-center"
                aria-label="Track Order"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                  <path d="M14 11h4l3 4v2h-2" />
                  <path d="M14 14h6" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                  <path d="M4 17h1" />
                  <path d="M9 17h6" />
                  <path d="M4 17V8a2 2 0 0 1 2-2h1" />
                  <path d="M14 7c0 2.5-4 7.5-4 7.5S6 9.5 6 7a4 4 0 1 1 8 0z" />
                  <circle cx="10" cy="7" r="1.5" />
                </svg>
              </Link>
              <button
                type="button"
                className="p-2 text-foreground hover:bg-gray-100 hover:text-primary rounded-full transition-all flex items-center justify-center"
                aria-label="Search products"
                onClick={() => setSearchOpen(true)}
              >
                <Search size={20} strokeWidth={2} />
              </button>
              <button
                type="button"
                className="p-2 text-foreground hover:bg-gray-100 hover:text-primary rounded-full transition-all flex items-center justify-center ml-0.5 bg-gray-50/50"
                onClick={() => setMobileOpen((open) => !open)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {mounted &&
        (mobileOpen || searchOpen) &&
        createPortal(
          <>
            {mobileMenu}
            {mobileSearch}
          </>,
          document.body
        )}

      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        onSuccess={() => {
          setTimeout(() => {
            const userStr = localStorage.getItem("sirajtech_user");
            if (userStr) {
              try {
                const userData = JSON.parse(userStr);
                if (userData.affiliate_approved) {
                  router.push("/dashboard/affiliate");
                  return;
                }
              } catch (e) { }
            }
            router.push("/dashboard/customer");
          }, 50);
        }}
      />
    </>
  );
};

export default Navbar;
