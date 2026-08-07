"use client";

import PhotoGlobe from "@/components/PhotoGlobe";
import ScrollReveal from "./Scrollreveal";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about-section"
      className="relative z-10 px-6 py-20 md:px-12"
    >
      <div className="mx-auto max-w-7xl">

        {/* MAIN CARD */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[28px]
            border
            border-red-500/25
            bg-black/35
            px-8
            py-10
            backdrop-blur-md
            md:px-14
            md:py-12
            lg:py-14
          "
        >

          {/* Background Glow */}
          <div className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-red-600/15 blur-[100px]" />

          {/* TWO COLUMNS */}
          <div className="relative flex flex-col gap-14 lg:flex-row lg:items-center lg:gap-16 xl:gap-24">

            {/* ================= LEFT ================= */}
            <ScrollReveal className="w-full lg:w-[52%] lg:shrink-0">
              {/* Heading with letter-by-letter animation matching the events page style */}
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.02 } },
                }}
                className="text-left text-4xl font-extrabold tracking-tight text-white md:text-5xl font-baloo whitespace-nowrap flex flex-wrap items-center gap-x-3 drop-shadow-[0_0_20px_rgba(255,30,67,0.25)]"
              >
                <span>
                  {"About".split("").map((c, i) => (
                    <motion.span
                      key={`a-${i}`}
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
                  {"QuizInc".split("").map((c, i) => (
                    <motion.span
                      key={`q-${i}`}
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

              {/* Dash */}
              <div className="mt-6 h-[2px] w-16 bg-red-500 shadow-[0_0_10px_rgba(255,30,67,0.7)]" />

              {/* Text with word-by-word or staggered block animation matching the scroll reveal text feel */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } },
                }}
                className="mt-8"
              >
                <p className="text-base leading-relaxed text-rose-100/90 md:text-lg font-space font-normal tracking-wide">
                  QuizInc, the quiz club of NIT Durgapur, was founded in 2003 by two undergraduate students Harish Mohan and Anup Nair. It is an open platform fostering curiosity, intellectual growth, and social responsibility. With a legacy spanning over two decades, QuizInc organizes quizzes, treasure hunts, and fandom competitions while collaborating with renowned institutions across India. The club also conducts outreach programs to inspire learning beyond the campus. QuizInc remains committed to empowering students through knowledge, critical thinking, and a shared purpose of curiosity, service, and collaboration.
                </p>
              </motion.div>
            </ScrollReveal>

            {/* ================= RIGHT ================= */}
            <ScrollReveal
              delayMs={200}
              className="
                relative
                flex
                w-full
                items-center
                justify-center
                lg:w-[48%]
                py-8
                lg:py-4
              "
            >
              {/* Glow behind Q */}
              <div className="pointer-events-none absolute h-[280px] w-[280px] rounded-full bg-red-600/15 blur-[90px]" />

              {/* Photo Q with proper breathing space */}
              <div className="relative w-full max-w-[260px] flex items-center justify-center px-4 py-4">
                <PhotoGlobe />
              </div>
            </ScrollReveal>

          </div>
        </div>
      </div>
    </section>
  );
}