import Cards from "./Cards";
import { useEffect, useState } from "react";

const Container = () => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode"))
  );

  useEffect(() => {
    const handleDarkMode = () => {
      const darkMode = JSON.parse(localStorage.getItem("darkMode"));
      if (darkMode) {
        setDarkMode(darkMode);
      } else {
        setDarkMode(false);
      }
    };

    const handleUpdate = () => {
      handleDarkMode();
    };

    const intervalId = setInterval(handleUpdate, 1);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className={`container_movie ${darkMode ? "themeLight" : ""}`}>
      <article>
        <Cards />
      </article>
    </section>
  );
};

export default Container;
