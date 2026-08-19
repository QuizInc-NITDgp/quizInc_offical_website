"use client";

import { motion } from "framer-motion";
import type { EventItem } from "@/lib/events";

export default function QuizzitchEvents({ events = [] }: { events?: EventItem[] }) {
  return (
    <div className="relative z-10 w-full py-2 sm:py-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-left mb-3 sm:mb-6 pb-2 px-4 sm:px-6 lg:px-8"
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
        <AutoEventCardRail events={events} />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// TWO-ROW CONTINUOUS MARQUEE
// ---------------------------------------------------------------------------

function AutoEventCardRail({ events }: { events: EventItem[] }) {
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

      <MarqueeRow events={rowTop} direction="left" />
      <MarqueeRow events={rowBottom} direction="right" />
    </div>
  );
}

function MarqueeRow({
  events,
  direction,
}: {
  events: EventItem[];
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
            <EventCard event={event} index={i % events.length} />
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
}: {
  event: EventItem;
  index: number;
}) {
  return (
    <div className="group/card relative w-full aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden text-left shadow-lg sm:shadow-xl bg-transparent p-[1px]">
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.06, 1] }}
        transition={{ duration: 4 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -inset-4 -z-20 rounded-[30px] bg-gradient-to-r from-red-600/30 via-rose-600/20 to-red-500/30 blur-xl sm:blur-2xl"
      />

      <div className="absolute inset-0 -z-10 rounded-xl sm:rounded-2xl opacity-90 animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_0deg,rgba(255,30,67,1),rgba(255,255,255,0.4),rgba(255,30,67,0.3),rgba(255,30,67,1))]" />
      <div className="absolute inset-[1px] -z-10 rounded-[11px] sm:rounded-[15px] border border-white/10 bg-zinc-950" />

      <div className="relative w-full h-full rounded-[11px] sm:rounded-[15px] overflow-hidden flex flex-col bg-zinc-950">
        {/* Poster Container */}
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
    </div>
  );
}