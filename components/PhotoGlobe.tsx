"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const photos = [
  "/photo1.JPG",
  "/photo2.JPG",
  "/photo3.JPG",
  "/photo4.JPG",
  "/photo5.JPG",
  "/photo6.JPG",
  "/photo7.JPG",
  "/photo8.JPG",
  "/photo9.JPG",
  "/photo10.JPG",
  "/photo11.JPG",
  "/photo12.JPG",
  "/photo13.JPG",
  "/photo14.JPG",
  "/photo15.JPG",
  "/photo16.JPG",
  "/photo17.JPG",
  "/photo18.JPG",
  "/photo26.JPG",
  "/photo27.JPG",
];

// Floating animation keyframes
const floatAnimation = `
  @keyframes float {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-12px) rotate(1.5deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
`;

export default function PhotoGlobe() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance the mobile gallery
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style>{floatAnimation}</style>

      {/* ================= MOBILE VERSION (Matching Text Container Alignment) ================= */}
      <div className="flex w-full flex-col items-center lg:hidden">

        {/* Floating Container */}
        <div className="
  relative 
  w-full 
  aspect-square
  animate-float
  rounded-[24px]
  bg-black/50 
  backdrop-blur-xl 
  border
  border-red-500/30
  shadow-[0_25px_60px_-12px_rgba(255,30,67,0.45)]
  p-1.5
">

          {/* Photo Frame */}
          <div className="relative h-full w-full overflow-hidden rounded-[24px] border border-white/10">
            <Image
              src={photos[currentIndex]}
              alt={`QuizInc memory ${currentIndex + 1}`}
              fill
              sizes="100vw"
              priority
              className="object-cover transition-opacity duration-700 ease-in-out"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

            {/* Counter Badge */}
            <div className="absolute bottom-4 left-4 rounded-full bg-red-600/90 px-4 py-1.5 text-xs font-bold tracking-wider text-white shadow-md">
              {String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </div>
          </div>

          {/* Ambient background glow behind the box */}
          <div className="absolute -inset-8 -z-10 rounded-3xl bg-red-600/30 blur-[50px]" />
        </div>

        {/* Indicator Dots */}
        <div className="mt-8 flex w-full items-center justify-center gap-1.5 flex-wrap">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === index
                  ? "w-6 bg-red-500 shadow-[0_0_8px_rgba(255,30,67,0.8)]"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
              aria-label={`Go to photo ${index + 1}`}
            />
          ))}
        </div>

      </div>

      {/* ================= DESKTOP VERSION (Original PhotoGlobe Q-Shape) ================= */}
      <div className="relative hidden h-[330px] w-[240px] lg:block">

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[42%]
            h-[190px]
            w-[190px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-red-600/15
            blur-[55px]
          "
        />

        <div className="absolute inset-0 translate-y-4">
          {[
            [38, 10], [47, 7], [56, 7], [65, 10],
            [29, 14], [22, 20], [17, 28],
            [14, 37], [14, 47], [16, 57],
            [20, 66], [27, 73], [36, 78], [45, 81],
            [73, 15], [80, 21], [84, 29], [86, 38],
            [86, 47],
            [84, 56], [80, 64], [74, 70], [67, 75], [59, 79],
            [55, 86], [55, 94], [55, 102], [55, 110],
          ].map(([x, y], index) => {
            const photo = photos[index % photos.length];

            return (
              <div
                key={`${photo}-${index}`}
                className="
                  group
                  absolute
                  h-[37px]
                  w-[37px]
                  -translate-x-1/2
                  -translate-y-1/2
                  overflow-hidden
                  rounded-md
                  border
                  border-red-500/50
                  shadow-[0_0_9px_rgba(255,30,67,0.45)]
                  transition-all
                  duration-300
                  ease-out
                  hover:z-50
                  hover:scale-[2.5]
                  hover:border-red-300
                  hover:shadow-[0_0_25px_rgba(255,30,67,0.95)]
                "
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
              >
                <Image
                  src={photo}
                  alt={`QuizInc memory ${index + 1}`}
                  fill
                  sizes="120px"
                  quality={100}
                  className="object-cover transition-all duration-300 group-hover:brightness-110"
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}