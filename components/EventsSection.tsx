"use client";

import { useCallback, useEffect, useRef, useState, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

const events = [
  { title: "Quizzitch Cup", image: "/quizzitch.webp", slug: "quizzitch-cup" },
  { title: "Qriosity", image: "/qriosity.webp", slug: "qriosity" },
  { title: "FIFA WC Quiz", image: "/fifawcquiz.webp", slug: "fifa-wc-quiz" },
  { title: "Howzatt", image: "/howzzat.webp", slug: "howzatt" },
  { title: "Qmanji", image: "/qmanji.webp", slug: "qmanji" },
  {
    title: "Inter College Quiz",
    image: "/intercollegequiz.webp",
    slug: "inter-college-quiz",
  },
  { title: "OF 24 Frames And 22 Yards", image: "/Of24.webp", slug: "qmanji" },
  { title: "BMEP Quiz", image: "/BMEP.webp", slug: "qmanji" },
] as const;

const getTilt = (index: number) => (index % 2 === 0 ? -4 : 4);

type Event = (typeof events)[number];

interface EventCardProps {
  event: Event;
  index: number;
  isActive: boolean;
  onActivate: (index: number) => void;
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
}

const EventCard = memo(function EventCard({
  event,
  index,
  isActive,
  onActivate,
  onTouchStart,
  onTouchEnd,
}: EventCardProps) {
  return (
    <div
      onMouseEnter={() => onActivate(index)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={`
        event-card
        group
        relative
        overflow-hidden
        rounded-[2.5rem]
        border
        border-red-500/20
        bg-black/90
        shadow-2xl
        backdrop-blur-md
        transition-all
        duration-500
        ease-out
        cursor-pointer
        will-change-transform
        /* Mobile styles */
        absolute
        w-[280px]
        sm:w-[300px]
        h-[310px]
        /* Desktop Accordion Styles */
        md:relative
        md:h-[480px]
        ${
          isActive
            ? "md:w-[360px] md:border-red-500/60 md:shadow-[0_0_35px_rgba(255,0,40,0.35)] md:flex-shrink-0"
            : "md:w-[100px] md:border-white/10 md:bg-black/60 md:hover:border-red-500/30 md:flex-shrink-0"
        }
      `}
    >
      {/* Background Poster Image */}
      {event.image ? (
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, 360px"
          className={`
            object-cover
            object-center
            transition-transform
            duration-700
            ease-out
            ${isActive ? "md:scale-105" : "md:scale-100 md:brightness-50"}
          `}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/40 via-black/80 to-black" />
      )}

      {/* Dark Gradient Overlay for Readability */}
      <div
        className={`
          absolute
          inset-0
          bg-gradient-to-t
          from-black/95
          via-black/40
          to-transparent
          transition-opacity
          duration-300
          ${isActive ? "opacity-90" : "opacity-80 md:opacity-95"}
        `}
      />

      {/* DESKTOP INACTIVE COLLAPSED VIEW */}
      <div
        className={`
          absolute
          inset-0
          hidden
          md:flex
          flex-col
          items-center
          justify-between
          py-8
          transition-opacity
          duration-300
          ${isActive ? "pointer-events-none opacity-0" : "opacity-100"}
        `}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-xs font-semibold text-white/80 font-space">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="my-auto rotate-[-90deg] whitespace-nowrap">
          <span className="text-sm font-bold uppercase tracking-widest text-white/90 font-space">
            {event.title}
          </span>
        </div>

        <div className="h-2 w-2 rounded-full bg-red-500/60 shadow-[0_0_8px_rgba(255,0,40,0.8)]" />
      </div>

      {/* ACTIVE / MOBILE EXPANDED VIEW */}
      <div
        className={`
          absolute
          inset-0
          flex
          flex-col
          justify-between
          p-6
          transition-opacity
          duration-300
          ${isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none md:hidden"}
        `}
      >
        <div className="flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-red-500/40 bg-black/40 text-xs font-semibold text-red-400 backdrop-blur-md font-space">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="flex flex-col items-start">
            <h3 className="bg-gradient-to-r from-white via-rose-100 to-red-400 bg-clip-text text-2xl font-bold text-transparent drop-shadow-md sm:text-3xl font-baloo">
              {event.title}
            </h3>
            <div className="mt-2 h-[2px] w-8 bg-red-500 transition-all duration-500 group-hover:w-full" />
          </div>
        </div>
      </div>

      {/* Internal Red Glow on Hover */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          left-1/2
          h-36
          w-36
          -translate-x-1/2
          rounded-full
          bg-red-500/0
          blur-[50px]
          transition-all
          duration-500
          group-hover:bg-red-500/20
        "
      />
    </div>
  );
});

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinnedContentRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const exploreRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const pinnedContent = pinnedContentRef.current;
      if (!section || !pinnedContent) return;

      const cards = gsap.utils.toArray<HTMLElement>(".event-card");
      const cardCount = cards.length;
      if (cardCount === 0) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.set(cards, { clearProps: "all" });
        gsap.set(exploreRef.current, { clearProps: "all" });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(cards, { clearProps: "all" });

        gsap.set(exploreRef.current, {
          opacity: 0,
          y: 20,
        });

        // Set initial positions offscreen below viewport
        cards.forEach((card, index) => {
          gsap.set(card, {
            position: "absolute",
            top: 0,
            left: "50%",
            xPercent: -50,
            y: index === 0 ? 0 : 800,
            opacity: index === 0 ? 1 : 0,
            scale: 1,
            rotation: getTilt(index),
            zIndex: index + 1,
            filter: "brightness(1)",
            force3D: true,
          });
        });

        const tl = gsap.timeline();

        // Animate cards sequentially into the stack
        cards.forEach((card, index) => {
          if (index === 0) return;

          const step = index - 1;

          // Push down previous stacked cards in z-depth
          for (let i = 0; i < index; i++) {
            const depth = index - i;
            tl.to(
              cards[i],
              {
                scale: 1 - depth * 0.04,
                y: -depth * 12,
                filter: `brightness(${Math.max(0.35, 1 - depth * 0.18)})`,
                ease: "power1.inOut",
                duration: 1,
              },
              step * 1.5
            );
          }

          // Bring new card into view from bottom
          tl.to(
            card,
            {
              y: 0,
              opacity: 1,
              rotation: getTilt(index),
              ease: "power2.out",
              duration: 1.2,
            },
            step * 1.5
          );
        });

        // Show Explore Button at the end
        tl.to(
          exploreRef.current,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.8,
          },
          "+=0.2"
        );

        // Pin the pinnedContent wrapper across the section scroll track
        ScrollTrigger.create({
          trigger: section,
          pin: pinnedContent,
          start: "top top",
          end: () => `+=${cardCount * 500}`,
          scrub: 0.5,
          animation: tl,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      });

      // Force GSAP to recalculate pin bounds after layout updates
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 768) return;
    const card = e.currentTarget;
    card.classList.add("mobile-active");

    gsap.to(card, {
      scale: 1.03,
      zIndex: 50,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
      force3D: true,
    });
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 768) return;
    const card = e.currentTarget;

    gsap.to(card, {
      scale: 1,
      zIndex: "",
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
      force3D: true,
    });

    setTimeout(() => {
      card.classList.remove("mobile-active");
    }, 400);
  }, []);

  const handleActivate = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="events-section"
      className="relative w-full"
    >
      <div
        ref={pinnedContentRef}
        className="relative z-10 mx-auto max-w-[1400px] min-h-screen flex flex-col justify-center px-4 sm:px-6 py-12 sm:py-20"
      >
        {/* HEADING */}
        <div className="text-center flex flex-col items-center">
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-red-400 font-space">
            What We Do
          </p>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.02 } },
            }}
            className="mt-3 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,30,67,0.25)] font-baloo whitespace-nowrap flex flex-wrap justify-center items-center gap-x-3"
          >
            <span>
              {"Our".split("").map((c, i) => (
                <motion.span
                  key={`oh-${i}`}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
                  }}
                  className="inline-block text-white"
                >
                  {c}
                </motion.span>
              ))}
            </span>
            <span className="text-red-500">
              {"Events".split("").map((c, i) => (
                <motion.span
                  key={`eh-${i}`}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
                  }}
                  className="inline-block"
                >
                  {c}
                </motion.span>
              ))}
            </span>
          </motion.h2>
        </div>

        {/* CARDS CONTAINER */}
        <div
          ref={cardsRef}
          className="
            relative
            mt-10
            sm:mt-16
            h-[340px]
            md:h-[500px]
            flex
            justify-center
            md:flex-row
            md:items-center
            md:justify-center
            md:w-full
            gap-3
            md:gap-3.5
          "
        >
          {events.map((event, index) => (
            <EventCard
              key={event.title}
              event={event}
              index={index}
              isActive={activeIndex === index}
              onActivate={handleActivate}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />
          ))}
        </div>

        {/* EXPLORE BUTTON */}
        <div ref={exploreRef}>
          <div className="mt-8 sm:mt-12 flex justify-center">
            <Link
              href="/events"
              className="
                group
                relative
                inline-flex
                items-center
                gap-2.5
                overflow-hidden
                rounded-full
                border
                border-red-500/30
                bg-black/60
                px-7
                py-3.5
                text-sm
                font-bold
                uppercase
                tracking-widest
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-red-500/60
                hover:bg-red-950/30
                hover:shadow-[0_0_25px_rgba(255,0,40,0.3)]
                font-space
              "
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5">
                Explore All Events
              </span>
              <svg
                className="relative z-10 h-4 w-4 text-red-500 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-rose-600/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}