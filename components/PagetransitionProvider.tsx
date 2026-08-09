"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

// ---------------------------------------------------------------------------
// Context Setup
// ---------------------------------------------------------------------------
interface PageTransitionContextValue {
  startTransition: (href: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error("usePageTransition must be used within <PageTransitionProvider>");
  }
  return ctx;
}

const NAV_SAFETY_TIMEOUT_MS = 2500;

// ---------------------------------------------------------------------------
// Shard geometry
// ---------------------------------------------------------------------------
interface ShardDef {
  clipPath: string;
  bg: string;
  border: string;
  z: number;
}

const VOID = "rgba(8, 4, 5, 0.95)"; // Opaque void base
const GLASS_RED = "rgba(160, 20, 30, 0.92)"; // Much more opaque red fill
const GLASS_RED_DEEP = "rgba(75, 10, 15, 0.96)"; // Dense deep red fill
const GLASS_RED_HOT = "rgba(190, 35, 45, 0.94)"; // Bright dense red fill
const BORDER_RED = "1px solid rgba(255, 90, 100, 0.35)";
const BORDER_DIM = "1px solid rgba(255, 255, 255, 0.1)";
const BG_GLOW =
  "radial-gradient(120% 90% at 50% 35%, rgba(100,8,15,1) 0%, rgba(35,2,5,1) 45%, rgba(5,1,2,1) 80%)";
const MARK_RED = "#e2515c";

const SHARDS: ShardDef[] = [
  { clipPath: "polygon(0% 0%, 38% 0%, 22% 30%, 0% 22%)", bg: GLASS_RED_HOT, border: BORDER_RED, z: 10 },
  { clipPath: "polygon(38% 0%, 68% 0%, 55% 24%, 22% 30%)", bg: VOID, border: BORDER_DIM, z: 9 },
  { clipPath: "polygon(68% 0%, 100% 0%, 100% 26%, 55% 24%)", bg: GLASS_RED_DEEP, border: BORDER_RED, z: 10 },
  { clipPath: "polygon(0% 22%, 22% 30%, 30% 55%, 0% 50%)", bg: VOID, border: BORDER_DIM, z: 8 },
  { clipPath: "polygon(22% 30%, 55% 24%, 62% 52%, 30% 55%)", bg: GLASS_RED_HOT, border: BORDER_RED, z: 12 },
  { clipPath: "polygon(55% 24%, 100% 26%, 100% 58%, 62% 52%)", bg: VOID, border: BORDER_DIM, z: 9 },
  { clipPath: "polygon(0% 50%, 30% 55%, 26% 80%, 0% 78%)", bg: GLASS_RED_DEEP, border: BORDER_RED, z: 8 },
  { clipPath: "polygon(30% 55%, 62% 52%, 60% 82%, 26% 80%)", bg: VOID, border: BORDER_DIM, z: 11 },
  { clipPath: "polygon(62% 52%, 100% 58%, 100% 84%, 60% 82%)", bg: GLASS_RED, border: BORDER_RED, z: 9 },
  { clipPath: "polygon(0% 78%, 26% 80%, 20% 100%, 0% 100%)", bg: VOID, border: BORDER_DIM, z: 8 },
  { clipPath: "polygon(26% 80%, 60% 82%, 52% 100%, 20% 100%)", bg: GLASS_RED_DEEP, border: BORDER_RED, z: 10 },
  { clipPath: "polygon(60% 82%, 100% 84%, 100% 100%, 52% 100%)", bg: VOID, border: BORDER_DIM, z: 9 },
];

interface MarkDef {
  top: string;
  left: string;
  size: string;
  rotate: number;
  faint?: boolean;
}

