'use client';

import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Facebook, Youtube, Linkedin, Instagram, ArrowUp, CreditCard, Smartphone, Twitter } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { useSettings } from "@/providers/SettingsProvider";
import { fetchCustomPages, type CustomPageListItem } from "@/lib/api/customPages";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { settings } = useSettings();
  const [customPages, setCustomPages] = useState<CustomPageListItem[]>([]);
  const [pagesLoading, setPagesLoading] = useState(true);

  useEffect(() => {
    fetchCustomPages()
      .then((pages) => setCustomPages(pages))
      .catch(() => {
        /* silently fail — footer links are non-critical */
      })
      .finally(() => setPagesLoading(false));
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Successfully subscribed to newsletter!");
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative">
      {/* Main Footer Content */}
      <div className="container-main py-10 sm:py-12 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-10">
          {/* Company */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image src={settings?.logo_url || "/assets/logo.png"} alt={settings?.name || "Siraj Tech"} width={150} height={56} className="h-12 sm:h-14 w-auto object-contain" />
            </div>
            <p className="text-sm leading-relaxed mb-4 sm:mb-6 text-white/80">
              {settings?.footer_description || "সিরাজ টেক লিমিটেড বাংলাদেশের অন্যতম কৃষি প্রযুক্তি কোম্পানি। ২০১২ সাল থেকে আমরা আধুনিক কৃষি সমাধান প্রদান করে আসছি।"}
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: "Facebook", icon: Facebook, href: settings?.facebook_url || "#" },
                { label: "Twitter", icon: Twitter, href: settings?.twitter_url || "#" },
                { label: "YouTube", icon: Youtube, href: settings?.youtube_url || "#" },
                { label: "Instagram", icon: Instagram, href: settings?.instagram_url || "#" },
                { label: "LinkedIn", icon: Linkedin, href: settings?.linkedin_url || "#" },
              ]
                .filter((social) => social.href !== "#")
                .map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Others Products — Dynamic from API */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4 text-base sm:text-lg">Others Products</h4>
            <ul className="space-y-2 text-sm">
              {pagesLoading ? (
                /* Subtle skeleton pulses while loading */
                Array.from({ length: 3 }).map((_, i) => (
                  <li key={i}>
                    <span className="inline-block h-4 rounded bg-white/10 animate-pulse" style={{ width: `${70 + i * 15}%` }} />
                  </li>
                ))
              ) : customPages.length > 0 ? (
                customPages
                  .filter((page) => page.slug !== 'architectural-structure-design')
                  .map((page) => (
                    <li key={page.id}>
                      <Link
                        href={`/page/${page.slug}`}
                        className="hover:text-primary transition-colors duration-200"
                      >
                        {page.title}
                      </Link>
                    </li>
                  ))
              ) : (
                /* Fallback if API returns empty */
                <li className="text-white/50 text-xs">No products available</li>
              )}
            </ul>
          </div>

          {/* Service & Help */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4 text-base sm:text-lg">Service & Help</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Services", href: "/services" },
                { label: "FAQ & Help", href: "/faq-help" },
                { label: "Become an Affiliate", href: "/become-an-affiliate" },
                { label: "Affiliate Guide", href: "https://www.facebook.com/sirajtechaffiliate/videos" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-primary transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4 text-base sm:text-lg">Information</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Shipping & Returns", href: "/shipping-returns" },
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-primary transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4 text-base sm:text-lg">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0 text-primary" />
                <span className="text-white/80">{settings?.address || "House 42, Road 5, Sector 10, Uttara, Dhaka-1230"}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="flex-shrink-0 text-primary" />
                <div className="flex flex-col">
                  <a href={`tel:${settings?.mobile?.replace(/\s/g, "") || "+8801700000000"}`} className="text-white/80 hover:text-primary transition-colors">
                    {settings?.mobile || "+880 1700-000000"}
                  </a>
                  {settings?.phone_secondary && (
                    <a href={`tel:${settings.phone_secondary.replace(/\s/g, "")}`} className="text-white/80 hover:text-primary transition-colors mt-1">
                      {settings.phone_secondary}
                    </a>
                  )}
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0 text-primary" />
                <a href={`mailto:${settings?.email || "info@sirajtech.org"}`} className="text-white/80 hover:text-primary transition-colors">
                  {settings?.email || "info@sirajtech.org"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container-main py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-center text-xs gap-3 sm:gap-2">
          <span className="text-white/70">
            {settings?.footer_text || `© ${new Date().getFullYear()} Siraj Tech Limited. All rights reserved.`}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
