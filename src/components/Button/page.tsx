import css from "./Button.module.css";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  text,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={css.btn}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
