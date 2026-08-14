"use client";

import PhotoGlobe from "@/components/PhotoGlobe";
import ScrollReveal from "./Scrollreveal";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about-section"
      className="relative z-10 py-12 sm:py-24 w-full bg-transparent"
    >
      <div className="w-full mx-auto px-4 sm:px-12 lg:px-16">

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          <ScrollReveal className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Heading updated to match "Our Events" exact font size and style across screen sizes */}
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.02 } },
              }}
              className="mt-3 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,30,67,0.25)] font-baloo whitespace-nowrap flex flex-wrap items-center gap-x-3 mb-8 leading-[1.1]"
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
              </span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-red-500">
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

            {/* Description paragraphs use font-space (Space Grotesk) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } },
              }}
              className="flex flex-col gap-6"
            >
              <p className="text-base sm:text-lg md:text-2xl text-gray-200 leading-relaxed font-space font-normal">
                QuizInc, the quiz club of NIT Durgapur, was founded in 2003 by two undergraduate students Harish Mohan and Anup Nair. It is an open platform fostering curiosity, intellectual growth, and social responsibility.
              </p>
              <p className="text-base sm:text-lg md:text-2xl text-gray-200 leading-relaxed font-space font-normal">
                With a legacy spanning over two decades, QuizInc organizes quizzes, treasure hunts, and fandom competitions while collaborating with renowned institutions across India. The club also conducts outreach programs to inspire learning beyond the campus.
              </p>
              <p className="text-base sm:text-lg md:text-2xl text-gray-200 leading-relaxed font-space font-normal">
                QuizInc remains committed to empowering students through knowledge, critical thinking, and a shared purpose of curiosity, service, and collaboration.
              </p>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal
            delayMs={200}
            className="lg:col-span-5 relative w-full max-w-[480px] lg:max-w-none mx-auto aspect-square lg:h-[520px] flex items-center justify-center p-4 bg-transparent border-none shadow-none"
          >
            <div className="absolute inset-0 bg-red-600/10 blur-3xl pointer-events-none z-10 rounded-full" />

            <div className="relative z-20 my-12 w-full h-full flex items-center justify-center bg-transparent">
              <PhotoGlobe />
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}