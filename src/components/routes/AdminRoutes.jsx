import { Routes, Route } from "react-router-dom";
import FavoritesCards from ".././FavoritesCards";
const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<FavoritesCards />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
