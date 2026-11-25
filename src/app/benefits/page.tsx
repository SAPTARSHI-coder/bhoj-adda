'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowDown, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  CreditCard, 
  CalendarDays, 
  ArrowLeft,
  UtensilsCrossed,
  Percent,
  Coins,
  Repeat,
  HeartHandshake
} from 'lucide-react';

export default function HowBhojAddaBenefitsPage() {
  return (
    <div className="min-h-screen bg-[#070A0F] text-white selection:bg-[#D49B37] selection:text-[#070A0F]">
      
      {/* Top Navigation Strip */}
      <nav className="bg-[#0E141E] border-b border-[#D49B37]/20 py-4 px-4 sm:px-8 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white transition">
            <ArrowLeft className="w-4 h-4 text-[#D49B37]" />
            <span>Back to Bhoj Adda Website Demo</span>
          </Link>
          <div className="text-xs text-[#F8DA96] font-semibold bg-[#992B15]/40 px-3 py-1 rounded-full border border-[#D49B37]/30">
            Restaurant Owner Business Guide
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        
        {/* Page Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-[#D49B37] uppercase tracking-widest">
            Concept Demo • Strategic Overview
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white leading-tight">
            How Bhoj Adda Benefits Your Business
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            A straightforward, non-technical explanation of how shifting from third-party app dependency to a direct digital platform creates sustainable profits.
          </p>
        </div>

        {/* 3-Step Flow Diagram */}
        <div className="space-y-6">
          
          {/* STEP 1: THE PROBLEM */}
          <div className="rounded-3xl bg-[#151214] border-2 border-red-500/40 p-6 sm:p-8 shadow-2xl space-y-5 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-950 border border-red-500/40 flex items-center justify-center text-red-400 font-bold text-lg shrink-0">
                1
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 block">
                  The Current Challenge
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  The Problem
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-black/40 border border-red-500/20 space-y-2">
                <div className="text-red-400 font-bold text-sm flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  Social Traffic Lost
                </div>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Customers discover your food through Instagram & Facebook reels, but have no quick direct place to book.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-red-500/20 space-y-2">
                <div className="text-red-400 font-bold text-sm flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  Manual Booking Friction
                </div>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Reservations happen manually via phone calls, missed WhatsApp DMs, and weekend chaos with walk-in no-shows.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-red-500/20 space-y-2">
                <div className="text-red-400 font-bold text-sm flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  Heavy 25%–28% Fees
                </div>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Third-party platforms charge massive commissions on every order and hide your guests' contact data from you.
                </p>
              </div>
            </div>
          </div>

          {/* DOWN ARROW CONNECTOR */}
          <div className="flex justify-center my-2">
            <div className="w-10 h-10 rounded-full bg-[#182230] border border-[#D49B37]/40 flex items-center justify-center text-[#F8DA96] shadow-lg animate-bounce">
              <ArrowDown className="w-5 h-5" />
            </div>
          </div>

          {/* STEP 2: THE SOLUTION */}
          <div className="rounded-3xl bg-[#121926] border-2 border-[#D49B37] p-6 sm:p-8 shadow-2xl space-y-5 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#992B15] border border-[#D49B37]/50 flex items-center justify-center text-[#F8DA96] font-bold text-lg shrink-0">
                2
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F8DA96] block">
                  The Platform Mechanism
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  The Solution
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#0D121B] border border-white/10 space-y-2">
                <div className="text-[#F8DA96] font-bold text-sm flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4 shrink-0" />
                  Direct Booking
                </div>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Instant table & pre-order reservations directly on your website from any social media link.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0D121B] border border-white/10 space-y-2">
                <div className="text-[#F8DA96] font-bold text-sm flex items-center gap-1.5">
                  <Users className="w-4 h-4 shrink-0" />
                  Owned Customer Database
                </div>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  You own 100% of guest names, verified WhatsApp numbers, birthdays, and dining preferences.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0D121B] border border-white/10 space-y-2">
                <div className="text-[#F8DA96] font-bold text-sm flex items-center gap-1.5">
                  <Coins className="w-4 h-4 shrink-0" />
                  Direct Loyalty System
                </div>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Bhoj Coins and Birthday Club passes give diners an active reason to book directly rather than through apps.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0D121B] border border-white/10 space-y-2">
                <div className="text-[#F8DA96] font-bold text-sm flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 shrink-0" />
                  Direct Payment Guarantee
                </div>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Advance table deposit collection (₹500 deductible) eliminates weekend no-shows completely.
                </p>
              </div>
            </div>
          </div>

          {/* DOWN ARROW CONNECTOR */}
          <div className="flex justify-center my-2">
            <div className="w-10 h-10 rounded-full bg-[#182230] border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg animate-bounce">
              <ArrowDown className="w-5 h-5" />
            </div>
          </div>

          {/* STEP 3: THE IMPACT */}
          <div className="rounded-3xl bg-[#0E1B15] border-2 border-emerald-500/50 p-6 sm:p-8 shadow-2xl space-y-5 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-400 flex items-center justify-center text-emerald-300 font-bold text-lg shrink-0">
                3
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                  Real Business Results
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  The Impact
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-2 text-center sm:text-left">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 flex items-center justify-center text-emerald-400 mb-1 mx-auto sm:mx-0">
                  <Repeat className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">More Repeat Customers</h3>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Automated birthday rewards and loyalty coins bring diners back 2x to 3x more often throughout the year.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-2 text-center sm:text-left">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 flex items-center justify-center text-emerald-400 mb-1 mx-auto sm:mx-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">Better Customer Relationships</h3>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Direct communication via WhatsApp for special occasions, seasonal Hilsa menus, and private room bookings.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-2 text-center sm:text-left">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 flex items-center justify-center text-emerald-400 mb-1 mx-auto sm:mx-0">
                  <Percent className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">Lower Aggregator Dependency</h3>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Keep your hard-earned restaurant margins instead of surrendering 25% to 28% of your top-line revenue to apps.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Action Footnote */}
        <div className="p-6 rounded-3xl bg-[#10151E] border border-white/10 text-center space-y-4">
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto font-light leading-relaxed">
            This demo platform is engineered to prove how easy it is for an independent restaurant to own its digital guest funnel.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-[#D49B37] hover:bg-[#E5AC46] text-black text-xs font-bold uppercase tracking-wider transition"
            >
              Explore Customer Experience Demo
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
