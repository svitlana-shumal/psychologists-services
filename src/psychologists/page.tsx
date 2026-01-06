import { useEffect, useState } from "react";
import css from "./Psychologists.module.css";
import { getPsychologists } from "../services/psychologists";
import type { Psychologists } from "../types/PsychologistsType";
import PsychologistCard from "../components/PsychologistCard/page";

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

  return (
    <section className={css.psychologists}>
      <div className={css.psychologist}>
        {psychologists.map((p) => (
          <PsychologistCard key={p.id} data={p} />
        ))}
      </div>

      {lastKey && (
        <button onClick={handleLoadMore} disabled={loading} className={css.btn}>
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </section>
  );
}
