import { Status } from "../DTO/AppointmentDTO.js";
import { appointmentModel } from "../repositories/appointmentRepo.js";
import { returnUserByIdServices } from "./userServices.js";
export const everyAppointmentService = async () => {
    const apponitmentFound = appointmentModel.find();
    if ((await apponitmentFound).length > 0)
        return apponitmentFound;
    throw new Error("Lista de Turnos no encontrada");
};
export const getAppointmentByIdService = async (id) => {
    const shift = appointmentModel.findOne({
        where: {
            id: id,
        },
        relations: ["user"],
    });
    if (!shift) {
        throw new Error("Este turno no existe");
    }
    return shift;
};
export const createNewAppointment = async (appoint) => {
    await returnUserByIdServices(appoint.userID);
    const turnoExistente = await appointmentModel.findOne({
        where: {
            user: { id: appoint.userID },
            date: appoint.date,
            time: appoint.time,
            appointmentStatus: Status.active,
        },
    });
    if (turnoExistente) {
        throw new Error("Este turno ya esta ocupado");
    }
    appointmentModel.validadAppointment(appoint.date, appoint.time);
    const newAppoint = appointmentModel.create({
        date: appoint.date,
        time: appoint.time,
        appointmentStatus: Status.active,
        user: { id: appoint.userID },
    });
    return await appointmentModel.save(newAppoint);
};
export const statusAppointmentService = async (id) => {
    if (!Number.isInteger(id) || id <= 0)
        throw new Error("ID inválido");
    const turno = await appointmentModel.findOne({
        where: { id },
        relations: ["user"],
    });
    if (!turno)
        throw new Error("No se encontró turno para cancelar");
    if (turno.appointmentStatus !== Status.active) {
        throw new Error("Este turno se encuentra cancelado ");
    }
    turno.appointmentStatus = Status.cancel;
    await appointmentModel.save(turno);
};
