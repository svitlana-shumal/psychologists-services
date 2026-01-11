import { Link } from "react-router-dom";
import css from "./Home.module.css";
import ThemeSwitcher from "../components/ThemeSwitcher/ThemeSwitcher";

const Home = () => {
  return (
    <main className={css.container}>
      <ThemeSwitcher />
      <section className={css.hero}>
        <div className={css.context}>
          <h1 className={css.title}>
            The road to the <span className={css.subtitle}>depths</span> of the
            human soul
          </h1>
          <p className={css.desc}>
            We help you to reveal your potential, overcome challenges and find a
            guide in your own life with the help of our experienced
            psychologists.
          </p>
          <Link to="/psychologists">
            <button className={css.btn}>Get started ↗</button>
          </Link>
        </div>
        <div className={css.imageWrapper}>
          <img
            src="/image.png"
            alt="Psychologist woman in conversation"
            width={464}
            height={526}
          />
          <div className={css.statBox}>
            <svg width={25} height={25} className={css.iconClick}>
              <use href="/symbol-defs.svg#icon-fe_check" />
            </svg>
            <div className={css.spanStrong}>
              <span> Experienced psychologists</span>
              <strong> 15,000</strong>
            </div>
          </div>
          <svg width={25} height={25} className={css.iconQuestion}>
            <use href="/symbol-defs.svg#icon-question" />
          </svg>
          <svg width={10} height={17} className={css.iconUsers}>
            <use href="/symbol-defs.svg#icon-mdi_users" />
          </svg>
        </div>
      </section>
    </main>
  );
};

export default Home;
