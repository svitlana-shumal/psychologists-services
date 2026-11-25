import { useEffect, useState } from "react";
import type { Psychologists } from "../../types/PsychologistsType";
import css from "./Psychologist.module.css";
import { ReviewsBlock } from "../Reviews/page";
import { AppointmentModal } from "../AppointmentModal/page";
import Modal from "../Modal/page";
import { useAuth } from "../../hooks/useAuth";
import {
  addToFavorites,
  checkFavorite,
  removeFromFavorites,
} from "../../services/favorite";
import toast from "react-hot-toast";

type Props = {
  data: Psychologists;
  onRemove?: (id: string) => void | Promise<void>;
};

export default function PsychologistCard({ data, onRemove }: Props) {
  const [showReviews, setShowReviews] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { user } = useAuth();
  const [isFavorite, setIsFavorites] = useState(false);
  const [favoritePending, setFavoritePending] = useState(false);
  const [favoriteStatusReady, setFavoriteStatusReady] = useState(false);

  useEffect(() => {
    let active = true;
    if (!user) {
      setIsFavorites(false);
      setFavoriteStatusReady(true);
      return () => {
        active = false;
      };
    }

    setFavoriteStatusReady(false);
    checkFavorite(user.uid, data.id)
      .then((favorite) => {
        if (active) {
          setIsFavorites(favorite);
          setFavoriteStatusReady(true);
        }
      })
      .catch((error: unknown) => {
        console.error("Error checking favorite:", error);
        if (active) {
          setFavoriteStatusReady(true);
          toast.error("Could not check favorite status.");
        }
      });

    return () => {
      active = false;
    };
  }, [user, data.id]);

  const toggleFavorite = async () => {
    if (!user) {
      toast("This functionality is only available to authorized users.");
      return;
    }

    if (favoritePending) return;
    setFavoritePending(true);
    try {
      if (isFavorite) {
        if (onRemove) {
          await onRemove(data.id);
        } else {
          await removeFromFavorites(user.uid, data.id);
        }
        setIsFavorites(false);
      } else {
        await addToFavorites(user.uid, data.id);
        setIsFavorites(true);
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
      toast.error("Could not update favorites. Please try again.");
    } finally {
      setFavoritePending(false);
    }
  };

  const handleAppoinmentClick = () => {
    setShowModal(true);
  };

  return (
    <div className={css.psychologistCard}>
      <div className={css.left}>
        <div className={css.avatarCont}>
          <img className={css.avatar} src={data.avatar_url} alt={data.name} />
          <svg width={14} height={14}>
            <use href="/symbol-defs.svg#icon-greenround" />
          </svg>
        </div>
      </div>

      <div className={css.right}>
        <div className={css.titleContent}>
          <div className={css.title}>
            <span className={css.spanLabel}>Psychologist</span>
            <h3>{data.name}</h3>
          </div>

          <div className={css.meta}>
            <p>
              <svg width={16} height={16} className={css.star}>
                <use href="/symbol-defs.svg#icon-star" />
              </svg>
              Rating: {data.rating}
            </p>
            <p>
              <span>Price/hour: </span>
              <span className={css.price}>{data.price_per_hour}$</span>
            </p>

            <button
              className={`${css.heartButton} ${isFavorite ? css.active : ""}`}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              disabled={favoritePending || !favoriteStatusReady}
              onClick={toggleFavorite}
            >
              <svg width="26" height="26" className={css.icon}>
                <use href="/symbol-defs.svg#icon-heart" />
              </svg>
            </button>
          </div>
        </div>

        <ul className={css.details}>
          <li>
            <span className={css.label}>Experience: </span>
            <span className={css.value}>{data.experience}</span>
          </li>
          <li>
            <span className={css.label}>License: </span>
            <span className={css.value}>{data.license}</span>
          </li>
        </ul>
        <ul className={css.details}>
          <li>
            <span className={css.label}>Specialization: </span>
            <span className={css.value}>{data.specialization}</span>
          </li>
          <li>
            <span className={css.label}>Initial consultation: </span>
            <span className={css.value}>{data.initial_consultation}</span>
          </li>
        </ul>

        <p className={css.about}>{data.about}</p>

        {!showReviews && (
          <button className={css.readMore} onClick={() => setShowReviews(true)}>
            Read more
          </button>
        )}
        {showReviews && (
          <ReviewsBlock
            reviews={data.reviews ?? []}
            onAppointmentClick={handleAppoinmentClick}
          />
        )}

        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <AppointmentModal
              psychologistId={data.id}
              psychologistName={data.name}
              psychologistAvatar={data.avatar_url}
              onClose={() => setShowModal(false)}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}
