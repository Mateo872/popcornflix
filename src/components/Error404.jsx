import { PacmanLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Error404 = () => {
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
    <main className="d-flex align-items-center justify-content-center text-center main_error">
      <div>
        <div className="d-flex justify-content-center">
          <PacmanLoader
            color={`${darkMode ? "#EE332C" : "#FEE27D"}`}
            size={60}
            loading
          />
        </div>
        <h1 style={{ color: "#fff", fontWeight: "bold" }}>404</h1>
        <p className="pacman_text">
          Página no encontrada, vuelve al{" "}
          <Link to="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                color: darkMode ? "#EE332C" : "#FEE27D",
                fontWeight: "bold",
              }}
            >
              inicio
            </span>
          </Link>
          .
        </p>
      </div>
    </main>
  );
};

export default Error404;
