// import { useState, useEffect } from "react";
// import css from "./ThemeSwitcher.module.css";

// const themes = ["green", "blue", "orange"] as const;

// export default function ThemeSwitcher() {
//   const [theme, setTheme] = useState("green");

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//   }, [theme]);

//   return (
//     <div className={css.theme}>
//       {themes.map((t) => {
//         const colors = { green: "#54be96", blue: "#3470ff", orange: "#fc832c" };
//         return (
//           <button
//             key={t}
//             onClick={() => setTheme(t)}
//             className={css.btn}
//             style={{ backgroundColor: colors[t], color: "#fbfbfb" }}
//           >
//             {" "}
//             {t.charAt(0).toUpperCase() + t.slice(1)}{" "}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import css from "./ThemeSwitcher.module.css";
// import Container from "../Container/page";

const themes = ["green", "blue", "orange"] as const;

export default function ThemeDropdown() {
  const [theme, setTheme] = useState("green");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    // <Container>
    <div className={css.wrapper}>
      <label htmlFor="theme-select" className={css.label}>
        Choose Theme:
      </label>
      <select
        id="theme-select"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className={css.select}
      >
        {themes.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>
    </div>
    // </Container>
  );
}
