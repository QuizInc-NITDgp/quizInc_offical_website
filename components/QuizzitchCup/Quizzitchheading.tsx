"use client";

import { motion } from "framer-motion";

export default function QuizzitchHeading() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative z-10 flex flex-col items-center text-center"
    >
      <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 mb-5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-red-400 bg-red-950/40 border border-red-500/30 rounded-full shadow-[0_0_15px_rgba(255,30,67,0.15)] backdrop-blur-md font-space">
        Flagship Event
      </span>
      <h2 className="text-4xl sm:text-6xl md:text-7xl font-[800] tracking-tight text-white drop-shadow-[0_0_25px_rgba(255,30,67,0.25)] font-baloo">
        Flagship Event
      </h2>
      <h2 className="text-4xl sm:text-6xl md:text-7xl font-[800] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 drop-shadow-[0_0_30px_rgba(255,30,67,0.6)] font-baloo mt-2">
        Quizzitch Cup
      </h2>
    </motion.div>
  );
}