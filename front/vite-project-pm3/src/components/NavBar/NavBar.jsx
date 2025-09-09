import style from "./NavBar.module.css";
import rena from "../../assets/rena.jpg"

const NavBar = () => {
  return (
    <div className={style.containerNav}>
      <div>
      <img id={style.logo} src={rena} alt="Rena"/>
      </div>
      <ul>
        <a className={style.item}>Inicio</a>
        <a className={style.item}>Agenda tu cita</a>
        <a className={style.item}>Nuestras Sesiones</a>
        <a className={style.item}>Registrate aqui</a>
        <a className={style.item}>Ingresa</a>
      </ul>
    </div>
  );
};
export default NavBar;
