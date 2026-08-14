"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { usePageTransition } from "./PagetransitionProvider";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Quizittch Cup", href: "/qc" },
  { label: "Alumnis", href: "/alumni" },
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

  // Explicitly intercept link clicks to trigger the GSAP transition animation
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === href) return; // Ignore if clicking current page

    e.preventDefault(); // Stop default navigation momentarily
    setIsOpen(false);   // Close mobile menu if open
    startTransition(href); // Play cover -> router.push -> reveal sequence
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full pl-2 sm:pl-3 lg:pl-4 py-4 lg:py-3"
    >
      <div
        className={`
          pointer-events-none
          absolute
          inset-x-0
          top-0
          -bottom-0
          -z-10
          bg-gradient-to-b
          from-[#0a0002]/95
          via-[#0a0002]/80
          to-transparent
          backdrop-blur-md
          transition-opacity
          duration-300
          ${scrolled ? "opacity-100" : "opacity-0"}
        `}
      />

      <div className="flex w-full items-center justify-between">
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
              w-[85px]
              object-contain
            "
          />
        </Link>

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
              py-4
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
                    ${isActive
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
                      ${isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                      }
                    `}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          className="
            z-50
            mr-8
            flex
            shrink-0
            items-center
            justify-center
            rounded-lg
            border
            border-red-500/40
            bg-black/60
            p-2.5
            text-white
            backdrop-blur-md
            transition-all
            hover:bg-red-950/40
            active:scale-95
            lg:hidden
          "
        >
          {isOpen ? (
            <X className="h-6 w-6 text-red-400" />
          ) : (
            <Menu className="h-6 w-6 text-rose-100" />
          )}
        </button>
      </div>

      <div
        className={`
          fixed
          inset-y-0
          right-0
          z-40
          flex
          w-64
          flex-col
          justify-between
          border-l
          border-red-500/30
          bg-[#0a0002]/95
          p-6
          backdrop-blur-xl
          transition-transform
          duration-300
          ease-in-out
          md:hidden
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="mt-14 flex flex-col gap-4">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className={`
                    border-b
                    border-red-500/10
                    py-3
                    font-space
                    text-base
                    font-medium
                    tracking-wide
                    transition-all
                    duration-300
                    hover:translate-x-1
                    hover:text-red-400
                    ${isActive
                      ? "translate-x-1 font-semibold text-red-400"
                      : "text-white/90"
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div
          className="
            border-t
            border-red-500/20
            pt-4
            text-xs
            text-white/50
          "
        >
          <p className="font-space font-medium text-white/80">
            QuizInc
          </p>
          <p className="font-space text-red-400/80">
            NIT Durgapur
          </p>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="
            fixed
            inset-0
            z-30
            bg-black/70
            backdrop-blur-sm
            md:hidden
          "
        />
      )}
    </header>
  );
}