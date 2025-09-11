import { useState } from "react";
import { Appointments } from "../../helpers/Appointments";
import style from "./MisTurnos.module.css";
import Turno from "../../components/Turno/Turno";

const MisTurnos = () => {
  const [appointments, setAppointments] = useState(Appointments);

  return ( 
    <div >
      <h1>MIS TURNOS</h1>
      <h4>Aqui encontraras el listado de los turnos que has tomado o cancelado</h4>
    <section className={style.containerApp}>
      {appointments.map((appointments) => {
        return (
          <Turno
          key={appointments.id}
          id={appointments.id}
            date={appointments.date}
            time={appointments.time}
            estado={appointments.estado}
          />
        );
      })}
    </section>
    </div>
  );
};
export default MisTurnos;
