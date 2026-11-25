'use client';

import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { SOCIAL_REELS, CUSTOMER_REVIEWS } from '../data/mockData';
import { SocialReel } from '../types';
import { 
  Play, 
  Heart, 
  Eye, 
  Star, 
  CheckCircle2, 
  X, 
  ShoppingBag, 
  CalendarDays,
  Flame,
  Award
} from 'lucide-react';
import Image from 'next/image';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function SocialReelsAndReviews() {
  const { setIsReservationModalOpen, addToCart, menuItems } = useRestaurant();
  const [activeReelModal, setActiveReelModal] = useState<SocialReel | null>(null);

  const handleOrderFeaturedDish = (dishFeaturedName: string) => {
    const firstWord = dishFeaturedName.split(' ')[0].toLowerCase();
    const found = menuItems.find(m => m.name.toLowerCase().includes(firstWord)) || menuItems[0];
    addToCart(found, 1);
    setActiveReelModal(null);
  };

  return (
    <section id="social" className="py-20 lg:py-28 bg-[#0D1219] text-white relative border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#D49B37] uppercase tracking-widest block mb-1">
            Social Highlights & Press
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-white">
            Loved by Kolkata Gourmands
          </h2>
          <p className="text-sm text-gray-400 mt-2 font-light">
            Over 2.5M+ views across social media. Discover what verified diners and celebrated food critics have to say.
          </p>
        </div>

        {/* 4 Clean Reel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SOCIAL_REELS.map((reel) => (
            <div
              key={reel.id}
              onClick={() => setActiveReelModal(reel)}
              className="group relative rounded-3xl overflow-hidden bg-[#151C27] border border-white/10 hover:border-[#D49B37] transition-all duration-300 cursor-pointer shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-72 w-full overflow-hidden bg-gray-900">
                <Image
                  src={reel.thumbnail}
                  alt={reel.creatorName}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D12] via-black/20 to-transparent" />

                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-black/60 border border-white/30 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#992B15] transition-all shadow-xl">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Views Pill */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 text-[11px] text-white font-medium flex items-center gap-1">
                  <Eye className="w-3 h-3 text-[#F8DA96]" />
                  <span>{reel.views}</span>
                </div>

                {/* Creator bottom overlay */}
                <div className="absolute bottom-3 left-3 right-3 space-y-1.5">
                  <p className="text-xs font-bold text-white flex items-center gap-1">
                    {reel.creatorName}
                    {reel.verified && <CheckCircle2 className="w-3 h-3 text-blue-400 shrink-0" />}
                  </p>
                  <p className="text-[11px] text-gray-300 font-light line-clamp-1 italic">
                    "{reel.quote}"
                  </p>
                  <span className="text-[10px] text-[#F8DA96] font-medium block">
                    Featured: {reel.dishFeatured.split('&')[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Spacious Critic Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-7 rounded-3xl bg-[#141C28] border border-white/10 space-y-4 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#F8DA96]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#F8DA96]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-gray-300 bg-black/40 px-2 py-0.5 rounded border border-white/10">
                    {rev.source}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed italic">
                  "{rev.review}"
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#D49B37]/40 shrink-0">
                  <Image
                    src={rev.avatar}
                    alt={rev.name}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{rev.name}</h4>
                  <p className="text-[10px] text-gray-400">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Reel Modal */}
      {activeReelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#121822] border border-[#D49B37]/40 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl">
            <div className="relative h-72 w-full bg-black">
              <Image
                src={activeReelModal.thumbnail}
                alt={activeReelModal.creatorName}
                fill
                sizes="(max-width: 640px) 100vw, 450px"
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121822] via-transparent to-black/60" />

              <button
                onClick={() => setActiveReelModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition border border-white/20"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <p className="text-xs font-bold text-white flex items-center gap-1">
                  {activeReelModal.creatorName}
                  {activeReelModal.verified && <CheckCircle2 className="w-3 h-3 text-blue-400" />}
                </p>
                <p className="text-xs text-gray-200 italic">
                  "{activeReelModal.quote}"
                </p>
              </div>
            </div>

            <div className="p-5 space-y-3 bg-[#151C27]">
              <div className="p-3 rounded-2xl bg-[#0D1117] border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block">Featured Dish:</span>
                  <span className="text-sm font-serif font-bold text-[#F8DA96]">
                    {activeReelModal.dishFeatured}
                  </span>
                </div>

                <button
                  onClick={() => handleOrderFeaturedDish(activeReelModal.dishFeatured)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#992B15] text-white text-xs font-bold uppercase transition flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Pre-Order
                </button>
              </div>

              <button
                onClick={() => {
                  setActiveReelModal(null);
                  setIsReservationModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-[#D49B37] text-black text-xs font-bold uppercase tracking-wider transition"
              >
                Reserve Table to Taste This
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
