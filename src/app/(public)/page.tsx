'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  topSellingProducts, 
  honeyProducts, 
  comboItems, 
  datesProducts, 
  cookingProducts, 
  organicProducts, 
  categories, 
  brandItems, 
  reviewItems,
  staticProducts,
  Product
} from '@/data/ghorerbazarProducts';
import ProductCard, { ComboCard } from '@/components/ghorerbazar/ProductCard';
import { useGhorerBazarCart } from '@/context/GhorerBazarCartContext';

// Swiper React Components & Modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function GhorerBazarHome() {
  const router = useRouter();
  const { addItem, updateQuantity, items } = useGhorerBazarCart();

  const heroSlides = [
    'https://backoffice.ghorerbazar.com/banner/wvLKI1771837751.jpeg',
    'https://backoffice.ghorerbazar.com/banner/5vlkL1778734911-dark-1000x400.png',
    'https://backoffice.ghorerbazar.com/banner/sCUkg1774768074-dark.png'
  ];

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
  };

  const handleBuyNow = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    router.push('/checkout');
  };

  return (
    <div className="space-y-10 pb-12 font-sans text-[#25302b]">
      
      {/* ================= 1. HERO SECTION ================= */}
      <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mt-5">
        <div className="heroSwiper relative h-[250px] md:h-[360px] rounded-2xl overflow-hidden shadow-sm">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            className="w-full h-full"
          >
            {heroSlides.map((imgUrl, idx) => (
              <SwiperSlide key={idx} className="w-full h-full">
                <img
                  src={imgUrl}
                  alt={`Slide ${idx + 1}`}
                  className="w-full h-full object-cover block"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Side Promo Image (Desktop) */}
        <div className="relative rounded-2xl overflow-hidden h-[250px] md:h-[360px] hidden md:block shadow-sm">
          <img
            src="https://backoffice.ghorerbazar.com/banner/jqg0K1783142403-500x410.png"
            alt="Hero Side Banner"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ================= 2. FEATURED CATEGORIES ================= */}
      <section className="mt-10">
        <h2 className="text-center text-xl md:text-2xl font-bold text-[var(--green-dark)] mb-6">
          Featured Categories
        </h2>
        <div className="flex items-center gap-3">
          {/* Swiper */}
          <div className="catSwiper flex-1 overflow-hidden">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                nextEl: '.cat-btn-next',
                prevEl: '.cat-btn-prev',
              }}
              spaceBetween={20}
              breakpoints={{
                320: { slidesPerView: 3, spaceBetween: 12 },
                480: { slidesPerView: 3, spaceBetween: 20 },
                640: { slidesPerView: 4, spaceBetween: 24 },
                768: { slidesPerView: 5, spaceBetween: 24 },
                1024: { slidesPerView: 6, spaceBetween: 30 },
                1280: { slidesPerView: 7, spaceBetween: 30 },
              }}
            >
              {categories.filter(c => c.id !== 'all').map((cat) => (
                <SwiperSlide key={cat.id}>
                  <Link href={`/?category=${cat.id}`} className="flex flex-col items-center gap-2 group">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white rounded-2xl card-shadow flex items-center justify-center p-2 group-hover:scale-105 transition">
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xs font-semibold text-center text-[var(--ink)]">
                      {cat.name}
                    </span>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ================= 3. TOP SELLING PRODUCTS ================= */}
      <section className="mt-14">
        <h2 className="text-center text-xl md:text-2xl font-bold text-[var(--green-dark)]">
          Top Selling Products
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          {topSellingProducts.map((prod) => {
            const cartItem = items.find((i) => i.product.id === prod.id);
            const quantity = cartItem ? cartItem.quantity : 0;

            return (
              <div
                key={prod.id}
                className="relative h-fit bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-stretch md:items-center gap-0 md:gap-6 border border-gray-100 transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)] overflow-hidden md:overflow-visible group"
              >
                {/* Badge if available */}
                {prod.badge && (
                  <div className="absolute top-0 md:top-4 right-0 md:right-4 bg-[#ff4d4f] text-white text-[9px] md:text-[11px] font-bold px-2 md:px-3 py-1 rounded-bl-xl rounded-tr-xl md:rounded-tr-none flex items-center gap-1 shadow-sm z-10">
                    <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                    </svg>
                    {prod.badge}
                  </div>
                )}

                {/* Image */}
                <div className="w-full md:w-[260px] md:h-[260px] shrink-0 bg-white flex items-center justify-center p-4 md:p-2">
                  <img
                    src={prod.image}
                    className="w-full h-40 md:h-full object-contain group-hover:scale-105 transition duration-300"
                    alt={prod.bnName}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 w-full text-left p-4 md:p-2 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium md:font-semibold text-[14px] md:text-[17px] text-gray-800 leading-tight md:leading-snug h-10 md:h-auto overflow-hidden">
                      {prod.bnName}
                    </h3>

                    {/* Pricing */}
                    <div className="flex items-center justify-start gap-2 mt-2">
                      <span className="text-[var(--primary)] font-bold text-[15px] md:text-lg">৳{prod.price}</span>
                      {prod.originalPrice > prod.price && (
                        <span className="text-gray-400 text-[13px] md:text-sm line-through">৳{prod.originalPrice}</span>
                      )}
                      {prod.saveText && (
                        <span className="bg-[#a3e635] text-green-900 text-[10px] md:text-[11px] font-bold px-2 py-0.5 rounded-full">
                          {prod.saveText}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-start gap-2 md:gap-3 mt-3 md:mt-5">
                    {quantity > 0 ? (
                      <div className="flex items-center justify-between border border-[var(--primary)] rounded px-3 py-1.5 bg-orange-50 w-full md:w-auto">
                        <button onClick={() => updateQuantity(prod.id, quantity - 1)} className="font-bold text-[var(--primary)] text-sm px-2">-</button>
                        <span className="font-bold text-[var(--primary)] text-sm">{quantity}</span>
                        <button onClick={() => updateQuantity(prod.id, quantity + 1)} className="font-bold text-[var(--primary)] text-sm px-2">+</button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => handleAddToCart(prod, e)}
                        className="w-full md:w-auto md:flex-none border border-[var(--primary)] text-[var(--primary)] hover:bg-orange-50 font-medium text-[13px] px-4 py-2 rounded flex items-center justify-center gap-2 transition"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13 5.4 5M7 13l-2.3 4.6A1 1 0 0 0 5.6 19H17M17 19a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM9 19a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                        </svg>
                        Add To Cart
                      </button>
                    )}

                    <button
                      onClick={(e) => handleBuyNow(prod, e)}
                      className="hidden md:flex w-full md:w-auto md:flex-none bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] font-medium text-[13px] px-4 py-2 rounded items-center justify-center gap-2 transition"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13 5.4 5M7 13l-2.3 4.6A1 1 0 0 0 5.6 19H17M17 19a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM9 19a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                      </svg>
                      Buy now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= 4. OUR BRANDS ================= */}
      <section className="mt-14">
        <div className="flex items-end justify-between border-b border-gray-200 pb-2 mb-6">
          <div className="relative">
            <h2 className="font-bold text-[17px] text-[var(--green-dark)] pb-2">Our Brands</h2>
            <div className="absolute bottom-[-2px] left-0 w-10 h-[2px] bg-[var(--primary)] z-10"></div>
          </div>
          <Link href="/shop" className="text-[11px] font-semibold text-[var(--primary)] hover:underline uppercase mb-2 flex items-center gap-1 tracking-widest">
            SEE ALL
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="brandSwiper overflow-hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={16}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 12 },
              640: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 4, spaceBetween: 24 },
              1024: { slidesPerView: 5, spaceBetween: 24 },
            }}
          >
            {brandItems.map((brand) => (
              <SwiperSlide key={brand.id}>
                <Link
                  href={brand.link}
                  className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center justify-center h-[90px] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all p-4 block"
                >
                  <img src={brand.logo} alt={brand.name} className="h-full object-contain" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ================= 5. ALL NATURAL HONEY ================= */}
      <section className="mt-14">
        <div className="flex items-center justify-between border-b border-orange-200 pb-2 mb-5">
          <h2 className="font-bold text-lg text-[var(--green-dark)] border-l-4 border-[var(--primary)] pl-3">
            All Natural Honey
          </h2>
          <Link href="/?category=honey" className="text-xs font-semibold text-[var(--primary)] hover:underline">
            VIEW ALL ITEMS →
          </Link>
        </div>
        <div className="productSwiperWrap">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            spaceBetween={12}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 10 },
              480: { slidesPerView: 2, spaceBetween: 14 },
              640: { slidesPerView: 3, spaceBetween: 16 },
              768: { slidesPerView: 4, spaceBetween: 18 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
            }}
            className="pb-10"
          >
            {honeyProducts.map((prod) => (
              <SwiperSlide key={prod.id} className="h-auto">
                <ProductCard product={prod} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ================= 6. EXCLUSIVE COMBO DEALS ================= */}
      <section className="mt-14 bg-[#fff8f2] rounded-2xl overflow-hidden border border-orange-100">
        <div className="flex items-center justify-between px-5 py-4 border-b border-orange-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[var(--primary)] rounded-md flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
              </svg>
            </div>
            <h2 className="font-bold text-lg text-[var(--green-dark)]">Exclusive Combo Deals</h2>
          </div>
          <Link href="/?category=combos" className="bg-[var(--primary)] text-white text-xs font-semibold rounded-md px-4 py-2 hover:bg-[var(--primary-dark)] transition">
            View All Combos →
          </Link>
        </div>
        <div className="p-5 pb-2">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={14}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 3, spaceBetween: 16 },
              768: { slidesPerView: 4, spaceBetween: 18 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
            }}
            className="pb-10"
          >
            {comboItems.map((combo) => (
              <SwiperSlide key={combo.id} className="h-auto">
                <ComboCard combo={combo} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ================= 7. PREMIUM DATES ================= */}
      <section className="mt-14">
        <div className="flex items-center justify-between border-b border-orange-200 pb-2 mb-5">
          <h2 className="font-bold text-lg text-[var(--green-dark)] border-l-4 border-[var(--primary)] pl-3">
            Premium Dates
          </h2>
          <Link href="/?category=dates" className="text-xs font-semibold text-[var(--primary)] hover:underline">
            VIEW ALL ITEMS →
          </Link>
        </div>
        <div className="productSwiperWrap">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            spaceBetween={12}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 3, spaceBetween: 16 },
              768: { slidesPerView: 4, spaceBetween: 18 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
            }}
            className="pb-10"
          >
            {datesProducts.map((prod) => (
              <SwiperSlide key={prod.id} className="h-auto">
                <ProductCard product={prod} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ================= 8. MID PROMO BANNER ================= */}
      <section className="mt-14 relative rounded-2xl overflow-hidden h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] shadow-sm">
        <img
          src="https://backoffice.ghorerbazar.com/banner/VHvkJ1778740858-4000x1040.jpg"
          className="w-full h-full object-cover"
          alt="Mid Banner Offer"
        />
      </section>

      {/* ================= 9. COOKING ESSENTIALS ================= */}
      <section className="mt-14">
        <div className="flex items-center justify-between border-b border-orange-200 pb-2 mb-5">
          <h2 className="font-bold text-lg text-[var(--green-dark)] border-l-4 border-[var(--primary)] pl-3">
            Cooking Essentials
          </h2>
          <Link href="/?category=spices" className="text-xs font-semibold text-[var(--primary)] hover:underline">
            VIEW ALL ITEMS →
          </Link>
        </div>
        <div className="productSwiperWrap">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            spaceBetween={12}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 3, spaceBetween: 16 },
              768: { slidesPerView: 4, spaceBetween: 18 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
            }}
            className="pb-10"
          >
            {cookingProducts.map((prod) => (
              <SwiperSlide key={prod.id} className="h-auto">
                <ProductCard product={prod} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ================= 10. ORGANIC CERTIFIED ================= */}
      <section className="mt-14">
        <div className="flex items-center justify-between border-b border-orange-200 pb-2 mb-5">
          <h2 className="font-bold text-lg text-[var(--green-dark)] border-l-4 border-[var(--primary)] pl-3">
            Organic Certified
          </h2>
          <Link href="/?category=organic" className="text-xs font-semibold text-[var(--primary)] hover:underline">
            VIEW ALL ITEMS →
          </Link>
        </div>
        <div className="productSwiperWrap">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            spaceBetween={12}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 3, spaceBetween: 16 },
              768: { slidesPerView: 4, spaceBetween: 18 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
            }}
            className="pb-10"
          >
            {organicProducts.map((prod) => (
              <SwiperSlide key={prod.id} className="h-auto">
                <ProductCard product={prod} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ================= 11. JUST FOR YOU ================= */}
      <section className="mt-14">
        <div className="flex items-center justify-between border-b border-orange-200 pb-2 mb-5">
          <h2 className="font-bold text-lg text-[var(--green-dark)] border-l-4 border-[var(--primary)] pl-3">
            Just For You
          </h2>
          <Link href="/shop" className="text-xs font-semibold text-[var(--primary)] hover:underline">
            VIEW ALL PRODUCTS →
          </Link>
        </div>
        <div className="productSwiperWrap">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            spaceBetween={12}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 3, spaceBetween: 16 },
              768: { slidesPerView: 4, spaceBetween: 18 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
            }}
            className="pb-10"
          >
            {staticProducts.map((prod) => (
              <SwiperSlide key={`jfy-${prod.id}`} className="h-auto">
                <ProductCard product={prod} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ================= 12. CUSTOMER REVIEWS ================= */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
        {reviewItems.map((rev) => (
          <div key={rev.id} className="bg-white rounded-2xl card-shadow p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center text-orange-400 gap-0.5">
                {[...Array(rev.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="bn text-sm text-gray-600 mt-2 leading-relaxed font-sans">
                {rev.comment}
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4">
              {rev.avatar ? (
                <img src={rev.avatar} alt={rev.name} className="w-9 h-9 rounded-full object-cover" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-sm">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold text-gray-800">{rev.name}</p>
                <p className="text-[10px] text-gray-400">{rev.designation}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}
