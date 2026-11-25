'use client';

import React, { useState, useMemo } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem, DietaryType } from '../types';
import { 
  Search, 
  Utensils, 
  Flame, 
  Sparkles, 
  Plus, 
  Minus, 
  Info, 
  X, 
  Fish, 
  Leaf, 
  ShoppingBag 
} from 'lucide-react';
import Image from 'next/image';

const CATEGORIES = [
  { id: 'all', name: 'All Delicacies', icon: '✨' },
  { id: 'bengali-specials', name: 'Bengali Specials', icon: '🍲' },
  { id: 'seafood', name: 'Royal Seafood', icon: '🦐' },
  { id: 'kebabs', name: 'Charcoal Kebabs', icon: '🍢' },
  { id: 'main-course', name: 'Main Course & Biryani', icon: '🍚' },
  { id: 'desserts', name: 'Artisanal Desserts', icon: '🍨' },
  { id: 'beverages', name: 'Heritage Beverages', icon: '🍹' },
];

export function DigitalMenu() {
  const { menuItems, addToCart, cart, updateQuantity } = useRestaurant();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | DietaryType | 'chef-special'>('all');
  const [selectedDishModal, setSelectedDishModal] = useState<MenuItem | null>(null);

  const filteredItems = useMemo(() => {
    return menuItems.filter((dish) => {
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) return false;
      if (dietaryFilter === 'chef-special' && !dish.isChefSpecial) return false;
      if (dietaryFilter !== 'all' && dietaryFilter !== 'chef-special' && dish.dietary !== dietaryFilter) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = dish.name.toLowerCase().includes(query);
        const matchBengali = dish.bengaliName.toLowerCase().includes(query);
        const matchDesc = dish.description.toLowerCase().includes(query);
        if (!matchName && !matchBengali && !matchDesc) return false;
      }
      return true;
    });
  }, [menuItems, selectedCategory, dietaryFilter, searchQuery]);

  const getItemCartQuantity = (dishId: string) => {
    const item = cart.find(c => c.dish.id === dishId);
    return item ? item.quantity : 0;
  };

  return (
    <section id="menu" className="py-20 lg:py-28 bg-[#0A0D12] text-white relative border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#D49B37] uppercase tracking-widest block mb-1">
            Culinary Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-white">
            The Bhoj Adda Menu
          </h2>
          <p className="text-sm text-gray-400 mt-2 font-light">
            Slow-cooked heritage recipes prepared with cold-pressed Ghani mustard oil, fresh river catch, and royal Awadhi spices.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="space-y-6 mb-12 max-w-5xl mx-auto">
          
          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={"px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 flex items-center gap-2 border " + (selectedCategory === cat.id ? 'bg-[#992B15] text-white border-[#D49B37] shadow-lg shadow-[#992B15]/20' : 'bg-[#131922] text-gray-300 border-white/10 hover:border-white/20 hover:text-white')}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Search & Dietary Filters */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search dishes (e.g. Ilish, Biryani, Paturi)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#131922] border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#D49B37]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              <button
                onClick={() => setDietaryFilter('all')}
                className={"px-3 py-1.5 rounded-lg text-xs font-semibold transition border " + (dietaryFilter === 'all' ? 'bg-[#D49B37] text-black border-[#F8DA96]' : 'bg-[#131922] text-gray-300 border-white/10 hover:border-white/20')}
              >
                All
              </button>
              <button
                onClick={() => setDietaryFilter('veg')}
                className={"px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 border " + (dietaryFilter === 'veg' ? 'bg-emerald-800 text-white border-emerald-400' : 'bg-[#131922] text-emerald-400 border-emerald-500/20')}
              >
                <Leaf className="w-3 h-3" />
                Veg
              </button>
              <button
                onClick={() => setDietaryFilter('non-veg')}
                className={"px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 border " + (dietaryFilter === 'non-veg' ? 'bg-[#992B15] text-white border-[#D49B37]' : 'bg-[#131922] text-orange-300 border-orange-500/20')}
              >
                <Flame className="w-3 h-3 text-orange-400" />
                Non-Veg
              </button>
              <button
                onClick={() => setDietaryFilter('seafood')}
                className={"px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 border " + (dietaryFilter === 'seafood' ? 'bg-cyan-900 text-white border-cyan-400' : 'bg-[#131922] text-cyan-300 border-cyan-500/20')}
              >
                <Fish className="w-3 h-3" />
                Seafood
              </button>
            </div>
          </div>

        </div>

        {/* Clean Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((dish) => {
            const qty = getItemCartQuantity(dish.id);

            return (
              <div
                key={dish.id}
                className="rounded-3xl bg-[#131922] border border-white/10 hover:border-[#D49B37]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl group"
              >
                {/* Photo & Clean Overlay */}
                <div className="relative h-52 w-full overflow-hidden bg-gray-900">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131922] via-transparent to-black/30" />

                  {/* Clean Tags */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    {dish.isChefSpecial && (
                      <span className="bg-[#992B15] text-[#FFF0B8] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow border border-[#D49B37]/30">
                        ★ Chef Signature
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3">
                    {dish.dietary === 'veg' && (
                      <span className="w-5 h-5 rounded bg-white/90 border border-emerald-600 flex items-center justify-center shadow">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                      </span>
                    )}
                    {dish.dietary === 'non-veg' && (
                      <span className="w-5 h-5 rounded bg-white/90 border border-red-600 flex items-center justify-center shadow">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                      </span>
                    )}
                    {dish.dietary === 'seafood' && (
                      <span className="w-5 h-5 rounded bg-cyan-950 border border-cyan-400 flex items-center justify-center shadow">
                        <Fish className="w-3 h-3 text-cyan-300" />
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedDishModal(dish)}
                    className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-black/60 hover:bg-black text-gray-300 hover:text-white border border-white/20 transition"
                    title="View Details"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-base font-serif font-bold text-white group-hover:text-[#F3C367] transition-colors line-clamp-1">
                        {dish.name}
                      </h3>
                    </div>
                    <p className="text-xs font-serif text-[#D49B37] font-medium mt-0.5">
                      {dish.bengaliName}
                    </p>
                    <p className="text-xs text-gray-300 font-light mt-2 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  {/* Price & Add Action */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-[#F8DA96]">₹{dish.price}</span>
                      <span className="text-[10px] text-gray-400 block">{dish.portion}</span>
                    </div>

                    {qty === 0 ? (
                      <button
                        onClick={() => addToCart(dish, 1)}
                        className="px-4 py-2 rounded-xl bg-[#992B15] hover:bg-[#B83A1B] text-white text-xs font-bold uppercase tracking-wider transition active:scale-95 flex items-center gap-1.5 shadow"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-[#1A222E] border border-[#D49B37]/40 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(dish.id, qty - 1)}
                          className="w-6 h-6 rounded-lg bg-[#10151E] text-white flex items-center justify-center text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1.5">{qty}</span>
                        <button
                          onClick={() => updateQuantity(dish.id, qty + 1)}
                          className="w-6 h-6 rounded-lg bg-[#D49B37] text-black flex items-center justify-center text-xs font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Dish Modal */}
      {selectedDishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#151C27] border border-[#D49B37]/40 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl">
            <div className="relative h-60 w-full">
              <Image
                src={selectedDishModal.image}
                alt={selectedDishModal.name}
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151C27] to-transparent" />
              <button
                onClick={() => setSelectedDishModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition border border-white/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-2xl font-serif font-bold text-white">
                  {selectedDishModal.name}
                </h3>
                <p className="text-sm font-serif text-[#F8DA96]">
                  {selectedDishModal.bengaliName}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                {selectedDishModal.description}
              </p>

              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#0D1117] border border-white/5 text-xs text-gray-300">
                <div>
                  <span className="text-gray-400 block text-[11px]">Portion:</span>
                  <span className="font-semibold text-white">{selectedDishModal.portion}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Spice Heat:</span>
                  <span className="font-semibold text-[#F8DA96] capitalize">{selectedDishModal.spiceLevel}</span>
                </div>
                {selectedDishModal.pairingSuggestion && (
                  <div className="col-span-2 pt-2 border-t border-white/5">
                    <span className="text-gray-400 block text-[11px]">Chef Recommendation:</span>
                    <span className="text-[#F3C367]">{selectedDishModal.pairingSuggestion}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-2xl font-bold text-[#F8DA96]">₹{selectedDishModal.price}</span>

                <button
                  onClick={() => {
                    addToCart(selectedDishModal, 1);
                    setSelectedDishModal(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#D49B37] hover:bg-[#E5AC46] text-black text-xs font-bold uppercase tracking-wider transition shadow"
                >
                  Add to Pre-Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
