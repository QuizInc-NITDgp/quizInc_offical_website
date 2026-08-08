"use client";

import { motion } from "framer-motion";

export default function QuizzitchWebsiteLink({
  href = "#", // TODO: replace with the real Quizzitch Cup website / registration URL
}: {
  href?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-10 flex justify-center"
    >
      <motion.a
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group/btn relative inline-flex items-center gap-3 rounded-xl border border-red-500/40 bg-gradient-to-r from-red-500/10 to-rose-500/10 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-red-400 shadow-[0_0_15px_rgba(255,30,67,0.1)] transition-all duration-300 hover:border-red-500 hover:bg-red-500/20 hover:text-white hover:shadow-[0_0_25px_rgba(255,30,67,0.4)] font-space"
      >
        <span>Visit Website</span>
        <span className="transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true">
          →
        </span>
      </motion.a>
    </motion.div>
  );
}