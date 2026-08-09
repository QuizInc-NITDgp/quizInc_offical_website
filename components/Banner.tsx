"use client";

const bannerItems = [
  "QURIOUS",
  "QUANTUM",
  "QUEST",
  "QUENCH",
  "QUICKEN",
  "QUOTIENT",
];

function BannerTrackItems() {
  return (
    <>
      {bannerItems.map((item, index) => (
        <div key={index} className="flex items-center gap-16">
          <span className="text-xl sm:text-3xl font-extrabold tracking-wider font-baloo uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-300 to-white drop-shadow-[0_2px_15px_rgba(255,30,67,0.4)]">
            {item}
          </span>
          <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(255,30,67,1)]" />
        </div>
      ))}
    </>
  );
}

export default function MovingBanner() {
  return (
    <div className="relative w-full overflow-hidden bg-transparent py-8 border-t border-b border-white/10 mb-16">
      {/* Subtle background grid pattern (fixed: tiles as repeating horizontal lines) */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgb(177, 151, 252) 1px, transparent 1px)",
          backgroundSize: "100% 24px",
        }}
      />

      {/* Infinite scrolling ticker track — pure CSS animation, no per-frame JS */}
      <div className="flex whitespace-nowrap overflow-hidden">
        <div
          className="flex items-center gap-16 shrink-0 animate-banner-scroll motion-reduce:animate-none"
          style={{ willChange: "transform" }}
        >
          {/* First copy: real content for assistive tech */}
          <div className="flex items-center gap-16 shrink-0">
            <BannerTrackItems />
          </div>
          {/* Second copy: exact duplicate, hidden from assistive tech.
              Only 2 copies are needed for a seamless 0% -> -50% loop —
              a 3rd copy was pure extra render cost with no visual benefit. */}
          <div
            className="flex items-center gap-16 shrink-0"
            aria-hidden="true"
          >
            <BannerTrackItems />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes banner-scroll {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-banner-scroll {
          animation: banner-scroll 25s linear infinite;
        }
      `}</style>
    </div>
  );
}