"use client";

import { useState, useEffect } from "react";
import DomeGallery from "@/components/DomeGallery";

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

export default function PhotoGlobe() {
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch for window/client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Overlay Header */}
      <header className="absolute top-14 sm:top-16 left-0 right-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4 text-center mb-6 sm:mb-0">
        <div className="relative flex flex-col items-center pointer-events-auto pt-8 sm:pb-0 px-4 sm:py-0 sm:px-0">
          {/* Soft glow/shadow backdrop behind text so it stays readable over the globe */}
          <div className="absolute -inset-x-4 -inset-y-2 sm:-inset-x-6 sm:-inset-y-4 bg-black/50 blur-2xl rounded-[1.5rem] sm:rounded-[2rem] -z-10 sm:pt-5" />

          <h1 className="font-heading text-xl leading-tight font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-red-400 sm:text-5xl md:text-6xl sm:leading-[0.95] drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] mb-0 sm:mb-0 sm:mt-5">
            Welcome to QuizInc
            Gallery
          </h1>
          
          {/* Reduced space above, and added a wrapper with padding/margin below the entire text block */}
          <div className="mt-1 sm:mt-2 pb-6 sm:pb-8">
            <p className="text-[9px] sm:text-base font-extrabold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-red-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Drag or scroll to explore <br className="sm:hidden" />
              the memory sphere
            </p>
          </div>
        </div>
      </header>

      {/* 3D Dome / Rotating Globe Gallery Container */}
      <div className="absolute inset-0 w-full h-full pt-15 pb-0">
        <DomeGallery
          images={photos}
          fit={0.8}
          minRadius={600}
          maxVerticalRotationDeg={0} // Enabled slight vertical range for better globe feel
          segments={34}
          dragDampening={2}
          grayscale={false}
        />
      </div>
    </div>
  );
}