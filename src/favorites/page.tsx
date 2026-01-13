import Loader from "../components/Loader/page";
import css from "./FavoritesPage.module.css";
import PsychologistCard from "../components/PsychologistCard/page";
import { useFavorites } from "../services/favorite";

export function FavoritesPage() {
  const { favorites, loading } = useFavorites();

  return (
    <div className={css.favoritesCard}>
      {loading ? (
        <Loader />
      ) : favorites.length === 0 ? (
        <p className={css.empty}>You haven’t added any psychologists yet.</p>
      ) : (
        <ul className={css.list}>
          {favorites.map((psych) => (
            <li key={psych.id}>
              <PsychologistCard data={psych} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
