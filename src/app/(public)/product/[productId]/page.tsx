'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Star, 
  ShoppingCart, 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Minus,
  Plus,
  ArrowLeft
} from 'lucide-react';
import { staticProducts } from '@/data/ghorerbazarProducts';
import { useGhorerBazarCart } from '@/context/GhorerBazarCartContext';
import ProductCard from '@/components/ghorerbazar/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem, items, updateQuantity } = useGhorerBazarCart();
  
  // The folder is [productId], so Next.js useParams will give us "productId" representing the slug
  const slug = params?.productId as string;

  // Find product in static database
  const product = useMemo(() => {
    return staticProducts.find((p) => p.slug === slug);
  }, [slug]);

  // Handle local state for gallery, quantity, tabs
  const [activeImage, setActiveImage] = useState<string>('');
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  // Initialize active image
  React.useEffect(() => {
    if (product) {
      setActiveImage(product.image);
    }
  }, [product]);

  // Related products
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return staticProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-gray-700">দুঃখিত, প্রোডাক্টটি খুঁজে পাওয়া যায়নি!</h2>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-[#1e5330] text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-[#163f24] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    );
  }

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    addItem(product, qty);
  };

  const handleBuyNow = () => {
    // Add product to cart with the current qty
    const existing = items.find(item => item.product.id === product.id);
    if (existing) {
      updateQuantity(product.id, existing.quantity + qty);
    } else {
      addItem(product, qty);
    }
    router.push('/checkout');
  };

  return (
    <div className="space-y-10 font-body">
      {/* Breadcrumbs */}
      <nav className="text-xs sm:text-sm font-semibold text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#1e5330]">হোম</Link>
        <span>/</span>
        <Link href={`/?category=${product.category}`} className="hover:text-[#1e5330]">
          {product.bnCategory}
        </Link>
        <span>/</span>
        <span className="text-gray-800 line-clamp-1">{product.bnName}</span>
      </nav>

      {/* Main product presentation grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-square bg-white rounded-3xl overflow-hidden border border-gray-100 relative shadow-sm">
            <img 
              src={activeImage || product.image} 
              alt={product.bnName} 
              className="w-full h-full object-cover"
            />
            {product.originalPrice > product.price && (
              <span className="absolute top-4 left-4 bg-[#d97706] text-white text-xs font-black px-3 py-1 rounded-full z-10 shadow-sm">
                {discountPercent}% ছাড়
              </span>
            )}
          </div>

          {/* Thumbnails Row */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto py-1">
              {product.gallery.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`w-20 h-20 bg-white rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    (activeImage || product.image) === imgUrl 
                      ? "border-[#1e5330] scale-95 shadow-md" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img src={imgUrl} alt={`${product.bnName} ${index}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information & CTAs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="inline-block text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
              {product.bnCategory}
            </span>
            <h1 className="text-xl sm:text-3xl font-black text-gray-800 leading-tight">
              {product.bnName}
            </h1>
            
            {/* Rating and Reviews */}
            <div className="flex items-center gap-2 py-1">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < Math.floor(product.rating) ? "fill-amber-500 text-amber-500" : "text-gray-300"} 
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-500">
                {product.rating} ({product.reviewCount} কাস্টমার রিভিউ)
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-[#fcfdfe] p-4 sm:p-5 rounded-2xl border border-gray-100 flex flex-col gap-1.5 shadow-xs">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-[#1e5330]">৳{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm sm:text-base text-gray-400 line-through">৳{product.originalPrice}</span>
              )}
            </div>
            {product.originalPrice > product.price && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-bold text-[#d97706] bg-[#d97706]/10 px-2 py-0.5 rounded">
                  সাশ্রয় হচ্ছে ৳{product.originalPrice - product.price}
                </span>
                <span className="text-xs text-gray-400 font-bold">ওজন: {product.bnWeight}</span>
              </div>
            )}
          </div>

          {/* Quantity selector and checkout actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-extrabold text-gray-700">পরিমাণ:</span>
              <div className="flex items-center border border-gray-300 rounded-xl bg-white h-11 overflow-hidden shadow-xs">
                <button 
                  onClick={() => setQty(prev => Math.max(1, prev - 1))}
                  className="px-4 h-full hover:bg-gray-50 text-gray-600 transition-colors"
                >
                  <Minus size={14} className="stroke-[3]" />
                </button>
                <span className="px-5 text-base font-extrabold text-gray-800">{qty}</span>
                <button 
                  onClick={() => setQty(prev => prev + 1)}
                  className="px-4 h-full hover:bg-gray-50 text-gray-600 transition-colors"
                >
                  <Plus size={14} className="stroke-[3]" />
                </button>
              </div>
            </div>

            {/* Direct Order / Cart Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <button
                onClick={handleAddToCart}
                className="h-12 border-2 border-[#1e5330] text-[#1e5330] hover:bg-[#eefcf4] rounded-xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingCart size={18} />
                <span>কার্টে যোগ করুন</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="h-12 bg-[#1e5330] hover:bg-[#163f24] text-white rounded-xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <span>অর্ডার করুন (Buy Now)</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Phone/WhatsApp Quick Order */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-gray-100 pt-5">
              <a
                href={`https://wa.me/8801800000000?text=I want to order ${product.name} (${product.weight})`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <MessageCircle size={18} className="fill-white text-emerald-600" />
                <span>হোয়াটসঅ্যাপে অর্ডার করুন</span>
              </a>

              <a
                href="tel:01800000000"
                className="h-11 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Phone size={18} className="fill-white text-amber-500" />
                <span>কল করে অর্ডার করুন: ০১৮০০-০০০০০০</span>
              </a>
            </div>
          </div>

          {/* Fast Delivery Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs text-gray-600">
            <div className="flex items-center gap-2 font-semibold">
              <Truck size={18} className="text-[#1e5330]" />
              <span>সারা দেশে ক্যাশ অন ডেলিভারি</span>
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck size={18} className="text-[#1e5330]" />
              <span>১০০% খাঁটি পণ্য গ্যারান্টি</span>
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <RotateCcw size={18} className="text-[#1e5330]" />
              <span>৭ দিনের সহজ রিটার্ন সুবিধা</span>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs section: Details / Reviews */}
      <section className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xs">
        <div className="flex border-b border-gray-100 bg-gray-50/50">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-6 py-4 font-extrabold text-sm sm:text-base border-b-2 transition-all ${
              activeTab === 'details' 
                ? "border-[#1e5330] text-[#1e5330] bg-white" 
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            পণ্যের বিবরণ (Details)
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-4 font-extrabold text-sm sm:text-base border-b-2 transition-all ${
              activeTab === 'reviews' 
                ? "border-[#1e5330] text-[#1e5330] bg-white" 
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            গ্রাহক পর্যালোচনা ({product.reviewCount})
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {activeTab === 'details' ? (
            <div className="space-y-5 text-sm sm:text-base text-gray-600 leading-relaxed">
              <p className="font-semibold text-gray-800">{product.bnDescription}</p>
              <p>{product.description}</p>
              
              {/* Benefits list */}
              {product.bnBenefits && product.bnBenefits.length > 0 && (
                <div className="space-y-3 pt-3">
                  <h3 className="font-extrabold text-gray-800 text-base">এই পণ্যের প্রধান উপকারিতা সমূহ:</h3>
                  <ul className="list-disc pl-5 space-y-1.5 font-semibold text-gray-700">
                    {product.bnBenefits.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="font-extrabold text-gray-800 text-lg">গ্রাহকদের চমৎকার প্রতিক্রিয়া</h3>
              <div className="divide-y divide-gray-100">
                <div className="py-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-800 text-sm">তানভীর আলম</span>
                    <span className="text-xs text-gray-400">২ দিন আগে</span>
                  </div>
                  <div className="flex text-amber-500">
                    🏆
                  </div>
                  <p className="text-gray-600 text-sm">
                    অর্ডার করার মাত্র ২৪ ঘণ্টার মধ্যে ডেলিভারি পেয়েছি। মধুর কোয়ালিটি সত্যিই অসাধারণ। একদম খাঁটি মধু!
                  </p>
                </div>

                <div className="py-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-800 text-sm">রাবেয়া খাতুন</span>
                    <span className="text-xs text-gray-400">১ সপ্তাহ আগে</span>
                  </div>
                  <div className="flex text-amber-500">
                    🏆
                  </div>
                  <p className="text-gray-600 text-sm">
                    প্যাকেজিং খুবই সুন্দর ও নিরাপদ ছিল। ধন্যবাদ ঘরের বাজারকে পণ্যটির আসল মান বজায় রাখার জন্য।
                  </p>
                </div>
              </div>

              {/* Review submit form */}
              <form onSubmit={(e) => { e.preventDefault(); alert("Review submitted! (Static mode)"); }} className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-4 mt-6">
                <h4 className="font-bold text-gray-800 text-sm sm:text-base">আপনার নিজস্ব প্রতিক্রিয়া লিখুন</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="আপনার নাম" required className="bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#1e5330]" />
                  <input type="email" placeholder="আপনার ইমেইল" required className="bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#1e5330]" />
                </div>
                <textarea placeholder="আপনার রিভিউ..." rows={4} required className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1e5330]" />
                <button type="submit" className="bg-[#1e5330] hover:bg-[#163f24] text-white px-6 py-2 rounded-xl text-sm font-bold transition-colors">
                  রিভিউ সাবমিট করুন
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <h2 className="text-lg sm:text-2xl font-black text-gray-800">সংশ্লিষ্ট আরও কিছু প্রোডাক্ট</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
