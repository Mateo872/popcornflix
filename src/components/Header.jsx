import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [userLS, setUserLS] = useState(
    JSON.parse(localStorage.getItem("user")) || []
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

  return (
    <header>
      <nav>
        <ul>
          <Link to={"/"}>
            POPCOR<span>NFLIX</span>
          </Link>

          <Link to={"/user"} className="user_container">
            <p className="mb-0">{userLS.name ? userLS.name : "Invitado"}</p>
            <div
              className="user_image"
              style={{ backgroundImage: `url(${backdropUrl})` }}
            ></div>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
