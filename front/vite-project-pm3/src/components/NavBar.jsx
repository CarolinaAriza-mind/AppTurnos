import style from "../styles/NavBar.module.css"

const NavBar = () => {
  return (
    <div className= {style.containerNav}>
      <ul className={style.item}><a>Home</a></ul> 
       <ul className={style.item}><a>Agenda tu cita</a></ul>
       <ul className={style.item}><a>Nuestras Sesiones</a> </ul>
       <ul className={style.item}><a>Register</a> </ul>
       <ul className={style.item}><a>Login</a></ul>
    </div>
  );
};
export default NavBar;
