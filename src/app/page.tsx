'use client';

import React from 'react';
import { RestaurantProvider } from '../context/RestaurantContext';
import { Navbar } from '../components/Navbar';
import { ToastNotification } from '../components/ToastNotification';
import { HeroSection } from '../components/HeroSection';
import { DirectVsAggregatorBanner } from '../components/DirectVsAggregatorBanner';
import { RestaurantStory } from '../components/RestaurantStory';
import { DigitalMenu } from '../components/DigitalMenu';
import { TableReservationWizard } from '../components/TableReservationWizard';
import { RazorpayPaymentModal } from '../components/RazorpayPaymentModal';
import { BookingPassModal } from '../components/BookingPassModal';
import { PreOrderCartDrawer } from '../components/PreOrderCartDrawer';
import { SocialReelsAndReviews } from '../components/SocialReelsAndReviews';
import { LocationsSection } from '../components/LocationsSection';
import { LoyaltyAndRetention } from '../components/LoyaltyAndRetention';
import { AdminDashboard } from '../components/AdminDashboard';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <RestaurantProvider>
      <div className="min-h-screen flex flex-col bg-[#0A0D12] text-white selection:bg-[#D49B37] selection:text-[#0A0D12]">
        {/* Global Toast System */}
        <ToastNotification />

        {/* Top Navbar */}
        <Navbar />

        {/* Main Customer Journey */}
        <main className="flex-1">
          {/* 1. Hero with Live Booking Proof & CRO Hook */}
          <HeroSection />

          {/* 2. Direct vs Aggregator Value Banner */}
          <DirectVsAggregatorBanner />

          {/* 3. Restaurant Heritage & Zamindari Story */}
          <RestaurantStory />

          {/* 4. Interactive Digital Menu & Search/Filters */}
          <DigitalMenu />

          {/* 5. Food Blogger Reels & Critic Reviews */}
          <SocialReelsAndReviews />

          {/* 6. Flagship Locations (Park St & Salt Lake) */}
          <LocationsSection />

          {/* 7. Loyalty Coins & Birthday Club */}
          <LoyaltyAndRetention />
        </main>

        {/* Modals and Drawers */}
        <PreOrderCartDrawer />
        <TableReservationWizard />
        <RazorpayPaymentModal />
        <BookingPassModal />

        {/* Restaurant Owner Cockpit Overlay (Toggleable from Navbar) */}
        <AdminDashboard />

        {/* Footer */}
        <Footer />
      </div>
    </RestaurantProvider>
  );
}
