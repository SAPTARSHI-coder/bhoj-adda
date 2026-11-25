import React from "react";
import { useRestaurant } from "../context/RestaurantContext";
import { 
  X, 
  CheckCircle2, 
  QrCode, 
  CalendarDays, 
  MapPin, 
  Users, 
  Sparkles, 
  Download, 
  Share2, 
  MessageCircle, 
  Coins,
  Clock,
  Printer
} from "lucide-react";

export function BookingPassModal() {
  const { isBookingPassOpen, setIsBookingPassOpen, confirmedReservation } = useRestaurant();

  if (!isBookingPassOpen || !confirmedReservation) return null;

  const res = confirmedReservation;

  const handleAddToCalendar = () => {
    const title = encodeURIComponent("Dining at Bhoj Adda (" + (res.branch === "park-street" ? "Park St" : "Salt Lake") + ")");
    const details = encodeURIComponent("Table reservation for " + res.guests + " guests. Booking ID: " + res.id + ". Special requests: " + (res.specialRequests || "None"));
    const location = encodeURIComponent(res.branch === "park-street" ? "18A Park Street, Kolkata" : "Infinity Benchmark, Sector V, Salt Lake, Kolkata");
    const calendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + title + "&details=" + details + "&location=" + location;
    window.open(calendarUrl, "_blank");
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      "*BHOJ ADDA VIP DINING PASS* 🎟️\n" +
      "*Booking Ref:* " + res.id + "\n" +
      "*Guest Name:* " + res.customerName + "\n" +
      "*Party Size:* " + res.guests + " Guests\n" +
      "*Date & Time:* " + res.date + " at " + res.time + "\n" +
      "*Location:* " + (res.branch === "park-street" ? "Park Street Flagship" : "Salt Lake Skyline") + "\n" +
      "*Seating Zone:* " + res.seatingArea.toUpperCase() + "\n" +
      (res.advanceDepositPaid ? "*Advance Deposit:* ₹" + res.advanceAmount + " (Fully Deductible on Bill)\n" : "") +
      "*Status:* CONFIRMED ✅\n\n" +
      "See you at Kolkata heritage Adda!"
    );
    window.open("https://wa.me/?text=" + text, "_blank");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#121822] border-2 border-[#D49B37] rounded-3xl max-w-md w-full overflow-hidden shadow-2xl text-white">
        
        {/* Pass Top Banner */}
        <div className="bg-gradient-to-r from-[#7A2207] via-[#992B15] to-[#7A2207] p-5 text-center relative border-b border-[#D49B37]/40">
          <button
            onClick={() => setIsBookingPassOpen(false)}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/40 hover:bg-black text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-12 h-12 rounded-full bg-[#0A0D12] border-2 border-[#D49B37] mx-auto flex items-center justify-center mb-2 shadow-lg">
            <CheckCircle2 className="w-6 h-6 text-[#F8DA96]" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFF0B8] bg-black/30 px-2.5 py-0.5 rounded-full border border-[#D49B37]/30 inline-block mb-1">
            VIP Priority Reservation Confirmed
          </span>
          <h3 className="text-xl font-serif font-bold text-white">
            Bhoj Adda Kolkata
          </h3>
          <p className="text-xs text-[#F8DA96] font-serif">ভোজ আড্ডা • রাজকীয় আতিথেয়তা</p>
        </div>

        {/* Ticket Body */}
        <div className="p-6 space-y-4 bg-[#151C27]">
          
          {/* Reference & QR Box */}
          <div className="p-4 rounded-2xl bg-[#0D1117] border border-[#D49B37]/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Booking Reference</span>
              <span className="text-xl font-mono font-black text-[#F8DA96] tracking-wider">{res.id}</span>
              <p className="text-[11px] text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Priority Table #{res.tableNumber || 5}
              </p>
            </div>

            <div className="w-16 h-16 bg-white p-1 rounded-xl shadow-md flex items-center justify-center">
              <QrCode className="w-14 h-14 text-black" />
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-[#0D1117] border border-white/5">
              <span className="text-gray-400 block text-[10px]">Guest Name</span>
              <span className="font-semibold text-white truncate block">{res.customerName}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#0D1117] border border-white/5">
              <span className="text-gray-400 block text-[10px]">Party Size</span>
              <span className="font-semibold text-white">{res.guests} Diners</span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#0D1117] border border-white/5">
              <span className="text-gray-400 block text-[10px]">Date & Time</span>
              <span className="font-semibold text-[#F8DA96]">{res.date} at {res.time}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#0D1117] border border-white/5">
              <span className="text-gray-400 block text-[10px]">Location</span>
              <span className="font-semibold text-white truncate block">
                {res.branch === "park-street" ? "Park Street Flagship" : "Salt Lake Skyline"}
              </span>
            </div>
          </div>

          {/* Perks & Deposit Banner */}
          <div className="p-3 rounded-xl bg-[#992B15]/30 border border-[#D49B37]/40 space-y-1 text-xs">
            {res.advanceDepositPaid && (
              <div className="flex items-center justify-between text-emerald-300 font-semibold">
                <span>Advance Deposit Paid:</span>
                <span>₹{res.advanceAmount} (Deductible on Bill)</span>
              </div>
            )}
            <div className="flex items-center justify-between text-[#F8DA96]">
              <span>Complimentary Perk:</span>
              <span>Free Gondhoraj Ghol Welcome Drink</span>
            </div>
            <div className="flex items-center justify-between text-gray-300 text-[11px]">
              <span>Bhoj Club Coins Earned:</span>
              <span className="font-bold text-white">+150 Coins</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <button
              onClick={handleAddToCalendar}
              className="p-2 rounded-xl bg-[#1C2636] hover:bg-[#253348] border border-white/10 text-xs font-semibold text-gray-200 transition flex flex-col items-center justify-center gap-1"
            >
              <CalendarDays className="w-4 h-4 text-[#D49B37]" />
              <span className="text-[10px]">Add Calendar</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="p-2 rounded-xl bg-[#128C7E]/20 hover:bg-[#128C7E]/40 border border-[#25D366]/30 text-xs font-semibold text-[#25D366] transition flex flex-col items-center justify-center gap-1"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-[10px]">WhatsApp</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-[#1C2636] hover:bg-[#253348] border border-white/10 text-xs font-semibold text-gray-200 transition flex flex-col items-center justify-center gap-1"
            >
              <Printer className="w-4 h-4 text-white" />
              <span className="text-[10px]">Print Pass</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0A0D12] text-center border-t border-white/10">
          <p className="text-[11px] text-gray-400">
            Show this pass at the reception host desk upon arrival.
          </p>
        </div>

      </div>
    </div>
  );
}
