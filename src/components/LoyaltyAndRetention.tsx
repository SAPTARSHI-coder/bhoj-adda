'use client';

import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { 
  Coins, 
  Gift, 
  Sparkles, 
  CheckCircle2, 
  Cake
} from 'lucide-react';

export function LoyaltyAndRetention() {
  const { 
    loyaltyPoints, 
    redeemPoints, 
    registerBirthdayMember, 
    addToast 
  } = useRestaurant();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [birthMonth, setBirthMonth] = useState('November');
  const [favoriteDish, setFavoriteDish] = useState('Dakkhini Daab Chingri');
  const [registeredCode, setRegisteredCode] = useState<string | null>(null);

  const handleBirthdaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      addToast('Details Required', 'Please enter your Name and Phone.', 'warning');
      return;
    }
    const member = registerBirthdayMember({
      fullName,
      phone,
      email: email || 'vip@bhojadda.com',
      birthMonth,
      favoriteDish,
      preferredBranch: 'Park Street Flagship',
    });
    setRegisteredCode(member.voucherCode);
  };

  return (
    <section id="loyalty" className="py-20 lg:py-28 bg-[#0D1219] text-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#D49B37] uppercase tracking-widest block mb-1">
            Loyalty & Member Perks
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-white">
            Bhoj Adda Royal Privilege Club
          </h2>
          <p className="text-sm text-gray-400 mt-2 font-light">
            Earn cash-redeemable Bhoj Coins on direct visits. Join the Birthday Club for complimentary anniversary feasts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Loyalty Wallet */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#141C28] border border-white/10 flex flex-col justify-between shadow-2xl space-y-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#992B15] flex items-center justify-center">
                    <Coins className="w-5 h-5 text-[#F8DA96]" />
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-bold text-white">Bhoj Coins Wallet</h3>
                    <p className="text-xs text-[#F8DA96]">Direct Dining Currency</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-mono font-bold text-[#F8DA96]">{loyaltyPoints}</span>
                  <span className="text-[10px] text-gray-400 block">Coins Available</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Earn <strong>10 Coins for every ₹100</strong> spent directly with us. 100% redeemable on future visits with zero hidden terms.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => redeemPoints(150)}
                    disabled={loyaltyPoints < 150}
                    className="p-3 rounded-2xl bg-[#0D1117] border border-white/10 hover:border-[#D49B37] text-left transition disabled:opacity-40"
                  >
                    <span className="text-xs font-bold text-white block">Free Nolen Gur Sweet</span>
                    <span className="text-[10px] text-[#F8DA96] block mt-0.5">150 Coins</span>
                  </button>

                  <button
                    onClick={() => redeemPoints(300)}
                    disabled={loyaltyPoints < 300}
                    className="p-3 rounded-2xl bg-[#0D1117] border border-white/10 hover:border-[#D49B37] text-left transition disabled:opacity-40"
                  >
                    <span className="text-xs font-bold text-white block">₹300 Dining Voucher</span>
                    <span className="text-[10px] text-[#F8DA96] block mt-0.5">300 Coins</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0D1117] border border-white/5 text-xs text-gray-400 font-light">
              Supporting local restaurants directly pays back.
            </div>
          </div>

          {/* Right Column: Birthday Registry */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#141C28] border-2 border-[#992B15] shadow-2xl relative space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#992B15] flex items-center justify-center">
                <Cake className="w-5 h-5 text-[#F8DA96]" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-white">
                  Birthday & Anniversary VIP Registry
                </h3>
                <p className="text-xs text-[#F8DA96]">
                  Unlock 20% discount + complimentary Baked Rosogolla on your special week.
                </p>
              </div>
            </div>

            {registeredCode ? (
              <div className="p-6 rounded-2xl bg-[#0D1117] border-2 border-[#D49B37] text-center space-y-3 animate-in zoom-in-95">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <span className="text-xs text-gray-400 block">Your VIP Birthday Pass Code:</span>
                <span className="text-2xl font-mono font-black text-[#F8DA96] tracking-widest block">{registeredCode}</span>
                <p className="text-xs text-gray-300 font-light">
                  We have credited <strong>+200 bonus Bhoj Coins</strong> to your wallet! Quote this code during table reservation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBirthdaySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sreemoyee Sen"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-white/10 text-xs text-white focus:outline-none focus:border-[#D49B37]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 block mb-1">WhatsApp Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98300 XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-white/10 text-xs text-white focus:outline-none focus:border-[#D49B37]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Birth Month</label>
                    <select
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-white/10 text-xs text-white focus:outline-none focus:border-[#D49B37]"
                    >
                      {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m) => (
                        <option key={m} value={m} className="bg-[#121822]">{m}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Favorite Bengali Dish</label>
                    <input
                      type="text"
                      placeholder="e.g. Daab Chingri / Kosha Mangsho"
                      value={favoriteDish}
                      onChange={(e) => setFavoriteDish(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-white/10 text-xs text-white focus:outline-none focus:border-[#D49B37]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#992B15] hover:bg-[#B83A1B] text-white text-xs font-bold uppercase tracking-wider transition shadow flex items-center justify-center gap-2"
                >
                  <Gift className="w-4 h-4" />
                  <span>Claim VIP Birthday Pass (+200 Free Coins)</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
