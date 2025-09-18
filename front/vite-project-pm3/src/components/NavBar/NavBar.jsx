import style from "./NavBar.module.css";
import rena from "../../assets/rena (1).png";

const NavBar = () => {
  const items = [
    "Inicio",
    "Registrate aqui",
    "Ingresa",
    "Agenda tu cita",
  ];

  return (
    <nav className={style.containerNav}>
      <div className={style.containerLogo}>
        <img className={style.logo} src={rena} alt="Rena" />
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <a href="#" className={style.item}>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default NavBar;
