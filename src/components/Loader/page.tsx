import { PacmanLoader } from "react-spinners";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loader}>
      <PacmanLoader color="rgba(255, 106, 0, 1)" />
    </div>
  );
}
