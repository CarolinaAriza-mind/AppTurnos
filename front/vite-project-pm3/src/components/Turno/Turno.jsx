import style from "./Turno.module.css";
const Turno = ({ id, date, time, estado }) => {
  return (
    <div className={style.app}>
      <p className={style.info}>
        <strong>Id </strong>
        {id}
      </p>
      <p className={style.info}>
        <strong>Fecha:</strong> {date}
      </p>
      <p className={style.info}>
        <strong>Hora:</strong> {time}
      </p>
      <p className={style.info}>
        <strong>Estado:</strong> {estado}
      </p>
    </div>
  );
};

export default Turno;
