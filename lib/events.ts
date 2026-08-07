import { collection, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export interface EventItem {
  id: string;
  name: string;
  poster: string;
  dateFrom: string; // ISO datetime string
  dateTo: string;
  mode: "online" | "offline" | string;
  description: string;
  link?: string; // optional hosted website / registration link
}

function toISOString(value: unknown): string {
  if (!value) return "";
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (typeof value === "string") return value;
  return "";
}

export async function fetchEvents(): Promise<EventItem[]> {
  const eventsRef = collection(db, "events");
  const q = query(eventsRef, orderBy("dateFrom", "desc"));
  const snapshot = await getDocs(q);

  const events: EventItem[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name || "",
      poster: data.poster || "",
      dateFrom: toISOString(data.dateFrom),
      dateTo: toISOString(data.dateTo),
      mode: data.mode || "offline",
      description: data.description || "",
      link: data.link || "",
    };
  });

  return events;
}