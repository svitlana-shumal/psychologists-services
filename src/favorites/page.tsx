import Loader from "../components/Loader/page";
import css from "./FavoritesPage.module.css";
import PsychologistCard from "../components/PsychologistCard/page";
import { useFavorites } from "../services/favorite";

export function FavoritesPage() {
  const { favorites, loading, error, removeFavorite, retry } = useFavorites();

  return (
    <div className={css.favoritesCard}>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className={css.empty}>
          <p>Could not load favorites. Please try again.</p>
          <button onClick={retry}>Try again</button>
        </div>
      ) : favorites.length === 0 ? (
        <p className={css.empty}>You haven’t added any psychologists yet.</p>
      ) : (
        <ul className={css.list}>
          {favorites.map((psych) => (
            <li key={psych.id}>
              <PsychologistCard
                data={psych}
                onRemove={(id) => removeFavorite(id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
