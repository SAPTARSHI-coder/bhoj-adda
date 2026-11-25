'use client';

import React, { useState } from "react";
import { useRestaurant } from "../context/RestaurantContext";
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  Sparkles, 
  MessageCircle, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import Image from "next/image";

export function PreOrderCartDrawer() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal, 
    promoCode, 
    applyPromoCode, 
    discountAmount,
    setIsReservationModalOpen,
    setIsRazorpayModalOpen,
    setPendingReservation,
    addToast
  } = useRestaurant();

  const [couponInput, setCouponInput] = useState("");
  const [orderType, setOrderType] = useState<"dine-in-preorder" | "takeaway-pickup" | "home-delivery">("dine-in-preorder");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);
  const gst = Math.round(cartTotal * 0.05); // 5% restaurant GST
  const packagingFee = orderType === "takeaway-pickup" || orderType === "home-delivery" ? 40 : 0;
  const deliveryFee = orderType === "home-delivery" ? 50 : 0;
  const finalPayable = cartTotal + gst + packagingFee + deliveryFee;

  // Third-party markup comparison
  const aggregatorEstimatedCost = Math.round(subtotal * 1.25 + 90); // 25% marked up menu + 90 surge/platform fees
  const estimatedSavings = Math.max(0, aggregatorEstimatedCost - finalPayable);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    applyPromoCode(couponInput);
  };

  const handleWhatsAppCheckout = () => {
    if (!customerName || !phone) {
      addToast("Details Required", "Please enter your Name and Phone number.", "warning");
      return;
    }

    const itemsSummary = cart.map(i => `• ${i.quantity}x ${i.dish.name} (₹${i.dish.price * i.quantity})`).join("\n");
    const message = 
`*BHOJ ADDA DIRECT ORDER* 🍲
*Customer:* ${customerName} (${phone})
*Order Type:* ${orderType.toUpperCase()}
${address ? `*Delivery Address:* ${address}\n` : ""}
*Items Ordered:*
${itemsSummary}

*Subtotal:* ₹${subtotal}
*Direct Discount:* -₹${discountAmount} (${promoCode || "Direct"})
*Total Payable:* ₹${finalPayable}

_Please confirm my order and send payment link / table allocation!_`;

    const url = "https://wa.me/919830044221?text=" + encodeURIComponent(message);
    window.open(url, "_blank");
    setIsCartOpen(false);
    clearCart();
    addToast("Order Sent via WhatsApp", "Our restaurant manager will confirm in 2 minutes!", "success");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#121822] border-l border-[#D49B37]/30 w-full max-w-md h-full flex flex-col justify-between shadow-2xl text-white">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#151C27]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#992B15] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-[#F8DA96]" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white">Your Direct Basket</h3>
              <p className="text-[11px] text-[#F8DA96] font-medium">Zero Aggregator Commission</p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Type Toggle */}
        <div className="px-4 py-3 bg-[#0D1117] border-b border-white/5">
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#182230] text-center text-xs">
            <button
              onClick={() => setOrderType("dine-in-preorder")}
              className={`py-1.5 rounded-lg font-semibold transition ${
                orderType === "dine-in-preorder"
                  ? "bg-[#D49B37] text-black shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Pre-Order Dine-In
            </button>
            <button
              onClick={() => setOrderType("takeaway-pickup")}
              className={`py-1.5 rounded-lg font-semibold transition ${
                orderType === "takeaway-pickup"
                  ? "bg-[#D49B37] text-black shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Takeaway
            </button>
            <button
              onClick={() => setOrderType("home-delivery")}
              className={`py-1.5 rounded-lg font-semibold transition ${
                orderType === "home-delivery"
                  ? "bg-[#D49B37] text-black shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Home Delivery
            </button>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-white/5">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto" />
              <p className="text-sm font-semibold text-gray-300">Your basket is empty</p>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Explore our authentic Bengali delicacies and add your favorites to pre-order directly.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-4 py-2 rounded-lg bg-[#D49B37] text-black text-xs font-bold"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.dish.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                  <Image
                    src={item.dish.image}
                    alt={item.dish.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-serif font-bold text-white truncate">
                    {item.dish.name}
                  </h4>
                  <p className="text-xs text-[#F8DA96] font-medium">₹{item.dish.price} each</p>

                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex items-center gap-1.5 bg-[#1C2636] border border-white/10 rounded-md px-1.5 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.dish.id, item.quantity + 1)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.dish.id)}
                      className="text-gray-500 hover:text-red-400 p-1 transition"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-bold text-white">
                    ₹{item.dish.price * item.quantity}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Checkout Controls */}
        {cart.length > 0 && (
          <div className="p-4 bg-[#151C27] border-t border-white/10 space-y-3">
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Coupon (try BHOJADDA15)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#0D1117] border border-white/10 text-xs text-white placeholder-gray-500 uppercase focus:outline-none focus:border-[#D49B37]"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-[#D49B37] hover:bg-[#E5AC46] text-black text-xs font-bold uppercase transition"
              >
                Apply
              </button>
            </form>

            {/* Quick Guest Info */}
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Your Name *"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-[#0D1117] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D49B37]"
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-[#0D1117] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D49B37]"
              />
            </div>

            {orderType === "home-delivery" && (
              <input
                type="text"
                placeholder="Kolkata Delivery Address *"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-[#0D1117] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D49B37]"
              />
            )}

            {/* Bill Summary */}
            <div className="p-3 rounded-xl bg-[#0D1117] border border-white/5 space-y-1 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Direct Promo Discount ({promoCode}):</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-400">
                <span>GST (5%):</span>
                <span>₹{gst}</span>
              </div>
              {packagingFee > 0 && (
                <div className="flex justify-between text-gray-400">
                  <span>Eco-Packaging (Clay/Banana Leaf):</span>
                  <span>₹{packagingFee}</span>
                </div>
              )}
              {deliveryFee > 0 && (
                <div className="flex justify-between text-gray-400">
                  <span>Direct Courier Delivery:</span>
                  <span>₹{deliveryFee}</span>
                </div>
              )}
              <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                <span>Final Direct Total:</span>
                <span className="text-[#F8DA96]">₹{finalPayable}</span>
              </div>
            </div>

            {/* Direct Savings Callout */}
            <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Direct Order Savings vs Swiggy/Zomato:
              </span>
              <strong className="text-white">Save ~₹{estimatedSavings}</strong>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 gap-2 pt-1">
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black text-xs font-extrabold uppercase tracking-wide transition flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Order Instantly on WhatsApp</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
