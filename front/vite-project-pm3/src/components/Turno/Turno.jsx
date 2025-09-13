import style from "./Turno.module.css";
const Turno = ({ id, date, time, appointmentStatus, onCancel, loading}) => {
const IsCancelled = appointmentStatus === "cancelado";

  return (
    <div className={style.app}>
      <p className={style.info}>
        <strong>Turno </strong>
        #{id}
      </p>
      <p className={style.info}>
        <strong>Fecha:</strong> {date}
      </p>
      <p className={style.info}>
        <strong>Hora:</strong> {time}
      </p>
      <p className={style.info}>
        <strong>Estado:</strong> {appointmentStatus}
      </p>
      <div className={style.containerButtonStatus}>
      <button  className={`${style.buttonStatus} ${
            IsCancelled ? style.cancelled : style.active
          }`}
          disabled={IsCancelled || loading}
          onClick={() => onCancel(id)}> {loading === id ? "Cancelando..." : IsCancelled ? "Cancelado" : "Cancelar"}</button>
      </div>
    </div>
  );
};

export default Turno;