const QUESTION_MARKS: MarkDef[] = [
  { top: "14%", left: "18%", size: "clamp(3rem, 9vw, 7rem)", rotate: -12 },
  { top: "62%", left: "8%", size: "clamp(2rem, 5vw, 4rem)", rotate: 8, faint: true },
  { top: "22%", left: "72%", size: "clamp(2.5rem, 6vw, 5rem)", rotate: 15, faint: true },
  { top: "50%", left: "48%", size: "clamp(5rem, 14vw, 11rem)", rotate: -6 },
  { top: "78%", left: "68%", size: "clamp(2rem, 5vw, 4rem)", rotate: -18, faint: true },
  { top: "8%", left: "50%", size: "clamp(1.75rem, 4vw, 3rem)", rotate: 20, faint: true },
  { top: "6%", left: "82%", size: "clamp(2.25rem, 5.5vw, 4.5rem)", rotate: -20, faint: true },
  { top: "34%", left: "6%", size: "clamp(1.5rem, 3.5vw, 2.75rem)", rotate: 10, faint: true },
  { top: "40%", left: "88%", size: "clamp(2.5rem, 6vw, 5rem)", rotate: 22 },
  { top: "70%", left: "30%", size: "clamp(1.75rem, 4vw, 3.25rem)", rotate: -25, faint: true },
  { top: "88%", left: "16%", size: "clamp(2rem, 5vw, 4rem)", rotate: 14, faint: true },
  { top: "90%", left: "48%", size: "clamp(1.5rem, 3.5vw, 2.5rem)", rotate: -8, faint: true },
  { top: "92%", left: "84%", size: "clamp(2.25rem, 5.5vw, 4.5rem)", rotate: 18 },
  { top: "56%", left: "92%", size: "clamp(1.75rem, 4vw, 3rem)", rotate: -14, faint: true },
  { top: "4%", left: "34%", size: "clamp(1.5rem, 3.5vw, 2.5rem)", rotate: 26, faint: true },
  { top: "28%", left: "38%", size: "clamp(1.5rem, 3.5vw, 2.75rem)", rotate: -30, faint: true },
  { top: "18%", left: "94%", size: "clamp(1.5rem, 3.5vw, 2.5rem)", rotate: 12, faint: true },
  { top: "46%", left: "20%", size: "clamp(1.5rem, 3.5vw, 2.5rem)", rotate: -16, faint: true },
  { top: "60%", left: "58%", size: "clamp(1.75rem, 4vw, 3rem)", rotate: 9, faint: true },
  { top: "74%", left: "44%", size: "clamp(1.5rem, 3.5vw, 2.5rem)", rotate: -22, faint: true },
  { top: "82%", left: "94%", size: "clamp(1.75rem, 4vw, 3rem)", rotate: 16, faint: true },
  { top: "2%", left: "10%", size: "clamp(1.25rem, 3vw, 2.25rem)", rotate: -10, faint: true },
  { top: "96%", left: "62%", size: "clamp(1.5rem, 3.5vw, 2.5rem)", rotate: 20, faint: true },
  { top: "12%", left: "62%", size: "clamp(1.5rem, 3.5vw, 2.5rem)", rotate: -18, faint: true },
  { top: "36%", left: "56%", size: "clamp(1.25rem, 3vw, 2.25rem)", rotate: 24, faint: true },
  { top: "66%", left: "78%", size: "clamp(1.5rem, 3.5vw, 2.5rem)", rotate: -12, faint: true },
];

