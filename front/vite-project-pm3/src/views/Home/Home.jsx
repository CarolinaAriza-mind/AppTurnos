import Buttons from "../../components/Buttons/Buttons";
import style from "./Home.module.css";

const Home = () => {
  return (
    <div>
      <div className={style.containerHome}>
        <h1 className={style.title}>Bienvenido a RenaSer</h1>
        <p className={style.subtitle}>
          un espacio para conectar con lo mas profundo de tu ser
        </p>
      </div>
      <section id={style.seccionPresentacion}>
        <div>
          <img
            id={style.imgPresentacion}
            src="https://st.depositphotos.com/1001951/4735/i/450/depositphotos_47357993-stock-photo-fragility-of-a-human-creature.jpg"
          ></img>
        </div>
        <div className={style.textoPresentacion}>
          <h2 className={style.titles}>
            La mejor forma de predecir el futuro, es Creandolo
          </h2>
          <p className={style.textParrafoP}>
            Aprende a observar tu realidad, como un conjunto de herramientas
            para poder vivir la vida que soñaste.
          </p>
          <span>
            {" "}
            Nuestras terapias, te ofrecen una guia necesaria, para poder
            utilizar estas herramientas a tu favor! Reserva tu turno hoy, y
            comienza el viaje de transformacion{" "}
          </span>
          <Buttons />
        </div>
      </section>
    </div>
  );
};

export default Home;
