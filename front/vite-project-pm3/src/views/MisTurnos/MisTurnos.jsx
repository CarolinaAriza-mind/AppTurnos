import { useEffect, useState } from "react";
import style from "./MisTurnos.module.css";
import Turno from "../../components/Turno/Turno";
import axios from "axios";

const MisTurnos = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
    .get("http://localhost:3001/appointments")
    .then((res) =>
      setAppointments(res.data.data))
    .catch((error) => console.error("Error al recibir la peticion", error));
  }, []);

  const [loading, setLoading] = useState(null) ;

  const cancelarTurno = async (id) => {
    setLoading(id)
    try {
      await axios.put(`http://localhost:3001/appointments/cancel/${id}`, {
        appointmentStatus: "cancelado",
      });

      setAppointments((prev) =>
        prev.map((appointments) =>
          appointments.id === id
            ? { ...appointments, appointmentStatus: "cancelado" }
            : appointments
        )
      );
    } catch (err) {
      console.error("Error al cancelar turno", err);
    } finally {
      setLoading(null)
    }
  };


  return (
    <div>
      <h1>MIS TURNOS</h1>
      <h4>
        Aqui encontraras el listado de los turnos que has tomado o cancelado
      </h4>
      <section className={style.containerApp}>
        {appointments.map((appointments) => {
          return (
            <Turno
              key={appointments.id}
              id={appointments.id}
              date={appointments.date}
              time={appointments.time}
              appointmentStatus={appointments.appointmentStatus}
              onCancel={cancelarTurno}
              loading={loading}
            />
          );
        })}
      </section>
    </div>
  );
};
export default MisTurnos;
