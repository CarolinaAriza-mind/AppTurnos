import { AppointmentDTO, Status } from "../DTO/AppointmentDTO";

const appointments: AppointmentDTO[] = [];
let nextAppointmentId = 1;

export const everyAppointmentService = (): AppointmentDTO[] => {
  return appointments;
};

everyAppointmentService();

export const getAppointmentByIdService = (id: number) => {
  const shift = appointments.find((t) => t.id === id);
  return shift;
};

export const createNewAppointment = async (
  date: Date,
  time: string,
  userID: number,
  appointmentStatus: Status
): Promise<AppointmentDTO> => {
  if (!userID) {
    throw new Error("Falta Id de Usuario");
  }

  const [hourStr, minuteStr] = time.split(":");
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  if (isNaN(hour) || isNaN(minute)) {
    throw new Error("Formato de hora inválido. Usá HH:mm");
  }

  if (hour < 8 || hour > 14 || (hour === 14 && minute > 0)) {
    throw new Error("El horario permitido para agendar es de 8:00 a 14:00");
  }

  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    throw new Error(
      "No se pueden agendar turnos los fines de semana. Solo de Lunes a Viernes"
    );
  }

  const conflict = appointments.find(
    (app) =>
      app.userID &&
      app.date.toDateString() === date.toDateString() &&
      app.time === time
  );

  if (conflict) {
    throw new Error(
      "Ya existe un turno agendado para este usuario en ese horario"
    );
  }

  const newAppoint: AppointmentDTO = {
    id: nextAppointmentId++,
    date: new Date,
    time,
    userID,
    appointmentStatus,
  };

  appointments.push(newAppoint);
  return newAppoint;
};

export const statusAppointmentService = async (
  id: number
): Promise<Status | null> => {
  const turno = appointments.find((t) => t.id === id);
  if (!turno) return null;

  turno.appointmentStatus = Status.cancel
  return turno.appointmentStatus ;
};
