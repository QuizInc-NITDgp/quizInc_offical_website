"use client";

import Link from "next/link";
import Image from "next/image";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
    </svg>
  );
}

const socialLinks = [
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/AboutUs" },
  { label: "Quizittch Cup", href: "/Qc" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-b border-red-500/25 bg-[#0a0002] px-6 pt-16 pb-8 md:px-12 lg:px-20">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/15 blur-[100px]" />

      <div className="relative w-full">
        {/* Main Content Row — full width, edge-to-edge: brand left, links center, socials right */}
        <div className="flex w-full flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-8 items-center text-center lg:text-left">

          {/* ================= BRAND (LEFT) ================= */}
          <div className="flex flex-1 flex-col items-center lg:items-start">
            <Link href="/" className="flex items-center gap-2 transition-transform duration-300 hover:scale-105">
              <span className="font-serif text-2xl font-bold text-white">
                Quiz<span className="text-red-500">Inc</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-rose-100/60">
              The official quiz club of NIT Durgapur - fostering curiosity, critical thinking, and community since 2003.
            </p>
          </div>

          {/* ================= QUICK LINKS (CENTER) ================= */}
          <div className="flex flex-1 flex-col items-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-500 drop-shadow-[0_0_8px_rgba(255,30,67,0.6)]">
              Quick Links
            </p>

            <nav className="mt-5 grid grid-cols-3 gap-x-8 gap-y-3 text-center">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-rose-100/70 transition-all duration-300 hover:scale-105 hover:text-red-400 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ================= SOCIAL ICONS (RIGHT) ================= */}
          <div className="flex flex-1 flex-col items-center lg:items-end">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-500 drop-shadow-[0_0_8px_rgba(255,30,67,0.6)]">
              Follow Us
            </p>

            <ul className="mt-5 flex flex-wrap justify-center lg:justify-end gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="
                      group
                      relative
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      text-rose-100/70
                      transition-colors
                      duration-300
                      hover:text-red-400
                    "
                  >
                    {/* Top line */}
                    <span className="absolute left-0 top-0 h-[2px] w-full origin-right scale-x-100 bg-red-500/60 transition-transform duration-500 group-hover:origin-left group-hover:scale-x-0" />
                    {/* Bottom line */}
                    <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-100 bg-red-500/60 transition-transform duration-500 group-hover:origin-right group-hover:scale-x-0" />
                    {/* Left line */}
                    <span className="absolute left-0 top-0 h-full w-[2px] origin-bottom scale-y-0 bg-red-500 shadow-[0_0_8px_#ff1e43] transition-transform duration-500 group-hover:origin-top group-hover:scale-y-100" />
                    {/* Right line */}
                    <span className="absolute right-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-red-500 shadow-[0_0_8px_#ff1e43] transition-transform duration-500 group-hover:origin-bottom group-hover:scale-y-100" />

                    <Icon className="relative h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </footer>
  );
}