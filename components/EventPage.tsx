"use client";

import { useRef } from "react";
import { formatEventDateRange } from "@/lib/utils";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

export function EventsAnimations({ events }: { events: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const scrollToFirstEvent = () => {
    const firstSection = document.getElementById("event-section-0");
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-8 overflow-hidden">
      {/* Background Parallax Glow Orbs */}
      <motion.div style={{ y: orbY1 }} className="pointer-events-none absolute -top-20 -left-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-red-600/10 blur-[90px]" />
      <motion.div style={{ y: orbY2 }} className="pointer-events-none absolute top-1/3 -right-32 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-rose-500/10 blur-[100px]" />
      <motion.div style={{ y: orbY1 }} className="pointer-events-none absolute bottom-0 left-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full bg-orange-500/10 blur-[80px]" />

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center min-h-[80vh] overflow-hidden py-16">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.12, opacity: [0.4, 0.6, 0.4] }}
          transition={{
            scale: { duration: 1, ease: "easeOut" },
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[700px] h-[200px] sm:h-[300px] rounded-full bg-red-500/15 blur-[70px] sm:blur-[90px] -z-10"
        />

        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-block px-4 sm:px-5 py-2 mb-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-red-400 bg-red-950/40 border border-red-500/30 rounded-full shadow-[0_0_15px_rgba(255,30,67,0.15)] backdrop-blur-md font-space"
        >
          The Chronicle Archive
        </motion.span>

        {/* Single Line Heading using font-baloo style matching AboutSection */}
        <div className="flex flex-col items-center text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.02 } },
            }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,30,67,0.25)] font-baloo whitespace-nowrap flex flex-wrap justify-center items-center gap-x-3"
          >
            <span>
              {"The Quizzing".split("").map((c, i) => (
                <motion.span
                  key={`t1-${i}`}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
                  }}
                  className="inline-block text-white"
                >
                  {c === " " ? "\u00A0" : c}
                </motion.span>
              ))}
            </span>
            <span className="text-red-500">
              {"Chronicle".split("").map((c, i) => (
                <motion.span
                  key={`t2-${i}`}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
                  }}
                  className="inline-block"
                >
                  {c}
                </motion.span>
              ))}
            </span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-5 text-[10px] sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-400 drop-shadow-[0_0_10px_rgba(255,30,67,0.2)] text-center font-space"
        >
          Every Event, Every Buzz, Every Win
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          onClick={scrollToFirstEvent}
          className="mt-12 flex flex-col items-center gap-2 cursor-pointer group"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-red-400/80 font-space font-bold transition-colors group-hover:text-red-300">
            Scroll To Explore
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-red-500/30 flex items-start justify-center p-1 group-hover:border-red-500/60 transition-colors">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1.5 h-2.5 bg-red-500 rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {events.length === 0 && (
        <div className="mt-16 p-8 sm:p-12 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl max-w-md mx-auto shadow-2xl text-center">
          <p className="text-gray-400 text-sm sm:text-base font-medium font-space">
            No events found at the moment. Check back soon for upcoming action.
          </p>
        </div>
      )}

      {/* Events List */}
      <div className="relative mt-16 sm:mt-24 md:mt-32 flex flex-col gap-24 sm:gap-32 md:gap-44">
        {events.map((event, index) => {
          const imageOnLeft = index % 2 === 0;

          return (
            <motion.section
              key={event.id}
              id={`event-section-${index}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center text-left w-full"
            >
              {/* 1. POSTER */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 40 },
                  visible: { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0, 
                    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } 
                  },
                }}
                className={`flex w-full md:col-span-5 md:sticky md:top-28 ${imageOnLeft ? "md:order-1 md:justify-end" : "md:order-2 md:justify-start"
                  } justify-center`}
              >
                <TiltPoster event={event} />
              </motion.div>

              {/* 2. CONTENT */}
              <motion.div
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
                className={`flex flex-col md:col-span-7 ${imageOnLeft ? "md:order-2" : "md:order-1"
                  } px-2 sm:px-0`}
              >
                {/* Badge */}
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
                  }}
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-red-400 bg-red-500/10 border border-red-500/25 w-fit shadow-[0_0_12px_rgba(255,30,67,0.1)] font-space"
                >
                  <span className={`w-2 h-2 rounded-full ${event.mode === "online" ? "bg-emerald-400 animate-pulse" : "bg-red-500"}`} />
                  {event.mode === "online" ? "Online Event" : "Offline Event"}
                </motion.span>

                {/* Title */}
                <motion.h2
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
                  }}
                  className="mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-5xl font-[800] tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,30,67,0.25)] transition-colors duration-300 group-hover:text-red-100 font-baloo"
                >
                  {event.name}
                </motion.h2>

                {/* Date */}
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
                  }}
                  className="mt-2 sm:mt-3 text-sm sm:text-lg text-red-400/90 tracking-wide font-bold font-space"
                >
                  {formatEventDateRange(event.dateFrom, event.dateTo)}
                </motion.p>

                {/* Description */}
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
                  }}
                  className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-300/90 leading-relaxed font-normal tracking-wide whitespace-pre-line font-baloo"
                >
                  {event.description}
                </motion.p>

                {/* Button */}
                {event.link && (
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
                    }}
                    className="mt-6 sm:mt-10"
                  >
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative inline-flex items-center gap-3 rounded-xl border border-red-500/40 bg-gradient-to-r from-red-500/10 to-rose-500/10 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-red-400 shadow-[0_0_15px_rgba(255,30,67,0.1)] transition-all duration-300 hover:border-red-500 hover:bg-red-500/20 hover:text-white hover:shadow-[0_0_25px_rgba(255,30,67,0.4)] font-space"
                    >
                      <span>Visit Website</span>
                      <span className="transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true">
                        →
                      </span>
                    </motion.a>
                  </motion.div>
                )}
              </motion.div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}

// 3D Tilt Poster Component
function TiltPoster({ event }: { event: any }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [12, -12]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-12, 12]), { damping: 20, stiffness: 200 });

  const shineX = useTransform(x, [-100, 100], ["0%", "100%"]);
  const shineY = useTransform(y, [-100, 100], ["0%", "100%"]);
  const shineOpacity = useTransform(x, [-100, 0, 100], [0.3, 0, 0.3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX - width / 2);
    y.set(mouseY - height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group/poster w-full max-w-[260px] sm:max-w-[320px] md:max-w-[380px] aspect-[4/5] rounded-2xl overflow-hidden border border-red-500/40 shadow-[0_0_30px_rgba(255,30,67,0.2)] bg-gradient-to-b from-red-950/40 via-zinc-900/90 to-black backdrop-blur-xl p-2.5 will-change-transform cursor-pointer"
    >
      <div className="absolute -inset-[2px] -z-10 rounded-2xl opacity-50 blur-sm animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,rgba(255,30,67,0.7),transparent_30%,transparent_70%,rgba(255,120,60,0.7))]" />

      <div className="relative w-full h-full rounded-xl overflow-hidden border border-red-500/20 bg-zinc-950">
        {event.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.poster}
            alt={event.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/poster:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs uppercase tracking-widest text-center px-6 font-space">
            No poster available
          </div>
        )}
        <motion.div
          style={{ x: shineX, y: shineY, opacity: shineOpacity }}
          className="pointer-events-none absolute w-40 h-40 rounded-full bg-white/25 blur-xl -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </motion.div>
  );
}