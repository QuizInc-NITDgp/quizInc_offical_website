"use client";

import { useState } from "react";
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
    <div className="relative flex flex-col items-center justify-center w-full py-4 my-2">
      {/* Ambient Glow */}
      <div
        className="
          pointer-events-none
          absolute
          h-[220px]
          w-[220px]
          rounded-full
          bg-red-600/20
          blur-[60px]
        "
      />

      {/* Q-Shape Container */}
      <div className="relative h-[340px] w-[280px] sm:h-[360px] sm:w-[300px]">
        <div className="absolute inset-0 translate-y-4">
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
                  h-[44px]
                  w-[44px]
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
                      : "border-red-500/70 shadow-[0_0_12px_rgba(255,30,67,0.6)] hover:z-50 hover:scale-[2.8] hover:border-red-300 hover:shadow-[0_0_30px_rgba(255,30,67,0.95)] hover:brightness-110"
                  }
                `}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
              >
                <Image
                  src={photo}
                  alt={`QuizInc memory ${index + 1}`}
                  fill
                  sizes="140px"
                  quality={100}
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Centered Active Image Overlay with fully transparent background */}
      {activePhoto && (
        <div 
          className="absolute inset-0 z-50 flex items-center justify-center bg-transparent transition-all duration-300"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className="relative h-[220px] w-[220px] overflow-hidden rounded-2xl border-2 border-red-300 bg-black shadow-[0_0_60px_rgba(255,30,67,0.95)] brightness-110 transition-transform duration-500 scale-100"
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