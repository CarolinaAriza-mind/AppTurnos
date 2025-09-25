import renaser from "../../assets/renaser.jpg"
import style from "./SectionHome.module.css"

const SectionHome = () => {
    return(
      
         <section className={style.seccionPresentacion}>
        <div>
          <img
            className={style.imgPresentacion}
            src={renaser}
            alt="Imagen que representa la fragilidad y profundidad del ser humano"
          ></img>
        </div>
        <div className={style.textoPresentacion}>
          <h2 className={style.titles}>La mejor forma de predecir el futuro, es Creandolo</h2>
          <span className={style.textParrafoP}>En RenaSer, nos enfocamos en acompañarte a observar tu realidad, como un conjunto de herramientas para poder vivir la vida que soñaste</span>
          <span> Nuestras terapias, te ofrecen una guia necesaria, para poder utilizar estas herramientas a tu favor! Reserva tu turno hoy,y comienza el viaje de transformacion</span>
        </div>
      </section>
    )
}

export default SectionHome;
