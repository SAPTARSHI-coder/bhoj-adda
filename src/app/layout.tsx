import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0A0D12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bhojadda-demo.local"),
  title: {
    default: "Bhoj Adda | Heritage Bengali Fine Dining (Concept Demo)",
    template: "%s | Bhoj Adda",
  },
  description:
    "Experience the soul of Kolkata's Zamindari culinary heritage at Bhoj Adda. Direct table reservations, artisanal pre-orders, and zero aggregator markups.",
  keywords: [
    "Bengali Restaurant Kolkata",
    "Bhoj Adda",
    "Park Street Fine Dining",
    "Salt Lake Skyline Dining",
    "Daab Chingri",
    "Kosha Mangsho",
    "Ilish Paturi",
    "Kolkata Biryani",
    "Direct Table Booking",
    "Restaurant Direct Conversion Platform",
  ],
  authors: [{ name: "Bhoj Adda Hospitality Concept Demo" }],
  creator: "Bhoj Adda Concept Platform",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://bhojadda-demo.local",
    siteName: "Bhoj Adda",
    title: "Bhoj Adda | Heritage Bengali Fine Dining & Direct Platform",
    description:
      "Convert social media food lovers directly into high-margin table bookings and repeat diners.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Bhoj Adda Heritage Bengali Dining",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhoj Adda | Heritage Bengali Fine Dining",
    description: "Direct table reservations & pre-orders with zero aggregator commission markups.",
    images: ["https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0A0D12] text-[#FCFAF7] font-sans antialiased selection:bg-[#D49B37] selection:text-[#0A0D12]">
        {children}
      </body>
    </html>
  );
}
