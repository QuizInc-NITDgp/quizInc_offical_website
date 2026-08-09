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
      className="fixed top-0 left-0 right-0 z-50 w-full pl-4 py-4 sm:pl-5 lg:pl-8 lg:py-3 xl:pl-10"
    >
      <div
        className={`
          pointer-events-none
          absolute
          inset-x-0
          top-0
          -bottom-5
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
              drop-shadow-[0_0_12px_rgba(255,30,67,0.3)]
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
          <div
            className="
              pointer-events-none
              absolute
              -inset-[200%]
              animate-[navbarBeam_3s_linear_infinite]
              bg-[conic-gradient(from_0deg,transparent_0deg,transparent_320deg,#ff1e43_337deg,#ff758c_344deg,#ffffff_348deg,#ff1e43_354deg,transparent_360deg)]
            "
          />

          <nav
            className="
              relative
              m-[1px]
              flex
              items-center
              gap-9
              rounded-l-full
              bg-gradient-to-r
              from-[#100003]/95
              via-[#100003]/90
              to-[#100003]/75
              pl-14
              pr-16
              py-4
              backdrop-blur-md
              shadow-[-6px_0_25px_rgba(255,30,67,0.15)]
              transition-all
              duration-300
              hover:shadow-[-6px_0_30px_rgba(255,30,67,0.22)]
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
                    drop-shadow-sm
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
                      shadow-[0_0_8px_#ff1e43]
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
            shadow-[0_0_15px_rgba(255,30,67,0.2)]
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
          shadow-[-10px_0_30px_rgba(255,30,67,0.15)]
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