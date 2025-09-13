
import style from "./Home.module.css";
import SectionHome from "../../components/SectionHome/SectionHome";

const Home = () => {
  return (
    <div>
      <div className={style.containerHome}>
        <h1 className={style.title}>Bienvenido a RenaSer</h1>
        <span className={style.subtitle}>un espacio para conectar con lo mas profundo de tu ser</span>
      </div>
     <SectionHome/>
    </div>
  );
};

export default Home;

