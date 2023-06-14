import CardItem from "./CardItem";
import { useState, useEffect } from "react";
import { BsArrowLeft, BsSearch } from "react-icons/bs";
import Banner from "./Banner";
import { useLocation } from "react-router-dom";
import User from "./User";
import { BeatLoader, ClimbingBoxLoader } from "react-spinners";

const Cards = () => {
  const location = useLocation();
  const [showAll, setShowAll] = useState(false);
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 20)
  );
  const favMovie = JSON.parse(localStorage.getItem("favMovies")) || [];
  const [showSpinner, setShowSpinner] = useState(false);

  let filter = "all";

  const handleFilter = (e) => {
    filter = e.target.id === "all" ? "all" : parseInt(e.target.id);

    const fetchData = async () => {
      try {
        const url =
          filter === "all"
            ? `https://api.themoviedb.org/3/discover/movie?api_key=a7f1c3f0247fcd7901fd06f02d23aab0`
            : `https://api.themoviedb.org/3/discover/movie?api_key=a7f1c3f0247fcd7901fd06f02d23aab0&with_genres=${filter}`;

        const response = await fetch(url);
        const data = await response.json();
        setShowSpinner(true);
        setSelectedFilter(filter);
        setMovies(data.results);
        setTimeout(() => {
          setShowSpinner(false);
        }, 500);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = input
          ? `https://api.themoviedb.org/3/search/movie?api_key=a7f1c3f0247fcd7901fd06f02d23aab0&query=${input}`
          : `https://api.themoviedb.org/3/discover/movie?api_key=a7f1c3f0247fcd7901fd06f02d23aab0&with_genres=${filter}`;

        const response = await fetch(url);
        const data = await response.json();
        setShowSpinner(true);
        setMovies(data.results);
        setSelectedFilter("all");
        setTimeout(() => {
          setShowSpinner(false);
        }, 500);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [input]);

  return (
    <>
      {location.pathname === "/favorites" && favMovie.length === 0 ? (
        <div
          className={`${
            favMovie.length === 0 ? "d-flex" : "d-none"
          } flex-column justify-content-center align-items-center fav_empty`}
        >
          <ClimbingBoxLoader color="#FEE27D" size={15} />
          <h2
            className="mt-4"
            style={{ color: "#fff", fontSize: "1rem", opacity: ".7" }}
          >
            No hay películas favoritas
          </h2>
        </div>
      ) : (
        <></>
      )}
      <div
        className={`${
          location.pathname !== "/" || location.pathname === "/favorites"
            ? "d-none"
            : "d-flex"
        }`}
      >
        <div className="d-flex filter_container justify-content-between w-100">
          <p
            id="all"
            className={`filter mb-0 ${
              location.pathname === "/favorites" ? "d-none" : ""
            } ${
              selectedFilter === "all" || input.length > 0
                ? "filter_active"
                : ""
            }`}
            onClick={handleFilter}
          >
            Todos
          </p>
          <p
            id="35"
            className={`filter mb-0 ${
              selectedFilter === 35 && input.length === 0 ? "filter_active" : ""
            }${location.pathname === "/favorites" ? "d-none" : ""}`}
            onClick={handleFilter}
          >
            Comedia
          </p>
          <p
            id="27"
            className={`filter mb-0 ${
              selectedFilter === 27 && input.length === 0 ? "filter_active" : ""
            }${location.pathname === "/favorites" ? "d-none" : ""}`}
            onClick={handleFilter}
          >
            Terror
          </p>
          <p
            id="18"
            className={`filter mb-0 ${
              selectedFilter === 18 && input.length === 0 ? "filter_active" : ""
            }${location.pathname === "/favorites" ? "d-none" : ""}`}
            onClick={handleFilter}
          >
            Drama
          </p>
          <p
            id="52"
            className={`filter mb-0 ${
              selectedFilter === 52 && input.length === 0 ? "filter_active" : ""
            }${location.pathname === "/favorites" ? "d-none" : ""}`}
            onClick={handleFilter}
          >
            Suspenso
          </p>
          <div className={`input_container d-flex align-items-center`}>
            <BsSearch />
            <input
              type="text"
              placeholder="Buscar"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>
      </div>
      {location.pathname !== "/user" ? (
        <div
          className={`${
            showSpinner ? "d-flex" : "d-none"
          } justify-content-center align-items-center vh-100`}
        >
          <BeatLoader color="#FEE27D" size={20} />
        </div>
      ) : null}
      <div
        className={`container_banner-movie ${
          location.pathname === "/user" ? "d-none" : "d-block"
        } ${showSpinner ? "d-none" : "d-block"} `}
      >
        {movies && <Banner movie={movies[randomNumber]} />}
      </div>
      <div
        className={` ${
          showSpinner ? "d-none" : "d-flex"
        } title_cards justify-content-between align-items-center`}
      >
        {movies.length > 0 && (
          <>
            <h4 className="mb-0">
              {location.pathname === "/"
                ? selectedFilter === "all" || input.length > 0
                  ? "Lo más visto"
                  : selectedFilter === 35
                  ? "Comedia"
                  : selectedFilter === 27
                  ? "Terror"
                  : selectedFilter === 18
                  ? "Drama"
                  : selectedFilter === 52
                  ? "Suspenso"
                  : ""
                : location.pathname === "/favorites" && favMovie.length > 0
                ? "Mis favoritos"
                : location.pathname === "/favorites" && favMovie.length === 0
                ? ""
                : location.pathname !== "/user"
                ? "Relacionado"
                : ""}
            </h4>

            <p
              className={`mb-0 ${
                location.pathname === "/" ? "d-block" : "d-none"
              }`}
              onClick={() => setShowAll(!showAll)}
            >
              {!showAll ? "Ver todo" : <BsArrowLeft />}
            </p>
          </>
        )}
      </div>
      <div
        className={`cards ${showSpinner ? "d-none" : "d-flex"} ${
          location.pathname === "/favorites" && favMovie.length < 3
            ? "justify-content-start gap-5"
            : "justify-content-between"
        } ${showAll ? "flex-wrap" : ""} ${
          location.pathname === "/favorites" ? "flex-wrap" : ""
        } ${location.pathname === "/favorites" ? "cards_favorite" : ""} ${
          location.pathname === "/user" ? "d-none" : "d-block"
        }`}
      >
        {location.pathname === "/favorites" ? (
          movies
            .slice(0, 1)
            .map((movie) => <CardItem key={movie.id} movie={movie} />)
        ) : (
          <>
            {movies && movies.length === 0 ? (
              <p className="message_empty mb-0">No se encontraron resultados</p>
            ) : !showAll ? (
              movies
                .slice(0, 3)
                .map((movie) => <CardItem key={movie.id} movie={movie} />)
            ) : (
              movies.map((movie) => <CardItem key={movie.id} movie={movie} />)
            )}
          </>
        )}
      </div>
      {location.pathname === "/user" ? <User /> : ""}
    </>
  );
};

export default Cards;
