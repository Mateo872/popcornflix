import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [userLS, setUserLS] = useState(
    JSON.parse(localStorage.getItem("user")) || []
  );
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode"))
  );

  const backdropUrl = userLS.image;

  useEffect(() => {
    const updateUserData = () => {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      if (loggedInUser) {
        setUserLS(loggedInUser);
      } else {
        setUserLS([]);
      }
    };

    const handleUpdate = () => {
      updateUserData();
    };

    const intervalId = setInterval(handleUpdate, 1);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
    <header>
      <nav>
        <ul>
          <Link to={"/"}>
            POPCOR
            <span
              style={darkMode ? { color: "#EE332C" } : { color: "#FEE27D" }}
            >
              NFLIX
            </span>
          </Link>

          <Link to={"/user"} className="user_container">
            <p className="mb-0">{userLS.name ? userLS.name : "Invitado"}</p>
            <div
              className="user_image"
              style={{
                backgroundImage: `url(${backdropUrl})`,
                ...(darkMode
                  ? { borderColor: "#EE332C" }
                  : { borderColor: "#FEE27D" }),
              }}
            ></div>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
