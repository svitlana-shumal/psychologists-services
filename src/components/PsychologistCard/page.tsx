import { useState } from "react";
import type { Psychologists } from "../../types/PsychologistsType";
import css from "./Psychologist.module.css";
import { ReviewsBlock } from "../Reviews/page";
import { AppointmentModal } from "../AppointmentModal/page";
import Modal from "../Modal/page";

type Props = { data: Psychologists };

export default function PsychologistCard({ data }: Props) {
  const [showReviews, setShowReviews] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
            <span className={css.spanSpan}>Psychologist</span>
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
            <button className={css.heartButton} aria-label="Add to favorites">
              <svg width="26" height="26">
                <use href="/symbol-defs.svg#icon-heart" />
              </svg>
            </button>

            {/* <button
    //         className={css.heartButton}
    //         onClick={() => toggleFavorite(car.id)}
    //       >
    //         <svg width="26" height="26">
    //           <use
    //             href={`/symbol-defs.svg#${
    //               isFavorite ? "icon-heart-hover" : "icon-heart"
    //             }`}
    //           />
    //         </svg>
    //       </button> */}
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

        <button
          className={css.readMore}
          onClick={() => setShowReviews((prev) => !prev)}
        >
          {showReviews ? "Hide reviews" : "Read more"}
        </button>

        {showReviews && data.reviews?.length > 0 && (
          <ReviewsBlock
            reviews={data.reviews}
            onAppointmentClick={handleAppoinmentClick}
          />
        )}

        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <AppointmentModal
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
