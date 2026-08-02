"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const events = [
  {
    title: "Quizzitch Cup",
    description:
      "Quizzitch Cup is the flagship event hosted by QuizInc, the official quiz club of NIT Durgapur. The 2025 edition organized a treasure hunt and a Harry Potter Auction, alongside quizzes on India, Fandom, Cipherquest (NSFW),Geopolitics, and Sports",
  },
  {
    title: "Qriosity",
    description:
       "Qriosity is an annual offline quiz hosted by QuizInc, designed specifically for the freshers of NIT Durgapur. Crafted to introduce the freshers to the world of competitive quizzing, Qriosity aims to spark curiosity and foster a sense of healthy competition among the participants."    
  },
  {
    title: "FIFA WC Quiz",
    description:
 "Qriosity is an annual offline quiz hosted by QuizInc, designed specifically for the freshers of NIT Durgapur. Crafted to introduce the freshers to the world of competitive quizzing, Qriosity aims to spark curiosity and foster a sense of healthy competition among the participants."
  },
  {
    title: "Howzatt",
    description:
      "Howzzat is the annual cricket quiz organized by QuizInc, NIT Durgapur, conducted through Instagram Stories and the final round on Google Meet. The event brings together cricket enthusiasts from across the country, testing their knowledge of the sport in a fun and engaging way.",
  },
  {
    title: "Qmanji",
    description:
      "Qmanji was a high energy, campus spanning adventure in the Quizzitch Cup, organized by QuizInc. Teams chased cryptic trails, made split second choices, and figured out where each clue is trying to lead them. ",
  },
  {
    title: "Inter College Quiz",
    description:
      "The Inter College MELA Quiz was hosted during Recstacy 2026, by the collaboration of QuizInc and Students' Gymkhana. It wasn't just a competition; it was a high-octane celebration of media, entertainment, literature and arts.",
  },
];

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  // ============================================================
  // STACK -> ARRANGE ANIMATION
  // ============================================================

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const container = cardsRef.current;

      if (!container) return;

      const cards =
        gsap.utils.toArray<HTMLElement>(".event-card");

      if (cards.length === 0) return;

      // Find center of entire cards container
      const containerRect =
        container.getBoundingClientRect();

      const centerX =
        containerRect.left + containerRect.width / 2;

      const centerY =
        containerRect.top + containerRect.height / 2;

      // --------------------------------------------------------
      // Put every card in the center
      // --------------------------------------------------------

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();

        const cardCenterX =
          rect.left + rect.width / 2;

        const cardCenterY =
          rect.top + rect.height / 2;

        const offsetX =
          centerX - cardCenterX;

        const offsetY =
          centerY - cardCenterY;

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

      // --------------------------------------------------------
      // Animation timeline
      // --------------------------------------------------------

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,

          start: "top 80%",

          once: true,
        },
      });

      // --------------------------------------------------------
      // STEP 1: Show stacked cards
      // --------------------------------------------------------

      timeline.to(cards, {
        opacity: 1,

        duration: 0.35,

        ease: "power2.out",
      });

      // Small pause so stack is actually visible
      timeline.to({}, { duration: 0.2 });

      // --------------------------------------------------------
      // STEP 2: Arrange one by one
      // --------------------------------------------------------

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

      // Remove temporary animation properties after finishing
      timeline.set(cards, {
        clearProps: "zIndex,willChange",
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // ============================================================
  // 3D HOVER
  // ============================================================

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const card = e.currentTarget;

    const rect = card.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY =
      ((mouseX - centerX) / centerX) * 6;

    const rotateX =
      -((mouseY - centerY) / centerY) * 6;

    gsap.to(card, {
      rotateX,
      rotateY,

      y: -10,

      scale: 1.025,

      transformPerspective: 900,

      transformOrigin: "center",

      duration: 0.3,

      ease: "power2.out",

      overwrite: "auto",

      force3D: true,
    });
  };

  // ============================================================
  // RESET HOVER
  // ============================================================

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
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

  return (
    <section
      ref={sectionRef}
      id="events-section"
      className="relative min-h-screen scroll-mt-20 px-6 py-28 -mt-px"
    >
      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ================= HEADING ================= */}

        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-red-400">
            What We Do
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Our{" "}
            <span className="text-red-500">
              Events
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-rose-100/70 md:text-lg">
            From intense battles of knowledge to adventurous
            treasure hunts, QuizInc creates experiences where
            curiosity, competition, and community come together.
          </p>
        </div>

        {/* ================= CARDS ================= */}

        <div
          ref={cardsRef}
          className="
            relative
            mt-16
            grid
            grid-cols-1
            gap-7
            md:grid-cols-2
            lg:grid-cols-3
            [perspective:1200px]
          "
        >
          {events.map((event, index) => (
            <div
              key={event.title}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="
                event-card
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-red-500/20
                bg-black/40
                p-8
                text-left
                backdrop-blur-sm
                [transform-style:preserve-3d]
                [backface-visibility:hidden]
                transition-[border-color,background-color,box-shadow]
                duration-300
                hover:border-red-500/40
                hover:bg-red-950/20
                hover:shadow-[0_20px_50px_rgba(255,0,40,0.25)]
              "
            >

              {/* ============= BORDER BEAM ============= */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  rounded-2xl
                  opacity-0
                  transition-opacity
                  duration-300
                  group-hover:opacity-100
                "
              >
                <div
                  className="
                    absolute
                    -inset-[100%]
                    animate-[borderSpin_2.4s_linear_infinite]
                    bg-[conic-gradient(from_0deg,transparent_0deg,transparent_305deg,#ff1e43_330deg,#ff758c_345deg,transparent_360deg)]
                  "
                />
              </div>

              {/* ============= INNER BACKGROUND ============= */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-[1px]
                  rounded-[15px]
                  bg-[#120003]/95
                "
              />

              {/* ============= EVENT NUMBER ============= */}



              {/* ============= QUIZINC LOGO ============= */}

              <div className="relative mb-7 flex items-center gap-4">

                {/* QuizInc Logo */}
                <div className="relative h-12 w-12 shrink-0">
                  <Image
                    src="/q.png"
                    alt="QuizInc"
                    fill
                    sizes="48px"
                    className="
        object-contain
        transition-transform
        duration-300
        group-hover:scale-110
      "
                  />
                </div>

                {/* Event Title */}
                <h3 className="text-2xl font-bold text-white">
                  {event.title}
                </h3>

              </div>

              {/* ============= DESCRIPTION ============= */}

              <p
                className="
                  relative
                  mt-4
                  text-sm
                  leading-relaxed
                  text-rose-100/65
                  md:text-base
                  [transform:translateZ(20px)]
                "
              >
                {event.description}
              </p>

              {/* ============= BOTTOM LINE ============= */}

              <div
                className="
                  relative
                  mt-8
                  h-[1px]
                  w-12
                  bg-red-500/60
                  transition-all
                  duration-500
                  group-hover:w-full
                  [transform:translateZ(25px)]
                "
              />

              {/* ============= INTERNAL GLOW ============= */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-24
                  left-1/2
                  h-40
                  w-40
                  -translate-x-1/2
                  rounded-full
                  bg-red-500/0
                  blur-[60px]
                  transition-all
                  duration-500
                  group-hover:bg-red-500/15
                "
              />
            </div>
          ))}
        </div>

        {/* ================= BOTTOM TEXT ================= */}

        <div className="mt-20 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-red-400/70">
            Curiosity • Competition • Community
          </p>
        </div>
      </div>
    </section>
  );
}