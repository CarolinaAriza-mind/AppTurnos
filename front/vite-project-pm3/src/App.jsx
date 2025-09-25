import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./views/Home/Home";
import MisTurnos from "./views/MisTurnos/MisTurnos";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import CrearTurno from "./views/CrearTurno/CrearTurno";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "./context/UsersContext";

function App() {
  const { isLogged } = useContext(UsersContext);
  const [isNotFound, setIsNotFound] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const rutasValidas = [
      "/",
      "/Login",
      "/Registro",
      "/CrearTurno",
      "/MisTurnos",
    ];
    if (!rutasValidas.includes(location.pathname)) setIsNotFound(true);
    else setIsNotFound(false);

    if (
      !isLogged &&
      location.pathname !== "/Login" &&
      location.pathname !== "/Registro"
    ) {
      navigate("/Registro");
    }
    if (
      isLogged &&
      (location.pathname === "/Login" || location.pathname === "/Registro")
    ) {
      navigate("/");
    }
  }, [isLogged, navigate, location.pathname]);

  return (
    <>
      {!isLogged ? (
        <main>
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Registro" element={<Register />} />
          </Routes>
        </main>
      ) : (
        <>
          {!isNotFound && <NavBar />}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/CrearTurno" element={<CrearTurno />} />
              <Route path="/MisTurnos" element={<MisTurnos />} />
            </Routes>
          </main>
        </>
      )}
    </>
  );
}

export default App;
