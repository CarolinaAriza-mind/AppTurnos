import { useContext } from "react";
import style from "./Turno.module.css";
import { UsersContext } from "../../context/UsersContext";
import Swal from "sweetalert2";

const Turno = ({ id, date, time, appointmentStatus }) => {
  const { cancelUserApp } = useContext(UsersContext);

  const handleCancel = async () => {
    try {
      await cancelUserApp(id);
      Swal.fire({
        position: "top-end",
        icon: "success",
        iconColor: "#09ff00ff",
        title: "El turno ha sido cancelado con exito",
        color: "#ffffffff",
        background: "#6e5f05ff",
      });
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        iconColor: "#ff0303",
        title: "Error al cancelar el turno",
        color: "#000000ff",
        background: "#f797daff",
      });
      console.error("Error al cancelar turno:", err);
    }
  };

  return (
    <div className={style.app}>
      <p className={style.info}>
        <strong>Turno</strong> #{id}
      </p>
      <p className={style.info}>
        <strong>Fecha:</strong> {date}
      </p>
      <p className={style.info}>
        <strong>Hora:</strong> {time}
      </p>
      <p className={style.info}>
        <strong>Estado:</strong>{" "}
        <span
          className={
            appointmentStatus === "cancelado"
              ? style.statusCancelado
              : style.statusActivo
          }
        >
          {appointmentStatus}
        </span>
      </p>

      <div className={style.containerButtonStatus}>
        <button
          className={`${style.buttonStatus} ${
            appointmentStatus === "cancelado" ? style.cancelled : style.active
          }`}
          onClick={handleCancel}
          disabled={appointmentStatus === "cancelado"}
        >
          {appointmentStatus === "cancelado" ? "Cancelado" : "Cancelar"}
        </button>
      </div>
    </div>
  );
};

export default Turno;
