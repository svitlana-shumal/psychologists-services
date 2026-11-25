import {
  get,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAfter,
} from "firebase/database";
import { db } from "../firebaseDatabase";
import type { Psychologists } from "../types/PsychologistsType";

const PAGE_SIZE = 3;
type PsychologistRecord = Omit<Psychologists, "id">;

function isPsychologistRecord(value: unknown): value is PsychologistRecord {
  if (!value || typeof value !== "object") return false;

  const record = value as Record<string, unknown>;
  return (
    typeof record.name === "string" &&
    typeof record.avatar_url === "string" &&
    typeof record.experience === "string" &&
    Array.isArray(record.reviews) &&
    record.reviews.every(
      (review) =>
        review &&
        typeof review === "object" &&
        typeof review.reviewer === "string" &&
        typeof review.rating === "number" &&
        typeof review.comment === "string"
    ) &&
    typeof record.price_per_hour === "number" &&
    Number.isFinite(record.price_per_hour) &&
    typeof record.rating === "number" &&
    Number.isFinite(record.rating) &&
    typeof record.license === "string" &&
    typeof record.specialization === "string" &&
    typeof record.initial_consultation === "string" &&
    typeof record.about === "string"
  );
}

export async function getPsychologists(
  lastKey: string | null
): Promise<Psychologists[]> {
  const psychologistsRef = ref(db, "/");
  const psychologists: Psychologists[] = [];
  let cursor = lastKey;

  while (psychologists.length < PAGE_SIZE) {
    const q = cursor
      ? query(
          psychologistsRef,
          orderByKey(),
          startAfter(cursor),
          limitToFirst(PAGE_SIZE)
        )
      : query(psychologistsRef, orderByKey(), limitToFirst(PAGE_SIZE));

    const snapshot = await get(q);
    if (!snapshot.exists()) break;

    const data: unknown = snapshot.val();
    if (!data || typeof data !== "object") break;

    const entries = Object.entries(data as Record<string, unknown>);
    if (entries.length === 0) break;

    for (const [id, value] of entries) {
      cursor = id;
      if (isPsychologistRecord(value)) {
        psychologists.push({ id, ...value });
      }
      if (psychologists.length === PAGE_SIZE) break;
    }

    if (psychologists.length === PAGE_SIZE || entries.length < PAGE_SIZE) {
      break;
    }
  }

  return psychologists;
}

export async function getPsychologistById(
  id: string
): Promise<Psychologists | null> {
  const snapshot = await get(ref(db, `/${id}`));
  if (!snapshot.exists()) return null;

  const data: unknown = snapshot.val();
  return isPsychologistRecord(data) ? { id, ...data } : null;
}
