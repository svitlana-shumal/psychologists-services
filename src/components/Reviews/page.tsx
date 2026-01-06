import css from "./Reviews.module.css";
import { type Review } from "../../types/PsychologistsType";

type Props = {
  reviews: Review[];
  onAppointmentClick: () => void;
};

export const ReviewsBlock = ({ reviews, onAppointmentClick }: Props) => {
  return (
    <div className={css.reviews}>
      <ul className={css.reviewsList}>
        {reviews.map((review, index) => (
          <li key={index} className={css.reviewItem}>
            <div className={css.reviewer}>
              <div className={css.reviewerAvatar}>
                {review.reviewer.charAt(0).toUpperCase()}
              </div>

              <div className={css.reviewerInfo}>
                <p className={css.reviewName}>{review.reviewer}</p>
                <div className={css.reviewRating}>
                  <svg width={16} height={16} className={css.star}>
                    <use href="/symbol-defs.svg#icon-star" />
                  </svg>
                  <span>{review.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <p className={css.comment}>{review.comment}</p>
          </li>
        ))}
      </ul>

      <button className={css.appointmentBtn} onClick={onAppointmentClick}>
        Make an appointment
      </button>
    </div>
  );
};
