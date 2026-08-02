"use client";

import { useState } from "react";
import Image from "next/image";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

interface MemberProps {
  name?: string;
  role?: string;
  image?: string;
  linkedin?: string;
  instagram?: string;
}

export default function MemberCard({
  name = "",
  role = "",
  image = "",
  linkedin,
  instagram,
}: MemberProps) {
  const [isTouched, setIsTouched] = useState(false);

  const isGooglePhoto = image.includes("googleusercontent.com");
  const hasImage = Boolean(image && image.trim().length > 0) && !isGooglePhoto;

  return (
    <div 
      className="relative w-[400px] h-[500px] flex items-center justify-center"
      onClick={() => setIsTouched(!isTouched)}
    >
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[520px] bg-red-600/50 rounded-full blur-[70px] opacity-80 transition-all duration-500 group-hover:bg-red-500/80 group-hover:blur-[80px] group-hover:scale-110 pointer-events-none z-0 ${isTouched ? "bg-red-500/80 blur-[80px] scale-110" : ""}`} />

      <div className={`group absolute top-1/2 left-1/2 w-[350px] h-[450px] -translate-x-1/2 -translate-y-1/2 rounded-[16px] overflow-hidden shadow-[0_0_30px_rgba(255,30,67,0.4)] border border-red-500/40 cursor-pointer transition-all duration-500 bg-[#0f0205] z-10 ${isTouched ? "active-touch" : ""}`}>
        
        {/* Top Image Container */}
        <div className={`absolute top-0 left-0 w-full h-full z-10 bg-black transition-transform duration-700 group-hover:-translate-y-[100px] ${isTouched ? "-translate-y-[100px]" : ""}`}>
          {hasImage ? (
            <Image
              src={image}
              alt={name || "Member profile"}
              fill
              className={`object-cover transition-opacity duration-500 group-hover:opacity-40 ${isTouched ? "opacity-40" : ""}`}
            />
          ) : (
            <div className={`h-full w-full bg-zinc-900 transition-opacity duration-500 group-hover:opacity-40 ${isTouched ? "opacity-40" : ""}`} />
          )}

          <div className={`absolute -inset-[50%] z-25 pointer-events-none mix-blend-screen opacity-25 -rotate-[25deg] transition-opacity duration-500 group-hover:opacity-15 flex items-center justify-center ${isTouched ? "opacity-15" : ""}`}>
            <div
              className="w-[200%] h-[200%] bg-repeat"
              style={{
                backgroundImage: "url('/q.png')",
                backgroundSize: "140px 140px",
                backgroundPosition: "center",
              }}
            />
          </div>
        </div>

        {/* Initial Name & Role Overlay */}
        <div className={`absolute bottom-0 left-0 right-0 p-6 z-15 flex flex-col text-left bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-0 pointer-events-none ${isTouched ? "opacity-0" : ""}`}>
          <h3 className="text-2xl font-black text-white uppercase tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {name}
          </h3>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-red-400 mt-1">
            {role}
          </p>
        </div>

        {/* Social Icons */}
        <ul className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex gap-3 pointer-events-none group-hover:pointer-events-auto">
          <li className="list-none">
            <a
              href={linkedin || "#"}
              target={linkedin ? "_blank" : "_self"}
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className={`relative flex items-center justify-center w-[50px] h-[50px] bg-white/90 text-[#0077b5] text-2xl font-bold rounded-full transition-all duration-400 translate-y-[200px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 delay-100 hover:bg-[#0077b5] hover:text-white hover:shadow-[0_0_20px_rgba(0,119,181,0.6)] ${isTouched ? "!translate-y-0 !opacity-100 pointer-events-auto" : ""}`}
            >
              <LinkedinIcon className="w-6 h-6 transition-transform duration-700 hover:rotate-y-180" />
            </a>
          </li>

          <li className="list-none">
            <a
              href={instagram || "#"}
              target={instagram ? "_blank" : "_self"}
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className={`relative flex items-center justify-center w-[50px] h-[50px] bg-white/90 text-[#e1306c] text-2xl font-bold rounded-full transition-all duration-400 translate-y-[200px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 delay-200 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:shadow-[0_0_20px_rgba(225,48,108,0.6)] ${isTouched ? "!translate-y-0 !opacity-100 pointer-events-auto" : ""}`}
            >
              <InstagramIcon className="w-6 h-6 transition-transform duration-700 hover:rotate-y-180" />
            </a>
          </li>
        </ul>

        {/* Bottom Slide-up Details Panel */}
        <div className={`absolute -bottom-[120px] left-0 w-full h-[120px] z-30 p-[10px] bg-white/90 backdrop-blur-md opacity-0 transition-all duration-400 group-hover:bottom-0 group-hover:opacity-100 delay-500 flex flex-col justify-center items-center text-center ${isTouched ? "!bottom-0 !opacity-100" : ""}`}>
          <h2 className="text-2xl font-bold text-zinc-900 uppercase m-0 p-0">
            {name}
            <br />
            <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-red-600 leading-[2rem] mt-1">
              {role}
            </span>
          </h2>
        </div>

      </div>
    </div>
  );
}