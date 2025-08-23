import { Request, Response } from "express";
import { ScheduleAppointmentDTO } from "../DTO/AppointmentDTO";

export const getAppointmentsUserController = (req: Request, res: Response) => {
  res.status(200).json({
    msagge: "Obtener el listado de todos los turnos de todos los usuarios",
    data: req.body,
  });
};

export const getDetailAppointmentController = (req: Request<{id: string}>, res: Response) => {
  res
    .status(200)
    .json({
      msagge: "Obtener el detalle de un turno específico",
      data: req.body,
    });
};

export const SchedulerAppointmentController = (req: Request<unknown, unknown, ScheduleAppointmentDTO>, res: Response) => {
    res
    .status(200)
    .json({
      msagge: "Agendar un nuevo turno",
      data: req.body,
    });
};

export const ChangeStatusAppointmentController = (req: Request <{id: string}>, res: Response) => {
  res
    .status(200)
    .json({
      msagge: "Cambiar el estatus de un turno a 'cancelled'",
      data: req.body,
    });
};

