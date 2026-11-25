'use client';

import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { BRANCHES } from '../data/mockData';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Navigation, 
  CalendarDays 
} from 'lucide-react';
import Image from 'next/image';

export function LocationsSection() {
  const { setIsReservationModalOpen } = useRestaurant();

  return (
    <section id="locations" className="py-20 lg:py-28 bg-[#0A0D12] text-white relative border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#D49B37] uppercase tracking-widest block mb-1">
            Two Prime Kolkata Destinations
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-white">
            Our Flagship Dining Rooms
          </h2>
          <p className="text-sm text-gray-400 mt-2 font-light">
            Immerse in timeless Park Street nostalgia or rooftop skyline views at Salt Lake Sector V.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {BRANCHES.map((branch) => (
            <div
              key={branch.id}
              className="rounded-3xl bg-[#131922] border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-[#D49B37]/40 transition-all"
            >
              <div className="relative h-60 w-full overflow-hidden bg-gray-900">
                <Image
                  src={branch.image}
                  alt={branch.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131922] via-transparent to-black/30" />

                <div className="absolute top-4 left-4 bg-[#7A2207]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#FFF0B8] border border-[#D49B37]/40 shadow">
                  {branch.id === 'park-street' ? 'Park Street Flagship' : 'Salt Lake Skyline'}
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-xl font-serif font-bold text-white">
                    {branch.name}
                  </h3>
                  <p className="text-xs font-serif text-[#F8DA96] mt-0.5">
                    {branch.bengaliName}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3 text-xs sm:text-sm text-gray-300">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#D49B37] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">{branch.address}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{branch.landmark}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#D49B37] shrink-0" />
                    <span>{branch.timings}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#D49B37] shrink-0" />
                    <a href={'tel:' + branch.phone.replace(/s/g, '')} className="text-[#F8DA96] hover:underline font-semibold">
                      {branch.phone}
                    </a>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5">
                  {branch.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-gray-300 bg-[#1C2636] px-2.5 py-1 rounded-lg border border-white/5 font-light"
                    >
                      {feat}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href={branch.mapEmbedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 rounded-xl bg-[#1C2636] hover:bg-[#253348] border border-white/10 text-xs font-semibold text-white transition flex items-center justify-center gap-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#D49B37]" />
                    Get Directions
                  </a>

                  <button
                    onClick={() => setIsReservationModalOpen(true)}
                    className="py-2.5 rounded-xl bg-[#D49B37] hover:bg-[#E5AC46] text-black text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow"
                  >
                    <CalendarDays className="w-3.5 h-3.5" />
                    Reserve Table
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
