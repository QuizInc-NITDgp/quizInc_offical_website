"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import QuizzitchHeading from "@/components/QuizzitchCup/Quizzitchheading";
import QuizzitchAbout from "@/components/QuizzitchCup/Quizzitchabout";
import QuizzitchEvents from "@/components/QuizzitchCup/Quizzitchevents";
import QuizzitchSponsors from "@/components/QuizzitchCup/QUizzitchsponsors";
import type { EventItem } from "@/lib/events";

export default function QuizzitchCup({ events }: { events: EventItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, 160]);

  return (
    <section ref={sectionRef} className="relative w-full mx-auto px-4 sm:px-12 lg:px-16 py-20 sm:py-28 overflow-hidden">
      {/* Ambient glow */}
      <motion.div style={{ y: orbY1 }} className="pointer-events-none absolute -top-10 -left-20 w-[280px] sm:w-[480px] h-[280px] sm:h-[480px] rounded-full bg-red-600/10 blur-[90px]" />
      <motion.div style={{ y: orbY2 }} className="pointer-events-none absolute bottom-0 -right-20 w-[320px] sm:w-[520px] h-[320px] sm:h-[520px] rounded-full bg-rose-500/10 blur-[100px]" />

      {/* 1. Heading Component */}
      <QuizzitchHeading />

      {/* 2. About Section - Full Width */}
      <div className="mt-16 sm:mt-20 w-full">
        <QuizzitchAbout />
      </div>

      {/* 3. Events Section - Full Width */}
      <div className="mt-20 sm:mt-28 w-full">
        <QuizzitchEvents events={events} />
      </div>

      {/* 4. Sponsors Section - Full Width */}
      <div className="mt-24 sm:mt-32 w-full">
        <QuizzitchSponsors />
      </div>
    </section>
  );
}