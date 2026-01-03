// import { Link } from "react-router-dom";
// import css from "./Header.module.css";
// import Container from "../Container/page";
// import { useState } from "react";

const Header = () => {
  // const [isAuthOpen, setIsAuthOpen] = useState(false);
  // const [isLoginOpen, setIsLoginOpen] = useState(false);

  // const { isAuthenticated, logout, loading } = useAuth();

  // if (loading) return <Loader />;
  return <div></div>;
};
//     <Container>
//       <header className={css.header}>
//         <nav className={css.nav}>
//           <Link to="/" className={css.logo}>
//             <svg width={218} height={28}>
//               <use href="/symbol-defs.svg#icon-logo-1" />
//             </svg>
//           </Link>
//           <div className={css.navBox}>
//             <Link to="/" className={css.navList}>
//               Home
//             </Link>
//             <Link to="/psychologists" className={css.navList}>
//               Psychologists
//             </Link>
//             <Link to="/favorites" className={css.navList}>Favorites</Link>
//           </div>
//         </nav>
//         <div className={css.auth}>
//           {isAuthenticated ? (
//             <button className={css.logout} onClick={logout}>
//               Log out
//             </button>
//           ) : (
//             <>
//               <button
//                 className={css.login}
//                 onClick={() => setIsLoginOpen(!isLoginOpen)}
//               >
//                 Log in
//               </button>
//               <button
//                 className={css.reg}
//                 onClick={() => setIsAuthOpen(!isAuthOpen)}
//               >
//                 Registration
//               </button>
//             </>
//           )}
//         </div>
//         {isAuthOpen && (
//           <Modal
//             onClose={() => setIsAuthOpen(false)}
//             children={<AuthForm onClose={() => setIsAuthOpen(false)} />}
//           />
//         )}
//         {isLoginOpen && (
//           <Modal
//             onClose={() => setIsLoginOpen(!isLoginOpen)}
//             children={<LoginForm onClose={() => setIsLoginOpen(false)}}
//           />
// )}
//     </header>
//   </Container>
// );}

export default Header;
