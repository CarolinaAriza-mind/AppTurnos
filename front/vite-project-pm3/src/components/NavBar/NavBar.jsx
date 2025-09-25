import style from "./NavBar.module.css";
import rena from "../../assets/rena (1).png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";

const NavBar = () => {
  const { isLogged, logOutUser } = useContext(UsersContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    Swal.fire({
      position: "top-end",
      icon: "warning",
      iconColor: "#ff0303",
      title: "Sesión cerrada",
      showConfirmButton: false,
      timer: 2000,
      color: "#ffffff",
      background: "#6e5f05",
    });
    logOutUser()
    navigate("/Login");
  };

  return (
    <nav className={style.containerNav}>
      <div className={style.containerLogo}>
        <img className={style.logo} src={rena} alt="Rena" />
      </div>
      <ul>
        <li>
          <Link to="/" className={style.item}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/CrearTurno" className={style.item}>
            Crear Turno
          </Link>
        </li>
        <li>
          <Link to="/MisTurnos" className={style.item}>
            Mis Turnos
          </Link>
        </li>
        {isLogged ? (
          <li className={style.item} onClick={handleLogOut}>
            Cerrar Sesión
          </li>
        ) : (
          <li>
            <Link to="/Login" className={style.item}>
              Iniciar Sesión
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;


