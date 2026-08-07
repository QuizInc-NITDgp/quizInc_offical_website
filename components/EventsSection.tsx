"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

const events = [
  {
    title: "Quizzitch Cup",
    image: "/quizzitch.jpeg",
    slug: "quizzitch-cup",
  },
  {
    title: "Qriosity",
    image: "/qriosity.jpeg",
    slug: "qriosity",
  },
  {
    title: "FIFA WC Quiz",
    image: "/fifawcquiz.jpeg",
    slug: "fifa-wc-quiz",
  },
  {
    title: "Howzatt",
    image: "/howzzat.jpeg",
    slug: "howzatt",
  },
  {
    title: "Qmanji",
    image: "/qmanji.jpeg",
    slug: "qmanji",
  },
  {
    title: "Inter College Quiz",
    image: "/intercollegequiz.jpeg",
    slug: "inter-college-quiz",
  },
];

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const container = cardsRef.current;
      if (!container) return;

      const cards = gsap.utils.toArray<HTMLElement>(".event-card");
      if (cards.length === 0) return;

      const mm = gsap.matchMedia();

      // ============================================================
      // DESKTOP / TABLET ANIMATION (UNCHANGED)
      // ============================================================
      mm.add("(min-width: 768px)", () => {
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;
        const centerY = containerRect.top + containerRect.height / 2;

        cards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          const cardCenterX = rect.left + rect.width / 2;
          const cardCenterY = rect.top + rect.height / 2;
          const offsetX = centerX - cardCenterX;
          const offsetY = centerY - cardCenterY;

          gsap.set(card, {
            x: offsetX,
            y: offsetY,
            rotation: (index - (cards.length - 1) / 2) * 1.5,
            scale: 0.96,
            opacity: 0,
            zIndex: cards.length - index,
            transformOrigin: "50% 50%",
            force3D: true,
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          });
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            once: true,
          },
        });

        timeline.to(cards, {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        });

        timeline.to({}, { duration: 0.2 });

        timeline.to(cards, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1.25,
          stagger: {
            each: 0.16,
            from: "start",
          },
          ease: "power2.inOut",
          force3D: true,
          overwrite: "auto",
        });

        timeline.set(cards, {
          clearProps: "zIndex,willChange",
        });

        return () => {
          gsap.set(cards, { clearProps: "all" });
        };
      });

      // ============================================================
      // MOBILE SCROLL-DRIVEN STACKING ANIMATION (OVERLAPPING CARDS)
      // ============================================================
      mm.add("(max-width: 767px)", () => {
        cards.forEach((card, index) => {
          const tilt = index % 2 === 0 ? -4 : 4;

          gsap.set(card, {
            position: "absolute",
            top: 0,
            left: "50%",
            xPercent: -50,
            opacity: 0,
            yPercent: 130,
            y: 0,
            scale: 1,
            rotation: tilt,
            zIndex: index + 1,
            filter: "brightness(1)",
            force3D: true,
          });
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 20%",
            end: `+=${cards.length * 220}`,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card, index) => {
          const tilt = index % 2 === 0 ? -4 : 4;
          const position = index * 0.75;

          tl.to(
            card,
            {
              yPercent: 0,
              opacity: 1,
              rotation: tilt,
              ease: "power2.out",
              duration: 1,
            },
            position
          );

          if (index === 0) return;

          const prevCard = cards[index - 1];

          tl.to(
            prevCard,
            {
              scale: 0.94,
              y: -16,
              filter: "brightness(0.7)",
              ease: "power2.out",
              duration: 1,
            },
            position
          );
        });

        return () => {
          gsap.set(cards, { clearProps: "all" });
        };
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // ============================================================
  // 3D HOVER (DESKTOP)
  // ============================================================
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((mouseX - centerX) / centerX) * 6;
    const rotateX = -((mouseY - centerY) / centerY) * 6;

    gsap.to(card, {
      rotateX,
      rotateY,
      y: -6,
      scale: 1.025,
      transformPerspective: 900,
      transformOrigin: "center",
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
      force3D: true,
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
      force3D: true,
    });
  };

  // ============================================================
  // TAP EFFECT (MOBILE)
  // ============================================================
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
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
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
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
  };

  return (
    <section
      ref={sectionRef}
      id="events-section"
      className="relative min-h-screen scroll-mt-20 px-6 py-20 -mt-px overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ================= HEADING ================= */}
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

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-rose-100/70 md:text-lg font-space">
            From intense battles of knowledge to adventurous treasure hunts,
            QuizInc creates experiences where curiosity, competition, and
            community come together.
          </p>
        </div>

        {/* ================= CARDS CONTAINER ================= */}
        <div
          ref={cardsRef}
          className="
            relative
            mt-12
            h-[400px]
            md:h-auto
            flex
            justify-center
            md:grid
            md:grid-cols-3
            md:gap-6
            [perspective:1200px]
          "
        >
          {events.map((event, index) => (
            <div
              key={event.title}
              style={{ zIndex: index + 1 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className={`
                event-card
                group
                relative
                aspect-[4/5]
                md:aspect-[3/5]
                w-[280px]
                sm:w-[300px]
                h-[360px]
                overflow-hidden
                rounded-2xl
                border
                border-red-500/20
                bg-black/80
                shadow-2xl
                backdrop-blur-sm
                [transform-style:preserve-3d]
                [backface-visibility:hidden]
                transition-[border-color,box-shadow]
                duration-300
                hover:border-red-500/50
                hover:shadow-[0_15px_35px_rgba(255,0,40,0.25)]
              `}
            >
              {/* Background Poster Image */}
              {event.image ? (
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="
                    object-cover
                    object-center
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-108
                  "
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-b from-red-950/40 via-black/80 to-black" />
              )}

              {/* Dark Gradient Overlay for Text Readability */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/95
                  via-black/35
                  to-transparent
                  transition-opacity
                  duration-300
                  group-hover:opacity-90
                "
              />

              {/* Card Content (Bottom Aligned) */}
              <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-4 sm:p-5">
                <div className="flex flex-col items-start">
                  {/* Event Title */}
                  <h3 className="bg-gradient-to-r from-white via-rose-100 to-red-400 bg-clip-text text-xl font-bold text-transparent drop-shadow-md sm:text-2xl transition-transform duration-300 group-hover:-translate-y-0.5 font-baloo">
                    {event.title}
                  </h3>

                  <div className="mt-2 h-[2px] w-8 bg-red-500 transition-all duration-500 group-hover:w-full" />
                </div>

                {/* View More Redirect Arrow */}
                <Link
                  href={`/events#${event.slug}`}
                  aria-label={`View details for ${event.title}`}
                  className="
                    inline-flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-red-500/30
                    bg-red-950/40
                    text-red-400
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:border-red-500
                    hover:bg-red-600
                    hover:text-white
                    hover:shadow-[0_0_15px_rgba(255,0,40,0.4)]
                  "
                >
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H7M17 7V17"
                    />
                  </svg>
                </Link>
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
          ))}
        </div>

        {/* ================= MORE EVENTS BUTTON ================= */}
        <div className="mt-14 flex justify-center">
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

        {/* ================= BOTTOM TEXT ================= */}
        <div className="mt-12 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-red-400/70 font-space">
            Curiosity • Competition • Community
          </p>
        </div>
      </div>
    </section>
  );
}