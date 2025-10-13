import { appDataSource } from "../config/dataSource.js";
import { Appointment } from "../Entities/AppointmentEntitiy.js";
export const appointmentModel = appDataSource
    .getRepository(Appointment)
    .extend({
    validadAppointment: function (date, time) {
        const [hourStr, minuteStr] = time.split(":");
        const hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr, 10);
        if (isNaN(hour) || isNaN(minute)) {
            throw new Error("Formato de hora inválido. Usá HH:mm");
        }
        if (hour < 8 || hour > 14 || (hour === 14 && minute > 0)) {
            throw new Error("El horario permitido para agendar es de 8:00 a 14:00");
        }
        const fecha = new Date(date);
        const dayOfWeek = fecha.getUTCDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            throw new Error("No se pueden agendar turnos los fines de semana. Solo de Lunes a Viernes");
        }
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const turno = new Date(fecha);
        turno.setHours(0, 0, 0, 0);
        if (turno < hoy)
            throw new Error("No se pueden agendar turnos en fechas pasadas");
        const diffMs = fecha.getTime() - hoy.getTime();
        const diffHour = diffMs / (1000 * 60 * 60);
        if (diffHour < 24)
            throw new Error("Las citas solo pueden agendarse con 24 horas de anticipacion");
    },
});
