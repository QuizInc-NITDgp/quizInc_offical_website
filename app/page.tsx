import TunnelBackground from "@/components/TunnelBackground";
import EventsSection from "@/components/EventsSection";
import AboutSection from "@/components/AboutSection";
import ScrollReveal from "@/components/Scrollreveal";


export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <TunnelBackground />

      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[75vh] lg:min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">

        <div className="relative z-10 flex max-w-4xl flex-col items-center pb-4 lg:pb-0">

          {/* Glowing Ambient Backdrop Aura */}
          <div className="absolute -inset-10 -z-10 rounded-full bg-gradient-to-r from-red-600/25 via-rose-500/15 to-red-500/20 blur-3xl animate-pulse" />

          <h1 className="font-heading text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-red-400 leading-[0.95] sm:text-7xl md:text-8xl drop-shadow-[0_0_35px_rgba(255,30,67,0.5)] animate-fade-in">
            <span className="font-bold tracking-normal opacity-95">
            </span>

            <br />

            <span className="inline-block mt-1 font-black tracking-tighter text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.85)] transform transition-transform duration-500 hover:scale-[1.02]">
              Welcome to <br />
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-white bg-clip-text text-transparent animate-pulse">
                QuizInc !
              </span>
            </span>
          </h1>

          <p className="mt-6 text-sm font-extrabold uppercase tracking-[0.3em] text-red-400 drop-shadow-[0_0_15px_rgba(255,30,67,0.6)] sm:text-xl md:text-2xl animate-fade-in-up">
            THE OFFICIAL QUIZ CLUB OF NIT DURGAPUR
          </p>

          <a
            href="#events-section"
            className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full border border-red-500/50 bg-black/40 px-9 py-4 text-base font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-red-400 hover:bg-red-600/30 hover:shadow-[0_0_40px_rgba(255,30,67,0.8)] active:scale-95 sm:text-lg animate-fade-in-up delay-200"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

            <span className="relative z-10">Explore</span>

            <svg
              className="relative z-10 h-5 w-5 text-red-400 transition-transform duration-300 group-hover:translate-y-1.5 group-hover:scale-110"
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
      <ScrollReveal>
        <AboutSection />
      </ScrollReveal>

     
        <EventsSection />
 

    </main>
  );
}