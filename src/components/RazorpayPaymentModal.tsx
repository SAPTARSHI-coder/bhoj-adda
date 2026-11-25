import React, { useState } from "react";
import { useRestaurant } from "../context/RestaurantContext";
import { 
  X, 
  ShieldCheck, 
  QrCode, 
  Smartphone, 
  CreditCard, 
  Building, 
  CheckCircle2, 
  Lock, 
  Sparkles,
  ArrowRight,
  Loader2
} from "lucide-react";
import confetti from "canvas-confetti";

export function RazorpayPaymentModal() {
  const { 
    isRazorpayModalOpen, 
    setIsRazorpayModalOpen, 
    pendingReservation, 
    addReservation,
    setConfirmedReservation,
    setIsBookingPassOpen,
    addToast
  } = useRestaurant();

  const [activeTab, setActiveTab] = useState<"upi-qr" | "upi-apps" | "cards" | "netbanking">("upi-qr");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isRazorpayModalOpen || !pendingReservation) return null;

  const depositAmount = pendingReservation.advanceAmount || 500;

  const triggerPaymentSuccess = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsRazorpayModalOpen(false);

      const confirmed = addReservation({
        customerName: pendingReservation.customerName || "Bhoj Guest",
        phone: pendingReservation.phone || "+91 98300 00000",
        email: pendingReservation.email || "guest@bhojadda.com",
        guests: pendingReservation.guests || 2,
        date: pendingReservation.date || "2026-08-18",
        time: pendingReservation.time || "08:30 PM",
        branch: pendingReservation.branch || "park-street",
        seatingArea: pendingReservation.seatingArea || "royal-baithak",
        occasion: pendingReservation.occasion || "Celebration",
        specialRequests: pendingReservation.specialRequests,
        advanceDepositPaid: true,
        advanceAmount: depositAmount,
        paymentMethod: activeTab === "cards" ? "razorpay-card" : "razorpay-upi",
        paymentId: "pay_RAZOR_" + Math.floor(100000 + Math.random() * 900000),
      });

      setConfirmedReservation(confirmed);
      setIsBookingPassOpen(true);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      addToast("Payment Verified!", "₹" + depositAmount + " table guarantee received via Razorpay.", "success");
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0B1320] border border-[#3395FF]/40 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl text-white">
        
        {/* Razorpay Brand Bar */}
        <div className="bg-[#0C2340] px-5 py-4 flex items-center justify-between border-b border-[#3395FF]/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#3395FF] text-white flex items-center justify-center font-bold text-sm">
              R
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-sm">Razorpay</span>
                <span className="text-[10px] bg-[#3395FF]/30 text-[#3395FF] px-1.5 py-0.5 rounded font-semibold">TEST DEMO</span>
              </div>
              <p className="text-xs text-gray-300">Bhoj Adda (Concept Demo Gateway)</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-gray-400 block">Amount Payable</span>
            <span className="text-lg font-bold text-white">₹{depositAmount}.00</span>
          </div>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-12">
          
          {/* Left Method Tabs */}
          <div className="col-span-4 bg-[#080E18] p-2 border-r border-white/5 space-y-1">
            <button
              onClick={() => setActiveTab("upi-qr")}
              className={"w-full p-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2 transition " + (activeTab === "upi-qr" ? "bg-[#182B49] text-[#58A6FF] border border-[#3395FF]/40" : "text-gray-400 hover:text-white")}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>UPI QR</span>
            </button>

            <button
              onClick={() => setActiveTab("upi-apps")}
              className={"w-full p-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2 transition " + (activeTab === "upi-apps" ? "bg-[#182B49] text-[#58A6FF] border border-[#3395FF]/40" : "text-gray-400 hover:text-white")}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>GPay / PhonePe</span>
            </button>

            <button
              onClick={() => setActiveTab("cards")}
              className={"w-full p-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2 transition " + (activeTab === "cards" ? "bg-[#182B49] text-[#58A6FF] border border-[#3395FF]/40" : "text-gray-400 hover:text-white")}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>

            <button
              onClick={() => setActiveTab("netbanking")}
              className={"w-full p-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2 transition " + (activeTab === "netbanking" ? "bg-[#182B49] text-[#58A6FF] border border-[#3395FF]/40" : "text-gray-400 hover:text-white")}
            >
              <Building className="w-3.5 h-3.5" />
              <span>NetBanking</span>
            </button>
          </div>

          {/* Right Tab Content */}
          <div className="col-span-8 p-5 space-y-4">
            
            {activeTab === "upi-qr" && (
              <div className="text-center space-y-3">
                <p className="text-xs text-gray-300">Scan QR code using any UPI app</p>
                <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl shadow-lg flex items-center justify-center">
                  <div className="w-full h-full border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center text-black">
                    <QrCode className="w-16 h-16 text-black" />
                    <span className="text-[9px] font-bold mt-1 text-blue-800">UPI DEMO QR</span>
                  </div>
                </div>
                <div className="flex justify-center gap-2 text-[10px] text-gray-400">
                  <span>Google Pay</span> • <span>PhonePe</span> • <span>Paytm</span> • <span>BHIM</span>
                </div>
              </div>
            )}

            {activeTab === "upi-apps" && (
              <div className="space-y-3">
                <p className="text-xs text-gray-300">Enter your UPI Virtual ID</p>
                <input
                  type="text"
                  placeholder="e.g. mobile@okaxis / name@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#141E30] border border-[#3395FF]/30 text-white text-xs focus:outline-none focus:border-[#3395FF]"
                />
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <button
                    onClick={() => setUpiId("guest@okaxis")}
                    className="p-2 rounded bg-[#141E30] border border-white/10 hover:border-white/20 text-gray-300 text-left"
                  >
                    Google Pay
                  </button>
                  <button
                    onClick={() => setUpiId("guest@ybl")}
                    className="p-2 rounded bg-[#141E30] border border-white/10 hover:border-white/20 text-gray-300 text-left"
                  >
                    PhonePe
                  </button>
                </div>
              </div>
            )}

            {activeTab === "cards" && (
              <div className="space-y-2.5 text-xs">
                <div>
                  <label className="text-gray-400 block mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="4111 2222 3333 4444"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#141E30] border border-[#3395FF]/30 text-white text-xs focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-gray-400 block mb-1">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#141E30] border border-[#3395FF]/30 text-white text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-1">CVV</label>
                    <input
                      type="password"
                      placeholder="123"
                      maxLength={3}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#141E30] border border-[#3395FF]/30 text-white text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "netbanking" && (
              <div className="space-y-2 text-xs">
                <p className="text-gray-300">Popular Banks</p>
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-2 rounded bg-[#141E30] border border-white/10 hover:border-[#3395FF] text-left text-gray-200">
                    HDFC Bank
                  </button>
                  <button className="p-2 rounded bg-[#141E30] border border-white/10 hover:border-[#3395FF] text-left text-gray-200">
                    State Bank of India
                  </button>
                  <button className="p-2 rounded bg-[#141E30] border border-white/10 hover:border-[#3395FF] text-left text-gray-200">
                    ICICI Bank
                  </button>
                  <button className="p-2 rounded bg-[#141E30] border border-white/10 hover:border-[#3395FF] text-left text-gray-200">
                    Axis Bank
                  </button>
                </div>
              </div>
            )}

            {/* Pay Button */}
            <button
              disabled={isProcessing}
              onClick={triggerPaymentSuccess}
              className="w-full py-2.5 rounded-xl bg-[#3395FF] hover:bg-[#2080ea] text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-[#3395FF]/30 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authorizing via Bank...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Simulate Pay ₹{depositAmount}.00</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-bit SSL Encrypted • Fully Deductible on Bill</span>
            </div>

          </div>

        </div>

        {/* Modal Close */}
        <div className="bg-[#080E18] px-5 py-2.5 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
          <span>Demo Payment Gateway</span>
          <button
            onClick={() => setIsRazorpayModalOpen(false)}
            className="hover:text-white transition"
          >
            Cancel & Return
          </button>
        </div>

      </div>
    </div>
  );
}
