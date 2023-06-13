import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Aside from "./components/Aside";
import Container from "./components/Container";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FavoritesCards from "./components/FavoritesCards";
import DetailContainer from "./components/DetailContainer";
import UserContainer from "./components/UserContainer";
import Error404 from "./components/Error404";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <main className="main">
              <Aside />
              <Container />
            </main>
          }
        />
        <Route path="/detail/:id" element={<DetailContainer />} />
        <Route path="/favorites" element={<FavoritesCards />} />
        <Route path="/user" element={<UserContainer />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
