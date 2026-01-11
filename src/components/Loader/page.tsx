import { PacmanLoader } from "react-spinners";
import css from "./Loader.module.css";
import Container from "../Container/page";

export default function Loader() {
  return (
    <Container>
      <div className={css.loader}>
        <PacmanLoader color="#54be96" />
      </div>
    </Container>
  );
}
