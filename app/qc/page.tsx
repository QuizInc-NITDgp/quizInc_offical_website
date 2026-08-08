import { fetchQCEvents } from "@/lib/qcevents";
import QuizzitchCup from "@/components/QuizzitchCup/Quizzitchcup";

export const dynamic = "force-dynamic";

export default async function QCPage() {
  const events = await fetchQCEvents();

  return <QuizzitchCup events={events} />;
}