import {
  BsHouse,
  BsHouseFill,
  BsHeart,
  BsHeartFill,
  BsPerson,
  BsPersonFill,
  BsPersonDash,
  BsPersonFillDash,
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

    const handleUpdate = () => {
      updateFavMovie();
      updateUser();
    };

    const intervalId = setInterval(handleUpdate, 1);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="container container_navbar d-flex align-items-center justify-content-between">
      <article className="d-flex flex-lg-column justify-content-between align-items-lg-center w-100">
        <div className="d-flex flex-lg-column align-items-lg-center gap-2 border_icons">
          <Link
            to="/"
            className={`icon_container d-flex flex-column justify-content-center align-items-lg-center ${
              location.pathname === "/" ? "icon_container-active" : ""
            }`}
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
                />
              ) : (
                <BsHouse />
              )}
            </div>
          </Link>
          <Link
            to={"/favorites"}
            className={`icon_container flex-column justify-content-center align-items-lg-center ${
              location.pathname === "/favorites" ? "icon_container-active" : ""
            } ${userLS ? "d-flex" : "d-none"}`}
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
                />
              ) : (
                <BsHeart />
              )}
            </div>
          </Link>
        </div>
        <Link
          to={"/user"}
          className={`icon_container d-flex flex-column justify-content-center align-items-lg-center icon_person ${
            location.pathname === "/user" ? "icon_container-active" : ""
          }`}
        >
          <div
            className={`background_icon d-flex align-items-center justify-content-center ${
              location.pathname === "/user" ? "active" : ""
            }`}
          >
            {location.pathname === "/user" && userLS ? (
              <BsPersonFillDash className="active_icon" />
            ) : location.pathname === "/user" && !userLS ? (
              <BsPersonFill className="active_icon" />
            ) : location.pathname !== "/user" && userLS ? (
              <BsPersonDash />
            ) : (
              <BsPerson />
            )}
          </div>
        </Link>
      </article>
    </section>
  );
};

export default Aside;
