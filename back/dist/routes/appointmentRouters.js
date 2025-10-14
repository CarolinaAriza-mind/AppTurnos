import { Router } from "express";
import { ChangeStatusAppointmentController, getAppointmentsUserController, getDetailAppointmentController, SchedulerAppointmentController, } from "../controllers/appointmentControllers.js";
const appointmentsRouter = Router();
appointmentsRouter.get("/home", (req, res) => getAppointmentsUserController(req, res));
appointmentsRouter.get("/:id", (req, res) => getDetailAppointmentController(req, res));
appointmentsRouter.post("/schedule", (req, res) => SchedulerAppointmentController(req, res));
appointmentsRouter.put("/cancel/:id", (req, res) => ChangeStatusAppointmentController(req, res));
export default appointmentsRouter;
