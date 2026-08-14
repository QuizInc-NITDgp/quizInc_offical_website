// components/CustomCursor.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  vx: number;
  vy: number;
}

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const prevMouseRef = useRef({ x: -100, y: -100 });
  const currentPosRef = useRef({ x: -100, y: -100 });
  const speedRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      setMousePosition({ x, y });
      currentPosRef.current = { x, y };

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive =
          target.closest("button, a, input, [role='button']") !== null;
        setIsPointer(isInteractive);
      }

      // Movement velocity
      const dx = x - prevMouseRef.current.x;
      const dy = y - prevMouseRef.current.y;
      const distance = Math.hypot(dx, dy);
      speedRef.current = distance;

      // SAME QUANTITY: Up to 10 particles spawned per movement step
      if (distance > 1.5) {
        const particleCount = Math.min(Math.floor(distance / 1.5), 10);
        for (let i = 0; i < particleCount; i++) {
          particlesRef.current.push({
            x: x + (Math.random() - 0.5) * 12,
            y: y + (Math.random() - 0.5) * 12,
            size: Math.random() * 3.5 + 1.5, // Slightly refined size
            alpha: 0.5, // REDUCED INITIAL GLOW (0.5 instead of 1.0)
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2,
          });
        }
      }
      prevMouseRef.current = { x, y };
    };

    const handleMouseDown = () => setIsHovered(true);
    const handleMouseUp = () => setIsHovered(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let frameCounter = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCounter++;

      speedRef.current *= 0.85;

      // Minimal static particles
      if (frameCounter % 12 === 0 && currentPosRef.current.x > 0 && speedRef.current < 0.5) {
        const { x, y } = currentPosRef.current;
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          size: Math.random() * 1.5 + 1,
          alpha: 0.2,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
        });
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.018; // Smooth fading
        p.size *= 0.96;

        if (p.alpha <= 0 || p.size <= 0.2) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;

        // REDUCED SHADOW BLUR (Tighter, cleaner white points)
        ctx.shadowColor = "rgba(255, 255, 255, 0.6)";
        ctx.shadowBlur = 4;

        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Canvas for White Motion Particle Trail */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9997] hidden md:block"
      />

      {/* Subdued Static Core Glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden h-5 w-5 rounded-full bg-white/10 blur-[2px] md:block"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHovered ? 1.2 : isPointer ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />

      {/* Inner Red Dot (20px) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-5 w-5 rounded-full bg-red-500 shadow-[0_0_12px_#ef4444] md:block"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHovered ? 0.7 : isPointer ? 1.4 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 40 }}
      />

      {/* Outer Glowing Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden rounded-full border border-white/30 bg-red-600/10 md:block"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          width: 48,
          height: 48,
          scale: isHovered ? 1.3 : isPointer ? 1.6 : 1,
          borderColor: isPointer
            ? "rgba(239, 68, 68, 0.9)"
            : "rgba(255, 255, 255, 0.35)",
          boxShadow: isPointer
            ? "0 0 20px rgba(239, 68, 68, 0.7)"
            : "0 0 6px rgba(255, 255, 255, 0.15)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />
    </>
  );
}