"use client";

import PhotoGlobe from "@/components/PhotoGlobe";
import TypewriterText from "./TypewriterText";

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
    min-h-[580px]
    rounded-[28px]
    border
    border-red-500/25
    bg-black/35
    px-8
    py-12
    backdrop-blur-md
    md:px-14
    md:py-14
  "
>

          {/* Background Glow */}
          <div className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-red-600/15 blur-[100px]" />

          {/* TWO COLUMNS */}
          <div className="relative flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">

            {/* ================= LEFT ================= */}
            <div className="w-full lg:w-[48%]">

              <h2 className="text-left text-4xl font-black tracking-tight text-white md:text-5xl">
                About
                <span className="block text-red-500">
                  QuizInc
                </span>
              </h2>

              {/* Dash */}
              <div className="mt-6 h-[2px] w-16 bg-red-500 shadow-[0_0_10px_rgba(255,30,67,0.7)]" />

              {/* Text */}
              <div className="mt-10">

               <TypewriterText> 

               </TypewriterText>

               

              </div>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="relative flex w-full items-center justify-center lg:w-[45%]">

              {/* Glow behind Q */}
              <div className="pointer-events-none absolute h-[320px] w-[320px] rounded-full bg-red-600/15 blur-[100px]" />

              {/* Photo Q */}
              <div className="relative -translate-y-10 scale-[1.05] md:scale-[1.2]">
                <PhotoGlobe />
              </div>
               

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}