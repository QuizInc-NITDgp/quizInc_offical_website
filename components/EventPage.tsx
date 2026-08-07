"use client";

import { useRef, useEffect } from "react";
import { formatEventDateRange } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function EventsAnimations({ events }: { events: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ---------- HERO INTRO ----------
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".header-badge", { scale: 0, opacity: 0, duration: 1, rotation: -25, ease: "back.out(3)" })
        .from(
          ".header-title .char",
          {
            y: 120,
            opacity: 0,
            rotateX: -90,
            duration: 1,
            stagger: 0.03,
            ease: "back.out(2)",
          },
          "-=0.6"
        )
        .from(".header-subtitle", { letterSpacing: "1em", opacity: 0, duration: 1.2 }, "-=0.7")
        .from(".header-glow", { scale: 0, opacity: 0, duration: 1.5, ease: "power2.out" }, "-=1.2");

      // continuous idle pulse on the glow
      gsap.to(".header-glow", {
        scale: 1.15,
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // ---------- BACKGROUND ORBS PARALLAX ----------
      gsap.utils.toArray<HTMLElement>(".bg-orb").forEach((orb, i) => {
        gsap.to(orb, {
          y: () => (i % 2 === 0 ? -200 : 200),
          x: () => (i % 2 === 0 ? 100 : -100),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });
      });

      // ---------- EVENT SECTIONS ----------
      const sections = gsap.utils.toArray<HTMLElement>(".event-section");

      sections.forEach((section, index) => {
        const poster = section.querySelector(".event-poster");
        const posterWrap = section.querySelector(".event-poster-wrap");
        const badge = section.querySelector(".event-badge");
        const title = section.querySelector(".event-title");
        const desc = section.querySelector(".event-desc");
        const btn = section.querySelector(".event-btn");
        const bigIndex = section.querySelector(".event-index");
        const isEven = index % 2 === 0;

        // Lock in starting transforms instantly — opacity is already 0 via CSS class,
        // so there is zero flash-of-visible-content before ScrollTrigger takes over.
        gsap.set(poster, {
          scale: 0.7,
          rotationY: isEven ? -60 : 60,
          rotationZ: isEven ? -8 : 8,
          x: isEven ? -140 : 140,
        });
        gsap.set(badge, { x: isEven ? 60 : -60, scale: 0.6 });
        gsap.set(title, { x: isEven ? 100 : -100, filter: "blur(12px)" });
        gsap.set(desc, { y: 30 });
        if (btn) gsap.set(btn, { y: 20, scale: 0.8 });
        if (bigIndex) gsap.set(bigIndex, { x: isEven ? -60 : 60, scale: 0.8 });

        // Poster: dramatic 3D reveal
        gsap.to(poster, {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          rotationZ: 0,
          x: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%", end: "top 35%", scrub: 1 },
        });

        // Giant faded index number drifts in behind the section
        if (bigIndex) {
          gsap.to(bigIndex, {
            opacity: 0.06,
            x: 0,
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 85%", end: "top 40%", scrub: 1 },
          });
        }

        // Details: staggered cascade instead of one flat block
        const detailTl = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 78%", end: "top 35%", scrub: 1 },
        });
        
        detailTl
          .to(badge, { opacity: 1, x: 0, scale: 1, duration: 0.4 })
          .to(title, { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.6 }, "-=0.2")
          .to(desc, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");

        if (btn) {
          detailTl.to(btn, { opacity: 1, y: 0, scale: 1, duration: 0.4 }, "-=0.2");
        }

        // idle float on the poster wrap so it never sits dead still
        if (posterWrap) {
          gsap.to(posterWrap, {
            y: -14,
            duration: 2.4 + index * 0.15,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      });
    },
    { scope: containerRef }
  );

  // ---------- CURSOR TILT + SHINE ON POSTERS, MAGNETIC BUTTONS ----------
  useEffect(() => {
    const posters = Array.from(document.querySelectorAll<HTMLElement>(".event-poster"));
    const cleanups: Array<() => void> = [];

    posters.forEach((poster) => {
      const rotateX = gsap.quickTo(poster, "rotationX", { duration: 0.5, ease: "power3.out" });
      const rotateY = gsap.quickTo(poster, "rotationY", { duration: 0.5, ease: "power3.out" });
      const shine = poster.querySelector<HTMLElement>(".poster-shine");

      const handleMove = (e: MouseEvent) => {
        const rect = poster.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        rotateY(px * 24 - 12);
        rotateX(-(py * 24 - 12));
        if (shine) {
          gsap.to(shine, { x: `${px * 100}%`, y: `${py * 100}%`, opacity: 0.5, duration: 0.3 });
        }
      };

      const handleLeave = () => {
        rotateX(0);
        rotateY(0);
        if (shine) gsap.to(shine, { opacity: 0, duration: 0.4 });
      };

      poster.addEventListener("mousemove", handleMove);
      poster.addEventListener("mouseleave", handleLeave);
      cleanups.push(() => {
        poster.removeEventListener("mousemove", handleMove);
        poster.removeEventListener("mouseleave", handleLeave);
      });
    });

    const buttons = Array.from(document.querySelectorAll<HTMLElement>(".event-btn"));
    buttons.forEach((btn) => {
      const moveX = gsap.quickTo(btn, "x", { duration: 0.3, ease: "power3.out" });
      const moveY = gsap.quickTo(btn, "y", { duration: 0.3, ease: "power3.out" });

      const handleMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        moveX((e.clientX - rect.left - rect.width / 2) * 0.35);
        moveY((e.clientY - rect.top - rect.height / 2) * 0.35);
      };
      const handleLeave = () => {
        moveX(0);
        moveY(0);
      };

      btn.addEventListener("mousemove", handleMove);
      btn.addEventListener("mouseleave", handleLeave);
      cleanups.push(() => {
        btn.removeEventListener("mousemove", handleMove);
        btn.removeEventListener("mouseleave", handleLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [events]);

  return (
    <div ref={containerRef} className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-8 overflow-hidden">
      {/* floating background glow orbs */}
      <div className="bg-orb pointer-events-none absolute -top-20 -left-32 w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[120px]" />
      <div className="bg-orb pointer-events-none absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-rose-500/10 blur-[140px]" />
      <div className="bg-orb pointer-events-none absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-[100px]" />

      <div className="relative flex flex-col items-center overflow-hidden py-4">
        <div className="header-glow pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-red-500/20 blur-[100px] -z-10" />

        <span className="header-badge inline-block px-5 py-2 mb-4 text-xs font-bold uppercase tracking-[0.3em] text-red-400 bg-red-950/40 border border-red-500/30 rounded-full shadow-[0_0_20px_rgba(255,30,67,0.2)] backdrop-blur-md font-space">
          The Chronicle Archive
        </span>

        <h1 className="header-title flex flex-wrap justify-center [perspective:800px] text-5xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl drop-shadow-[0_0_40px_rgba(255,30,67,0.4)] font-bungee">
          {"The Quizzing ".split("").map((c, i) => (
            <span key={`t1-${i}`} className="char inline-block [transform-style:preserve-3d]">
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-orange-500">
            {"Chronicle".split("").map((c, i) => (
              <span key={`t2-${i}`} className="char inline-block [transform-style:preserve-3d]">
                {c}
              </span>
            ))}
          </span>
        </h1>

        <p className="header-subtitle mt-4 text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-gray-400 drop-shadow-[0_0_15px_rgba(255,30,67,0.3)] font-space">
          Every Event, Every Buzz, Every Win
        </p>
      </div>

      {events.length === 0 && (
        <div className="mt-28 p-12 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl max-w-md mx-auto shadow-2xl">
          <p className="text-gray-400 text-base font-medium font-space">
            No events found at the moment. Check back soon for upcoming action.
          </p>
        </div>
      )}

      <div className="relative mt-32 md:mt-44 flex flex-col gap-36 md:gap-52">
        {events.map((event, index) => {
          const imageOnLeft = index % 2 === 0;

          return (
            <section
              key={event.id}
              className="event-section group relative grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start text-left w-full"
            >
              {/* giant faded index number — opacity-0 by default, revealed only on scroll */}
              <span
                className={`event-index opacity-0 pointer-events-none absolute -top-10 ${
                  imageOnLeft ? "left-0 md:-left-6" : "right-0 md:-right-6"
                } text-[10rem] md:text-[14rem] font-black text-white select-none leading-none -z-10 font-bungee`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl blur-3xl" />

              {/* POSTER — narrower, sticky, capped width so it never fights the description column */}
              <div
                className={`event-poster-wrap flex w-full md:col-span-4 md:sticky md:top-28 ${
                  imageOnLeft ? "md:order-1 md:justify-end" : "md:order-2 md:justify-start"
                } justify-center [perspective:1200px]`}
              >
                <div className="event-poster opacity-0 relative group/poster w-full max-w-[260px] sm:max-w-[300px] aspect-[9/16] rounded-2xl overflow-hidden border border-red-500/40 shadow-[0_0_60px_rgba(255,30,67,0.35)] bg-gradient-to-b from-red-950/40 via-zinc-900/90 to-black backdrop-blur-xl p-2.5 [transform-style:preserve-3d] will-change-transform">
                  {/* rotating conic gradient ring */}
                  <div className="absolute -inset-[2px] -z-10 rounded-2xl opacity-60 blur-sm animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,rgba(255,30,67,0.8),transparent_30%,transparent_70%,rgba(255,120,60,0.8))]" />

                  <div className="relative w-full h-full rounded-xl overflow-hidden border border-red-500/20">
                    {event.poster ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={event.poster}
                        alt={event.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/poster:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs uppercase tracking-widest text-center px-6 font-space">
                        No poster available
                      </div>
                    )}
                    {/* cursor-follow shine */}
                    <div className="poster-shine pointer-events-none absolute w-40 h-40 rounded-full bg-white/30 blur-2xl opacity-0 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* DESCRIPTION — wider column, all inner pieces start hidden and cascade in on scroll */}
              <div
                className={`event-details flex flex-col md:col-span-8 ${
                  imageOnLeft ? "md:order-2" : "md:order-1"
                } px-2 sm:px-0`}
              >
                <span className="event-badge opacity-0 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-red-400 bg-red-500/10 border border-red-500/25 w-fit shadow-[0_0_15px_rgba(255,30,67,0.15)] font-space">
                  <span className={`w-2 h-2 rounded-full ${event.mode === "online" ? "bg-emerald-400 animate-pulse" : "bg-red-500"}`} />
                  {event.mode === "online" ? "Online Event" : "Offline Event"}
                </span>

                <h2 className="event-title opacity-0 mt-5 text-4xl sm:text-5xl md:text-6xl font-[800] tracking-tight text-white drop-shadow-[0_0_25px_rgba(255,30,67,0.3)] transition-colors duration-300 group-hover:text-red-100 font-[family-name:var(--font-baloo)]">
                  {event.name}
                </h2>

                <p className="mt-3 text-base sm:text-lg text-red-400/90 tracking-wide font-bold font-[family-name:var(--font-space)]">
                  {formatEventDateRange(event.dateFrom, event.dateTo)}
                </p>

                <p className="event-desc opacity-0 mt-6 text-base sm:text-lg text-gray-300/90 leading-relaxed font-normal tracking-wide whitespace-pre-line font-[family-name:var(--font-space)]">
                  {event.description}
                </p>

                {event.link && (
                  <div className="mt-10">
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="event-btn opacity-0 group/btn relative inline-flex items-center gap-3 rounded-xl border border-red-500/40 bg-gradient-to-r from-red-500/10 to-rose-500/10 px-8 py-4 text-sm font-bold uppercase tracking-wider text-red-400 shadow-[0_0_20px_rgba(255,30,67,0.15)] transition-colors duration-300 hover:border-red-500 hover:bg-red-500/20 hover:text-white hover:shadow-[0_0_35px_rgba(255,30,67,0.5)] font-[family-name:var(--font-space)]"
                    >
                      <span>Visit Website</span>
                      <span className="transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true">
                        →
                      </span>
                    </a>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}