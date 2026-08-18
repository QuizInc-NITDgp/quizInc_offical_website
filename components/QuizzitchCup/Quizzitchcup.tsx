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
    <section ref={sectionRef} className="relative mx-auto w-full overflow-hidden py-12 sm:py-16">
      
      <motion.div style={{ y: orbY1 }} className="pointer-events-none absolute -top-10 -left-20 h-[280px] w-[280px] rounded-full bg-red-600/10 blur-[90px] sm:h-[480px] sm:w-[480px]" />
      <motion.div style={{ y: orbY2 }} className="pointer-events-none absolute bottom-0 -right-20 h-[320px] w-[320px] rounded-full bg-rose-500/10 blur-[100px] sm:h-[520px] sm:w-[520px]" />

      <div className="w-full">
        {/* Header Section with reduced top padding */}
        <div className="text-center flex flex-col items-center pt-2 sm:pt-4">
          <QuizzitchHeading />
        </div>

        {/* About Section directly under Heading with minimal gap */}
        <div className="-mt-2 w-full sm:mt-8">
          <QuizzitchAbout />
        </div>

        {/* Events Section */}
        <div className="mt-6 w-full sm:mt-10">
          <QuizzitchEvents events={events} />
        </div>

        {/* Sponsors Section */}
        <div className="mt-8 w-full sm:mt-12">
          <QuizzitchSponsors />
        </div>
      </div>
    </section>
  );
}