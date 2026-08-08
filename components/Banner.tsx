"use client";

import { motion } from "framer-motion";

const bannerItems = [
  "QURIOUS",
  "QUANTUM",
  "QUEST",
  "QUENCH",
  "QUICKEN",
  "QUOTIENT",
];

export default function MovingBanner() {
  return (
    <div className="relative w-full overflow-hidden bg-transparent py-8 border-t border-b border-white/10 mb-16">
      {/* Subtle background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{
          backgroundImage: "linear-gradient(rgb(177, 151, 252) 1px, transparent 1px)",
          backgroundSize: "100% 100%"
        }} 
      />

      {/* Infinite scrolling ticker track */}
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div
          className="flex items-center gap-16 shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
        >
          {/* Render list multiple times to create a seamless infinite loop */}
          {[...bannerItems, ...bannerItems, ...bannerItems].map((item, index) => (
            <div key={index} className="flex items-center gap-16">
              <span className="text-xl sm:text-3xl font-extrabold tracking-wider font-baloo uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-300 to-white drop-shadow-[0_2px_15px_rgba(255,30,67,0.4)]">
                {item}
              </span>
              <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(255,30,67,1)]" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}