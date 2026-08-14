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

const SPRITE_BUCKETS = 24;
const SPRITE_MAX_SIZE = 260;

function buildSprites() {
  const sprites: { canvas: HTMLCanvasElement; fontSize: number }[] = [];
  for (let i = 0; i < SPRITE_BUCKETS; i++) {
    const t = i / (SPRITE_BUCKETS - 1);
    const fontSize = 12 + t * (SPRITE_MAX_SIZE - 12);

    const pad = fontSize * 0.9;
    const size = Math.ceil(fontSize + pad * 2);

    const off = document.createElement("canvas");
    off.width = size;
    off.height = size;
    const octx = off.getContext("2d")!;

    octx.shadowColor = "#ff1e43";
    octx.shadowBlur = fontSize * 0.7;
    octx.font = `900 ${fontSize}px sans-serif`;
    octx.fillStyle = "rgba(255, 30, 67, 1)";
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.fillText("?", size / 2, size / 2);

    sprites.push({ canvas: off, fontSize });
  }
  return sprites;
}

export default function TunnelBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let animationFrameId: number;
    let cssWidth = 0;
    let cssHeight = 0;

    const sprites = buildSprites();

    const resizeCanvas = () => {
      if (!canvas || !canvas.parentElement) return;
      cssWidth = canvas.parentElement.clientWidth;
      cssHeight = canvas.parentElement.clientHeight;
      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 150);
    };
    window.addEventListener("resize", handleResize);

    const isMobileScreen = cssWidth < 640;
    const particleCount = isMobileScreen ? 320 : 600;
    const particles: QuestionMark[] = [];

    const resetParticle = (p: QuestionMark, customZ?: number) => {
      const w = cssWidth || 1200;
      const h = cssHeight || 800;
      const isMobile = w < 640;

      const minSize = isMobile ? 12 : 25;
      const sizeRange = isMobile ? 25 : 45;

      p.x = (Math.random() - 0.5) * w * 2.5;
      p.y = (Math.random() - 0.5) * h * 2.5;
      p.z = customZ ?? Math.random() * w;
      p.size = Math.random() * sizeRange + minSize;
      
      // BALANCED SPEED: Smooth motion without being too fast or too sluggish
      p.speed = Math.random() * 3 + 2.5; 
      p.opacity = Math.random() * 0.85 + 0.15;
      p.rotation = Math.random() * Math.PI * 2;
      p.rotSpeed = (Math.random() - 0.5) * 0.02; 
    };

    for (let i = 0; i < particleCount; i++) {
      const p: QuestionMark = {
        x: 0, y: 0, z: 0, size: 0, speed: 0, opacity: 0, rotation: 0, rotSpeed: 0,
      };
      resetParticle(p);
      particles.push(p);
    }

    const spriteForSize = (fontSize: number) => {
      const t = Math.min(1, Math.max(0, (fontSize - 12) / (SPRITE_MAX_SIZE - 12)));
      const idx = Math.round(t * (SPRITE_BUCKETS - 1));
      return sprites[idx];
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      const centerX = cssWidth / 2;
      const centerY = cssHeight / 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const k = 450 / p.z;
        const px = p.x * k + centerX;
        const py = p.y * k + centerY;

        if (px < -100 || px > cssWidth + 100 || py < -100 || py > cssHeight + 100) continue;

        const fontSize = Math.max(12, p.size * k);
        const alpha = Math.min(1, (1 - p.z / cssWidth) * p.opacity);
        if (alpha <= 0) continue;

        const sprite = spriteForSize(fontSize);
        const scale = fontSize / sprite.fontSize;
        const drawWidth = sprite.canvas.width * scale;
        const drawHeight = sprite.canvas.height * scale;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(px, py);
        ctx.rotate(p.rotation);
        ctx.drawImage(
          sprite.canvas,
          -drawWidth / 2,
          -drawHeight / 2,
          drawWidth,
          drawHeight
        );
        ctx.restore();
      }
    };

    const animate = () => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.z -= p.speed;
        p.rotation += p.rotSpeed;
        if (p.z <= 1) resetParticle(p, cssWidth);
      }

      drawFrame();
      animationFrameId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !prefersReducedMotion) {
          cancelAnimationFrame(animationFrameId);
          animate();
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    if (prefersReducedMotion) {
      drawFrame();
    } else {
      animate();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden bg-[#0a0002]">
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #520511 0%, #1a0005 55%, #050001 100%)",
        }}
      />
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
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 h-full w-full pointer-events-none"
      />
    </div>
  );
}