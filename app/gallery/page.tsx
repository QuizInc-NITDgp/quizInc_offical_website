"use client";

import { useState, useEffect, useRef } from "react";
import DomeGallery, { DomeGalleryRef } from "@/components/DomeGallery";
import TunnelBackground from "@/components/TunnelBackground";

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
  const galleryRef = useRef<DomeGalleryRef>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRotate = (direction: "left" | "right") => {
    const degrees = direction === "left" ? 35 : -35;
    galleryRef.current?.rotateBy(degrees);
  };

  if (!isMounted) return null;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <TunnelBackground />
      </div>

      {/* 3D Dome Gallery Container - Full Viewport */}
      <div className="absolute inset-0 w-full h-full z-10">
        <DomeGallery
          ref={galleryRef}
          images={photos}
          fit={1.1}
          padFactor={0}
          minRadius={800}
          maxVerticalRotationDeg={0}
          segments={34}
          dragDampening={2}
          grayscale={false}
          overlayBlurColor="transparent"
        />
      </div>

      {/* Title Header - Positioned safely below top navigation inside a Pill Container */}
      <header className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center w-full px-4 flex justify-center">
        <div className="inline-block px-6 py-2.5 rounded-full bg-black/60 border border-red-500/30 backdrop-blur-xl shadow-[0_0_25px_rgba(239,68,68,0.2)]">
          <h1 className="font-heading text-xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-red-400 tracking-tight">
            QuizInc Universe
          </h1>
        </div>
      </header>

      {/* Navigation Buttons */}
      <button
        onClick={() => handleRotate("left")}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-black/30 hover:bg-black/60 border border-white/10 text-white/70 hover:text-white backdrop-blur-md transition-all duration-300 pointer-events-auto shadow-[0_0_20px_rgba(0,0,0,0.5)] group cursor-pointer"
        aria-label="Rotate Left"
      >
        <svg className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => handleRotate("right")}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-black/30 hover:bg-black/60 border border-white/10 text-white/70 hover:text-white backdrop-blur-md transition-all duration-300 pointer-events-auto shadow-[0_0_20px_rgba(0,0,0,0.5)] group cursor-pointer"
        aria-label="Rotate Right"
      >
        <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}