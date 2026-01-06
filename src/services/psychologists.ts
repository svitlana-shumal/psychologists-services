import {
  get,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAfter,
} from "firebase/database";
import { db } from "../firebase";
import type { Psychologists } from "../types/PsychologistsType";

const PAGE_SIZE = 3;
type PsychologistsFromDB = Omit<Psychologists, "id">;

export async function getPsychologists(
  lastKey: string | null
): Promise<Psychologists[]> {
  const psychologistsRef = ref(db, "/");
  const q = lastKey
    ? query(
        psychologistsRef,
        orderByKey(),
        startAfter(lastKey),
        limitToFirst(PAGE_SIZE)
      )
    : query(psychologistsRef, orderByKey(), limitToFirst(PAGE_SIZE));

  const snapshot = await get(q);
  if (!snapshot.exists()) return [];
  const data = snapshot.val() as Record<string, PsychologistsFromDB>;
  return Object.entries(data).map(([id, value]) => ({
    id,
    ...value,
  }));
}
