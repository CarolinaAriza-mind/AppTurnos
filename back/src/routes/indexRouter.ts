import { Router } from "express";
import userRouter from "./usersRouters.js";
import appointmentsRouter from "./appointmentRouters.js";

const router: Router = Router();

router.use("/users", userRouter);
router.use("/appointments", appointmentsRouter);

export default router;
