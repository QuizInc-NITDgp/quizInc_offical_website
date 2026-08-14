"use client";

import { motion } from "framer-motion";

const image = "/qc2.webp";

export default function QuizzitchAbout() {
  return (
    <div className="relative z-10 w-full py-8 sm:py-12">
      <div className="w-full p-6 sm:p-10 lg:p-16 relative overflow-hidden">
        
        {/* Ambient background glows */}
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
              {/* Heading */}
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-[800] text-white font-baloo tracking-tight mb-8 leading-[1.1]">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-red-500">Quizzitch Cup</span>
              </h3>
              
              {/* Description styled with increased font size (text-base -> text-lg -> text-xl) */}
              <div className="flex flex-col gap-6 font-sans text-base sm:text-lg lg:text-xl font-normal text-white/90 leading-[1.65] tracking-tight">
                <p>
                  Quizzitch Cup stands as ultimate battlefield for minds, featuring multiple battle rounds designed to test knowledge. It brings together sharpest competitors across intense intellectual combat. Whether you are seasoned quizzer or enthusiastic newcomer, this flagship arena tests speed, strategy, and sheer wisdom to claim ultimate glory.
                </p>
                
                
                <p>
                  Navigate through high-stakes elimination rounds, decode cryptic visual clues, and outsmart rival houses in a race against the clock where every single second counts towards immortality.
                </p>

                <p>
                  Sharpen wits and gather fellow competitors for night of brilliant trivia and thrilling challenges. Whether you are master of strategy or curious explorer, this is chance to prove brilliance and experience battle of knowledge where imagination meets intellect.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Single Image Section on Right */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 relative w-full max-w-[580px] mx-auto aspect-[4/4] lg:h-[620px] flex items-center justify-center scale-110 lg:scale-125"
          >
            <img
              src={image}
              alt="Quizzitch Cup Logo"
              className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(255,30,67,0.3)]"
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
}