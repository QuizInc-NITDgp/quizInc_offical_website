"use client";

import { motion } from "framer-motion";

type Sponsor = {
  name: string;
  logo: string;
};

const SPONSORS: Sponsor[] = [
  { name: "The Times of India", logo: "/sponsers/sponser1.png" },
  { name: "Lemongrass", logo: "/sponsers/sponser2.png" },
  { name: "Air Casa Café", logo: "/sponsers/sponser3.png" },
  { name: "Twins Café Restaurant", logo: "/sponsers/sponser4.png" },
  { name: "Sponsor 5", logo: "/sponsers/sponser5.png" },
  { name: "Sponsor 6", logo: "/sponsers/sponser6.png" },
  { name: "Sponsor 7", logo: "/sponsers/sponser7.png" },
  { name: "Sponsor 8", logo: "/sponsers/sponser8.png" },
];

export default function QuizzitchSponsors() {
  return (
    <div className="relative z-20 overflow-hidden py-16 sm:py-24">
      {/* Crossing Marquee Banners placed above the logos */}
      <div className="relative w-full h-32 flex items-center justify-center overflow-hidden mb-16 sm:mb-24">
        {/* Banner 1: Slanted Right */}
        <div className="absolute w-[130%] -rotate-3 bg-red-600/90 py-4 shadow-[0_0_40px_rgba(255,30,67,0.6)] border-y border-white/20 backdrop-blur-md overflow-hidden z-20">
          <div className="flex whitespace-nowrap animate-[marquee-left_25s_linear_infinite] gap-8 text-white font-baloo font-[800] tracking-widest text-base sm:text-lg uppercase">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="flex items-center gap-8">
                <span>SPONSORS</span>
                <span className="w-2.5 h-2.5 rounded-full bg-white/70" />
                <span>QUIZZITCH CUP</span>
                <span className="w-2.5 h-2.5 rounded-full bg-white/70" />
              </span>
            ))}
          </div>
        </div>

        {/* Banner 2: Slanted Left */}
        <div className="absolute w-[130%] rotate-3 bg-zinc-950/95 py-4 shadow-[0_0_40px_rgba(0,0,0,0.9)] border-y border-red-500/40 backdrop-blur-md overflow-hidden z-10">
          <div className="flex whitespace-nowrap animate-[marquee-right_25s_linear_infinite] gap-8 text-red-400 font-baloo font-[800] tracking-widest text-base sm:text-lg uppercase">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="flex items-center gap-8">
                <span>QUIZZITCH CUP</span>
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span>SPONSERS</span>
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>

      {/* Pure Circular Image Grid with Shadows and No Hard Border */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 relative z-30 max-w-5xl mx-auto px-4"
      >
        {SPONSORS.map((sponsor) => (
          <motion.div
            key={sponsor.name}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
            }}
            whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(255,30,67,0.25)] bg-zinc-900 flex items-center justify-center p-3"
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="w-full h-full object-cover rounded-full"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}