import { useEffect, useState } from "react";
import css from "./Psychologists.module.css";
import { getPsychologists } from "../services/psychologists";
import type { Psychologists, SortOption } from "../types/PsychologistsType";
import PsychologistCard from "../components/PsychologistCard/page";
import SortDropdown from "../components/Filters/page";
import Loader from "../components/Loader/page";
import EmptyState from "../components/EmptyState/page";

export default function PsychologistsPage() {
  const [psychologists, setPsychologists] = useState<Psychologists[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // перша порція
  useEffect(() => {
    async function fetchFirstPage() {
      setLoading(true);
      const data = await getPsychologists(null);
      setPsychologists(data);
      if (data.length > 0) {
        setLastKey(data[data.length - 1].id);
      }
      setLoading(false);
    }
    fetchFirstPage();
  }, []);

  // завантаження наступних порцій
  const handleLoadMore = async () => {
    if (!lastKey) return;
    setLoading(true);
    const data = await getPsychologists(lastKey);
    if (data.length > 0) {
      setPsychologists((prev) => [...prev, ...data]);
      setLastKey(data[data.length - 1].id);
    } else {
      setLastKey(null); // більше даних немає
    }
    setLoading(false);
  };

  const [sort, setSort] = useState<SortOption>("a-z");

  const sortPsychologists = (list: Psychologists[], sort: SortOption) => {
    switch (sort) {
      case "a-z":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      case "z-a":
        return [...list].sort((a, b) => b.name.localeCompare(a.name));
      case "price-low":
        return [...list].sort((a, b) => a.price_per_hour - b.price_per_hour);
      case "price-high":
        return [...list].sort((a, b) => b.price_per_hour - a.price_per_hour);
      case "rating-low":
        return [...list].sort((a, b) => a.rating - b.rating);
      case "rating-high":
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  };

  const sortedList = sortPsychologists(psychologists, sort);

  return (
    <>
      {loading && psychologists.length === 0 ? (
        <Loader />
      ) : (
        <section className={css.psychologists}>
          <SortDropdown selected={sort} onChange={setSort} />
          <div className={css.psychologist}>
            {sortedList.map((p) => (
              <PsychologistCard key={p.id} data={p} />
            ))}
          </div>

          {!loading && psychologists.length === 0 && (
            <EmptyState message="No psychologists found" />
          )}

          {lastKey && (
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className={css.btn}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          )}
        </section>
      )}
    </>
  );
}
