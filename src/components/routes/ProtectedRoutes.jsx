import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const userLS = JSON.parse(localStorage.getItem("user")) || null;

  if (!userLS) {
    return <Navigate to={"/user"} />;
  } else {
    return children;
  }
};

export default ProtectedRoutes;
