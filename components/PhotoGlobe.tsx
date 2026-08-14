"use client";

import { useState } from "react";
import Image from "next/image";

const photos = [
  "/photo1.webp",
  "/photo2.webp",
  "/photo3.webp",
  "/photo4.webp",
  "/photo5.webp",
  "/photo6.webp",
  "/photo7.webp",
  "/photo8.webp",
  "/photo9.webp",
  "/photo10.webp",
  "/photo11.webp",
  "/photo12.webp",
  "/photo13.webp",
  "/photo14.webp",
  "/photo15.webp",
  "/photo16.webp",
  "/photo17.webp",
  "/photo18.webp",
  "/photo26.webp",
  "/photo27.webp",
];

const qShapeCoordinates = [
  [38, 10], [47, 7], [56, 7], [65, 10],
  [29, 14], [22, 20], [17, 28],
  [14, 37], [14, 47], [16, 57],
  [20, 66], [27, 73], [36, 78], [45, 81],
  [73, 15], [80, 21], [84, 29], [86, 38],
  [86, 47],
  [84, 56], [80, 64], [74, 70], [67, 75], [59, 79],
  [55, 86], [55, 94], [55, 102], [55, 109],
  [55, 125]
];

export default function PhotoGlobe() {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  return (
    <div className="relative flex flex-col items-center justify-center w-full py-24 my-12">
      <div
        className="
          pointer-events-none
          absolute
          h-[320px]
          w-[320px]
          rounded-full
          bg-red-600/20
          blur-[80px]
        "
      />

      <div className="relative h-[460px] w-[280px] sm:h-[510px] sm:w-[320px] flex items-center justify-center">
        <div className="absolute inset-0">
          {qShapeCoordinates.map(([x, y], index) => {
            const photo = photos[index % photos.length];
            const isSelected = activePhoto === photo;

            if (isSelected) return null;

            return (
              <div
                key={`${photo}-${index}`}
                onClick={() => setActivePhoto(photo)}
                className={`
                  absolute
                  h-[36px]
                  w-[36px]
                  sm:h-[42px]
                  sm:w-[42px]
                  -translate-x-1/2
                  -translate-y-1/2
                  cursor-pointer
                  overflow-hidden
                  rounded-xl
                  border-2
                  bg-black/90
                  transition-all
                  duration-500
                  ease-[cubic-bezier(0.25,1,0.5,1)]
                  ${
                    activePhoto
                      ? "opacity-15 scale-75 border-red-500/20 blur-[1px]"
                      /* Increased hover scale from scale-[2.4] to scale-[3.6] */
                      : "border-red-500/70 shadow-[0_0_12px_rgba(255,30,67,0.6)] hover:z-50 hover:scale-[3.6] hover:border-red-300 hover:shadow-[0_0_35px_rgba(255,30,67,0.95)] hover:brightness-110"
                  }
                `}
                style={{
                  left: `${x}%`,
                  top: `${(y / 132) * 100}%`,
                }}
              >
                <Image
                  src={photo}
                  alt={`QuizInc memory ${index + 1}`}
                  fill
                  sizes="200px"
                  quality={100}
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>

      {activePhoto && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-transparent transition-all duration-300"
          onClick={() => setActivePhoto(null)}
        >
          {/* Increased clicked image modal size from 220px to 320px (380px on sm screen) */}
          <div
            className="relative h-[320px] w-[320px] sm:h-[380px] sm:w-[380px] overflow-hidden rounded-3xl border-2 border-red-300 bg-black shadow-[0_0_70px_rgba(255,30,67,0.95)] brightness-110 transition-transform duration-500 scale-100"
            onClick={(e) => {
              e.stopPropagation();
              setActivePhoto(null);
            }}
          >
            <Image
              src={activePhoto}
              alt="Selected memory"
              fill
              sizes="400px"
              quality={100}
              className="object-cover cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
}