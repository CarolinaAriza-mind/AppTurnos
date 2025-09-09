import style from "./Buttons.module.css";

const Buttons = () => {
  return (
    <div id={style.containerButon} >
      <button className={style.botones}> Quiero tomar mi turno </button>
    </div>
  );
};

export default Buttons;
