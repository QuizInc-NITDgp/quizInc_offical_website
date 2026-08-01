import { collection, collectionGroup, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export interface CurrentMember {
  id: string;
  name: string;
  photo: string;
  linkedin?: string;
  facebook?: string;
  positionInQuizInc: string;
  graduationYear: string;
  year: "second" | "third" | "fourth" | string;
}

export interface AlumniMember {
  id: string;
  name: string;
  photo: string;
  linkedin?: string;
  facebook?: string;
  role: string;
  organization: string;
  graduationYear: string;
}

export async function fetchMembersAndAlumniDynamic() {
  const configRef = doc(db, "currentYears", "active");
  const configSnap = await getDoc(configRef);

  let currentYears: string[] = [];
  if (configSnap.exists()) {
    const data = configSnap.data();
    currentYears = data.years || [];
  }

  const sortedCurrentYears = [...currentYears].sort((a, b) => Number(a) - Number(b));

  
  const membersSnapshot = await getDocs(collectionGroup(db, "members"));

  let currentMembers: CurrentMember[] = [];
  let alumni: AlumniMember[] = [];

  membersSnapshot.docs.forEach((memberDoc) => {
    // parent.parent is the allMembers/{year} document ref
    const passoutYear = memberDoc.ref.parent.parent?.id;
    if (!passoutYear) return;

    const data = memberDoc.data();
    const isCurrent = currentYears.includes(passoutYear);

    if (isCurrent) {
      const index = sortedCurrentYears.indexOf(passoutYear);
      let collegeYear: "fourth" | "third" | "second" = "second";
      if (index === 0) collegeYear = "fourth";
      else if (index === 1) collegeYear = "third";
      else if (index === 2) collegeYear = "second";

      currentMembers.push({
        id: memberDoc.id,
        name: data.fullName || "",
        photo: data.profilePhoto || "",
        linkedin: data.linkedin || "",
        facebook: data.instagram || "",
        positionInQuizInc: data.positionInQuizInc || "",
        graduationYear: passoutYear,
        year: collegeYear,
      });
    } else {
      alumni.push({
        id: memberDoc.id,
        name: data.fullName || "",
        photo: data.profilePhoto || "",
        linkedin: data.linkedin || "",
        facebook: data.instagram || "",
        role: data.currentRole || "",
        organization: data.organization || "",
        graduationYear: passoutYear,
      });
    }
  });

  currentMembers.sort((a, b) => a.name.localeCompare(b.name));
  alumni.sort((a, b) => {
    if (b.graduationYear !== a.graduationYear) {
      return Number(b.graduationYear) - Number(a.graduationYear);
    }
    return a.name.localeCompare(b.name);
  });

  return { currentMembers, alumni };
}