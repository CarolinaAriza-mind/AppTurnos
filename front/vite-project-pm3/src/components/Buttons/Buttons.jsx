import style from "./Buttons.module.css";

const Buttons = () => {
  const tomarCita = () => {
    console.log("Turno Solicitado");
  };

  return (
    <div id={style.containerButon}>
      <button className={style.botones} onClick={tomarCita}>
        Quiero tomar mi turno
      </button>
    </div>
  );
};

export default Buttons;
