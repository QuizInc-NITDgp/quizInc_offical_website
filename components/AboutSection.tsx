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
            min-h-[850px] lg:min-h-0
            rounded-[28px]
            border
            border-red-500/25
            bg-black/35
            px-8
            py-12
            backdrop-blur-md
            md:px-14
            md:py-16
            lg:pb-28
          "
        >

          {/* Background Glow */}
          <div className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-red-600/15 blur-[100px]" />

          {/* TWO COLUMNS */}
          <div className="relative flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-20 xl:gap-28">

            {/* ================= LEFT ================= */}
            <div className="w-full lg:w-1/2 lg:shrink-0">

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

                <p>
                  QuizInc, the quiz club of NIT Durgapur, was founded in 2003 by two undergraduate students Harish Mohan and Anup Nair. It is an open platform fostering curiosity, intellectual growth, and social responsibility. With a legacy spanning over two decades, QuizInc organizes quizzes, treasure hunts, and fandom competitions while collaborating with renowned institutions across India. The club also conducts outreach programs to inspire learning beyond the campus. QuizInc remains committed to empowering students through knowledge, critical thinking, and a shared purpose of curiosity, service, and collaboration.
                </p>

              </div>
            </div>

            {/* ================= RIGHT ================= */}
            <div
              className="
                relative
                flex
                w-full
                min-h-[300px]
                items-start
                justify-center
                overflow-visible
                lg:min-h-0
                lg:w-1/2
              "
            >

              {/* Glow behind Q */}
              <div className="pointer-events-none absolute h-[320px] w-[320px] rounded-full bg-red-600/15 blur-[100px]" />

              {/* Photo Q */}
              {/* Photo Q */}
<div
  className="
    relative
    mt-6
    w-[calc(100%+64px)]
    -mx-8
    origin-top
    scale-[0.75]
    sm:scale-[0.9]
    md:w-[calc(100%+112px)]
    md:-mx-14
    md:scale-[1.05]
    lg:-mt-6
    lg:w-auto
    lg:mx-0
    lg:scale-[1.2]
  "
>
  <PhotoGlobe />
</div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}