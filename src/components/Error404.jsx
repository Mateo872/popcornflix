import { PacmanLoader } from "react-spinners";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <main className="d-flex align-items-center justify-content-center text-center main_error">
      <div>
        <div className="d-flex justify-content-center">
          <PacmanLoader color="#FEE27D" size={60} loading />
        </div>
        <h1 style={{ color: "#fff", fontWeight: "bold" }}>404</h1>
        <p className="pacman_text">
          Página no encontrada, vuelve al{" "}
          <Link to="/" style={{ textDecoration: "none" }}>
            <span style={{ color: "#FEE27D", fontWeight: "bold" }}>inicio</span>
          </Link>
          .
        </p>
      </div>
    </main>
  );
};

export default Error404;
