"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatEventDateRange } from "@/lib/utils";
import type { EventItem } from "@/lib/events";

export default function QuizzitchEvents({ events = [] }: { events?: EventItem[] }) {
  const [selected, setSelected] = useState<EventItem | null>(null);

  return (
    <div className="relative z-10 w-full py-2 sm:py-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-left mb-3 sm:mb-6 px-4 sm:px-6 lg:px-8"
      >
        {/* Title matching About section gradient & drop-shadow */}
        <h3 className="mb-1 font-baloo text-3xl font-[800] leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
          Events{" "}
          <span className="inline-block bg-gradient-to-r from-white via-rose-300 to-red-600 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(225,29,72,0.4)]">
            So Far
          </span>
        </h3>
      </motion.div>

      {events.length === 0 ? (
        <div className="p-4 sm:p-8 rounded-2xl border border-red-500/20 bg-gradient-to-b from-white/[0.04] to-black/60 backdrop-blur-2xl max-w-md mx-auto shadow-[0_0_50px_rgba(0,0,0,0.8)] text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-red-600/5 blur-3xl pointer-events-none" />
          <p className="text-gray-300/80 text-xs sm:text-base font-medium font-sans tracking-tight">
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
    <div className="w-full relative flex flex-col gap-2 sm:gap-4">
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
  const doubled = [...events, ...events, ...events];
  const animName = direction === "left" ? "marquee-left" : "marquee-right";
  const duration = Math.max(events.length * 6, 28);

  return (
    <div className="w-full overflow-hidden group/row py-1">
      <div
        className="flex gap-2.5 sm:gap-5 w-max group-hover/row:[animation-play-state:paused]"
        style={{ animation: `${animName} ${duration}s linear infinite` }}
      >
        {doubled.map((event, i) => (
          <div
            key={`${event.id}-${i}`}
            className="shrink-0 w-[42vw] max-w-[280px] min-w-[140px] sm:w-[20vw] sm:min-w-[220px]"
          >
            <EventCard event={event} index={i % events.length} onClick={() => onSelect(event)} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// EVENT CARD
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
      className="group/card relative w-full aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 shadow-lg sm:shadow-xl bg-transparent p-[1px]"
    >
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.06, 1] }}
        transition={{ duration: 4 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -inset-4 -z-20 rounded-[30px] bg-gradient-to-r from-red-600/30 via-rose-600/20 to-red-500/30 blur-xl sm:blur-2xl"
      />

      <div className="absolute inset-0 -z-10 rounded-xl sm:rounded-2xl opacity-90 animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_0deg,rgba(255,30,67,1),rgba(255,255,255,0.4),rgba(255,30,67,0.3),rgba(255,30,67,1))]" />
      <div className="absolute inset-[1px] -z-10 rounded-[11px] sm:rounded-[15px] border border-white/10 bg-zinc-950" />

      <div className="relative w-full h-full rounded-[11px] sm:rounded-[15px] overflow-hidden flex flex-col bg-zinc-950">
        {/* Poster Container: Takes full area with zero wasted side margins */}
        <div className="relative w-full flex-1 overflow-hidden bg-zinc-900">
          {event.poster ? (
            <motion.img
              src={event.poster}
              alt={event.name}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-950/40 to-zinc-900">
              <span className="text-[36px] sm:text-[64px] font-[800] text-white/30 font-baloo select-none leading-none">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>

        {/* Tight bottom label strip */}
        <div className="p-1.5 sm:p-2.5 bg-gradient-to-t from-black via-zinc-950 to-zinc-900/90 border-t border-white/10 flex items-center">
          <h4 className="text-[11px] sm:text-base font-[800] font-baloo tracking-tight truncate w-full bg-gradient-to-r from-white via-rose-200 to-red-500 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(225,29,72,0.3)]">
            {event.name}
          </h4>
        </div>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// DETAILS OVERLAY
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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md overflow-hidden"
          onClick={onClose}
        >
          <motion.div
            key="overlay-card"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm max-h-[80vh] overflow-y-auto rounded-2xl border border-red-500/40 bg-zinc-950 shadow-[0_0_60px_rgba(255,30,67,0.3)]"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-2.5 right-2.5 z-20 w-6 h-6 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-md text-xs"
            >
              ✕
            </button>

            {event.poster && (
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-900">
                <img src={event.poster} alt={event.name} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="p-3.5 sm:p-5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-tight text-red-300 bg-red-500/15 border border-red-500/30 font-sans">
                <span className={`w-1.5 h-1.5 rounded-full ${event.mode === "online" ? "bg-emerald-400" : "bg-red-500"}`} />
                {event.mode === "online" ? "Online Event" : "Offline Event"}
              </span>

              <h3 className="mt-2 text-base sm:text-lg font-[800] font-baloo tracking-tight bg-gradient-to-r from-white via-rose-200 to-red-500 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(225,29,72,0.3)]">
                {event.name}
              </h3>

              <p className="mt-0.5 text-[11px] text-red-400 font-bold tracking-tight font-sans">
                {formatEventDateRange(event.dateFrom, event.dateTo)}
              </p>

              {event.description && (
                <p className="mt-2.5 text-xs text-gray-300 leading-relaxed whitespace-pre-line font-sans">
                  {event.description}
                </p>
              )}

              {event.link && (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3.5 inline-flex items-center justify-center gap-2 w-full rounded-lg border border-red-500/50 bg-red-500/20 px-3.5 py-2 text-[11px] font-bold uppercase tracking-tight text-white shadow-md hover:bg-red-600 transition-all font-sans"
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