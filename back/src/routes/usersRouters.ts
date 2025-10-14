import { Request, Response, Router } from "express";
import {
  getUserByIdController,
  getUserController,
  loginUserController,
  registerUserController,
} from "../controllers/usersControllers.js";
import { UserRegisterDTO } from "../DTO/UserDTO.js";
import { CredentialDTO } from "../DTO/CredentialsDTO.js";

const userRouter: Router = Router();

userRouter.get("/home", (req: Request, res: Response) =>
  getUserController(req, res)
);
userRouter.get("/:id", (req: Request<{ id: string }>, res: Response) =>
  getUserByIdController(req, res)
);
userRouter.post("/register", (req: Request<UserRegisterDTO>, res: Response) =>
  registerUserController(req, res)
);
userRouter.post("/login", (req: Request<CredentialDTO>, res: Response) =>
  loginUserController(req, res)
);
export default userRouter;
