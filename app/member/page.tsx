import MemberCard from "@/components/MemberCard";
import TunnelBackground from "@/components/TunnelBackground";
import { getMembers } from "@/lib/member";

export default async function MembersPage() {
  const members = await getMembers();

  const fourthYearMembers = members.filter((m) => m.year === "fourth");
  const thirdYearMembers = members.filter((m) => m.year === "third");
  const secondYearMembers = members.filter((m) => m.year === "second");

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-48 md:pt-56 pb-40 text-center">
      <TunnelBackground />

      <div className="relative z-10 max-w-[1400px] w-full mx-auto">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl drop-shadow-[0_0_35px_rgba(255,30,67,0.5)]">
          The Quizzing <span className="text-red-500">Cadre</span>
        </h1>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-red-400 drop-shadow-[0_0_15px_rgba(255,30,67,0.6)] sm:text-sm">
          THE VOICES & BRAINS BEHIND QUIZINC
        </p>

        <section className="mt-28 md:mt-36">
          <div className="flex items-center justify-center gap-6 mb-20">
            <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent to-red-500/60" />
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl drop-shadow-[0_0_20px_rgba(255,30,67,0.5)]">
              Fourth Year
            </h2>
            <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-l from-transparent to-red-500/60" />
          </div>
          <div className="grid grid-cols-1 gap-12 sm:gap-14 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {fourthYearMembers.map((member) => (
              <MemberCard key={member.id} {...member} />
            ))}
          </div>
        </section>

        <section className="mt-36 md:mt-48">
          <div className="flex items-center justify-center gap-6 mb-20">
            <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent to-red-500/60" />
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl drop-shadow-[0_0_20px_rgba(255,30,67,0.5)]">
              Third Year
            </h2>
            <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-l from-transparent to-red-500/60" />
          </div>
          <div className="grid grid-cols-1 gap-12 sm:gap-14 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {thirdYearMembers.map((member) => (
              <MemberCard key={member.id} {...member} />
            ))}
          </div>
        </section>

        <section className="mt-36 md:mt-48">
          <div className="flex items-center justify-center gap-6 mb-20">
            <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent to-red-500/60" />
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl drop-shadow-[0_0_20px_rgba(255,30,67,0.5)]">
              Second Year
            </h2>
            <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-l from-transparent to-red-500/60" />
          </div>
          <div className="grid grid-cols-1 gap-12 sm:gap-14 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {secondYearMembers.map((member) => (
              <MemberCard key={member.id} {...member} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}