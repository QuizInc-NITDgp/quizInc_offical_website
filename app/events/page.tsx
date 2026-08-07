
import { fetchEvents } from "@/lib/events";
import { EventsAnimations } from "@/components/EventPage";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await fetchEvents();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start overflow-x-hidden px-4 sm:px-6 pt-36 md:pt-48 pb-40 text-center">

      <div className="relative z-10 max-w-[1400px] w-full mx-auto">
        <EventsAnimations events={events} />
      </div>
    </main>
  );
}