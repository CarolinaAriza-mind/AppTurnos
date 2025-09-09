import Buttons from "../../components/Buttons/Buttons";
import style from "./Home.module.css";
import { TextHome } from "../../helpers/Home";
import renaser from "../../assets/renaser.jpg"

const Home = () => {
  return (
    <div>
      <div className={style.containerHome}>
        <h1 className={style.title}>{TextHome.bienvenida}</h1>
        <p className={style.subtitle}>{TextHome.subtitulo}</p>
      </div>
      <section className={style.seccionPresentacion}>
        <div>
          <img
            className={style.imgPresentacion}
            src={renaser}
            alt="Imagen que representa la fragilidad y profundidad del ser humano"
          ></img>
        </div>
        <div className={style.textoPresentacion}>
          <h2 className={style.titles}>{TextHome.tituloParrafo}</h2>
          <p className={style.textParrafoP}>{TextHome.parrafo}</p>
          <span>{TextHome.descripcion}</span>
          <Buttons />
        </div>
      </section>
    </div>
  );
};

export default Home;
