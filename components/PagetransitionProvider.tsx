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
// Shard geometry — the old page cracks into these 12 jagged glass pieces.
// ---------------------------------------------------------------------------
interface ShardDef {
  clipPath: string;
  bg: string;
  border: string;
  z: number;
}

const VOID = "rgba(8, 4, 5, 0.95)";
const GLASS_RED = "rgba(160, 20, 30, 0.92)";
const GLASS_RED_DEEP = "rgba(75, 10, 15, 0.96)";
const GLASS_RED_HOT = "rgba(190, 35, 45, 0.94)";
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

// Random offscreen vector so the break direction is different every time.
function randomVector(spread = 130) {
  const angle = Math.random() * Math.PI * 2;
  const dist = spread + Math.random() * spread;
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    rotate: (Math.random() - 0.5) * 480,
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
  const shardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const markRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isCoveredStateRef = useRef(false);
  const safetyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTlRef = useRef<gsap.core.Timeline | null>(null);

  // Keep the fully-broken screen visibly alive with a slow pulse while
  // waiting on navigation to actually finish, so a slow route load never
  // reads as a frozen frame.
  const startIdlePulse = useCallback(() => {
    const marks = markRefs.current.filter(Boolean) as HTMLDivElement[];
    idleTlRef.current?.kill();
    idleTlRef.current = gsap
      .timeline({ repeat: -1, yoyo: true })
      .to(backdropRef.current, { opacity: 0.82, duration: 0.9, ease: "sine.inOut" }, 0)
      .to(marks, { scale: 1.05, duration: 1.1, ease: "sine.inOut", stagger: 0.01 }, 0);
  }, []);

  const stopIdlePulse = useCallback(() => {
    idleTlRef.current?.kill();
    idleTlRef.current = null;
  }, []);

  // ---- Break: the page cracks — shards fly in from random directions
  // and slam together, sealing the old page under broken glass ----
  const playBreak = useCallback(() => {
    return new Promise<void>((resolve) => {
      const shards = shardRefs.current.filter(Boolean) as HTMLDivElement[];
      const marks = markRefs.current.filter(Boolean) as HTMLDivElement[];
      if (shards.length === 0) {
        resolve();
        return;
      }

      if (overlayRef.current) overlayRef.current.style.pointerEvents = "auto";

      const tl = gsap.timeline({ onComplete: resolve });

      tl.to(backdropRef.current, { opacity: 1, duration: 0.08, ease: "power1.out" }, 0);

      shards.forEach((el, i) => {
        const { x, y, rotate } = randomVector();
        gsap.set(el, { xPercent: x, yPercent: y, rotate, opacity: 0, scale: 1.12 });
        tl.to(
          el,
          {
            xPercent: 0,
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            scale: 1,
            duration: 0.16,
            ease: "power3.out",
          },
          i * 0.006 // near-simultaneous — reads as a single crack, not a queue
        );
      });

      // A hard, brief shake right as the crack completes
      tl.to(
        overlayRef.current,
        {
          keyframes: [
            { x: -6, y: 3 },
            { x: 5, y: -4 },
            { x: 0, y: 0 },
          ],
          duration: 0.1,
          ease: "power2.out",
        },
        "-=0.08"
      );

      marks.forEach((el) => {
        gsap.set(el, { opacity: 0, scale: 0.4, rotate: (Math.random() - 0.5) * 60 });
        tl.to(
          el,
          { opacity: 1, scale: 1, rotate: 0, duration: 0.08, ease: "back.out(3)" },
          0.01
        );
      });
    });
  }, []);

  // ---- Form: the shards blast apart along fresh random vectors,
  // letting the new page show through the widening cracks ----
  const playForm = useCallback(() => {
    stopIdlePulse();

    const shards = shardRefs.current.filter(Boolean) as HTMLDivElement[];
    const marks = markRefs.current.filter(Boolean) as HTMLDivElement[];
    if (shards.length === 0) return;

    const tl = gsap.timeline({
      onComplete: () => {
        if (overlayRef.current) overlayRef.current.style.pointerEvents = "none";
      },
    });

    tl.to(backdropRef.current, { opacity: 0, duration: 0.16, ease: "power1.in" }, 0.01);

    marks.forEach((el, i) => {
      tl.to(
        el,
        {
          opacity: 0,
          scale: 0.4,
          rotate: (Math.random() - 0.5) * 90,
          duration: 0.1,
          ease: "power2.in",
        },
        i * 0.004
      );
    });

    shards.forEach((el, i) => {
      const { x, y, rotate } = randomVector(160);
      tl.to(
        el,
        {
          xPercent: x,
          yPercent: y,
          rotate,
          opacity: 0,
          scale: 1.05,
          duration: 0.18,
          ease: "power3.in",
        },
        0.005 + i * 0.004
      );
    });
  }, [stopIdlePulse]);

  const startTransition = useCallback(
    async (href: string) => {
      if (isCoveredStateRef.current) return;
      isCoveredStateRef.current = true;

      await playBreak();
      startIdlePulse();
      router.push(href);

      safetyTimeoutRef.current = setTimeout(() => {
        if (isCoveredStateRef.current) {
          isCoveredStateRef.current = false;
          playForm();
        }
      }, NAV_SAFETY_TIMEOUT_MS);
    },
    [router, playBreak, playForm, startIdlePulse]
  );

  // Once the route has actually changed, let the new page form.
  useEffect(() => {
    if (isCoveredStateRef.current) {
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
      isCoveredStateRef.current = false;
      playForm();
    }
  }, [pathname, playForm]);

  // Intercept same-origin link clicks to drive the transition.
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
        </div>
      )}
    </PageTransitionContext.Provider>
  );
}