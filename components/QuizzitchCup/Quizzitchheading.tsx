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
      <h2 className="text-4xl sm:text-6xl md:text-7xl font-[800] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-red-500 drop-shadow-[0_0_30px_rgba(255,30,67,0.6)] font-baloo mt-2">
        Quizzitch Cup
      </h2>
    </motion.div>
  );
}