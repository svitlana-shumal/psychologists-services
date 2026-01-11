import css from "./EmptyState.module.css";

type Props = { message: string };

export default function EmptyState({ message }: Props) {
  return (
    <div className={css.empty}>
      <p>{message}</p>
    </div>
  );
}
