import { Link, NavLink } from "react-router-dom";
import css from "./Header.module.css";
import { useState } from "react";
import Modal from "../Modal/page";
import LoginForm from "../LoginForm/paeg";
import AuthForm from "../AuthForm/page";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = false;
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <section className={css.container}>
      <header className={css.header}>
        <Link to="/" className={css.logo}>
          <svg width={218} height={28}>
            <use href="/symbol-defs.svg#icon-logo-1" />
          </svg>
        </Link>
        <nav className={`${css.nav} ${isOpen ? css.open : ""}`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${css.navList} ${css.active}` : css.navList
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/psychologists"
            className={({ isActive }) =>
              isActive ? `${css.navList} ${css.active}` : css.navList
            }
            onClick={() => setIsOpen(false)}
          >
            Psychologists
          </NavLink>

          {isLoggedIn && (
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? `${css.navList} ${css.active}` : css.navList
              }
              onClick={() => setIsOpen(false)}
            >
              Favorites
            </NavLink>
          )}

          <div className={css.auth}>
            {!isLoggedIn ? (
              <>
                <button
                  className={css.authBtn}
                  onClick={() => setIsLoginOpen(true)}
                >
                  Log in
                </button>
                <button
                  className={css.registration}
                  onClick={() => setIsRegisterOpen(true)}
                >
                  Registration
                </button>
              </>
            ) : (
              <button className={css.authBtn}>Log out</button>
            )}
          </div>
        </nav>
        <button className={css.burger} onClick={toggleMenu}>
          <svg width={20} height={20}>
            <use
              href={`/symbol-defs.svg#${isOpen ? "icon-close" : "icon-menu"}`}
            />
          </svg>
        </button>
        {isLoginOpen && (
          <Modal onClose={() => setIsLoginOpen(false)}>
            <LoginForm onClose={() => setIsLoginOpen(false)} />
          </Modal>
        )}

        {isRegisterOpen && (
          <Modal onClose={() => setIsRegisterOpen(false)}>
            <AuthForm onClose={() => setIsRegisterOpen(false)} />
          </Modal>
        )}
      </header>
    </section>
  );
};

export default Header;
