import React, { useState } from "react";
import { useRestaurant } from "../context/RestaurantContext";
import { 
  X, 
  CalendarDays, 
  Clock, 
  Users, 
  MapPin, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  Heart, 
  UtensilsCrossed,
  Flame,
  AlertCircle
} from "lucide-react";
import { BRANCHES } from "../data/mockData";

const TIME_SLOTS = {
  lunch: [
    { time: "12:30 PM", status: "Available", tablesLeft: 6 },
    { time: "01:15 PM", status: "Filling Fast", tablesLeft: 3 },
    { time: "02:00 PM", status: "Available", tablesLeft: 5 },
    { time: "02:45 PM", status: "Available", tablesLeft: 8 },
  ],
  dinner: [
    { time: "07:00 PM", status: "Available", tablesLeft: 4 },
    { time: "07:45 PM", status: "Filling Fast", tablesLeft: 2 },
    { time: "08:30 PM", status: "High Demand", tablesLeft: 1 },
    { time: "09:15 PM", status: "Filling Fast", tablesLeft: 3 },
    { time: "10:00 PM", status: "Available", tablesLeft: 5 },
  ]
};

const SEATING_ZONES = [
  { id: "royal-baithak", name: "Royal Zamindari Baithak", desc: "Low seating with bolsters, brass lanterns, live acoustic music", icon: "👑" },
  { id: "window-terrace", name: "Window / Terrace Lounge", desc: "Panoramic Kolkata street & skyline views, romantic breeze", icon: "🌆" },
  { id: "family-hall", name: "Grand Family Bhoj Hall", desc: "Spacious banquet tables ideal for large family reunions", icon: "👨‍👩‍👧‍👦" },
  { id: "private-dining", name: "Private Zamindari Chamber (PDR)", desc: "Exclusive luxury dining chamber with dedicated personal butler", icon: "🚪" },
];

const OCCASIONS = [
  "Casual Dining & Adda",
  "Birthday Celebration",
  "Wedding Anniversary",
  "Annaprashan (First Rice)",
  "Business Dining",
  "Family Gathering",
  "Romantic Date"
];

