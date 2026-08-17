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
  { name: "Sponsor 9", logo: "/sponsers/sponser9.png" },
  { name: "Sponsor 10", logo: "/sponsers/sponser10.png" },
  { name: "Sponsor 11", logo: "/sponsers/sponser11.png" },
];

export default function QuizzitchSponsors() {
  // Split sponsors evenly into two halves for mobile dual-row marquee
  const midIndex = Math.ceil(SPONSORS.length / 2);
  const row1Sponsors = SPONSORS.slice(0, midIndex);
  const row2Sponsors = SPONSORS.slice(midIndex);

  return (
    <div className="relative z-20 overflow-hidden pt-8 sm:pt-20 py-12 sm:py-8 w-full bg-transparent">
      {/* Crossing Marquee Banners - Full Screen Breakout */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 h-24 sm:h-40 flex items-center justify-center overflow-hidden mb-8 sm:mb-24">
        {/* Banner 1: Slanted Right */}
        <div className="absolute top-1/2 left-1/2 w-[160%] sm:w-[140%] -translate-x-1/2 -translate-y-1/2 -rotate-3 bg-red-600/90 py-2 sm:py-4 shadow-[0_0_40px_rgba(255,30,67,0.6)] border-y border-white/25 backdrop-blur-md overflow-hidden z-20">
          <div className="flex whitespace-nowrap animate-[marquee-left_25s_linear_infinite] gap-4 sm:gap-8 text-white font-baloo font-[800] tracking-widest text-xs sm:text-lg uppercase w-max">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="flex items-center gap-4 sm:gap-8">
                <span>SPONSORS</span>
                <span className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-white/70" />
                <span>QUIZZITCH CUP</span>
                <span className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-white/70" />
              </span>
            ))}
          </div>
        </div>

        {/* Banner 2: Slanted Left */}
        <div className="absolute top-1/2 left-1/2 w-[160%] sm:w-[140%] -translate-x-1/2 -translate-y-1/2 rotate-3 bg-zinc-950/95 py-2 sm:py-4 shadow-[0_0_40px_rgba(0,0,0,0.9)] border-y border-red-500/40 backdrop-blur-md overflow-hidden z-10">
          <div className="flex whitespace-nowrap animate-[marquee-right_25s_linear_infinite] gap-4 sm:gap-8 text-red-300 font-baloo font-[800] tracking-widest text-xs sm:text-lg uppercase w-max">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="flex items-center gap-4 sm:gap-8">
                <span>QUIZZITCH CUP</span>
                <span className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400/80" />
                <span>SPONSORS</span>
                <span className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400/80" />
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
        @keyframes marquee-sponsors {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .sponsor-logo-circle {
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          -webkit-mask-image: radial-gradient(circle, #fff 100%, #fff 100%);
          mask-image: radial-gradient(circle, #fff 100%, #fff 100%);
          isolation: isolate;
        }
      `}</style>

      {/* Sponsors Logo Marquee Container */}
      <div className="relative z-30 w-full overflow-hidden flex flex-col sm:block bg-transparent gap-4 sm:gap-0">
        
        {/* DESKTOP VIEW: Single Marquee Row */}
        <div className="hidden sm:flex w-full overflow-hidden items-center bg-transparent">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex whitespace-nowrap items-center gap-16 animate-[marquee-sponsors_35s_linear_infinite] w-max px-4 bg-transparent py-6 my-1"
          >
            {[...SPONSORS, ...SPONSORS].map((sponsor, index) => (
              <div
                key={`desktop-${sponsor.name}-${index}`}
                className="sponsor-logo-circle w-44 h-44 flex-shrink-0 rounded-full overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(255,30,67,0.3)] bg-zinc-900/80 border border-white/10 flex items-center justify-center p-[4px] transition-transform duration-200 hover:scale-105"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* MOBILE VIEW: Row 1 (Left Animation) */}
        <div className="flex sm:hidden w-full overflow-hidden items-center bg-transparent">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="flex whitespace-nowrap items-center gap-6 animate-[marquee-left_25s_linear_infinite] w-max px-2 bg-transparent py-2"
          >
            {[...row1Sponsors, ...row1Sponsors, ...row1Sponsors].map((sponsor, index) => (
              <div
                key={`mob-row1-${sponsor.name}-${index}`}
                className="sponsor-logo-circle w-24 h-24 flex-shrink-0 rounded-full overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(255,30,67,0.2)] bg-zinc-900/80 border border-white/10 flex items-center justify-center p-[3px]"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* MOBILE VIEW: Row 2 (Right Animation) */}
        <div className="flex sm:hidden w-full overflow-hidden items-center bg-transparent">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="flex whitespace-nowrap items-center gap-6 animate-[marquee-right_25s_linear_infinite] w-max px-2 bg-transparent py-2"
          >
            {[...row2Sponsors, ...row2Sponsors, ...row2Sponsors].map((sponsor, index) => (
              <div
                key={`mob-row2-${sponsor.name}-${index}`}
                className="sponsor-logo-circle w-24 h-24 flex-shrink-0 rounded-full overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(255,30,67,0.2)] bg-zinc-900/80 border border-white/10 flex items-center justify-center p-[3px]"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
}