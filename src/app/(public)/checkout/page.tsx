'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, 
  MapPin, 
  Phone, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  CreditCard,
  Truck,
  Building,
  Check,
  ChevronLeft
} from 'lucide-react';
import { useGhorerBazarCart } from '@/context/GhorerBazarCartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, totalItems } = useGhorerBazarCart();

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('ঢাকা');
  const [upazila, setUpazila] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash'>('cod');
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  // Shipping Fee Logic
  const shippingFee = useMemo(() => {
    if (subtotal >= 2500 || subtotal === 0) return 0;
    return district === 'ঢাকা' ? 80 : 150;
  }, [district, subtotal]);

  // Grand Total Calculation
  const grandTotal = useMemo(() => {
    return Math.max(0, subtotal + shippingFee - appliedDiscount);
  }, [subtotal, shippingFee, appliedDiscount]);

  // List of key districts for selector
  const distList = [
    'ঢাকা', 'চট্টগ্রাম', 'সিলেট', 'রাজশাহী', 'খুলনা', 'বরিশাল', 
    'রংপুর', 'ময়মনসিংহ', 'গাজীপুর', 'নারায়ণগঞ্জ', 'কুমিল্লা', 'বগুড়া'
  ];

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'PURE10') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedDiscount(discount);
      alert('কুপন সফলভাবে প্রয়োগ করা হয়েছে! ১০% ছাড় পাওয়া গেছে।');
    } else {
      alert('দুঃখিত, কুপনটি সঠিক নয়!');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Client-side validations
    if (!name.trim()) {
      setErrorMsg('অনুগ্রহ করে আপনার নাম লিখুন।');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('অনুগ্রহ করে আপনার মোবাইল নম্বর লিখুন।');
      return;
    }
    if (!/^(?:\+88|88)?(01[3-9]\d{8})$/.test(phone.trim())) {
      setErrorMsg('একটি সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন (যেমন: ০১৭XXXXXXXX)।');
      return;
    }
    if (!address.trim()) {
      setErrorMsg('অনুগ্রহ করে আপনার পূর্ণাঙ্গ ঠিকানা লিখুন।');
      return;
    }

    setIsSubmitting(true);

    // Simulate Server Order Submission
    setTimeout(() => {
      setIsSubmitting(false);
      const randomId = 'GB-' + Math.floor(100000 + Math.random() * 900000);
      setGeneratedOrderId(randomId);
      setOrderSuccess(true);
      clearCart();
    }, 1500);
  };

  // If order is placed successfully, render confirmation view
  if (orderSuccess) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 font-body text-center space-y-6 bg-white rounded-3xl border border-emerald-100 shadow-md">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-pulse">
          <CheckCircle2 size={48} className="stroke-[2.5]" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-800">অর্ডারটি সফলভাবে গৃহীত হয়েছে!</h2>
          <p className="text-sm text-gray-500 font-semibold">আপনার সাথে যোগাযোগের জন্য আমাদের একজন প্রতিনিধি শীঘ্রই কল করবেন।</p>
        </div>

        {/* Order Card details */}
        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 text-left text-sm space-y-3">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500 font-semibold">অর্ডার আইডি:</span>
            <span className="font-extrabold text-[#1e5330]">{generatedOrderId}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500 font-semibold">গ্রাহকের নাম:</span>
            <span className="font-bold text-gray-800">{name}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500 font-semibold">মোবাইল নম্বর:</span>
            <span className="font-bold text-gray-800">{phone}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500 font-semibold">ডেলিভারি ঠিকানা:</span>
            <span className="font-bold text-gray-800 text-right">{address}, {upazila && `${upazila}, `}{district}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500 font-semibold">পেমেন্ট মেথড:</span>
            <span className="font-bold text-gray-800">{paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি' : 'বিকাশ অনলাইন পেমেন্ট'}</span>
          </div>
          <div className="flex justify-between pt-1 font-bold text-base">
            <span className="text-gray-800">সর্বমোট প্রদেয় মূল্য:</span>
            <span className="text-[#1e5330]">৳{grandTotal}</span>
          </div>
        </div>

        <button 
          onClick={() => router.push('/')}
          className="w-full py-3.5 bg-[#1e5330] hover:bg-[#163f24] text-white rounded-2xl font-bold transition-all shadow-md"
        >
          আরও কেনাকাটা করুন
        </button>
      </div>
    );
  }

  // If cart is empty and order is not successful
  if (items.length === 0) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-xl font-bold text-gray-700">আপনার কার্টে কোনো প্রোডাক্ট নেই!</h2>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-[#1e5330] text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-[#163f24] transition-colors"
        >
          <ChevronLeft size={16} />
          <span>কেনাকাটা করতে ফিরে যান</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-body">
      <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
        <Link href="/" className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-xl sm:text-2xl font-black text-gray-800">অর্ডার সম্পন্ন করুন</h1>
      </div>

      {errorMsg && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-700 text-sm font-bold animate-pulse">
          <AlertCircle size={20} className="shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Form/Summary columns */}
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Details (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-7 rounded-3xl border border-gray-100 shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-3">
            <MapPin className="text-[#1e5330]" size={20} />
            <span>ডেলিভারি ঠিকানা ও তথ্য</span>
          </h2>

          <div className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-1.5">
                <User size={15} className="text-gray-400" />
                <span>আপনার নাম <span className="text-red-500">*</span></span>
              </label>
              <input
                type="text"
                placeholder="যেমন: মোহাম্মদ করিম"
                required
                className="w-full bg-[#fcfdfe] border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1e5330] focus:ring-1 focus:ring-[#1e5330]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Mobile number */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-1.5">
                <Phone size={15} className="text-gray-400" />
                <span>মোবাইল নম্বর <span className="text-red-500">*</span></span>
              </label>
              <input
                type="tel"
                placeholder="যেমন: ০১XXXXXXXXX"
                required
                className="w-full bg-[#fcfdfe] border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1e5330] focus:ring-1 focus:ring-[#1e5330] font-semibold"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* District & Upazila */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-1.5">
                  <Building size={15} className="text-gray-400" />
                  <span>জেলা <span className="text-red-500">*</span></span>
                </label>
                <select
                  className="w-full bg-[#fcfdfe] border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1e5330] font-semibold"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  {distList.map((dist, i) => (
                    <option key={i} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-1.5">
                  <Building size={15} className="text-gray-400" />
                  <span>থানা / উপজেলা</span>
                </label>
                <input
                  type="text"
                  placeholder="যেমন: উত্তরা"
                  className="w-full bg-[#fcfdfe] border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1e5330]"
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                />
              </div>
            </div>

            {/* Detailed Address */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-1.5">
                <MapPin size={15} className="text-gray-400" />
                <span>পূর্ণাঙ্গ ঠিকানা (গ্রাম, পোস্ট, হাউজ ও রোড নম্বর) <span className="text-red-500">*</span></span>
              </label>
              <textarea
                placeholder="যেমন: হাউজ ২৫, রোড ২, সেক্টর ৯, উত্তরা, ঢাকা"
                required
                rows={3}
                className="w-full bg-[#fcfdfe] border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1e5330] focus:ring-1 focus:ring-[#1e5330]"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-700">পেমেন্ট মেথড নির্বাচন করুন:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* COD Option */}
              <label 
                className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'cod' 
                    ? "border-[#1e5330] bg-[#eefcf4]" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'cod' ? "border-[#1e5330]" : "border-gray-300"
                  }`}>
                    {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-[#1e5330] rounded-full" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-sm text-gray-800">ক্যাশ অন ডেলিভারি</span>
                    <span className="text-[11px] text-gray-500 font-semibold">পণ্য বুঝে পেয়ে মূল্য পরিশোধ করুন</span>
                  </div>
                </div>
                <Truck size={20} className="text-[#1e5330]" />
                <input
                  type="radio"
                  name="payment"
                  className="hidden"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
              </label>

              {/* bKash Option */}
              <label 
                className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'bkash' 
                    ? "border-[#1e5330] bg-[#eefcf4]" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'bkash' ? "border-[#1e5330]" : "border-gray-300"
                  }`}>
                    {paymentMethod === 'bkash' && <div className="w-2.5 h-2.5 bg-[#1e5330] rounded-full" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-sm text-gray-800">বিকাশ অনলাইন পেমেন্ট</span>
                    <span className="text-[11px] text-gray-500 font-semibold">অনলাইনে পেমেন্ট সম্পন্ন করুন</span>
                  </div>
                </div>
                <CreditCard size={20} className="text-[#1e5330]" />
                <input
                  type="radio"
                  name="payment"
                  className="hidden"
                  checked={paymentMethod === 'bkash'}
                  onChange={() => setPaymentMethod('bkash')}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-3xl border border-gray-100 shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-3">
            <ShoppingBag className="text-[#1e5330]" size={20} />
            <span>অর্ডার তালিকা ({totalItems} টি পণ্য)</span>
          </h2>

          {/* Cart Products List */}
          <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-3 justify-between items-center text-sm">
                <div className="flex gap-2.5 items-center">
                  <div className="w-12 h-12 rounded-lg bg-gray-50 overflow-hidden border border-gray-100 shrink-0">
                    <img src={item.product.image} alt={item.product.bnName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-800 text-xs sm:text-sm line-clamp-1 leading-snug">{item.product.bnName}</h4>
                    <span className="text-[10px] text-gray-400 font-bold">৳{item.product.price} × {item.quantity}</span>
                  </div>
                </div>
                <span className="font-extrabold text-[#1e5330]">৳{item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Coupon input */}
          <div className="border-t border-b border-gray-100 py-4 flex gap-2">
            <input
              type="text"
              placeholder="কুপন কোড (যেমন: PURE10)"
              className="flex-1 bg-[#fcfdfe] border border-gray-300 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#1e5330] font-semibold"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button 
              onClick={handleApplyCoupon}
              className="bg-emerald-800 hover:bg-[#1e5330] text-white text-xs px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer"
            >
              প্রয়োগ করুন
            </button>
          </div>

          {/* Subtotal, Shipping, Grand total summary */}
          <div className="space-y-2.5 text-sm font-semibold text-gray-600">
            <div className="flex justify-between items-center">
              <span>উপ-মোট (Subtotal):</span>
              <span className="text-gray-800 font-bold">৳{subtotal}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>ডেলিভারি চার্জ:</span>
              <span className="text-gray-800 font-bold">
                {shippingFee === 0 ? (
                  <span className="text-emerald-600 font-bold">ফ্রি ডেলিভারি</span>
                ) : (
                  `৳${shippingFee}`
                )}
              </span>
            </div>

            {appliedDiscount > 0 && (
              <div className="flex justify-between items-center text-emerald-600">
                <span>কুপন ছাড় (Discount):</span>
                <span>- ৳{appliedDiscount}</span>
              </div>
            )}

            {subtotal < 2500 && (
              <p className="text-[10px] text-[#d97706] bg-amber-50 p-2 rounded-md leading-relaxed font-semibold">
                টিপস: মোট মূল্য ২৫০০ টাকা বা তার বেশি হলে সারা দেশে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!
              </p>
            )}

            <div className="flex justify-between items-center border-t border-gray-100 pt-3 text-base text-gray-800 font-black">
              <span>মোট প্রদেয়:</span>
              <span className="text-lg text-[#1e5330]">৳{grandTotal}</span>
            </div>
          </div>

          {/* Place Order submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-[#1e5330] hover:bg-[#163f24] disabled:bg-gray-400 text-white rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            {isSubmitting ? (
              <span>প্রসেসিং হচ্ছে...</span>
            ) : (
              <>
                <Check size={18} className="stroke-[3]" />
                <span>অর্ডার নিশ্চিত করুন (Place Order)</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
