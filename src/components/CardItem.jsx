import { Link } from "react-router-dom";
import { BsStarFill, BsBookmarkFill } from "react-icons/bs";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const CardItem = ({ movie }) => {
  const { id } = useParams();
  const location = useLocation();
  const [movieRelated, setMovieRelated] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const favMovie = JSON.parse(localStorage.getItem("favMovies")) || [];

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=a7f1c3f0247fcd7901fd06f02d23aab0`;
          const response = await fetch(url);
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            setMovieRelated(data.results[randomIndex]);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      let movieResults = [];

      try {
        for (const movieId of favMovie) {
          const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=a7f1c3f0247fcd7901fd06f02d23aab0`;
          const response = await fetch(url);
          const data = await response.json();

          movieResults.push(data);
        }
      } catch (error) {
        console.error(error);
      }

      setFavoriteMovies([...movieResults]);
    };

    fetchFavoriteMovies();
  }, []);

  const backgroundImage =
    location.pathname === "/"
      ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
      : `url(https://image.tmdb.org/t/p/w500${movieRelated?.poster_path})`;

  return (
    <>
      {location.pathname === "/favorites" ? (
        favoriteMovies.map((movieFav) => (
          <Link
            to={`/detail/${movieFav.id}`}
            className={`card_container`}
            key={movieFav.id}
          >
            <BsBookmarkFill className="icon_fav" />
            <div
              className={`card_full`}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieFav.poster_path})`,
              }}
            ></div>
            <div className="card_features d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{movieFav.title}</h5>
              <div className="star d-flex align-items-center">
                <BsStarFill className="star_icon" />
                <p className="mb-0">
                  {parseInt(movieFav.vote_average).toString()}
                </p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <></>
      )}
      <Link
        to={`/detail/${
          location.pathname === "/" ? movie.id : movieRelated?.id
        }`}
        className={`card_container ${
          location.pathname === "/favorites" ? "d-none" : "d-block"
        }`}
      >
        <div
          className={`card_full`}
          style={{
            backgroundImage: `${backgroundImage}`,
          }}
        ></div>
        <div className="card_features d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            {location.pathname === "/" ? movie.title : movieRelated?.title}
          </h5>
          <div className="star d-flex align-items-center">
            <BsStarFill className="star_icon" />
            <p className="mb-0">
              {parseInt(
                location.pathname === "/"
                  ? movie.vote_average
                  : movieRelated?.vote_average
              ).toString()}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CardItem;
