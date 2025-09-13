import style from "./NavBar.module.css";
import rena from "../../assets/rena (1).png";

const NavBar = () => {
  const items = [
    "Inicio",
    "Nuestras sesiones",
    "Registrate aqui",
    "ingresa",
    "Agenda tu cita",
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
