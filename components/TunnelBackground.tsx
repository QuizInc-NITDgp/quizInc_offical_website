"use client";

import { useEffect, useRef } from "react";

interface QuestionMark {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotSpeed: number;
}

export default function TunnelBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const particleCount = 280;
    const particles: QuestionMark[] = [];

    const createParticle = (customZ?: number): QuestionMark => {
      const w = canvas.width || 1200;
      const h = canvas.height || 800;

      // Mobile check (Tailwind 'sm' breakpoint: < 640px)
      const isMobile = w < 640;

      // Smaller base size on mobile, exact original base size on desktop
      const minSize = isMobile ? 12 : 25;
      const sizeRange = isMobile ? 25 : 45;

      return {
        x: (Math.random() - 0.5) * w * 2.5,
        y: (Math.random() - 0.5) * h * 2.5,
        z: customZ ?? Math.random() * w,
        size: Math.random() * sizeRange + minSize,
        // REDUCED SPEED: Range lowered from (7 - 21) down to (1.5 - 4.5)
        speed: Math.random() * 3 + 1.5,
        opacity: Math.random() * 0.85 + 0.15,
        rotation: Math.random() * Math.PI * 2,
        // REDUCED ROTATION SPEED for gentler spinning
        rotSpeed: (Math.random() - 0.5) * 0.015,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.z -= p.speed;
        p.rotation += p.rotSpeed;

        if (p.z <= 1) {
          Object.assign(p, createParticle(width));
        }

        const k = 450 / p.z;
        const px = p.x * k + centerX;
        const py = p.y * k + centerY;

        if (px >= -100 && px <= width + 100 && py >= -100 && py <= height + 100) {
          const fontSize = Math.max(12, p.size * k);
          const alpha = Math.min(1, (1 - p.z / width) * p.opacity);

          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(p.rotation);

          ctx.shadowColor = "#ff1e43";
          ctx.shadowBlur = fontSize * 0.7;

          ctx.font = `900 ${fontSize}px sans-serif`;
          ctx.fillStyle = `rgba(255, 30, 67, ${alpha})`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("?", 0, 0);

          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden bg-[#0a0002]">
      {/* 1. Deep Dark Core Gradient */}
      <div 
        className="absolute inset-0 h-full w-full"
        style={{
          background: "radial-gradient(circle at 50% 50%, #520511 0%, #1a0005 55%, #050001 100%)"
        }}
      />

      {/* 2. Soft Red & Dark Aurora Waves Layer */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1000 1000"
      >
        <defs>
          <filter id="auroraGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="70" />
          </filter>
        </defs>

        {/* DARK AURORA / SMOKEY WAVES */}
        <path
          d="M -200,400 Q 200,100 700,500 T 1500,200"
          fill="none"
          stroke="#120003"
          strokeWidth="220"
          filter="url(#auroraGlow)"
          className="opacity-90"
        />
        <path
          d="M -100,600 Q 500,900 1100,400 T 1700,700"
          fill="none"
          stroke="#260007"
          strokeWidth="180"
          filter="url(#auroraGlow)"
          className="opacity-80"
        />

        {/* GLOWING RED AURORA RIBBONS */}
        <path
          d="M -200,200 Q 300,700 800,200 T 1400,300"
          fill="none"
          stroke="#ff1e43"
          strokeWidth="110"
          filter="url(#auroraGlow)"
          className="animate-pulse opacity-60 mix-blend-screen"
        />
        <path
          d="M -200,800 Q 400,300 1000,800 T 1600,500"
          fill="none"
          stroke="#cc0029"
          strokeWidth="130"
          filter="url(#auroraGlow)"
          className="animate-pulse opacity-50 mix-blend-screen"
        />
      </svg>

      {/* 3. Smooth Flying Question Marks Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 h-full w-full pointer-events-none"
      />
    </div>
  );
}