'use client';

import React, { useState } from "react";
import { useRestaurant } from "../context/RestaurantContext";
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  CalendarDays, 
  DollarSign, 
  CheckCircle2, 
  X, 
  Sparkles, 
  MessageCircle, 
  Search, 
  Utensils, 
  Calculator, 
  ArrowUpRight,
  Eye,
  Info,
  ShieldCheck
} from "lucide-react";
import Image from "next/image";

export function AdminDashboard() {
  const { 
    isAdminMode, 
    setIsAdminMode, 
    reservations, 
    updateReservationStatus, 
    tables, 
    updateTableStatus,
    menuItems,
    toggleItemAvailability,
    updateItemPrice,
    addToast
  } = useRestaurant();

  const [activeTab, setActiveTab] = useState<"reservations" | "floor-plan" | "menu-inventory" | "roi-calculator">("reservations");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // ROI Calculator state
  const [monthlyOrders, setMonthlyOrders] = useState<number>(650);
  const [avgTicket, setAvgTicket] = useState<number>(1850);

  if (!isAdminMode) return null;

  const filteredReservations = reservations.filter((r) => {
    if (filterStatus !== "all" && r.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return r.customerName.toLowerCase().includes(q) || r.phone.includes(q) || r.id.toLowerCase().includes(q);
    }
    return true;
  });

  // Calculate Illustrative ROI
  const totalVolume = monthlyOrders * avgTicket;
  const commissionLostThirdParty = Math.round(totalVolume * 0.28);
  const directPlatformCost = 0;
  const netMonthlyRetained = commissionLostThirdParty - directPlatformCost;
  const annualSavings = netMonthlyRetained * 12;

  const handleSendWhatsAppReminder = (phone: string, name: string, id: string) => {
    const text = encodeURIComponent("Nomoshkar " + name + "! Your table at Bhoj Adda (Ref " + id + ") is prepared. Our host awaits your arrival. See you soon!");
    window.open("https://wa.me/" + phone.replace(/[^0-9]/g, "") + "?text=" + text, "_blank");
    addToast("WhatsApp Sent (Demo)", "Sample reminder triggered for " + name, "success");
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070A0F] text-white flex flex-col overflow-hidden animate-in fade-in duration-200">
      
      {/* Top Header */}
      <header className="bg-[#0E141E] border-b border-[#D49B37]/30 px-4 sm:px-8 py-4 flex items-center justify-between shadow-xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#992B15] to-[#D49B37] p-0.5 flex items-center justify-center shadow-lg">
            <div className="w-full h-full bg-[#0A0D12] rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-[#F8DA96]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
                Restaurant Owner Cockpit
              </h2>
              <span className="text-[10px] bg-[#992B15] text-[#FFF0B8] border border-[#D49B37]/40 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Concept Demo
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Sample Dashboard Data • Illustrative floor matrix and guest queue
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAdminMode(false)}
            className="px-4 py-2 rounded-xl bg-[#1C2636] hover:bg-[#253348] border border-white/10 text-xs font-bold text-gray-200 hover:text-white transition flex items-center gap-2"
          >
            <Eye className="w-4 h-4 text-[#D49B37]" />
            <span>Return to Diner View</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
        
        {/* Concept Demo Disclaimer Banner */}
        <div className="p-3.5 rounded-2xl bg-[#151C27] border border-[#D49B37]/30 flex items-center justify-between text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#D49B37] shrink-0" />
            <span>This dashboard contains <strong>Sample Demonstration Data</strong> to show how live table seating, menu stock, and CRM work.</span>
          </div>
          <span className="text-[11px] text-[#F8DA96] font-mono font-semibold hidden sm:inline">SAMPLE DASHBOARD DATA</span>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* KPI 1 */}
          <div className="p-5 rounded-2xl bg-[#121822] border-2 border-emerald-500/40 shadow-xl">
            <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold mb-2">
              <span>Illustrative Commission Saved</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-mono font-black text-white">₹1,42,800</span>
              <span className="text-[10px] text-gray-400">(Sample)</span>
            </div>
            <p className="text-[11px] text-gray-300 mt-1">
              28% commission retained on direct bookings
            </p>
          </div>

          {/* KPI 2 */}
          <div className="p-5 rounded-2xl bg-[#121822] border border-[#D49B37]/30 shadow-xl">
            <div className="flex items-center justify-between text-xs text-[#F8DA96] font-semibold mb-2">
              <span>Sample Direct Revenue</span>
              <DollarSign className="w-4 h-4 text-[#D49B37]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-mono font-black text-white">₹84,600</span>
              <span className="text-[10px] text-emerald-400 font-bold">(Sample Data)</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              Advance deposits + direct pre-orders
            </p>
          </div>

          {/* KPI 3 */}
          <div className="p-5 rounded-2xl bg-[#121822] border border-white/10 shadow-xl">
            <div className="flex items-center justify-between text-xs text-gray-300 font-semibold mb-2">
              <span>Today's Reservations (Demo)</span>
              <CalendarDays className="w-4 h-4 text-[#D49B37]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-mono font-black text-white">{reservations.length}</span>
              <span className="text-xs text-gray-400">({reservations.reduce((acc, r) => acc + r.guests, 0)} Demo Guests)</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              88% Table Occupancy Rate (Sample)
            </p>
          </div>

          {/* KPI 4 */}
          <div className="p-5 rounded-2xl bg-[#121822] border border-white/10 shadow-xl">
            <div className="flex items-center justify-between text-xs text-gray-300 font-semibold mb-2">
              <span>Sample Customer CRM Base</span>
              <Users className="w-4 h-4 text-[#D49B37]" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-mono font-black text-white">3,420</span>
              <span className="text-xs text-gray-400">Sample Diners</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              Direct diner contacts & birthdays owned
            </p>
          </div>

        </div>

        {/* Dashboard Sub-Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("reservations")}
            className={"px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 flex items-center gap-2 border " + (activeTab === "reservations" ? "bg-[#D49B37] text-black border-[#F8DA96] shadow" : "bg-[#131922] text-gray-300 border-white/10 hover:text-white")}
          >
            <CalendarDays className="w-4 h-4" />
            <span>Sample Reservation Queue ({reservations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("floor-plan")}
            className={"px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 flex items-center gap-2 border " + (activeTab === "floor-plan" ? "bg-[#D49B37] text-black border-[#F8DA96] shadow" : "bg-[#131922] text-gray-300 border-white/10 hover:text-white")}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Live Floor Plan & Table Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab("menu-inventory")}
            className={"px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 flex items-center gap-2 border " + (activeTab === "menu-inventory" ? "bg-[#D49B37] text-black border-[#F8DA96] shadow" : "bg-[#131922] text-gray-300 border-white/10 hover:text-white")}
          >
            <Utensils className="w-4 h-4" />
            <span>Live Menu Stock & Pricing</span>
          </button>

          <button
            onClick={() => setActiveTab("roi-calculator")}
            className={"px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 flex items-center gap-2 border " + (activeTab === "roi-calculator" ? "bg-[#D49B37] text-black border-[#F8DA96] shadow" : "bg-[#131922] text-gray-300 border-white/10 hover:text-white")}
          >
            <Calculator className="w-4 h-4" />
            <span>Illustrative ROI Calculation</span>
          </button>
        </div>

        {/* TAB 1: RESERVATIONS QUEUE */}
        {activeTab === "reservations" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sample diners..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#131922] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D49B37]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                {["all", "confirmed", "seated", "completed", "cancelled"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={"px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition border " + (filterStatus === st ? "bg-[#992B15] text-white border-[#D49B37]" : "bg-[#131922] text-gray-400 border-white/5 hover:text-white")}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[#101620] border border-white/10 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#151C27] border-b border-white/10 text-gray-300 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3.5 px-4">Ref & Diner [Demo]</th>
                      <th className="py-3.5 px-4">Time & Branch</th>
                      <th className="py-3.5 px-4">Party & Zone</th>
                      <th className="py-3.5 px-4">Guarantee Deposit</th>
                      <th className="py-3.5 px-4">Current Status</th>
                      <th className="py-3.5 px-4 text-right">Host Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {filteredReservations.map((res) => (
                      <tr key={res.id} className="hover:bg-[#151C27]/50 transition">
                        <td className="py-3 px-4">
                          <div className="font-bold text-white text-sm">{res.customerName}</div>
                          <div className="text-[11px] text-[#F8DA96] font-mono">{res.id} • {res.phone}</div>
                          {res.occasion && (
                            <span className="text-[10px] text-gray-400 block mt-0.5">Occasion: {res.occasion}</span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-semibold text-white">{res.time}</div>
                          <div className="text-[11px] text-gray-400">{res.date}</div>
                          <span className="text-[10px] text-amber-300 block">
                            {res.branch === "park-street" ? "Park Street (Demo)" : "Salt Lake (Demo)"}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-bold text-white">{res.guests} Guests</div>
                          <div className="text-[11px] text-gray-400 capitalize">{res.seatingArea.replace("-", " ")}</div>
                          <span className="text-[10px] text-emerald-400">Assigned Table #{res.tableNumber || 4}</span>
                        </td>

                        <td className="py-3 px-4">
                          {res.advanceDepositPaid ? (
                            <span className="inline-flex items-center gap-1 bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-semibold text-[10px]">
                              <CheckCircle2 className="w-3 h-3" /> ₹{res.advanceAmount} Paid (Razorpay Demo)
                            </span>
                          ) : (
                            <span className="text-gray-400 text-[11px]">Pay at Venue</span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <span className={"inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase " + (res.status === "confirmed" ? "bg-amber-950 text-amber-300 border border-amber-500/30" : res.status === "seated" ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30" : res.status === "completed" ? "bg-gray-800 text-gray-300" : "bg-red-950 text-red-300")}>
                            {res.status}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {res.status === "confirmed" && (
                              <button
                                onClick={() => updateReservationStatus(res.id, "seated", res.tableNumber)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[10px] transition"
                              >
                                Seat Guest
                              </button>
                            )}

                            {res.status === "seated" && (
                              <button
                                onClick={() => updateReservationStatus(res.id, "completed", res.tableNumber)}
                                className="px-2.5 py-1 rounded-lg bg-blue-700 hover:bg-blue-600 text-white font-bold text-[10px] transition"
                              >
                                Complete Bill
                              </button>
                            )}

                            <button
                              onClick={() => handleSendWhatsAppReminder(res.phone, res.customerName, res.id)}
                              className="p-1.5 rounded-lg bg-[#128C7E]/20 hover:bg-[#128C7E]/40 text-[#25D366] transition border border-[#25D366]/30"
                              title="Send WhatsApp Host Reminder"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE FLOOR PLAN */}
        {activeTab === "floor-plan" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-serif font-bold text-white">
                  Floor Plan & Table Status Matrix [Demo]
                </h3>
                <p className="text-xs text-gray-400">
                  Click any table to toggle status between Available, Reserved, and Occupied.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Available</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /> Reserved</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> Occupied</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {tables.map((table) => {
                const nextStatus = table.status === "available" ? "reserved" : table.status === "reserved" ? "occupied" : "available";

                return (
                  <div
                    key={table.id}
                    onClick={() => updateTableStatus(table.id, nextStatus)}
                    className={"p-4 rounded-2xl border-2 cursor-pointer transition-all hover:scale-[1.02] shadow-xl " + (table.status === "available" ? "bg-[#0E1C15] border-emerald-500/50" : table.status === "reserved" ? "bg-[#1E190E] border-amber-500/50" : "bg-[#201012] border-red-500/50")}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold font-serif text-white">{table.name}</span>
                      <span className={"text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full " + (table.status === "available" ? "bg-emerald-900 text-emerald-300" : table.status === "reserved" ? "bg-amber-900 text-amber-300" : "bg-red-900 text-red-300")}>
                        {table.status}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-gray-300">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Capacity:</span>
                        <span className="font-semibold text-white">{table.capacity} Pax</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Zone:</span>
                        <span className="text-[#F8DA96]">{table.zone}</span>
                      </div>
                      {table.currentGuestName && (
                        <div className="pt-2 border-t border-white/5 text-[11px] text-white font-medium">
                          👤 {table.currentGuestName}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: LIVE MENU STOCK */}
        {activeTab === "menu-inventory" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-serif font-bold text-white">
                Live Menu Stock & Dynamic Price Manager
              </h3>
              <p className="text-xs text-gray-400">
                Toggle dish availability in real-time or update direct pricing. Changes immediately reflect on customer menu.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map((dish) => (
                <div
                  key={dish.id}
                  className="p-4 rounded-2xl bg-[#101620] border border-white/10 flex flex-col justify-between space-y-3"
                >
                  <div className="flex gap-3 items-center">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/10">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-white truncate">{dish.name}</h4>
                      <p className="text-xs text-[#D49B37] font-serif">{dish.bengaliName}</p>
                      <span className="text-[10px] text-gray-400 capitalize">{dish.category.replace("-", " ")}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Price:</span>
                      <span className="text-sm font-bold text-[#F8DA96]">₹{dish.price}</span>
                      <button
                        onClick={() => updateItemPrice(dish.id, dish.price + 20)}
                        className="px-1.5 py-0.5 rounded bg-[#1C2636] hover:bg-[#D49B37] hover:text-black text-gray-300 text-[10px] font-bold"
                        title="+₹20"
                      >
                        +20
                      </button>
                      <button
                        onClick={() => updateItemPrice(dish.id, Math.max(50, dish.price - 20))}
                        className="px-1.5 py-0.5 rounded bg-[#1C2636] hover:bg-[#992B15] text-gray-300 text-[10px] font-bold"
                        title="-₹20"
                      >
                        -20
                      </button>
                    </div>

                    <button
                      onClick={() => toggleItemAvailability(dish.id)}
                      className={"px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition " + (dish.isAvailable ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40" : "bg-red-950 text-red-300 border border-red-500/40")}
                    >
                      {dish.isAvailable ? "In Stock" : "Sold Out"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ILLUSTRATIVE ROI CALCULATION */}
        {activeTab === "roi-calculator" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#121822] border-2 border-[#D49B37] shadow-2xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#992B15] flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-[#F8DA96]" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">
                    Illustrative ROI Calculation
                  </h3>
                  <p className="text-xs text-[#F8DA96]">
                    Simulate how much revenue you retain by converting social traffic directly to Bhoj Adda website.
                  </p>
                </div>
              </div>

              {/* Slider Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-2xl bg-[#0D1117] border border-white/10">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-gray-300 mb-2">
                    <span>Estimated Monthly Direct Orders:</span>
                    <span className="text-[#F8DA96] text-sm font-mono">{monthlyOrders} Orders</span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={2500}
                    step={50}
                    value={monthlyOrders}
                    onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                    className="w-full accent-[#D49B37] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                    <span>100</span>
                    <span>1,000</span>
                    <span>2,500 orders/mo</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-gray-300 mb-2">
                    <span>Average Dining Ticket Size:</span>
                    <span className="text-[#F8DA96] text-sm font-mono">₹{avgTicket}</span>
                  </div>
                  <input
                    type="range"
                    min={800}
                    max={5000}
                    step={100}
                    value={avgTicket}
                    onChange={(e) => setAvgTicket(Number(e.target.value))}
                    className="w-full accent-[#D49B37] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                    <span>₹800</span>
                    <span>₹2,500</span>
                    <span>₹5,000</span>
                  </div>
                </div>
              </div>

              {/* Simulation Result Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-2xl bg-[#131922] border border-white/5">
                  <span className="text-xs text-gray-400 block">Gross Order Volume</span>
                  <span className="text-xl sm:text-2xl font-mono font-bold text-white mt-1 block">
                    ₹{totalVolume.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-gray-500">Per Month</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#201012] border border-red-500/30">
                  <span className="text-xs text-red-300 block">If on Delivery Apps (28% Cut)</span>
                  <span className="text-xl sm:text-2xl font-mono font-bold text-red-400 mt-1 block">
                    -₹{commissionLostThirdParty.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-red-300/70">Lost in app commissions</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#0E1C15] border-2 border-emerald-400 shadow-xl">
                  <span className="text-xs text-emerald-300 font-bold block">Annual Profit Retained</span>
                  <span className="text-2xl sm:text-3xl font-mono font-black text-emerald-300 mt-1 block">
                    ₹{annualSavings.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">+ {monthlyOrders} Direct CRM contacts</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
