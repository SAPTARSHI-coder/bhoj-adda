'use client';

import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { 
  UtensilsCrossed, 
  CalendarDays, 
  ShoppingBag, 
  Coins, 
  LayoutDashboard, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  const { 
    cartCount, 
    setIsCartOpen, 
    setIsReservationModalOpen, 
    isAdminMode, 
    setIsAdminMode, 
    loyaltyPoints 
  } = useRestaurant();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Sleek Announcement Strip */}
      <div className="bg-[#111620] text-[#E5AC46] text-xs py-2 px-4 border-b border-[#D49B37]/15 text-center font-medium tracking-wide">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-2 text-gray-300 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5AC46]" />
            <span>Kolkata Heritage Dining • Park Street & Salt Lake</span>
          </div>
          <div className="mx-auto md:mx-0 flex items-center gap-3 text-xs">
            <span className="text-white flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3 h-3 text-[#F8DA96]" />
              Direct Table Booking: <strong>Flat 15% Off</strong> with code <code className="text-[#F8DA96] bg-black/40 px-1.5 py-0.5 rounded text-[11px]">BHOJADDA15</code>
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-[11px] text-gray-400">
            <Phone className="w-3 h-3 text-[#D49B37]" />
            <span>+91 98300 44221</span>
          </div>
        </div>
      </div>

      {/* Main Spacious Navbar */}
      <header
        className={"sticky top-0 z-40 transition-all duration-300 " + (scrolled ? 'bg-[#0A0D12]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5' : 'bg-[#0A0D12]/80 backdrop-blur-sm border-b border-white/5 py-5')}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Clean Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#992B15] to-[#D49B37] p-[1px] flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#0A0D12] rounded-full flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4 text-[#E5AC46]" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white">
                  Bhoj Adda
                </span>
                <span className="text-xs font-serif text-[#D49B37] font-medium tracking-wide">
                  ভোজ আড্ডা
                </span>
              </div>
              <p className="text-[10px] text-gray-400 tracking-widest uppercase">
                Heritage Bengali Fine Dining
              </p>
            </div>
          </Link>

          {/* Clean Desktop Navigation with Ample Breathing Room */}
          <nav className="hidden lg:flex items-center gap-8 text-sm text-gray-300 font-medium">
            <Link href="/benefits" className="text-[#F8DA96] hover:text-white font-bold transition-colors py-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D49B37]" />
              <span>How Bhoj Adda Benefits</span>
            </Link>
            <a href="#menu" className="hover:text-[#F3C367] transition-colors py-1">
              Menu & Pre-Order
            </a>
            <a href="#story" className="hover:text-[#F3C367] transition-colors py-1">
              Our Story
            </a>
            <a href="#social" className="hover:text-[#F3C367] transition-colors py-1">
              Critics & Reviews
            </a>
            <a href="#locations" className="hover:text-[#F3C367] transition-colors py-1">
              Locations
            </a>
            <a href="#loyalty" className="hover:text-[#F3C367] transition-colors py-1 flex items-center gap-1.5 text-[#F8DA96]">
              <Coins className="w-3.5 h-3.5 text-[#E5AC46]" />
              <span>Royal Club</span>
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Owner Cockpit Button */}
            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={"px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border " + (isAdminMode ? 'bg-[#D49B37] text-black border-[#F8DA96]' : 'bg-[#151C27] text-gray-300 border-white/10 hover:border-white/25 hover:text-white')}
              title="Toggle Restaurant Owner Admin Cockpit"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isAdminMode ? 'Exit Admin' : 'Owner Cockpit'}</span>
              <span className="sm:hidden">{isAdminMode ? 'Admin' : 'Owner'}</span>
            </button>

            {/* Direct Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg bg-[#151C27] border border-white/10 text-gray-200 hover:text-white hover:border-[#D49B37]/40 transition"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#992B15] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Reserve Button */}
            <button
              onClick={() => setIsReservationModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D49B37] to-[#B27D1B] hover:from-[#E5AC46] hover:to-[#D49B37] text-black text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#D49B37]/15 hover:shadow-[#D49B37]/30 transition"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              Reserve Table
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#10151E] border-b border-white/10 px-5 py-5 space-y-3 mt-3 animate-in fade-in duration-150">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-gray-200 hover:text-[#D49B37]"
            >
              Menu & Pre-Order
            </a>
            <a
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-gray-200 hover:text-[#D49B37]"
            >
              Our Heritage & Roots
            </a>
            <a
              href="#social"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-gray-200 hover:text-[#D49B37]"
            >
              Critics & Food Blogger Reels
            </a>
            <a
              href="#locations"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-gray-200 hover:text-[#D49B37]"
            >
              Locations (Park St & Salt Lake)
            </a>
            <a
              href="#loyalty"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-[#F8DA96]"
            >
              Bhoj Adda Royal Club ({loyaltyPoints} Coins)
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsReservationModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-[#D49B37] text-black text-xs font-bold uppercase tracking-wider"
              >
                Reserve Your Table Now
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
