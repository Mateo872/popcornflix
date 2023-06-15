import {
  BsHouse,
  BsHouseFill,
  BsHeart,
  BsHeartFill,
  BsPerson,
  BsPersonFill,
  BsPersonDash,
  BsPersonFillDash,
  BsSunFill,
  BsMoonFill,
} from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Aside = () => {
  const location = useLocation();
  const [favMovie, setFavMovie] = useState(
    JSON.parse(localStorage.getItem("favMovies")) || []
  );

  const [userLS, setUserLS] = useState(
    JSON.parse(localStorage.getItem("user")) || []
  );

  const [showDarkMode, setShowDarkMode] = useState(false);

  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode"))
  );

  const handleDarkMode = () => {
    setShowDarkMode(!showDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(showDarkMode));
  };

  useEffect(() => {
    const updateFavMovie = () => {
      const favMovie = JSON.parse(localStorage.getItem("favMovies"));
      if (favMovie) {
        setFavMovie(favMovie);
      } else {
        setFavMovie([]);
      }
    };

    const updateUser = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setUserLS(user);
    };

    const handleDarkMode = () => {
      const darkMode = JSON.parse(localStorage.getItem("darkMode"));
      if (darkMode) {
        setDarkMode(darkMode);
      } else {
        setDarkMode(false);
      }
    };

    const handleUpdate = () => {
      updateFavMovie();
      updateUser();
      handleDarkMode();
    };

    const intervalId = setInterval(handleUpdate, 1);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section
      className="container container_navbar d-flex align-items-center justify-content-between"
      style={
        darkMode
          ? { backgroundColor: "#fff" }
          : { backgroundColor: "rgba(58, 58, 58, 0.2)" }
      }
    >
      <article className="d-flex flex-lg-column justify-content-between align-items-lg-center w-100">
        <div className="d-flex flex-lg-column align-items-lg-center gap-2 border_icons">
          <Link
            to="/"
            className={`icon_container d-flex flex-column justify-content-center align-items-lg-center ${
              location.pathname === "/" ? "icon_container-active" : ""
            } ${
              darkMode && location.pathname === "/"
                ? "icon_container-active-light"
                : ""
            } ${darkMode ? "hover_light" : ""}`}
          >
            <div
              className={`background_icon d-flex align-items-center justify-content-center ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              {location.pathname === "/" ? (
                <BsHouseFill
                  className={` ${
                    location.pathname === "/" ? "active_icon" : ""
                  }`}
                  style={darkMode ? { color: "#161616" } : { color: "#FEE27D" }}
                />
              ) : (
                <BsHouse
                  style={darkMode ? { color: "#161616" } : { color: "#FEE27D" }}
                />
              )}
            </div>
          </Link>
          <Link
            to={"/favorites"}
            className={`icon_container flex-column justify-content-center align-items-lg-center ${
              location.pathname === "/favorites" ? "icon_container-active" : ""
            } ${userLS ? "d-flex" : "d-none"} ${
              darkMode && location.pathname === "/favorites"
                ? "icon_container-active-light"
                : ""
            } ${darkMode ? "hover_light" : ""}`}
            style={darkMode ? { color: "#161616" } : { color: "#FEE27D" }}
          >
            <div
              className={`container_badge ${
                favMovie.length > 0 ? "d-flex" : "d-none"
              }`}
            >
              <span className="badge">{favMovie.length}</span>
            </div>

            <div
              className={`background_icon d-flex align-items-center justify-content-center ${
                location.pathname === "/favorites" ? "active" : ""
              }`}
            >
              {location.pathname === "/favorites" ? (
                <BsHeartFill
                  className={` ${
                    location.pathname === "/favorites" ? "active_icon" : ""
                  }`}
                  style={darkMode ? { color: "#161616" } : { color: "#FEE27D" }}
                />
              ) : (
                <BsHeart
                  style={darkMode ? { color: "#161616" } : { color: "#FEE27D" }}
                />
              )}
            </div>
          </Link>
          <div
            className={`icon_container ${
              userLS ? "d-flex" : "d-none"
            } flex-column justify-content-center align-items-lg-center ${
              darkMode ? "hover_light" : ""
            }`}
            onClick={handleDarkMode}
          >
            <div
              className={`background_icon d-flex align-items-center justify-content-center`}
            >
              {darkMode ? (
                <BsSunFill
                  style={darkMode ? { color: "#161616" } : { color: "#FEE27D" }}
                />
              ) : (
                <BsMoonFill
                  style={darkMode ? { color: "#161616" } : { color: "#FEE27D" }}
                />
              )}
            </div>
          </div>
        </div>
        <Link
          to={"/user"}
          className={`icon_container d-flex flex-column justify-content-center align-items-lg-center icon_person ${
            location.pathname === "/user" ? "icon_container-active" : ""
          } ${
            darkMode && location.pathname === "/user"
              ? "icon_container-active-light"
              : ""
          } ${darkMode ? "hover_light" : ""}`}
          style={darkMode ? { color: "#161616" } : { color: "#FEE27D" }}
        >
          <div
            className={`background_icon d-flex align-items-center justify-content-center ${
              location.pathname === "/user" ? "active" : ""
            }`}
          >
            {location.pathname === "/user" && userLS ? (
              <BsPersonFillDash
                className="active_icon"
                style={darkMode ? { color: "#161616" } : { color: "#FEE27D" }}
              />
            ) : location.pathname === "/user" && !userLS ? (
              <BsPersonFill
                className="active_icon"
                style={darkMode ? { color: "#161616" } : { color: "#FEE27D" }}
              />
            ) : location.pathname !== "/user" && userLS ? (
              <BsPersonDash
                style={darkMode ? { color: "#161616" } : { color: "#FEE27D" }}
              />
            ) : (
              <BsPerson
                style={darkMode ? { color: "#161616" } : { color: "#FEE27D" }}
              />
            )}
          </div>
        </Link>
      </article>
    </section>
  );
};

export default Aside;
