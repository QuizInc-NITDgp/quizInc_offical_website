"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/quizzitch.webp",
  "/quizzitch2.webp",
  "/quizzitch3.webp",
];

export default function QuizzitchAbout() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 w-full py-8 sm:py-12">
      <div className="w-full p-6 sm:p-10 lg:p-16 relative overflow-hidden">
        
        {/* Ambient background glows (Red/Rose only, no yellow/orange) */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-600/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* About Section on Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-red-400 bg-red-500/10 border border-red-500/30 font-space w-max mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                The Legacy Arena
              </span>

              {/* Title with White and Red Gradient (No Yellow/Orange) */}
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-[800] text-white font-baloo tracking-tight mb-6 leading-[1.1]">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-red-500">Quizzitch Cup</span>
              </h3>
              
              <p className="text-lg sm:text-xl text-gray-200 leading-relaxed font-baloo mb-6">
                Quizzitch Cup stands as ultimate battlefield for minds, featuring multiple battle rounds designed to test knowledge. It brings together sharpest competitors across intense intellectual combat. Whether you are seasoned quizzer or enthusiastic newcomer, this flagship arena tests speed, strategy, and sheer wisdom to claim ultimate glory.
              </p>
              
              <p className="text-lg sm:text-xl text-gray-200 leading-relaxed font-baloo mb-6">
                It invites curious minds to step into universe where magic, mystery and knowledge come together, opening doors to realms filled with powerful spells, legendary figures, and extraordinary challenges.
              </p>
              
              <p className="text-lg sm:text-xl text-gray-200 leading-relaxed font-baloo mb-6">
                Navigate through high-stakes elimination rounds, decode cryptic visual clues, and outsmart rival houses in a race against the clock where every single second counts towards immortality.
              </p>

              <p className="text-lg sm:text-xl text-gray-200 leading-relaxed font-baloo">
                Sharpen wits and gather fellow competitors for night of brilliant trivia and thrilling challenges. Whether you are master of strategy or curious explorer, this is chance to prove brilliance and experience battle of knowledge where imagination meets intellect.
              </p>
            </div>
          </motion.div>

          {/* Image Slider Section on Right - Slightly Increased Width */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 relative w-full max-w-[480px] mx-auto aspect-[4/4] lg:h-[520px] rounded-3xl overflow-hidden border border-red-500/40 shadow-[0_0_60px_rgba(255,30,67,0.3)] bg-zinc-950 flex flex-col justify-end"
          >
            <div className="absolute inset-0 bg-red-600/10 blur-xl pointer-events-none z-10" />
            
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Quizzitch Cup Slider ${currentIndex + 1}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Slider Navigation Dots */}
            {images.length > 1 && (
              <div className="relative z-20 flex justify-center gap-2 p-4 bg-gradient-to-t from-black/80 to-transparent w-full">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      currentIndex === idx ? "w-6 bg-red-500" : "w-2 bg-white/40"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}