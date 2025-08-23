import { Router } from "express";
import userRouter from "./usersRouters";
import appointmentsRouter from "./appointmentRouters";

const router: Router = Router();

router.use("/users", userRouter);
router.use("/appointments", appointmentsRouter);

export default router;
