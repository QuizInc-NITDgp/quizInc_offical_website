"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/AboutUs" },
  { label: "Quizittch Cup", href: "/Qc" },
  { label: "Alumnis", href: "/alumni" },
  { label: "Members", href: "/member" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact us", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className="
        fixed
        left-0
        right-0
        top-0
        z-50
        w-full

        pl-5
        py-3

        md:pl-10
        md:py-2
      "
    >
      {/* ================================================= */}
      {/* SCROLL BACKGROUND */}
      {/* ================================================= */}

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

      {/* ================================================= */}
      {/* NAVBAR ROW */}
      {/* ================================================= */}

      <div className="flex w-full items-center justify-between">
        {/* ================================================= */}
        {/* LOGO */}
        {/* ================================================= */}

        <Link
          href="/"
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
            src="/logo.jpg"
            alt="QuizInc Logo"
            width={70}
            height={45}
            priority
            className="
              h-auto
              w-[65px]
              object-contain
              drop-shadow-[0_0_12px_rgba(255,30,67,0.3)]
            "
          />
        </Link>

        {/* ================================================= */}
        {/* DESKTOP NAVBAR */}
        {/* ================================================= */}

        <div
          className="
            relative
            hidden
            overflow-hidden
            rounded-l-full
            md:block
          "
        >
          {/* ============================================= */}
          {/* TRAVELLING RED BORDER BEAM */}
          {/* ============================================= */}

          <div
            className="
              pointer-events-none
              absolute
              -inset-[200%]

              animate-[navbarBeam_3s_linear_infinite]

              bg-[conic-gradient(from_0deg,transparent_0deg,transparent_320deg,#ff1e43_337deg,#ff758c_344deg,#ffffff_348deg,#ff1e43_354deg,transparent_360deg)]
            "
          />

          {/* ============================================= */}
          {/* ACTUAL NAVBAR */}
          {/* ============================================= */}

          <nav
            className="
              relative
              m-[1px]

              flex
              items-center

              gap-6

              rounded-l-full

              bg-gradient-to-r
              from-[#100003]/95
              via-[#100003]/90
              to-[#100003]/75

              pl-9
              pr-10
              py-2

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
                  className={`
                    group
                    relative

                    whitespace-nowrap

                    px-2
                    py-1

                    font-serif
                    text-sm
                    font-semibold

                    drop-shadow-sm

                    transition-all
                    duration-300

                    hover:scale-105
                    hover:text-red-400

                    ${
                      isActive
                        ? "scale-105 text-red-400"
                        : "text-white"
                    }
                  `}
                >
                  <span>{link.label}</span>

                  {/* Active / Hover Underline */}

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

                      ${
                        isActive
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

        {/* ================================================= */}
        {/* MOBILE HAMBURGER */}
        {/* ================================================= */}

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          className="
            z-50
            mr-4

            flex
            items-center
            justify-center

            rounded-lg

            border
            border-red-500/40

            bg-black/60

            p-2

            text-white

            backdrop-blur-md

            shadow-[0_0_15px_rgba(255,30,67,0.2)]

            transition-all

            hover:bg-red-950/40

            active:scale-95

            md:hidden
          "
        >
          {isOpen ? (
            <X className="h-5 w-5 text-red-400" />
          ) : (
            <Menu className="h-5 w-5 text-rose-100" />
          )}
        </button>
      </div>

      {/* ================================================= */}
      {/* MOBILE SIDEBAR */}
      {/* ================================================= */}

      <div
        className={`
          fixed
          inset-y-0
          right-0
          z-40

          flex
          w-60
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
        {/* Mobile links */}

        <div className="mt-14 flex flex-col gap-4">
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.3em]
              text-red-500

              drop-shadow-[0_0_8px_rgba(255,30,67,0.6)]
            "
          >
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
                  className={`
                    border-b
                    border-red-500/10

                    py-2

                    font-serif
                    text-sm
                    font-semibold

                    transition-all
                    duration-300

                    hover:translate-x-1
                    hover:text-red-400

                    ${
                      isActive
                        ? "translate-x-1 font-bold text-red-400"
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

        {/* ================================================= */}
        {/* MOBILE FOOTER */}
        {/* ================================================= */}

        <div
          className="
            border-t
            border-red-500/20
            pt-4
            text-[11px]
            text-white/50
          "
        >
          <p className="font-semibold text-white/80">
            QuizInc
          </p>

          <p className="text-red-400/80">
            NIT Durgapur
          </p>
        </div>
      </div>

      {/* ================================================= */}
      {/* MOBILE DARK OVERLAY */}
      {/* ================================================= */}

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