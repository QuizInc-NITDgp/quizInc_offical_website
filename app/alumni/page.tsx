import AlumniCard from "@/components/AlumniCard";
import AlumniHeader from "@/components/AluminiHeader";
import { fetchMembersAndAlumniDynamic } from "@/lib/member";

export const dynamic = 'force-dynamic';

export default async function AlumniPage() {
  const { alumni } = await fetchMembersAndAlumniDynamic();
  
  const batches = Array.from(
    new Set(alumni.map((a) => a.graduationYear))
  ).sort((a, b) => Number(b) - Number(a));

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start overflow-x-hidden px-4 sm:px-6 py-20 sm:py-28 text-center font-baloo">
      <div className="relative z-10 max-w-[1400px] w-full mx-auto">
        
        {/* Header Section */}
        <div className="text-center flex flex-col items-center pt-8 sm:pt-12">
          <AlumniHeader />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-red-400 drop-shadow-[0_0_15px_rgba(255,30,67,0.6)] sm:text-sm font-space">
            WHERE THEY ARE NOW
          </p>
        </div>

        {batches.map((batch) => {
          const batchAlumni = alumni.filter((a) => a.graduationYear === batch);

          return (
            <section key={batch} className="mt-20 md:mt-28">
              <div className="flex items-center justify-center gap-4 sm:gap-6 mb-12 md:mb-16">
                <div className="h-[1px] w-12 sm:w-32 md:w-48 bg-gradient-to-r from-transparent to-red-500/60" />
                <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl drop-shadow-[0_0_20px_rgba(255,30,67,0.5)] whitespace-nowrap font-baloo">
                  Batch {batch}
                </h2>
                <div className="h-[1px] w-12 sm:w-32 md:w-48 bg-gradient-to-l from-transparent to-red-500/60" />
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 justify-items-center">
                {batchAlumni.map((alum) => (
                  <div key={alum.id} className="flex justify-center w-full max-w-[400px]">
                    <AlumniCard
                      name={alum.name}
                      role={alum.role}
                      organization={alum.organization}
                      graduationYear={alum.graduationYear}
                      image={alum.photo}
                      linkedin={alum.linkedin}
                      instagram={alum.facebook}
                    />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}