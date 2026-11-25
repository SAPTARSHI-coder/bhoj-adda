'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Utensils, Award, Flame, History } from 'lucide-react';

export function RestaurantStory() {
  return (
    <section id="story" className="py-20 lg:py-28 bg-[#0A0D12] text-white relative border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Atmospheric Image */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden border border-[#D49B37]/30 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
                alt="Bhoj Adda Heritage Ambience"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
                <p className="text-xs text-[#F8DA96] font-semibold uppercase tracking-wider">
                  Park Street Baithak & Zamindari Chamber
                </p>
                <p className="text-xs text-gray-200 mt-1 font-light">
                  Vintage Belgian chandeliers, teakwood baithaks, and traditional brassware dining.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Clear Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D49B37] uppercase tracking-widest block">
                Our Heritage & Roots
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                The Spirit of Bengal Adda
              </h2>
            </div>

            <p className="text-sm text-gray-300 font-light leading-relaxed">
              In Bengal, dining is never merely a meal—it is a cultural ritual and the centerpiece of timeless <em>Adda</em>. Founded by Kolkata food historians and master chefs, <strong>Bhoj Adda</strong> revives the forgotten recipes of 19th-century North Kolkata Rajbaris and East Bengal river towns.
            </p>

            <p className="text-sm text-gray-300 font-light leading-relaxed">
              Our <em>Kosha Mangsho</em> is slow-stirred for over 3 hours to achieve mahogany velvet depth. Our <em>Daab Chingri</em> is baked inside fresh tender green coconuts with yellow mustard cream, served in authentic Bell Metal (Kansa) cookware.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-[#131922] border border-white/5 text-center">
                <Flame className="w-5 h-5 text-[#E5AC46] mx-auto mb-1" />
                <p className="text-xs font-bold text-white">Slow Cooking</p>
                <p className="text-[10px] text-gray-400">Dum Pukht & Clay</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#131922] border border-white/5 text-center">
                <Utensils className="w-5 h-5 text-[#E5AC46] mx-auto mb-1" />
                <p className="text-xs font-bold text-white">Pure Kansa</p>
                <p className="text-[10px] text-gray-400">Bell Metal Dining</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#131922] border border-white/5 text-center">
                <Award className="w-5 h-5 text-[#E5AC46] mx-auto mb-1" />
                <p className="text-xs font-bold text-white">Grand Masters</p>
                <p className="text-[10px] text-gray-400">3rd Gen Bong Chefs</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
