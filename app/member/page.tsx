import MemberCard from "@/components/MemberCard";
import TunnelBackground from "@/components/TunnelBackground";
import { fetchMembersAndAlumniDynamic } from "@/lib/member";

export const dynamic = 'force-dynamic';



export default async function MembersPage() {
  const { currentMembers } = await fetchMembersAndAlumniDynamic();
  console.log("Fetched Current Members:", currentMembers);

  const fourthYearMembers = currentMembers.filter((m) => m.year === "fourth");
  const thirdYearMembers = currentMembers.filter((m) => m.year === "third");
  const secondYearMembers = currentMembers.filter((m) => m.year === "second");

  const facultyAdvisors = [
    {
      id: "faculty-1",
      name: "Debasis Chakraborty",
      role: "Faculty-in-Charge",
      image: "/facultyadvisor1.jpg",
    },
    {
      id: "faculty-2",
      name: "Dr. Parag Kumar Guhathakurta",
      role: "Faculty-in-Charge",
      image: "/facultyadvisor2.jpg",
    },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-48 md:pt-56 pb-40 text-center">
      <TunnelBackground />

      <div className="relative z-10 max-w-[1400px] w-full mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl drop-shadow-[0_0_35px_rgba(255,30,67,0.5)]">
          The Quizzing <span className="text-red-500">Cadre</span>
        </h1>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-red-400 drop-shadow-[0_0_15px_rgba(255,30,67,0.6)] sm:text-sm">
          THE VOICES & BRAINS BEHIND QUIZINC
        </p>

        {/* ================= FACULTY ADVISORS SECTION ================= */}
        <section className="mt-28 md:mt-36">
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-20">
            <div className="h-[1px] w-16 sm:w-48 bg-gradient-to-r from-transparent to-red-500/60" />
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl drop-shadow-[0_0_20px_rgba(255,30,67,0.5)]">
              Faculty Advisors
            </h2>
            <div className="h-[1px] w-16 sm:w-48 bg-gradient-to-l from-transparent to-red-500/60" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-14 md:grid-cols-2 justify-items-center max-w-3xl mx-auto">
            {facultyAdvisors.map((faculty) => (
              <MemberCard 
                key={faculty.id} 
                name={faculty.name}
                role={faculty.role}
                image={faculty.image}
              />
            ))}
          </div>
        </section>

        {/* ================= FOURTH YEAR SECTION ================= */}
        <section className="mt-36 md:mt-48">
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-20">
            <div className="h-[1px] w-16 sm:w-48 bg-gradient-to-r from-transparent to-red-500/60" />
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl drop-shadow-[0_0_20px_rgba(255,30,67,0.5)]">
              Final Year
            </h2>
            <div className="h-[1px] w-16 sm:w-48 bg-gradient-to-l from-transparent to-red-500/60" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-14 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {fourthYearMembers.map((member) => (
              <MemberCard 
                key={member.id} 
                name={member.name}
                role={member.positionInQuizInc}
                image={member.photo}
                linkedin={member.linkedin}
                instagram={member.facebook}
              />
            ))}
          </div>
        </section>

        {/* ================= THIRD YEAR SECTION ================= */}
        <section className="mt-36 md:mt-48">
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-20">
            <div className="h-[1px] w-16 sm:w-48 bg-gradient-to-r from-transparent to-red-500/60" />
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl drop-shadow-[0_0_20px_rgba(255,30,67,0.5)]">
              Pre Final Year
            </h2>
            <div className="h-[1px] w-16 sm:w-48 bg-gradient-to-l from-transparent to-red-500/60" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-14 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {thirdYearMembers.map((member) => (
              <MemberCard 
                key={member.id} 
                name={member.name}
                role={member.positionInQuizInc}
                image={member.photo}
                linkedin={member.linkedin}
                instagram={member.facebook}
              />
            ))}
          </div>
        </section>

        {/* ================= SECOND YEAR SECTION ================= */}
        <section className="mt-36 md:mt-48">
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-20">
            <div className="h-[1px] w-16 sm:w-48 bg-gradient-to-r from-transparent to-red-500/60" />
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl drop-shadow-[0_0_20px_rgba(255,30,67,0.5)]">
              Second Year
            </h2>
            <div className="h-[1px] w-16 sm:w-48 bg-gradient-to-l from-transparent to-red-500/60" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-14 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {secondYearMembers.map((member) => (
              <MemberCard 
                key={member.id} 
                name={member.name}
                role={member.positionInQuizInc}
                image={member.photo}
                linkedin={member.linkedin}
                instagram={member.facebook}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}