"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.78 5.6c1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z" />
    </svg>
  );
}

interface MemberProps {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  facebook?: string;
}

export default function MemberCard({
  name,
  role,
  image,
  linkedin,
  facebook,
}: MemberProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const idleFloatRef = useRef<gsap.core.Tween | null>(null);

  const [isHovered, setIsHovered] = useState(false);

  // Setup GSAP Laser Border + Gentle Idle Floating
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);
    };

    setCanvasSize();

    const beam = { progress: 0 };

    // GSAP Continuous Laser Orbit
    tweenRef.current = gsap.to(beam, {
      progress: 1,
      duration: 6, // Slow cruise speed when idle
      repeat: -1,
      ease: "none",
      onUpdate: () => {
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;
        const r = 24;
        const pad = 4;

        ctx.clearRect(0, 0, w, h);

        const perimeter = 2 * (w - 2 * r) + 2 * (h - 2 * r) + 2 * Math.PI * r;
        const currentLength = beam.progress * perimeter;

        const getPointAtLength = (len: number) => {
          let distance = (len + perimeter) % perimeter;

          if (distance < w - 2 * r) return { x: r + distance, y: pad };
          distance -= w - 2 * r;

          if (distance < (Math.PI * r) / 2) {
            const angle = -Math.PI / 2 + distance / r;
            return {
              x: w - r + Math.cos(angle) * (r - pad),
              y: r + Math.sin(angle) * (r - pad),
            };
          }
          distance -= (Math.PI * r) / 2;

          if (distance < h - 2 * r) return { x: w - pad, y: r + distance };
          distance -= h - 2 * r;

          if (distance < (Math.PI * r) / 2) {
            const angle = distance / r;
            return {
              x: w - r + Math.cos(angle) * (r - pad),
              y: h - r + Math.sin(angle) * (r - pad),
            };
          }
          distance -= (Math.PI * r) / 2;

          if (distance < w - 2 * r) return { x: w - r - distance, y: h - pad };
          distance -= w - 2 * r;

          if (distance < (Math.PI * r) / 2) {
            const angle = Math.PI / 2 + distance / r;
            return {
              x: r + Math.cos(angle) * (r - pad),
              y: h - r + Math.sin(angle) * (r - pad),
            };
          }
          distance -= (Math.PI * r) / 2;

          if (distance < h - 2 * r) return { x: pad, y: h - r - distance };
          distance -= h - 2 * r;

          const angle = Math.PI + distance / r;
          return {
            x: r + Math.cos(angle) * (r - pad),
            y: r + Math.sin(angle) * (r - pad),
          };
        };

        // Render Laser Tail
        const trailLength = 120;
        const segments = 30;

        for (let i = 0; i < segments; i++) {
          const t1 = currentLength - (i / segments) * trailLength;
          const t2 = currentLength - ((i + 1) / segments) * trailLength;

          const p1 = getPointAtLength(t1);
          const p2 = getPointAtLength(t2);

          const alpha = 1 - i / segments;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 30, 67, ${alpha})`;
          ctx.lineWidth = 3 + (1 - i / segments) * 2;
          ctx.shadowColor = "#ff1e43";
          ctx.shadowBlur = 12;
          ctx.lineCap = "round";
          ctx.stroke();
        }
      },
    });

    // Idle Subtle Vertical Floating Effect
    idleFloatRef.current = gsap.to(cardRef.current, {
      y: -6,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      tweenRef.current?.kill();
      idleFloatRef.current?.kill();
    };
  }, []);

  // Mouse Move Tilt Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: "power2.out",
    });

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: (x - centerX) * 0.08,
        y: (y - centerY) * 0.08,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Mouse Enter: Speed up laser, pause idle float
  const handleMouseEnter = () => {
    setIsHovered(true);

    if (idleFloatRef.current) idleFloatRef.current.pause();

    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 3, // Overdrive speed on hover
        duration: 0.5,
      });
    }
  };

  // Mouse Leave: Slow down laser, resume idle float
  const handleMouseLeave = () => {
    setIsHovered(false);

    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 1, // Reset to smooth cruise speed
        duration: 0.8,
      });
    }

    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          idleFloatRef.current?.resume();
        },
      });
    }

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      className="perspective-1000 group relative flex items-center justify-center p-2"
      style={{ perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Transform Outer Container */}
      <div
        ref={cardRef}
        className="relative w-80 h-[460px] rounded-[24px] bg-[#0a0002] p-1 shadow-2xl transition-shadow duration-500 transform-style-3d"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Dynamic Laser Canvas */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full pointer-events-none z-30 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-45"
          }`}
        />

        {/* Pulsing Base Frame Outline */}
        <div className="absolute inset-0 rounded-[24px] border border-[#ff1e43]/40 pointer-events-none transition-all duration-500 group-hover:border-[#ff1e43] animate-pulse" />

        {/* Ambient Dark Red Glow */}
        <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-[#ff1e43]/15 via-transparent to-[#ff1e43]/25 blur-xl opacity-50 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

        {/* Holographic HUD Grid Pattern */}
        <div className="absolute inset-0 rounded-[24px] bg-[radial-gradient(#ff1e43_1px,transparent_1px)] [background-size:16px_16px] opacity-10 transition-opacity duration-500 group-hover:opacity-25 pointer-events-none z-10" />

        {/* Card Content Canvas */}
        <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-[#0f0205] border border-white/5">
          {/* Parallax Image Layer */}
          <div ref={imageRef} className="absolute inset-0 h-full w-full scale-110">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10" />

          {/* HOVER OVERLAY WITH SOCIAL LINKS */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/75 backdrop-blur-md opacity-0 transition-all duration-300 group-hover:opacity-100 z-40">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-red-500/50 bg-black/80 text-white transition-all duration-300 hover:scale-110 hover:border-red-400 hover:bg-[#ff1e43] hover:shadow-[0_0_25px_rgba(255,30,67,0.9)]"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            )}

            {facebook && (
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Profile"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-red-500/50 bg-black/80 text-white transition-all duration-300 hover:scale-110 hover:border-red-400 hover:bg-[#ff1e43] hover:shadow-[0_0_25px_rgba(255,30,67,0.9)]"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            )}
          </div>

          {/* Bottom Section: Name & Role */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-left z-20 flex flex-col">
            <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-red-400 transition-colors drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {name}
            </h3>
            <p className="text-xs font-bold uppercase tracking-widest text-rose-200/80 mt-1">
              {role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}