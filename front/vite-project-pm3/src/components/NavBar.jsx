import style from "../styles/NavBar.module.css"

const NavBar = () => {
  return (
    <div className= {style.containerNav}>
      <ul className={style.item}><a>Inicio</a></ul> 
       <ul className={style.item}><a>Agenda tu cita</a></ul>
       <ul className={style.item}><a>Nuestras Sesiones</a> </ul>
       <ul className={style.item}><a>Registrate aqui</a> </ul>
       <ul className={style.item}><a>Ingresa</a></ul>
    </div>
  );
};
export default NavBar;
