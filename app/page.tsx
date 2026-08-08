"use client";

import TunnelBackground from "@/components/TunnelBackground";
import EventsSection from "@/components/EventsSection";
import AboutSection from "@/components/AboutSection";
import MovingBanner from "@/components/Banner";
import ScrollReveal from "@/components/Scrollreveal";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative overflow-hidden w-full">


      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[75vh] lg:min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center w-full">

        <div className="relative z-10 flex max-w-6xl w-full flex-col items-center pb-4 lg:pb-0">

          {/* Glowing Ambient Backdrop Aura */}
          <div className="absolute -inset-10 -z-10 rounded-full bg-gradient-to-r from-red-600/25 via-rose-500/15 to-red-500/20 blur-3xl animate-pulse" />

          {/* Heading with letter-by-letter stagger animation matching events/about and preserving original hero font size classes */}
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

          <p className="mt-6 text-sm font-extrabold uppercase tracking-[0.3em] text-red-400 drop-shadow-[0_0_15px_rgba(255,30,67,0.6)] sm:text-xl md:text-2xl animate-fade-in-up font-space">
            THE OFFICIAL QUIZ CLUB OF NIT DURGAPUR
          </p>



        </div>

      </section>
      <MovingBanner />
      <ScrollReveal className="w-full">
        <div className="w-full w-full mx-auto px-4 sm:px-8 lg:px-12">
          <AboutSection />
        </div>
      </ScrollReveal>



      <EventsSection />

    </main>
  );
}