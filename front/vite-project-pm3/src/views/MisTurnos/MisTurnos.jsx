import { useContext, useEffect } from "react";
import style from "./MisTurnos.module.css";
import Turno from "../../components/Turno/Turno";
import { UsersContext } from "../../context/UsersContext";

const MisTurnos = () => {
  const { getUsersAppointments, userAppointments } = useContext(UsersContext);
  
  useEffect(() => {
    getUsersAppointments();
  }, []);

  return (
    <div>
      <h1>MIS TURNOS</h1>
      <h2>
        Aquí encontrarás el listado de los turnos que has tomado o cancelado
      </h2>
      <section className={style.containerApp}>
        {userAppointments?.length > 0 ? (
          userAppointments.map((appointments) => (
            <Turno
              key={appointments.id}
              id={appointments.id}
              date={appointments.date}
              time={appointments.time}
              appointmentStatus={appointments.appointmentStatus}
            />
          ))
        ) : (
          <h3>No hay turnos para mostrar</h3>
        )}
      </section>
    </div>
  );
};

export default MisTurnos;
