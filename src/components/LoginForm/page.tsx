import Button from "../Button/page";
import css from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "../../services/auth";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { loginSchema } from "../../validation/validation";
import toast from "react-hot-toast";

interface LoginFormValues {
  email: string;
  password: string;
}

type Props = {
  onClose: () => void;
};

export default function LoginForm({ onClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: yupResolver(loginSchema) });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await loginUser(data.email, data.password);
      toast.success("You have successfully logged in");
      onClose();
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/user-not-found":
            toast.error("User with this email address does not exist");
            break;

          case "auth/wrong-password":
            toast.error("Incorrect password");
            break;

          case "auth/invalid-credential":
            toast.error("Incorrect email or password");
            break;

          default:
            toast(error.message);
        }
      } else {
        toast.error("Unknown error");
      }
    }
  };

  return (
    <div className={css.loginForm}>
      <h2>Log In</h2>
      <p>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a psychologist.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
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
        <Button text="Log in" type="submit" />
      </form>
    </div>
  );
}