export function TableReservationWizard() {
  const { 
    isReservationModalOpen, 
    setIsReservationModalOpen, 
    addReservation,
    setPendingReservation,
    setIsRazorpayModalOpen,
    setConfirmedReservation,
    setIsBookingPassOpen,
    addToast
  } = useRestaurant();

  const [step, setStep] = useState<number>(1);

  // Form State
  const [branch, setBranch] = useState<"park-street" | "salt-lake">("park-street");
  const [seatingArea, setSeatingArea] = useState<any>("royal-baithak");
  const [date, setDate] = useState<string>(() => new Date().toISOString().split("T")[0]);
  const [timeSlot, setTimeSlot] = useState<string>("08:30 PM");
  const [mealType, setMealType] = useState<"lunch" | "dinner">("dinner");
  const [guests, setGuests] = useState<number>(4);
  const [customerName, setCustomerName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [occasion, setOccasion] = useState<string>("Casual Dining & Adda");
  const [specialRequests, setSpecialRequests] = useState<string>("");
  const [paymentChoice, setPaymentChoice] = useState<"guarantee-deposit" | "pay-at-venue">("guarantee-deposit");

  if (!isReservationModalOpen) return null;

  const handleNext = () => {
    if (step === 3) {
      if (!customerName.trim() || !phone.trim()) {
        addToast("Missing Information", "Please enter your Name and Phone number.", "warning");
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCompleteBooking = () => {
    const reservationPayload = {
      customerName,
      phone,
      email: email || "guest@bhojadda.com",
      guests,
      date,
      time: timeSlot,
      branch,
      seatingArea,
      occasion,
      specialRequests,
      advanceDepositPaid: paymentChoice === "guarantee-deposit",
      advanceAmount: paymentChoice === "guarantee-deposit" ? 500 : 0,
      paymentMethod: paymentChoice === "guarantee-deposit" ? ("razorpay-upi" as const) : ("pay-at-venue" as const),
    };

    if (paymentChoice === "guarantee-deposit") {
      setPendingReservation(reservationPayload);
      setIsReservationModalOpen(false);
      setIsRazorpayModalOpen(true);
    } else {
      const confirmed = addReservation(reservationPayload);
      setConfirmedReservation(confirmed);
      setIsReservationModalOpen(false);
      setIsBookingPassOpen(true);
      addToast("Table Reserved!", "Your reservation is confirmed at Bhoj Adda.", "success");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#121822] border border-[#D49B37]/40 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl text-white my-8">
        
        {/* Header & Steps Indicator */}
        <div className="p-6 bg-gradient-to-r from-[#182230] to-[#121822] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#992B15] border border-[#D49B37]/40 flex items-center justify-center font-serif text-lg font-bold text-[#F8DA96]">
              BA
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white flex items-center gap-2">
                VIP Table Reservation
                <span className="text-xs font-normal text-[#F8DA96] bg-[#992B15]/60 px-2 py-0.5 rounded border border-[#D49B37]/30">
                  Step {step} of 4
                </span>
              </h3>
              <p className="text-xs text-gray-400">
                Direct booking ensures priority seating & complimentary welcome drink.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsReservationModalOpen(false)}
            className="w-8 h-8 rounded-full bg-black/50 hover:bg-black text-gray-400 hover:text-white flex items-center justify-center transition border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-4 bg-[#0A0D12] h-1.5">
          <div className={"h-full " + (step >= 1 ? "bg-[#D49B37]" : "bg-gray-800")} />
          <div className={"h-full " + (step >= 2 ? "bg-[#D49B37]" : "bg-gray-800")} />
          <div className={"h-full " + (step >= 3 ? "bg-[#D49B37]" : "bg-gray-800")} />
          <div className={"h-full " + (step >= 4 ? "bg-[#D49B37]" : "bg-gray-800")} />
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* STEP 1: Branch & Seating Zone */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-[#F8DA96] uppercase tracking-wider block mb-2">
                  1. Choose Bhoj Adda Location
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BRANCHES.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBranch(b.id as any)}
                      className={"p-4 rounded-xl border text-left transition relative " + (branch === b.id ? "bg-[#1C2636] border-[#D49B37] ring-1 ring-[#D49B37]" : "bg-[#151C27] border-white/10 hover:border-white/20")}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif font-bold text-white text-sm">{b.name}</span>
                        {branch === b.id && <Check className="w-4 h-4 text-[#D49B37]" />}
                      </div>
                      <p className="text-xs text-[#D49B37] font-serif">{b.bengaliName}</p>
                      <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">{b.landmark}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#F8DA96] uppercase tracking-wider block mb-2">
                  2. Preferred Dining Ambience & Seating Area
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SEATING_ZONES.map((zone) => (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => setSeatingArea(zone.id)}
                      className={"p-3.5 rounded-xl border text-left transition " + (seatingArea === zone.id ? "bg-[#1C2636] border-[#D49B37] ring-1 ring-[#D49B37]" : "bg-[#151C27] border-white/10 hover:border-white/20")}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{zone.icon}</span>
                        <span className="font-serif font-bold text-sm text-white">{zone.name}</span>
                      </div>
                      <p className="text-xs text-gray-400 font-light leading-relaxed">{zone.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Date, Time & Meal Type */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#F8DA96] uppercase tracking-wider block mb-2">
                    Select Reservation Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#151C27] border border-[#D49B37]/40 text-white text-sm focus:outline-none focus:border-[#D49B37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#F8DA96] uppercase tracking-wider block mb-2">
                    Select Meal Service
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#151C27] rounded-xl border border-white/10 text-xs">
                    <button
                      type="button"
                      onClick={() => setMealType("lunch")}
                      className={"py-2 rounded-lg font-bold transition " + (mealType === "lunch" ? "bg-[#992B15] text-white" : "text-gray-400 hover:text-white")}
                    >
                      Lunch (12:30 - 3:30 PM)
                    </button>
                    <button
                      type="button"
                      onClick={() => setMealType("dinner")}
                      className={"py-2 rounded-lg font-bold transition " + (mealType === "dinner" ? "bg-[#992B15] text-white" : "text-gray-400 hover:text-white")}
                    >
                      Dinner (7:00 - 11:30 PM)
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#F8DA96] uppercase tracking-wider block mb-2">
                  Available Time Slots ({mealType.toUpperCase()})
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {(mealType === "lunch" ? TIME_SLOTS.lunch : TIME_SLOTS.dinner).map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setTimeSlot(slot.time)}
                      className={"p-3 rounded-xl border text-center transition relative " + (timeSlot === slot.time ? "bg-[#1C2636] border-[#D49B37] ring-1 ring-[#D49B37]" : "bg-[#151C27] border-white/10 hover:border-white/20")}
                    >
                      <span className="font-bold text-sm block text-white">{slot.time}</span>
                      <span className={"text-[10px] font-semibold block mt-0.5 " + (slot.tablesLeft <= 2 ? "text-amber-400" : "text-emerald-400")}>
                        {slot.tablesLeft} tables left
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0D1117] border border-white/5 flex items-center gap-2.5 text-xs text-gray-300">
                <Clock className="w-4 h-4 text-[#D49B37] shrink-0" />
                <span>Tables are held for 15 minutes past reservation time.</span>
              </div>
            </div>
          )}

          {/* STEP 3: Guests & Contact Details */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#F8DA96] uppercase tracking-wider block mb-2">
                  Number of Guests
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={"w-11 h-11 rounded-xl border font-bold text-sm shrink-0 transition " + (guests === num ? "bg-[#D49B37] text-black border-[#F8DA96]" : "bg-[#151C27] text-white border-white/10 hover:border-white/30")}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-xs text-gray-300 block mb-1">Customer Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sourav Sengupta"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C27] border border-white/10 text-white text-sm focus:outline-none focus:border-[#D49B37]"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-300 block mb-1">Phone Number (For WhatsApp Pass) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98300 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C27] border border-white/10 text-white text-sm focus:outline-none focus:border-[#D49B37]"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-300 block mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C27] border border-white/10 text-white text-sm focus:outline-none focus:border-[#D49B37]"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-300 block mb-1">Dining Occasion</label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C27] border border-white/10 text-white text-sm focus:outline-none focus:border-[#D49B37]"
                  >
                    {OCCASIONS.map((occ) => (
                      <option key={occ} value={occ} className="bg-[#121822]">
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Special Preferences / Dietary Requests</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Low chili for grandparents, high chair needed, anniversary table decor..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#151C27] border border-white/10 text-white text-xs focus:outline-none focus:border-[#D49B37]"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Table Guarantee & Advance Payment Choice */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#182230] to-[#121822] border border-[#D49B37]/40 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#F8DA96]" />
                    <h4 className="text-sm font-bold text-white">Booking Summary</h4>
                  </div>
                  <span className="text-xs text-[#F8DA96] font-semibold">{branch === "park-street" ? "Park Street Flagship" : "Salt Lake Skyline"}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs pt-3 text-gray-300">
                  <div><strong>Date:</strong> {date}</div>
                  <div><strong>Time:</strong> {timeSlot}</div>
                  <div><strong>Guests:</strong> {guests} Guests</div>
                  <div><strong>Seating:</strong> {seatingArea.replace("-", " ")}</div>
                  <div className="col-span-2"><strong>Diner:</strong> {customerName} ({phone})</div>
                </div>
              </div>

              {/* Payment Selection Options */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#F8DA96] uppercase tracking-wider block">
                  Select Table Confirmation Mode
                </label>

                {/* Option 1: Guarantee with Razorpay (Recommended) */}
                <div
                  onClick={() => setPaymentChoice("guarantee-deposit")}
                  className={"p-4 rounded-2xl border-2 cursor-pointer transition relative " + (paymentChoice === "guarantee-deposit" ? "bg-[#1C2636] border-[#D49B37] shadow-xl" : "bg-[#151C27] border-white/10 hover:border-white/20")}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full border border-[#D49B37] flex items-center justify-center shrink-0 mt-0.5">
                        {paymentChoice === "guarantee-deposit" && <div className="w-2.5 h-2.5 rounded-full bg-[#D49B37]" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-bold text-white">
                            VIP Table Guarantee (₹500 Deposit)
                          </h5>
                          <span className="text-[10px] bg-emerald-900/80 text-emerald-300 px-2 py-0.5 rounded font-bold border border-emerald-500/30">
                            100% Adjusted on Food Bill
                          </span>
                        </div>
                        <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                          Guarantees your table with <strong>zero waiting line</strong> on weekend rush + unlocks <strong>Free Gondhoraj Ghol</strong> welcome drink for all guests.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Option 2: Pay at Venue */}
                <div
                  onClick={() => setPaymentChoice("pay-at-venue")}
                  className={"p-4 rounded-2xl border cursor-pointer transition " + (paymentChoice === "pay-at-venue" ? "bg-[#1C2636] border-[#D49B37] shadow-xl" : "bg-[#151C27] border-white/10 hover:border-white/20")}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center shrink-0 mt-0.5">
                      {paymentChoice === "pay-at-venue" && <div className="w-2.5 h-2.5 rounded-full bg-[#D49B37]" />}
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-gray-200">
                        Standard Walk-in Booking (Pay at Venue)
                      </h5>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Table held for 15 minutes. May involve waiting queue during peak hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-4 sm:p-6 bg-[#0D1117] border-t border-white/10 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="px-4 py-2 rounded-xl bg-[#151C27] hover:bg-[#1D2635] text-white text-xs font-semibold flex items-center gap-1.5 transition border border-white/10"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          ) : <div />}

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-[#D49B37] hover:bg-[#E5AC46] text-black text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-lg"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleCompleteBooking}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#992B15] via-[#B83A1B] to-[#D49B37] hover:opacity-95 text-white text-xs font-extrabold uppercase tracking-wider transition flex items-center gap-2 shadow-xl"
            >
              {paymentChoice === "guarantee-deposit" ? (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Proceed to Pay ₹500 Guarantee</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Confirm Free Reservation</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
