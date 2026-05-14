import type { Metadata } from "next";
import { Geist, Geist_Mono, Marcellus } from "next/font/google";
import { candara, neoteric } from "@/styles/fonts";
import "./globals.css";
import "rc-slider/assets/index.css";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AppProvider } from "@/contexts/AppProvider";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Khalifa Crafted — Handcrafted Leather Excellence",
    template: "%s | Khalifa Crafted",
  },
  description:
    "Discover handcrafted leather goods of exceptional quality. From wallets to bags, each piece is crafted with passion and precision in Kenya.",
  openGraph: {
    siteName: "Khalifa Crafted",
    locale: "en_KE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${candara.variable} ${marcellus.variable} ${neoteric.variable} antialiased`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <AppProvider>
            <div className="relative">
              <div className=" size-full top-0 left-0 z-20">
                <Header />
              </div>
              <Providers>{children}</Providers>
              <Footer />
            </div>
          </AppProvider>
        </Suspense>
      </body>
    </html>
  );
}
