import { ref, set, remove, get } from "firebase/database";
import { db } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import type { Psychologists } from "../types/PsychologistsType";

export async function addToFavorites(userId: string, psychologistId: string) {
  const favRef = ref(db, `favorites/${userId}/${psychologistId}`);
  await set(favRef, true);
}

export async function removeFromFavorites(
  userId: string,
  psychologistId: string
) {
  const favRef = ref(db, `favorites/${userId}/${psychologistId}`);
  await remove(favRef);
}

export async function checkFavorite(userId: string, psychologistId: string) {
  const favRef = ref(db, `favorites/${userId}/${psychologistId}`);
  const snapshot = await get(favRef);
  return snapshot.exists();
}

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Psychologists[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      if (!user) {
        setFavorites([]);
        setLoading(false);
        return;
      }
      const favRef = ref(db, `favorites/${user.uid}`);
      const favSnap = await get(favRef);
      if (!favSnap.exists()) {
        setFavorites([]);
        setLoading(false);
        return;
      }
      const ids = Object.keys(favSnap.val());
      const psychs: Psychologists[] = [];
      for (const id of ids) {
        const psychRef = ref(db, `/${id}`);
        const psychSnap = await get(psychRef);
        if (psychSnap.exists()) {
          psychs.push({ id, ...psychSnap.val() });
        }
      }
      setFavorites(psychs);
      setLoading(false);
    }
    fetchFavorites();
  }, [user]);

  const addFavorite = async (psych: Psychologists) => {
    if (!user) return;
    await addToFavorites(user.uid, psych.id);
    setFavorites((prev) => [...prev, psych]);
  };
  const removeFavorite = async (id: string) => {
    if (!user) return;
    await removeFromFavorites(user.uid, id);
    setFavorites((prev) => prev.filter((p) => p.id !== id));
  };

  return { favorites, loading, addFavorite, removeFavorite };
}
