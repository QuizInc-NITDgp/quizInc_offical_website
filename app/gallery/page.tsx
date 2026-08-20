"use client";

import { useState, useEffect, useRef } from "react";
import DomeGallery, { DomeGalleryRef } from "@/components/DomeGallery";
import TunnelBackground from "@/components/TunnelBackground";

const photos = [
  "/photo1.webp",
  "/photo2.webp",
  "/photo3.webp",
  "/photo4.webp",
  "/photo5.webp",
  "/photo6.webp",
  "/photo7.webp",
  "/photo8.webp",
  "/photo9_compressed.webp",
  "/photo10_compressed.webp",
  "/photo11_compressed.webp",
  "/photo12_compressed.webp",
  "/photo13_compressed.webp",
  "/photo14_compressed.webp",
  "/photo15_compressed.webp",
  "/photo16_compressed.webp",
  "/photo17_compressed.webp",
  "/photo18_compressed.webp",
  "/photo20_compressed.webp",
  "/photo21_compressed.webp",
  "/photo26_compressed.webp",
  "/photo27_compressed.webp",
  "/photo28(1)_compressed.webp",
  "/photo29_compressed.webp",
  "/photo30_compressed.webp",
  "/photo31(1)_compressed.webp",
  "/photo33(1)_compressed.webp",
  "/photo34_compressed.webp",
  "/photo38(1)_compressed.webp",
  "/photo39(1)_compressed.webp",
  "/photo40(1)_compressed.webp",
  "/photo41_compressed.webp",
  "/photo43_compressed.webp",
  "/photo44(1)_compressed.webp",
  "/photo45(1)_compressed.webp",
  "/photo46(1)_compressed.webp",
  "/photo47_compressed.webp",
  "/photo50(1)_compressed.webp",
  "/photo51_compressed.webp",
  "/photo52(1)_compressed.webp",
  "/photo53(1)_compressed.webp",
  "/photo54_compressed.webp",
  "/photo54(1)_compressed.webp",
  "/photo56_compressed.webp",
  "/photo57(1)_compressed.webp",
  "/photo58(2)_compressed.webp",
  "/photo60_compressed.webp",
  "/photo63_compressed.webp",
  "/photo65_compressed.webp",
  "/photo66_compressed.webp",
  "/photo67_compressed.webp",
  "/photo68_compressed.webp",
  "/photo69_compressed.webp",
  "/photo70_compressed.webp",
  "/photo71_compressed.webp",
  "/photo72(1)_compressed.webp",
  "/photo80(1)_compressed.webp",
  "/photo81(1)_compressed.webp",
  "/photo82(1)_compressed.webp",
  "/photo83(1)_compressed.webp",
  "/photo84(1)_compressed.webp",
  "/photo85(1)_compressed.webp",
  "/photo86(1)_compressed.webp",
  "/photo87(1)_compressed.webp",
  "/photo88(1)_compressed.webp",
  "/photo89(1)_compressed.webp",
  "/photo90(1)_compressed.webp",
  "/photo91(1)_compressed.webp",
  "/photo92(1)_compressed.webp",
  "/photo93(1)_compressed.webp",
  "/photo94(1)_compressed.webp",
  "/photo95(1)_compressed.webp",
  "/photo97(1)_compressed.webp",
  "/photo98(1)_compressed.webp",
  "/photo99(1)_compressed.webp",
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
    <div className="relative w-screen h-screen overflow-hidden bg-black font-baloo">
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <TunnelBackground />
      </div>

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

      {/* <header className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center w-full px-4 flex justify-center">
        <div className="inline-block px-6 py-2.5 rounded-full bg-black/60 border border-red-500/30 backdrop-blur-xl shadow-[0_0_25px_rgba(239,68,68,0.2)]">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-red-400 tracking-tight font-baloo">
            QuizInc Universe
          </h1>
        </div>
      </header> */}

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