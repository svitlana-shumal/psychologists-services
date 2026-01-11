import css from "./AuthForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../Button/page";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { authSchema } from "../validation/validation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

interface AuthFormValues {
  name: string;
  email: string;
  password: string;
}

type Props = {
  onClose: () => void;
};

export default function AuthForm({ onClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({ resolver: yupResolver(authSchema) });
  const [showPassword, setShowPassword] = useState(false);

  async function handleRegister(email: string, password: string, name: string) {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(user, { displayName: name });
  }

  const onSubmit = async (data: AuthFormValues) => {
    try {
      await handleRegister(data.email, data.password, data.name);
      alert("Користувач зареєстрований");
      onClose();
      console.log(data);
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/user-not-found":
            alert("Користувача з такою поштою не існує");
            break;

          case "auth/wrong-password":
            alert("Неправильний пароль");
            break;

          case "auth/invalid-credential":
            alert("Неправильна пошта або пароль");
            break;

          case "auth/invalid-email":
            alert("Неправильна пошта або пароль");
            break;

          default:
            alert(error.message);
        }
      } else {
        alert("Невідома помилка");
      }
    }
  };
  return (
    <div className={css.authForm}>
      <h2>Registration</h2>
      <p>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <input type="text" placeholder="Name" {...register("name")} />
        {errors.name && (
          <span className={css.error}>{errors.name?.message}</span>
        )}
        <input type="email" placeholder="Email" {...register("email")} />
        {errors.email && (
          <span className={css.error}>{errors.email.message}</span>
        )}
        <div className={css.passwordField}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className={css.passwordInput}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label="Toggle password visibility"
            className={css.passwordEye}
          >
            <svg width="20" height="20">
              <use
                href={
                  showPassword
                    ? "/symbol-defs.svg#icon-eye"
                    : "/symbol-defs.svg#icon-eye-off"
                }
              />
            </svg>
          </button>
        </div>
        {errors.password && (
          <span className={css.error}>{errors.password.message}</span>
        )}
        <Button text="Sign Up" type="submit" />
      </form>
    </div>
  );
}
