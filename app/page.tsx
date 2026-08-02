import TunnelBackground from "@/components/TunnelBackground";
import TypewriterText from "@/components/TypewriterText";
import EventsSection from "@/components/EventsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <TunnelBackground />

      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[75vh] lg:min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">

        {/* Original Tunnel Background */}

        <div className="relative z-10 flex max-w-4xl flex-col items-center pb-4 lg:pb-0">

          <h1 className="font-heading text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-red-400 leading-[0.95] sm:text-7xl md:text-8xl drop-shadow-[0_0_35px_rgba(255,30,67,0.5)]">
            <span className="font-bold tracking-normal opacity-95">
            </span>

            <br />

            <span className="inline-block mt-1 font-black tracking-tighter text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.85)]">
              Welcome to <br />
              QuizInc !
            </span>
          </h1>

          <p className="mt-6 text-sm font-extrabold uppercase tracking-[0.3em] text-red-400 drop-shadow-[0_0_15px_rgba(255,30,67,0.6)] sm:text-xl md:text-2xl">
            THE OFFICIAL QUIZ CLUB OF NIT DURGAPUR
          </p>

          <a
            href="#events-section"
            className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full border border-red-500/50 bg-black/40 px-9 py-4 text-base font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-red-400 hover:bg-red-600/20 hover:shadow-[0_0_30px_rgba(255,30,67,0.6)] active:scale-95 sm:text-lg"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

            <span>Explore</span>

            <svg
              className="h-5 w-5 text-red-400 transition-transform duration-300 group-hover:translate-y-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v14m0 0l-6-6m6 6l6-6"
              />
            </svg>
          </a>

        </div>

      </section>

      {/* ABOUT MUST BE HERE */}
      <AboutSection />

      {/* ================= EVENTS ================= */}
      <EventsSection />

    </main>
  );
}