"use client";
import { motion } from "framer-motion";

export default function MembersHeader() {
  return (
    <motion.h1 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.02 } },
      }}
      className="text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,30,67,0.25)] font-baloo flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 leading-[1.1]"
    >
      <span className="whitespace-nowrap">
        {"The Quizzing".split("").map((c, i) => (
          <motion.span 
            key={`t1-${i}`} 
            variants={{
              hidden: { y: 20, opacity: 0 }, 
              visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
            }} 
            className="inline-block text-white"
          >
            {c === " " ? "\u00A0" : c}
          </motion.span>
        ))}
      </span>
      <span className="text-red-500 whitespace-nowrap">
        {"Cadre".split("").map((c, i) => (
          <motion.span 
            key={`t2-${i}`} 
            variants={{
              hidden: { y: 20, opacity: 0 }, 
              visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
            }} 
            className="inline-block"
          >
            {c}
          </motion.span>
        ))}
      </span>
    </motion.h1>
  );
}