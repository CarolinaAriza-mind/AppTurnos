import NavBar from "../components/NavBar";
import style from "../styles/Home.module.css"

const Home = () => {
  return (
    <div className={style.containerHome}>
      <NavBar />
      <h1 className={style.title}>Bienvenido a RenaSer</h1>
      <p className={style.subtitle}>un espacio para conectar con lo mas profundo de tu ser</p>
      <img id={style.imgPresentacion} src="https://st.depositphotos.com/1001951/4735/i/450/depositphotos_47357993-stock-photo-fragility-of-a-human-creature.jpg"></img>
    </div>
  );
};

export default Home;
