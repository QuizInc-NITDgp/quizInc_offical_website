"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatEventDateRange } from "@/lib/utils";
import type { EventItem } from "@/lib/events";

export default function QuizzitchEvents({ events = [] }: { events?: EventItem[] }) {
  const [selected, setSelected] = useState<EventItem | null>(null);

  return (
    <div className="relative z-10 w-full py-16 px-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-12 sm:mb-16"
      >
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-[800] text-white font-baloo tracking-tight drop-shadow-[0_4px_25px_rgba(255,30,67,0.3)]">
          Events so far in
        </h3>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-[800] text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 font-baloo tracking-tight drop-shadow-[0_0_30px_rgba(255,30,67,0.6)] mt-2">
          Quizzitch Cup
        </h3>
      </motion.div>

      {events.length === 0 ? (
        <div className="p-8 sm:p-12 rounded-3xl border border-red-500/20 bg-gradient-to-b from-white/[0.04] to-black/60 backdrop-blur-2xl max-w-md mx-auto shadow-[0_0_50px_rgba(0,0,0,0.8)] text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-red-600/5 blur-3xl pointer-events-none" />
          <p className="text-gray-300/80 text-sm sm:text-base font-medium font-space tracking-wide">
            Schedule drops soon. Check back for the full lineup.
          </p>
        </div>
      ) : (
        <AutoEventCardRail events={events} onSelect={setSelected} />
      )}

      <EventDetailsOverlay event={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// TWO-ROW CONTINUOUS MARQUEE
// ---------------------------------------------------------------------------

function AutoEventCardRail({
  events,
  onSelect,
}: {
  events: EventItem[];
  onSelect: (event: EventItem) => void;
}) {
  const mid = Math.ceil(events.length / 2);
  const rowTop = events.slice(0, mid);
  const rowBottom = events.slice(mid).length ? events.slice(mid) : events.slice(0, mid);

  return (
    <div className="w-full relative flex flex-col gap-8 sm:gap-10">
      <style jsx global>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>

      <MarqueeRow events={rowTop} onSelect={onSelect} direction="left" />
      <MarqueeRow events={rowBottom} onSelect={onSelect} direction="right" />
    </div>
  );
}

function MarqueeRow({
  events,
  onSelect,
  direction,
}: {
  events: EventItem[];
  onSelect: (event: EventItem) => void;
  direction: "left" | "right";
}) {
  const doubled = [...events, ...events];
  const animName = direction === "left" ? "marquee-left" : "marquee-right";
  const duration = Math.max(events.length * 6, 22);

  return (
    <div className="w-full overflow-hidden group/row py-2">
      <div
        className="flex gap-8 w-max group-hover/row:[animation-play-state:paused]"
        style={{ animation: `${animName} ${duration}s linear infinite` }}
      >
        {doubled.map((event, i) => (
          <div
            key={`${event.id}-${i}`}
            className="shrink-0 w-[26vw] max-w-[320px] min-w-[280px] max-lg:w-[45vw] max-sm:w-[80vw]"
          >
            <EventCard event={event} index={i % events.length} onClick={() => onSelect(event)} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// EVENT CARD — Upgraded Border & Breathing Space
// ---------------------------------------------------------------------------

function EventCard({
  event,
  index,
  onClick,
}: {
  event: EventItem;
  index: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group/card relative w-full aspect-[4/5] rounded-3xl overflow-hidden text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 shadow-2xl bg-transparent p-[2px]"
    >
      {/* Ambient background breathing glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.06, 1] }}
        transition={{ duration: 4 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -inset-4 -z-20 rounded-[36px] bg-gradient-to-r from-red-600/30 via-rose-600/20 to-orange-600/30 blur-3xl"
      />

      {/* Stunning animated gradient border frame */}
      <div className="absolute inset-0 -z-10 rounded-3xl opacity-90 animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_0deg,rgba(255,30,67,1),rgba(255,140,0,0.5),rgba(255,30,67,0.3),rgba(255,30,67,1))]" />
      
      {/* Inner high-contrast border outline for crisp depth */}
      <div className="absolute inset-[1px] -z-10 rounded-[23px] border border-white/10 bg-zinc-950" />

      <div className="relative w-full h-full rounded-[22px] overflow-hidden flex flex-col bg-zinc-950">
        {/* Poster Container */}
        <div className="relative w-full flex-1 overflow-hidden bg-zinc-900">
          {event.poster ? (
            <motion.img
              src={event.poster}
              alt={event.name}
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-950/40 to-zinc-900">
              <span className="text-[80px] font-[800] text-white/30 font-baloo select-none leading-none">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          )}

          {/* Mode Badge */}
          <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-black/70 border border-white/20 backdrop-blur-md shadow-lg font-space">
            <span className={`w-2 h-2 rounded-full ${event.mode === "online" ? "bg-emerald-400 animate-pulse" : "bg-red-500 animate-pulse"}`} />
            {event.mode === "online" ? "Online" : "Offline"}
          </span>
        </div>

        {/* Card Footer Info Bar with comfortable padding */}
        <div className="p-4 bg-gradient-to-t from-black via-zinc-950 to-zinc-900/90 border-t border-white/10 flex items-center justify-between">
          <h4 className="text-base sm:text-lg font-[800] text-white font-baloo tracking-tight truncate pr-2">
            {event.name}
          </h4>
          <span className="text-xs font-space font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-2.5 py-1 rounded-md border border-red-500/30 shrink-0 group-hover/card:bg-red-500 group-hover/card:text-white transition-colors">
            View
          </span>
        </div>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// REDUCED-SIZE FULL-SCREEN DETAILS OVERLAY
// ---------------------------------------------------------------------------

function EventDetailsOverlay({
  event,
  onClose,
}: {
  event: EventItem | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {event && (
        <motion.div
          key="overlay-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-hidden"
          onClick={onClose}
        >
          <motion.div
            key="overlay-card"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-3xl border border-red-500/40 bg-zinc-950 shadow-[0_0_60px_rgba(255,30,67,0.3)]"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-md text-xs"
            >
              ✕
            </button>

            {/* Poster */}
            {event.poster && (
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-900">
                <img
                  src={event.poster}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-red-300 bg-red-500/15 border border-red-500/30 font-space">
                <span className={`w-2 h-2 rounded-full ${event.mode === "online" ? "bg-emerald-400" : "bg-red-500"}`} />
                {event.mode === "online" ? "Online Event" : "Offline Event"}
              </span>

              <h3 className="mt-3 text-2xl font-[800] text-white font-baloo tracking-tight">
                {event.name}
              </h3>

              <p className="mt-1 text-xs text-red-400 font-bold tracking-wide font-space">
                {formatEventDateRange(event.dateFrom, event.dateTo)}
              </p>

              {event.description && (
                <p className="mt-4 text-sm text-gray-300 leading-relaxed whitespace-pre-line font-baloo">
                  {event.description}
                </p>
              )}

              {event.link && (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 w-full rounded-xl border border-red-500/50 bg-red-500/20 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-red-600 transition-all font-space"
                >
                  <span>Visit Website</span>
                  <span>→</span>
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}