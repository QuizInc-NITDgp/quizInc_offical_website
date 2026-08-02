"use client";

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

/*
  QuizInc logo shape

       circular broken ring
              ↓
       question-mark stem
              ↓
             dot
*/

const qPositions = [
  // ===== TOP OF CIRCLE =====
  [38, 10],
  [47, 7],
  [56, 7],
  [65, 10],

  // ===== UPPER LEFT CURVE =====
  [29, 14],
  [22, 20],
  [17, 28],

  // ===== LEFT SIDE =====
  [14, 37],
  [14, 47],
  [16, 57],

  // ===== LOWER LEFT CURVE =====
  [20, 66],
  [27, 73],
  [36, 78],
  [45, 81],

  // ===== RIGHT TOP CURVE =====
  [73, 15],
  [80, 21],
  [84, 29],
  [86, 38],

  // ===== RIGHT SIDE =====
  [86, 47],

  // ===== RED-STYLE LOWER RIGHT CURVE =====
  [84, 56],
  [80, 64],
  [74, 70],
  [67, 75],
  [59, 79],

  // ===== QUESTION MARK STEM =====
  [55, 86],
  [55, 94],
  [55, 102],
  [55, 110],

  // ===== DOT =====
  [55, 124],
];

export default function PhotoGlobe() {
  return (
    <div className="relative h-[300px] w-[240px]">

      {/* Background glow */}
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

      {qPositions.map(([x, y], index) => {
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
              className="
                object-cover
                transition-all
                duration-300
                group-hover:brightness-110
              "
            />
          </div>
        );
      })}
    </div>
  );
}