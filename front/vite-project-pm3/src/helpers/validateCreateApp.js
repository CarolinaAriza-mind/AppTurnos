export const validateCreateTurno = (input) => {
    const errors = {};
    if (!input.date.trim()) {
        errors.date = "Se requiere la fecha";
    } 
    const fecha = new Date(input.date);
    const dayOfWeek = fecha.getUTCDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      errors.date =
        "No se pueden agendar turnos los fines de semana. Solo de Lunes a Viernes";
    }
    
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const turno = new Date(fecha);
    turno.setHours(0, 0, 0, 0);
    
    const diffMs = fecha.getTime() - hoy.getTime();
    const diffHour = diffMs / (1000 * 60 * 60);
    if (diffHour < 24) {
      errors.date =
      "Las citas solo pueden agendarse con 24 horas de anticipacion";
    }
    if (turno < hoy) {
      errors.date = "No se pueden agendar turnos en fechas pasadas";
    }

    if(!input.time.trim()) {
        errors.time = "Se requiere la hora"
    }

  const [hourStr, minuteStr] = input.time.split(":");
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  if (isNaN(hour) || isNaN(minute)) {
    errors.time = "Formato de hora inválido. Usá HH:mm";
  }

  if (hour < 8 || hour > 14 || (hour === 14 && minute > 0)) {
    errors.time = "El horario permitido para agendar es de 8:00 a 14:00";
  }
  return errors;
};
