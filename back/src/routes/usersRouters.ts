import { Request, Response, Router } from "express";
import {
  getUserController,
  getUsserById,
  loginUserController,
  registerUserController,
} from "../controllers/usersControllers";
import { LoginUserDTO, UserRegisterDTO } from "../DTO/UserDTO";

const userRouter: Router = Router();

userRouter.get("/", (req: Request, res: Response) =>
  getUserController(req, res)
);
userRouter.get("/:id", (req: Request<{ id: string }>, res: Response) =>
  getUsserById(req, res)
);
userRouter.post("/register", (req: Request<UserRegisterDTO>, res: Response) =>
  registerUserController(req, res)
);
userRouter.post("/login", (req: Request<LoginUserDTO>, res: Response) =>
  loginUserController(req, res)
);
export default userRouter;
