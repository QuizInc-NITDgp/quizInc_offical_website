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

    const ctx = canvas.getContext("2d", {
      alpha: true,
    });

    if (!ctx) return;

    let animationFrameId = 0;

    let width = 0;
    let height = 0;

    const particles: QuestionMark[] = [];

    // Keep this moderate for smooth animation
    const particleCount = 500;

    const createParticle = (customZ?: number): QuestionMark => {
      const isMobile = width < 640;

      const minSize = isMobile ? 10 : 20;
      const sizeRange = isMobile ? 18 : 32;

      return {
        x: (Math.random() - 0.5) * width * 1.8,
        y: (Math.random() - 0.5) * height * 1.8,

        z: customZ ?? Math.random() * width,

        size: Math.random() * sizeRange + minSize,

        // Smooth forward movement
        speed: Math.random() * 1.4 + 0.8,

        opacity: Math.random() * 0.6 + 0.2,

        rotation: Math.random() * Math.PI * 2,

        rotSpeed: (Math.random() - 0.5) * 0.006,
      };
    };

    const handleResize = () => {
      const parent = canvas.parentElement;

      if (!parent) return;

      width = parent.clientWidth;
      height = parent.clientHeight;

      /*
        IMPORTANT:
        Don't render at unnecessarily huge resolution.

        devicePixelRatio 2-3 can make canvas rendering
        significantly more expensive.
      */

      const dpr = Math.min(window.devicePixelRatio, 1.5);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    // Generate particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    let previousTime = performance.now();

    const animate = (currentTime: number) => {
      /*
        Delta time makes movement independent
        of monitor refresh rate.

        So 60Hz / 120Hz / 144Hz monitors all
        get approximately the same movement speed.
      */

      const delta = Math.min(
        (currentTime - previousTime) / 16.67,
        2
      );

      previousTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.z -= p.speed * delta;

        p.rotation += p.rotSpeed * delta;

        if (p.z <= 1) {
          Object.assign(p, createParticle(width));
          continue;
        }

        const perspective = 420;

        const k = perspective / p.z;

        const px = p.x * k + centerX;
        const py = p.y * k + centerY;

        // Don't draw invisible particles
        if (
          px < -80 ||
          px > width + 80 ||
          py < -80 ||
          py > height + 80
        ) {
          continue;
        }

        const fontSize = Math.max(
          10,
          Math.min(90, p.size * k)
        );

        const depth = 1 - p.z / width;

        const alpha = Math.max(
          0,
          Math.min(0.85, depth * p.opacity)
        );

        if (alpha < 0.02) continue;

        ctx.save();

        ctx.translate(px, py);

        ctx.rotate(p.rotation);

        /*
          Shadow blur was one of the biggest
          performance problems.

          Only use a small blur for nearby particles.
        */

        if (depth > 0.55) {
          ctx.shadowColor = "rgba(255,30,67,0.55)";
          ctx.shadowBlur = 6;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.font = `900 ${fontSize}px Arial`;

        ctx.fillStyle = `rgba(255,30,67,${alpha})`;

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText("?", 0, 0);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);

      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden bg-[#0a0002]">

      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #520511 0%, #1a0005 55%, #050001 100%)",
        }}
      />

      {/* Aurora */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <filter
            id="auroraGlow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="60" />
          </filter>
        </defs>

        <path
          d="M -200,400 Q 200,100 700,500 T 1500,200"
          fill="none"
          stroke="#120003"
          strokeWidth="220"
          filter="url(#auroraGlow)"
          opacity="0.9"
        />

        <path
          d="M -100,600 Q 500,900 1100,400 T 1700,700"
          fill="none"
          stroke="#260007"
          strokeWidth="180"
          filter="url(#auroraGlow)"
          opacity="0.8"
        />

        <path
          d="M -200,200 Q 300,700 800,200 T 1400,300"
          fill="none"
          stroke="#ff1e43"
          strokeWidth="110"
          filter="url(#auroraGlow)"
          opacity="0.45"
        />

        <path
          d="M -200,800 Q 400,300 1000,800 T 1600,500"
          fill="none"
          stroke="#cc0029"
          strokeWidth="130"
          filter="url(#auroraGlow)"
          opacity="0.4"
        />
      </svg>

      {/* Question marks */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-10"
      />
    </div>
  );
}