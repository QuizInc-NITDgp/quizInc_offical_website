"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const events = [
  {
    title: "Quizzitch",
    description:
      "One of QuizInc's signature quizzing events, bringing together curious minds for an exciting battle of knowledge, logic, and quick thinking.",
  },
  {
    title: "Treasure Hunt",
    description:
      "A thrilling journey of clues, puzzles, and exploration where participants race against time to uncover the final treasure.",
  },
  {
    title: "Fandom Quizzes",
    description:
      "Celebrating the worlds we love — from movies and television to anime, sports, music, and pop culture through engaging themed quizzes.",
  },
  {
    title: "Campus Quizzes",
    description:
      "Competitive quizzes conducted across diverse domains, giving students a platform to test their knowledge and discover new interests.",
  },
  {
    title: "Outreach Programs",
    description:
      "QuizInc takes learning beyond the campus through outreach initiatives designed to encourage curiosity, knowledge, and critical thinking.",
  },
  {
    title: "Collaborations",
    description:
      "QuizInc collaborates with institutions and communities across India, creating opportunities for quizzers to connect, compete, and learn.",
  },
];

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".event-card");

      const container = cardsRef.current;

      if (!container) return;

      const containerRect = container.getBoundingClientRect();

      const centerX =
        containerRect.left + containerRect.width / 2;

      const centerY =
        containerRect.top + containerRect.height / 2;

      /*
       * STEP 1
       * Move every card into the center.
       */
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();

        const cardX =
          rect.left + rect.width / 2;

        const cardY =
          rect.top + rect.height / 2;

        gsap.set(card, {
          x: centerX - cardX,
          y: centerY - cardY,

          rotation: (index - 2.5) * 4,

          scale: 0.9,

          opacity: 0,

          zIndex: cards.length - index,
        });
      });

      /*
       * STEP 2
       * Create animation.
       */
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: cardsRef.current,

          start: "top 75%",

          once: true,
        },
      });

      /*
       * Reveal the stack.
       */
      timeline.to(cards, {
        opacity: 1,

        duration: 0.4,
      });

      /*
       * Distribute cards one-by-one.
       */
      timeline.to(cards, {
        x: 0,
        y: 0,

        rotation: 0,

        scale: 1,

        duration: 1,

        stagger: {
          each: 0.25,
          from: "start",
        },

        ease: "back.out(1.4)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
            From intense battles of knowledge to adventurous treasure hunts,
            QuizInc creates experiences where curiosity, competition, and
            community come together.
          </p>

        </div>


        {/* ================= CARDS ================= */}

        <div
          ref={cardsRef}
          className="relative mt-16 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
        >

          {events.map((event, index) => (

            <div
              key={event.title}
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
                backdrop-blur-md
                transition-[border-color,background-color,box-shadow]
                duration-500
                hover:border-red-500/60
                hover:bg-red-950/20
                hover:shadow-[0_0_35px_rgba(255,30,67,0.18)]
              "
            >

              {/* Event Number */}

              <span
                className="
                  absolute
                  right-6
                  top-4
                  text-6xl
                  font-black
                  text-red-500/10
                  transition-all
                  duration-500
                  group-hover:text-red-500/20
                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>


              {/* QuizInc Q Logo */}

              <div className="relative mb-6 h-12 w-12">

                <Image
                  src="/q.png"
                  alt="QuizInc"
                  fill
                  sizes="48px"
                  className="
                    object-contain
                    transition-transform
                    duration-500
                    group-hover:scale-110
                  "
                />

              </div>


              {/* Event Title */}

              <h3 className="relative text-2xl font-bold text-white">
                {event.title}
              </h3>


              {/* Description */}

              <p className="relative mt-4 text-sm leading-relaxed text-rose-100/65 md:text-base">
                {event.description}
              </p>


              {/* Bottom animated line */}

              <div
                className="
                  mt-8
                  h-[1px]
                  w-12
                  bg-red-500/60
                  transition-all
                  duration-500
                  group-hover:w-full
                "
              />

            </div>

          ))}

        </div>


        {/* ================= BOTTOM ================= */}

        <div className="mt-20 text-center">

          <p className="text-sm uppercase tracking-[0.3em] text-red-400/70">
            Curiosity • Competition • Community
          </p>

        </div>

      </div>
    </section>
  );
}