'use client';

import React, { createContext, useContext, useState } from "react";
import { MenuItem, CartItem, Reservation, DiningTable, BirthdayClubMember, ToastMessage } from "../types";
import { MENU_ITEMS, INITIAL_RESERVATIONS, INITIAL_TABLES } from "../data/mockData";

interface RestaurantContextType {
  // Cart
  cart: CartItem[];
  addToCart: (dish: MenuItem, quantity?: number, instructions?: string) => void;
  removeFromCart: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  promoCode: string;
  applyPromoCode: (code: string) => boolean;
  discountAmount: number;

  // Menu Management (Admin editable)
  menuItems: MenuItem[];
  toggleItemAvailability: (id: string) => void;
  updateItemPrice: (id: string, newPrice: number) => void;

  // Reservations
  reservations: Reservation[];
  addReservation: (res: Omit<Reservation, "id" | "createdAt" | "status">) => Reservation;
  updateReservationStatus: (id: string, status: Reservation["status"], tableNum?: number) => void;
  isReservationModalOpen: boolean;
  setIsReservationModalOpen: (open: boolean) => void;

  // Payments & Checkout
  isRazorpayModalOpen: boolean;
  setIsRazorpayModalOpen: (open: boolean) => void;
  pendingReservation: Partial<Reservation> | null;
  setPendingReservation: (res: Partial<Reservation> | null) => void;
  confirmedReservation: Reservation | null;
  setConfirmedReservation: (res: Reservation | null) => void;
  isBookingPassOpen: boolean;
  setIsBookingPassOpen: (open: boolean) => void;

  // Tables / Floor Plan
  tables: DiningTable[];
  updateTableStatus: (tableId: number, status: DiningTable["status"], guestName?: string) => void;

  // Mode Toggle
  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;

  // Loyalty & Birthday
  loyaltyPoints: number;
  redeemPoints: (points: number) => boolean;
  birthdayMembers: BirthdayClubMember[];
  registerBirthdayMember: (data: Omit<BirthdayClubMember, "id" | "joinedDate" | "voucherCode">) => BirthdayClubMember;

