import { Request, Response } from "express";
import { AppointmentDTO } from "../DTO/AppointmentDTO";
import {
  createNewAppointment,
  everyAppointmentService,
  getAppointmentByIdService,
  statusAppointmentService,
} from "../services/appointmentServices";

export const getAppointmentsUserController = (req: Request, res: Response) => {
  try {
    const allAppointment = everyAppointmentService();
    res.status(200).json({
      msagge: "Listado de todos los turnos",
      data: allAppointment,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error al obtener los turnos",
      error,
    });
  }
};

export const getDetailAppointmentController = (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id: number = parseInt(req.params.id);
    const AppointmentId = getAppointmentByIdService(id);
    res.status(200).json({
      msagge: "Detalle del turno",
      data: AppointmentId,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error al obtener turno",
      error,
    });
  }
};

export const SchedulerAppointmentController = async(
  req: Request<unknown, unknown, AppointmentDTO>,
  res: Response
) => {
  try{
    const {date, time , userID, appointmentStatus} = req.body
    const registerAppoint = await createNewAppointment(new Date(date), time, userID, appointmentStatus)
    console.log(req.body);
    
  res.status(200).json({
    msagge: "Agendar un nuevo turno",
    data: registerAppoint
  });
}
  catch (error) {
    console.error(error);
  res.status(400).json({
    message: "Error al agendar turno",
    error: error instanceof Error ? error.message : error,
    });
}
};

export const ChangeStatusAppointmentController = (
  req: Request<{ id: string }>,
  res: Response
) => {
  try{
    const {id} = req.params;
    const statusA = statusAppointmentService(parseInt(id))
  res.status(200).json({
    msagge: "Cancelled",
    data: statusA,
  });
}
  catch (error) {
    res.status(404).json({
      message: "No se pudo cancelar el turno",
      error,
    });
}
};
