import Navbar from "@/components/Navbar";
import TunnelBackground from "@/components/TunnelBackground";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

import Footer from "@/components/Footer";
import { PageTransitionProvider } from "@/components/PagetransitionProvider";

import { Black_Ops_One, Space_Grotesk, Bungee } from "next/font/google";

// Space Grotesk for the description/body text
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-space",
});

// Black Ops One assigned back to --font-baloo so existing Tailwind classes pick it up automatically!
const blackOpsOne = Black_Ops_One({
  subsets: ["latin"],
  weight: ["400"],
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
      <body className={`${blackOpsOne.variable} ${spaceGrotesk.variable} ${bungee.variable} font-sans relative min-h-screen bg-[#0a0002]`}>
        {/* Custom Red & White Glowing Cursor */}
        <CustomCursor />

        <PageTransitionProvider>
          <div className="fixed inset-0 pointer-events-none -z-20">
            <TunnelBackground />
          </div>

          <Navbar />

          {children}

          <Footer />
        </PageTransitionProvider>
      </body>
    </html>
  );
}