"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Competitors", value: "500+" },
  { label: "Rounds of Trivia", value: "06" },
  { label: "Prize Pool", value: "₹50,000+" },
  { label: "Houses Competing", value: "10+" },
];

export default function EventStats() {
  return (
    <div className="relative z-10 my-16 w-full px-4 sm:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="group relative overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-b from-[#180005]/80 to-black/90 p-6 text-center backdrop-blur-md transition-all duration-300 hover:border-red-500/60 hover:shadow-[0_0_30px_rgba(255,30,67,0.25)]"
          >
            {/* Top accent glow */}
            <div className="absolute -top-10 left-1/2 h-16 w-32 -translate-x-1/2 bg-red-600/30 blur-xl transition-all duration-300 group-hover:bg-red-500/50" />

            <h4 className="font-baloo text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-200 to-red-500 drop-shadow-[0_2px_12px_rgba(255,30,67,0.5)] sm:text-5xl">
              {stat.value}
            </h4>
            <p className="mt-2 font-sans text-xs font-semibold uppercase tracking-widest text-white/70 sm:text-sm">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}