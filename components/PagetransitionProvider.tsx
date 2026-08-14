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

// Grid configuration for the pixel transition
const GRID_ROWS = 8;
const GRID_COLS = 12;
const TOTAL_PIXELS = GRID_ROWS * GRID_COLS;

// Matched Palette: Sampled from QuizInc background gradient & glowing elements
const PIXEL_COLORS = [
  "rgb(10, 0, 2)",     // Darkest background corner (#0a0002)
  "rgb(26, 0, 5)",     // Deep void red (#1a0005)
  "rgb(50, 4, 12)",    // Ambient dark crimson (#32040c)
  "rgb(82, 5, 17)",    // Mid-radial glow crimson (#520511)
  "rgb(140, 10, 30)",   // Deep ruby highlight
  "rgb(204, 0, 41)",   // Vibrant aurora red (#cc0029)
  "rgb(255, 30, 67)",  // Neon QuizInc logo/glow accent (#ff1e43)
];

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
  const pixelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isCoveredStateRef = useRef(false);
  const safetyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTlRef = useRef<gsap.core.Timeline | null>(null);

  // Pre-generate static color assignment and grid positions for pixels
  const pixelGrid = useMemo(() => {
    return Array.from({ length: TOTAL_PIXELS }).map(() => {
      const bg = PIXEL_COLORS[Math.floor(Math.random() * PIXEL_COLORS.length)];
      return { bg };
    });
  }, []);

  // Keeps the pixels pulsing faintly while waiting on slow route changes
  const startIdlePulse = useCallback(() => {
    const pixels = pixelRefs.current.filter(Boolean) as HTMLDivElement[];
    idleTlRef.current?.kill();
    idleTlRef.current = gsap
      .timeline({ repeat: -1, yoyo: true })
      .to(pixels, {
        opacity: 0.85,
        duration: 0.6,
        stagger: {
          amount: 0.4,
          from: "random",
        },
        ease: "sine.inOut",
      });
  }, []);

  const stopIdlePulse = useCallback(() => {
    idleTlRef.current?.kill();
    idleTlRef.current = null;
  }, []);

  // ---- Cover: Pixels scale in with a grid-stagger wave ----
  const playCover = useCallback(() => {
    return new Promise<void>((resolve) => {
      const pixels = pixelRefs.current.filter(Boolean) as HTMLDivElement[];
      if (pixels.length === 0) {
        resolve();
        return;
      }

      if (overlayRef.current) overlayRef.current.style.pointerEvents = "auto";

      gsap.set(pixels, { scale: 0, opacity: 0 });

      gsap.to(pixels, {
        scale: 1.02, // Slight overlap to prevent sub-pixel gaps
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
        stagger: {
          grid: [GRID_ROWS, GRID_COLS],
          from: "random",
          amount: 0.25,
        },
        onComplete: resolve,
      });
    });
  }, []);

  // ---- Reveal: Pixels dissolve and shrink away to show the new page ----
  const playReveal = useCallback(() => {
    stopIdlePulse();

    const pixels = pixelRefs.current.filter(Boolean) as HTMLDivElement[];
    if (pixels.length === 0) return;

    gsap.to(pixels, {
      scale: 0,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
      stagger: {
        grid: [GRID_ROWS, GRID_COLS],
        from: "center",
        amount: 0.25,
      },
      onComplete: () => {
        if (overlayRef.current) overlayRef.current.style.pointerEvents = "none";
      },
    });
  }, [stopIdlePulse]);

  const startTransition = useCallback(
    async (href: string) => {
      if (isCoveredStateRef.current) return;
      isCoveredStateRef.current = true;

      await playCover();
      startIdlePulse();
      router.push(href);

      safetyTimeoutRef.current = setTimeout(() => {
        if (isCoveredStateRef.current) {
          isCoveredStateRef.current = false;
          playReveal();
        }
      }, NAV_SAFETY_TIMEOUT_MS);
    },
    [router, playCover, playReveal, startIdlePulse]
  );

  // Once the route changes, complete the transition
  useEffect(() => {
    if (isCoveredStateRef.current) {
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
      isCoveredStateRef.current = false;
      playReveal();
    }
  }, [pathname, playReveal]);

  // Intercept standard link clicks
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
          className="pointer-events-none fixed inset-0 z-[999] grid overflow-hidden"
          style={{
            gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
            gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
          }}
        >
          {pixelGrid.map((pixel, i) => (
            <div
              key={i}
              ref={(el) => {
                pixelRefs.current[i] = el;
              }}
              className="will-change-transform"
              style={{
                backgroundColor: pixel.bg,
                opacity: 0,
                transform: "scale(0)",
              }}
            />
          ))}
        </div>
      )}
    </PageTransitionContext.Provider>
  );
}