  // Toast Notifications
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: ToastMessage["type"]) => void;
  removeToast: (id: string) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export function RestaurantProvider({ children }: { children: React.ReactNode }) {
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  // Menu State
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);

  // Reservations State
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isRazorpayModalOpen, setIsRazorpayModalOpen] = useState(false);
  const [pendingReservation, setPendingReservation] = useState<Partial<Reservation> | null>(null);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [isBookingPassOpen, setIsBookingPassOpen] = useState(false);

  // Tables State
  const [tables, setTables] = useState<DiningTable[]>(INITIAL_TABLES);

  // Mode State
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Loyalty & Birthday
  const [loyaltyPoints, setLoyaltyPoints] = useState(350);
  const [birthdayMembers, setBirthdayMembers] = useState<BirthdayClubMember[]>([]);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message: string, type: ToastMessage["type"] = "success") => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (dish: MenuItem, quantity = 1, instructions?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.dish.id === dish.id);
      if (existing) {
        return prev.map(item =>
          item.dish.id === dish.id
            ? { ...item, quantity: item.quantity + quantity, specialInstructions: instructions || item.specialInstructions }
            : item
        );
      }
      return [...prev, { dish, quantity, specialInstructions: instructions }];
    });
    addToast("Added to Pre-Order", dish.name + " added to your direct basket.", "success");
  };

  const removeFromCart = (dishId: string) => {
    setCart(prev => prev.filter(item => item.dish.id !== dishId));
  };

  const updateQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.dish.id === dishId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode("");
    setDiscountPercent(0);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const cartTotal = Math.max(0, subtotal - discountAmount);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "BHOJADDA15" || clean === "DIRECTVIP" || clean === "DURGAPUJA") {
      setPromoCode(clean);
      setDiscountPercent(15);
      addToast("Promo Code Applied!", "15% Direct Booking Discount activated!", "success");
      return true;
    } else if (clean === "BIRTHDAY20") {
      setPromoCode(clean);
      setDiscountPercent(20);
      addToast("VIP Birthday Pass Applied!", "20% Birthday Discount activated!", "success");
      return true;
    } else {
      addToast("Invalid Coupon", "Please try code BHOJADDA15 for 15% off.", "warning");
      return false;
    }
  };

  // Menu operations
  const toggleItemAvailability = (id: string) => {
    setMenuItems(prev =>
      prev.map(item => (item.id === id ? { ...item, isAvailable: !item.isAvailable } : item))
    );
    addToast("Menu Updated", "Item availability updated in real-time.", "info");
  };

  const updateItemPrice = (id: string, newPrice: number) => {
    setMenuItems(prev =>
      prev.map(item => (item.id === id ? { ...item, price: newPrice } : item))
    );
    addToast("Price Updated", "Item price updated to ₹" + newPrice + ".", "success");
  };

  // Reservation operations
  const addReservation = (resData: Omit<Reservation, "id" | "createdAt" | "status">): Reservation => {
    const newId = "BA-" + Math.floor(1000 + Math.random() * 9000);
    const newReservation: Reservation = {
      ...resData,
      id: newId,
      status: "confirmed",
      createdAt: "Just now",
      tableNumber: Math.floor(Math.random() * 12) + 1,
    };

    setReservations(prev => [newReservation, ...prev]);
    setLoyaltyPoints(prev => prev + 150);
    return newReservation;
  };

  const updateReservationStatus = (id: string, status: Reservation["status"], tableNum?: number) => {
    setReservations(prev =>
      prev.map(res => {
        if (res.id === id) {
          return {
            ...res,
            status,
            tableNumber: tableNum !== undefined ? tableNum : res.tableNumber
          };
        }
        return res;
      })
    );

    if (tableNum) {
      setTables(prev =>
        prev.map(tab => {
          if (tab.id === tableNum) {
            return {
              ...tab,
              status: status === "seated" ? "occupied" : status === "confirmed" ? "reserved" : "available"
            };
          }
          return tab;
        })
      );
    }
    addToast("Reservation Updated", "Status changed to " + status.toUpperCase() + ".", "info");
  };

  // Table status
  const updateTableStatus = (tableId: number, status: DiningTable["status"], guestName?: string) => {
    setTables(prev =>
      prev.map(tab => (tab.id === tableId ? { ...tab, status, currentGuestName: guestName || tab.currentGuestName } : tab))
    );
    addToast("Floor Plan Updated", "Table " + tableId + " set to " + status + ".", "info");
  };

  // Loyalty
  const redeemPoints = (points: number) => {
    if (loyaltyPoints >= points) {
      setLoyaltyPoints(prev => prev - points);
      addToast("Coins Redeemed", "Redeemed " + points + " Bhoj Coins successfully!", "success");
      return true;
    }
    addToast("Insufficient Balance", "You do not have enough Bhoj Coins.", "warning");
    return false;
  };

  // Birthday Registry
  const registerBirthdayMember = (data: Omit<BirthdayClubMember, "id" | "joinedDate" | "voucherCode">): BirthdayClubMember => {
    const voucher = "BHOJ-BDAY-" + Math.floor(100 + Math.random() * 900);
    const member: BirthdayClubMember = {
      ...data,
      id: "BM-" + Date.now().toString().slice(-4),
      joinedDate: "Today",
      voucherCode: voucher,
    };
    setBirthdayMembers(prev => [member, ...prev]);
    setLoyaltyPoints(prev => prev + 200);
    addToast("Welcome to Birthday Club!", "Voucher " + voucher + " generated with +200 bonus coins!", "success");
    return member;
  };

  return (
    <RestaurantContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        promoCode,
        applyPromoCode,
        discountAmount,
        menuItems,
        toggleItemAvailability,
        updateItemPrice,
        reservations,
        addReservation,
        updateReservationStatus,
        isReservationModalOpen,
        setIsReservationModalOpen,
        isRazorpayModalOpen,
        setIsRazorpayModalOpen,
        pendingReservation,
        setPendingReservation,
        confirmedReservation,
        setConfirmedReservation,
        isBookingPassOpen,
        setIsBookingPassOpen,
        tables,
        updateTableStatus,
        isAdminMode,
        setIsAdminMode,
        loyaltyPoints,
        redeemPoints,
        birthdayMembers,
        registerBirthdayMember,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurant must be used within a RestaurantProvider");
  }
  return context;
}