function randomVector(spread = 110) {
  const angle = Math.random() * Math.PI * 2;
  const dist = spread + Math.random() * spread;
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    rotate: (Math.random() - 0.5) * 400,
  };
}

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const flashRef = useRef<HTMLDivElement | null>(null);
  const shardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const markRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isCoveredStateRef = useRef(false);
  const safetyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ---- Snappy, Completely Opaque Formation to Immediate Break ----
  const playTransitionSequence = useCallback((onCompleteNavigation: () => void) => {
    const shards = shardRefs.current.filter(Boolean) as HTMLDivElement[];
    const marks = markRefs.current.filter(Boolean) as HTMLDivElement[];
    if (shards.length === 0) {
      onCompleteNavigation();
      return;
    }

    if (overlayRef.current) overlayRef.current.style.pointerEvents = "auto";

    const tl = gsap.timeline({
      onComplete: () => {
        if (overlayRef.current) overlayRef.current.style.pointerEvents = "none";
      },
    });

    // Solid full background fade-in immediately
    tl.to(backdropRef.current, { opacity: 1, duration: 0.06, ease: "power1.out" }, 0);

    shards.forEach((el, i) => {
      const { x, y, rotate } = randomVector();
      gsap.set(el, { xPercent: x, yPercent: y, rotate, opacity: 0, scale: 1.1 });
      tl.to(
        el,
        {
          xPercent: 0,
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          scale: 1,
          duration: 0.1,
          ease: "power2.out",
        },
        i * 0.002
      );
    });

    marks.forEach((el, i) => {
      gsap.set(el, { opacity: 0, scale: 0.5, rotate: (Math.random() - 0.5) * 40 });
      tl.to(
        el,
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.05,
          ease: "power1.out",
        },
        0.01 + i * 0.001
      );
    });

    // Sharp impact flash
    tl.to(flashRef.current, { opacity: 0.95, duration: 0.02, ease: "power1.in" }, "-=0.02")
      .to(flashRef.current, { opacity: 0, duration: 0.08, ease: "power2.out" });

    // Trigger router navigation instantly when fully opaque and filled
    tl.add(() => {
      onCompleteNavigation();
    });

    // Immediate shatter away
    tl.to(backdropRef.current, { opacity: 0, duration: 0.14, ease: "power1.in" }, "+=0.01");

    marks.forEach((el, i) => {
      tl.to(
        el,
        {
          opacity: 0,
          scale: 0.4,
          rotate: (Math.random() - 0.5) * 60,
          duration: 0.1,
          ease: "power2.in",
        },
        "<" + i * 0.002
      );
    });

    shards.forEach((el, i) => {
      const { x, y, rotate } = randomVector(140);
      tl.to(
        el,
        {
          xPercent: x,
          yPercent: y,
          rotate,
          opacity: 0,
          scale: 1.05,
          duration: 0.15,
          ease: "power2.in",
        },
        "<" + i * 0.002
      );
    });
  }, []);

  const startTransition = useCallback(
    (href: string) => {
      if (isCoveredStateRef.current) return;
      isCoveredStateRef.current = true;

      playTransitionSequence(() => {
        router.push(href);
      });

      safetyTimeoutRef.current = setTimeout(() => {
        if (isCoveredStateRef.current) {
          isCoveredStateRef.current = false;
          if (overlayRef.current) overlayRef.current.style.pointerEvents = "none";
        }
      }, NAV_SAFETY_TIMEOUT_MS);
    },
    [router, playTransitionSequence]
  );

  useEffect(() => {
    if (isCoveredStateRef.current) {
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
      isCoveredStateRef.current = false;
      if (overlayRef.current) overlayRef.current.style.pointerEvents = "none";
    }
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;

      if (anchor.hasAttribute("data-no-transition")) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (url.pathname === pathname && !url.search && !url.hash) return;

      e.preventDefault();
      startTransition(url.pathname + url.search + url.hash);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname, startTransition]);

  const contextValue = useMemo(() => ({ startTransition }), [startTransition]);

  return (
    <PageTransitionContext.Provider value={contextValue}>
      {children}

      {isMounted && (
        <div
          ref={overlayRef}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[999] overflow-hidden"
        >
          <div
            ref={backdropRef}
            className="absolute inset-0"
            style={{ background: BG_GLOW, opacity: 0, zIndex: 5 }}
          />

          {SHARDS.map((shard, i) => (
            <div
              key={i}
              ref={(el) => {
                shardRefs.current[i] = el;
              }}
              className="absolute inset-0 will-change-transform"
              style={{
                clipPath: shard.clipPath,
                background: shard.bg,
                border: shard.border,
                backdropFilter: "none",
                WebkitBackdropFilter: "none",
                zIndex: shard.z,
                opacity: 0,
                boxShadow:
                  "inset 0 0 20px rgba(255,255,255,0.05), 0 0 30px rgba(160,10,20,0.5)",
              }}
            />
          ))}

          {QUESTION_MARKS.map((mark, i) => (
            <div
              key={i}
              ref={(el) => {
                markRefs.current[i] = el;
              }}
              aria-hidden="true"
              className="absolute font-black select-none will-change-transform"
              style={{
                top: mark.top,
                left: mark.left,
                fontSize: mark.size,
                lineHeight: 1,
                transform: `rotate(${mark.rotate}deg)`,
                color: mark.faint ? "rgba(255,255,255,0.15)" : MARK_RED,
                textShadow: mark.faint
                  ? "none"
                  : "0 0 20px rgba(210,48,56,0.85), 0 0 48px rgba(160,10,20,0.6)",
                zIndex: 15,
                opacity: 0,
                fontFamily:
                  "ui-sans-serif, system-ui, 'Arial Black', sans-serif",
              }}
            >
              ?
            </div>
          ))}

          <div
            ref={flashRef}
            className="absolute inset-0"
            style={{
              opacity: 0,
              zIndex: 20,
              mixBlendMode: "screen",
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(200,40,50,0.6) 45%, rgba(20,2,4,0) 100%)",
            }}
          />
        </div>
      )}
    </PageTransitionContext.Provider>
  );
}