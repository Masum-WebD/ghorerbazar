'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product, ComboItem } from '@/data/ghorerbazarProducts';
import { useGhorerBazarCart } from '@/context/GhorerBazarCartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { items, addItem, updateQuantity } = useGhorerBazarCart();

  const cartItem = items.find((item) => item.product.id === product.id);
  const isInCart = !!cartItem;
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInCart) {
      addItem(product, 1);
    }
    router.push('/checkout');
  };

  const badgeColor = product.badgeColor || 'bg-[var(--primary)]';

  return (
    <div className="relative bg-white rounded-md card-shadow overflow-hidden flex flex-col group h-full transition duration-300">
      {/* Badge Ribbon */}
      {product.badge && (
        <span className={`absolute top-2 right-0 ${badgeColor} text-white text-[10px] font-semibold px-2.5 py-1 badge-ribbon z-10`}>
          {product.badge}
        </span>
      )}

      {/* Image Container */}
      <Link href={`/product/${product.slug}`} className="h-36 md:h-44 overflow-hidden bg-white flex items-center justify-center p-2 block">
        <img
          src={product.image}
          alt={product.bnName || product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
          loading="lazy"
        />
      </Link>

      {/* Details & Price */}
      <div className="p-3 flex flex-col gap-1 flex-1 justify-between">
        <Link href={`/product/${product.slug}`}>
          <p className="text-sm font-medium leading-snug line-clamp-2 min-h-[2.4em] text-[#222831] hover:text-[var(--primary)] transition">
            {product.bnName || product.name}
          </p>
        </Link>

        <div className="flex items-center gap-2 mt-auto">
          <span className="text-[var(--primary)] font-bold text-base">৳{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-gray-400 text-xs line-through">৳{product.originalPrice}</span>
          )}
        </div>

        {/* Buttons */}
        {isInCart ? (
          <div className="mt-2 w-full flex items-center justify-between border border-[var(--primary)] rounded-md overflow-hidden bg-orange-50 h-9">
            <button
              onClick={(e) => {
                e.preventDefault();
                updateQuantity(product.id, quantity - 1);
              }}
              className="px-3 py-1 text-[var(--primary)] font-bold hover:bg-orange-100 transition"
            >
              -
            </button>
            <span className="text-sm font-bold text-[var(--primary)]">{quantity}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                updateQuantity(product.id, quantity + 1);
              }}
              className="px-3 py-1 text-[var(--primary)] font-bold hover:bg-orange-100 transition"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="mt-2 w-full border border-[var(--primary)] text-[var(--primary)] rounded-md py-2 text-sm font-medium hover:bg-[var(--primary)] hover:text-white flex items-center justify-center gap-1.5 transition"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13 5.4 5M7 13l-2.3 4.6A1 1 0 0 0 5.6 19H17M17 19a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM9 19a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
            </svg>
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};

export const ComboCard: React.FC<{ combo: ComboItem }> = ({ combo }) => {
  const router = useRouter();
  const { addItem } = useGhorerBazarCart();

  const handleBuyCombo = (e: React.MouseEvent) => {
    e.preventDefault();
    const comboProduct: Product = {
      id: combo.id,
      slug: combo.id,
      name: combo.title,
      bnName: combo.title,
      category: 'combos',
      bnCategory: 'কম্বো অফার',
      price: combo.numericPrice,
      originalPrice: combo.numericOldPrice,
      weight: 'Combo',
      bnWeight: 'কম্বো প্যাক',
      image: combo.img,
      gallery: [combo.img],
      rating: 5,
      reviewCount: 50,
      description: combo.title,
      bnDescription: combo.title,
      benefits: ['বিশেষ মূল্যছাড়'],
      bnBenefits: ['বিশেষ মূল্যছাড়'],
      stock: 20
    };
    addItem(comboProduct, 1);
    router.push('/checkout');
  };

  return (
    <div className="relative bg-white rounded-md overflow-hidden flex flex-col h-full group" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
      <span className="absolute top-0 left-0 bg-green-600 text-white text-[10px] font-bold px-2.5 py-1 z-10">Save {combo.save}</span>
      <span className="absolute top-0 right-0 bg-[var(--primary)] text-white text-[10px] font-bold px-2.5 py-1 z-10">Combo Offer</span>
      <div className="h-40 md:h-48 overflow-hidden bg-white flex items-center justify-center p-4 pt-7">
        <img src={combo.img} alt={combo.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <p className="text-sm font-bold leading-snug line-clamp-2 min-h-[2.8em] text-[#222831]">{combo.title}</p>
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-[var(--primary)] font-bold text-base">{combo.price}</span>
          <span className="text-gray-400 text-xs line-through">{combo.oldPrice}</span>
        </div>
        <button onClick={handleBuyCombo} className="mt-2 w-full bg-[var(--primary)] text-white rounded-md py-2 text-sm font-semibold hover:bg-[var(--primary-dark)] transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
