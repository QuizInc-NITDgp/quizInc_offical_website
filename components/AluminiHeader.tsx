"use client";
import { motion } from "framer-motion";

export default function AlumniHeader() {
  return (
    <motion.h1 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.02 } },
      }}
      className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl font-baloo whitespace-nowrap"
    >
      {"The Quizzing".split("").map((c, i) => (
        <motion.span 
          key={i} 
          variants={{
            hidden: { y: 20, opacity: 0 }, 
            visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
          }} 
          className="inline-block"
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
      {" "}
      <span className="text-red-500">
        {"Alumni".split("").map((c, i) => (
          <motion.span 
            key={i} 
            variants={{
              hidden: { y: 20, opacity: 0 }, 
              visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
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