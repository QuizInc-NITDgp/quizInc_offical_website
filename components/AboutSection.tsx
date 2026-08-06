"use client";

import PhotoGlobe from "@/components/PhotoGlobe";
import ScrollReveal from "./Scrollreveal";

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
              <h2 className="text-left text-4xl font-extrabold tracking-tight text-white md:text-5xl font-baloo">
                About <span className="text-red-500">QuizInc</span>
              </h2>

              {/* Dash */}
              <div className="mt-6 h-[2px] w-16 bg-red-500 shadow-[0_0_10px_rgba(255,30,67,0.7)]" />

              {/* Text */}
              <div className="mt-8">
                <p className="text-base leading-relaxed text-rose-100/90 md:text-lg font-space font-normal tracking-wide">
                  QuizInc, the quiz club of NIT Durgapur, was founded in 2003 by two undergraduate students Harish Mohan and Anup Nair. It is an open platform fostering curiosity, intellectual growth, and social responsibility. With a legacy spanning over two decades, QuizInc organizes quizzes, treasure hunts, and fandom competitions while collaborating with renowned institutions across India. The club also conducts outreach programs to inspire learning beyond the campus. QuizInc remains committed to empowering students through knowledge, critical thinking, and a shared purpose of curiosity, service, and collaboration.
                </p>
              </div>
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