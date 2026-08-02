"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Alumni", href: "/alumni" },
  { label: "Member", href: "/member" },
  { label: "Events", href: "/events" },
  { label: "Contact us", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hook to get the current URL path
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pl-6 py-6 md:pl-12 md:py-2">

      {/* Full-width stretched scroll backdrop that covers past the bottom of the pill */}
      <div
        className={`absolute inset-x-0 top-0 -bottom-6 bg-gradient-to-b from-[#0a0002]/95 via-[#0a0002]/85 to-transparent backdrop-blur-md transition-opacity duration-300 pointer-events-none -z-10 ${scrolled ? "opacity-100" : "opacity-0"
          }`}
      />

      <div className="flex w-full items-center justify-between">

        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center z-50 transition-transform duration-300 hover:scale-105">
          <Image
            src="/logo.jpg"
            alt="Quiz Inc Logo"
            width={120}
            height={40}
            priority
            className="w-20 md:w-auto h-auto object-contain drop-shadow-[0_0_12px_rgba(255,30,67,0.3)]"
          />
        </Link>

        {/* Right Side: Desktop Nav */}
        <nav
          className="
    hidden md:flex
    relative
    items-center
    gap-10

    rounded-l-full

    border-y
    border-l
    border-red-500/30

    bg-gradient-to-r
    from-black/50
    via-black/40
    to-black/10

    pl-16
    pr-24
    py-4

    backdrop-blur-md

    shadow-[-8px_0_30px_rgba(255,30,67,0.15)]

    transition-all
    duration-300

    hover:border-red-500/50
    hover:shadow-[-8px_0_35px_rgba(255,30,67,0.25)]
  "
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative font-serif text-base font-semibold transition-all hover:text-red-400 hover:scale-105 drop-shadow-sm px-2 py-1 ${isActive ? "text-red-400 scale-105" : "text-white"
                  }`}
              >
                <span>{link.label}</span>
                {/* Red Underline Glow (Fully expanded if active, or expands on hover) */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-red-500 to-rose-400 shadow-[0_0_8px_#ff1e43] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Mobile View: Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          className="flex md:hidden items-center justify-center p-2 text-white bg-black/60 border border-red-500/40 rounded-lg backdrop-blur-md transition-all hover:bg-red-950/40 shadow-[0_0_15px_rgba(255,30,67,0.2)] z-50 active:scale-95"
        >
          {isOpen ? <X className="h-5 w-5 text-red-400" /> : <Menu className="h-5 w-5 text-rose-100" />}
        </button>

      </div>

      {/* Mobile Glassmorphic Sidebar Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-56 bg-[#0a0002]/95 border-l border-red-500/30 p-5 backdrop-blur-xl transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between shadow-[-10px_0_30px_rgba(255,30,67,0.15)] ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="mt-14 flex flex-col gap-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-red-500 drop-shadow-[0_0_8px_rgba(255,30,67,0.6)]">
            Navigation
          </p>
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-serif text-sm font-semibold transition-all hover:text-red-400 hover:translate-x-1 py-1.5 border-b border-red-500/10 ${isActive
                      ? "text-red-400 translate-x-1 font-bold"
                      : "text-white/90"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Info */}
        <div className="text-[11px] text-white/50 border-t border-red-500/20 pt-3">
          <p className="font-semibold text-white/80">QuizInc</p>
          <p className="text-red-400/80">NIT Durgapur</p>
        </div>
      </div>

      {/* Dark Backdrop Overlay when Sidebar is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm md:hidden"
        />
      )}
    </header>
  );
}