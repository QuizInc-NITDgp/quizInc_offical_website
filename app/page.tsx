"use client";
import EventsSection from "@/components/EventsSection";
import AboutSection from "@/components/AboutSection";
import ScrollReveal from "@/components/Scrollreveal";
import TypewriterText from "@/components/TypewriterText";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative w-full">
      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[75vh] lg:min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center w-full">
        <div className="relative z-10 flex max-w-6xl w-full flex-col items-center pb-4 lg:pb-0">
          {/* Glowing Ambient Backdrop Aura */}
          <div className="absolute -inset-10 -z-10 rounded-full bg-gradient-to-r from-red-600/25 via-rose-500/15 to-red-500/20 blur-3xl animate-pulse" />

          {/* Heading with letter-by-letter stagger animation */}
          <div className="flex flex-col items-center text-center w-full">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.02 } },
              }}
              className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-red-400 leading-[0.95] sm:text-7xl md:text-8xl lg:text-9xl drop-shadow-[0_0_35px_rgba(255,30,67,0.5)] w-full"
            >
              <span className="block text-white mb-2 font-baloo">
                {"Welcome to".split("").map((c, i) => (
                  <motion.span
                    key={`wel-${i}`}
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
                    }}
                    className="inline-block text-white"
                  >
                    {c === " " ? "\u00A0" : c}
                  </motion.span>
                ))}
              </span>
              <span className="block font-black tracking-tighter drop-shadow-[0_0_25px_rgba(255,255,255,0.85)] font-baloo">
                {"QuizInc !".split("").map((c, i) => (
                  <motion.span
                    key={`qinc-${i}`}
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
                    }}
                    className={`inline-block ${c === "!" || i >= 4 ? "text-red-500" : "text-white"}`}
                  >
                    {c === " " ? "\u00A0" : c}
                  </motion.span>
                ))}
              </span>
            </motion.div>
          </div>

          {/* SLOW TYPEWRITER DISPLAY */}
          <div className="mt-8 flex flex-col items-center justify-center">
            
            {/* Desktop View: Single continuous line */}
            <div className="hidden sm:block">
              <TypewriterText
                text="THE OFFICIAL KNOWLEDGE CLUB OF NIT DURGAPUR"
                speed={0.06}
                delay={0.6}
                className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-400 sm:text-xl md:text-2xl font-space drop-shadow-[0_0_15px_rgba(255,30,67,0.6)]"
              />
            </div>

            {/* Mobile View: Stacked lines */}
            <div className="flex flex-col items-center justify-center sm:hidden">
              <TypewriterText
                text="THE OFFICIAL KNOWLEDGE CLUB OF"
                speed={0.06}
                delay={0.6}
                className="text-[0.75rem] font-extrabold uppercase tracking-[0.25em] text-red-400 font-space drop-shadow-[0_0_15px_rgba(255,30,67,0.6)] text-center leading-relaxed"
              />
              <TypewriterText
                text="NIT DURGAPUR"
                speed={0.06}
                delay={2.4} /* 0.6s initial delay + ~1.8s for the first line to type out */
                className="text-[0.75rem] font-extrabold uppercase tracking-[0.25em] text-red-400 font-space drop-shadow-[0_0_15px_rgba(255,30,67,0.6)] text-center mt-1"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <ScrollReveal className="w-full">
        <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
          <AboutSection />
        </div>
      </ScrollReveal>

      {/* ================= EVENTS SECTION (DO NOT WRAP IN SCROLLREVEAL) ================= */}
      <div className="w-full mx-auto py-16 sm:py-24">
        <EventsSection />
      </div>
    </main>
  );
}