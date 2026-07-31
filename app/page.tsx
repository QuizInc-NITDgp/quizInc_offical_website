import TunnelBackground from "@/components/TunnelBackground";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Dynamic Animated Tunnel Background */}
      <TunnelBackground />

      <div className="relative z-10 flex max-w-4xl flex-col items-center">
        {/* Main Hero Title */}
        <h1 className="font-heading text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-red-400 leading-[0.95] sm:text-7xl md:text-8xl drop-shadow-[0_0_35px_rgba(255,30,67,0.5)]">
          <span className="font-bold tracking-normal opacity-95">Welcome to</span>
          <br />
          <span className="inline-block mt-1 font-black tracking-tighter text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.85)]">
            QuizInc !
          </span>
        </h1>

        {/* Official Club Subtitle */}
        <p className="mt-6 text-sm font-extrabold uppercase tracking-[0.3em] text-red-400 drop-shadow-[0_0_15px_rgba(255,30,67,0.6)] sm:text-xl md:text-2xl">
          THE OFFICIAL QUIZ CLUB OF NIT DURGAPUR
        </p>

        {/* Secondary Description */}
        <p className="mt-5 max-w-lg text-sm font-medium text-rose-100/80 sm:text-base md:text-lg leading-relaxed tracking-wide">
          Where curiosity meets competition. Test your knowledge, master trivia, and compete with the best minds.
        </p>

        {/* Interactive Explore Button */}
        <button className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full border border-red-500/50 bg-black/40 px-9 py-4 text-base font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-red-400 hover:bg-red-600/20 hover:shadow-[0_0_30px_rgba(255,30,67,0.6)] active:scale-95 sm:text-lg">
          {/* Subtle Internal Shimmer Effect */}
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          
          <span>Explore</span>
          
          {/* Animated Arrow Icon */}
          <svg
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 text-red-400 group-hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
    </main>
  );
}