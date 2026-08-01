import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export interface Member {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  instagram?: string;
  year: "second" | "third" | "fourth";
}

export async function getMembers(): Promise<Member[]> {
  const snapshot = await getDocs(collection(db, "members"));
  const members = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Member, "id">),
  }));

  // Sort alphabetically by first letter of name
  return members.sort((a, b) => a.name.localeCompare(b.name));
}