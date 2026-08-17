"use client";

import { motion } from "framer-motion";

export default function QuizzitchHeading() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative z-10 flex flex-col items-center text-center outline-none border-none [backface-visibility:hidden]"
    >
      <h2 className="mt-2 font-baloo text-3xl sm:text-6xl md:text-7xl leading-[1.1] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-red-500 drop-shadow-[0_0_30px_rgba(255,30,67,0.6)] select-none">
        Quizzitch Cup
      </h2>
    </motion.div>
  );
}