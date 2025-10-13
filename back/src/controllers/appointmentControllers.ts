import { Request, Response } from "express";
import { AppointmentDTO } from "../DTO/AppointmentDTO.js";
import {
  createNewAppointment,
  everyAppointmentService,
  getAppointmentByIdService,
  statusAppointmentService,
} from "../services/appointmentServices.js";
import { PostgresError } from "../DTO/ErrorDTO.js";
import {
  sendAppointmentConfirmationEmail,
  sendCancellationEmail,
} from "../services/mailerServices.js";
import { appointmentModel } from "../repositories/appointmentRepo.js";
import { returnUserByIdServices } from "../services/userServices.js";

export const getAppointmentsUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({
      msagge: "Lista de todos los turnos",
      data: await everyAppointmentService(),
    });
  } catch (err) {
    const detailErr = err as PostgresError;
    res.status(400).json({
      msg:
        detailErr instanceof Error
          ? detailErr.detail
            ? detailErr.detail
            : detailErr.message
          : "Error desconocido",
    });
  }
};

export const getDetailAppointmentController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const app = await getAppointmentByIdService(id);
    if (!app) throw new Error("Este turno no existe");

    const formattedDate = new Date(app.date).toISOString().split("T")[0];

    res.status(200).json({
      msagge: "Detalle del turno",
      data: {
        id: app.id,
        name: app.user.name,
        email: app.user.email,
        date: formattedDate,
        time: app.time,
        appointmentStatus: app.appointmentStatus,
      },
    });
  } catch (err) {
    const detailErr = err as PostgresError;
    res.status(404).json({
      msg:
        detailErr instanceof Error
          ? detailErr.detail
            ? detailErr.detail
            : detailErr.message
          : "Error al obtener un turno",
    });
  }
};

export const SchedulerAppointmentController = async (
  req: Request<unknown, unknown, AppointmentDTO>,
  res: Response
) => {
  try {
    const newAppoint = await createNewAppointment(req.body);
    const user = await returnUserByIdServices(req.body.userID);
    const formattedDate = new Date(newAppoint.date).toISOString().split("T")[0];

    await sendAppointmentConfirmationEmail(
      user.email,
      user.name,
      formattedDate,
      newAppoint.time
    );

    res.status(201).json({
      msagge: "Nuevo turno agendado con exito",
      data: newAppoint,
    });
  } catch (err) {
    const detailErr = err as PostgresError;
    res.status(400).json({
      msg:
        detailErr instanceof Error
          ? detailErr.detail
            ? detailErr.detail
            : detailErr.message
          : "Error al agendar el turno",
    });
  }
};

export const ChangeStatusAppointmentController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const turno = await appointmentModel.findOne({
      where: { id },
      relations: ["user"],
    });

    if (!turno) throw new Error("No se encontró el turno");

    await statusAppointmentService(id);
    const formattedDate = new Date(turno.date).toISOString().split("T")[0];
    await sendCancellationEmail(
      turno.user.email,
      turno.user.name,
      formattedDate,
      turno.time
    );
    res.status(200).json({
      msagge: "Turno Cancelado con exito",
      data: {
        id: turno.id,
        name: turno.user.name,
        email: turno.user.email,
        date: formattedDate,
        time: turno.time,
        appointmentStatus: turno.appointmentStatus,
      },
    });
  } catch (err) {
    const detailErr = err as PostgresError;
    res.status(404).json({
      msg:
        detailErr instanceof Error
          ? detailErr.detail
            ? detailErr.detail
            : detailErr.message
          : "No se pudo cancelar el turno",
    });
  }
};
