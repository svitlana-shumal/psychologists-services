import { PacmanLoader } from "react-spinners";
import css from "./Loader.module.css";
import Container from "../Container/page";
import { useEffect, useState } from "react";

function useThemeColor() {
  const [color, setColor] = useState("#54be96");

  useEffect(() => {
    const updateColor = () => {
      const root = getComputedStyle(document.documentElement);
      const themeColor = root.getPropertyValue("--color-primary").trim();
      if (themeColor) setColor(themeColor);
    };

    updateColor();
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);
  return color;
}

export default function Loader() {
  const color = useThemeColor();
  return (
    <Container>
      <div className={css.loader}>
        <PacmanLoader color={color} />
      </div>
    </Container>
  );
}
