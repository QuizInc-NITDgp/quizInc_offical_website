"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  speed?: number; // Delay per character in seconds
  delay?: number; // Initial start delay in seconds
  className?: string;
}

export default function TypewriterText({
  text,
  speed = 0.06,
  delay = 0.6,
  className = "",
}: TypewriterTextProps) {
  const [isFinished, setIsFinished] = useState(false);
  const letters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speed,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: { display: "none" },
    visible: { display: "inline-block" },
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => setIsFinished(true)}
      >
        {letters.map((char, index) => (
          <motion.span key={index} variants={letterVariants}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>

      {/* Animated Blinking Cursor - Only rendered while typing */}
      {!isFinished && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="ml-1 inline-block h-[0.9em] w-[2px] bg-red-500 shadow-[0_0_8px_rgba(255,30,67,0.8)]"
        />
      )}
    </div>
  );
}