import Navbar from "@/components/Navbar";
import TunnelBackground from "@/components/TunnelBackground";
import "./globals.css";

import Footer from "@/components/Footer";
import { PageTransitionProvider } from "@/components/PagetransitionProvider";

import { Baloo_2, Bungee, Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-space",
});

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"], // add 800
  variable: "--font-baloo",
});

const bungee = Bungee({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bungee",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${baloo.variable} ${bungee.variable} font-sans relative min-h-screen bg-[#0a0002]`}>
        <PageTransitionProvider>
          {/* Persistent Full-Page Tunnel Canvas */}
          <div className="fixed inset-0 pointer-events-none -z-20">
            <TunnelBackground />
          </div>

          {/* Global Navigation */}
          <Navbar />

          {/* Main Route Content */}
          {children}

          <Footer />
        </PageTransitionProvider>
      </body>
    </html>
  );
}