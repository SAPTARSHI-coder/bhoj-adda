'use client';

import React from 'react';
import { 
  UtensilsCrossed, 
  MapPin, 
  Phone, 
  Mail, 
  Sparkles, 
  ShieldCheck, 
  Heart,
  Clock
} from 'lucide-react';
import Link from 'next/link';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#070A0F] border-t border-[#D49B37]/30 text-white relative overflow-hidden">
      
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Bengali Heritage */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#992B15] to-[#D49B37] p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#0A0D12] rounded-full flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5 text-[#E5AC46]" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-serif font-black tracking-tight text-white block">
                  Bhoj Adda
                </span>
                <span className="text-xs font-serif text-[#D49B37]">
                  ভোজ আড্ডা • কলকাতার ঐতিহ্যের খাঁটি স্বাদ
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-md">
              Celebrating the golden era of 19th-century Bengal Zamindari feasts and timeless Kolkata adda. Pure Bell Metal dining, river-fresh Padma Hilsa, and handcrafted artisanal desserts.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#151C27] border border-white/10 hover:border-[#D49B37] text-gray-300 hover:text-white flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#151C27] border border-white/10 hover:border-[#D49B37] text-gray-300 hover:text-white flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Locations & Hours */}
          <div className="lg:col-span-4 space-y-3 text-xs sm:text-sm text-gray-300">
            <h4 className="text-sm font-serif font-bold text-[#F8DA96] uppercase tracking-wider">
              Our Locations & Hours
            </h4>

            <div className="space-y-3">
              <div>
                <p className="text-white font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D49B37]" />
                  Park Street Heritage Flagship
                </p>
                <p className="text-xs text-gray-400 pl-5">18A Park Street (Opp Stephen Court), Kolkata - 700016</p>
                <p className="text-xs text-gray-400 pl-5">Phone: +91 98300 44221</p>
              </div>

              <div>
                <p className="text-white font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D49B37]" />
                  Salt Lake Sector V Skyline
                </p>
                <p className="text-xs text-gray-400 pl-5">7th Floor, Infinity Benchmark, Sector V, Kolkata - 700091</p>
                <p className="text-xs text-gray-400 pl-5">Phone: +91 98300 44222</p>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-400 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#D49B37]" />
                <span>Open 7 Days a week: 12:00 PM to 11:30 PM</span>
              </div>
            </div>
          </div>

          {/* Col 3: Direct Dining Guarantee */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-serif font-bold text-[#F8DA96] uppercase tracking-wider">
              Direct Booking Guarantee
            </h4>
            <Link
              href="/benefits"
              className="inline-flex items-center gap-1.5 text-xs text-[#F8DA96] hover:underline font-semibold bg-[#151C27] border border-[#D49B37]/30 px-3 py-1.5 rounded-lg"
            >
              <Sparkles className="w-3 h-3 text-[#D49B37]" />
              Owner Guide: How Bhoj Adda Benefits
            </Link>

            <div className="p-4 rounded-2xl bg-[#131922] border border-[#D49B37]/30 space-y-2 text-xs text-gray-300">
              <p className="font-semibold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                100% Direct Price Promise
              </p>
              <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                No third-party surge markups. Full ₹500 advance table guarantee deducted directly from your food bill.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© 2026 Bhoj Adda (Digital Platform Concept Demo). All rights reserved.</p>
          <p className="flex items-center gap-1 text-gray-400">
            Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Kolkata food lovers & restaurant entrepreneurs.
          </p>
        </div>
      </div>
    </footer>
  );
}
