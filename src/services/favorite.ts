import { ref, set, remove, get } from "firebase/database";
import { db } from "../firebaseDatabase";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import type { Psychologists } from "../types/PsychologistsType";
import { getPsychologistById } from "./psychologists";

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
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    async function fetchFavorites() {
      setLoading(true);
      setError(false);
      if (!user) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      try {
        const favRef = ref(db, `favorites/${user.uid}`);
        const favSnap = await get(favRef);
        if (!favSnap.exists()) {
          if (active) setFavorites([]);
          return;
        }

        const ids = Object.keys(favSnap.val());
        const psychs = await Promise.all(ids.map(getPsychologistById));
        if (active) {
          setFavorites(
            psychs.filter(
              (psychologist): psychologist is Psychologists =>
                psychologist !== null
            )
          );
        }
      } catch (fetchError) {
        console.error("Error fetching favorites:", fetchError);
        if (active) {
          setFavorites([]);
          setError(true);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchFavorites();
    return () => {
      active = false;
    };
  }, [user, reloadKey]);

  const addFavorite = async (psych: Psychologists) => {
    if (!user) return;
    await addToFavorites(user.uid, psych.id);
    setFavorites((prev) =>
      prev.some((favorite) => favorite.id === psych.id)
        ? prev
        : [...prev, psych]
    );
  };
  const removeFavorite = async (id: string) => {
    if (!user) return;
    await removeFromFavorites(user.uid, id);
    setFavorites((prev) => prev.filter((p) => p.id !== id));
  };

  return {
    favorites,
    loading,
    error,
    addFavorite,
    removeFavorite,
    retry: () => setReloadKey((key) => key + 1),
  };
}
