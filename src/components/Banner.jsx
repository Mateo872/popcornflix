import { useParams, useLocation, Link } from "react-router-dom";
import { BsPlay, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useEffect, useState } from "react";

const Banner = ({ movie }) => {
  const { id } = useParams();
  const location = useLocation();
  const [movieDetail, setMovieDetail] = useState(null);
  const [isFav, setIsFav] = useState(false);
  let favMovies = JSON.parse(localStorage.getItem("favMovies")) || [];
  const [userLS, setUserLS] = useState(
    JSON.parse(localStorage.getItem("user")) || []
  );
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode"))
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=a7f1c3f0247fcd7901fd06f02d23aab0`;
        const response = await fetch(url);
        const data = await response.json();
        setMovieDetail(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    setIsFav(favMovies.includes(id));
  }, [id, favMovies]);

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

  const handleToggleFav = () => {
    setIsFav(!isFav);
    if (!isFav) {
      favMovies.push(id);
    } else {
      favMovies = favMovies.filter((favMovie) => favMovie !== id);
    }
    localStorage.setItem("favMovies", JSON.stringify(favMovies));
  };

  if (!movie || !movieDetail) {
    return null;
  }

  const backdropUrl =
    location.pathname === "/"
      ? movie.backdrop_path
      : movieDetail?.backdrop_path;

  return (
    <div
      className={`banner_container d-flex justify-content-between align-items-end ${
        location.pathname === "/" ? "" : "banner_container-detail"
      } ${location.pathname === "/favorites" ? "d-none" : "d-flex"}`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://image.tmdb.org/t/p/w500${backdropUrl})`,
      }}
    >
      {location.pathname !== "/" && userLS.name ? (
        !isFav ? (
          <BsBookmark className="icon_fav" onClick={handleToggleFav} />
        ) : (
          <BsBookmarkFill
            className="icon_fav"
            onClick={handleToggleFav}
            style={darkMode ? { color: "#EE332C" } : { color: "#FEE27D" }}
          />
        )
      ) : null}

      <div className="banner_desc">
        <h4 className="mb-0">
          {location.pathname === "/"
            ? movie.original_title
            : movieDetail.original_title}
        </h4>
        <p className="banner_movie-desc mb-0">
          {location.pathname === "/" ? movie.overview : movieDetail.overview}
        </p>
        <div className="banner_features">
          <p className="mb-0">
            {location.pathname === "/"
              ? movie.release_date
              : movieDetail.release_date}
          </p>
        </div>
        <Link
          to={`/${
            location.pathname === "/" ? movie.title : movieDetail.title
          }/play`}
          className="banner_icon-container d-flex align-items-center justify-content-center"
        >
          <BsPlay className="banner_icon-play" />
        </Link>
      </div>
    </div>
  );
};

export default Banner;
