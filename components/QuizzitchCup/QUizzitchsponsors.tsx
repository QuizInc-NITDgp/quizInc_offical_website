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
  return (
    <div className="relative z-20 overflow-hidden py-16 sm:py-24 w-full bg-transparent">
      {/* Crossing Marquee Banners */}
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
        @keyframes marquee-sponsors {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* Fix for hairline clipping artifact on rounded logos inside
           the animated (translateX) marquee track. Promoting each
           logo circle to its own compositing layer prevents the
           browser from mis-rendering the border-radius clip on
           certain frames. */
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

      {/* Infinite Single-Line Marquee Container for Sponsor Logos */}
      <div className="relative z-30 w-full overflow-hidden flex items-center bg-transparent">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex whitespace-nowrap items-center gap-6 sm:gap-10 animate-[marquee-sponsors_35s_linear_infinite] w-max px-4 bg-transparent py-3 my-1"
        >
          {/* Render sponsors list twice for a seamless infinite loop effect */}
          {[...SPONSORS, ...SPONSORS].map((sponsor, index) => (
            <div
              key={`${sponsor.name}-${index}`}
              className="sponsor-logo-circle w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(255,30,67,0.25)] bg-zinc-900/80 border border-white/10 flex items-center justify-center p-[3px] transition-transform duration-200 hover:scale-108"
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
  );
}