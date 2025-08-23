import { Request, Response, Router } from "express";
import { ChangeStatusAppointmentController, getAppointmentsUserController, getDetailAppointmentController, SchedulerAppointmentController } from "../controllers/appointmentControllers";
import { ScheduleAppointmentDTO } from "../DTO/AppointmentDTO";

const appointmentsRouter: Router = Router();

appointmentsRouter.get ("/" , (req:Request , res:Response) => getAppointmentsUserController(req, res))
appointmentsRouter.get("/", (req:Request<{id: string}>, res:Response) => getDetailAppointmentController(req,res))
appointmentsRouter.post("/schedule" ,(req:Request<unknown, unknown, ScheduleAppointmentDTO>, res:Response) => SchedulerAppointmentController(req,res))
appointmentsRouter.put("/cancel",(req:Request<{id: string}>, res:Response) => ChangeStatusAppointmentController(req,res))


export default appointmentsRouter;


