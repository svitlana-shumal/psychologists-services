import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./AppointmentModal.module.css";
import Button from "../Button/page";
import { useState } from "react";
import { appointmentSchema } from "../validation/validation";
import type { AppointmentFormData } from "../../types/PsychologistsType";

type Props = {
  psychologistName: string;
  psychologistAvatar: string;
  onClose: () => void;
};

export const AppointmentModal = ({
  psychologistName,
  psychologistAvatar,
  onClose,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<AppointmentFormData>({
    resolver: yupResolver(appointmentSchema),
  });

  const availableTimes = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
  ];
  const [selectedTime, setSelectedTime] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onSubmit = (data: AppointmentFormData) => {
    console.log("Appointment data:", data);
    onClose();
  };

  return (
    <div className={css.modal}>
      <h2>Make an appointment with a psychologist</h2>
      <p className={css.description}>
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </p>

      <div className={css.profile}>
        <img
          className={css.avatar}
          src={psychologistAvatar}
          alt={psychologistName}
        />
        <div className={css.profileName}>
          <span className={css.avatarSpan}>Your psychologist</span>
          <p className={css.name}>{psychologistName}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <input placeholder="Name" {...register("name")} />
        {errors.name && (
          <span className={css.error}>{errors.name.message}</span>
        )}
        <div className={css.row}>
          <input
            placeholder="+380"
            {...register("phone")}
            className={css.input}
          />
          <div className={css.timePicker}>
            <div
              className={css.timeInput}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <span>{selectedTime || "00:00"}</span>
              <svg width="20" height="20" className={css.clockIcon}>
                <use href="/symbol-defs.svg#icon-clock" />
              </svg>
            </div>
            {isDropdownOpen && (
              <ul className={css.dropdown}>
                {availableTimes.map((time) => (
                  <li
                    key={time}
                    className={`${css.dropdownItem} ${
                      selectedTime === time ? css.active : ""
                    }`}
                    onClick={() => {
                      setSelectedTime(time);
                      setValue("time", time, { shouldValidate: true });
                      clearErrors("time");
                      setIsDropdownOpen(false);
                    }}
                  >
                    {time}
                  </li>
                ))}
              </ul>
            )}
            {errors.time && (
              <span className={css.error}>{errors.time.message}</span>
            )}
          </div>
        </div>
        <input type="hidden" {...register("time")} />
        <input placeholder="Email" {...register("email")} />
        {errors.email && (
          <span className={css.error}>{errors.email.message}</span>
        )}
        <textarea placeholder="Comment" {...register("comment")} />
        {errors.comment && (
          <span className={css.error}>{errors.comment.message}</span>
        )}
        <Button text="Send" type="submit" />
      </form>
    </div>
  );
};
