'use client';

import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { 
  CalendarDays, 
  Utensils, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  MessageCircle, 
  ChevronRight,
  ChevronLeft,
  ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const HERO_DISHES = [
  {
    name: 'Dakkhini Daab Chingri',
    bengali: 'দাব চিংড়ি',
    tagline: 'Jumbo prawns baked inside green coconut with mustard-coconut cream',
    price: 685,
    rating: '4.9 ★ (850+ reviews)',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1000&q=80',
    badge: 'Zamindari Signature'
  },
  {
    name: 'Royal Padma Shorshe Ilish',
    bengali: 'পদ্মার সর্ষে ইলিশ',
    tagline: 'Padma Hilsa steak simmered in virgin mustard paste and green chillies',
    price: 795,
    rating: '5.0 ★ (1.2K+ reviews)',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80',
    badge: 'Heritage Classic'
  },
  {
    name: 'Kolkata Kosha Mangsho',
    bengali: 'কষা মাংস ও রাধাবল্লভী',
    tagline: 'Slow-cooked dark caramelized mutton with hot fluffy Radhaballabhi',
    price: 645,
    rating: '4.9 ★ (2.1K+ reviews)',
    image: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=1000&q=80',
    badge: 'Sunday Bong Nostalgia'
  },
  {
    name: 'Kolkata Mutton Dum Biryani',
    bengali: 'কলকাতা দম বিরিয়ানি',
    tagline: 'Fragrant saffron aged basmati with melt-in-mouth mutton and golden aloo',
    price: 545,
    rating: '4.9 ★ (3.4K+ reviews)',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80',
    badge: 'Awadhi-Bengali Classic'
  }
];

export function HeroSection() {
  const { setIsReservationModalOpen, addToCart, menuItems } = useRestaurant();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_DISHES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const activeDish = HERO_DISHES[currentIndex];

  const handleQuickAdd = () => {
    const found = menuItems.find(item => item.name.toLowerCase().includes(activeDish.name.split(' ')[0].toLowerCase())) || menuItems[0];
    addToCart(found, 1);
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent('Nomoshkar Bhoj Adda! I would like to reserve a table / place a direct takeaway order.');
    window.open('https://wa.me/919830044221?text=' + text, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-[#0A0D12] text-white pt-10 pb-20 lg:py-24 border-b border-white/5">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#992B15]/15 via-[#D49B37]/10 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Clean Live Status & Business Guide Pills */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151C27] border border-[#D49B37]/25 text-xs text-gray-300 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-medium">Now Accepting Dinner Reservations</span>
            <span className="text-gray-500">•</span>
            <span className="text-[#F8DA96]">Park Street & Salt Lake</span>
          </div>

          <Link
            href="/benefits"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#992B15]/40 hover:bg-[#992B15]/70 border border-[#D49B37]/40 text-xs text-[#F8DA96] hover:text-white font-semibold transition shadow-md group"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D49B37] group-hover:rotate-12 transition-transform" />
            <span>Owner Guide: How Bhoj Adda Benefits</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Clear, uncluttered copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-[1.18]">
                Where Grand Bengali Gastronomy Meets{' '}
                <span className="text-gold-gradient italic font-serif">
                  Timeless Adda.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed pt-2">
                From wood-smoked Bhetki Paturi to slow-cooked Kosha Mangsho and clay-baked Daab Chingri. Experience Bengal's aristocratic dining heritage in pure Bell Metal hospitality.
              </p>
            </div>

            {/* Direct Booking Highlight Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#131922] border border-[#D49B37]/25 text-left max-w-xl mx-auto lg:mx-0 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#992B15]/40 border border-[#D49B37]/30 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-[#F8DA96]" />
              </div>
              <div className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                <p className="font-bold text-white mb-0.5">
                  Direct Booking Benefit
                </p>
                <p className="text-xs text-gray-300 font-light">
                  Book directly with us to enjoy <strong className="text-[#F8DA96] font-medium">15% Off</strong> (Code: BHOJADDA15), guaranteed table seating, and a complimentary <strong className="text-white font-medium">Gondhoraj Ghol</strong> welcome drink.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => setIsReservationModalOpen(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D49B37] via-[#E5AC46] to-[#B27D1B] hover:opacity-95 text-black text-xs font-extrabold uppercase tracking-wider shadow-xl shadow-[#D49B37]/20 transition flex items-center justify-center gap-2"
              >
                <CalendarDays className="w-4 h-4" />
                <span>Reserve Your Table</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>

              <a
                href="#menu"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#151C27] hover:bg-[#1D2635] text-white border border-white/10 text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-2"
              >
                <Utensils className="w-4 h-4 text-[#D49B37]" />
                <span>Explore Menu</span>
              </a>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#128C7E]/20 hover:bg-[#128C7E]/30 text-[#25D366] border border-[#25D366]/30 text-xs font-semibold transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order</span>
              </button>
            </div>

          </div>

          {/* Right Column: Clean Hero Dish Showcase Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-[#141C28] border border-[#D49B37]/30 overflow-hidden shadow-2xl relative">
              
              {/* Dish Photo */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-900">
                <Image
                  src={activeDish.image}
                  alt={activeDish.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141C28] via-transparent to-black/30" />

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-[#7A2207]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#FFF0B8] border border-[#D49B37]/40 shadow">
                  {activeDish.badge}
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold text-[#F8DA96] flex items-center gap-1 border border-white/10">
                  <Star className="w-3.5 h-3.5 fill-[#F8DA96]" />
                  <span>{activeDish.rating}</span>
                </div>
              </div>

              {/* Dish Info */}
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-xl font-serif font-bold text-white">
                      {activeDish.name}
                    </h3>
                    <span className="text-sm font-serif text-[#F8DA96] font-medium">
                      {activeDish.bengali}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 font-light mt-1.5 leading-relaxed">
                    {activeDish.tagline}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-gray-400 block">Direct Dine-In / Pre-Order</span>
                    <span className="text-2xl font-bold text-[#F8DA96]">₹{activeDish.price}</span>
                  </div>

                  <button
                    onClick={handleQuickAdd}
                    className="px-4 py-2.5 rounded-xl bg-[#992B15] hover:bg-[#B83A1B] text-white text-xs font-bold uppercase tracking-wider transition shadow flex items-center gap-1.5"
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    Add to Pre-Order
                  </button>
                </div>

                {/* Switcher Indicator */}
                <div className="flex items-center justify-between pt-2 text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    {HERO_DISHES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={"h-1.5 rounded-full transition-all " + (idx === currentIndex ? 'w-6 bg-[#D49B37]' : 'w-2 bg-gray-600 hover:bg-gray-400')}
                        aria-label={'View signature dish ' + (idx + 1)}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentIndex((prev) => (prev - 1 + HERO_DISHES.length) % HERO_DISHES.length)}
                      className="p-1 rounded-lg bg-[#1D2635] hover:bg-[#293548] text-gray-300 transition"
                      aria-label="Previous dish"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentIndex((prev) => (prev + 1) % HERO_DISHES.length)}
                      className="p-1 rounded-lg bg-[#1D2635] hover:bg-[#293548] text-gray-300 transition"
                      aria-label="Next dish"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
