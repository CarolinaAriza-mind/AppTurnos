import style from "./NavBar.module.css";
import rena from "../../assets/rena.jpg";

const NavBar = () => {
  const items = [
    "Inicio",
    "Agenda tu cita",
    "Nuestras sesiones",
    "Registrate aqui",
    "ingresa",
  ];

  return (
    <nav className={style.containerNav}>
      <img className={style.logo} src={rena} alt="Rena" />
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <a href="#" className={style.item}>{item}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default NavBar;
