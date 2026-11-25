import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Wrong email format").required("Email is required"),
  password: yup.string().min(6, "Too short").required("Password is required"),
});

export const authSchema = yup.object({
  name: yup
    .string()
    .trim()
    .matches(
      /^[\p{L}\p{M}]+(?:[ '-’][\p{L}\p{M}]+)*$/u,
      "Enter a valid name"
    )
    .min(2, "Too short name")
    .required("Name is required"),
  email: yup.string().email("Wrong email format").required("Email is required"),
  password: yup.string().min(6, "Too short").required("Password is required"),
});

export const appointmentSchema = yup.object().shape({
  name: yup.string().trim().required("Name is required"),
  phone: yup
    .string()
    .matches(/^\+?\d{10,15}$/, "Invalid phone number")
    .required("Phone is required"),
  time: yup.string().required("Time is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  comment: yup.string().trim().required("Comment is required"),
});
