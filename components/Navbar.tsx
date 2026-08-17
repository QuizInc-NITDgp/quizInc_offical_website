"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePageTransition } from "./PagetransitionProvider";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Quizittch Cup", href: "/qc" },
  { label: "Team", href: "/member" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { startTransition } = usePageTransition();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Intercept link clicks to trigger existing custom page transition
  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === href) return;

    e.preventDefault();
    setIsOpen(false);
    startTransition(href);
  };

  // Next / Prev navigation handlers for mobile controls
  const handleNavigateStep = (direction: "prev" | "next") => {
    const currentIndex = navLinks.findIndex((link) => link.href === pathname);
    let targetIndex = 0;

    if (direction === "next") {
      targetIndex = (currentIndex + 1) % navLinks.length;
    } else {
      targetIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
    }

    const targetHref = navLinks[targetIndex].href;
    setIsOpen(false);
    startTransition(targetHref);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pl-2 sm:pl-3 lg:pl-4 py-2 lg:py-2">
      {/* Background overlay on scroll - Tightened height */}
      <div
        className={`
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-full
          -z-10
          bg-gradient-to-b
          from-[#0a0002]/95
          via-[#0a0002]/80
          to-transparent
          backdrop-blur-sm
          transition-opacity
          duration-300
          ${scrolled ? "opacity-100" : "opacity-0"}
        `}
      />

      <div className="flex w-full items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={(e) => handleNavLinkClick(e, "/")}
          className="
            z-50
            flex
            items-center
            transition-transform
            duration-300
            hover:scale-105
          "
        >
          <Image
            src="/logo.webp"
            alt="QuizInc Logo"
            width={90}
            height={58}
            priority
            className="
              h-auto
              w-[70px] sm:w-[85px]
              object-contain
            "
          />
        </Link>

        {/* Desktop Navigation */}
        <div
          className="
            relative
            hidden
            overflow-hidden
            rounded-l-full
            md:block
          "
        >
          <nav
            className="
              relative
              flex
              items-center
              gap-9
              rounded-l-full
              border-l
              border-y
              border-white/10
              bg-gradient-to-r
              from-[#100003]/95
              via-[#100003]/90
              to-[#100003]/75
              pl-14
              pr-16
              py-3
              backdrop-blur-md
              transition-all
              duration-300
            "
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className={`
                    group
                    relative
                    whitespace-nowrap
                    px-2.5
                    py-1
                    font-space
                    text-base
                    font-medium
                    tracking-wide
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:text-red-400
                    ${
                      isActive
                        ? "scale-105 font-semibold text-red-400"
                        : "text-white/90"
                    }
                  `}
                >
                  <span>{link.label}</span>

                  <span
                    className={`
                      absolute
                      bottom-0
                      left-0
                      h-[2px]
                      bg-gradient-to-r
                      from-red-500
                      to-rose-400
                      transition-all
                      duration-300
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile Control Section (Buttons Navigation + Menu Trigger) */}
        <div className="z-50 mr-4 flex items-center gap-3 md:hidden">
          

          {/* Hamburger / Close Animated Button Wrapper */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-red-500/40
              bg-black/80
              p-2
              backdrop-blur-sm
              transition-all
              hover:bg-red-950/40
              active:scale-95
            "
          >
            <div className="relative flex h-4 w-5 flex-col justify-between">
              <span
                className={`
                  h-[2.5px]
                  w-full
                  rounded-full
                  bg-white
                  transition-all
                  duration-300
                  ease-in-out
                  ${
                    isOpen
                      ? "translate-y-[7px] rotate-[135deg] bg-red-400"
                      : ""
                  }
                `}
              />
              <span
                className={`
                  h-[2.5px]
                  w-full
                  rounded-full
                  bg-white
                  transition-all
                  duration-300
                  ease-in-out
                  ${isOpen ? "scale-x-0 opacity-0" : "opacity-100"}
                `}
              />
              <span
                className={`
                  h-[2.5px]
                  w-full
                  rounded-full
                  bg-white
                  transition-all
                  duration-300
                  ease-in-out
                  ${
                    isOpen
                      ? "-translate-y-[7px] -rotate-[135deg] bg-red-400"
                      : ""
                  }
                `}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Full-Screen Animated Mobile Menu Overlay */}
      <div
        className={`
          fixed
          inset-0
          z-40
          flex
          flex-col
          items-center
          justify-center
          bg-[#0a0002]/90
          backdrop-blur-sm
          transition-all
          duration-500
          ease-out
          md:hidden
          ${
            isOpen
              ? "pointer-events-auto opacity-100 scale-100"
              : "pointer-events-none opacity-0 scale-95"
          }
        `}
      >
        <nav className="w-full max-w-sm px-6 text-center">
          <ul className="flex flex-col gap-6">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;

              return (
                <li
                  key={link.href}
                  className={`
                    transform
                    transition-all
                    duration-500
                    ${
                      isOpen
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-full opacity-0"
                    }
                  `}
                  style={{
                    transitionDelay: isOpen ? `${index * 80 + 100}ms` : "0ms",
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavLinkClick(e, link.href)}
                    className={`
                      inline-block
                      font-space
                      text-2xl
                      font-bold
                      uppercase
                      tracking-widest
                      transition-all
                      duration-300
                      hover:scale-110
                      hover:text-red-400
                      ${isActive ? "text-red-500 scale-105" : "text-white/90"}
                    `}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        
      </div>
    </header>
  );
}