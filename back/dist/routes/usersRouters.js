import { Router } from "express";
import { getUserByIdController, getUserController, loginUserController, registerUserController, } from "../controllers/usersControllers.js";
const userRouter = Router();
userRouter.get("/", (req, res) => getUserController(req, res));
userRouter.get("/:id", (req, res) => getUserByIdController(req, res));
userRouter.post("/register", (req, res) => registerUserController(req, res));
userRouter.post("/login", (req, res) => loginUserController(req, res));
export default userRouter;
