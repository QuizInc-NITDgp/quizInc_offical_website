"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const image = "/qc2.webp";

export default function QuizzitchAbout() {
  return (
    <div className="relative z-10 w-full py-8 sm:py-12">
      <div className="relative w-full overflow-hidden p-6 sm:p-10 lg:p-16">
        
        <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          
          {/* About Section on Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col justify-center text-left lg:col-span-7"
          >
            <div>
              {/* Heading with White to Pink to Red Gradient */}
              <h3 className="mb-8 font-baloo text-4xl font-[800] leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
                Ab
                <span className="inline-block bg-gradient-to-r from-white via-rose-300 to-red-600 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(225,29,72,0.4)]">
                 out 
                </span>
              </h3>
              
              {/* Description */}
              <div className="flex flex-col gap-6 font-sans text-base font-normal leading-[1.65] tracking-tight text-white/90 sm:text-lg lg:text-xl">
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
            className="relative mx-auto flex aspect-square w-full max-w-[580px] items-center justify-center scale-100 p-4 sm:scale-110 sm:p-0 lg:col-span-5 lg:h-[620px] lg:scale-125"
          >
            <Image
              src={image}
              alt="Quizzitch Cup Logo"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-contain drop-shadow-[0_0_50px_rgba(255,30,67,0.3)]"
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
}