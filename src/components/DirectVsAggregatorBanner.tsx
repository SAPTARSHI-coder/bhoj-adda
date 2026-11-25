'use client';

import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { ShieldCheck, Percent, Clock, Gift, ArrowRight } from 'lucide-react';

export function DirectVsAggregatorBanner() {
  const { setIsReservationModalOpen } = useRestaurant();

  return (
    <section className="py-16 bg-[#0E131C] border-b border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#D49B37] uppercase tracking-widest block mb-1">
            The Direct Booking Advantage
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Why Dine Direct with Bhoj Adda?
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2 font-light">
            Third-party delivery apps charge up to 28% in markups and surge fees. When you book directly on our website, we pass that value straight back to your table.
          </p>
        </div>

        {/* 3 Spacious Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <div className="p-6 rounded-2xl bg-[#151C27] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#992B15]/40 border border-[#D49B37]/30 flex items-center justify-center text-[#F8DA96]">
              <Percent className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Flat 15% Direct Discount</h3>
            <p className="text-xs text-gray-300 font-light leading-relaxed">
              Apply code <code className="text-[#F8DA96] bg-black/40 px-1.5 py-0.5 rounded font-mono">BHOJADDA15</code> on all direct table reservations and takeaway orders with zero hidden surge fees.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#151C27] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#992B15]/40 border border-[#D49B37]/30 flex items-center justify-center text-[#F8DA96]">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Guaranteed Seating & Zero Queue</h3>
            <p className="text-xs text-gray-300 font-light leading-relaxed">
              Secure your prime Baithak table with an advance ₹500 guarantee—100% deducted from your dining bill upon arrival.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#151C27] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#992B15]/40 border border-[#D49B37]/30 flex items-center justify-center text-[#F8DA96]">
              <Gift className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Complimentary Welcome Drink</h3>
            <p className="text-xs text-gray-300 font-light leading-relaxed">
              Every direct reservation receives complimentary Gondhoraj Lebu Ghol or artisan Lebu Cha for all guests, plus Bhoj Coins rewards.
            </p>
          </div>

        </div>

        {/* Clean Center CTA */}
        <div className="text-center">
          <button
            onClick={() => setIsReservationModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D49B37] hover:bg-[#E5AC46] text-black text-xs font-bold uppercase tracking-wider transition shadow-lg"
          >
            <span>Book Direct Table Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
