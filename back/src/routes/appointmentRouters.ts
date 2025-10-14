import { Request, Response, Router } from "express";
import {
  ChangeStatusAppointmentController,
  getAppointmentsUserController,
  getDetailAppointmentController,
  SchedulerAppointmentController,
} from "../controllers/appointmentControllers.js";
import { AppointmentDTO } from "../DTO/AppointmentDTO.js";

const appointmentsRouter: Router = Router();

appointmentsRouter.get("/home", (req: Request, res: Response) =>
  getAppointmentsUserController(req, res)
);
appointmentsRouter.get("/:id", (req: Request<{ id: string }>, res: Response) =>
  getDetailAppointmentController(req, res)
);
appointmentsRouter.post(
  "/schedule",
  (req: Request<unknown, unknown, AppointmentDTO>, res: Response) =>
    SchedulerAppointmentController(req, res)
);
appointmentsRouter.put(
  "/cancel/:id",
  (req: Request<{ id: string }>, res: Response) =>
    ChangeStatusAppointmentController(req, res)
);

export default appointmentsRouter;
